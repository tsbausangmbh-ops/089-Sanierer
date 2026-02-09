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
  allach: { name: "Allach", description: "Professionelle Sanierung in Allach" },
  untermenzing: { name: "Untermenzing", description: "Fachgerechte Sanierung in Untermenzing" },
  obermenzing: { name: "Obermenzing", description: "Hochwertige Sanierung in Obermenzing" },
  aubing: { name: "Aubing", description: "Zuverlässige Sanierung in Aubing" },
  moosach: { name: "Moosach", description: "Komplette Sanierung in Moosach" },
  feldmoching: { name: "Feldmoching-Hasenbergl", description: "Sanierung in Feldmoching-Hasenbergl" },
  laim: { name: "Laim", description: "Moderne Sanierung in Laim" },
  nymphenburg: { name: "Nymphenburg", description: "Stilvolle Sanierung in Nymphenburg" },
  "berg-am-laim": { name: "Berg am Laim", description: "Professionelle Sanierung in Berg am Laim" },
  riem: { name: "Riem", description: "Fachgerechte Sanierung in Riem" },
  milbertshofen: { name: "Milbertshofen-Am Hart", description: "Sanierung in Milbertshofen-Am Hart" },
  freimann: { name: "Freimann", description: "Komplette Sanierung in Freimann" },
  solln: { name: "Solln", description: "Hochwertige Sanierung in Solln" },
  grosshadern: { name: "Großhadern", description: "Professionelle Sanierung in Großhadern" },
  hadern: { name: "Hadern", description: "Zuverlässige Sanierung in Hadern" },
  fuerstenried: { name: "Fürstenried", description: "Moderne Sanierung in Fürstenried" },
  forstenried: { name: "Forstenried", description: "Fachgerechte Sanierung in Forstenried" },
  thalkirchen: { name: "Thalkirchen", description: "Stilvolle Sanierung in Thalkirchen" },
  obersendling: { name: "Obersendling", description: "Komplette Sanierung in Obersendling" },
  ramersdorf: { name: "Ramersdorf", description: "Professionelle Sanierung in Ramersdorf" },
  perlach: { name: "Perlach", description: "Zuverlässige Sanierung in Perlach" },
  neuperlach: { name: "Neuperlach", description: "Moderne Sanierung in Neuperlach" },
};

const umlandMeta: Record<string, string> = {
  dachau: "Dachau",
  karlsfeld: "Karlsfeld",
  germering: "Germering",
  fuerstenfeldbruck: "Fürstenfeldbruck",
  freising: "Freising",
  starnberg: "Starnberg",
  garching: "Garching",
  unterschleissheim: "Unterschleißheim",
  oberschleissheim: "Oberschleißheim",
  ottobrunn: "Ottobrunn",
  haar: "Haar",
  graefelfing: "Gräfelfing",
  planegg: "Planegg",
  pullach: "Pullach",
  gruenwald: "Grünwald",
  erding: "Erding",
  ismaning: "Ismaning",
  unterhaching: "Unterhaching",
  vaterstetten: "Vaterstetten",
};

