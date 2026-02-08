import type { Request, Response, NextFunction } from "express";

const CRAWLER_USER_AGENTS = [
  "googlebot",
  "bingbot",
  "yandexbot",
  "duckduckbot",
  "slurp",
  "baiduspider",
  "facebookexternalhit",
  "twitterbot",
  "linkedinbot",
  "whatsapp",
  "telegrambot",
  "applebot",
  "applebot-extended",
  "gptbot",
  "chatgpt-user",
  "openai",
  "claude-web",
  "claudebot",
  "claude-user",
  "anthropic-ai",
  "anthropicbot",
  "perplexitybot",
  "perplexity-user",
  "cohere-ai",
  "google-extended",
  "googleother",
  "amazonbot",
  "duckassistbot",
  "kagibot",
  "petalbot",
  "mojeekbot",
  "meta-externalagent",
  "meta-externalfetcher",
  "facebookbot",
  "youbot",
  "ccbot",
  "bytedance",
  "bytespider",
  "iaskbot",
  "rogerbot",
  "embedly",
  "quora link preview",
  "showyoubot",
  "outbrain",
  "pinterest",
  "slackbot",
  "vkShare",
  "W3C_Validator",
  "redditbot",
  "flipboard",
  "tumblr",
  "bitlybot",
  "SkypeUriPreview",
  "nuzzel",
  "Discordbot",
  "Google Page Speed",
  "Qwantify",
  "Bitrix link preview",
  "XING-contenttabreceiver",
  "Chrome-Lighthouse",
  "SeznamBot",
];

function isCrawler(userAgent: string): boolean {
  const ua = userAgent.toLowerCase();
  return CRAWLER_USER_AGENTS.some((crawler) => ua.includes(crawler.toLowerCase()));
}

const servicePages: Record<string, { title: string; description: string; price: string; keywords: string }> = {
  komplettsanierung: {
    title: "Komplettsanierung München",
    description: "Schlüsselfertige Komplettsanierung von Haus und Wohnung in München. Alle Gewerke aus einer Hand mit Festpreisgarantie.",
    price: "920 - 2.300 €/m²",
    keywords: "Komplettsanierung München, Haus sanieren München, Wohnung renovieren München, Kernsanierung München Kosten, Altbausanierung München, Sanierung aus einer Hand München, was kostet Komplettsanierung pro qm München, Haussanierung München Festpreis, Wohnungssanierung München Erfahrungen, Altbau komplett sanieren München, Sanierung schlüsselfertig München, Kernsanierung Haus München Dauer, Komplettsanierung München günstig, Sanierung Einfamilienhaus München, Renovierung komplett München Anbieter",
  },
  badsanierung: {
    title: "Badsanierung München",
    description: "Professionelle Badsanierung in München. Komplettbad inkl. Fliesen, Sanitär, Elektro. Barrierefreie Lösungen möglich.",
    price: "18.500 - 50.000 €",
    keywords: "Badsanierung München, Bad renovieren München, Badezimmer sanieren München Kosten, Badsanierung München Festpreis, Badrenovierung München, Bad komplett sanieren München, was kostet Badsanierung München 2026, Bad neu machen München Preise, Badumbau München barrierefrei, kleine Badsanierung München, Gäste WC sanieren München Kosten, Bad fliesen München Preis, Dusche einbauen München, Badezimmer modernisieren München, Badsanierung München Dauer Wochen",
  },
  kuechensanierung: {
    title: "Küchensanierung München",
    description: "Küchensanierung in München: Fliesen, Elektro, Wasseranschlüsse. Bauarbeiten ohne Küchenmöbel.",
    price: "6.500 - 22.000 €",
    keywords: "Küchensanierung München, Küche renovieren München, Küchenumbau München Kosten, Küche umbauen München, Küchenanschlüsse verlegen München, Küche neu gestalten München, Küche modernisieren München Preise, Elektrik Küche verlegen München, Wasseranschluss Küche München, Fliesenspiegel Küche München, Küchenmontage München Kosten, Küchenrenovierung München Dauer, neue Küche einbauen München, Küche komplett erneuern München, Kücheninstallation München Festpreis",
  },
  bodensanierung: {
    title: "Bodensanierung München",
    description: "Bodensanierung in München: Parkett, Fliesen, Vinyl, Teppich. Estricharbeiten und Fußbodenheizung.",
    price: "65 - 200 €/m²",
    keywords: "Bodensanierung München, Parkett verlegen München, Vinylboden München, Boden erneuern München Kosten, Laminat verlegen München, Fliesen verlegen München, Parkett schleifen München Preis, Designboden verlegen München, Bodenbelag erneuern München, Fußboden sanieren München Kosten, Parkett abschleifen München, Vinyl Klick verlegen München, neuer Boden Wohnung München, Bodenleger München Festpreis, Estrich sanieren München Kosten",
  },
  elektrosanierung: {
    title: "Elektrosanierung München",
    description: "Elektroinstallation und Elektrosanierung in München. Sicherungskasten, Leitungen nach VDE-Norm.",
    price: "80 - 300 €/m²",
    keywords: "Elektrosanierung München, Elektrik erneuern München, Elektriker München Altbau, Elektroinstallation München Kosten, Steckdosen nachrüsten München, Sicherungskasten erneuern München, Elektrik komplett erneuern München Preis, Unterputz Kabel verlegen München, FI Schutzschalter nachrüsten München, Wallbox Installation München, E-Check München Kosten, Altbau Elektrik modernisieren München, Zählerkasten erneuern München, Smart Home Elektrik München, Elektriker Notdienst München schnell",
  },
  heizungssanierung: {
    title: "Heizungssanierung München",
    description: "Heizungssanierung in München: Gasheizung, Wärmepumpe, Fußbodenheizung. KfW-Förderung möglich.",
    price: "12.000 - 65.000 €",
    keywords: "Heizungssanierung München, Neue Heizung München, Wärmepumpe München Kosten, Heizung austauschen München, Heizungsförderung München, Gas Brennwert München, Heizung erneuern München Förderung 2026, Wärmepumpe nachrüsten München, Ölheizung tauschen München Kosten, Pelletheizung München Preise, Heizungstausch München Dauer, BEG Förderung Heizung München, hydraulischer Abgleich München, Heizungsinstallateur München, Gasheizung erneuern München Kosten",
  },
  dachsanierung: {
    title: "Dachsanierung München",
    description: "Dachsanierung in München: Dachdämmung, Dacheindeckung, Dachfenster. BAFA- und KfW-Förderung.",
    price: "150 - 350 €/m²",
    keywords: "Dachsanierung München, Dachdecker München, Dach neu eindecken München Kosten, Dachreparatur München, Dachdämmung München, Dachziegel erneuern München, Dachstuhl sanieren München, Flachdach abdichten München, Dachrinne erneuern München Kosten, Dach undicht München Notdienst, Dachsanierung München Förderung, Steildach sanieren München Preise, Marderabwehr Dach München, Dachfenster einbauen München, Dachdecker München Angebot kostenlos",
  },
  "energetische-sanierung": {
    title: "Energetische Sanierung München",
    description: "Energetische Sanierung in München: Wärmedämmung, Fensteraustausch, Heizungsmodernisierung. Förderberatung inklusive.",
    price: "200 - 500 €/m²",
    keywords: "Energetische Sanierung München, Dämmung München, Fenster tauschen München, Fassadendämmung München Kosten, Wärmedämmung München, iSFP München, Dachdämmung München Preise, Kellerdecke dämmen München, WDVS München Kosten, Fenster Förderung München 2026, Sanierungsfahrplan München erstellen, energetisch sanieren München Zuschuss, Hausdämmung München Preise, Außendämmung München Kosten pro qm, Wärmeschutz München Altbau",
  },
};

const pageOgImageMap: Record<string, { image: string; alt: string }> = {
  "/": { image: "/images/komplettsanierung_vorher_nachher.webp", alt: "Komplettsanierung München vorher nachher - professionelle Sanierung aus einer Hand mit Festpreisgarantie" },
  "/anfrage": { image: "/images/sanierungsberatung_gespraech.webp", alt: "Kostenlose Sanierungsberatung München - persönliches Gespräch für Ihr Renovierungsprojekt" },
  "/danke": { image: "/images/erfolgsbestaetigung_haekchen.webp", alt: "Sanierungsanfrage erfolgreich gesendet - Antwort in 24 Stunden" },
  "/kosten": { image: "/images/sanierung_preiskalkulation.webp", alt: "Sanierung München Kosten 2026 - transparente Preiskalkulation und Festpreisgarantie für alle Gewerke" },
  "/komplettsanierung": { image: "/images/komplettsanierung_ergebnis.webp", alt: "Komplettsanierung München Ergebnis - schlüsselfertig sanierte Wohnung mit allen Gewerken aus einer Hand" },
  "/badsanierung": { image: "/images/moderne_badsanierung.webp", alt: "Moderne Badsanierung München - fertig saniertes Badezimmer mit bodengleicher Dusche und hochwertigen Fliesen" },
  "/kuechensanierung": { image: "/images/moderne_kuechensanierung_ergebnis.webp", alt: "Küchensanierung München Ergebnis - modern sanierte Küche mit neuen Elektro- und Wasseranschlüssen" },
  "/bodensanierung": { image: "/images/parkettboden_sanierung_ergebnis.webp", alt: "Bodensanierung München - frisch verlegter Parkettboden nach professioneller Sanierung mit Fußbodenheizung" },
  "/elektrosanierung": { image: "/images/elektrosanierung_installation.webp", alt: "Elektrosanierung München - fachgerechte Elektroinstallation nach VDE-Norm durch zertifizierten Meisterbetrieb" },
  "/dachsanierung": { image: "/images/fertig_saniertes_hausdach.webp", alt: "Dachsanierung München - fertig saniertes Hausdach mit neuer Dämmung und Dacheindeckung" },
  "/heizungssanierung": { image: "/images/moderne_heizungsanlage_einbau.webp", alt: "Heizungssanierung München - Einbau einer modernen Heizungsanlage mit Wärmepumpe und Förderberatung" },
  "/wohnungssanierung": { image: "/images/sanierte_luxuswohnung_interieur.webp", alt: "Wohnungssanierung München Ergebnis - komplett sanierte Wohnung mit modernem Interieur und hochwertiger Ausstattung" },
  "/haussanierung": { image: "/images/haus_vorher_nachher_zickzack.webp", alt: "Haussanierung München vorher nachher - Einfamilienhaus komplett saniert mit Festpreisgarantie" },
  "/kernsanierung": { image: "/images/komplettsanierung_haus.webp", alt: "Kernsanierung München - Haus bis auf die Grundsubstanz entkernt und professionell neu aufgebaut" },
  "/energetische-sanierung": { image: "/images/energieeffizientes_saniertes_haus.webp", alt: "Energetische Sanierung München - energieeffizient saniertes Haus mit Wärmedämmung und modernen Fenstern" },
  "/rechner": { image: "/images/sanierung_preiskalkulation.webp", alt: "Sanierungskosten Rechner München - Online-Kalkulator für Badsanierung und Komplettsanierung Kosten" },
  "/kontakt": { image: "/images/kundenservice_kontakt.webp", alt: "Kontakt Sanierungsfirma München - persönliche Sanierungsberatung und kostenloser Vor-Ort-Termin" },
  "/impressum": { image: "/images/rechtliche_dokumente_impressum.webp", alt: "Impressum Sanierungsfirma München - rechtliche Informationen und Kontaktdaten" },
  "/datenschutz": { image: "/images/datenschutz_sicherheit.webp", alt: "Datenschutz Sanierungsfirma München - DSGVO-konforme Verarbeitung Ihrer Sanierungsanfragen" },
  "/ratgeber": { image: "/images/sanierungsberater_experte.webp", alt: "Sanierung Ratgeber München - Experten-Tipps für Badsanierung, Komplettsanierung und energetische Modernisierung" },
  "/faq-sanierung": { image: "/images/qualitaetskontrolle_sanierung.webp", alt: "FAQ Sanierung München - Antworten auf häufige Fragen zu Kosten, Dauer und Ablauf der Sanierung" },
  "/faq-preise": { image: "/images/sanierung_preiskalkulation.webp", alt: "FAQ und Preise Sanierung München - transparente Kostenübersicht für alle Sanierungsleistungen 2026" },
};

