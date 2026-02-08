import { Button } from "@/components/ui/button";
import { Home, Phone, Search } from "lucide-react";
import { Link } from "wouter";
import { SeoHead } from "@/components/seo-head";
import { SiteHeader } from "@/components/site-header";
import { SeoFooter } from "@/components/seo-footer";
import { GlobalHero, HeroContent } from "@/components/global-hero";
const heroImage = "/images/sanierungsberater_experte.webp";

const notFoundHeroContent: HeroContent = {
  backgroundImage: heroImage,
  imageAlt: "Seite nicht gefunden – 089-Sanierer München Sanierungsfirma für Komplettsanierung und Renovierung",
  badge: "Seite nicht gefunden",
  titleLine1: "404.",
  titleLine2: "Diese Seite existiert leider nicht.",
  descriptions: ["Die gesuchte Seite wurde verschoben oder existiert nicht mehr.", "Wir helfen Ihnen gerne persönlich weiter."],
  strongText: "Ihr Projekt-Kurator ist für Sie da.",
  ctaText: "Zur Startseite",
  ctaLink: "/",
  checkmarks: ["98% Weiterempfehlung", "Meisterbetriebe", "Festpreisgarantie"],
  dataTestIdPrefix: "notfound"
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SeoHead
        title="Seite nicht gefunden | Sanierung München"
        description="Die angeforderte Seite wurde nicht gefunden. Kehren Sie zur Startseite zurück oder kontaktieren Sie uns."
        noIndex={true}
      />
      <SiteHeader />
      
      <GlobalHero content={notFoundHeroContent} />
      
      <main className="flex-1 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-lg sm:text-xl font-bold text-foreground mb-6">
            Wie können wir Ihnen helfen?
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <Button asChild size="lg" className="h-auto py-4 flex-col gap-2" data-testid="button-404-home">
              <Link href="/">
                <Home className="w-6 h-6" />
                <span>Startseite</span>
              </Link>
            </Button>
            
            <Button asChild size="lg" variant="outline" className="h-auto py-4 flex-col gap-2" data-testid="button-404-anfrage">
              <Link href="/anfrage">
                <Search className="w-6 h-6" />
                <span>Anfrage stellen</span>
              </Link>
            </Button>
            
            <Button asChild size="lg" variant="secondary" className="h-auto py-4 flex-col gap-2" data-testid="button-404-phone">
              <a href="tel:+4989444438872">
                <Phone className="w-6 h-6" />
                <span>Anrufen</span>
              </a>
            </Button>
          </div>
          
          <p className="text-muted-foreground">
            Sie können auch{" "}
            <button 
              type="button"
              onClick={() => window.history.back()}
              className="text-primary hover:underline cursor-pointer"
              data-testid="link-404-back"
            >
              zur vorherigen Seite zurückkehren
            </button>.
          </p>
        </div>
      </main>
      
      <SeoFooter />
    </div>
  );
}
