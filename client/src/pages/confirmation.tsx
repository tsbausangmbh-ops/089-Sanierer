import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  CheckCircle, 
  Phone, 
  Mail, 
  Clock,
  Home as HomeIcon,
  ChevronRight,
  Star,
  Shield,
  Award,
  Users
} from "lucide-react";
import { SeoHead } from "@/components/seo-head";

export default function Confirmation() {
  return (
    <div className="min-h-screen bg-background">
      <SeoHead
        title="Anfrage erhalten | KSHW München"
        description="Vielen Dank für Ihre Anfrage. Wir melden uns innerhalb von 24-48 Stunden bei Ihnen."
        noIndex={true}
      />
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <HomeIcon className="w-5 h-5 text-primary" />
            <span className="font-bold">KSHW München</span>
          </Link>
          <a 
            href="tel:+4915212274043"
            className="flex items-center gap-2 bg-green-500 text-white px-3 py-1.5 rounded-md text-sm font-medium"
          >
            <Phone className="w-4 h-4" />
            <span className="hidden sm:inline">0152 122 740 43</span>
          </a>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-12 lg:py-16">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6 animate-pulse">
            <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
          </div>
          
          <h1 className="text-2xl lg:text-3xl font-bold mb-3" data-testid="text-confirmation-title">
            Wir haben Ihr Problem verstanden!
          </h1>
          
          <p className="text-lg text-muted-foreground mb-6">
            Unser Expertenteam arbeitet bereits an Ihrer Lösung. 
            Wir melden uns schnellstmöglich bei Ihnen.
          </p>

          <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-4 py-2 rounded-full text-sm font-medium mb-8">
            <Clock className="w-4 h-4" />
            Erwartete Rückmeldung: Innerhalb von 48 Stunden
          </div>

          <Card className="p-5 lg:p-6 text-left mb-6">
            <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-500" />
              Das passiert jetzt
            </h2>
            <ol className="space-y-4">
              <li className="flex gap-4">
                <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center flex-shrink-0">
                  1
                </span>
                <div>
                  <p className="font-medium">Wir analysieren Ihr Projekt</p>
                  <p className="text-sm text-muted-foreground">
                    Unsere Experten prüfen Ihre Anfrage und bereiten eine erste Einschätzung vor.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="w-8 h-8 rounded-full bg-primary/20 text-primary font-bold flex items-center justify-center flex-shrink-0">
                  2
                </span>
                <div>
                  <p className="font-medium">Persönlicher Anruf von uns</p>
                  <p className="text-sm text-muted-foreground">
                    Ein erfahrener Berater ruft Sie an, um offene Fragen zu klären.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center flex-shrink-0">
                  3
                </span>
                <div>
                  <p className="font-medium">Kostenloser Vor-Ort-Termin in München</p>
                  <p className="text-sm text-muted-foreground">
                    Wir besichtigen Ihr Objekt und erstellen ein verbindliches Festpreisangebot.
                  </p>
                </div>
              </li>
            </ol>
          </Card>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <div className="flex flex-col items-center p-3 bg-muted/50 rounded-lg">
              <Shield className="w-5 h-5 text-primary mb-1" />
              <span className="text-xs text-center">100% Versichert</span>
            </div>
            <div className="flex flex-col items-center p-3 bg-muted/50 rounded-lg">
              <Award className="w-5 h-5 text-primary mb-1" />
              <span className="text-xs text-center">Meisterqualität</span>
            </div>
            <div className="flex flex-col items-center p-3 bg-muted/50 rounded-lg">
              <Users className="w-5 h-5 text-primary mb-1" />
              <span className="text-xs text-center">268+ Projekte</span>
            </div>
            <div className="flex flex-col items-center p-3 bg-muted/50 rounded-lg">
              <Star className="w-5 h-5 text-amber-500 mb-1" />
              <span className="text-xs text-center">4.9 Sterne</span>
            </div>
          </div>

          <Card className="p-5 bg-primary/5 border-primary/20 mb-6">
            <p className="font-medium mb-3">
              Sie haben Fragen? Rufen Sie uns direkt an:
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <a 
                href="tel:+4915212274043" 
                className="inline-flex items-center justify-center gap-2 bg-green-500 text-white px-4 py-2 rounded-md font-medium"
              >
                <Phone className="w-4 h-4" />
                0152 122 740 43
              </a>
              <a 
                href="mailto:info@komplettsanierungen-haus-wohnung.de" 
                className="inline-flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground"
              >
                <Mail className="w-4 h-4" />
                info@komplettsanierungen-haus-wohnung.de
              </a>
            </div>
          </Card>

          <Link href="/">
            <Button variant="outline" data-testid="button-back-home">
              Zurück zur Startseite
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </main>

      <footer className="border-t py-4 mt-8">
        <div className="max-w-4xl mx-auto px-4 flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
          <span>KSHW München - Ali Kemal Kurt</span>
          <span>Zielstattstr. 9, 81379 München</span>
        </div>
      </footer>
    </div>
  );
}
