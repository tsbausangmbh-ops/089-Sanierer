import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Phone, ArrowLeft } from "lucide-react";
import { SeoHead } from "@/components/seo-head";
import { AppointmentBooking } from "@/components/appointment-booking";
import { SiteHeader } from "@/components/site-header";
import { GlobalHero, HeroContent } from "@/components/global-hero";
import { SeoFooter } from "@/components/seo-footer";
import { Breadcrumb } from "@/components/breadcrumb";
import terminHeroImage from "@assets/generated_images/appointment_booking_calendar.webp";

const terminHeroContent: HeroContent = {
  backgroundImage: terminHeroImage,
  badge: "Ihr persönlicher Beratungstermin",
  titleLine1: "Lernen Sie Ihren Projekt-Kurator kennen.",
  titleLine2: "Persönlich. Vor Ort. Unverbindlich.",
  descriptions: ["Exklusive Vor-Ort-Beratung durch Ihren persönlichen Bauleiter.", "Detailliertes Festpreis-Konzept in 48h."],
  strongText: "100% kostenlos – ohne Verpflichtung.",
  ctaText: "Jetzt exklusiven Termin wählen",
  checkmarks: ["98% Weiterempfehlung", "Meisterbetriebe vor Ort", "Festpreis in 48h"],
  dataTestIdPrefix: "termin"
};

export default function TerminPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SeoHead
        title="Sanierung München Termin | Kostenlose Beratung vor Ort"
        description="Sanierung München: Jetzt kostenlosen Beratungstermin buchen. Experte kommt zu Ihnen, Festpreis-Angebot in 48h. Online-Terminbuchung Mo-Fr 8:00-16:30 Uhr."
        keywords="Sanierung München Termin, Beratung Renovierung München, Handwerker Termin buchen, Sanierung Besichtigung kostenlos, Badsanierung München Termin online buchen, Komplettsanierung Beratungstermin München, kostenlose Besichtigung Sanierung München, Handwerker München Termin vereinbaren, Renovierung München Vor-Ort-Termin, Sanierung München Kalender online, Altbausanierung München Experte Termin, Elektrosanierung München Termin anfragen, Heizungssanierung München Beratung vor Ort, 089-Sanierer Terminbuchung, Sanierung München 24h Rückmeldung"
        canonicalPath="/termin"
      />
      <SiteHeader />
      <GlobalHero content={terminHeroContent} />
      <Breadcrumb items={[{ label: "Termin buchen" }]} />

      <main className="flex-1 pb-16">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <AppointmentBooking />

          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p className="mb-2">Alternativ erreichen Sie uns auch telefonisch:</p>
            <a 
              href="tel:+498944438872"
              className="inline-flex items-center gap-2 text-primary font-medium"
            >
              <Phone className="w-4 h-4" />
              089 444438872
            </a>
            <p className="mt-1">Mo-Fr 08:00-16:30 Uhr</p>
          </div>
        </div>
      </main>

      <SeoFooter />
    </div>
  );
}
