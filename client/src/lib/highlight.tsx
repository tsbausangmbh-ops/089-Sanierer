import { Fragment, ReactNode } from "react";

interface HighlightConfig {
  primary?: string[];
  secondary?: string[];
}

export function highlightKeywords(
  text: string,
  config: HighlightConfig
): ReactNode {
  if (!text || (!config.primary?.length && !config.secondary?.length)) {
    return text;
  }

  const allKeywords = [
    ...(config.primary || []).map((k) => ({ keyword: k, type: "primary" as const })),
    ...(config.secondary || []).map((k) => ({ keyword: k, type: "secondary" as const })),
  ].sort((a, b) => b.keyword.length - a.keyword.length);

  if (allKeywords.length === 0) return text;

  const escapeRegex = (str: string) =>
    str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const pattern = new RegExp(
    `(${allKeywords.map((k) => escapeRegex(k.keyword)).join("|")})`,
    "gi"
  );

  const parts = text.split(pattern);

  return (
    <>
      {parts.map((part, index) => {
        const match = allKeywords.find(
          (k) => k.keyword.toLowerCase() === part.toLowerCase()
        );
        if (match) {
          const className =
            match.type === "primary"
              ? "text-accent font-semibold"
              : "text-primary font-semibold";
          return (
            <span key={index} className={className}>
              {part}
            </span>
          );
        }
        return <Fragment key={index}>{part}</Fragment>;
      })}
    </>
  );
}

export const serviceKeywords: Record<string, HighlightConfig> = {
  komplettsanierung: {
    primary: ["Komplettsanierung München", "Kernsanierung", "Festpreis", "schlüsselfertig"],
    secondary: ["5 Jahre Gewährleistung", "Meisterqualität", "268 Projekte"]
  },
  badsanierung: {
    primary: ["Badsanierung München", "Badrenovierung", "Festpreis ab 8.000€", "10-15 Werktagen"],
    secondary: ["5 Jahre Gewährleistung", "Markenprodukte", "80+ Bäder"]
  },
  kuechensanierung: {
    primary: ["Küchensanierung München", "Küchenumbau", "Festpreis", "5-10 Werktagen"],
    secondary: ["5 Jahre Gewährleistung", "alle Gewerke"]
  },
  bodensanierung: {
    primary: ["Bodensanierung München", "Parkett", "Vinyl", "Fliesen", "2-5 Tagen"],
    secondary: ["5 Jahre Gewährleistung", "Festpreis pro m²"]
  },
  elektrosanierung: {
    primary: ["Elektrosanierung München", "Elektroinstallation", "Sicherheit"],
    secondary: ["5 Jahre Gewährleistung", "nach VDE-Norm"]
  },
  heizungssanierung: {
    primary: ["Heizungssanierung München", "Wärmepumpe", "Förderung", "Heizkosten sparen"],
    secondary: ["5 Jahre Gewährleistung", "BAFA-Förderung"]
  },
  "energetische-sanierung": {
    primary: ["Energetische Sanierung München", "Wärmedämmung", "50% Heizkosten sparen", "KfW-Förderung"],
    secondary: ["5 Jahre Gewährleistung", "Energieberater"]
  },
  dachsanierung: {
    primary: ["Dachsanierung München", "Dachdämmung", "neue Dachziegel"],
    secondary: ["5 Jahre Gewährleistung", "20 Jahre Lebensdauer"]
  },
};

export const pageKeywords = {
  ratgeber: {
    primary: ["München", "Kosten", "Förderung", "KfW", "BAFA"],
    secondary: ["Festpreis", "Gewährleistung", "kostenlos"]
  },
  faqPreise: {
    primary: ["München", "Festpreis", "Kosten", "pro m²"],
    secondary: ["Handwerker", "Qualität", "Gewährleistung"]
  },
  home: {
    primary: ["München", "Festpreis", "Komplettsanierung"],
    secondary: ["5 Jahre Gewährleistung", "kostenlos"]
  }
};
