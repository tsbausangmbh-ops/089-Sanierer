import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CalendarClock, Mail, Menu, X, ChevronDown, Home, Bath, UtensilsCrossed, Layers, Zap, Flame, Triangle, Leaf, Calculator } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
const kshwLogo = "/images/089-sanierer-logo.webp";

const allServices = [
  { id: "komplettsanierung", title: "Komplettsanierung", icon: Home, href: "/anfrage?service=komplettsanierung" },
  { id: "badsanierung", title: "Badsanierung", icon: Bath, href: "/anfrage?service=badsanierung" },
  { id: "kuechensanierung", title: "Küchensanierung", icon: UtensilsCrossed, href: "/anfrage?service=kuechensanierung" },
  { id: "bodensanierung", title: "Bodensanierung", icon: Layers, href: "/anfrage?service=bodensanierung" },
  { id: "elektrosanierung", title: "Elektrosanierung", icon: Zap, href: "/anfrage?service=elektrosanierung" },
  { id: "heizungssanierung", title: "Heizungssanierung", icon: Flame, href: "/anfrage?service=heizungssanierung" },
  { id: "dachsanierung", title: "Dachsanierung", icon: Triangle, href: "/anfrage?service=dachsanierung" },
  { id: "energetische-sanierung", title: "Energetische Sanierung", icon: Leaf, href: "/anfrage?service=energetische-sanierung" },
];

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[hsl(220,80%,18%)] text-white border-b border-white/15">
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[60] focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:rounded"
      >
        Zum Hauptinhalt springen
      </a>
      <div className="max-w-[1600px] mx-auto px-10 sm:px-14 lg:px-24">
        <div className="h-16 flex items-center justify-between gap-4">
          <Link href="/" aria-label="089-Sanierer Startseite">
            <div className="flex items-center gap-2 cursor-pointer">
              <img 
                src={kshwLogo} 
                alt="089-Sanierer München - Sanierungsfirma für Komplettsanierung und Badsanierung" 
                className="h-10 w-auto rounded"
                width="40"
                height="40"
                loading="eager"
                decoding="async"
              />
              <div className="flex flex-col">
                <span className="font-bold text-base leading-tight">089-Sanierer</span>
                <span className="text-xs text-white/70 leading-tight">Komplettsanierungen</span>
              </div>
            </div>
          </Link>
          <div className="flex min-[1440px]:hidden items-center gap-2">
            <Button 
              size="icon" 
              variant="ghost" 
              className="text-white hover:bg-white/10"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? "Menü schließen" : "Menü öffnen"}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
            </Button>
            <Link href="/termin">
              <Button size="icon" className="bg-orange-500 text-white border-orange-500">
                <CalendarClock className="w-4 h-4" aria-hidden="true" />
              </Button>
            </Link>
          </div>
          <nav className="hidden min-[1440px]:flex items-center gap-1" aria-label="Hauptnavigation">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-sm text-white/80 hover:text-white hover:bg-white/10" data-testid="dropdown-leistungen">
                  Leistungen
                  <ChevronDown className="w-4 h-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                {allServices.map((service) => (
                  <Link key={service.id} href={service.href}>
                    <DropdownMenuItem className="cursor-pointer" data-testid={`dropdown-item-${service.id}`}>
                      <service.icon className="w-4 h-4 mr-2" />
                      {service.title}
                    </DropdownMenuItem>
                  </Link>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Link href="/anfrage?service=komplettsanierung">
              <Button variant="ghost" size="sm" className="text-sm text-white/80 hover:text-white hover:bg-white/10">
                Komplettsanierung
              </Button>
            </Link>
            <Link href="/anfrage?service=badsanierung">
              <Button variant="ghost" size="sm" className="text-sm text-white/80 hover:text-white hover:bg-white/10">
                Badsanierung
              </Button>
            </Link>
            <Link href="/faq-preise">
              <Button variant="ghost" size="sm" className="text-sm text-white/80 hover:text-white hover:bg-white/10">
                FAQ & Preise
              </Button>
            </Link>
            <Link href="/ratgeber">
              <Button variant="ghost" size="sm" className="text-sm text-white/80 hover:text-white hover:bg-white/10">
                Ratgeber
              </Button>
            </Link>
            <Link href="/rechner">
              <Button variant="ghost" size="sm" className="text-sm text-white/80 hover:text-white hover:bg-white/10">
                <Calculator className="w-4 h-4 mr-1" />
                Kostenrechner
              </Button>
            </Link>
            <Link href="/kontakt">
              <Button variant="ghost" size="sm" className="text-sm text-white/80 hover:text-white hover:bg-white/10 ml-2">
                <Mail className="w-4 h-4 mr-1" aria-hidden="true" />
                Kontakt
              </Button>
            </Link>
            <Link href="/termin">
              <Button size="sm" className="text-sm bg-orange-500 text-white border-orange-500 ml-1">
                <CalendarClock className="w-4 h-4 mr-1" aria-hidden="true" />
                24H Online-Termine
              </Button>
            </Link>
          </nav>
        </div>
      </div>
      {mobileMenuOpen && (
        <nav 
          id="mobile-menu"
          className="min-[1440px]:hidden bg-[hsl(220,80%,15%)] border-t border-white/10"
          aria-label="Mobile Navigation"
        >
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-2">
            <p className="text-xs text-white/50 uppercase tracking-wider px-4 py-1">Leistungen</p>
            {allServices.map((service) => (
              <Link key={service.id} href={service.href}>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-white/80 hover:text-white hover:bg-white/10"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <service.icon className="w-4 h-4 mr-2" />
                  {service.title}
                </Button>
              </Link>
            ))}
            <div className="border-t border-white/20 my-2" role="separator" />
            <Link href="/ratgeber">
              <Button 
                variant="ghost" 
                className="w-full justify-start text-white/80 hover:text-white hover:bg-white/10"
                onClick={() => setMobileMenuOpen(false)}
              >
                Ratgeber
              </Button>
            </Link>
            <Link href="/faq-preise">
              <Button 
                variant="ghost" 
                className="w-full justify-start text-white/80 hover:text-white hover:bg-white/10"
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQ & Preise
              </Button>
            </Link>
            <Link href="/rechner">
              <Button 
                variant="ghost" 
                className="w-full justify-start text-white/80 hover:text-white hover:bg-white/10"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Calculator className="w-4 h-4 mr-2" />
                Kostenrechner
              </Button>
            </Link>
            <Link href="/kontakt">
              <Button 
                variant="ghost" 
                className="w-full justify-start text-white/80 hover:text-white hover:bg-white/10"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Mail className="w-4 h-4 mr-2" />
                Kontakt
              </Button>
            </Link>
            <Link href="/termin">
              <Button 
                className="w-full justify-start bg-orange-500 text-white border-orange-500 mt-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <CalendarClock className="w-4 h-4 mr-2" />
                24H Online-Termine
              </Button>
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
