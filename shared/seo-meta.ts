export interface SeoMeta {
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  ogTitle: string;
  ogDescription: string;
  ogImage?: string;
  ogImageAlt?: string;
}

const BASE_URL = "https://089-sanierer.de";

const districtMeta: Record<string, { name: string; description: string }> = {
  schwabing: { name: "Schwabing", description: "Exklusive Altbausanierung im beliebten Schwabing" },
  bogenhausen: { name: "Bogenhausen", description: "Premium-Sanierung in Bogenhausen - Villen & Altbauten" },
  maxvorstadt: { name: "Maxvorstadt", description: "Stilvolle Sanierung nahe Universität und Kunstareal" },
  haidhausen: { name: "Haidhausen", description: "Charmante Altbausanierung im Franzosenviertel" },
  sendling: { name: "Sendling", description: "Moderne Sanierung in Sendling und Sendling-Westpark" },
  neuhausen: { name: "Neuhausen-Nymphenburg", description: "Elegante Sanierung nahe Schloss Nymphenburg" },
  pasing: { name: "Pasing", description: "Komplettsanierung in Pasing - vom Altbau bis Neubau" },
  giesing: { name: "Giesing", description: "Authentische Sanierung in Ober- und Untergiesing" },
  lehel: { name: "Lehel", description: "Exklusive Sanierung im ältesten Stadtteil Münchens" },
  trudering: { name: "Trudering-Riem", description: "Familienfreundliche Sanierung in Trudering-Riem" },
};