export function getSeoMeta(path: string): SeoMeta {
  const normalizedPath = path.split("?")[0].replace(/\/$/, "") || "/";

  if (normalizedPath === "/" || normalizedPath === "") {
    return {
      title: "Sanierung München | Renovierung aus einer Hand | Komplettsanierung",
      description: "Sanierung München 2026: Ihre Renovierungsfirma München für Badsanierung ab 18.500€, Komplettsanierung ab 1.200€/m². Handwerkerservice mit alle Gewerke aus einer Hand. Festpreisgarantie, 5 Jahre Gewährleistung. Kostenlose Beratung in 24h.",
      keywords: "Sanierung München, Komplettsanierung München Kosten 2026, Badsanierung München Festpreis, Haussanierung München Meisterbetrieb, Wohnung sanieren lassen München, Sanierungsfirma München Erfahrungen, Handwerker Komplettsanierung München günstig, Renovierungsfirma München Festpreis, Handwerkerservice München Sanierung aus einer Hand, Innenausbau Firma München Komplettsanierung, Sanierung aus einer Hand München Meisterbetrieb, Generalunternehmer Renovierung München, Altbausanierung München Renovierungsfirma, schlüsselfertige Renovierung München alle Gewerke, Handwerker München Komplettsanierung Wohnung Haus",
      canonical: BASE_URL,
      ogTitle: "Sanierung München | Renovierung aus einer Hand | Komplettsanierung",
      ogDescription: "Sanierung München 2026: Ihre Renovierungsfirma München für Badsanierung ab 18.500€, Komplettsanierung ab 1.200€/m². Handwerkerservice mit alle Gewerke aus einer Hand. Festpreisgarantie, 5 Jahre Gewährleistung. Kostenlose Beratung in 24h.",
      ogImage: `${BASE_URL}/images/komplettsanierung_vorher_nachher.webp`,
      ogImageAlt: "Komplettsanierung München vorher nachher - professionelle Sanierung aus einer Hand mit Festpreisgarantie",
    };
  }

  if (normalizedPath === "/anfrage") {
    return {
      title: "Sanierungsanfrage München | Festpreis in 24h",
      description: "Jetzt kostenlose Sanierungsanfrage stellen. Badsanierung, Komplettsanierung, Wohnungssanierung München. Festpreis-Angebot innerhalb von 24 Stunden.",
      keywords: "Sanierung Anfrage München kostenlos, Sanierungsangebot München anfordern, Badsanierung Angebot einholen München, Komplettsanierung Kostenvoranschlag München, Festpreis Angebot Sanierung München",
      canonical: `${BASE_URL}/anfrage`,
      ogTitle: "Sanierungsanfrage München | Festpreis in 24h",
      ogDescription: "Jetzt kostenlose Sanierungsanfrage stellen. Badsanierung, Komplettsanierung, Wohnungssanierung München. Festpreis-Angebot innerhalb von 24 Stunden.",
      ogImage: `${BASE_URL}/images/sanierungsberatung_gespraech.webp`,
      ogImageAlt: "Kostenlose Sanierungsberatung München - persönliches Gespräch für Ihr Renovierungsprojekt",
    };
  }

  if (normalizedPath === "/danke") {
    return {
      title: "Anfrage erhalten – Beratung startet in 24h",
      description: "Vielen Dank für Ihre Sanierungsanfrage. Wir melden uns innerhalb von 24 Stunden bei Ihnen mit einem persönlichen Beratungstermin.",
      keywords: "Sanierung Anfrage bestätigt München, Sanierungsprojekt München gestartet",
      canonical: `${BASE_URL}/danke`,
      ogTitle: "Anfrage erhalten – Beratung startet in 24h",
      ogDescription: "Vielen Dank für Ihre Sanierungsanfrage. Wir melden uns innerhalb von 24 Stunden bei Ihnen mit einem persönlichen Beratungstermin.",
      ogImage: `${BASE_URL}/images/erfolgsbestaetigung_haekchen.webp`,
      ogImageAlt: "Sanierungsanfrage erfolgreich gesendet - Antwort innerhalb von 24 Stunden",
    };
  }

  if (normalizedPath === "/komplettsanierung") {
    return {
      title: "Komplettsanierung München ab 1.200€/m² Festpreis",
      description: "Komplettsanierung München: Schlüsselfertige Sanierung ab 1.200€/m². Koordination aller Gewerke, Festpreisgarantie, persönlicher Bauleiter.",
      keywords: "Komplettsanierung München Kosten pro qm, Wohnung komplett sanieren lassen München, Haus komplett sanieren München Festpreis, Altbau Komplettsanierung München Erfahrungen, Generalunternehmer Komplettsanierung München, schlüsselfertige Sanierung München",
      canonical: `${BASE_URL}/komplettsanierung`,
      ogTitle: "Komplettsanierung München ab 1.200€/m² Festpreis",
      ogDescription: "Komplettsanierung München: Schlüsselfertige Sanierung ab 1.200€/m². Koordination aller Gewerke, Festpreisgarantie, persönlicher Bauleiter.",
      ogImage: `${BASE_URL}/images/komplettsanierung_ergebnis.webp`,
      ogImageAlt: "Komplettsanierung München Ergebnis - schlüsselfertig sanierte Wohnung mit allen Gewerken aus einer Hand",
    };
  }

  if (normalizedPath === "/badsanierung") {
    return {
      title: "Badsanierung München ab 18.500€ | Festpreis",
      description: "Badsanierung München: Komplettbad ab 18.500€ inkl. Fliesen, Sanitär & Elektro. Bodengleiche Dusche, barrierefrei möglich. In 2-3 Wochen fertig.",
      keywords: "Badsanierung München Kosten 2026, Bad komplett sanieren München Festpreis, barrierefreie Badsanierung München, Badezimmer modernisieren München Meisterbetrieb, bodengleiche Dusche einbauen München, Bad renovieren München Dauer und Kosten, Badsanierung aus einer Hand München, Badezimmer Renovierungsfirma München, Handwerker Bad München Festpreis, Bad Innenausbau München Meisterbetrieb, Badsanierung Handwerkerservice München komplett, barrierefreies Bad umbauen München Renovierungsfirma, Badezimmer sanieren lassen München Handwerker, Bad komplett erneuern München Sanierungsfirma",
      canonical: `${BASE_URL}/badsanierung`,
      ogTitle: "Badsanierung München ab 18.500€ | Festpreis",
      ogDescription: "Badsanierung München: Komplettbad ab 18.500€ inkl. Fliesen, Sanitär & Elektro. Bodengleiche Dusche, barrierefrei möglich. In 2-3 Wochen fertig.",
      ogImage: `${BASE_URL}/images/badsanierung_muenchen_2026.webp`,
      ogImageAlt: "Moderne Badsanierung München - fertig saniertes Badezimmer mit bodengleicher Dusche und hochwertigen Fliesen",
    };
  }

  if (normalizedPath === "/kuechensanierung") {
    return {
      title: "Küchensanierung München ab 6.500€ | Festpreis",
      description: "Küchensanierung München: Elektro, Wasser, Fliesen & Malerarbeiten ab 6.500€. Festpreisgarantie für alle Küchenumbau-Arbeiten. Jetzt anfragen.",
      keywords: "Küchensanierung München Kosten, Küche komplett sanieren München, Küchenumbau München Festpreis, Küche modernisieren München Handwerker, Elektro und Wasser Küche München, Küchenrenovierung München Meisterbetrieb, Küche sanieren aus einer Hand München, Küchenrenovierung Handwerkerservice München, Küche Innenausbau München Festpreis, Küche komplett erneuern München Renovierungsfirma, Küchenumbau München Handwerker alle Gewerke, Küchensanierung Sanierungsfirma München, Küche modernisieren Renovierung München, neue Küche München Generalunternehmer",
      canonical: `${BASE_URL}/kuechensanierung`,
      ogTitle: "Küchensanierung München ab 6.500€ | Festpreis",
      ogDescription: "Küchensanierung München: Elektro, Wasser, Fliesen & Malerarbeiten ab 6.500€. Festpreisgarantie für alle Küchenumbau-Arbeiten. Jetzt anfragen.",
      ogImage: `${BASE_URL}/images/moderne_kuechensanierung_ergebnis.webp`,
      ogImageAlt: "Küchensanierung München Ergebnis - modern sanierte Küche mit neuen Elektro- und Wasseranschlüssen",
    };
  }

  if (normalizedPath === "/bodensanierung") {
    return {
      title: "Bodensanierung München ab 65€/m² | Parkett & Fliesen",
      description: "Bodensanierung München: Parkett, Fliesen, Vinyl ab 65€/m². Estrich, Fußbodenheizung nachrüsten. Fachgerechte Verlegung mit Festpreisgarantie.",
      keywords: "Bodensanierung München Kosten, Parkett verlegen München Meisterbetrieb, Fliesen sanieren München Festpreis, Estrich erneuern München, Fußbodenheizung nachrüsten München, Vinyl Boden verlegen München Kosten, Boden sanieren aus einer Hand München, Bodenbelag Handwerkerservice München, Parkett verlegen München Renovierungsfirma, Fliesen Boden Innenausbau München, Bodensanierung Handwerker München Festpreis, Estrich sanieren München Sanierungsfirma, Vinyl Parkett Fliesen München Renovierung, Bodenbeläge München Generalunternehmer",
      canonical: `${BASE_URL}/bodensanierung`,
      ogTitle: "Bodensanierung München ab 65€/m² | Parkett & Fliesen",
      ogDescription: "Bodensanierung München: Parkett, Fliesen, Vinyl ab 65€/m². Estrich, Fußbodenheizung nachrüsten. Fachgerechte Verlegung mit Festpreisgarantie.",
      ogImage: `${BASE_URL}/images/parkettboden_sanierung_ergebnis.webp`,
      ogImageAlt: "Bodensanierung München - frisch verlegter Parkettboden nach professioneller Sanierung mit Fußbodenheizung",
    };
  }

  if (normalizedPath === "/elektrosanierung") {
    return {
      title: "Elektrosanierung München ab 150€/m² | VDE-konform",
      description: "Elektrosanierung München: Leitungen, Sicherungskasten, Smart Home ab 150€/m². VDE-konforme Installation vom Meisterbetrieb mit Festpreis.",
      keywords: "Elektrosanierung München Kosten pro qm, Elektroinstallation komplett erneuern München, Altbau Elektrik sanieren München VDE, Sicherungskasten tauschen München, Smart Home Vorbereitung Sanierung München, Elektriker Komplettsanierung München, Elektrik sanieren aus einer Hand München, Elektriker München Renovierungsfirma, Elektroinstallation Handwerkerservice München, Elektrosanierung Innenausbau München, Steckdosen nachrüsten München Handwerker, Sicherungskasten erneuern München Sanierungsfirma, Smart Home Elektrik München Renovierung, VDE Elektrosanierung München Generalunternehmer",
      canonical: `${BASE_URL}/elektrosanierung`,
      ogTitle: "Elektrosanierung München ab 150€/m² | VDE-konform",
      ogDescription: "Elektrosanierung München: Leitungen, Sicherungskasten, Smart Home ab 150€/m². VDE-konforme Installation vom Meisterbetrieb mit Festpreis.",
      ogImage: `${BASE_URL}/images/elektrosanierung_installation.webp`,
      ogImageAlt: "Elektrosanierung München - fachgerechte Elektroinstallation nach VDE-Norm durch zertifizierten Meisterbetrieb",
    };
  }

  if (normalizedPath === "/dachsanierung") {
    return {
      title: "Dachsanierung München ab 150€/m² | KfW-Förderung",
      description: "Dachsanierung München: Dachdämmung, Eindeckung, Dachfenster ab 150€/m². KfW- und BAFA-Förderung möglich. Fachgerechte Ausführung.",
      keywords: "Dachsanierung München Kosten 2026, Dach komplett sanieren München, Dachdämmung München KfW Förderung, Dacheindeckung erneuern München, Dachfenster einbauen München, energetische Dachsanierung München Fachbetrieb",
      canonical: `${BASE_URL}/dachsanierung`,
      ogTitle: "Dachsanierung München ab 150€/m² | KfW-Förderung",
      ogDescription: "Dachsanierung München: Dachdämmung, Eindeckung, Dachfenster ab 150€/m². KfW- und BAFA-Förderung möglich. Fachgerechte Ausführung.",
      ogImage: `${BASE_URL}/images/fertig_saniertes_hausdach.webp`,
      ogImageAlt: "Dachsanierung München - fertig saniertes Hausdach mit neuer Dämmung und Dacheindeckung",
    };
  }

  if (normalizedPath === "/heizungssanierung") {
    return {
      title: "Heizungssanierung München ab 12.000€ | Festpreis",
      description: "Heizungssanierung München: Wärmepumpe, Gas-Brennwert, Pelletheizung ab 12.000€. BAFA- und KfW-Förderung. Energieeffiziente Heizungslösungen.",
      keywords: "Heizungssanierung München Kosten 2026, Wärmepumpe einbauen München Förderung, Heizung erneuern Altbau München, Fußbodenheizung nachrüsten München, Gas Heizung tauschen München, Heizungsmodernisierung München KfW BAFA, Heizung sanieren aus einer Hand München, Heizungstausch Handwerkerservice München, Wärmepumpe München Renovierungsfirma, Heizung Innenausbau München Festpreis, Heizungsmodernisierung Handwerker München, Gasheizung erneuern München Sanierungsfirma, Fußbodenheizung nachrüsten München Renovierung, Heizung komplett erneuern München Generalunternehmer",
      canonical: `${BASE_URL}/heizungssanierung`,
      ogTitle: "Heizungssanierung München ab 12.000€ | Festpreis",
      ogDescription: "Heizungssanierung München: Wärmepumpe, Gas-Brennwert, Pelletheizung ab 12.000€. BAFA- und KfW-Förderung. Energieeffiziente Heizungslösungen.",
      ogImage: `${BASE_URL}/images/moderne_heizungsanlage_einbau.webp`,
      ogImageAlt: "Heizungssanierung München - Einbau einer modernen Heizungsanlage mit Wärmepumpe und Förderberatung",
    };
  }

  if (normalizedPath === "/wohnungssanierung") {
    return {
      title: "Wohnungssanierung München | Renovierung aus einer Hand ab 800€/m²",
      description: "Wohnungssanierung München: Komplette Wohnungsrenovierung ab 800€/m² mit Festpreisgarantie. Altbau & Neubau, alle Gewerke aus einer Hand. Jetzt beraten lassen.",
      keywords: "Wohnungssanierung München Kosten pro qm 2026, Altbauwohnung komplett sanieren München, Wohnung renovieren lassen München Festpreis, Mietwohnung sanieren München, Eigentumswohnung sanieren München Meisterbetrieb, Wohnungssanierung München Dauer, Wohnungsrenovierung München Festpreis Handwerker, Wohnung renovieren aus einer Hand München, Altbauwohnung Renovierungsfirma München, Wohnungssanierung Handwerkerservice München komplett, Wohnung Innenausbau München Sanierungsfirma, Eigentumswohnung renovieren München Generalunternehmer, Mietwohnung sanieren München Renovierung, Wohnungsrenovierung München alle Gewerke",
      canonical: `${BASE_URL}/wohnungssanierung`,
      ogTitle: "Wohnungssanierung München ab 800€/m² | Festpreis",
      ogDescription: "Wohnungssanierung München: Komplette Sanierung ab 800€/m² mit Festpreisgarantie. Altbau & Neubau, alle Gewerke aus einer Hand. Jetzt beraten lassen.",
      ogImage: `${BASE_URL}/images/sanierte_luxuswohnung_interieur.webp`,
      ogImageAlt: "Wohnungssanierung München Ergebnis - komplett sanierte Wohnung mit modernem Interieur und hochwertiger Ausstattung",
    };
  }

  if (normalizedPath === "/haussanierung") {
    return {
      title: "Haussanierung München | Renovierung aus einer Hand ab 1.200€/m²",
      description: "Haussanierung München: Komplette Haussanierung ab 1.200€/m² mit Festpreisgarantie. Einfamilienhaus & Mehrfamilienhaus, Renovierung aus einer Hand mit allen Gewerken koordiniert.",
      keywords: "Haussanierung München Kosten 2026, Einfamilienhaus komplett sanieren München, Altbau Haus sanieren München Festpreis, Haus renovieren München Meisterbetrieb, Mehrfamilienhaus sanieren München, Haussanierung München Dauer und Ablauf, Haus renovieren aus einer Hand München, Haussanierung Renovierungsfirma München, Einfamilienhaus Handwerkerservice München, Haus Innenausbau München Sanierungsfirma, Altbau Haus renovieren München Handwerker, Haussanierung München Generalunternehmer, Haus komplett sanieren München Renovierung, Mehrfamilienhaus renovieren München Festpreis",
      canonical: `${BASE_URL}/haussanierung`,
      ogTitle: "Haussanierung München ab 1.200€/m² | Festpreis",
      ogDescription: "Haussanierung München: Komplette Haussanierung ab 1.200€/m² mit Festpreisgarantie. Einfamilienhaus & Mehrfamilienhaus, alle Gewerke koordiniert.",
      ogImage: `${BASE_URL}/images/haus_vorher_nachher_zickzack.webp`,
      ogImageAlt: "Haussanierung München vorher nachher - Einfamilienhaus komplett saniert mit Festpreisgarantie",
    };
  }

  if (normalizedPath === "/kernsanierung") {
    return {
      title: "Kernsanierung München ab 1.200€/m² | Altbau",
      description: "Kernsanierung München: Professionelles Entkernen und Neuaufbau ab 1.200€/m². Festpreisgarantie, persönlicher Bauleiter, 5 Jahre Gewährleistung.",
      keywords: "Kernsanierung München Kosten pro qm 2026, Altbau Kernsanierung München Erfahrungen, Haus entkernen und sanieren München, Kernsanierung vs Komplettsanierung München, Kernsanierung Einfamilienhaus München Dauer, Rohbau Sanierung München Festpreis, Kernsanierung aus einer Hand München, Altbau entkernen Renovierungsfirma München, Kernsanierung Handwerkerservice München, Entkernung Innenausbau München Festpreis, Rohbau sanieren München Sanierungsfirma, Kernsanierung Handwerker München Generalunternehmer, Altbau komplett entkernen München Renovierung, Kernsanierung schlüsselfertig München alle Gewerke",
      canonical: `${BASE_URL}/kernsanierung`,
      ogTitle: "Kernsanierung München ab 1.200€/m² | Altbau",
      ogDescription: "Kernsanierung München: Professionelles Entkernen und Neuaufbau ab 1.200€/m². Festpreisgarantie, persönlicher Bauleiter, 5 Jahre Gewährleistung.",
      ogImage: `${BASE_URL}/images/komplettsanierung_haus.webp`,
      ogImageAlt: "Kernsanierung München - Haus bis auf die Grundsubstanz entkernt und professionell neu aufgebaut",
    };
  }

  if (normalizedPath === "/energetische-sanierung") {
    return {
      title: "Energetische Sanierung München ab 200€/m² | KfW",
      description: "Energetische Sanierung München: Wärmedämmung, Fensteraustausch, Heizungsmodernisierung ab 200€/m². KfW-förderfähig. Jetzt Energiekosten senken.",
      keywords: "Energetische Sanierung München Kosten 2026, KfW Förderung energetische Sanierung München, Wärmedämmung Haus München Kosten, Fensteraustausch München Förderung, BAFA Zuschuss Sanierung München, Energieausweis Sanierung München Pflicht",
      canonical: `${BASE_URL}/energetische-sanierung`,
      ogTitle: "Energetische Sanierung München ab 200€/m² | KfW",
      ogDescription: "Energetische Sanierung München: Wärmedämmung, Fensteraustausch, Heizungsmodernisierung ab 200€/m². KfW-förderfähig. Jetzt Energiekosten senken.",
      ogImage: `${BASE_URL}/images/energieeffizientes_saniertes_haus.webp`,
      ogImageAlt: "Energetische Sanierung München - energieeffizient saniertes Haus mit Wärmedämmung und modernen Fenstern",
    };
  }

  if (normalizedPath === "/rechner") {
    return {
      title: "Sanierungskosten Rechner München | Online 2026",
      description: "Online-Rechner für Sanierungskosten München: Badsanierung, Komplettsanierung, Wohnungssanierung. Schnelle Kostenschätzung als erste Orientierung.",
      keywords: "Sanierungsrechner München online, Sanierung Kosten berechnen München, Badsanierung Rechner Kosten, Renovierungskosten pro qm München berechnen, Komplettsanierung Kalkulator München, was kostet meine Sanierung München, Renovierungskosten München berechnen Handwerkerservice, Sanierung aus einer Hand Kosten Rechner München, Innenausbau Kosten München online berechnen, Renovierungsfirma München Preise kalkulieren, Sanierungskosten München Handwerker Kalkulator, was kostet Renovierung aus einer Hand München, Sanierung München online Preisrechner Festpreis, Renovierungskosten pro qm München berechnen",
      canonical: `${BASE_URL}/rechner`,
      ogTitle: "Sanierungskosten Rechner München | Online 2026",
      ogDescription: "Online-Rechner für Sanierungskosten München: Badsanierung, Komplettsanierung, Wohnungssanierung. Schnelle Kostenschätzung als erste Orientierung.",
      ogImage: `${BASE_URL}/images/kostenrechner_planung_2026.webp`,
      ogImageAlt: "Sanierungskosten Rechner München - Online-Kalkulator für Badsanierung und Komplettsanierung Kosten",
    };
  }

  if (normalizedPath === "/kontakt") {
    return {
      title: "Kontakt Sanierung München | Kostenlose Beratung",
      description: "Kostenlose Sanierungsberatung München. Telefon: +49 89 444 438 872. Persönliche Beratung, Vor-Ort-Besichtigung und Festpreis-Angebot in 24 Stunden.",
      keywords: "Sanierung Kontakt München, Sanierung München kostenlose Beratung, Sanierungsfirma München Telefon, Handwerker München Terminvereinbarung, Sanierungsberatung München vor Ort, Renovierungsfirma München Kontakt, Handwerkerservice München Telefon, Innenausbau Firma München Anfrage, Sanierung aus einer Hand München Beratung, Handwerker München Sanierung Terminvereinbarung, Renovierung München kostenlose Beratung, Sanierungsfirma München Angebot anfordern, Generalunternehmer München Kontakt Sanierung",
      canonical: `${BASE_URL}/kontakt`,
      ogTitle: "Kontakt Sanierung München | Kostenlose Beratung",
      ogDescription: "Kostenlose Sanierungsberatung München. Telefon: +49 89 444 438 872. Persönliche Beratung, Vor-Ort-Besichtigung und Festpreis-Angebot in 24 Stunden.",
      ogImage: `${BASE_URL}/images/kundenservice_kontakt.webp`,
      ogImageAlt: "Kontakt Sanierungsberatung München - persönliche Beratung und kostenloser Vor-Ort-Termin",
    };
  }

  if (normalizedPath === "/impressum") {
    return {
      title: "Impressum | Sanierungsfirma München",
      description: "Impressum der Sanierungsfirma in München. Verantwortlich für Komplettsanierungen, Badsanierung und Haussanierung. Rechtliche Angaben gemäß §5 TMG.",
      keywords: "Sanierungsfirma Impressum München, Sanierung München Impressum, KSHW München Kontaktdaten",
      canonical: `${BASE_URL}/impressum`,
      ogTitle: "Impressum | Sanierungsfirma München",
      ogDescription: "Impressum der Sanierungsfirma in München. Verantwortlich für Komplettsanierungen, Badsanierung und Haussanierung. Rechtliche Angaben gemäß §5 TMG.",
      ogImage: `${BASE_URL}/images/rechtliche_dokumente_impressum.webp`,
      ogImageAlt: "Impressum Sanierungsfirma München - rechtliche Informationen und Kontaktdaten",
    };
  }

  if (normalizedPath === "/datenschutz") {
    return {
      title: "Datenschutzerklärung | Sanierungsfirma München DSGVO-konform",
      description: "Datenschutzerklärung gemäß DSGVO. Informationen zum Umgang mit Ihren Daten bei Sanierungsanfragen, Kontaktformularen und Website-Nutzung.",
      keywords: "Datenschutz Sanierungsfirma München, Sanierung München Datenschutz DSGVO, Datenschutzerklärung Handwerker München",
      canonical: `${BASE_URL}/datenschutz`,
      ogTitle: "Datenschutzerklärung | Sanierungsfirma München DSGVO-konform",
      ogDescription: "Datenschutzerklärung gemäß DSGVO. Informationen zum Umgang mit Ihren Daten bei Sanierungsanfragen, Kontaktformularen und Website-Nutzung.",
      ogImage: `${BASE_URL}/images/datenschutz_sicherheit.webp`,
      ogImageAlt: "Datenschutz Sanierungsfirma München - DSGVO-konforme Verarbeitung Ihrer Sanierungsanfragen",
    };
  }

  if (normalizedPath === "/ratgeber") {
    return {
      title: "Sanierung Ratgeber München 2026 | Kosten & Tipps",
      description: "Praxisnahe Ratgeber zu Sanierung in München: Badsanierung, Komplettsanierung, energetische Modernisierung. Fachwissen und Entscheidungshilfen.",
      keywords: "Sanierung Ratgeber München 2026, Badsanierung Tipps und Tricks, Renovierung planen München Checkliste, Modernisierung Altbau Ratgeber, Sanierung richtig planen München, Renovierungskosten sparen Tipps München, Sanierung Ratgeber Renovierungsfirma München, Renovierung planen München Handwerkerservice, Innenausbau Tipps München Sanierungsfirma, Sanierung aus einer Hand München Ratgeber, Renovierung Checkliste München Handwerker, Altbau sanieren Tipps München Renovierungsfirma, Sanierungsplanung München Generalunternehmer, Renovierung vorbereiten München alle Gewerke",
      canonical: `${BASE_URL}/ratgeber`,
      ogTitle: "Sanierung Ratgeber München 2026 | Kosten & Tipps",
      ogDescription: "Praxisnahe Ratgeber zu Sanierung in München: Badsanierung, Komplettsanierung, energetische Modernisierung. Fachwissen und Entscheidungshilfen.",
      ogImage: `${BASE_URL}/images/sanierungsberater_experte.webp`,
      ogImageAlt: "Sanierung Ratgeber München - Experten-Tipps für Badsanierung, Komplettsanierung und energetische Modernisierung",
    };
  }

  if (normalizedPath === "/faq-sanierung") {
    return {
      title: "FAQ Sanierung München | Kosten, Dauer & Ablauf",
      description: "Häufige Fragen zur Sanierung: Was kostet Badsanierung? Wie lange dauert Komplettsanierung? Alle Antworten vom erfahrenen Sanierungsbetrieb.",
      keywords: "FAQ Sanierung München, Badsanierung häufige Fragen, Wohnungssanierung München Fragen und Antworten, was kostet Sanierung München FAQ, Sanierung Ablauf Fragen, Komplettsanierung FAQ München",
      canonical: `${BASE_URL}/faq-sanierung`,
      ogTitle: "FAQ Sanierung München | Kosten, Dauer & Ablauf",
      ogDescription: "Häufige Fragen zur Sanierung: Was kostet Badsanierung? Wie lange dauert Komplettsanierung? Alle Antworten vom erfahrenen Sanierungsbetrieb.",
      ogImage: `${BASE_URL}/images/qualitaetskontrolle_sanierung.webp`,
      ogImageAlt: "FAQ Sanierung München - Antworten auf häufige Fragen zu Kosten, Dauer und Ablauf der Sanierung",
    };
  }

  if (normalizedPath === "/faq-preise") {
    return {
      title: "FAQ & Preise Sanierung München 2026 | Kosten",
      description: "Häufige Fragen zur Sanierung München: Was kostet Badsanierung? Wie lange dauert Komplettsanierung? Alle Preise und Antworten auf einen Blick.",
      keywords: "Sanierung FAQ München Preise 2026, Badsanierung Kosten FAQ München, Komplettsanierung Preise Fragen, Sanierung München was kostet, Festpreis Sanierung FAQ, Sanierungskosten München Übersicht",
      canonical: `${BASE_URL}/faq-preise`,
      ogTitle: "FAQ & Preise Sanierung München 2026 | Kosten",
      ogDescription: "Häufige Fragen zur Sanierung München: Was kostet Badsanierung? Wie lange dauert Komplettsanierung? Alle Preise und Antworten auf einen Blick.",
      ogImage: `${BASE_URL}/images/sanierung_preiskalkulation.webp`,
      ogImageAlt: "FAQ und Preise Sanierung München - transparente Kostenübersicht für alle Sanierungsleistungen 2026",
    };
  }

  if (normalizedPath === "/barrierefreiheit") {
    return {
      title: "Barrierefreiheit | Zugänglichkeit der Website",
      description: "Erklärung zur Barrierefreiheit gemäß WCAG 2.1 und BITV 2.0. Informationen zur Zugänglichkeit unserer Sanierungs-Website in München.",
      keywords: "Barrierefreiheit, Accessibility, WCAG, BITV, Zugänglichkeit, Sanierung München",
      canonical: `${BASE_URL}/barrierefreiheit`,
      ogTitle: "Barrierefreiheit | Zugänglichkeit der Website",
      ogDescription: "Erklärung zur Barrierefreiheit gemäß WCAG 2.1 und BITV 2.0. Informationen zur Zugänglichkeit unserer Sanierungs-Website in München.",
    };
  }

  if (normalizedPath === "/gewerke") {
    return {
      title: "Gewerke Sanierung München | Alle Leistungen",
      description: "Alle Gewerke für Ihre Sanierung in München: Elektro, Sanitär, Fliesen, Maler, Trockenbau und mehr. Koordiniert mit Festpreisgarantie.",
      keywords: "Gewerke Sanierung München, Handwerksleistungen München, Elektro Sanitär Fliesen München, Trockenbau München, Sanierung alle Gewerke München, Handwerker Koordination München",
      canonical: `${BASE_URL}/gewerke`,
      ogTitle: "Gewerke Sanierung München | Alle Leistungen",
      ogDescription: "Alle Gewerke für Ihre Sanierung in München: Elektro, Sanitär, Fliesen, Maler, Trockenbau und mehr. Koordiniert mit Festpreisgarantie.",
      ogImage: `${BASE_URL}/images/fachhandwerker_meisterbetriebe.webp`,
      ogImageAlt: "Gewerke Sanierung München - alle Handwerksleistungen koordiniert aus einer Hand",
    };
  }

  if (normalizedPath === "/termin") {
    return {
      title: "Beratungstermin München | Kostenlose Besichtigung",
      description: "Vereinbaren Sie Ihren kostenlosen Beratungstermin für Sanierung in München. Persönliche Besichtigung, Festpreis-Angebot innerhalb von 48 Stunden.",
      keywords: "Beratungstermin Sanierung München, Vor-Ort-Besichtigung München kostenlos, Sanierungsberatung Termin München, kostenlose Beratung Sanierung München",
      canonical: `${BASE_URL}/termin`,
      ogTitle: "Beratungstermin München | Kostenlose Besichtigung",
      ogDescription: "Vereinbaren Sie Ihren kostenlosen Beratungstermin für Sanierung in München. Persönliche Besichtigung, Festpreis-Angebot innerhalb von 48 Stunden.",
      ogImage: `${BASE_URL}/images/terminbuchung_kalender.webp`,
      ogImageAlt: "Beratungstermin Sanierung München - kostenlose Vor-Ort-Besichtigung buchen",
    };
  }

  if (normalizedPath === "/agb") {
    return {
      title: "AGB | Geschäftsbedingungen Sanierung München",
      description: "Allgemeine Geschäftsbedingungen für Sanierungsleistungen in München. Festpreisgarantie, 5 Jahre Gewährleistung, transparente Vertragsbedingungen.",
      keywords: "AGB Sanierung München, Geschäftsbedingungen Sanierungsfirma München, Vertragsbedingungen Sanierung, Festpreisgarantie AGB München",
      canonical: `${BASE_URL}/agb`,
      ogTitle: "AGB | Geschäftsbedingungen Sanierung München",
      ogDescription: "Allgemeine Geschäftsbedingungen für Sanierungsleistungen in München. Festpreisgarantie, 5 Jahre Gewährleistung, transparente Vertragsbedingungen.",
      ogImage: `${BASE_URL}/images/geschaeftsvertrag_agb.webp`,
      ogImageAlt: "AGB Sanierung München - Allgemeine Geschäftsbedingungen für Sanierungsleistungen",
    };
  }

  if (normalizedPath === "/cookies") {
    return {
      title: "Cookie-Richtlinie | Datenschutz & Cookies",
      description: "Cookie-Richtlinie unserer Sanierungs-Website. Technisch notwendige Cookies und optionale Analyse-Cookies gemäß DSGVO. Ihre Privatsphäre zählt.",
      keywords: "Cookie-Richtlinie Sanierung München, Cookies DSGVO Sanierungswebsite, Datenschutz Cookies München",
      canonical: `${BASE_URL}/cookies`,
      ogTitle: "Cookie-Richtlinie | Datenschutz & Cookies",
      ogDescription: "Cookie-Richtlinie unserer Sanierungs-Website. Technisch notwendige Cookies und optionale Analyse-Cookies gemäß DSGVO. Ihre Privatsphäre zählt.",
      ogImage: `${BASE_URL}/images/webseite_cookie_einstellungen.webp`,
      ogImageAlt: "Cookie-Richtlinie Sanierung München - Datenschutz und Cookie-Einstellungen",
    };
  }

  if (normalizedPath.startsWith("/muenchen-")) {
    const district = normalizedPath.replace("/muenchen-", "");
    const meta = districtMeta[district];
    if (meta) {
      return {
        title: `Sanierung ${meta.name} | Komplettsanierung München`,
        description: `Sanierung in ${meta.name}: Badsanierung, Komplettsanierung, Kernsanierung zum Festpreis. 5 Jahre Gewährleistung. Jetzt beraten lassen.`,
        keywords: `Sanierung ${meta.name} München Festpreis, Badsanierung ${meta.name} Kosten, Komplettsanierung ${meta.name} München, Wohnung sanieren ${meta.name}, Handwerker ${meta.name} München Sanierung, Renovierung ${meta.name} Meisterbetrieb, Renovierungsfirma ${meta.name} München, Handwerkerservice ${meta.name}, Sanierung aus einer Hand ${meta.name} München, Innenausbau ${meta.name} München, Renovierung ${meta.name} Handwerker München, Wohnungsrenovierung ${meta.name} München Festpreis`,
        canonical: `${BASE_URL}${normalizedPath}`,
        ogTitle: `Sanierung ${meta.name} | Komplettsanierung München`,
        ogDescription: `Sanierung in ${meta.name}: Badsanierung, Komplettsanierung, Kernsanierung zum Festpreis. 5 Jahre Gewährleistung. Jetzt beraten lassen.`,
        ogImage: `${BASE_URL}/images/fachhandwerker_meisterbetriebe.webp`,
        ogImageAlt: `Sanierung ${meta.name} München - Meisterbetrieb für Badsanierung und Komplettsanierung mit Festpreisgarantie`,
      };
    }
  }

  const umlandSlug = normalizedPath.replace("/", "");
  const umlandCity = umlandMeta[umlandSlug];
  if (umlandCity) {
    return {
      title: `Sanierung ${umlandCity} | Komplettsanierung Festpreis`,
      description: `Professionelle Sanierung in ${umlandCity}: Badsanierung, Komplettsanierung, Wohnungssanierung mit Festpreisgarantie. Kostenlose Beratung.`,
      keywords: `Sanierung ${umlandCity} Festpreis, Badsanierung ${umlandCity} Kosten, Komplettsanierung ${umlandCity}, Wohnungssanierung ${umlandCity}, Handwerker ${umlandCity} Sanierung`,
      canonical: `${BASE_URL}${normalizedPath}`,
      ogTitle: `Sanierung ${umlandCity} | Komplettsanierung Festpreis`,
      ogDescription: `Professionelle Sanierung in ${umlandCity}: Badsanierung, Komplettsanierung, Wohnungssanierung mit Festpreisgarantie. Kostenlose Beratung.`,
      ogImage: `${BASE_URL}/images/fachhandwerker_meisterbetriebe.webp`,
      ogImageAlt: `Sanierung ${umlandCity} - professionelle Komplettsanierung und Badsanierung mit Festpreisgarantie`,
    };
  }

  return {
    title: "Sanierungsfirma München | Komplettsanierungen Haus & Wohnung",
    description: "Ihr Partner für Komplettsanierungen in München. Badsanierung, Wohnungssanierung, Haussanierung mit Festpreisgarantie.",
    keywords: "Sanierung München Festpreis, Komplettsanierung München Meisterbetrieb, Sanierungsfirma München",
    canonical: `${BASE_URL}${normalizedPath}`,
    ogTitle: "Sanierungsfirma München | Komplettsanierungen Haus & Wohnung",
    ogDescription: "Ihr Partner für Komplettsanierungen in München. Badsanierung, Wohnungssanierung, Haussanierung mit Festpreisgarantie.",
    ogImage: `${BASE_URL}/images/komplettsanierung_vorher_nachher.webp`,
    ogImageAlt: "Sanierungsfirma München - professionelle Komplettsanierung mit Festpreisgarantie und 5 Jahre Gewährleistung",
  };
}
