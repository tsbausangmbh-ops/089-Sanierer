import { useEffect } from "react";

interface SeoHeadProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalPath?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  noIndex?: boolean;
  schema?: object;
}

export function SeoHead({
  title,
  description,
  keywords,
  canonicalPath,
  ogImage = "https://089-sanierer.de/og-image.jpg",
  ogType = "website",
  noIndex = false,
  schema
}: SeoHeadProps) {
  useEffect(() => {
    document.title = title;
    
    const updateMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? "property" : "name";
      let element = document.querySelector(`meta[${attr}="${name}"]`);
      if (element) {
        element.setAttribute("content", content);
      } else {
        element = document.createElement("meta");
        element.setAttribute(attr, name);
        element.setAttribute("content", content);
        document.head.appendChild(element);
      }
    };

    updateMeta("description", description);
    if (keywords) {
      updateMeta("keywords", keywords);
    }
    
    if (noIndex) {
      updateMeta("robots", "noindex, nofollow");
    } else {
      updateMeta("robots", "index, follow, max-snippet:-1, max-image-preview:large");
    }

    updateMeta("og:title", title, true);
    updateMeta("og:description", description, true);
    updateMeta("og:type", ogType, true);
    updateMeta("og:image", ogImage, true);
    
    if (canonicalPath) {
      const canonicalUrl = `https://089-sanierer.de${canonicalPath}`;
      updateMeta("og:url", canonicalUrl, true);
      
      let canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) {
        canonical.setAttribute("href", canonicalUrl);
      } else {
        canonical = document.createElement("link");
        canonical.setAttribute("rel", "canonical");
        canonical.setAttribute("href", canonicalUrl);
        document.head.appendChild(canonical);
      }
    }

    updateMeta("twitter:title", title);
    updateMeta("twitter:description", description);
    updateMeta("twitter:image", ogImage);

    if (schema) {
      // Check if SSR already injected a LocalBusiness schema (to avoid duplicates for crawlers)
      const existingSchemas = document.querySelectorAll('script[type="application/ld+json"]');
      let hasExistingLocalBusiness = false;
      existingSchemas.forEach(script => {
        try {
          const content = JSON.parse(script.textContent || '{}');
          // Check if it's a LocalBusiness or has LocalBusiness in @graph
          if (content["@type"]?.includes?.("HomeAndConstructionBusiness") || 
              content["@type"] === "HomeAndConstructionBusiness" ||
              content["@graph"]?.some?.((item: Record<string, unknown>) => 
                item["@type"] === "HomeAndConstructionBusiness")) {
            hasExistingLocalBusiness = true;
          }
        } catch (e) {
          // Ignore parse errors
        }
      });
      
      // Process schema - filter out LocalBusiness if SSR already injected it
      let schemaToInject = schema as Record<string, unknown>;
      
      if (hasExistingLocalBusiness && schemaToInject["@graph"]) {
        // Filter out LocalBusiness from @graph, keep other schemas (Service, FAQ, Breadcrumb, WebSite)
        const filteredGraph = (schemaToInject["@graph"] as Record<string, unknown>[]).filter(
          (item: Record<string, unknown>) => item["@type"] !== "HomeAndConstructionBusiness"
        );
        
        // Only inject if there are non-LocalBusiness schemas remaining
        if (filteredGraph.length > 0) {
          schemaToInject = {
            "@context": "https://schema.org",
            "@graph": filteredGraph
          };
        } else {
          // All schemas were LocalBusiness, skip injection
          schemaToInject = null as unknown as Record<string, unknown>;
        }
      } else if (hasExistingLocalBusiness && schemaToInject["@type"] === "HomeAndConstructionBusiness") {
        // Single LocalBusiness schema, skip it entirely
        schemaToInject = null as unknown as Record<string, unknown>;
      }
      
      // Inject the (possibly filtered) schema
      if (schemaToInject) {
        const existingScript = document.getElementById("dynamic-schema");
        if (existingScript) {
          existingScript.remove();
        }
        
        const script = document.createElement("script");
        script.id = "dynamic-schema";
        script.type = "application/ld+json";
        script.textContent = JSON.stringify(schemaToInject);
        document.head.appendChild(script);
      }
    }

    return () => {
      const dynamicSchema = document.getElementById("dynamic-schema");
      if (dynamicSchema) {
        dynamicSchema.remove();
      }
    };
  }, [title, description, keywords, canonicalPath, ogImage, ogType, noIndex, schema]);

  return null;
}

export function generateServiceSchema(service: {
  name: string;
  description: string;
  priceRange?: string;
  areaServed?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": service.name,
    "name": service.name,
    "description": service.description,
    "provider": {
      "@id": "https://089-sanierer.de/#organization"
    },
    "areaServed": {
      "@type": "City",
      "name": service.areaServed || "München",
      "addressCountry": "DE"
    },
    "priceRange": service.priceRange || "€€-€€€"
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `https://089-sanierer.de${item.url}`
    }))
  };
}

export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": "https://089-sanierer.de/#organization",
    "name": "089-Sanierer",
    "alternateName": "089-Sanierer - Komplettsanierungen Haus & Wohnung",
    "description": "Professionelle Komplettsanierungen in München und Umgebung. Badsanierung, Wohnungssanierung, Haussanierung mit Festpreisgarantie und 5 Jahren Gewährleistung.",
    "url": "https://089-sanierer.de",
    "telephone": "+49-89-444438872",
    "email": "info@089-sanierer.de",
    "foundingDate": "2019",
    "priceRange": "€€-€€€",
    "currenciesAccepted": "EUR",
    "paymentAccepted": "Überweisung, Barzahlung",
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
      "name": "Sanierungsleistungen",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Komplettsanierung München",
            "description": "Vollständige Sanierung von Wohnungen und Häusern aus einer Hand"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Badsanierung München",
            "description": "Komplette Badsanierung mit Fliesen, Sanitär und Elektro"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Wohnungssanierung München",
            "description": "Professionelle Wohnungssanierung für Altbau und Neubau"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Haussanierung München",
            "description": "Umfassende Haussanierung für Einfamilien- und Mehrfamilienhäuser"
          }
        }
      ]
    },
    "sameAs": [
      "https://www.google.com/maps/place/089-Sanierer"
    ]
  };
}

export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "089-Sanierer",
    "url": "https://089-sanierer.de",
    "description": "Komplettsanierungen in München - Badsanierung, Wohnungssanierung, Haussanierung mit Festpreisgarantie",
    "publisher": {
      "@id": "https://089-sanierer.de/#organization"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://089-sanierer.de/anfrage?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };
}

export function generateCombinedSchema(additionalSchemas: object[] = []) {
  const schemas = [
    generateLocalBusinessSchema(),
    generateWebsiteSchema(),
    ...additionalSchemas
  ];
  
  return {
    "@context": "https://schema.org",
    "@graph": schemas.map(s => {
      const { "@context": _, ...rest } = s as Record<string, unknown>;
      return rest;
    })
  };
}

export function generateServicePageSchema(service: {
  name: string;
  description: string;
  priceRange: string;
  url: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": service.name,
    "name": service.name,
    "description": service.description,
    "url": `https://089-sanierer.de${service.url}`,
    "image": service.image || "https://089-sanierer.de/og-image.jpg",
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
        "price": service.priceRange
      },
      "availability": "https://schema.org/InStock"
    }
  };
}
