import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

interface InternalLink {
  href: string;
  title: string;
  description: string;
  image?: string;
}

interface InternalLinksProps {
  title?: string;
  links: InternalLink[];
}

const linkImages: Record<string, string> = {
  "/badsanierung": "/images/badsanierung_muenchen_2026.webp",
  "/rechner": "/images/kostenrechner_planung_2026.webp",
  "/faq-preise": "/images/sanierungsberatung_gespraech.webp",
  "/ratgeber": "/images/qualitaetskontrolle_sanierung.webp",
  "/wohnungssanierung": "/images/komplettsanierung_ergebnis.webp",
  "/haussanierung": "/images/komplettsanierung_haus.webp",
  "/kernsanierung": "/images/komplettsanierung_vorher_nachher.webp",
  "/termin": "/images/sanierungsberater_experte.webp",
  "/muenchen-schwabing": "/images/energieeffiziente_haussanierung.webp",
};

export function InternalLinks({ title = "Das könnte Sie auch interessieren", links }: InternalLinksProps) {
  if (links.length === 0) return null;

  return (
    <section className="py-8 lg:py-12 bg-muted/30" data-testid="section-internal-links">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-lg sm:text-xl font-semibold mb-6">{title}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {links.map((link) => {
            const img = link.image || linkImages[link.href];
            return (
              <Link key={link.href} href={link.href} data-testid={`link-internal-${link.href.replace(/\//g, '-').replace(/^-/, '')}`} className="rounded-md bg-background border hover-elevate cursor-pointer overflow-hidden">
                {img && (
                  <div className="h-32 sm:h-36 overflow-hidden">
                    <img
                      src={img}
                      alt={link.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      width="400"
                      height="144"
                    />
                  </div>
                )}
                <div className="flex items-start gap-3 p-4">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{link.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{link.description}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export const linkSets = {
  fromHome: [
    { href: "/badsanierung", title: "Badsanierung München", description: "Komplettbad ab 18.500€ mit Festpreisgarantie" },
    { href: "/rechner", title: "Kostenrechner", description: "Sanierungskosten online kalkulieren" },
    { href: "/faq-preise", title: "FAQ & Preise", description: "Antworten auf häufige Fragen" },
    { href: "/ratgeber", title: "Sanierung Ratgeber", description: "Tipps, Checklisten & Fachwissen" },
    { href: "/muenchen-schwabing", title: "Sanierung Schwabing", description: "Altbausanierung im beliebten Stadtteil" },
  ],
  fromBadsanierung: [
    { href: "/wohnungssanierung", title: "Wohnungssanierung München", description: "Komplette Wohnungssanierung ab 800€/m²" },
    { href: "/rechner", title: "Kostenrechner nutzen", description: "Badsanierung Kosten online berechnen" },
    { href: "/faq-preise", title: "FAQ Badsanierung", description: "Häufige Fragen zu Kosten und Ablauf" },
    { href: "/ratgeber", title: "Ratgeber Badsanierung", description: "Tipps für Ihr Badprojekt" },
  ],
  fromWohnungssanierung: [
    { href: "/badsanierung", title: "Badsanierung München", description: "Bad renovieren ab 18.500€" },
    { href: "/haussanierung", title: "Haussanierung München", description: "Haus komplett sanieren ab 1.200€/m²" },
    { href: "/kernsanierung", title: "Kernsanierung München", description: "Entkernung & Neuaufbau" },
    { href: "/rechner", title: "Kostenrechner", description: "Wohnungssanierung online berechnen" },
  ],
  fromHaussanierung: [
    { href: "/kernsanierung", title: "Kernsanierung München", description: "Entkernung & kompletter Neuaufbau" },
    { href: "/wohnungssanierung", title: "Wohnungssanierung", description: "Einzelne Wohnung sanieren ab 800€/m²" },
    { href: "/badsanierung", title: "Badsanierung München", description: "Neues Bad ab 18.500€" },
    { href: "/ratgeber", title: "Sanierung Ratgeber", description: "Tipps zur Haussanierung" },
  ],
  fromKernsanierung: [
    { href: "/haussanierung", title: "Haussanierung München", description: "Haus komplett sanieren" },
    { href: "/wohnungssanierung", title: "Wohnungssanierung", description: "Wohnung sanieren ab 800€/m²" },
    { href: "/badsanierung", title: "Badsanierung München", description: "Bad erneuern ab 18.500€" },
    { href: "/faq-preise", title: "FAQ & Preise", description: "Häufige Fragen zu Kosten" },
  ],
  fromRatgeber: [
    { href: "/rechner", title: "Kostenrechner", description: "Kosten online berechnen" },
    { href: "/badsanierung", title: "Badsanierung München", description: "Komplettbad ab 18.500€" },
    { href: "/faq-preise", title: "FAQ & Preise", description: "Häufige Fragen beantwortet" },
    { href: "/termin", title: "Beratungstermin", description: "Kostenlose Vor-Ort-Besichtigung" },
  ],
  fromFaqPreise: [
    { href: "/rechner", title: "Online Kostenrechner", description: "Sofort Kosten kalkulieren" },
    { href: "/badsanierung", title: "Badsanierung München", description: "Bad sanieren ab 18.500€" },
    { href: "/ratgeber", title: "Sanierung Ratgeber", description: "Tipps, Checklisten & Fachwissen" },
    { href: "/termin", title: "Beratungstermin buchen", description: "Kostenlose Vor-Ort-Besichtigung" },
  ],
  fromStadtteil: (districtName: string) => [
    { href: "/badsanierung", title: "Badsanierung München", description: `Bad sanieren in ${districtName} ab 18.500€` },
    { href: "/wohnungssanierung", title: "Wohnungssanierung", description: `Wohnung sanieren in ${districtName}` },
    { href: "/haussanierung", title: "Haussanierung", description: `Haus sanieren in ${districtName}` },
    { href: "/rechner", title: "Kostenrechner", description: "Kosten für Ihr Projekt berechnen" },
  ],
};
