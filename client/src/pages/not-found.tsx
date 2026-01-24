import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Phone } from "lucide-react";
import { Link } from "wouter";
import { SeoHead } from "@/components/seo-head";
import { SiteHeader } from "@/components/site-header";
import { SeoFooter } from "@/components/seo-footer";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SeoHead
        title="Seite nicht gefunden | 089-Sanierer München"
        description="Die angeforderte Seite wurde nicht gefunden. Kehren Sie zur Startseite zurück oder kontaktieren Sie uns."
        noIndex={true}
      />
      <SiteHeader />
      
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="text-center max-w-lg">
          <div className="mb-8">
            <span className="text-8xl font-bold text-primary">404</span>
          </div>
          
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Seite nicht gefunden
          </h1>
          
          <p className="text-muted-foreground mb-8 text-lg">
            Die angeforderte Seite existiert leider nicht oder wurde verschoben. 
            Vielleicht finden Sie auf unserer Startseite, was Sie suchen.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" data-testid="button-404-home">
              <Link href="/">
                <Home className="w-5 h-5 mr-2" />
                Zur Startseite
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" data-testid="button-404-back">
              <a href="javascript:history.back()">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Zurück
              </a>
            </Button>
          </div>
          
          <div className="mt-12 pt-8 border-t">
            <p className="text-muted-foreground mb-4">
              Sie haben Fragen? Wir helfen Ihnen gerne weiter.
            </p>
            <Button asChild variant="secondary" data-testid="button-404-phone">
              <a href="tel:+4989444438872">
                <Phone className="w-4 h-4 mr-2" />
                089 444438872
              </a>
            </Button>
          </div>
        </div>
      </main>
      
      <SeoFooter />
    </div>
  );
}
