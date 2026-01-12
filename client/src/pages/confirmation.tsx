import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  CheckCircle, 
  Phone, 
  Mail, 
  Clock,
  ChevronRight,
  Star,
  Shield,
  Award,
  Users,
  CalendarDays
} from "lucide-react";
import { SeoHead } from "@/components/seo-head";
import { AppointmentBooking } from "@/components/appointment-booking";
import { SiteHeader } from "@/components/site-header";
import { PageHero } from "@/components/page-hero";
import { SeoFooter } from "@/components/seo-footer";
import { Breadcrumb } from "@/components/breadcrumb";
import confirmationHeroImage from "@assets/generated_images/success_confirmation_checkmark.png";

export default function Confirmation() {
  const [showBooking, setShowBooking] = useState(false);
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SeoHead
        title="Anfrage erhalten | 089-Sanierer"
        description="Vielen Dank für Ihre Anfrage. Wir melden uns innerhalb von 24-48 Stunden bei Ihnen."
        noIndex={true}
      />
      <SiteHeader />
      <PageHero 
        title="Anfrage erfolgreich gesendet" 
        subtitle="Wir haben Ihr Problem verstanden und arbeiten bereits an Ihrer Lösung"
        showCta={false}
        compact={true}
        image={confirmationHeroImage}
        imageAlt="Erfolgreiche Bestätigung"
      />
      <Breadcrumb items={[{ label: "Bestätigung" }]} />

      <main className="flex-1 pb-16">
        <div className="max-w-2xl mx-auto px-24 py-8">
          <div className="text-center mb-4">
            <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
            </div>
            
            <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Clock className="w-4 h-4" />
              Erwartete Rückmeldung: Innerhalb von 48 Stunden
            </div>
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

          <Card className="p-5 border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-800 mb-6">
            <div className="flex items-start gap-3">
              <CalendarDays className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-1">Beratungstermin direkt buchen</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Möchten Sie nicht warten? Buchen Sie jetzt einen kostenlosen Beratungstermin.
                </p>
                {!showBooking ? (
                  <Button 
                    onClick={() => setShowBooking(true)}
                    className="bg-amber-500 hover:bg-amber-600 text-black"
                    data-testid="button-show-booking"
                  >
                    <CalendarDays className="w-4 h-4 mr-2" />
                    Jetzt Termin buchen
                  </Button>
                ) : (
                  <div className="mt-4">
                    <AppointmentBooking />
                  </div>
                )}
              </div>
            </div>
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
            <p className="font-medium mb-3 text-center">
              Sie haben Fragen? Rufen Sie uns direkt an:
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <a 
                href="tel:+498944438872" 
                className="inline-flex items-center justify-center gap-2 bg-green-500 text-white px-4 py-2 rounded-md font-medium"
              >
                <Phone className="w-4 h-4" />
                089 444438872
              </a>
              <a 
                href="mailto:info@089-sanierer.de" 
                className="inline-flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground"
              >
                <Mail className="w-4 h-4" />
                info@089-sanierer.de
              </a>
            </div>
          </Card>

          <div className="text-center">
            <Link href="/">
              <Button variant="outline" data-testid="button-back-home">
                Zurück zur Startseite
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <SeoFooter />
    </div>
  );
}