export function getSeoMeta(path: string): SeoMeta {
  const normalizedPath = path.split("?")[0].replace(/\/$/, "") || "/";

  if (normalizedPath === "/" || normalizedPath === "") {
    return {
      title: "Sanierung München | Was kostet Badsanierung, Haussanierung, Komplettsanierung? | 089-Sanierer",
      description: "Was kostet eine Sanierung in München? 089-Sanierer: Badsanierung ab 18.500€, Komplettsanierung ab 1.200€/m². 268+ zufriedene Kunden, Festpreisgarantie, 5 Jahre Gewährleistung. Kostenlose Beratung in 24h.",
      keywords: "Sanierung München, Komplettsanierung München Kosten 2026, Badsanierung München Festpreis, Haussanierung München Meisterbetrieb, Wohnung sanieren lassen München, Sanierungsfirma München Erfahrungen, Handwerker Komplettsanierung München günstig, 089-Sanierer Bewertungen",
      canonical: BASE_URL,
      ogTitle: "Was kostet Sanierung in München? Badsanierung ab 18.500€ | 089-Sanierer",
      ogDescription: "268+ zufriedene Münchner Kunden: Badsanierung ab 18.500€, Komplettsanierung ab 1.200€/m². Festpreisgarantie, 5 Jahre Gewährleistung.",
      ogImage: `${BASE_URL}/images/komplettsanierung_vorher_nachher.webp`,
      ogImageAlt: "Komplettsanierung München vorher nachher - professionelle Sanierung aus einer Hand mit Festpreisgarantie",
    };
  }

  if (normalizedPath === "/anfrage") {
    return {
      title: "Kostenlose Anfrage | Sanierung München | 089-Sanierer",
      description: "Jetzt kostenlose Sanierungsanfrage stellen. Wir melden uns innerhalb von 24 Stunden. Badsanierung, Komplettsanierung, Wohnungssanierung in München.",
      keywords: "Sanierung Anfrage München kostenlos, Sanierungsangebot München anfordern, Badsanierung Angebot einholen München, Komplettsanierung Kostenvoranschlag München, Festpreis Angebot Sanierung München",
      canonical: `${BASE_URL}/anfrage`,
      ogTitle: "Kostenlose Sanierungsanfrage - 089-Sanierer",
      ogDescription: "Stellen Sie jetzt Ihre kostenlose Anfrage für Badsanierung, Komplettsanierung oder Wohnungssanierung in München.",
      ogImage: `${BASE_URL}/images/sanierungsberatung_gespraech.webp`,
      ogImageAlt: "Kostenlose Sanierungsberatung München - persönliches Gespräch für Ihr Renovierungsprojekt",
    };
  }

  if (normalizedPath === "/danke") {
    return {
      title: "Vielen Dank für Ihre Anfrage | 089-Sanierer",
      description: "Ihre Sanierungsanfrage wurde erfolgreich übermittelt. Wir melden uns innerhalb von 24 Stunden bei Ihnen.",
      keywords: "Sanierung Anfrage bestätigt München, Sanierungsprojekt München gestartet",
      canonical: `${BASE_URL}/danke`,
      ogTitle: "Anfrage erhalten - 089-Sanierer",
      ogDescription: "Vielen Dank! Wir melden uns innerhalb von 24 Stunden bei Ihnen.",
      ogImage: `${BASE_URL}/images/erfolgsbestaetigung_haekchen.webp`,
      ogImageAlt: "Sanierungsanfrage erfolgreich gesendet - 089-Sanierer München antwortet in 24 Stunden",
    };
  }

  if (normalizedPath === "/kosten") {
    return {
      title: "Sanierung München Kosten 2026 | Festpreise | 089-Sanierer",
      description: "Die Kosten für Sanierungsarbeiten variieren je nach Zustand der Immobilie, Umfang der Maßnahmen und Ausstattungswünschen. Zur ersten Orientierung gelten folgende Richtwerte.",
      keywords: "Sanierung München Kosten 2026, was kostet Komplettsanierung München pro qm, Badsanierung Kosten München aktuell, Wohnungssanierung Preis pro Quadratmeter München, Festpreis Sanierung München ohne Nachforderungen, Haussanierung Kosten Einfamilienhaus München",
      canonical: `${BASE_URL}/kosten`,
      ogTitle: "Sanierung München Kosten 2026 - Transparente Festpreise",
      ogDescription: "Die Kosten für Sanierungsarbeiten variieren je nach Zustand, Umfang und Ausstattungswünschen. Richtwerte und Festpreise.",
      ogImage: `${BASE_URL}/images/sanierung_preiskalkulation.webp`,
      ogImageAlt: "Sanierung München Kosten 2026 - transparente Preiskalkulation und Festpreisgarantie für alle Gewerke",
    };
  }

  if (normalizedPath === "/komplettsanierung") {
    return {
      title: "Komplettsanierung München ✓ Wohnung & Haus vom Fachbetrieb",
      description: "Professionelle Komplettsanierung in München. Koordination aller Gewerke, klare Abläufe und hochwertige Ausführung – vom Konzept bis zur Fertigstellung.",
      keywords: "Komplettsanierung München Kosten pro qm, Wohnung komplett sanieren lassen München, Haus komplett sanieren München Festpreis, Altbau Komplettsanierung München Erfahrungen, Generalunternehmer Komplettsanierung München, schlüsselfertige Sanierung München",
      canonical: `${BASE_URL}/komplettsanierung`,
      ogTitle: "Komplettsanierung München ✓ Wohnung & Haus vom Fachbetrieb",
      ogDescription: "Professionelle Komplettsanierung in München. Koordination aller Gewerke, klare Abläufe und hochwertige Ausführung.",
      ogImage: `${BASE_URL}/images/komplettsanierung_ergebnis.webp`,
      ogImageAlt: "Komplettsanierung München Ergebnis - schlüsselfertig sanierte Wohnung mit allen Gewerken aus einer Hand",
    };
  }

  if (normalizedPath === "/badsanierung") {
    return {
      title: "Badsanierung München ✓ Modernes Bad aus einer Hand | 089-Sanierer",
      description: "Ihre Badsanierung in München vom erfahrenen Sanierungsbetrieb. Individuelle Planung, saubere Ausführung und persönliche Betreuung. Jetzt beraten lassen.",
      keywords: "Badsanierung München Kosten 2026, Bad komplett sanieren München Festpreis, barrierefreie Badsanierung München, Badezimmer modernisieren München Meisterbetrieb, bodengleiche Dusche einbauen München, Bad renovieren München Dauer und Kosten",
      canonical: `${BASE_URL}/badsanierung`,
      ogTitle: "Badsanierung München ✓ Modernes Bad aus einer Hand | 089-Sanierer",
      ogDescription: "Ihre Badsanierung in München vom erfahrenen Sanierungsbetrieb. Individuelle Planung, saubere Ausführung und persönliche Betreuung. Jetzt beraten lassen.",
      ogImage: `${BASE_URL}/images/moderne_badsanierung.webp`,
      ogImageAlt: "Moderne Badsanierung München - fertig saniertes Badezimmer mit bodengleicher Dusche und hochwertigen Fliesen",
    };
  }

  if (normalizedPath === "/kuechensanierung") {
    return {
      title: "Küchensanierung München ✓ Funktional, modern & hochwertig",
      description: "Ihre Küchensanierung in München vom erfahrenen Sanierungsbetrieb. Modernisieren Sie Ihre Küche effizient und hochwertig.",
      keywords: "Küchensanierung München Kosten, Küche komplett sanieren München, Küchenumbau München Festpreis, Küche modernisieren München Handwerker, Elektro und Wasser Küche München, Küchenrenovierung München Meisterbetrieb",
      canonical: `${BASE_URL}/kuechensanierung`,
      ogTitle: "Küchensanierung München ✓ Funktional, modern & hochwertig",
      ogDescription: "Ihre Küchensanierung in München vom erfahrenen Sanierungsbetrieb. Modernisieren Sie Ihre Küche effizient und hochwertig.",
      ogImage: `${BASE_URL}/images/moderne_kuechensanierung_ergebnis.webp`,
      ogImageAlt: "Küchensanierung München Ergebnis - modern sanierte Küche mit neuen Elektro- und Wasseranschlüssen",
    };
  }

  if (normalizedPath === "/bodensanierung") {
    return {
      title: "Wohnungssanierung in München | Böden, Bad & Komplettsanierung",
      description: "Professionelle Wohnungssanierung in München inklusive Bodensanierung. Fachgerechte Erneuerung von Estrich, Parkett und Bodenbelägen – alles aus einer Hand.",
      keywords: "Bodensanierung München Kosten, Parkett verlegen München Meisterbetrieb, Fliesen sanieren München Festpreis, Estrich erneuern München, Fußbodenheizung nachrüsten München, Vinyl Boden verlegen München Kosten",
      canonical: `${BASE_URL}/bodensanierung`,
      ogTitle: "Wohnungssanierung in München | Böden, Bad & Komplettsanierung",
      ogDescription: "Professionelle Wohnungssanierung in München inklusive Bodensanierung. Fachgerechte Erneuerung von Estrich, Parkett und Bodenbelägen.",
      ogImage: `${BASE_URL}/images/parkettboden_sanierung_ergebnis.webp`,
      ogImageAlt: "Bodensanierung München - frisch verlegter Parkettboden nach professioneller Sanierung mit Fußbodenheizung",
    };
  }

  if (normalizedPath === "/barrierefreiheit") {
    return {
      title: "Barrierefreiheit | Erklärung zur Zugänglichkeit | 089-Sanierer",
      description: "Erklärung zur Barrierefreiheit von 089-Sanierer.de. Informationen zu WCAG 2.1, BITV 2.0 Konformität und Zugänglichkeitsmaßnahmen unserer Website.",
      keywords: "Barrierefreiheit, Accessibility, WCAG, BITV, Zugänglichkeit, 089-Sanierer",
      canonical: `${BASE_URL}/barrierefreiheit`,
      ogTitle: "Erklärung zur Barrierefreiheit | 089-Sanierer",
      ogDescription: "Informationen zur Barrierefreiheit und Zugänglichkeit unserer Website gemäß WCAG 2.1 und BITV 2.0.",
    };
  }

  if (normalizedPath === "/elektrosanierung") {
    return {
      title: "Wohnungsrenovierung München ✓ Elektrosanierung & Ausbau",
      description: "Professionelle Wohnungsrenovierung in München inklusive Elektrosanierung. Erneuerung von Leitungen, Verteilungen und Anschlüssen – fachgerecht und sicher umgesetzt.",
      keywords: "Elektrosanierung München Kosten pro qm, Elektroinstallation komplett erneuern München, Altbau Elektrik sanieren München VDE, Sicherungskasten tauschen München, Smart Home Vorbereitung Sanierung München, Elektriker Komplettsanierung München",
      canonical: `${BASE_URL}/elektrosanierung`,
      ogTitle: "Wohnungsrenovierung München ✓ Elektrosanierung & Ausbau",
      ogDescription: "Professionelle Wohnungsrenovierung in München inklusive Elektrosanierung. Erneuerung von Leitungen, Verteilungen und Anschlüssen.",
      ogImage: `${BASE_URL}/images/elektrosanierung_installation.webp`,
      ogImageAlt: "Elektrosanierung München - fachgerechte Elektroinstallation nach VDE-Norm durch zertifizierten Meisterbetrieb",
    };
  }

  if (normalizedPath === "/dachsanierung") {
    return {
      title: "Haussanierung München ✓ Dachsanierung & energetische Maßnahmen",
      description: "Professionelle Haussanierung in München inklusive Dachsanierung. Erneuerung, Instandsetzung und energetische Optimierung – strukturiert aus einer Hand.",
      keywords: "Dachsanierung München Kosten 2026, Dach komplett sanieren München, Dachdämmung München KfW Förderung, Dacheindeckung erneuern München, Dachfenster einbauen München, energetische Dachsanierung München Fachbetrieb",
      canonical: `${BASE_URL}/dachsanierung`,
      ogTitle: "Haussanierung München ✓ Dachsanierung & energetische Maßnahmen",
      ogDescription: "Professionelle Haussanierung in München inklusive Dachsanierung. Erneuerung, Instandsetzung und energetische Optimierung.",
      ogImage: `${BASE_URL}/images/fertig_saniertes_hausdach.webp`,
      ogImageAlt: "Dachsanierung München - fertig saniertes Hausdach mit neuer Dämmung und Dacheindeckung",
    };
  }

  if (normalizedPath === "/heizungssanierung") {
    return {
      title: "Haussanierung München | Heizungssanierung mit Wärmepumpe",
      description: "Professionelle Haussanierung in München inklusive Heizungssanierung mit Wärmepumpe. Energieeffiziente Lösungen, Förderberatung und fachgerechte Umsetzung aus einer Hand.",
      keywords: "Heizungssanierung München Kosten 2026, Wärmepumpe einbauen München Förderung, Heizung erneuern Altbau München, Fußbodenheizung nachrüsten München, Gas Heizung tauschen München, Heizungsmodernisierung München KfW BAFA",
      canonical: `${BASE_URL}/heizungssanierung`,
      ogTitle: "Haussanierung München | Heizungssanierung mit Wärmepumpe",
      ogDescription: "Professionelle Haussanierung in München inklusive Heizungssanierung mit Wärmepumpe. Energieeffiziente Lösungen und Förderberatung.",
      ogImage: `${BASE_URL}/images/moderne_heizungsanlage_einbau.webp`,
      ogImageAlt: "Heizungssanierung München - Einbau einer modernen Heizungsanlage mit Wärmepumpe und Förderberatung",
    };
  }

  if (normalizedPath === "/wohnungssanierung") {
    return {
      title: "Wohnungssanierung München ab 800 €/m² ✓ Komplettsanierung vom Profi",
      description: "Komplette Wohnungssanierung in München ab 800 €/m². Planung, Ausführung & Festpreis aus einer Hand. Jetzt kostenlos beraten lassen.",
      keywords: "Wohnungssanierung München Kosten pro qm 2026, Altbauwohnung komplett sanieren München, Wohnung renovieren lassen München Festpreis, Mietwohnung sanieren München, Eigentumswohnung sanieren München Meisterbetrieb, Wohnungssanierung München Dauer",
      canonical: `${BASE_URL}/wohnungssanierung`,
      ogTitle: "Wohnungssanierung München ab 800 €/m² ✓ Komplettsanierung vom Profi",
      ogDescription: "Komplette Wohnungssanierung in München ab 800 €/m². Planung, Ausführung & Festpreis aus einer Hand. Jetzt kostenlos beraten lassen.",
      ogImage: `${BASE_URL}/images/sanierte_luxuswohnung_interieur.webp`,
      ogImageAlt: "Wohnungssanierung München Ergebnis - komplett sanierte Wohnung mit modernem Interieur und hochwertiger Ausstattung",
    };
  }

  if (normalizedPath === "/haussanierung") {
    return {
      title: "Haussanierung München | Komplett ab 1.200€/m² | 089-Sanierer",
      description: "Haussanierung München: Komplette Haussanierung ab 1.200€/m². Einfamilienhaus, Mehrfamilienhaus - alles aus einer Hand mit Festpreisgarantie.",
      keywords: "Haussanierung München Kosten 2026, Einfamilienhaus komplett sanieren München, Altbau Haus sanieren München Festpreis, Haus renovieren München Meisterbetrieb, Mehrfamilienhaus sanieren München, Haussanierung München Dauer und Ablauf",
      canonical: `${BASE_URL}/haussanierung`,
      ogTitle: "Haussanierung München - ab 1.200€/m²",
      ogDescription: "Komplette Haussanierung für Einfamilien- und Mehrfamilienhäuser mit Festpreisgarantie.",
      ogImage: `${BASE_URL}/images/haus_vorher_nachher_zickzack.webp`,
      ogImageAlt: "Haussanierung München vorher nachher - Einfamilienhaus komplett saniert mit Festpreisgarantie",
    };
  }

  if (normalizedPath === "/kernsanierung") {
    return {
      title: "Kernsanierung München ab 1.200€/m² | 089-Sanierer",
      description: "Kernsanierung München: Professionelle Kernsanierung ab 1.200€/m². Bis auf die Grundsubstanz und komplett neu aufbauen. Festpreisgarantie.",
      keywords: "Kernsanierung München Kosten pro qm 2026, Altbau Kernsanierung München Erfahrungen, Haus entkernen und sanieren München, Kernsanierung vs Komplettsanierung München, Kernsanierung Einfamilienhaus München Dauer, Rohbau Sanierung München Festpreis",
      canonical: `${BASE_URL}/kernsanierung`,
      ogTitle: "Kernsanierung München - ab 1.200€/m²",
      ogDescription: "Professionelle Kernsanierung in München. Zurück zum Kern, komplett neu aufgebaut.",
      ogImage: `${BASE_URL}/images/komplettsanierung_haus.webp`,
      ogImageAlt: "Kernsanierung München - Haus bis auf die Grundsubstanz entkernt und professionell neu aufgebaut",
    };
  }

  if (normalizedPath === "/energetische-sanierung") {
    return {
      title: "Energetische Sanierung München | Effizienz, Förderung & Fachbetrieb",
      description: "Energetische Sanierung in München vom erfahrenen Fachbetrieb. Senken Sie Energiekosten, steigern Sie den Wohnkomfort und nutzen Sie staatliche Förderungen. Jetzt beraten lassen.",
      keywords: "Energetische Sanierung München Kosten 2026, KfW Förderung energetische Sanierung München, Wärmedämmung Haus München Kosten, Fensteraustausch München Förderung, BAFA Zuschuss Sanierung München, Energieausweis Sanierung München Pflicht",
      canonical: `${BASE_URL}/energetische-sanierung`,
      ogTitle: "Energetische Sanierung München | Effizienz, Förderung & Fachbetrieb",
      ogDescription: "Energetische Sanierung in München vom erfahrenen Fachbetrieb. Senken Sie Energiekosten, steigern Sie den Wohnkomfort und nutzen Sie staatliche Förderungen. Jetzt beraten lassen.",
      ogImage: `${BASE_URL}/images/energieeffizientes_saniertes_haus.webp`,
      ogImageAlt: "Energetische Sanierung München - energieeffizient saniertes Haus mit Wärmedämmung und modernen Fenstern",
    };
  }

  if (normalizedPath === "/rechner") {
    return {
      title: "Sanierungskosten Rechner München | Online Kostenschätzung",
      description: "Online-Kostenrechner für Sanierungen. Schnell, unverbindlich und als erste Orientierung für Ihre Planung. Jetzt Kosten einschätzen.",
      keywords: "Sanierungsrechner München online, Sanierung Kosten berechnen München, Badsanierung Rechner Kosten, Renovierungskosten pro qm München berechnen, Komplettsanierung Kalkulator München, was kostet meine Sanierung München",
      canonical: `${BASE_URL}/rechner`,
      ogTitle: "Sanierungskosten Rechner München | Online Kostenschätzung",
      ogDescription: "Online-Kostenrechner für Sanierungen. Schnell, unverbindlich und als erste Orientierung für Ihre Planung.",
      ogImage: `${BASE_URL}/images/sanierung_preiskalkulation.webp`,
      ogImageAlt: "Sanierungskosten Rechner München - Online-Kalkulator für Badsanierung und Komplettsanierung Kosten",
    };
  }

  if (normalizedPath === "/kontakt") {
    return {
      title: "Kontakt | 089-Sanierer | Sanierung Beratung",
      description: "Kontaktieren Sie 089-Sanierer für Ihre Sanierungsanfrage. Telefon: 0152 122 740 43. Kostenlose Beratung in München und Umgebung.",
      keywords: "089-Sanierer Kontakt München, Sanierung München kostenlose Beratung, Sanierungsfirma München Telefon, Handwerker München Terminvereinbarung, Sanierungsberatung München vor Ort",
      canonical: `${BASE_URL}/kontakt`,
      ogTitle: "Kontakt - 089-Sanierer",
      ogDescription: "Kontaktieren Sie uns für Ihre kostenlose Sanierungsberatung. Wir sind für Sie da!",
      ogImage: `${BASE_URL}/images/kundenservice_kontakt.webp`,
      ogImageAlt: "Kontakt 089-Sanierer München - persönliche Sanierungsberatung und kostenloser Vor-Ort-Termin",
    };
  }

  if (normalizedPath === "/impressum") {
    return {
      title: "Impressum | 089-Sanierer",
      description: "Impressum der 089-Sanierer - Komplettsanierungen Haus & Wohnung. Rechtliche Informationen und Kontaktdaten.",
      keywords: "089-Sanierer Impressum, Sanierung München Impressum, KSHW München Kontaktdaten",
      canonical: `${BASE_URL}/impressum`,
      ogTitle: "Impressum - 089-Sanierer",
      ogDescription: "Rechtliche Informationen zu 089-Sanierer.",
      ogImage: `${BASE_URL}/images/rechtliche_dokumente_impressum.webp`,
      ogImageAlt: "Impressum 089-Sanierer München - rechtliche Informationen und Kontaktdaten der Sanierungsfirma",
    };
  }

  if (normalizedPath === "/datenschutz") {
    return {
      title: "Datenschutz | 089-Sanierer",
      description: "Datenschutzerklärung der 089-Sanierer. Informationen zum Umgang mit Ihren Daten gemäß DSGVO.",
      keywords: "089-Sanierer Datenschutz, Sanierung München Datenschutz DSGVO, Datenschutzerklärung Handwerker München",
      canonical: `${BASE_URL}/datenschutz`,
      ogTitle: "Datenschutz - 089-Sanierer",
      ogDescription: "Unsere Datenschutzerklärung gemäß DSGVO.",
      ogImage: `${BASE_URL}/images/datenschutz_sicherheit.webp`,
      ogImageAlt: "Datenschutz 089-Sanierer - DSGVO-konforme Verarbeitung Ihrer Sanierungsanfragen",
    };
  }

  if (normalizedPath === "/ratgeber") {
    return {
      title: "Ratgeber zur Sanierung | Energie, Badsanierung & Modernisierung",
      description: "Praxisnahe Ratgeber zu Sanierung, energetischer Modernisierung und Badsanierung. Fachwissen, Tipps und Entscheidungshilfen vom erfahrenen Sanierungsbetrieb.",
      keywords: "Sanierung Ratgeber München 2026, Badsanierung Tipps und Tricks, Renovierung planen München Checkliste, Modernisierung Altbau Ratgeber, Sanierung richtig planen München, Renovierungskosten sparen Tipps München",
      canonical: `${BASE_URL}/ratgeber`,
      ogTitle: "Ratgeber zur Sanierung | Energie, Badsanierung & Modernisierung",
      ogDescription: "Praxisnahe Ratgeber zu Sanierung, energetischer Modernisierung und Badsanierung. Fachwissen, Tipps und Entscheidungshilfen vom erfahrenen Sanierungsbetrieb.",
      ogImage: `${BASE_URL}/images/sanierungsberater_experte.webp`,
      ogImageAlt: "Sanierung Ratgeber München - Experten-Tipps für Badsanierung, Komplettsanierung und energetische Modernisierung",
    };
  }

  if (normalizedPath === "/faq-sanierung") {
    return {
      title: "FAQ Sanierung | Häufige Fragen zu Bad, Wohnung & Energie",
      description: "Antworten auf häufige Fragen zur Sanierung: Badsanierung, Wohnungssanierung, energetische Modernisierung. Praxiswissen vom erfahrenen Sanierungsbetrieb.",
      keywords: "FAQ Sanierung München, Badsanierung häufige Fragen, Wohnungssanierung München Fragen und Antworten, was kostet Sanierung München FAQ, Sanierung Ablauf Fragen, Komplettsanierung FAQ München",
      canonical: `${BASE_URL}/faq-sanierung`,
      ogTitle: "FAQ Sanierung | Häufige Fragen zu Bad, Wohnung & Energie",
      ogDescription: "Antworten auf häufige Fragen zur Sanierung: Badsanierung, Wohnungssanierung, energetische Modernisierung.",
      ogImage: `${BASE_URL}/images/qualitaetskontrolle_sanierung.webp`,
      ogImageAlt: "FAQ Sanierung München - Antworten auf häufige Fragen zu Kosten, Dauer und Ablauf der Sanierung",
    };
  }

  if (normalizedPath === "/faq-preise") {
    return {
      title: "FAQ & Preise | Sanierung München | 089-Sanierer",
      description: "Häufig gestellte Fragen zu Sanierung in München. Preise, Dauer, Ablauf - alle Antworten von 089-Sanierer.",
      keywords: "Sanierung FAQ München Preise 2026, Badsanierung Kosten FAQ München, Komplettsanierung Preise Fragen, Sanierung München was kostet, Festpreis Sanierung FAQ, Sanierungskosten München Übersicht",
      canonical: `${BASE_URL}/faq-preise`,
      ogTitle: "FAQ & Preise - Sanierung München",
      ogDescription: "Alle Antworten zu Kosten, Dauer und Ablauf Ihrer Sanierung in München.",
      ogImage: `${BASE_URL}/images/sanierung_preiskalkulation.webp`,
      ogImageAlt: "FAQ und Preise Sanierung München - transparente Kostenübersicht für alle Sanierungsleistungen 2026",
    };
  }

  if (normalizedPath.startsWith("/muenchen-")) {
    const district = normalizedPath.replace("/muenchen-", "");
    const meta = districtMeta[district];
    if (meta) {
      return {
        title: `Sanierung ${meta.name} München | Festpreis | 089-Sanierer`,
        description: `Sanierung in ${meta.name}: ${meta.description}. Badsanierung, Komplettsanierung, Kernsanierung zum Festpreis. 5 Jahre Gewährleistung.`,
        keywords: `Sanierung ${meta.name} München Festpreis, Badsanierung ${meta.name} Kosten, Komplettsanierung ${meta.name} München, Wohnung sanieren ${meta.name}, Handwerker ${meta.name} München Sanierung, Renovierung ${meta.name} Meisterbetrieb`,
        canonical: `${BASE_URL}${normalizedPath}`,
        ogTitle: `Sanierung ${meta.name} - 089-Sanierer`,
        ogDescription: `${meta.description}. Festpreisgarantie und 5 Jahre Gewährleistung.`,
        ogImage: `${BASE_URL}/images/fachhandwerker_meisterbetriebe.webp`,
        ogImageAlt: `Sanierung ${meta.name} München - lokaler Meisterbetrieb für Badsanierung und Komplettsanierung mit Festpreisgarantie`,
      };
    }
  }

  return {
    title: "089-Sanierer | Komplettsanierungen Haus & Wohnung",
    description: "089-Sanierer - Ihr Partner für Komplettsanierungen in München. Badsanierung, Wohnungssanierung, Haussanierung mit Festpreisgarantie.",
    keywords: "089-Sanierer München, Sanierung München Festpreis, Komplettsanierung München Meisterbetrieb",
    canonical: `${BASE_URL}${normalizedPath}`,
    ogTitle: "089-Sanierer - Komplettsanierungen",
    ogDescription: "Ihr Partner für Sanierungen in München mit Festpreisgarantie.",
    ogImage: `${BASE_URL}/images/komplettsanierung_vorher_nachher.webp`,
    ogImageAlt: "089-Sanierer München - professionelle Komplettsanierung mit Festpreisgarantie und 5 Jahre Gewährleistung",
  };
}