function getPageOgImage(path: string, baseURL: string): string {
  const entry = pageOgImageMap[path];
  if (entry) return `${baseURL}${entry.image}`;
  if (path.startsWith("/muenchen-")) return `${baseURL}/images/fachhandwerker_meisterbetriebe.webp`;
  return `${baseURL}/images/komplettsanierung_vorher_nachher.webp`;
}

function getPageOgImageAlt(path: string): string {
  const entry = pageOgImageMap[path];
  if (entry) return entry.alt;
  if (path.startsWith("/muenchen-")) {
    const district = path.replace("/muenchen-", "").replace(/-/g, " ");
    return `Sanierung ${district} München - lokaler Meisterbetrieb für Badsanierung und Komplettsanierung mit Festpreisgarantie`;
  }
  return "Sanierungsfirma München - professionelle Komplettsanierung mit Festpreisgarantie und 5 Jahre Gewährleistung";
}

function generateStaticHTML(path: string, query: Record<string, string>): string {
  const baseURL = "https://089-sanierer.de";
  const service = query.service || "";
  const serviceInfo = servicePages[service];

  let title = "Sanierung München | Badsanierung & Komplettsanierung";
  let description = "Sanierung München: Badsanierung ab 18.500€, Komplettsanierung ab 1.200€/m². 268+ zufriedene Kunden, Festpreisgarantie, 5 Jahre Gewährleistung.";
  let keywords = "Sanierung München, Sanierungen München, Sanierung aus einer Hand, Wohnungssanierung, Wohnungssanierungen, Wohnungsrenovierung München, Renovierung München, Renovierung, Renovierungen, renovierung aus einer Hand, Handwerker München, Handwerker, Generalunternehmer München, Generalunternehmer, Haussanierung München, Haussanierungen, Haus sanieren lassen, Badsanierung München, Badsanierungen sofort, Innenausbau, Kosten, Angebote, Komplettsanierung München Festpreis, Altbausanierung München";
  let mainContent = "";

  if (path === "/" || path === "") {
    mainContent = `
      <section>
        <h1>Sanierung München - 089-Sanierer Komplettsanierungen</h1>
        <p><small>Zuletzt aktualisiert: Februar 2026</small></p>
        <p><strong>Kurzantwort:</strong> 089-Sanierer ist Münchens Meisterbetrieb für Komplettsanierungen. Badsanierung ab 18.500 €, Wohnungssanierung ab 800 €/m², Komplettsanierung ab 1.200 €/m² – alles mit verbindlicher Festpreisgarantie, persönlichem Bauleiter und 5 Jahren Gewährleistung. 268+ Projekte, 4,9 Sterne, 98 % Weiterempfehlung.</p>
        
        <h2>Unsere Leistungen</h2>
        <ul>
          <li><strong>Komplettsanierung</strong> - Schlüsselfertige Sanierung ab 1.200 €/m²</li>
          <li><strong>Badsanierung</strong> - Komplettbad ab 18.500 €</li>
          <li><strong>Küchensanierung</strong> - Bauarbeiten ab 6.500 €</li>
          <li><strong>Bodensanierung</strong> - Alle Bodenbeläge ab 65 €/m²</li>
          <li><strong>Elektrosanierung</strong> - VDE-konforme Installation ab 150 €/m²</li>
          <li><strong>Heizungssanierung</strong> - Moderne Heizsysteme ab 12.000 €</li>
          <li><strong>Dachsanierung</strong> - Dämmung und Eindeckung ab 150 €/m²</li>
          <li><strong>Energetische Sanierung</strong> - KfW-förderfähig ab 200 €/m²</li>
        </ul>
        
        <h2>Warum 089-Sanierer?</h2>
        <ul>
          <li>268+ erfolgreich abgeschlossene Projekte</li>
          <li>4,9 von 5 Sternen Kundenbewertung</li>
          <li>98 % Weiterempfehlungsrate</li>
          <li>Festpreisgarantie - keine versteckten Kosten</li>
          <li>5 Jahre Gewährleistung auf alle Arbeiten</li>
          <li>Persönlicher Bauleiter für jedes Projekt</li>
          <li>Kostenlose Beratung innerhalb von 24 Stunden</li>
        </ul>
        
        <h2>Servicegebiet</h2>
        <p>Wir sind in ganz München und dem Großraum für Sie da: Schwabing, Bogenhausen, Sendling, Pasing, Trudering, Haidhausen, Giesing, Neuhausen, Nymphenburg, sowie Dachau, Starnberg, Freising, Germering und weitere Gemeinden im Umkreis von 50 km.</p>
        
        <h2>Kontakt</h2>
        <p>089-Sanierer - Komplettsanierungen Haus & Wohnung</p>
        <p>Hardenbergstr. 4, 80992 München</p>
        <p>Telefon: +49 89 444 438 872</p>
        <p>Öffnungszeiten: Mo-Fr 08:00-16:30 Uhr</p>
      </section>
    `;
  } else if (path === "/anfrage" && serviceInfo) {
    title = `${serviceInfo.title} | Festpreis 2026`;
    description = serviceInfo.description;
    keywords = servicePages[service]?.keywords || keywords;
    mainContent = `
      <section>
        <h1>${serviceInfo.title}</h1>
        <p><small>Zuletzt aktualisiert: Februar 2026</small></p>
        <p>${serviceInfo.description}</p>
        
        <h2>Preisübersicht</h2>
        <p><strong>Preisspanne:</strong> ${serviceInfo.price} (netto zzgl. MwSt., Stand 02/2026, ca.-Angaben ohne Gewähr)</p>
        <p>Verbindlicher Festpreis nach kostenloser Besichtigung. 5 Jahre Gewährleistung. 268+ abgeschlossene Projekte, 4,9 Sterne.</p>
        
        <h2>Jetzt Anfrage stellen</h2>
        <p>Fordern Sie jetzt Ihr unverbindliches Festpreis-Angebot an. Wir melden uns innerhalb von 24 Stunden bei Ihnen.</p>
        
        <h2>Kontakt</h2>
        <p>Telefon: +49 89 444 438 872</p>
      </section>
    `;
  } else if (path === "/anfrage") {
    title = "Sanierungsanfrage München | Festpreis in 24h";
    description = "Sanierungsanfrage München: Kostenlose Beratung und Festpreis-Angebot innerhalb von 24 Stunden für Ihr Sanierungsprojekt.";
    mainContent = `
      <section>
        <h1>Sanierungsanfrage</h1>
        <p>Stellen Sie jetzt Ihre unverbindliche Anfrage für Ihr Sanierungsprojekt in München.</p>
        
        <h2>Verfügbare Services</h2>
        <ul>
          ${Object.entries(servicePages).map(([key, info]) => `<li><a href="/anfrage?service=${key}">${info.title}</a> - ${info.price}</li>`).join("\n          ")}
        </ul>
        
        <h2>Kontakt</h2>
        <p>Telefon: 0152 122 740 43</p>
      </section>
    `;
  } else if (path === "/faq-preise") {
    title = "FAQ & Preise Sanierung München 2026 | Kosten";
    description = "Häufige Fragen und Preisübersicht für Sanierungen in München 2026. Transparente Kosten für Bad, Küche, Elektro und mehr.";
    keywords = "Sanierung München Kosten, Sanierungen München, Renovierung München, Renovierungen, Handwerker München, Handwerker, Generalunternehmer München, Generalunternehmer, Badsanierung München, Badsanierungen sofort, Wohnungssanierung, Wohnungssanierungen, Wohnungsrenovierung München, Haussanierung München, Haussanierungen, Haus sanieren lassen, Sanierung aus einer Hand, renovierung aus einer Hand, Innenausbau, Kosten, Angebote, Komplettsanierung Preis München, Altbausanierung München";
    mainContent = `
      <section>
        <h1>FAQ & Preise - Sanierung München</h1>
        <p><small>Zuletzt aktualisiert: Februar 2026</small></p>
        <p><strong>Kurzantwort:</strong> Sanierungskosten in München 2026: Badsanierung ab 18.500 € (6-8 m²), Komplettsanierung ab 1.200 €/m², Küchensanierung ab 6.500 €, Elektro ab 150 €/m². Alle Preise als verbindliche Festpreise bei 089-Sanierer, mit 5 Jahren Gewährleistung und persönlichem Bauleiter.</p>
        
        <h2>Preisübersicht (München, Stand 02/2026, netto zzgl. MwSt.)</h2>
        
        <h3>Komplettsanierung</h3>
        <p>Standard: 1.000 - 1.500 €/m² | Gehoben: 1.500 - 2.300 €/m²</p>
        
        <h3>Badsanierung</h3>
        <p>Gäste-WC: 8.000 - 12.000 € | Standard-Bad: 16.000 - 22.000 € | Komfort-Bad: 22.000 - 32.000 € | Luxus-Bad: 35.000 - 50.000 €</p>
        
        <h3>Küchensanierung (nur Bauarbeiten, ohne Möbel)</h3>
        <p>Klein: 6.500 - 10.000 € | Mittel: 10.000 - 15.000 € | Groß: 15.000 - 22.000 €</p>
        
        <h3>Bodensanierung</h3>
        <p>Vinyl/Laminat: 65 - 100 €/m² | Parkett: 100 - 150 €/m² | Fliesen: 120 - 200 €/m²</p>
        
        <h3>Elektrosanierung</h3>
        <p>Teilsanierung: 85 - 130 €/m² | Komplett: 130 - 200 €/m² | Smart Home: 200 - 300 €/m²</p>
        
        <h3>Heizungssanierung</h3>
        <p>Gasheizung: 12.000 - 20.000 € | Wärmepumpe: 25.000 - 50.000 € | Fußbodenheizung: 80 - 150 €/m²</p>
        
        <h2>Häufige Fragen</h2>
        
        <h3>Wie lange dauert eine Badsanierung?</h3>
        <p>Eine Standard-Badsanierung dauert in der Regel 10-14 Arbeitstage.</p>
        
        <h3>Bieten Sie Festpreise an?</h3>
        <p>Ja, wir arbeiten mit Festpreisgarantie. Nach der Besichtigung erhalten Sie ein verbindliches Angebot.</p>
        
        <h3>Welche Gewährleistung gibt es?</h3>
        <p>Wir bieten 5 Jahre Gewährleistung auf alle unsere Arbeiten.</p>
      </section>
    `;
  } else if (path === "/impressum") {
    title = "Impressum | Sanierungsfirma München";
    description = "Impressum der Sanierungsfirma München. Rechtliche Angaben, Kontaktdaten und Unternehmensinfo gemäß § 5 TMG.";
    keywords = "Impressum Sanierungsfirma München, Komplettsanierungen Haus Wohnung München, Sanierungsfirma München Adresse, Handwerksbetrieb München Impressum, Renovierungsfirma München rechtlich, Bausanierung München Anbieter Info, Sanierung München Unternehmen, Renovierung München Firma, Handwerker München Firmendaten, Sanierungsdienstleister München, Bauunternehmen München Impressum, Sanierungsbetrieb München Info, Renovierungsservice München legal";
    mainContent = `
      <section>
        <h1>Impressum</h1>
        <h2>Angaben gemäß § 5 TMG</h2>
        <p>089-Sanierer - Komplettsanierungen Haus & Wohnung</p>
        <p>Hardenbergstr. 4</p>
        <p>80992 München</p>
        <p>Telefon: 0152 122 740 43</p>
        <p>Steuernummer: folgt</p>
        
        <h2>KI-Transparenzhinweis (EU AI Act)</h2>
        <p>089-Sanierer setzt zur Unterstützung der Geschäftsprozesse KI-basierte Systeme ein. Diese werden u.a. bei der Angebotserstellung, Kommunikation und Dokumentenverarbeitung genutzt. Alle endgültigen Entscheidungen werden von qualifizierten Mitarbeitern getroffen und verantwortet.</p>
        <p>Rechtsgrundlage: Verordnung (EU) 2024/1689 (EU AI Act), Art. 50 | DSGVO Art. 22</p>
      </section>
    `;
  } else if (path === "/datenschutz") {
    title = "Datenschutzerklärung | Sanierungsfirma München DSGVO-konform";
    description = "Datenschutzerklärung der Sanierungsfirma München gemäß DSGVO. Informationen zur Datenverarbeitung und Ihren Rechten.";
    keywords = "Datenschutz Sanierungsfirma München, Datenschutzerklärung Sanierungsfirma München, DSGVO Handwerksbetrieb München, Datenschutz Renovierungsfirma München, personenbezogene Daten Sanierung München, Cookie Richtlinie Handwerker München, Datenschutzrechte Bauunternehmen München, Sanierung München Datenschutzinfo, Renovierung München Privatsphäre, Handwerker München Datenschutzerklärung, DSGVO konform Sanierung München, Datenschutz Bausanierung München";
    mainContent = `
      <section>
        <h1>Datenschutzerklärung</h1>
        <h2>1. Verantwortlicher</h2>
        <p>089-Sanierer - Komplettsanierungen Haus & Wohnung, Hardenbergstr. 4, 80992 München</p>
        
        <h2>2. Erhebung und Speicherung personenbezogener Daten</h2>
        <p>Wir erheben personenbezogene Daten nur, wenn Sie uns diese freiwillig mitteilen.</p>
        
        <h2>3. Ihre Rechte</h2>
        <p>Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung Ihrer Daten.</p>
        
        <h2>KI-Transparenzhinweis</h2>
        <p>089-Sanierer setzt KI-basierte Systeme ein. Rechtsgrundlage: EU AI Act (Verordnung 2024/1689), Art. 50.</p>
      </section>
    `;
  } else if (path === "/kontakt") {
    title = "Kontakt Sanierung München | Kostenlose Beratung";
    description = "Kontaktieren Sie uns für Ihre Sanierungsanfrage in München. Kostenlose Beratung und Vor-Ort-Besichtigung.";
    keywords = "Kontakt Sanierung München, Sanierungsfirma München Telefon, Sanierungsanfrage München stellen, Handwerker München anrufen, Renovierungsfirma München kontaktieren, Badsanierung München anfragen, Kostenvoranschlag Sanierung München, Beratungstermin Renovierung München, Sanierungsfirma München E-Mail, Handwerker München Öffnungszeiten, Komplettsanierung München Termin, Sanierung München Rückruf, Renovierungsberatung München gratis, Sanierungsfirma München Anfahrt";
    mainContent = `
      <section>
        <h1>Kontakt</h1>
        <h2>089-Sanierer - Komplettsanierungen Haus & Wohnung</h2>
        <p>Hardenbergstr. 4, 80992 München</p>
        <p>Telefon: 0152 122 740 43</p>
        <h3>Öffnungszeiten</h3>
        <p>Montag - Freitag: 08:00 - 16:30 Uhr</p>
      </section>
    `;
  } else if (path === "/bestaetigung") {
    title = "Anfrage erhalten – Beratung startet in 24h";
    description = "Vielen Dank für Ihre Sanierungsanfrage. Wir melden uns innerhalb von 24 Stunden bei Ihnen.";
    keywords = "Sanierungsanfrage gesendet München, Anfrage Bestätigung Sanierungsfirma München, Renovierungsanfrage erfolgreich München, nächste Schritte Sanierung München, Beratungstermin bestätigt München, Rückmeldung Sanierungsfirma München, Kontaktaufnahme bestätigt Handwerker München, Angebotsanfrage Renovierung München, Sanierung München Terminbestätigung, Projektanfrage München Sanierung, Anfrage bestätigt Sanierungsfirma München, Kostenvoranschlag angefordert München, Sanierungsberatung angefragt München, Renovierung München Anfrage Status, Handwerkeranfrage München erfolgreich";
    mainContent = `
      <section>
        <h1>Vielen Dank für Ihre Anfrage!</h1>
        <p>Ihre Sanierungsanfrage wurde erfolgreich übermittelt.</p>
        
        <h2>Nächste Schritte</h2>
        <ul>
          <li>Wir prüfen Ihre Anfrage und melden uns innerhalb von 24 Stunden</li>
          <li>Sie erhalten eine Bestätigung per E-Mail</li>
          <li>Bei Fragen erreichen Sie uns unter 0152 122 740 43</li>
        </ul>
        
        <h2>Kontakt</h2>
        <p>089-Sanierer - Komplettsanierungen Haus & Wohnung</p>
        <p>Telefon: 0152 122 740 43</p>
      </section>
    `;
  } else if (path === "/ratgeber") {
    title = "Sanierung Ratgeber München 2026 | Kosten & Tipps";
    description = "Sanierung München Ratgeber 2026: Preise für Haussanierung, Badsanierung, Dachsanierung und mehr. Tipps zu Förderung und Planung.";
    keywords = "Haussanierung München, Haussanierungen, Haus sanieren lassen, Sanierung München, Sanierungen München, Renovierung München, Renovierungen, Handwerker München, Handwerker, Generalunternehmer München, Generalunternehmer, Wohnungssanierung, Wohnungssanierungen, Wohnungsrenovierung München, Badsanierung München, Sanierung aus einer Hand, renovierung aus einer Hand, Innenausbau, Kosten, Angebote, KfW Förderung Sanierung, Altbausanierung München, Sanierung Ratgeber München, Sanierung Tipps München";
    mainContent = `
      <section>
        <h1>Sanierungskosten München - Ihr Ratgeber für faire Preise</h1>
        <p>Alle Preisangaben auf dieser Seite sind unverbindliche Richtwerte. Stand: Dezember 2025, Preise netto zzgl. 19% MwSt.</p>
        
        <h2>Was kostet eine Haussanierung in München?</h2>
        <p>Eine Haussanierung in München kostet je nach Umfang und Zustand:</p>
        <ul>
          <li><strong>Teilsanierung:</strong> 400 - 800 €/m²</li>
          <li><strong>Komplettsanierung Standard:</strong> 1.000 - 1.500 €/m²</li>
          <li><strong>Komplettsanierung Gehoben:</strong> 1.500 - 2.300 €/m²</li>
        </ul>
        <p>Die tatsächlichen Kosten hängen von Faktoren wie Baujahr, Gebäudezustand, Energiestandard und gewünschter Ausstattung ab.</p>
        
        <h2>Was kostet Fassade streichen in München?</h2>
        <p>Fassadenanstrich und Fassadensanierung in München:</p>
        <ul>
          <li><strong>Einfacher Anstrich:</strong> 25 - 40 €/m²</li>
          <li><strong>Mit Grundierung & Ausbesserung:</strong> 40 - 60 €/m²</li>
          <li><strong>Vollwärmeschutz (WDVS):</strong> 120 - 200 €/m²</li>
        </ul>
        
        <h2>Wie teuer ist eine Dachsanierung in München?</h2>
        <p>Dachsanierung und Dachdämmung in München:</p>
        <ul>
          <li><strong>Dacheindeckung:</strong> 80 - 150 €/m²</li>
          <li><strong>Dachdämmung (Aufsparren):</strong> 150 - 250 €/m²</li>
          <li><strong>Komplettsanierung:</strong> 200 - 350 €/m²</li>
        </ul>
        <p>BAFA- und KfW-Förderung für energetische Dachsanierung möglich.</p>
        
        <h2>Was kostet eine Badsanierung in München?</h2>
        <p>Badsanierung München - Preisübersicht:</p>
        <ul>
          <li><strong>Gäste-WC (bis 3m²):</strong> 8.000 - 12.000 €</li>
          <li><strong>Standard-Bad (5-6m²):</strong> 16.000 - 22.000 €</li>
          <li><strong>Komfort-Bad (6-8m²):</strong> 22.000 - 32.000 €</li>
          <li><strong>Luxus-Bad (ab 8m²):</strong> 35.000 - 50.000 €</li>
        </ul>
        
        <h2>Was kostet eine Kellersanierung in München?</h2>
        <p>Kellersanierung und Kellerabdichtung:</p>
        <ul>
          <li><strong>Innendämmung:</strong> 50 - 100 €/m²</li>
          <li><strong>Kellerabdichtung (innen):</strong> 150 - 250 €/m²</li>
          <li><strong>Kellerabdichtung (außen):</strong> 300 - 500 €/m²</li>
        </ul>
        
        <h2>Lohnt sich Wärmedämmung in München? Kosten & Förderung</h2>
        <p>Wärmedämmung München - Preise und Fördermöglichkeiten:</p>
        <ul>
          <li><strong>Fassadendämmung WDVS:</strong> 120 - 200 €/m²</li>
          <li><strong>Dachdämmung:</strong> 150 - 250 €/m²</li>
          <li><strong>Kellerdeckendämmung:</strong> 40 - 80 €/m²</li>
        </ul>
        <p>BAFA-Förderung: 15-20% Zuschuss möglich. KfW-Kredit: vergünstigte Konditionen.</p>
        
        <h2>Was kostet eine Wohnungssanierung in München?</h2>
        <p>Wohnungssanierung München:</p>
        <ul>
          <li><strong>Renovierung (Böden, Wände, Decken):</strong> 300 - 600 €/m²</li>
          <li><strong>Teilsanierung (inkl. Bad/Küche):</strong> 600 - 1.000 €/m²</li>
          <li><strong>Komplettsanierung:</strong> 1.000 - 1.800 €/m²</li>
        </ul>
        
        <h2>Welche Förderung gibt es für energetische Sanierung in München?</h2>
        <p>Förderprogramme für energetische Sanierung:</p>
        <ul>
          <li><strong>KfW-Kredit 261/262:</strong> Zinsgünstige Kredite bis 150.000 €</li>
          <li><strong>BAFA Heizungsförderung:</strong> 30-70% Zuschuss für Wärmepumpe</li>
          <li><strong>BAFA Gebäudehülle:</strong> 15-20% für Dämmung & Fenster</li>
          <li><strong>Förderprogramm Energieberatung:</strong> 80% Zuschuss</li>
        </ul>
        
        <h2>Kontakt</h2>
        <p>089-Sanierer - Komplettsanierungen Haus & Wohnung</p>
        <p>Telefon: 0152 122 740 43</p>
        <p>Kostenlose Erstberatung - Wir melden uns innerhalb von 24 Stunden!</p>
      </section>
    `;
  } else if (path === "/kosten") {
    title = "Sanierung München Kosten 2026 | Preise pro m²";
    description = "Sanierung München Kosten 2026: Badsanierung ab 18.500€, Komplettsanierung ab 1.200€/m². Festpreisgarantie, 5 Jahre Gewährleistung.";
    keywords = "Sanierung München Kosten, was kostet Sanierung München, Badsanierung Kosten München, Komplettsanierung Preis München, Festpreis Sanierung München";
    mainContent = `
      <section>
        <h1>Was kostet eine Sanierung in München?</h1>
        <p>Transparente Festpreise für Ihre Sanierung. Alle Preise netto zzgl. MwSt., Stand 01/2025.</p>
        
        <h2>Preisübersicht Sanierung München</h2>
        <ul>
          <li><strong>Komplettsanierung:</strong> ab 1.200 €/m²</li>
          <li><strong>Badsanierung:</strong> ab 18.500 €</li>
          <li><strong>Wohnungssanierung:</strong> ab 800 €/m²</li>
          <li><strong>Kernsanierung:</strong> ab 1.200 €/m²</li>
        </ul>
        
        <h2>Unsere Vorteile</h2>
        <ul>
          <li>Festpreisgarantie - keine versteckten Kosten</li>
          <li>5 Jahre Gewährleistung</li>
          <li>Kostenlose Beratung vor Ort</li>
          <li>268+ zufriedene Kunden in München</li>
        </ul>
        
        <h2>Jetzt Angebot anfordern</h2>
        <p><a href="/anfrage">Kostenlose Beratung</a> | Telefon: 0152 1227 4043</p>
      </section>
    `;
  } else if (path === "/badsanierung") {
    title = "Badsanierung München ab 18.500€ | Festpreis 2026";
    description = "Badsanierung München ab 18.500€: Komplett-Badsanierung mit Fliesen, Sanitär, Elektro. Festpreisgarantie, 5 Jahre Gewährleistung.";
    keywords = "Badsanierung München, Bad sanieren München, Badsanierung Kosten München, Bad renovieren München, Badezimmer sanieren München";
    mainContent = `
      <section>
        <h1>Badsanierung München - Komplett ab 18.500€</h1>
        <p>Ihr Bad in neuen Händen. Alles aus einer Hand mit Festpreisgarantie.</p>
        
        <h2>Unsere Badsanierung beinhaltet</h2>
        <ul>
          <li>Komplette Fliesenarbeiten</li>
          <li>Sanitärinstallation</li>
          <li>Elektroinstallation</li>
          <li>Malerarbeiten</li>
        </ul>
        
        <h2>Preise Badsanierung München</h2>
        <ul>
          <li>Gäste-WC: 8.000 - 12.000 €</li>
          <li>Standard-Bad (6-8 m²): 16.000 - 22.000 €</li>
          <li>Komfort-Bad: 22.000 - 32.000 €</li>
        </ul>
        
        <p><a href="/anfrage?service=badsanierung">Jetzt Angebot anfordern</a></p>
      </section>
    `;
  } else if (path === "/wohnungssanierung") {
    title = "Wohnungssanierung München ab 800€/m² | Festpreis";
    description = "Wohnungssanierung München zum Festpreis ab 800€/m². Komplettsanierung aus einer Hand. 268+ zufriedene Kunden, 5 Jahre Gewährleistung.";
    keywords = "Wohnungssanierung München, Wohnung sanieren München, Wohnung renovieren München, Altbauwohnung sanieren München";
    mainContent = `
      <section>
        <h1>Wohnungssanierung München - ab 800€/m²</h1>
        <p>Komplette Wohnungssanierung aus einer Hand mit Festpreisgarantie.</p>
        
        <h2>Leistungen</h2>
        <ul>
          <li>Badsanierung</li>
          <li>Küchensanierung</li>
          <li>Bodensanierung</li>
          <li>Elektrosanierung</li>
          <li>Malerarbeiten</li>
        </ul>
        
        <p><a href="/anfrage?service=komplettsanierung">Jetzt Angebot anfordern</a></p>
      </section>
    `;
  } else if (path === "/haussanierung") {
    title = "Haussanierung München ab 1.200€/m² | Festpreis";
    description = "Haussanierung München ab 1.200€/m²: Einfamilienhaus, Mehrfamilienhaus komplett sanieren. Alle Gewerke aus einer Hand mit Festpreisgarantie.";
    keywords = "Haussanierung München, Haus sanieren München, Einfamilienhaus sanieren München, Haus renovieren München";
    mainContent = `
      <section>
        <h1>Haussanierung München - ab 1.200€/m²</h1>
        <p>Ihr Haus in neuen Händen. Komplette Sanierung aus einer Hand.</p>
        
        <h2>Wir sanieren</h2>
        <ul>
          <li>Einfamilienhäuser</li>
          <li>Mehrfamilienhäuser</li>
          <li>Doppelhaushälften</li>
          <li>Reihenhäuser</li>
        </ul>
        
        <p><a href="/anfrage?service=komplettsanierung">Jetzt Angebot anfordern</a></p>
      </section>
    `;
  } else if (path === "/kernsanierung") {
    title = "Kernsanierung München ab 1.200€/m² | Festpreis";
    description = "Kernsanierung München ab 1.200€/m²: Altbau bis auf die Grundsubstanz entkernen und komplett neu aufbauen. Festpreisgarantie.";
    keywords = "Kernsanierung München, Kernsanierung Kosten München, Altbau Kernsanierung München, Haus entkernen München";
    mainContent = `
      <section>
        <h1>Kernsanierung München - ab 1.200€/m²</h1>
        <p>Zurück zum Kern, neu aufgebaut. Professionelle Kernsanierung in München.</p>
        
        <h2>Kernsanierung beinhaltet</h2>
        <ul>
          <li>Rückbau bis zur Grundsubstanz</li>
          <li>Neue Elektroinstallation</li>
          <li>Neue Sanitärinstallation</li>
          <li>Neue Heizung</li>
          <li>Kompletter Innenausbau</li>
        </ul>
        
        <p><a href="/anfrage?service=komplettsanierung">Jetzt Angebot anfordern</a></p>
      </section>
    `;
  } else if (path === "/agb") {
    title = "AGB | Geschäftsbedingungen Sanierung München";
    description = "Allgemeine Geschäftsbedingungen der Sanierungsfirma München. Festpreisgarantie, 5 Jahre Gewährleistung, transparente Zahlungsbedingungen.";
    keywords = "AGB Sanierungsfirma München, Allgemeine Geschäftsbedingungen Sanierung München, Vertragsbedingungen Renovierung München, Gewährleistung Sanierung München, Zahlungsbedingungen Handwerker München";
    mainContent = `
      <section>
        <h1>Allgemeine Geschäftsbedingungen (AGB)</h1>
        <p><small>Stand: Februar 2026</small></p>

        <h2>§ 1 Geltungsbereich</h2>
        <p>Diese Allgemeinen Geschäftsbedingungen gelten für alle Verträge zwischen 089-Sanierer - Komplettsanierungen Haus & Wohnung, Hardenbergstr. 4, 80992 München (nachfolgend „Auftragnehmer") und dem Auftraggeber über Sanierungs-, Renovierungs- und Bauleistungen.</p>

        <h2>§ 2 Vertragsschluss und Festpreisgarantie</h2>
        <p>Ein Vertrag kommt durch schriftliche Auftragsbestätigung des Auftragnehmers zustande. Das Angebot enthält einen verbindlichen Festpreis. Nachträgliche Preisänderungen erfolgen nur bei vom Auftraggeber gewünschten Zusatzleistungen, die schriftlich vereinbart werden.</p>

        <h2>§ 3 Leistungsumfang</h2>
        <p>Der Leistungsumfang ergibt sich aus dem schriftlichen Angebot und der Auftragsbestätigung. Zusätzliche Leistungen bedürfen der schriftlichen Vereinbarung. Die Ausführung erfolgt nach den anerkannten Regeln der Technik und den einschlägigen DIN-Normen.</p>

        <h2>§ 4 Zahlungsbedingungen</h2>
        <p>Die Zahlung erfolgt in Abschlägen gemäß Baufortschritt: 30 % bei Auftragserteilung, 30 % bei Erreichen des Rohbauzustands, 30 % bei Fertigstellung der Arbeiten, 10 % nach mangelfreier Abnahme. Zahlungen sind innerhalb von 14 Tagen nach Rechnungsstellung fällig.</p>

        <h2>§ 5 Gewährleistung</h2>
        <p>Die Gewährleistungsfrist beträgt 5 Jahre ab Abnahme der Leistung. Mängel sind unverzüglich schriftlich anzuzeigen. Der Auftragnehmer hat das Recht zur Nachbesserung innerhalb einer angemessenen Frist.</p>

        <h2>§ 6 Haftung</h2>
        <p>Der Auftragnehmer haftet für Schäden, die durch vorsätzliches oder grob fahrlässiges Verhalten entstehen. Die Haftung für leichte Fahrlässigkeit ist auf vorhersehbare, vertragstypische Schäden begrenzt. Der Auftragnehmer verfügt über eine Betriebshaftpflichtversicherung.</p>

        <h2>§ 7 Terminplanung und Verzug</h2>
        <p>Die voraussichtliche Bauzeit wird im Angebot angegeben. Verzögerungen durch höhere Gewalt, Witterung oder unvorhergesehene Bausubstanzschäden verlängern die Ausführungsfrist angemessen. Der Auftraggeber wird unverzüglich über Terminänderungen informiert.</p>

        <h2>§ 8 Abnahme</h2>
        <p>Nach Fertigstellung der Arbeiten erfolgt eine gemeinsame Abnahmebegehung. Etwaige Mängel werden protokolliert und innerhalb einer vereinbarten Frist beseitigt. Die Abnahme gilt als erfolgt, wenn der Auftraggeber die Leistung ohne wesentliche Mängelrüge in Gebrauch nimmt.</p>

        <h2>§ 9 Schlussbestimmungen</h2>
        <p>Es gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand ist München. Sollten einzelne Bestimmungen unwirksam sein, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.</p>

        <h2>Kontakt</h2>
        <p>089-Sanierer - Komplettsanierungen Haus & Wohnung</p>
        <p>Hardenbergstr. 4, 80992 München</p>
        <p>Telefon: +49 89 444 438 872</p>
      </section>
    `;
  } else if (path === "/gewerke") {
    title = "Gewerke Sanierung München | Alle Leistungen";
    description = "Alle Gewerke für Ihre Sanierung in München: Badsanierung, Elektro, Heizung, Boden, Dach, Küche und mehr. Meisterbetrieb mit Festpreisgarantie.";
    keywords = "Gewerke Sanierung München, Sanierungsleistungen München, Handwerker Gewerke München, Badsanierung München, Elektrosanierung München, Heizungssanierung München, Bodensanierung München, Dachsanierung München, Küchensanierung München";
    mainContent = `
      <section>
        <h1>Unsere Gewerke - Sanierungsleistungen in München</h1>
        <p><small>Zuletzt aktualisiert: Februar 2026</small></p>
        <p>Wählen Sie die passenden Gewerke für Ihr Sanierungsprojekt. Alle Leistungen aus einer Hand mit Festpreisgarantie und 5 Jahren Gewährleistung.</p>

        <h2>Badsanierung</h2>
        <p>Komplett-Badsanierung inkl. Fliesen, Sanitär, Elektro. Ab 18.500 € (Standard-Bad 6-8 m²). Barrierefreie Lösungen möglich.</p>

        <h2>Küchensanierung</h2>
        <p>Bauarbeiten für Ihre neue Küche: Fliesen, Elektro, Wasseranschlüsse. Ab 6.500 € (ohne Küchenmöbel).</p>

        <h2>Bodensanierung</h2>
        <p>Parkett, Fliesen, Vinyl, Laminat. Estricharbeiten und Fußbodenheizung. Ab 65 €/m².</p>

        <h2>Elektrosanierung</h2>
        <p>VDE-konforme Elektroinstallation, Sicherungskasten, Leitungen. Ab 80 €/m². Smart-Home-Vorbereitung möglich.</p>

        <h2>Heizungssanierung</h2>
        <p>Gasheizung, Wärmepumpe, Fußbodenheizung. Ab 12.000 €. KfW-Förderberatung inklusive.</p>

        <h2>Dachsanierung</h2>
        <p>Dachdämmung, Dacheindeckung, Dachfenster. Ab 150 €/m². BAFA- und KfW-förderfähig.</p>

        <h2>Energetische Sanierung</h2>
        <p>Wärmedämmung, Fensteraustausch, Heizungsmodernisierung. Ab 200 €/m². Förderberatung inklusive.</p>

        <h2>Komplettsanierung</h2>
        <p>Schlüsselfertige Sanierung aller Gewerke. Ab 920 €/m² (Standard) bis 2.300 €/m² (Gehoben).</p>

        <h2>Malerarbeiten</h2>
        <p>Wände, Decken, Fassade. Professionelle Malerarbeiten als Einzelleistung oder im Paket.</p>

        <h2>Trockenbau</h2>
        <p>Trennwände, Abhangdecken, Dachausbau. Professioneller Trockenbau für Ihre Raumgestaltung.</p>

        <p><a href="/anfrage">Jetzt unverbindlich anfragen</a> | <a href="/rechner">Kosten berechnen</a></p>
      </section>
    `;
  } else if (path === "/cookies") {
    title = "Cookie-Richtlinie | Datenschutz & Cookies";
    description = "Informationen zur Verwendung von Cookies auf unserer Sanierung München Website. Technisch notwendige und optionale Analyse-Cookies.";
    keywords = "Cookie Richtlinie Sanierungsfirma München, Cookies Sanierung München, Datenschutz Cookies Handwerker München, Cookie Einstellungen Sanierungsfirma München";
    mainContent = `
      <section>
        <h1>Cookie-Richtlinie</h1>
        <p><small>Stand: Februar 2026</small></p>

        <h2>Was sind Cookies?</h2>
        <p>Cookies sind kleine Textdateien, die beim Besuch unserer Website auf Ihrem Endgerät gespeichert werden. Sie dienen dazu, unsere Website nutzerfreundlicher und sicherer zu gestalten.</p>

        <h2>Technisch notwendige Cookies</h2>
        <p>Diese Cookies sind für den Betrieb der Website erforderlich und können nicht deaktiviert werden. Sie ermöglichen grundlegende Funktionen wie Seitennavigation, Formulareingaben und Cookie-Einstellungen. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse).</p>

        <h2>Analyse-Cookies</h2>
        <p>Mit Ihrer Einwilligung setzen wir Analyse-Cookies ein, um die Nutzung unserer Website zu verstehen und zu verbessern. Diese Cookies erfassen anonymisierte Daten über Seitenaufrufe und Nutzerverhalten. Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO (Einwilligung). Sie können Ihre Einwilligung jederzeit widerrufen.</p>

        <h2>Cookie-Einstellungen verwalten</h2>
        <p>Sie können Ihre Cookie-Einstellungen jederzeit über den Cookie-Banner am unteren Bildschirmrand ändern. Alternativ können Sie Cookies in Ihren Browsereinstellungen verwalten oder löschen.</p>

        <h2>Speicherdauer</h2>
        <p>Technisch notwendige Cookies werden nach Beendigung der Browsersitzung gelöscht (Session-Cookies). Analyse-Cookies werden nach maximal 12 Monaten automatisch gelöscht.</p>

        <h2>Kontakt</h2>
        <p>Bei Fragen zum Datenschutz erreichen Sie uns unter:</p>
        <p>089-Sanierer - Komplettsanierungen Haus & Wohnung</p>
        <p>Hardenbergstr. 4, 80992 München</p>
        <p>Telefon: +49 89 444 438 872</p>
      </section>
    `;
  } else if (path === "/barrierefreiheit") {
    title = "Barrierefreiheit | Zugänglichkeit der Website";
    description = "Erklärung zur Barrierefreiheit unserer Sanierung München Website. Wir streben die Einhaltung von WCAG 2.1 Level AA an.";
    keywords = "Barrierefreiheit Sanierungsfirma München, Accessibility Sanierung München, WCAG 2.1 Sanierungsfirma München, barrierefreie Website Handwerker München";
    mainContent = `
      <section>
        <h1>Erklärung zur Barrierefreiheit</h1>
        <p><small>Stand: Februar 2026</small></p>

        <h2>Unser Anspruch</h2>
        <p>089-Sanierer ist bestrebt, die Website 089-sanierer.de barrierefrei zugänglich zu gestalten. Wir orientieren uns an den Web Content Accessibility Guidelines (WCAG) 2.1 Level AA und den Anforderungen der Barrierefreie-Informationstechnik-Verordnung (BITV 2.0).</p>

        <h2>Umgesetzte Maßnahmen</h2>
        <ul>
          <li>Semantische HTML-Struktur mit korrekten Überschriftenhierarchien</li>
          <li>Alternativtexte für alle informativen Bilder</li>
          <li>Ausreichende Farbkontraste gemäß WCAG AA-Standard</li>
          <li>Tastaturnavigation für alle interaktiven Elemente</li>
          <li>Responsives Design für verschiedene Bildschirmgrößen</li>
          <li>Fokus-Indikatoren für Tastaturnutzer</li>
        </ul>

        <h2>Bekannte Einschränkungen</h2>
        <p>Trotz unserer Bemühungen können einzelne Inhalte noch nicht vollständig barrierefrei sein. Wir arbeiten kontinuierlich an der Verbesserung der Zugänglichkeit.</p>

        <h2>Feedback und Kontakt</h2>
        <p>Wenn Sie auf Barrieren stoßen oder Verbesserungsvorschläge haben, kontaktieren Sie uns bitte:</p>
        <p>089-Sanierer - Komplettsanierungen Haus & Wohnung</p>
        <p>Hardenbergstr. 4, 80992 München</p>
        <p>Telefon: +49 89 444 438 872</p>
        <p>Wir nehmen Ihr Anliegen ernst und bemühen uns, Barrieren zeitnah zu beseitigen.</p>
      </section>
    `;
  } else if (path === "/termin") {
    title = "Beratungstermin München | Kostenlose Besichtigung";
    description = "Vereinbaren Sie einen kostenlosen Beratungstermin für Ihre Sanierung in München. Vor-Ort-Besichtigung und unverbindliches Festpreis-Angebot.";
    keywords = "Termin Sanierung München, Beratungstermin Sanierungsfirma München, kostenlose Besichtigung Sanierung München, Sanierungsberatung München Termin, Vor-Ort-Termin Renovierung München";
    mainContent = `
      <section>
        <h1>Termin vereinbaren - Kostenlose Sanierungsberatung</h1>
        <p><small>Zuletzt aktualisiert: Februar 2026</small></p>
        <p>Vereinbaren Sie jetzt Ihren kostenlosen und unverbindlichen Beratungstermin. Wir besichtigen Ihr Objekt vor Ort und erstellen Ihnen ein verbindliches Festpreis-Angebot.</p>

        <h2>So funktioniert es</h2>
        <ul>
          <li><strong>Schritt 1:</strong> Termin online buchen oder telefonisch vereinbaren</li>
          <li><strong>Schritt 2:</strong> Kostenlose Vor-Ort-Besichtigung durch unseren Experten</li>
          <li><strong>Schritt 3:</strong> Verbindliches Festpreis-Angebot innerhalb von 48 Stunden</li>
        </ul>

        <h2>Telefonische Terminvereinbarung</h2>
        <p>Rufen Sie uns direkt an: <strong>+49 89 444 438 872</strong></p>
        <p>Unsere Öffnungszeiten: Montag bis Freitag, 08:00 - 16:30 Uhr</p>

        <h2>Was erwartet Sie beim Beratungstermin?</h2>
        <ul>
          <li>Persönliche Begehung Ihres Objekts</li>
          <li>Aufnahme Ihrer Wünsche und Anforderungen</li>
          <li>Fachkundige Einschätzung des Sanierungsbedarfs</li>
          <li>Transparente Kostenaufstellung</li>
          <li>Beantwortung all Ihrer Fragen</li>
        </ul>

        <h2>Unser Service</h2>
        <p>Die Beratung ist komplett kostenlos und unverbindlich. Sie erhalten ein verbindliches Festpreis-Angebot mit 5 Jahren Gewährleistung. Servicegebiet: München und Umgebung (bis 50 km).</p>

        <h2>Kontakt</h2>
        <p>089-Sanierer - Komplettsanierungen Haus & Wohnung</p>
        <p>Hardenbergstr. 4, 80992 München</p>
        <p>Telefon: +49 89 444 438 872</p>
      </section>
    `;
  } else if (path === "/rechner") {
    title = "Sanierungskosten Rechner München | Online 2026";
    description = "Berechnen Sie die Kosten für Ihre Sanierung in München 2026. Online-Rechner für Badsanierung, Komplettsanierung und Wohnungssanierung.";
    keywords = "Sanierungskosten Rechner München, Kosten berechnen Sanierung München, Badsanierung Rechner München, Komplettsanierung Kosten Rechner, Renovierungskosten München berechnen, Sanierung Preiskalkulator München";
    mainContent = `
      <section>
        <h1>Sanierungskosten Rechner München</h1>
        <p><small>Zuletzt aktualisiert: Februar 2026</small></p>
        <p>Berechnen Sie online die voraussichtlichen Kosten für Ihre Sanierung in München. Unser Rechner liefert Ihnen eine erste Orientierung auf Basis aktueller Marktpreise.</p>

        <h2>Preisübersicht (netto zzgl. MwSt., Stand 02/2026)</h2>
        <ul>
          <li><strong>Badsanierung:</strong> 18.500 - 50.000 € (je nach Größe und Ausstattung)</li>
          <li><strong>Küchensanierung:</strong> 6.500 - 22.000 € (Bauarbeiten ohne Möbel)</li>
          <li><strong>Bodensanierung:</strong> 65 - 200 €/m² (Vinyl bis Fliesen)</li>
          <li><strong>Elektrosanierung:</strong> 80 - 300 €/m² (Teilsanierung bis Smart Home)</li>
          <li><strong>Heizungssanierung:</strong> 12.000 - 65.000 € (Gas bis Wärmepumpe)</li>
          <li><strong>Dachsanierung:</strong> 150 - 350 €/m²</li>
          <li><strong>Komplettsanierung:</strong> 920 - 2.300 €/m²</li>
          <li><strong>Energetische Sanierung:</strong> 200 - 500 €/m²</li>
        </ul>

        <h2>So funktioniert der Rechner</h2>
        <ul>
          <li>Wählen Sie die gewünschten Sanierungsleistungen</li>
          <li>Geben Sie die Fläche bzw. Raumgröße ein</li>
          <li>Wählen Sie den gewünschten Ausstattungsstandard</li>
          <li>Erhalten Sie eine sofortige Kostenschätzung</li>
        </ul>

        <h2>Verbindliches Angebot gewünscht?</h2>
        <p>Der Online-Rechner liefert eine unverbindliche Orientierung. Für ein verbindliches Festpreis-Angebot vereinbaren Sie eine kostenlose Vor-Ort-Besichtigung.</p>
        <p><a href="/termin">Termin vereinbaren</a> | <a href="/anfrage">Anfrage stellen</a></p>

        <h2>Kontakt</h2>
        <p>089-Sanierer - Komplettsanierungen Haus & Wohnung</p>
        <p>Telefon: +49 89 444 438 872</p>
      </section>
    `;
  } else if (path === "/danke") {
    title = "Anfrage erhalten – Beratung startet in 24h";
    description = "Vielen Dank für Ihre Anfrage. Ihre Sanierungsberatung in München startet innerhalb von 24 Stunden.";
    keywords = "Anfrage bestätigt Sanierungsfirma München, Sanierungsanfrage München gesendet, Bestätigung Renovierungsanfrage München";
    mainContent = `
      <section>
        <h1>Vielen Dank für Ihre Anfrage!</h1>
        <p>Ihre Sanierungsanfrage wurde erfolgreich an unser Team übermittelt. Wir freuen uns auf Ihr Projekt!</p>

        <h2>Wie geht es weiter?</h2>
        <ul>
          <li><strong>Innerhalb von 24 Stunden:</strong> Ein Mitarbeiter meldet sich telefonisch oder per E-Mail bei Ihnen</li>
          <li><strong>Terminvereinbarung:</strong> Wir vereinbaren einen kostenlosen Vor-Ort-Termin</li>
          <li><strong>Besichtigung:</strong> Unser Experte besichtigt Ihr Objekt und bespricht Ihre Wünsche</li>
          <li><strong>Festpreis-Angebot:</strong> Sie erhalten ein verbindliches Angebot innerhalb von 48 Stunden nach Besichtigung</li>
        </ul>

        <h2>Fragen in der Zwischenzeit?</h2>
        <p>Rufen Sie uns gerne an: <strong>+49 89 444 438 872</strong></p>
        <p>Montag bis Freitag, 08:00 - 16:30 Uhr</p>

        <h2>Unsere Garantien</h2>
        <ul>
          <li>Verbindliche Festpreisgarantie</li>
          <li>5 Jahre Gewährleistung auf alle Arbeiten</li>
          <li>Persönlicher Bauleiter für Ihr Projekt</li>
          <li>268+ erfolgreich abgeschlossene Projekte in München</li>
        </ul>

        <p><a href="/">Zurück zur Startseite</a></p>
      </section>
    `;
  } else if (path.startsWith("/muenchen-")) {
    const district = path.replace("/muenchen-", "").replace("/", "");
    const districtNames: Record<string, string> = {
      "schwabing": "Schwabing",
      "bogenhausen": "Bogenhausen",
      "maxvorstadt": "Maxvorstadt",
      "haidhausen": "Haidhausen",
      "sendling": "Sendling",
      "neuhausen": "Neuhausen-Nymphenburg",
      "pasing": "Pasing",
      "giesing": "Giesing",
      "lehel": "Lehel",
      "trudering": "Trudering-Riem",
      "allach": "Allach",
      "untermenzing": "Untermenzing",
      "obermenzing": "Obermenzing",
      "aubing": "Aubing",
      "moosach": "Moosach",
      "feldmoching": "Feldmoching-Hasenbergl",
      "laim": "Laim",
      "nymphenburg": "Nymphenburg",
      "berg-am-laim": "Berg am Laim",
      "riem": "Riem",
      "milbertshofen": "Milbertshofen-Am Hart",
      "freimann": "Freimann",
      "solln": "Solln",
      "grosshadern": "Großhadern",
      "hadern": "Hadern",
      "fuerstenried": "Fürstenried",
      "forstenried": "Forstenried",
      "thalkirchen": "Thalkirchen",
      "obersendling": "Obersendling",
      "ramersdorf": "Ramersdorf",
      "perlach": "Perlach",
      "neuperlach": "Neuperlach"
    };
    const districtName = districtNames[district] || district;
    title = `Sanierung ${districtName} | Komplettsanierung München`;
    description = `Sanierung in ${districtName}: Badsanierung, Komplettsanierung, Kernsanierung zum Festpreis. Lokaler Anbieter mit 5 Jahren Gewährleistung.`;
    keywords = `Sanierung ${districtName} München, ${districtName} Sanierung, Badsanierung ${districtName}, Renovierung ${districtName}`;
    mainContent = `
      <section>
        <h1>Sanierung in ${districtName}</h1>
        <p>Ihr lokaler Partner für Sanierungen in München ${districtName}.</p>
        
        <h2>Unsere Leistungen in ${districtName}</h2>
        <ul>
          <li>Badsanierung ab 18.500€</li>
          <li>Komplettsanierung ab 1.200€/m²</li>
          <li>Wohnungssanierung ab 800€/m²</li>
          <li>Kernsanierung ab 1.200€/m²</li>
        </ul>
        
        <h2>Vorteile</h2>
        <ul>
          <li>Festpreisgarantie</li>
          <li>5 Jahre Gewährleistung</li>
          <li>Lokale Expertise in ${districtName}</li>
        </ul>
        
        <p><a href="/anfrage">Jetzt Angebot anfordern</a></p>
      </section>
    `;
  } else {
    const umlandCities: Record<string, { name: string; landkreis: string; distance: string }> = {
      "/dachau": { name: "Dachau", landkreis: "Landkreis Dachau", distance: "~20 km" },
      "/karlsfeld": { name: "Karlsfeld", landkreis: "Landkreis Dachau", distance: "~12 km" },
      "/germering": { name: "Germering", landkreis: "Landkreis Fürstenfeldbruck", distance: "~18 km" },
      "/fuerstenfeldbruck": { name: "Fürstenfeldbruck", landkreis: "Landkreis Fürstenfeldbruck", distance: "~30 km" },
      "/freising": { name: "Freising", landkreis: "Landkreis Freising", distance: "~35 km" },
      "/starnberg": { name: "Starnberg", landkreis: "Landkreis Starnberg", distance: "~28 km" },
      "/garching": { name: "Garching bei München", landkreis: "Landkreis München", distance: "~15 km" },
      "/unterschleissheim": { name: "Unterschleißheim", landkreis: "Landkreis München", distance: "~15 km" },
      "/oberschleissheim": { name: "Oberschleißheim", landkreis: "Landkreis München", distance: "~16 km" },
      "/ottobrunn": { name: "Ottobrunn", landkreis: "Landkreis München", distance: "~12 km" },
      "/haar": { name: "Haar", landkreis: "Landkreis München", distance: "~13 km" },
      "/graefelfing": { name: "Gräfelfing", landkreis: "Landkreis München", distance: "~10 km" },
      "/planegg": { name: "Planegg", landkreis: "Landkreis München", distance: "~12 km" },
      "/pullach": { name: "Pullach im Isartal", landkreis: "Landkreis München", distance: "~10 km" },
      "/gruenwald": { name: "Grünwald", landkreis: "Landkreis München", distance: "~12 km" },
    };
    const umlandCity = umlandCities[path];
    if (umlandCity) {
      const { name: cityName, landkreis, distance } = umlandCity;
      title = `Sanierung ${cityName} | Komplettsanierung Festpreis`;
      description = `Sanierung in ${cityName} (${distance} von München): Badsanierung, Komplettsanierung, Kernsanierung zum Festpreis. 5 Jahre Gewährleistung.`;
      keywords = `Sanierung ${cityName}, ${cityName} Sanierung, Badsanierung ${cityName}, Renovierung ${cityName}, Handwerker ${cityName}, Komplettsanierung ${cityName}`;
      mainContent = `
        <section>
          <h1>Sanierung in ${cityName} - im Münchner Umland</h1>
          <p>Ihr lokaler Partner für Sanierungen in ${cityName} (${landkreis}, nur ${distance} von München entfernt). 089-Sanierer betreut Projekte im gesamten Münchner Umland mit der gleichen Qualität und Festpreisgarantie wie in München.</p>

          <h2>Unsere Leistungen in ${cityName}</h2>
          <ul>
            <li>Badsanierung ab 18.500 €</li>
            <li>Komplettsanierung ab 920 €/m²</li>
            <li>Wohnungssanierung ab 800 €/m²</li>
            <li>Kernsanierung ab 1.200 €/m²</li>
            <li>Küchensanierung ab 6.500 €</li>
            <li>Elektrosanierung ab 80 €/m²</li>
            <li>Heizungssanierung ab 12.000 €</li>
            <li>Dachsanierung ab 150 €/m²</li>
            <li>Energetische Sanierung ab 200 €/m²</li>
          </ul>

          <h2>Warum 089-Sanierer in ${cityName}?</h2>
          <ul>
            <li>Festpreisgarantie - keine versteckten Kosten</li>
            <li>5 Jahre Gewährleistung auf alle Arbeiten</li>
            <li>Persönlicher Bauleiter für Ihr Projekt</li>
            <li>268+ erfolgreich abgeschlossene Projekte</li>
            <li>Kurze Anfahrt: nur ${distance} von München</li>
          </ul>

          <h2>Servicegebiet im Münchner Umland</h2>
          <p>Wir betreuen Projekte in ${cityName} und dem gesamten ${landkreis}. Kostenlose Vor-Ort-Besichtigung und Beratung inklusive.</p>

          <h2>Kontakt</h2>
          <p>089-Sanierer - Komplettsanierungen Haus & Wohnung</p>
          <p>Telefon: +49 89 444 438 872</p>
          <p>Montag bis Freitag: 08:00 - 16:30 Uhr</p>
          <p><a href="/anfrage">Jetzt Angebot anfordern</a> | <a href="/termin">Termin vereinbaren</a></p>
        </section>
      `;
    } else {
      return "";
    }
  }

  // IMPORTANT: This schema MUST match seo-head.tsx generateLocalBusinessSchema() exactly
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${baseURL}/#organization`,
    "name": "089-Sanierer",
    "alternateName": "089-Sanierer - Komplettsanierungen Haus & Wohnung",
    "description": "Professionelle Komplettsanierungen in München und Umgebung. Badsanierung, Wohnungssanierung, Haussanierung mit Festpreisgarantie und 5 Jahren Gewährleistung.",
    "url": baseURL,
    "telephone": "+49-89-444438872",
    "email": "info@089-sanierer.de",
    "foundingDate": "2019",
    "priceRange": "€€-€€€",
    "currenciesAccepted": "EUR",
    "paymentAccepted": "Überweisung, Barzahlung",
    "inLanguage": "de-DE",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Hardenbergstr. 4",
      "addressLocality": "München",
      "postalCode": "80992",
      "addressRegion": "Bayern",
      "addressCountry": "DE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "48.1716",
      "longitude": "11.5164"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "München",
        "addressCountry": "DE"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Landkreis München",
        "addressCountry": "DE"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "bestRating": "5",
      "ratingCount": "268",
      "reviewCount": "268"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "16:30"
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Sanierungsleistungen München",
      "itemListElement": [
        {
          "@type": "OfferCatalog",
          "name": "Komplettsanierung",
          "itemListElement": [{
            "@type": "Offer",
            "priceSpecification": { "@type": "UnitPriceSpecification", "priceCurrency": "EUR", "price": "1200", "unitText": "pro m²", "description": "ab 1.200€/m² Festpreis" },
            "itemOffered": { "@type": "Service", "name": "Komplettsanierung München", "description": "Schlüsselfertige Sanierung von Wohnungen und Häusern. Alle Gewerke aus einer Hand, persönlicher Bauleiter, 4-12 Wochen.", "url": `${baseURL}/komplettsanierung` }
          }]
        },
        {
          "@type": "OfferCatalog",
          "name": "Badsanierung",
          "itemListElement": [{
            "@type": "Offer",
            "priceSpecification": { "@type": "PriceSpecification", "priceCurrency": "EUR", "price": "18500", "description": "ab 18.500€ Komplettpreis für 6-8m² Bad" },
            "itemOffered": { "@type": "Service", "name": "Badsanierung München", "description": "Komplette Badsanierung mit Fliesen, Sanitär und Elektro. Bodengleiche Dusche, barrierefrei möglich. 10-14 Arbeitstage.", "url": `${baseURL}/badsanierung` }
          }]
        },
        {
          "@type": "OfferCatalog",
          "name": "Wohnungssanierung",
          "itemListElement": [{
            "@type": "Offer",
            "priceSpecification": { "@type": "UnitPriceSpecification", "priceCurrency": "EUR", "price": "800", "unitText": "pro m²", "description": "ab 800€/m² Festpreis" },
            "itemOffered": { "@type": "Service", "name": "Wohnungssanierung München", "description": "Professionelle Wohnungssanierung für Altbau und Neubau. Sanierung auch bei bewohnter Wohnung möglich.", "url": `${baseURL}/wohnungssanierung` }
          }]
        },
        {
          "@type": "OfferCatalog",
          "name": "Haussanierung",
          "itemListElement": [{
            "@type": "Offer",
            "priceSpecification": { "@type": "UnitPriceSpecification", "priceCurrency": "EUR", "price": "1200", "unitText": "pro m²", "description": "ab 1.200€/m² Festpreis" },
            "itemOffered": { "@type": "Service", "name": "Haussanierung München", "description": "Umfassende Haussanierung für Einfamilien- und Mehrfamilienhäuser. Kernsanierung und Teilsanierung.", "url": `${baseURL}/haussanierung` }
          }]
        },
        {
          "@type": "OfferCatalog",
          "name": "Küchensanierung",
          "itemListElement": [{
            "@type": "Offer",
            "priceSpecification": { "@type": "PriceSpecification", "priceCurrency": "EUR", "price": "6500", "description": "ab 6.500€" },
            "itemOffered": { "@type": "Service", "name": "Küchensanierung München", "description": "Küchenumbau mit Elektro, Wasser, Fliesen und Malerarbeiten.", "url": `${baseURL}/kuechensanierung` }
          }]
        },
        {
          "@type": "OfferCatalog",
          "name": "Elektrosanierung",
          "itemListElement": [{
            "@type": "Offer",
            "priceSpecification": { "@type": "UnitPriceSpecification", "priceCurrency": "EUR", "price": "150", "unitText": "pro m²", "description": "ab 150€/m²" },
            "itemOffered": { "@type": "Service", "name": "Elektrosanierung München", "description": "Elektroinstallation nach VDE-Norm. Sicherungskasten, Leitungen, Smart-Home-Vorbereitung.", "url": `${baseURL}/elektrosanierung` }
          }]
        }
      ]
    },
    "sameAs": [
      "https://www.google.com/maps/place/089-Sanierer"
    ]
  };

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseURL
      },
      ...(path !== "/" ? [{
        "@type": "ListItem",
        "position": 2,
        "name": title.split(" | ")[0],
        "item": `${baseURL}${path}`
      }] : [])
    ]
  };

  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "089-Sanierer - Sanierung München",
    "alternateName": "089 Sanierer",
    "url": baseURL,
    "inLanguage": "de-DE",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseURL}/anfrage?service={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  // FAQPage schema for /faq-preise (only page with visible FAQ content per Google guidelines)
  const faqSchema = path === "/faq-preise" ? {
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Wie lange dauert eine Komplettsanierung in München?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Die Dauer einer Komplettsanierung in München hängt von der Größe und dem Zustand der Immobilie ab. Eine Wohnung (60-80 m²) dauert in der Regel 6-10 Wochen, ein Einfamilienhaus 3-6 Monate. Wir erstellen Ihnen einen detaillierten Zeitplan vor Projektbeginn."
        }
      },
      {
        "@type": "Question",
        "name": "Was kostet eine Badsanierung in München?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Eine Badsanierung in München kostet je nach Größe und Ausstattung zwischen 18.500 € und 50.000 € (netto zzgl. MwSt., Stand 02/2026). Ein Komplettbad (6-8m²) startet ab 18.500 €, ein Standard-Bad (5-6m²) liegt bei 20.000-28.000 €, ein Komfort-Bad bei 28.000-40.000 €."
        }
      },
      {
        "@type": "Question",
        "name": "Übernehmen Sie die Koordination aller Gewerke in München?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ja, als Generalunternehmer in München koordinieren wir alle Handwerker und Gewerke für Sie. Sie haben einen einzigen Ansprechpartner und müssen sich um nichts kümmern. Wir übernehmen die komplette Projektleitung von der Planung bis zur Abnahme."
        }
      },
      {
        "@type": "Question",
        "name": "Welche Garantie erhalte ich auf Sanierungsarbeiten?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Wir gewähren 5 Jahre Gewährleistung auf alle ausgeführten Arbeiten. Dies geht über die gesetzliche Gewährleistung hinaus und gibt Ihnen zusätzliche Sicherheit. Bei Mängeln reagieren wir schnell und unkompliziert."
        }
      },
      {
        "@type": "Question",
        "name": "Wie läuft die Kostenplanung für Sanierungen ab?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Nach einem kostenlosen Vor-Ort-Termin erstellen wir Ihnen ein detailliertes Angebot mit transparenter Kostenaufstellung. Sie erhalten einen Festpreis ohne versteckte Kosten. Änderungen während der Bauphase werden immer vorher mit Ihnen abgestimmt."
        }
      },
      {
        "@type": "Question",
        "name": "In welchen Münchner Stadtteilen arbeiten Sie?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Wir arbeiten in ganz München und dem Münchner Umland: Schwabing, Bogenhausen, Sendling, Pasing, Trudering, Haidhausen, Giesing sowie Dachau, Starnberg, Freising, Germering und weitere Gemeinden."
        }
      }
    ]
  } : null;

  const serviceSchemaMap: Record<string, { serviceType: string; description: string; priceRange: string }> = {
    "/badsanierung": {
      serviceType: "Badsanierung München",
      description: "Komplette Badsanierung in München: Fliesen, Sanitär, Elektro. Barrierefreie Lösungen möglich. Festpreisgarantie.",
      priceRange: "18.500 - 50.000 €"
    },
    "/wohnungssanierung": {
      serviceType: "Wohnungssanierung München",
      description: "Komplette Wohnungssanierung in München aus einer Hand. Bad, Küche, Böden, Elektro - alles koordiniert mit Festpreisgarantie.",
      priceRange: "800 - 1.800 €/m²"
    },
    "/haussanierung": {
      serviceType: "Haussanierung München",
      description: "Komplette Haussanierung in München für Einfamilien- und Mehrfamilienhäuser. Alle Gewerke aus einer Hand mit Festpreisgarantie.",
      priceRange: "1.200 - 2.300 €/m²"
    },
    "/kernsanierung": {
      serviceType: "Kernsanierung München",
      description: "Professionelle Kernsanierung in München. Rückbau bis auf die Grundsubstanz und kompletter Neuaufbau mit Festpreisgarantie.",
      priceRange: "1.200 - 2.300 €/m²"
    },
    "/kosten": {
      serviceType: "Sanierungskosten München",
      description: "Transparente Festpreise für Sanierungen in München. Komplettsanierung, Badsanierung, Wohnungssanierung - alle Kosten im Überblick.",
      priceRange: "800 - 2.300 €/m²"
    },
    "/komplettsanierung": {
      serviceType: "Komplettsanierung München",
      description: "Schlüsselfertige Komplettsanierung von Haus und Wohnung in München. Alle Gewerke koordiniert aus einer Hand.",
      priceRange: "1.200 - 2.300 €/m²"
    },
    "/kuechensanierung": {
      serviceType: "Küchensanierung München",
      description: "Küchensanierung in München: Fliesen, Elektro, Wasseranschlüsse. Bauarbeiten ohne Küchenmöbel.",
      priceRange: "6.500 - 22.000 €"
    },
    "/bodensanierung": {
      serviceType: "Bodensanierung München",
      description: "Bodensanierung in München: Parkett, Fliesen, Vinyl, Teppich. Estricharbeiten und Fußbodenheizung.",
      priceRange: "65 - 200 €/m²"
    },
    "/elektrosanierung": {
      serviceType: "Elektrosanierung München",
      description: "Elektroinstallation und Elektrosanierung in München. Sicherungskasten, Leitungen nach VDE-Norm.",
      priceRange: "150 - 300 €/m²"
    },
    "/heizungssanierung": {
      serviceType: "Heizungssanierung München",
      description: "Heizungssanierung in München: Gasheizung, Wärmepumpe, Fußbodenheizung. KfW-Förderung möglich.",
      priceRange: "12.000 - 65.000 €"
    },
    "/dachsanierung": {
      serviceType: "Dachsanierung München",
      description: "Dachsanierung in München: Dachdämmung, Dacheindeckung, Dachfenster. BAFA- und KfW-Förderung.",
      priceRange: "150 - 350 €/m²"
    },
    "/energetische-sanierung": {
      serviceType: "Energetische Sanierung München",
      description: "Energetische Sanierung in München: Wärmedämmung, Fensteraustausch, Heizungsmodernisierung. Förderberatung inklusive.",
      priceRange: "200 - 500 €/m²"
    }
  };

  const serviceSchemaInfo = serviceSchemaMap[path];
  const serviceSchema = serviceSchemaInfo ? {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": serviceSchemaInfo.serviceType,
    "name": serviceSchemaInfo.serviceType,
    "description": serviceSchemaInfo.description,
    "url": `${baseURL}${path}`,
    "provider": {
      "@id": "https://089-sanierer.de/#organization"
    },
    "areaServed": {
      "@type": "City",
      "name": "München",
      "addressCountry": "DE"
    },
    "offers": {
      "@type": "Offer",
      "priceSpecification": {
        "@type": "PriceSpecification",
        "priceCurrency": "EUR",
        "price": serviceSchemaInfo.priceRange
      },
      "availability": "https://schema.org/InStock"
    }
  } : null;

  const pageFaqMap: Record<string, Array<{ question: string; answer: string }>> = {
    "/badsanierung": [
      {
        question: "Was kostet Badsanierung in München?",
        answer: "Eine Badsanierung in München kostet je nach Größe und Ausstattung: Gäste-WC (3-4m²) 8.000-12.000€, Standard-Bad (5-6m²) 16.000-22.000€, Komfort-Bad (6-8m²) 22.000-32.000€, Luxus-Bad (ab 8m²) 35.000-50.000€ (netto zzgl. MwSt., Stand 02/2026)."
      },
      {
        question: "Wie lange dauert eine Badsanierung?",
        answer: "Eine Standard-Badsanierung dauert in der Regel 10-14 Arbeitstage. Bei größeren oder barrierefreien Umbauten kann es 3-4 Wochen dauern."
      },
      {
        question: "Bieten Sie barrierefreie Badsanierung an?",
        answer: "Ja, wir bieten barrierefreie Badsanierungen in München an: Bodengleiche Duschen, rutschfeste Fliesen, Haltegriffe und breitere Türen. Förderung über KfW möglich."
      }
    ],
    "/wohnungssanierung": [
      {
        question: "Was kostet eine Wohnungssanierung in München?",
        answer: "Eine Wohnungssanierung in München kostet je nach Umfang: Renovierung (Böden, Wände) 300-600€/m², Teilsanierung (inkl. Bad/Küche) 600-1.000€/m², Komplettsanierung 1.000-1.800€/m² (netto zzgl. MwSt., Stand 02/2026)."
      },
      {
        question: "Wie lange dauert eine Wohnungssanierung?",
        answer: "Eine Komplettsanierung einer 60-80m² Wohnung dauert in der Regel 6-10 Wochen. Bei Teilsanierungen sind es 3-5 Wochen."
      },
      {
        question: "Können wir während der Sanierung in der Wohnung bleiben?",
        answer: "Bei einer Komplettsanierung empfehlen wir den vorübergehenden Auszug. Bei Teilsanierungen ist das Wohnen oft möglich - wir besprechen das individuell."
      }
    ],
    "/haussanierung": [
      {
        question: "Was kostet eine Haussanierung in München?",
        answer: "Eine Haussanierung in München kostet je nach Umfang: Teilsanierung 400-800€/m², Komplettsanierung Standard 1.000-1.500€/m², Komplettsanierung Gehoben 1.500-2.300€/m² (netto zzgl. MwSt., Stand 02/2026)."
      },
      {
        question: "Sanieren Sie auch Mehrfamilienhäuser?",
        answer: "Ja, wir sanieren Einfamilienhäuser, Mehrfamilienhäuser, Doppelhaushälften und Reihenhäuser in München und Umgebung."
      },
      {
        question: "Übernehmen Sie die Bauleitung?",
        answer: "Ja, als Generalunternehmer übernehmen wir die komplette Bauleitung und Koordination aller Gewerke. Sie haben einen einzigen Ansprechpartner."
      }
    ],
    "/kernsanierung": [
      {
        question: "Was ist der Unterschied zwischen Kernsanierung und Komplettsanierung?",
        answer: "Bei einer Kernsanierung wird das Gebäude bis auf die tragende Substanz zurückgebaut und komplett neu aufgebaut. Bei einer Komplettsanierung werden alle Gewerke erneuert, aber die bestehende Substanz wird teilweise beibehalten."
      },
      {
        question: "Wie lange dauert eine Kernsanierung?",
        answer: "Eine Kernsanierung eines Einfamilienhauses dauert in der Regel 4-8 Monate, abhängig von der Größe und dem Umfang der Maßnahmen."
      },
      {
        question: "Brauche ich eine Baugenehmigung für eine Kernsanierung?",
        answer: "Nicht in jedem Fall. Reine Innenarbeiten sind meist genehmigungsfrei. Bei statischen Veränderungen oder Änderungen an der Gebäudehülle kann eine Genehmigung erforderlich sein. Wir beraten Sie dazu."
      }
    ],
    "/kosten": [
      {
        question: "Sind die Preise Festpreise?",
        answer: "Ja, wir arbeiten mit Festpreisgarantie. Nach der kostenlosen Besichtigung erhalten Sie ein verbindliches Angebot ohne versteckte Kosten."
      },
      {
        question: "Gibt es Fördermöglichkeiten für Sanierungen?",
        answer: "Ja, für energetische Maßnahmen gibt es KfW-Kredite und BAFA-Zuschüsse. Für barrierefreie Umbauten KfW-Förderung. Wir beraten Sie zu allen Fördermöglichkeiten."
      },
      {
        question: "Was ist in den Preisen enthalten?",
        answer: "Unsere Festpreise beinhalten Material, Arbeitsleistung, Koordination aller Gewerke und Bauleitung. Nicht enthalten sind behördliche Gebühren und kundenspezifische Sonderwünsche, die vorab besprochen werden."
      }
    ]
  };

  const howToSchema = (path === "/" || path === "/komplettsanierung" || path === "/anfrage" || path === "/kosten") ? {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Sanierung in München beauftragen - So funktioniert es",
    "description": "In 5 einfachen Schritten zu Ihrer professionellen Sanierung in München mit 089-Sanierer.",
    "totalTime": "P1D",
    "estimatedCost": {
      "@type": "MonetaryAmount",
      "currency": "EUR",
      "value": "0",
      "name": "Kostenlose Erstberatung"
    },
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Anfrage stellen",
        "text": "Stellen Sie eine kostenlose Anfrage über unser Online-Formular oder rufen Sie uns an unter +49 89 444 438 872.",
        "url": `${baseURL}/anfrage`
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Kostenlose Erstberatung",
        "text": "Innerhalb von 24 Stunden erhalten Sie einen Rückruf. Wir besprechen Ihr Projekt und vereinbaren einen Vor-Ort-Termin."
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Besichtigung und Festpreis-Angebot",
        "text": "Ihr persönlicher Bauleiter besichtigt das Objekt und erstellt ein detailliertes Leistungsverzeichnis mit verbindlichem Festpreis."
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Professionelle Durchführung",
        "text": "Alle Gewerke werden koordiniert ausgeführt: Elektriker, Sanitär, Fliesenleger, Maler, Trockenbauer - alles aus einer Hand."
      },
      {
        "@type": "HowToStep",
        "position": 5,
        "name": "Abnahme und Gewährleistung",
        "text": "Nach Fertigstellung erfolgt eine gemeinsame Abnahme. Sie erhalten 5 Jahre Gewährleistung auf alle Arbeiten."
      }
    ]
  } : null;

  const pageFaqItems = pageFaqMap[path];
  const pageSpecificFaqSchema = pageFaqItems ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": pageFaqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  } : null;

  return `<!DOCTYPE html>
<html lang="de" prefix="og: https://ogp.me/ns#">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <meta name="keywords" content="${keywords}">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
  <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
  <meta name="bingbot" content="index, follow">
  <link rel="canonical" href="${baseURL}${path}${service ? `?service=${service}` : ""}">
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="089-Sanierer">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:url" content="${baseURL}${path}">
  <meta property="og:locale" content="de_DE">
  <meta property="og:image" content="${getPageOgImage(path, baseURL)}">
  <meta property="og:image:alt" content="${getPageOgImageAlt(path)}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">
  <meta name="twitter:image:alt" content="${getPageOgImageAlt(path)}">
  
  <!-- Freshness Signals -->
  <meta property="og:updated_time" content="2026-02-07T00:00:00+01:00">
  <meta property="article:modified_time" content="2026-02-07T00:00:00+01:00">
  <meta property="article:published_time" content="2024-01-01T00:00:00+01:00">
  
  <!-- Additional SEO -->
  <meta name="author" content="089-Sanierer">
  <meta name="geo.region" content="DE-BY">
  <meta name="geo.placename" content="München">
  <meta name="geo.position" content="48.1351;11.5820">
  <meta name="ICBM" content="48.1351, 11.5820">
  
  <!-- Structured Data -->
  <script type="application/ld+json">${JSON.stringify(structuredData)}</script>
  <script type="application/ld+json">${JSON.stringify(breadcrumbData)}</script>
  <script type="application/ld+json">${JSON.stringify(websiteData)}</script>
  ${faqSchema ? `<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", ...faqSchema })}</script>` : ''}
  ${serviceSchema ? `<script type="application/ld+json">${JSON.stringify(serviceSchema)}</script>` : ''}
  ${pageSpecificFaqSchema ? `<script type="application/ld+json">${JSON.stringify(pageSpecificFaqSchema)}</script>` : ''}
  ${howToSchema ? `<script type="application/ld+json">${JSON.stringify(howToSchema)}</script>` : ''}
