import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Phone, Menu, X, ChevronDown, Home, Bath, UtensilsCrossed, Layers, Zap, Flame, Triangle, Leaf, Calculator } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import kshwLogo from "@assets/089-Sanierer_Logo_small.webp";

const allServices = [
  { id: "komplettsanierung", title: "Komplettsanierung", icon: Home },
  { id: "badsanierung", title: "Badsanierung", icon: Bath },
  { id: "kuechensanierung", title: "Küchensanierung", icon: UtensilsCrossed },
  { id: "bodensanierung", title: "Bodensanierung", icon: Layers },
  { id: "elektrosanierung", title: "Elektrosanierung", icon: Zap },
  { id: "heizungssanierung", title: "Heizungssanierung", icon: Flame },
  { id: "dachsanierung", title: "Dachsanierung", icon: Triangle },
  { id: "energetische-sanierung", title: "Energetische Sanierung", icon: Leaf },
];

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[hsl(220,80%,10%)] text-white border-b border-white/20">
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[60] focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:rounded"
      >
        Zum Hauptinhalt springen
      </a>
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
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
              />
              <div className="flex flex-col">
                <span className="font-bold text-base leading-tight">089-Sanierer</span>
                <span className="text-xs text-white/70 leading-tight">Komplettsanierungen</span>
              </div>
            </div>
          </Link>
          <div className="flex lg:hidden items-center gap-2">
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
            <a href="tel:+498944438872" aria-label="Anrufen: 089 444438872">
              <Button size="icon" className="bg-green-500 hover:bg-green-600 text-white border-green-500">
                <Phone className="w-4 h-4" aria-hidden="true" />
              </Button>
            </a>
          </div>
          <nav className="hidden lg:flex items-center gap-1" aria-label="Hauptnavigation">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-sm text-white/80 hover:text-white hover:bg-white/10" data-testid="dropdown-leistungen">
                  Leistungen
                  <ChevronDown className="w-4 h-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                {allServices.map((service) => (
                  <Link key={service.id} href={`/anfrage?service=${service.id}`}>
                    <DropdownMenuItem className="cursor-pointer" data-testid={`dropdown-item-${service.id}`}>
                      <service.icon className="w-4 h-4 mr-2" />
                      {service.title}
                    </DropdownMenuItem>
                  </Link>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Link href="/anfrage?service=badsanierung">
              <Button variant="ghost" size="sm" className="text-sm text-white/80 hover:text-white hover:bg-white/10">
                Badsanierung
              </Button>
            </Link>
            <Link href="/anfrage?service=energetische-sanierung">
              <Button variant="ghost" size="sm" className="text-sm text-white/80 hover:text-white hover:bg-white/10">
                Energetische Sanierung
              </Button>
            </Link>
            <Link href="/ratgeber">
              <Button variant="ghost" size="sm" className="text-sm text-white/80 hover:text-white hover:bg-white/10">
                Ratgeber
              </Button>
            </Link>
            <Link href="/faq-preise">
              <Button variant="ghost" size="sm" className="text-sm text-white/80 hover:text-white hover:bg-white/10">
                FAQ & Preise
              </Button>
            </Link>
            <Link href="/rechner">
              <Button variant="ghost" size="sm" className="text-sm text-white/80 hover:text-white hover:bg-white/10">
                <Calculator className="w-4 h-4 mr-1" />
                Kostenrechner
              </Button>
            </Link>
            <a href="tel:+498944438872" className="ml-3" aria-label="Anrufen: 089 444438872">
              <Button size="sm" className="text-sm bg-green-500 hover:bg-green-600 text-white border-green-500">
                <Phone className="w-4 h-4 mr-1" aria-hidden="true" />
                089 444438872
              </Button>
            </a>
          </nav>
        </div>
      </div>
      {mobileMenuOpen && (
        <nav 
          id="mobile-menu"
          className="lg:hidden bg-[hsl(220,80%,12%)] border-t border-white/10"
          aria-label="Mobile Navigation"
        >
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-2">
            <p className="text-xs text-white/50 uppercase tracking-wider px-4 py-1">Leistungen</p>
            {allServices.map((service) => (
              <Link key={service.id} href={`/anfrage?service=${service.id}`}>
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
                Kontakt
              </Button>
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
