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

const servicePages: Record<string, { title: string; description: string; price: string }> = {
  komplettsanierung: {
    title: "Komplettsanierung München",
    description: "Schlüsselfertige Komplettsanierung von Haus und Wohnung in München. Alle Gewerke aus einer Hand mit Festpreisgarantie.",
    price: "1.000 - 2.300 €/m²",
  },
  badsanierung: {
    title: "Badsanierung München",
    description: "Professionelle Badsanierung in München. Komplettbad inkl. Fliesen, Sanitär, Elektro. Barrierefreie Lösungen möglich.",
    price: "8.000 - 50.000 €",
  },
  kuechensanierung: {
    title: "Küchensanierung München",
    description: "Küchensanierung in München: Fliesen, Elektro, Wasseranschlüsse. Bauarbeiten ohne Küchenmöbel.",
    price: "6.500 - 22.000 €",
  },
  bodensanierung: {
    title: "Bodensanierung München",
    description: "Bodensanierung in München: Parkett, Fliesen, Vinyl, Teppich. Estricharbeiten und Fußbodenheizung.",
    price: "65 - 200 €/m²",
  },
  elektrosanierung: {
    title: "Elektrosanierung München",
    description: "Elektroinstallation und Elektrosanierung in München. Sicherungskasten, Leitungen nach VDE-Norm.",
    price: "85 - 300 €/m²",
  },
  heizungssanierung: {
    title: "Heizungssanierung München",
    description: "Heizungssanierung in München: Gasheizung, Wärmepumpe, Fußbodenheizung. KfW-Förderung möglich.",
    price: "12.000 - 65.000 €",
  },
  dachsanierung: {
    title: "Dachsanierung München",
    description: "Dachsanierung in München: Dachdämmung, Dacheindeckung, Dachfenster. BAFA- und KfW-Förderung.",
    price: "150 - 350 €/m²",
  },
  "energetische-sanierung": {
    title: "Energetische Sanierung München",
    description: "Energetische Sanierung in München: Wärmedämmung, Fensteraustausch, Heizungsmodernisierung. Förderberatung inklusive.",
    price: "200 - 500 €/m²",
  },
};

function generateStaticHTML(path: string, query: Record<string, string>): string {
  const baseURL = "https://089-sanierer.de";
  const service = query.service || "";
  const serviceInfo = servicePages[service];

  let title = "Sanierung München | Was kostet Badsanierung, Haussanierung, Komplettsanierung? | KSHW";
  let description = "Was kostet eine Sanierung in München? KSHW München: Badsanierung ab 9.200€, Komplettsanierung ab 920€/m². 268+ zufriedene Kunden, Festpreisgarantie, 5 Jahre Gewährleistung.";
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
