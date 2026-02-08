import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

interface InternalLink {
  href: string;
  title: string;
  description: string;
}

interface InternalLinksProps {
  title?: string;
  links: InternalLink[];
}

export function InternalLinks({ title = "Das könnte Sie auch interessieren", links }: InternalLinksProps) {
  if (links.length === 0) return null;

  return (
    <section className="py-8 lg:py-12 bg-muted/30" data-testid="section-internal-links">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-lg sm:text-xl font-semibold mb-6">{title}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {links.map((link) => (
            <Link key={link.href} href={link.href} data-testid={`link-internal-${link.href.replace(/\//g, '-').replace(/^-/, '')}`} className="flex items-start gap-3 p-4 rounded-md bg-background border hover-elevate cursor-pointer">
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">{link.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{link.description}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export const linkSets = {
  fromHome: [
    { href: "/badsanierung", title: "Badsanierung München", description: "Komplettbad ab 18.500€ mit Festpreisgarantie" },
    { href: "/kosten", title: "Sanierung Kosten 2026", description: "Transparente Preisübersicht pro m²" },
    { href: "/rechner", title: "Kostenrechner", description: "Sanierungskosten online kalkulieren" },
    { href: "/faq-preise", title: "FAQ & Preise", description: "Antworten auf häufige Fragen" },
    { href: "/ratgeber", title: "Sanierung Ratgeber", description: "Tipps, Checklisten & Fachwissen" },
    { href: "/muenchen-schwabing", title: "Sanierung Schwabing", description: "Altbausanierung im beliebten Stadtteil" },
  ],
  fromBadsanierung: [
    { href: "/kosten", title: "Alle Sanierungskosten München", description: "Preisübersicht für alle Gewerke" },
    { href: "/wohnungssanierung", title: "Wohnungssanierung München", description: "Komplette Wohnungssanierung ab 800€/m²" },
    { href: "/rechner", title: "Kostenrechner nutzen", description: "Badsanierung Kosten online berechnen" },
    { href: "/faq-preise", title: "FAQ Badsanierung", description: "Häufige Fragen zu Kosten und Ablauf" },
    { href: "/ratgeber", title: "Ratgeber Badsanierung", description: "Tipps für Ihr Badprojekt" },
  ],
  fromKosten: [
    { href: "/badsanierung", title: "Badsanierung München", description: "Detaillierte Infos ab 18.500€" },
    { href: "/wohnungssanierung", title: "Wohnungssanierung", description: "Komplette Sanierung ab 800€/m²" },
    { href: "/haussanierung", title: "Haussanierung", description: "Einfamilienhaus ab 1.200€/m²" },
    { href: "/rechner", title: "Online Kostenrechner", description: "Sofort Kosten kalkulieren" },
    { href: "/faq-preise", title: "FAQ & Preise", description: "Antworten auf Kostenfragen" },
  ],
  fromWohnungssanierung: [
    { href: "/badsanierung", title: "Badsanierung München", description: "Bad renovieren ab 18.500€" },
    { href: "/haussanierung", title: "Haussanierung München", description: "Haus komplett sanieren ab 1.200€/m²" },
    { href: "/kosten", title: "Alle Sanierungskosten", description: "Transparente Preisübersicht 2026" },
    { href: "/kernsanierung", title: "Kernsanierung München", description: "Entkernung & Neuaufbau" },
    { href: "/rechner", title: "Kostenrechner", description: "Wohnungssanierung online berechnen" },
  ],
  fromHaussanierung: [
    { href: "/kernsanierung", title: "Kernsanierung München", description: "Entkernung & kompletter Neuaufbau" },
    { href: "/wohnungssanierung", title: "Wohnungssanierung", description: "Einzelne Wohnung sanieren ab 800€/m²" },
    { href: "/kosten", title: "Sanierung Kosten 2026", description: "Detaillierte Preisübersicht" },
    { href: "/badsanierung", title: "Badsanierung München", description: "Neues Bad ab 18.500€" },
    { href: "/ratgeber", title: "Sanierung Ratgeber", description: "Tipps zur Haussanierung" },
  ],
  fromKernsanierung: [
    { href: "/haussanierung", title: "Haussanierung München", description: "Haus komplett sanieren" },
    { href: "/wohnungssanierung", title: "Wohnungssanierung", description: "Wohnung sanieren ab 800€/m²" },
    { href: "/kosten", title: "Sanierung Kosten 2026", description: "Kernsanierung Preisübersicht" },
    { href: "/badsanierung", title: "Badsanierung München", description: "Bad erneuern ab 18.500€" },
    { href: "/faq-preise", title: "FAQ & Preise", description: "Häufige Fragen zu Kosten" },
  ],
  fromRatgeber: [
    { href: "/kosten", title: "Sanierung Kosten 2026", description: "Aktuelle Preise pro m²" },
    { href: "/rechner", title: "Kostenrechner", description: "Kosten online berechnen" },
    { href: "/badsanierung", title: "Badsanierung München", description: "Komplettbad ab 18.500€" },
    { href: "/faq-preise", title: "FAQ & Preise", description: "Häufige Fragen beantwortet" },
    { href: "/termin", title: "Beratungstermin", description: "Kostenlose Vor-Ort-Besichtigung" },
  ],
  fromFaqPreise: [
    { href: "/kosten", title: "Detaillierte Kostenübersicht", description: "Preise für alle Sanierungsarten" },
    { href: "/rechner", title: "Online Kostenrechner", description: "Sofort Kosten kalkulieren" },
    { href: "/badsanierung", title: "Badsanierung München", description: "Bad sanieren ab 18.500€" },
    { href: "/ratgeber", title: "Sanierung Ratgeber", description: "Tipps, Checklisten & Fachwissen" },
    { href: "/termin", title: "Beratungstermin buchen", description: "Kostenlose Vor-Ort-Besichtigung" },
  ],
  fromStadtteil: (districtName: string) => [
    { href: "/badsanierung", title: "Badsanierung München", description: `Bad sanieren in ${districtName} ab 18.500€` },
    { href: "/wohnungssanierung", title: "Wohnungssanierung", description: `Wohnung sanieren in ${districtName}` },
    { href: "/haussanierung", title: "Haussanierung", description: `Haus sanieren in ${districtName}` },
    { href: "/kosten", title: "Sanierung Kosten 2026", description: "Aktuelle Preise pro m²" },
    { href: "/rechner", title: "Kostenrechner", description: "Kosten für Ihr Projekt berechnen" },
  ],
};
