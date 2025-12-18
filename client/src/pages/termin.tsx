import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Home as HomeIcon, Phone, ArrowLeft } from "lucide-react";
import { SeoHead } from "@/components/seo-head";
import { AppointmentBooking } from "@/components/appointment-booking";

export default function TerminPage() {
  return (
    <div className="min-h-screen bg-background">
      <SeoHead
        title="Beratungstermin Sanierung München | Kostenlos buchen"
        description="Wann passt es Ihnen? Buchen Sie jetzt Ihren kostenlosen Beratungstermin online. Persönliche Beratung vor Ort, unverbindliches Festpreis-Angebot."
        keywords="Sanierung Beratungstermin München, kostenlose Bauberatung, Renovierung Termin buchen, Handwerker Termin München"
        canonicalPath="/termin"
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

      <main className="max-w-xl mx-auto px-4 py-8 lg:py-12">
        <Link href="/">
          <Button variant="ghost" size="sm" className="mb-4" data-testid="button-back">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Zurück zur Startseite
          </Button>
        </Link>

        <div className="text-center mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold mb-3">
            Kostenloser Beratungstermin
          </h1>
          <p className="text-muted-foreground">
            Wählen Sie einen passenden Termin für Ihre persönliche Beratung. 
            Unverbindlich und kostenfrei.
          </p>
        </div>

        <AppointmentBooking />

        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p className="mb-2">Alternativ erreichen Sie uns auch telefonisch:</p>
          <a 
            href="tel:+4915212274043"
            className="inline-flex items-center gap-2 text-primary font-medium"
          >
            <Phone className="w-4 h-4" />
            0152 122 740 43
          </a>
          <p className="mt-1">Mo-Fr 08:00-17:00 Uhr</p>
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
