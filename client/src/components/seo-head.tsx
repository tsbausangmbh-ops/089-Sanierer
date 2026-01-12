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
      const existingScript = document.getElementById("dynamic-schema");
      if (existingScript) {
        existingScript.remove();
      }
      
      const script = document.createElement("script");
      script.id = "dynamic-schema";
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
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

export function generateFaqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
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
      "@type": "LocalBusiness",
      "@id": "https://089-sanierer.de/#organization",
      "name": "089-Sanierer"
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
