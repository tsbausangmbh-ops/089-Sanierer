export const heroImageMap: Record<string, string> = {
  "/": "/images/komplettsanierung_vorher_nachher.webp",
  "/komplettsanierung": "/images/komplettsanierung_vorher_nachher.webp",
  "/badsanierung": "/images/badsanierung_muenchen_2026.webp",
  "/kuechensanierung": "/images/moderne_kuechensanierung_ergebnis.webp",
  "/bodensanierung": "/images/parkettboden_sanierung_ergebnis.webp",
  "/elektrosanierung": "/images/elektrosanierung_installation.webp",
  "/heizungssanierung": "/images/moderne_heizungsanlage_einbau.webp",
  "/dachsanierung": "/images/fertig_saniertes_hausdach.webp",
  "/energetische-sanierung": "/images/energieeffizientes_saniertes_haus.webp",
  "/wohnungssanierung": "/images/sanierte_luxuswohnung_interieur.webp",
  "/haussanierung": "/images/haus_alt_vs_neu_vergleich.webp",
  "/kernsanierung": "/images/haus_alt_vs_neu_vergleich.webp",
  "/kosten": "/images/sanierung_preiskalkulation.webp",
  "/kontakt": "/images/kundenservice_kontakt.webp",
  "/rechner": "/images/kostenrechner_planung_2026.webp",
  "/ratgeber": "/images/sanierungsberater_experte.webp",
  "/faq-preise": "/images/sanierung_preiskalkulation.webp",
  "/anfrage": "/images/sanierungsberatung_gespraech.webp",
};

const umlandCities = /^\/(dachau|karlsfeld|germering|fuerstenfeldbruck|freising|starnberg|garching|unterschleissheim|oberschleissheim|ottobrunn|haar|graefelfing|planegg|pullach|gruenwald)$/;

export function getHeroImageForRoute(routePath: string): string | null {
  const cleanPath = routePath.split("?")[0];
  if (heroImageMap[cleanPath]) return heroImageMap[cleanPath];
  if (cleanPath.startsWith("/muenchen-")) return "/images/modernes_saniertes_wohninterieur.webp";
  if (cleanPath.match(umlandCities)) return "/images/modernes_saniertes_wohninterieur.webp";
  return null;
}
