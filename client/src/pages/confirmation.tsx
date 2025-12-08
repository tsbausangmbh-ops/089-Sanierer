import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  CheckCircle, 
  Phone, 
  Mail, 
  Clock,
  Home as HomeIcon,
  ChevronRight 
} from "lucide-react";

export default function Confirmation() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <HomeIcon className="w-6 h-6 text-primary" />
            <span className="font-bold text-lg">KSHW München</span>
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-16 lg:py-24">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
          </div>
          
          <h1 className="text-3xl lg:text-4xl font-bold mb-4" data-testid="text-confirmation-title">
            Ihre Sanierungsanfrage für München wurde erhalten!
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8">
            Vielen Dank für Ihre Anfrage. Wir haben Ihre Nachricht erhalten und werden uns schnellstmöglich bei Ihnen melden.
          </p>

          <Card className="p-6 lg:p-8 text-left mb-8">
            <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Die nächsten Schritte
            </h2>
            <ol className="space-y-4">
              <li className="flex gap-4">
                <span className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center flex-shrink-0">
                  1
                </span>
                <div>
                  <p className="font-medium">Prüfung Ihrer Anfrage</p>
                  <p className="text-sm text-muted-foreground">
                    Wir analysieren Ihr Projekt und bereiten ein individuelles Angebot vor.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center flex-shrink-0">
                  2
                </span>
                <div>
                  <p className="font-medium">Persönliche Kontaktaufnahme</p>
                  <p className="text-sm text-muted-foreground">
                    Ein Experte meldet sich innerhalb von 24 Stunden bei Ihnen.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center flex-shrink-0">
                  3
                </span>
                <div>
                  <p className="font-medium">Kostenloser Vor-Ort-Termin</p>
                  <p className="text-sm text-muted-foreground">
                    Wir besichtigen Ihr Objekt und erstellen ein detailliertes Angebot.
                  </p>
                </div>
              </li>
            </ol>
          </Card>

          <div className="bg-accent/30 rounded-lg p-6 mb-8">
            <p className="font-medium mb-4">
              Erwartete Antwortzeit: <span className="text-primary font-bold">Innerhalb von 24 Stunden</span>
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 text-sm text-muted-foreground">
              <a href="tel:+4915212274043" className="flex items-center justify-center gap-2 hover:text-foreground">
                <Phone className="w-4 h-4" />
                0152 122 740 43
              </a>
              <a href="mailto:info@komplettsanierungen-haus-wohnung.de" className="flex items-center justify-center gap-2 hover:text-foreground">
                <Mail className="w-4 h-4" />
                info@komplettsanierungen-haus-wohnung.de
              </a>
            </div>
          </div>

          <Link href="/">
            <Button variant="outline" data-testid="button-back-home">
              Zurück zur Startseite
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
