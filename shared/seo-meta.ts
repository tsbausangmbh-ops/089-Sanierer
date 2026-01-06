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
      title: "Sanierung München | Was kostet Badsanierung, Haussanierung, Komplettsanierung? | KSHW",
      description: "Was kostet eine Sanierung in München? KSHW: Badsanierung ab 9.200€, Komplettsanierung ab 920€/m². 268+ zufriedene Kunden, Festpreisgarantie, 5 Jahre Gewährleistung. Kostenlose Beratung in 24h.",
      keywords: "Sanierung München, Komplettsanierung München, Badsanierung München, Haussanierung München, KSHW",
      canonical: BASE_URL,
      ogTitle: "Was kostet Sanierung in München? Badsanierung ab 9.200€ | KSHW",
      ogDescription: "268+ zufriedene Münchner Kunden: Badsanierung ab 9.200€, Komplettsanierung ab 920€/m². Festpreisgarantie, 5 Jahre Gewährleistung.",
    };
  }

  if (normalizedPath === "/anfrage") {
    return {
      title: "Kostenlose Anfrage | Sanierung München | KSHW",
      description: "Jetzt kostenlose Sanierungsanfrage stellen. Wir melden uns innerhalb von 24 Stunden. Badsanierung, Komplettsanierung, Wohnungssanierung in München.",
      keywords: "Sanierung Anfrage München, Badsanierung Angebot, Komplettsanierung Kosten",
      canonical: `${BASE_URL}/anfrage`,
      ogTitle: "Kostenlose Sanierungsanfrage - KSHW München",
      ogDescription: "Stellen Sie jetzt Ihre kostenlose Anfrage für Badsanierung, Komplettsanierung oder Wohnungssanierung in München.",
    };
  }

  if (normalizedPath === "/danke") {
    return {
      title: "Vielen Dank für Ihre Anfrage | KSHW München",
      description: "Ihre Sanierungsanfrage wurde erfolgreich übermittelt. Wir melden uns innerhalb von 24 Stunden bei Ihnen.",
      keywords: "Sanierung Anfrage München",
      canonical: `${BASE_URL}/danke`,
      ogTitle: "Anfrage erhalten - KSHW München",
      ogDescription: "Vielen Dank! Wir melden uns innerhalb von 24 Stunden bei Ihnen.",
    };
  }

  if (normalizedPath === "/kosten") {
    return {
      title: "Was kostet Sanierung München? Preise 2025 | KSHW",
      description: "Sanierung München Kosten: Badsanierung ab 9.200€, Komplettsanierung ab 920€/m². Festpreisgarantie, 5 Jahre Gewährleistung. Kostenlose Beratung.",
      keywords: "Sanierung München Kosten, was kostet Sanierung München, Badsanierung Kosten München, Komplettsanierung Preis München, Festpreis Sanierung München",
      canonical: `${BASE_URL}/kosten`,
      ogTitle: "Sanierung München - Transparente Preise 2025",
      ogDescription: "Badsanierung ab 9.200€, Komplettsanierung ab 920€/m². Alle Preise mit Festpreisgarantie.",
    };
  }

  if (normalizedPath === "/badsanierung") {
    return {
      title: "Badsanierung München ab 9.200€ | Festpreis | KSHW",
      description: "Badsanierung München: Komplett-Badsanierung ab 9.200€. Alles aus einer Hand - Fliesen, Sanitär, Elektro. Festpreisgarantie, 5 Jahre Gewährleistung.",
      keywords: "Badsanierung München, Bad sanieren München, Badsanierung Kosten München, Bad renovieren München, Badezimmer sanieren München",
      canonical: `${BASE_URL}/badsanierung`,
      ogTitle: "Badsanierung München - Komplett ab 9.200€",
      ogDescription: "Komplett-Badsanierung in München mit Festpreisgarantie. Fliesen, Sanitär, Elektro - alles aus einer Hand.",
    };
  }

  if (normalizedPath === "/wohnungssanierung") {
    return {
      title: "Wohnungssanierung München ab 800€/m² | KSHW",
      description: "Wohnungssanierung München zum Festpreis ab 800€/m². Komplettsanierung aus einer Hand. 268+ zufriedene Kunden, 5 Jahre Gewährleistung.",
      keywords: "Wohnungssanierung München, Wohnung sanieren München, Wohnung renovieren München, Altbauwohnung sanieren München",
      canonical: `${BASE_URL}/wohnungssanierung`,
      ogTitle: "Wohnungssanierung München - ab 800€/m²",
      ogDescription: "Komplette Wohnungssanierung in München mit Festpreisgarantie. 268+ zufriedene Kunden.",
    };
  }

  if (normalizedPath === "/haussanierung") {
    return {
      title: "Haussanierung München | Komplett ab 920€/m² | KSHW",
      description: "Haussanierung München: Komplette Haussanierung ab 920€/m². Einfamilienhaus, Mehrfamilienhaus - alles aus einer Hand mit Festpreisgarantie.",
      keywords: "Haussanierung München, Haus sanieren München, Einfamilienhaus sanieren München, Haus renovieren München",
      canonical: `${BASE_URL}/haussanierung`,
      ogTitle: "Haussanierung München - ab 920€/m²",
      ogDescription: "Komplette Haussanierung für Einfamilien- und Mehrfamilienhäuser mit Festpreisgarantie.",
    };
  }

  if (normalizedPath === "/kernsanierung") {
    return {
      title: "Kernsanierung München ab 1.200€/m² | KSHW",
      description: "Kernsanierung München: Professionelle Kernsanierung ab 1.200€/m². Bis auf die Grundsubstanz und komplett neu aufbauen. Festpreisgarantie.",
      keywords: "Kernsanierung München, Kernsanierung Kosten München, Altbau Kernsanierung München, Haus entkernen München",
      canonical: `${BASE_URL}/kernsanierung`,
      ogTitle: "Kernsanierung München - ab 1.200€/m²",
      ogDescription: "Professionelle Kernsanierung in München. Zurück zum Kern, komplett neu aufgebaut.",
    };
  }

  if (normalizedPath === "/kontakt") {
    return {
      title: "Kontakt | KSHW München | Sanierung Beratung",
      description: "Kontaktieren Sie KSHW München für Ihre Sanierungsanfrage. Telefon: 0152 122 740 43. Kostenlose Beratung in München und Umgebung.",
      keywords: "KSHW Kontakt, Sanierung München Beratung, Sanierung Telefon München",
      canonical: `${BASE_URL}/kontakt`,
      ogTitle: "Kontakt - KSHW München",
      ogDescription: "Kontaktieren Sie uns für Ihre kostenlose Sanierungsberatung. Wir sind für Sie da!",
    };
  }

  if (normalizedPath === "/impressum") {
    return {
      title: "Impressum | KSHW München",
      description: "Impressum der KSHW München - Komplettsanierungen Haus & Wohnung. Rechtliche Informationen und Kontaktdaten.",
      keywords: "KSHW Impressum, Sanierung München Impressum",
      canonical: `${BASE_URL}/impressum`,
      ogTitle: "Impressum - KSHW München",
      ogDescription: "Rechtliche Informationen zu KSHW München.",
    };
  }

  if (normalizedPath === "/datenschutz") {
    return {
      title: "Datenschutz | KSHW München",
      description: "Datenschutzerklärung der KSHW München. Informationen zum Umgang mit Ihren Daten gemäß DSGVO.",
      keywords: "KSHW Datenschutz, Sanierung München Datenschutz",
      canonical: `${BASE_URL}/datenschutz`,
      ogTitle: "Datenschutz - KSHW München",
      ogDescription: "Unsere Datenschutzerklärung gemäß DSGVO.",
    };
  }

  if (normalizedPath === "/faq-preise") {
    return {
      title: "FAQ & Preise | Sanierung München | KSHW",
      description: "Häufig gestellte Fragen zu Sanierung in München. Preise, Dauer, Ablauf - alle Antworten von KSHW München.",
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
        title: `Sanierung ${meta.name} München | Festpreis | KSHW`,
        description: `Sanierung in ${meta.name}: ${meta.description}. Badsanierung, Komplettsanierung, Kernsanierung zum Festpreis. 5 Jahre Gewährleistung.`,
        keywords: `Sanierung ${meta.name} München, ${meta.name} Sanierung, Badsanierung ${meta.name}, Renovierung ${meta.name}`,
        canonical: `${BASE_URL}${normalizedPath}`,
        ogTitle: `Sanierung ${meta.name} - KSHW München`,
        ogDescription: `${meta.description}. Festpreisgarantie und 5 Jahre Gewährleistung.`,
      };
    }
  }

  return {
    title: "KSHW München | Komplettsanierungen Haus & Wohnung",
    description: "KSHW München - Ihr Partner für Komplettsanierungen in München. Badsanierung, Wohnungssanierung, Haussanierung mit Festpreisgarantie.",
    keywords: "KSHW München, Sanierung München, Komplettsanierung",
    canonical: `${BASE_URL}${normalizedPath}`,
    ogTitle: "KSHW München - Komplettsanierungen",
    ogDescription: "Ihr Partner für Sanierungen in München mit Festpreisgarantie.",
  };
}
