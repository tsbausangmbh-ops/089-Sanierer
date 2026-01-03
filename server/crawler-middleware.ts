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
  "gptbot",
  "chatgpt-user",
  "claude-web",
  "perplexitybot",
  "anthropic-ai",
  "cohere-ai",
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
    price: "1.000 - 2.300 €/m²",
    keywords: "Komplettsanierung München, Haus sanieren München, Wohnung renovieren München, Kernsanierung München Kosten, Altbausanierung München, Sanierung aus einer Hand München, was kostet Komplettsanierung pro qm München, Haussanierung München Festpreis, Wohnungssanierung München Erfahrungen, Altbau komplett sanieren München, Sanierung schlüsselfertig München, Kernsanierung Haus München Dauer, Komplettsanierung München günstig, Sanierung Einfamilienhaus München, Renovierung komplett München Anbieter",
  },
  badsanierung: {
    title: "Badsanierung München",
    description: "Professionelle Badsanierung in München. Komplettbad inkl. Fliesen, Sanitär, Elektro. Barrierefreie Lösungen möglich.",
    price: "8.000 - 50.000 €",
    keywords: "Badsanierung München, Bad renovieren München, Badezimmer sanieren München Kosten, Badsanierung München Festpreis, Badrenovierung München, Bad komplett sanieren München, was kostet Badsanierung München 2024, Bad neu machen München Preise, Badumbau München barrierefrei, kleine Badsanierung München, Gäste WC sanieren München Kosten, Bad fliesen München Preis, Dusche einbauen München, Badezimmer modernisieren München, Badsanierung München Dauer Wochen",
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
    price: "85 - 300 €/m²",
    keywords: "Elektrosanierung München, Elektrik erneuern München, Elektriker München Altbau, Elektroinstallation München Kosten, Steckdosen nachrüsten München, Sicherungskasten erneuern München, Elektrik komplett erneuern München Preis, Unterputz Kabel verlegen München, FI Schutzschalter nachrüsten München, Wallbox Installation München, E-Check München Kosten, Altbau Elektrik modernisieren München, Zählerkasten erneuern München, Smart Home Elektrik München, Elektriker Notdienst München schnell",
  },
  heizungssanierung: {
    title: "Heizungssanierung München",
    description: "Heizungssanierung in München: Gasheizung, Wärmepumpe, Fußbodenheizung. KfW-Förderung möglich.",
    price: "12.000 - 65.000 €",
    keywords: "Heizungssanierung München, Neue Heizung München, Wärmepumpe München Kosten, Heizung austauschen München, Heizungsförderung München, Gas Brennwert München, Heizung erneuern München Förderung 2024, Wärmepumpe nachrüsten München, Ölheizung tauschen München Kosten, Pelletheizung München Preise, Heizungstausch München Dauer, BEG Förderung Heizung München, hydraulischer Abgleich München, Heizungsinstallateur München, Gasheizung erneuern München Kosten",
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
    keywords: "Energetische Sanierung München, Dämmung München, Fenster tauschen München, Fassadendämmung München Kosten, Wärmedämmung München, iSFP München, Dachdämmung München Preise, Kellerdecke dämmen München, WDVS München Kosten, Fenster Förderung München 2024, Sanierungsfahrplan München erstellen, energetisch sanieren München Zuschuss, Hausdämmung München Preise, Außendämmung München Kosten pro qm, Wärmeschutz München Altbau",
  },
};