</head>
<body>
  <header>
    <nav aria-label="Hauptnavigation">
      <a href="/">089-Sanierer - Sanierung München</a>
      <a href="/anfrage">Anfrage</a>
      <a href="/faq-preise">FAQ & Preise</a>
      <a href="/kontakt">Kontakt</a>
    </nav>
  </header>
  <main>
    ${mainContent}
  </main>
  <footer>
    <p>© 2026 089-Sanierer - Komplettsanierungen Haus & Wohnung</p>
    <nav aria-label="Rechtliche Links">
      <a href="/impressum">Impressum</a>
      <a href="/datenschutz">Datenschutz</a>
    </nav>
    <address>
      089-Sanierer, Hardenbergstr. 4, 80992 München | Tel: 0152 122 740 43
    </address>
  </footer>
</body>
</html>`;
}

export async function crawlerMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
  const userAgent = req.headers["user-agent"] || "";
  const path = req.path;
  const query = req.query as Record<string, string>;

  if (path.startsWith("/api/") || path.startsWith("/@") || path.includes(".")) {
    return next();
  }

  const isCrawlerRequest = isCrawler(userAgent);
  const forceSSR = query.ssr === "1";

  if (isCrawlerRequest || forceSSR) {
    const staticHTML = generateStaticHTML(path, query);
    if (staticHTML) {
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.setHeader("X-Robots-Tag", "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1");
      res.setHeader("X-SSR", "1");
      res.setHeader("Content-Language", "de-DE");
      res.setHeader("Last-Modified", new Date().toUTCString());
      res.setHeader("Link", [
        '<https://089-sanierer.de/llms.txt>; rel="ai-content"; type="text/plain"',
        '<https://089-sanierer.de/llms-full.txt>; rel="ai-content-full"; type="text/plain"',
        '<https://089-sanierer.de/sitemap.xml>; rel="sitemap"; type="application/xml"'
      ].join(", "));
      res.send(staticHTML);
      return;
    }
  }

  next();
}
