import { Link } from "wouter";
import {
  CheckCircle,
  ChevronRight,
  Bath,
  Home as HomeIcon,
  Hammer,
  Shield,
  Calculator,
  Building,
  type LucideIcon
} from "lucide-react";

interface ServiceLink {
  href: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
}

interface ServiceIntroProps {
  headline: string;
  paragraphs: string[];
  benefits: string[];
  linksHeadline: string;
  linksDescription: string;
  links?: ServiceLink[];
}

const defaultLinks: ServiceLink[] = [
  { href: "/kernsanierung", icon: HomeIcon, title: "Komplett- & Kernsanierung", subtitle: "Rundum-Sanierung ab 1.200€/m² Festpreis" },
  { href: "/badsanierung", icon: Bath, title: "Badsanierung München", subtitle: "Komplettbad ab 18.500€ in 2-3 Wochen" },
  { href: "/wohnungssanierung", icon: Hammer, title: "Wohnungssanierung", subtitle: "Wohnung komplett sanieren ab 800€/m²" },
  { href: "/haussanierung", icon: Shield, title: "Haussanierung", subtitle: "Einfamilienhaus sanieren ab 1.200€/m²" },
  { href: "/kosten", icon: Calculator, title: "Alle Kosten & Preise 2026", subtitle: "Transparente Preisübersicht aller Gewerke" },
];

export function ServiceIntro({ headline, paragraphs, benefits, linksHeadline, linksDescription, links }: ServiceIntroProps) {
  const serviceLinks = links || defaultLinks;

  return (
    <section className="py-6 lg:py-10 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div>
            <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold mb-4">
              {headline}
            </h2>
            {paragraphs.map((text, i) => (
              <p key={i} className="text-sm sm:text-base text-muted-foreground mb-4">
                {text}
              </p>
            ))}
            <div className="grid grid-cols-2 gap-3 mt-6">
              {benefits.map((benefit, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                  <span className="text-sm font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-bold mb-3">
              {linksHeadline}
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground mb-4">
              {linksDescription}
            </p>
            <div className="space-y-3">
              {serviceLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <div className="flex items-center gap-3 p-3 rounded-md border hover-elevate cursor-pointer">
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
        </div>
      </div>
    </section>
  );
}
