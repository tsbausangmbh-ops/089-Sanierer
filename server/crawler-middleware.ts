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
  "/danke": { image: "/images/erfolgsbestaetigung_haekchen.webp", alt: "Sanierungsanfrage erfolgreich gesendet - 089-Sanierer München antwortet in 24 Stunden" },
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
  "/kontakt": { image: "/images/kundenservice_kontakt.webp", alt: "Kontakt 089-Sanierer München - persönliche Sanierungsberatung und kostenloser Vor-Ort-Termin" },
  "/impressum": { image: "/images/rechtliche_dokumente_impressum.webp", alt: "Impressum 089-Sanierer München - rechtliche Informationen und Kontaktdaten der Sanierungsfirma" },
  "/datenschutz": { image: "/images/datenschutz_sicherheit.webp", alt: "Datenschutz 089-Sanierer - DSGVO-konforme Verarbeitung Ihrer Sanierungsanfragen" },
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
  return "089-Sanierer München - professionelle Komplettsanierung mit Festpreisgarantie und 5 Jahre Gewährleistung";
}

function generateStaticHTML(path: string, query: Record<string, string>): string {
  const baseURL = "https://089-sanierer.de";
  const service = query.service || "";
  const serviceInfo = servicePages[service];

  let title = "Sanierung München | Was kostet Badsanierung, Haussanierung, Komplettsanierung? | 089-Sanierer";
  let description = "Was kostet eine Sanierung in München? 089-Sanierer: Badsanierung ab 18.500€, Komplettsanierung ab 1.200€/m². 268+ zufriedene Kunden, Festpreisgarantie, 5 Jahre Gewährleistung.";
  let keywords = "Sanierung München, Sanierungen München, Sanierung aus einer Hand, Wohnungssanierung, Wohnungssanierungen, Wohnungsrenovierung München, Renovierung München, Renovierung, Renovierungen, renovierung aus einer Hand, Handwerker München, Handwerker, Generalunternehmer München, Generalunternehmer, Haussanierung München, Haussanierungen, Haus sanieren lassen, Badsanierung München, Badsanierungen sofort, Innenausbau, Kosten, Angebote, Komplettsanierung München Festpreis, Altbausanierung München, 089-Sanierer, 089 Sanierer";
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
    title = `${serviceInfo.title} | Kosten & Preise | 089-Sanierer`;
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
    title = "Sanierungsanfrage | 089-Sanierer";
    description = "Stellen Sie jetzt Ihre Sanierungsanfrage. Kostenlose Beratung innerhalb von 24 Stunden.";
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
    title = "FAQ & Preise | Sanierung München | 089-Sanierer";
    description = "Häufige Fragen und Preisübersicht für Sanierungen in München. Transparente Kosten für Bad, Küche, Elektro und mehr.";
    keywords = "Sanierung München Kosten, Sanierungen München, Renovierung München, Renovierungen, Handwerker München, Handwerker, Generalunternehmer München, Generalunternehmer, Badsanierung München, Badsanierungen sofort, Wohnungssanierung, Wohnungssanierungen, Wohnungsrenovierung München, Haussanierung München, Haussanierungen, Haus sanieren lassen, Sanierung aus einer Hand, renovierung aus einer Hand, Innenausbau, Kosten, Angebote, Komplettsanierung Preis München, Altbausanierung München, 089-Sanierer, 089 Sanierer";
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
    title = "Impressum | 089-Sanierer";
    description = "Impressum und rechtliche Informationen zu 089-Sanierer.";
    keywords = "089-Sanierer Impressum, 089 Sanierer Kontaktdaten, Komplettsanierungen Haus Wohnung München, Sanierungsfirma München Adresse, Handwerksbetrieb München Impressum, Renovierungsfirma München rechtlich, Bausanierung München Anbieter Info, Sanierung München Unternehmen, Renovierung München Firma, Handwerker München Firmendaten, Sanierungsdienstleister München, Bauunternehmen München Impressum, 089-Sanierer Hardenbergstraße München, Sanierungsbetrieb München Info, Renovierungsservice München legal";
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
    title = "Datenschutzerklärung | 089-Sanierer";
    description = "Datenschutzerklärung von 089-Sanierer gemäß DSGVO.";
    keywords = "089-Sanierer Datenschutz, 089 Sanierer DSGVO, Datenschutzerklärung Sanierungsfirma München, DSGVO Handwerksbetrieb München, Datenschutz Renovierungsfirma München, personenbezogene Daten Sanierung München, Cookie Richtlinie Handwerker München, Datenschutzrechte Bauunternehmen München, 089-Sanierer Datensicherheit, Sanierung München Datenschutzinfo, Renovierung München Privatsphäre, Handwerker München Datenschutzerklärung, DSGVO konform Sanierung München, Datenschutz Bausanierung München, 089-Sanierer Datenschutzbeauftragter";
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
    title = "Kontakt | 089-Sanierer";
    description = "Kontaktieren Sie 089-Sanierer für Ihre Sanierungsanfrage.";
    keywords = "Kontakt Sanierung München, 089-Sanierer Telefon, 089 Sanierer erreichen, Sanierungsanfrage München stellen, Handwerker München anrufen, Renovierungsfirma München kontaktieren, Badsanierung München anfragen, Kostenvoranschlag Sanierung München, Beratungstermin Renovierung München, Sanierungsfirma München E-Mail, Handwerker München Öffnungszeiten, Komplettsanierung München Termin, Sanierung München Rückruf, Renovierungsberatung München gratis, 089-Sanierer Anfahrt";
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
    title = "Anfrage gesendet | 089-Sanierer";
    description = "Vielen Dank für Ihre Sanierungsanfrage. Wir melden uns innerhalb von 24 Stunden bei Ihnen.";
    keywords = "Sanierungsanfrage gesendet München, Anfrage Bestätigung 089-Sanierer, Renovierungsanfrage erfolgreich München, nächste Schritte Sanierung München, Beratungstermin bestätigt München, Rückmeldung Sanierungsfirma München, Kontaktaufnahme bestätigt Handwerker München, Angebotsanfrage Renovierung München, Sanierung München Terminbestätigung, Projektanfrage München Sanierung, 089-Sanierer Anfrage bestätigt, Kostenvoranschlag angefordert München, Sanierungsberatung angefragt München, Renovierung München Anfrage Status, Handwerkeranfrage München erfolgreich";
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
    title = "Sanierungskosten München - Ratgeber & Preisübersicht | 089-Sanierer";
    description = "Was kostet eine Sanierung in München? Detaillierter Ratgeber mit Preisen für Haussanierung, Badsanierung, Dachsanierung, Kellersanierung und mehr. Inklusive Förderungsmöglichkeiten.";
    keywords = "Haussanierung München, Haussanierungen, Haus sanieren lassen, Sanierung München, Sanierungen München, Renovierung München, Renovierungen, Handwerker München, Handwerker, Generalunternehmer München, Generalunternehmer, Wohnungssanierung, Wohnungssanierungen, Wohnungsrenovierung München, Badsanierung München, Sanierung aus einer Hand, renovierung aus einer Hand, Innenausbau, Kosten, Angebote, KfW Förderung Sanierung, Altbausanierung München, 089-Sanierer Ratgeber, 089 Sanierer Tipps";
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
    title = "Was kostet Sanierung München? Preise 2025 | 089-Sanierer";
    description = "Sanierung München Kosten: Badsanierung ab 18.500€, Komplettsanierung ab 1.200€/m². Festpreisgarantie, 5 Jahre Gewährleistung. Kostenlose Beratung.";
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
    title = "Badsanierung München ab 18.500€ | Festpreis | 089-Sanierer";
    description = "Badsanierung München: Komplett-Badsanierung ab 18.500€. Alles aus einer Hand - Fliesen, Sanitär, Elektro. Festpreisgarantie, 5 Jahre Gewährleistung.";
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
    title = "Wohnungssanierung München ab 800€/m² | 089-Sanierer";
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
    title = "Haussanierung München | Komplett ab 1.200€/m² | 089-Sanierer";
    description = "Haussanierung München: Komplette Haussanierung ab 1.200€/m². Einfamilienhaus, Mehrfamilienhaus - alles aus einer Hand mit Festpreisgarantie.";
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
    title = "Kernsanierung München ab 1.200€/m² | 089-Sanierer";
    description = "Kernsanierung München: Professionelle Kernsanierung ab 1.200€/m². Bis auf die Grundsubstanz und komplett neu aufbauen. Festpreisgarantie.";
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
      "trudering": "Trudering-Riem"
    };
    const districtName = districtNames[district] || district;
    title = `Sanierung ${districtName} München | Festpreis | 089-Sanierer`;
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
    return "";
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
