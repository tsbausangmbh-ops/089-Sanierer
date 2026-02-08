import { Link } from "wouter";
import {
  Bath,
  Home as HomeIcon,
  Hammer,
  Calculator,
  Building,
  Euro,
  ChevronRight,
  type LucideIcon
} from "lucide-react";

interface RecLink {
  href: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
}

const recommendedLinks: RecLink[] = [
  { href: "/badsanierung", icon: Bath, title: "Badsanierung München", subtitle: "Komplettbad ab 18.500€ in 2-3 Wochen" },
  { href: "/wohnungssanierung", icon: Building, title: "Wohnungssanierung", subtitle: "Wohnung komplett sanieren ab 800€/m²" },
  { href: "/haussanierung", icon: HomeIcon, title: "Haussanierung München", subtitle: "Einfamilienhaus sanieren ab 1.200€/m²" },
  { href: "/kernsanierung", icon: Hammer, title: "Kernsanierung München", subtitle: "Entkernung & Neuaufbau zum Festpreis" },
  { href: "/kosten", icon: Euro, title: "Kosten & Preise 2026", subtitle: "Transparente Preisübersicht aller Gewerke" },
  { href: "/rechner", icon: Calculator, title: "Online Kostenrechner", subtitle: "Sanierungskosten sofort berechnen" },
];

export function RecommendedLinks({ currentPath }: { currentPath?: string }) {
  const links = currentPath
    ? recommendedLinks.filter((l) => l.href !== currentPath)
    : recommendedLinks;

  const displayLinks = links.slice(0, 6);

  return (
    <section className="py-8 lg:py-12 bg-gradient-to-b from-primary/5 to-background" data-testid="section-recommended-links">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-6 text-center">
          Das könnte Sie auch interessieren
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <div className="flex items-center gap-3 p-4 rounded-md border bg-card hover-elevate cursor-pointer" data-testid={`rec-link-${link.href.replace(/\//g, "")}`}>
                <link.icon className="w-5 h-5 text-primary shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{link.title}</p>
                  <p className="text-xs text-muted-foreground">{link.subtitle}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