function generateStaticHTML(path: string, query: Record<string, string>): string {
  const baseURL = "https://089-sanierer.de";
  const service = query.service || "";
  const serviceInfo = servicePages[service];

  let title = "Sanierung München | Was kostet Badsanierung, Haussanierung, Komplettsanierung? | KSHW";
  let description = "Was kostet eine Sanierung in München? KSHW München: Badsanierung ab 9.200€, Komplettsanierung ab 920€/m². 268+ zufriedene Kunden, Festpreisgarantie, 5 Jahre Gewährleistung.";
  let keywords = "Sanierung München, Komplettsanierung München Festpreis, Badsanierung München Kosten, Küchensanierung München, Handwerker München geprüft, Renovierung München aus einer Hand, Altbausanierung München Erfahrungen, Haussanierung München Angebot, Wohnungssanierung München günstig, Elektrosanierung München Preise, Heizungssanierung München Förderung, Bodensanierung München Parkett, Sanierung München 5 Jahre Garantie, KSHW München Bewertungen, 089 Sanierer Komplettsanierung";
  let mainContent = "";

  if (path === "/" || path === "") {
    mainContent = `
      <section>
        <h1>Sanierung München - KSHW Komplettsanierungen</h1>
        <p>Ihr zuverlässiger Partner für professionelle Sanierungen in München und Umgebung.</p>
        
        <h2>Unsere Leistungen</h2>
        <ul>
          <li><strong>Komplettsanierung</strong> - Schlüsselfertige Sanierung ab 1.000 €/m²</li>
          <li><strong>Badsanierung</strong> - Komplettbad ab 8.000 €</li>
          <li><strong>Küchensanierung</strong> - Bauarbeiten ab 6.500 €</li>
          <li><strong>Bodensanierung</strong> - Alle Bodenbeläge ab 65 €/m²</li>
          <li><strong>Elektrosanierung</strong> - VDE-konforme Installation ab 85 €/m²</li>
          <li><strong>Heizungssanierung</strong> - Moderne Heizsysteme ab 12.000 €</li>
          <li><strong>Dachsanierung</strong> - Dämmung und Eindeckung ab 150 €/m²</li>
          <li><strong>Energetische Sanierung</strong> - KfW-förderfähig ab 200 €/m²</li>
        </ul>
        
        <h2>Warum KSHW München?</h2>
        <ul>
          <li>268+ erfolgreich abgeschlossene Projekte</li>
          <li>Über 20 Jahre Branchenerfahrung</li>
          <li>Festpreisgarantie - keine versteckten Kosten</li>
          <li>5 Jahre Gewährleistung</li>
          <li>Ein Ansprechpartner für alle Gewerke</li>
          <li>Kostenlose Beratung innerhalb von 24 Stunden</li>
        </ul>
        
        <h2>Servicegebiet</h2>
        <p>Wir sind in ganz München und dem Großraum für Sie da: Schwabing, Bogenhausen, Sendling, Pasing, Trudering, Haidhausen, Giesing, Neuhausen, Nymphenburg, sowie Dachau, Starnberg, Freising, Germering und weitere Gemeinden im Umkreis von 50 km.</p>
        
        <h2>Kontakt</h2>
        <p>KSHW München - Komplettsanierungen Haus & Wohnung</p>
        <p>Zielstattstr. 9, 81379 München</p>
        <p>Telefon: 0152 122 740 43</p>
        <p>E-Mail: info@komplettsanierungen-haus-wohnung.de</p>
        <p>Öffnungszeiten: Mo-Fr 08:00-16:30 Uhr</p>
      </section>
    `;
  } else if (path === "/anfrage" && serviceInfo) {
    title = `${serviceInfo.title} | Kosten & Preise | KSHW München`;
    description = serviceInfo.description;
    keywords = servicePages[service]?.keywords || keywords;
    mainContent = `
      <section>
        <h1>${serviceInfo.title}</h1>
        <p>${serviceInfo.description}</p>
        
        <h2>Preisübersicht</h2>
        <p><strong>Preisspanne:</strong> ${serviceInfo.price} (netto zzgl. MwSt., Stand 12/2025, ca.-Angaben ohne Gewähr)</p>
        
        <h2>Jetzt Anfrage stellen</h2>
        <p>Fordern Sie jetzt Ihr unverbindliches Angebot an. Wir melden uns innerhalb von 24 Stunden bei Ihnen.</p>
        
        <h2>Kontakt</h2>
        <p>Telefon: 0152 122 740 43</p>
        <p>E-Mail: info@komplettsanierungen-haus-wohnung.de</p>
      </section>
    `;
  } else if (path === "/anfrage") {
    title = "Sanierungsanfrage | KSHW München";
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
        <p>E-Mail: info@komplettsanierungen-haus-wohnung.de</p>
      </section>
    `;
  } else if (path === "/faq-preise") {
    title = "FAQ & Preise | Sanierung München | KSHW";
    description = "Häufige Fragen und Preisübersicht für Sanierungen in München. Transparente Kosten für Bad, Küche, Elektro und mehr.";
    keywords = "Sanierung München Kosten, Badsanierung München Preise, Küchensanierung München Kosten, Elektrosanierung München Preise, was kostet Komplettsanierung München, Haussanierung München Preisliste, Renovierung München Festpreis, Sanierung München FAQ, häufige Fragen Badsanierung München, Preise Bodensanierung München, Kosten Heizungssanierung München, Sanierungspreise München 2025, Handwerkerkosten München, Renovierungskosten pro qm München, Sanierung München Angebot einholen";
    mainContent = `
      <section>
        <h1>FAQ & Preise - Sanierung München</h1>
        
        <h2>Preisübersicht (München, Stand 12/2025, netto zzgl. MwSt.)</h2>
        
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
    title = "Impressum | KSHW München";
    description = "Impressum und rechtliche Informationen zu KSHW München.";
    keywords = "KSHW München Impressum, 089 Sanierer Kontaktdaten, Komplettsanierungen Haus Wohnung München, Sanierungsfirma München Adresse, Handwerksbetrieb München Impressum, Renovierungsfirma München rechtlich, Bausanierung München Anbieter Info, Sanierung München Unternehmen, Renovierung München Firma, Handwerker München Firmendaten, Sanierungsdienstleister München, Bauunternehmen München Impressum, KSHW Zielstattstraße München, Sanierungsbetrieb München Info, Renovierungsservice München legal";
    mainContent = `
      <section>
        <h1>Impressum</h1>
        <h2>Angaben gemäß § 5 TMG</h2>
        <p>KSHW München - Komplettsanierungen Haus & Wohnung</p>
        <p>Zielstattstr. 9</p>
        <p>81379 München</p>
        <p>Telefon: 0152 122 740 43</p>
        <p>E-Mail: info@komplettsanierungen-haus-wohnung.de</p>
        
        <h2>KI-Transparenzhinweis (EU AI Act)</h2>
        <p>KSHW München setzt zur Unterstützung der Geschäftsprozesse KI-basierte Systeme ein. Diese werden u.a. bei der Angebotserstellung, Kommunikation und Dokumentenverarbeitung genutzt. Alle endgültigen Entscheidungen werden von qualifizierten Mitarbeitern getroffen und verantwortet.</p>
        <p>Rechtsgrundlage: Verordnung (EU) 2024/1689 (EU AI Act), Art. 50 | DSGVO Art. 22</p>
      </section>
    `;
  } else if (path === "/datenschutz") {
    title = "Datenschutzerklärung | KSHW München";
    description = "Datenschutzerklärung von KSHW München gemäß DSGVO.";
    keywords = "KSHW München Datenschutz, 089 Sanierer DSGVO, Datenschutzerklärung Sanierungsfirma München, DSGVO Handwerksbetrieb München, Datenschutz Renovierungsfirma München, personenbezogene Daten Sanierung München, Cookie Richtlinie Handwerker München, Datenschutzrechte Bauunternehmen München, KSHW München Datensicherheit, Sanierung München Datenschutzinfo, Renovierung München Privatsphäre, Handwerker München Datenschutzerklärung, DSGVO konform Sanierung München, Datenschutz Bausanierung München, KSHW Datenschutzbeauftragter";
    mainContent = `
      <section>
        <h1>Datenschutzerklärung</h1>
        <h2>1. Verantwortlicher</h2>
        <p>KSHW München - Komplettsanierungen Haus & Wohnung, Zielstattstr. 9, 81379 München</p>
        
        <h2>2. Erhebung und Speicherung personenbezogener Daten</h2>
        <p>Wir erheben personenbezogene Daten nur, wenn Sie uns diese freiwillig mitteilen.</p>
        
        <h2>3. Ihre Rechte</h2>
        <p>Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung Ihrer Daten.</p>
        
        <h2>KI-Transparenzhinweis</h2>
        <p>KSHW München setzt KI-basierte Systeme ein. Rechtsgrundlage: EU AI Act (Verordnung 2024/1689), Art. 50.</p>
      </section>
    `;
  } else if (path === "/kontakt") {
    title = "Kontakt | KSHW München";
    description = "Kontaktieren Sie KSHW München für Ihre Sanierungsanfrage.";
    keywords = "Kontakt Sanierung München, KSHW München Telefon, 089 Sanierer erreichen, Sanierungsanfrage München stellen, Handwerker München anrufen, Renovierungsfirma München kontaktieren, Badsanierung München anfragen, Kostenvoranschlag Sanierung München, Beratungstermin Renovierung München, Sanierungsfirma München E-Mail, Handwerker München Öffnungszeiten, Komplettsanierung München Termin, Sanierung München Rückruf, Renovierungsberatung München gratis, KSHW München Anfahrt";
    mainContent = `
      <section>
        <h1>Kontakt</h1>
        <h2>KSHW München - Komplettsanierungen Haus & Wohnung</h2>
        <p>Zielstattstr. 9, 81379 München</p>
        <p>Telefon: 0152 122 740 43</p>
        <p>E-Mail: info@komplettsanierungen-haus-wohnung.de</p>
        <h3>Öffnungszeiten</h3>
        <p>Montag - Freitag: 08:00 - 16:30 Uhr</p>
      </section>
    `;
  } else if (path === "/bestaetigung") {
    title = "Anfrage gesendet | KSHW München";
    description = "Vielen Dank für Ihre Sanierungsanfrage. Wir melden uns innerhalb von 24 Stunden bei Ihnen.";
    keywords = "Sanierungsanfrage gesendet München, Anfrage Bestätigung KSHW München, Renovierungsanfrage erfolgreich München, nächste Schritte Sanierung München, Beratungstermin bestätigt München, Rückmeldung Sanierungsfirma München, Kontaktaufnahme bestätigt Handwerker München, Angebotsanfrage Renovierung München, Sanierung München Terminbestätigung, Projektanfrage München Sanierung, KSHW Anfrage bestätigt, Kostenvoranschlag angefordert München, Sanierungsberatung angefragt München, Renovierung München Anfrage Status, Handwerkeranfrage München erfolgreich";
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
        <p>KSHW München - Komplettsanierungen Haus & Wohnung</p>
        <p>Telefon: 0152 122 740 43</p>
        <p>E-Mail: info@komplettsanierungen-haus-wohnung.de</p>
      </section>
    `;
  } else if (path === "/ratgeber") {
    title = "Sanierungskosten München - Ratgeber & Preisübersicht | KSHW";
    description = "Was kostet eine Sanierung in München? Detaillierter Ratgeber mit Preisen für Haussanierung, Badsanierung, Dachsanierung, Kellersanierung und mehr. Inklusive Förderungsmöglichkeiten.";
    keywords = "Sanierungskosten München Ratgeber, was kostet Haussanierung pro qm München, Badsanierung Kosten München 2025, Dachsanierung Preise München, Kellersanierung München Kosten, Wärmedämmung München Förderung, energetische Sanierung Zuschuss München, Fassade streichen München Preise, Wohnungssanierung München Kosten Rechner, KfW Förderung Sanierung München, BAFA Zuschuss München, Sanierungsratgeber München, Renovierungskosten München aktuell, Altbausanierung München was beachten, Förderung energetische Sanierung Bayern";
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
        <p>KSHW München - Komplettsanierungen Haus & Wohnung</p>
        <p>Telefon: 0152 122 740 43</p>
        <p>Kostenlose Erstberatung - Wir melden uns innerhalb von 24 Stunden!</p>
      </section>
    `;
  } else {
    return "";
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${baseURL}/#organization`,
    "name": "KSHW München - Komplettsanierungen Haus & Wohnung",
    "alternateName": "089-Sanierer",
    "description": "Professionelle Sanierungen in München: Badsanierung, Küchensanierung, Komplettsanierung, Elektrosanierung und mehr. Festpreisgarantie, 5 Jahre Gewährleistung.",
    "url": baseURL,
    "telephone": "+4915212274043",
    "email": "info@089-sanierer.de",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Zielstattstr. 9",
      "addressLocality": "München",
      "postalCode": "81379",
      "addressCountry": "DE",
      "addressRegion": "Bayern"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 48.1042,
      "longitude": 11.5349
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "16:30"
    },
    "priceRange": "€€€",
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 48.1351,
        "longitude": 11.5820
      },
      "geoRadius": "50000"
    },
    "sameAs": [],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "268",
      "bestRating": "5",
      "worstRating": "1"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Sanierungsleistungen",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Badsanierung",
            "description": "Komplette Badsanierung in München inkl. Fliesen, Sanitär, Elektro"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Küchensanierung",
            "description": "Küchensanierung in München: Fliesen, Elektro, Wasseranschlüsse"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Komplettsanierung",
            "description": "Schlüsselfertige Komplettsanierung von Haus und Wohnung"
          }
        }
      ]
    }
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
    "name": "KSHW München - Sanierung",
    "alternateName": "089-Sanierer",
    "url": baseURL,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseURL}/anfrage?service={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Was kostet eine Badsanierung in München?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Eine Badsanierung in München kostet je nach Größe und Ausstattung: Gäste-WC 8.000-12.000€, Standard-Bad (5-6m²) 16.000-22.000€, Komfort-Bad 22.000-32.000€, Luxus-Bad ab 35.000€. Alle Preise netto zzgl. MwSt."
        }
      },
      {
        "@type": "Question",
        "name": "Wie lange dauert eine Badsanierung?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Eine Standard-Badsanierung dauert in der Regel 10-14 Arbeitstage. Bei komplexeren Projekten oder Luxus-Bädern kann es 3-4 Wochen dauern."
        }
      },
      {
        "@type": "Question",
        "name": "Was kostet eine Komplettsanierung pro m²?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Eine Komplettsanierung in München kostet 1.000-1.500€/m² für Standard-Ausstattung und 1.500-2.300€/m² für gehobene Ausstattung. Alle Preise netto zzgl. MwSt."
        }
      },
      {
        "@type": "Question",
        "name": "Bieten Sie Festpreise an?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ja, wir arbeiten mit Festpreisgarantie. Nach der kostenlosen Besichtigung erhalten Sie ein verbindliches Angebot ohne versteckte Kosten."
        }
      },
      {
        "@type": "Question",
        "name": "Welche Gewährleistung gibt es?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Wir bieten 5 Jahre Gewährleistung auf alle unsere Arbeiten. Das gibt Ihnen Sicherheit für Ihre Investition."
        }
      },
      {
        "@type": "Question",
        "name": "In welchem Gebiet sind Sie tätig?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Wir sind in ganz München und dem Großraum München tätig, einschließlich Dachau, Starnberg, Freising, Germering und weitere Gemeinden im Umkreis von 50 km."
        }
      },
      {
        "@type": "Question",
        "name": "Was kostet eine Küchensanierung?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Eine Küchensanierung (nur Bauarbeiten ohne Küchenmöbel) kostet: kleine Küche 6.500-10.000€, mittlere Küche 10.000-15.000€, große Küche 15.000-22.000€. Wir machen Fliesen, Elektro und Wasseranschlüsse."
        }
      },
      {
        "@type": "Question",
        "name": "Gibt es Fördermöglichkeiten für Sanierungen?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ja, für energetische Sanierungen gibt es KfW- und BAFA-Förderungen. Bei Heizungssanierung (z.B. Wärmepumpe) können Sie bis zu 70% Förderung erhalten. Wir beraten Sie gerne zu den Möglichkeiten."
        }
      }
    ]
  };

  const additionalSchemas = path === "/faq-preise" ? `\n  <script type="application/ld+json">${JSON.stringify(faqData)}</script>` : "";

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
  <meta property="og:site_name" content="KSHW München">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:url" content="${baseURL}${path}">
  <meta property="og:locale" content="de_DE">
  <meta property="og:image" content="${baseURL}/og-image.jpg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">
  
  <!-- Additional SEO -->
  <meta name="author" content="KSHW München">
  <meta name="geo.region" content="DE-BY">
  <meta name="geo.placename" content="München">
  <meta name="geo.position" content="48.1351;11.5820">
  <meta name="ICBM" content="48.1351, 11.5820">
  
  <!-- Structured Data -->
  <script type="application/ld+json">${JSON.stringify(structuredData)}</script>
  <script type="application/ld+json">${JSON.stringify(breadcrumbData)}</script>
  <script type="application/ld+json">${JSON.stringify(websiteData)}</script>${additionalSchemas}
</head>
<body>
  <header>
    <nav aria-label="Hauptnavigation">
      <a href="/">KSHW München - Sanierung</a>
      <a href="/anfrage">Anfrage</a>
      <a href="/faq-preise">FAQ & Preise</a>
      <a href="/kontakt">Kontakt</a>
    </nav>
  </header>
  <main>
    ${mainContent}
  </main>
  <footer>
    <p>© 2025 KSHW München - Komplettsanierungen Haus & Wohnung</p>
    <nav aria-label="Rechtliche Links">
      <a href="/impressum">Impressum</a>
      <a href="/datenschutz">Datenschutz</a>
    </nav>
    <address>
      KSHW München, Zielstattstr. 9, 81379 München | Tel: 0152 122 740 43
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
      res.setHeader("X-Robots-Tag", "index, follow");
      res.setHeader("X-SSR", "1");
      res.send(staticHTML);
      return;
    }
  }

  next();
}
