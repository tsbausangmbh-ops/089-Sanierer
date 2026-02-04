export interface SeoMeta {
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  ogTitle: string;
  ogDescription: string;
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
      description: "Was kostet eine Sanierung in München? 089-Sanierer: Badsanierung ab 9.200€, Komplettsanierung ab 920€/m². 268+ zufriedene Kunden, Festpreisgarantie, 5 Jahre Gewährleistung. Kostenlose Beratung in 24h.",
      keywords: "Sanierung München, Komplettsanierung München, Badsanierung München, Haussanierung München, 089-Sanierer",
      canonical: BASE_URL,
      ogTitle: "Was kostet Sanierung in München? Badsanierung ab 9.200€ | 089-Sanierer",
      ogDescription: "268+ zufriedene Münchner Kunden: Badsanierung ab 9.200€, Komplettsanierung ab 920€/m². Festpreisgarantie, 5 Jahre Gewährleistung.",
    };
  }

  if (normalizedPath === "/anfrage") {
    return {
      title: "Kostenlose Anfrage | Sanierung München | 089-Sanierer",
      description: "Jetzt kostenlose Sanierungsanfrage stellen. Wir melden uns innerhalb von 24 Stunden. Badsanierung, Komplettsanierung, Wohnungssanierung in München.",
      keywords: "Sanierung Anfrage München, Badsanierung Angebot, Komplettsanierung Kosten",
      canonical: `${BASE_URL}/anfrage`,
      ogTitle: "Kostenlose Sanierungsanfrage - 089-Sanierer",
      ogDescription: "Stellen Sie jetzt Ihre kostenlose Anfrage für Badsanierung, Komplettsanierung oder Wohnungssanierung in München.",
    };
  }

  if (normalizedPath === "/danke") {
    return {
      title: "Vielen Dank für Ihre Anfrage | 089-Sanierer",
      description: "Ihre Sanierungsanfrage wurde erfolgreich übermittelt. Wir melden uns innerhalb von 24 Stunden bei Ihnen.",
      keywords: "Sanierung Anfrage München",
      canonical: `${BASE_URL}/danke`,
      ogTitle: "Anfrage erhalten - 089-Sanierer",
      ogDescription: "Vielen Dank! Wir melden uns innerhalb von 24 Stunden bei Ihnen.",
    };
  }

  if (normalizedPath === "/kosten") {
    return {
      title: "Sanierung München Kosten 2026 | Festpreise | 089-Sanierer",
      description: "Die Kosten für Sanierungsarbeiten variieren je nach Zustand der Immobilie, Umfang der Maßnahmen und Ausstattungswünschen. Zur ersten Orientierung gelten folgende Richtwerte.",
      keywords: "Sanierung München Kosten, was kostet Sanierung München, Badsanierung Kosten München, Komplettsanierung Preis München, Festpreis Sanierung München, Sanierung Kosten 2026",
      canonical: `${BASE_URL}/kosten`,
      ogTitle: "Sanierung München Kosten 2026 - Transparente Festpreise",
      ogDescription: "Die Kosten für Sanierungsarbeiten variieren je nach Zustand, Umfang und Ausstattungswünschen. Richtwerte und Festpreise.",
    };
  }

  if (normalizedPath === "/komplettsanierung") {
    return {
      title: "Komplettsanierung München ✓ Wohnung & Haus vom Fachbetrieb",
      description: "Professionelle Komplettsanierung in München. Koordination aller Gewerke, klare Abläufe und hochwertige Ausführung – vom Konzept bis zur Fertigstellung.",
      keywords: "Komplettsanierung München, Wohnung komplett sanieren, Haus sanieren München, Komplettrenovierung München",
      canonical: `${BASE_URL}/komplettsanierung`,
      ogTitle: "Komplettsanierung München ✓ Wohnung & Haus vom Fachbetrieb",
      ogDescription: "Professionelle Komplettsanierung in München. Koordination aller Gewerke, klare Abläufe und hochwertige Ausführung.",
    };
  }

  if (normalizedPath === "/badsanierung") {
    return {
      title: "Badsanierung München ✓ Modernes Bad aus einer Hand | 089-Sanierer",
      description: "Ihre Badsanierung in München vom erfahrenen Sanierungsbetrieb. Individuelle Planung, saubere Ausführung und persönliche Betreuung. Jetzt beraten lassen.",
      keywords: "Badsanierung München, Bad sanieren München, Badsanierung Kosten München, Bad renovieren München, Badezimmer sanieren München",
      canonical: `${BASE_URL}/badsanierung`,
      ogTitle: "Badsanierung München ✓ Modernes Bad aus einer Hand | 089-Sanierer",
      ogDescription: "Ihre Badsanierung in München vom erfahrenen Sanierungsbetrieb. Individuelle Planung, saubere Ausführung und persönliche Betreuung. Jetzt beraten lassen.",
    };
  }

  if (normalizedPath === "/kuechensanierung") {
    return {
      title: "Küchensanierung München ✓ Funktional, modern & hochwertig",
      description: "Ihre Küchensanierung in München vom erfahrenen Sanierungsbetrieb. Modernisieren Sie Ihre Küche effizient und hochwertig.",
      keywords: "Küchensanierung München, Küche sanieren München, Küche renovieren München, Küchenrenovierung München",
      canonical: `${BASE_URL}/kuechensanierung`,
      ogTitle: "Küchensanierung München ✓ Funktional, modern & hochwertig",
      ogDescription: "Ihre Küchensanierung in München vom erfahrenen Sanierungsbetrieb. Modernisieren Sie Ihre Küche effizient und hochwertig.",
    };
  }

  if (normalizedPath === "/bodensanierung") {
    return {
      title: "Wohnungssanierung in München | Böden, Bad & Komplettsanierung",
      description: "Professionelle Wohnungssanierung in München inklusive Bodensanierung. Fachgerechte Erneuerung von Estrich, Parkett und Bodenbelägen – alles aus einer Hand.",
      keywords: "Bodensanierung München, Boden sanieren München, Parkett verlegen München, Fliesen sanieren München",
      canonical: `${BASE_URL}/bodensanierung`,
      ogTitle: "Wohnungssanierung in München | Böden, Bad & Komplettsanierung",
      ogDescription: "Professionelle Wohnungssanierung in München inklusive Bodensanierung. Fachgerechte Erneuerung von Estrich, Parkett und Bodenbelägen.",
    };
  }

  if (normalizedPath === "/elektrosanierung") {
    return {
      title: "Wohnungsrenovierung München ✓ Elektrosanierung & Ausbau",
      description: "Professionelle Wohnungsrenovierung in München inklusive Elektrosanierung. Erneuerung von Leitungen, Verteilungen und Anschlüssen – fachgerecht und sicher umgesetzt.",
      keywords: "Elektrosanierung München, Elektroinstallation München, Elektrik sanieren München, Leitungen erneuern München",
      canonical: `${BASE_URL}/elektrosanierung`,
      ogTitle: "Wohnungsrenovierung München ✓ Elektrosanierung & Ausbau",
      ogDescription: "Professionelle Wohnungsrenovierung in München inklusive Elektrosanierung. Erneuerung von Leitungen, Verteilungen und Anschlüssen.",
    };
  }

  if (normalizedPath === "/dachsanierung") {
    return {
      title: "Haussanierung München ✓ Dachsanierung & energetische Maßnahmen",
      description: "Professionelle Haussanierung in München inklusive Dachsanierung. Erneuerung, Instandsetzung und energetische Optimierung – strukturiert aus einer Hand.",
      keywords: "Dachsanierung München, Dach sanieren München, Dachdämmung München, Dach erneuern München",
      canonical: `${BASE_URL}/dachsanierung`,
      ogTitle: "Haussanierung München ✓ Dachsanierung & energetische Maßnahmen",
      ogDescription: "Professionelle Haussanierung in München inklusive Dachsanierung. Erneuerung, Instandsetzung und energetische Optimierung.",
    };
  }

  if (normalizedPath === "/heizungssanierung") {
    return {
      title: "Haussanierung München | Heizungssanierung mit Wärmepumpe",
      description: "Heizungssanierung in München vom erfahrenen Fachbetrieb. Wärmepumpe, moderne Heizsysteme und energetische Optimierung.",
      keywords: "Heizungssanierung München, Heizung erneuern München, Wärmepumpe München, Heizungsmodernisierung München",
      canonical: `${BASE_URL}/heizungssanierung`,
      ogTitle: "Haussanierung München | Heizungssanierung mit Wärmepumpe",
      ogDescription: "Heizungssanierung in München vom erfahrenen Fachbetrieb. Wärmepumpe, moderne Heizsysteme und energetische Optimierung.",
    };
  }

  if (normalizedPath === "/wohnungssanierung") {
    return {
      title: "Wohnungssanierung München ab 800 €/m² ✓ Komplettsanierung vom Profi",
      description: "Komplette Wohnungssanierung in München ab 800 €/m². Planung, Ausführung & Festpreis aus einer Hand. Jetzt kostenlos beraten lassen.",
      keywords: "Wohnungssanierung München, Wohnung sanieren München, Wohnung renovieren München, Altbauwohnung sanieren München",
      canonical: `${BASE_URL}/wohnungssanierung`,
      ogTitle: "Wohnungssanierung München ab 800 €/m² ✓ Komplettsanierung vom Profi",
      ogDescription: "Komplette Wohnungssanierung in München ab 800 €/m². Planung, Ausführung & Festpreis aus einer Hand. Jetzt kostenlos beraten lassen.",
    };
  }

  if (normalizedPath === "/haussanierung") {
    return {
      title: "Haussanierung München | Komplett ab 920€/m² | 089-Sanierer",
      description: "Haussanierung München: Komplette Haussanierung ab 920€/m². Einfamilienhaus, Mehrfamilienhaus - alles aus einer Hand mit Festpreisgarantie.",
      keywords: "Haussanierung München, Haus sanieren München, Einfamilienhaus sanieren München, Haus renovieren München",
      canonical: `${BASE_URL}/haussanierung`,
      ogTitle: "Haussanierung München - ab 920€/m²",
      ogDescription: "Komplette Haussanierung für Einfamilien- und Mehrfamilienhäuser mit Festpreisgarantie.",
    };
  }

  if (normalizedPath === "/kernsanierung") {
    return {
      title: "Kernsanierung München ab 1.200€/m² | 089-Sanierer",
      description: "Kernsanierung München: Professionelle Kernsanierung ab 1.200€/m². Bis auf die Grundsubstanz und komplett neu aufbauen. Festpreisgarantie.",
      keywords: "Kernsanierung München, Kernsanierung Kosten München, Altbau Kernsanierung München, Haus entkernen München",
      canonical: `${BASE_URL}/kernsanierung`,
      ogTitle: "Kernsanierung München - ab 1.200€/m²",
      ogDescription: "Professionelle Kernsanierung in München. Zurück zum Kern, komplett neu aufgebaut.",
    };
  }

  if (normalizedPath === "/energetische-sanierung") {
    return {
      title: "Energetische Sanierung München | Effizienz, Förderung & Fachbetrieb",
      description: "Energetische Sanierung in München vom erfahrenen Fachbetrieb. Senken Sie Energiekosten, steigern Sie den Wohnkomfort und nutzen Sie staatliche Förderungen. Jetzt beraten lassen.",
      keywords: "Energetische Sanierung München, energetisch sanieren München, Wärmedämmung München, Heizungssanierung München, KfW Förderung Sanierung",
      canonical: `${BASE_URL}/energetische-sanierung`,
      ogTitle: "Energetische Sanierung München | Effizienz, Förderung & Fachbetrieb",
      ogDescription: "Energetische Sanierung in München vom erfahrenen Fachbetrieb. Senken Sie Energiekosten, steigern Sie den Wohnkomfort und nutzen Sie staatliche Förderungen. Jetzt beraten lassen.",
    };
  }

  if (normalizedPath === "/rechner") {
    return {
      title: "Sanierungskosten Rechner München | Online Kostenschätzung",
      description: "Online-Kostenrechner für Sanierungen. Schnell, unverbindlich und als erste Orientierung für Ihre Planung. Jetzt Kosten einschätzen.",
      keywords: "Sanierungsrechner München, Sanierung Kosten Rechner, Badsanierung Rechner, Renovierungskosten berechnen München, Online Kostenschätzung",
      canonical: `${BASE_URL}/rechner`,
      ogTitle: "Sanierungskosten Rechner München | Online Kostenschätzung",
      ogDescription: "Online-Kostenrechner für Sanierungen. Schnell, unverbindlich und als erste Orientierung für Ihre Planung.",
    };
  }

  if (normalizedPath === "/kontakt") {
    return {
      title: "Kontakt | 089-Sanierer | Sanierung Beratung",
      description: "Kontaktieren Sie 089-Sanierer für Ihre Sanierungsanfrage. Telefon: 0152 122 740 43. Kostenlose Beratung in München und Umgebung.",
      keywords: "089-Sanierer Kontakt, Sanierung München Beratung, Sanierung Telefon München",
      canonical: `${BASE_URL}/kontakt`,
      ogTitle: "Kontakt - 089-Sanierer",
      ogDescription: "Kontaktieren Sie uns für Ihre kostenlose Sanierungsberatung. Wir sind für Sie da!",
    };
  }

  if (normalizedPath === "/impressum") {
    return {
      title: "Impressum | 089-Sanierer",
      description: "Impressum der 089-Sanierer - Komplettsanierungen Haus & Wohnung. Rechtliche Informationen und Kontaktdaten.",
      keywords: "089-Sanierer Impressum, Sanierung München Impressum",
      canonical: `${BASE_URL}/impressum`,
      ogTitle: "Impressum - 089-Sanierer",
      ogDescription: "Rechtliche Informationen zu 089-Sanierer.",
    };
  }

  if (normalizedPath === "/datenschutz") {
    return {
      title: "Datenschutz | 089-Sanierer",
      description: "Datenschutzerklärung der 089-Sanierer. Informationen zum Umgang mit Ihren Daten gemäß DSGVO.",
      keywords: "089-Sanierer Datenschutz, Sanierung München Datenschutz",
      canonical: `${BASE_URL}/datenschutz`,
      ogTitle: "Datenschutz - 089-Sanierer",
      ogDescription: "Unsere Datenschutzerklärung gemäß DSGVO.",
    };
  }

  if (normalizedPath === "/ratgeber") {
    return {
      title: "Ratgeber zur Sanierung | Energie, Badsanierung & Modernisierung",
      description: "Praxisnahe Ratgeber zu Sanierung, energetischer Modernisierung und Badsanierung. Fachwissen, Tipps und Entscheidungshilfen vom erfahrenen Sanierungsbetrieb.",
      keywords: "Sanierung Ratgeber, Badsanierung Tipps, Renovierung Ratgeber München, Modernisierung Tipps",
      canonical: `${BASE_URL}/ratgeber`,
      ogTitle: "Ratgeber zur Sanierung | Energie, Badsanierung & Modernisierung",
      ogDescription: "Praxisnahe Ratgeber zu Sanierung, energetischer Modernisierung und Badsanierung. Fachwissen, Tipps und Entscheidungshilfen vom erfahrenen Sanierungsbetrieb.",
    };
  }

  if (normalizedPath === "/faq-sanierung") {
    return {
      title: "FAQ Sanierung | Häufige Fragen zu Bad, Wohnung & Energie",
      description: "Antworten auf häufige Fragen zur Sanierung: Badsanierung, Wohnungssanierung, energetische Modernisierung. Praxiswissen vom erfahrenen Sanierungsbetrieb.",
      keywords: "FAQ Sanierung, Badsanierung FAQ, Wohnungssanierung Fragen, energetische Sanierung FAQ",
      canonical: `${BASE_URL}/faq-sanierung`,
      ogTitle: "FAQ Sanierung | Häufige Fragen zu Bad, Wohnung & Energie",
      ogDescription: "Antworten auf häufige Fragen zur Sanierung: Badsanierung, Wohnungssanierung, energetische Modernisierung.",
    };
  }

  if (normalizedPath === "/faq-preise") {
    return {
      title: "FAQ & Preise | Sanierung München | 089-Sanierer",
      description: "Häufig gestellte Fragen zu Sanierung in München. Preise, Dauer, Ablauf - alle Antworten von 089-Sanierer.",
      keywords: "Sanierung FAQ München, Sanierung Preise München, Badsanierung Kosten FAQ",
      canonical: `${BASE_URL}/faq-preise`,
      ogTitle: "FAQ & Preise - Sanierung München",
      ogDescription: "Alle Antworten zu Kosten, Dauer und Ablauf Ihrer Sanierung in München.",
    };
  }

  if (normalizedPath.startsWith("/muenchen-")) {
    const district = normalizedPath.replace("/muenchen-", "");
    const meta = districtMeta[district];
    if (meta) {
      return {
        title: `Sanierung ${meta.name} München | Festpreis | 089-Sanierer`,
        description: `Sanierung in ${meta.name}: ${meta.description}. Badsanierung, Komplettsanierung, Kernsanierung zum Festpreis. 5 Jahre Gewährleistung.`,
        keywords: `Sanierung ${meta.name} München, ${meta.name} Sanierung, Badsanierung ${meta.name}, Renovierung ${meta.name}`,
        canonical: `${BASE_URL}${normalizedPath}`,
        ogTitle: `Sanierung ${meta.name} - 089-Sanierer`,
        ogDescription: `${meta.description}. Festpreisgarantie und 5 Jahre Gewährleistung.`,
      };
    }
  }

  return {
    title: "089-Sanierer | Komplettsanierungen Haus & Wohnung",
    description: "089-Sanierer - Ihr Partner für Komplettsanierungen in München. Badsanierung, Wohnungssanierung, Haussanierung mit Festpreisgarantie.",
    keywords: "089-Sanierer, Sanierung München, Komplettsanierung",
    canonical: `${BASE_URL}${normalizedPath}`,
    ogTitle: "089-Sanierer - Komplettsanierungen",
    ogDescription: "Ihr Partner für Sanierungen in München mit Festpreisgarantie.",
  };
}
