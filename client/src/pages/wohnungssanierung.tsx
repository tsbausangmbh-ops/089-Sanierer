import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SiteHeader } from "@/components/site-header";
import { SeoFooter } from "@/components/seo-footer";
import { SeoHead } from "@/components/seo-head";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Building,
  CheckCircle,
  Phone,
  ArrowRight,
  Clock,
  Euro,
  Shield,
  Users,
  Zap,
  Droplets,
  Layers,
  Paintbrush,
  HelpCircle
} from "lucide-react";

const leistungen = [
  { icon: Zap, title: "Elektrosanierung", description: "Neue Leitungen, Sicherungskasten, Steckdosen" },
  { icon: Droplets, title: "Sanitärsanierung", description: "Bad, Küche, Wasserleitungen" },
  { icon: Layers, title: "Bodensanierung", description: "Parkett, Fliesen, Vinyl" },
  { icon: Paintbrush, title: "Malerarbeiten", description: "Wände, Decken, Tapeten" }
];

const wohnungstypen = [
  { typ: "1-2 Zimmer Wohnung", groesse: "30-50 m²", preis: "ab 32.000€", dauer: "4-5 Wochen" },
  { typ: "3 Zimmer Wohnung", groesse: "60-80 m²", preis: "ab 56.000€", dauer: "6-8 Wochen" },
  { typ: "4-5 Zimmer Wohnung", groesse: "90-120 m²", preis: "ab 85.000€", dauer: "8-10 Wochen" }
];

const wohnungFaqs = [
  {
    frage: "Muss ich während der Sanierung ausziehen?",
    antwort: "Bei einer Komplettsanierung empfehlen wir den vorübergehenden Auszug. Die Wohnung ist während der Arbeiten nicht bewohnbar. Bei Teilsanierungen (z.B. nur Bad) können Sie oft bleiben."
  },
  {
    frage: "Was ist der Unterschied zwischen Sanierung und Renovierung?",
    antwort: "Eine Renovierung umfasst meist nur oberflächliche Arbeiten (Streichen, Tapezieren). Bei einer Sanierung erneuern wir auch die Substanz: Elektrik, Leitungen, Böden, teils Wände. Das Ergebnis ist nachhaltiger."
  },
  {
    frage: "Brauche ich eine Genehmigung für die Wohnungssanierung?",
    antwort: "Für Innenarbeiten in der Regel nicht. Bei tragenden Wänden oder Fassadenänderungen kann eine Genehmigung nötig sein. Wir klären das im Vorfeld und übernehmen bei Bedarf die Anträge."
  },
  {
    frage: "Wie koordinieren Sie die verschiedenen Handwerker?",
    antwort: "Als Generalunternehmer übernehmen wir die komplette Koordination. Sie haben einen festen Ansprechpartner. Alle Gewerke - Elektriker, Sanitär, Fliesenleger, Maler - werden von uns terminiert und überwacht."
  },
  {
    frage: "Kann ich die Wohnung nach der Sanierung teurer vermieten?",
    antwort: "Ja, eine Komplettsanierung rechtfertigt in München deutlich höhere Mieten. Nach Modernisierung können Sie bis zu 3€/m² mehr verlangen. Die Sanierung refinanziert sich oft innerhalb von 5-8 Jahren."
  }
];

export default function Wohnungssanierung() {
  return (
    <div className="min-h-screen bg-background">
      <SeoHead
        title="Wohnungssanierung München ab 800€/m² | Festpreis | 089-Sanierer"
        description="Wohnungssanierung München: Komplettsanierung ab 800€/m² mit Festpreisgarantie. Alle Gewerke aus einer Hand. Für Eigentümer und Vermieter."
        canonicalPath="/wohnungssanierung"
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Wohnungssanierung München",
          "provider": {"@id": "https://089-sanierer.de/#organization"},
          "areaServed": "München",
          "description": "Professionelle Wohnungssanierung in München"
        }}
      />
      <SiteHeader />

      <main>
        {/* Hero Section - matching homepage style */}
        <section className="relative min-h-[65vh] lg:min-h-[70vh] flex items-center overflow-hidden bg-primary">
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/80" />
          
          <div className="relative z-10 max-w-7xl mx-auto px-24 py-16 lg:py-24 w-full">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/15 backdrop-blur-md rounded-full text-white text-sm mb-4 border border-white/20">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Festpreisgarantie</span>
              </div>
              
              <h1 className="text-3xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                Wohnungssanierung München
              </h1>
              
              <p className="text-lg lg:text-xl text-white/90 mb-5 max-w-lg">
                Komplettsanierung Ihrer Wohnung zum Festpreis. 
                Alle Gewerke koordiniert aus einer Hand.
              </p>
              
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl font-bold text-orange-400">ab 800€/m²</span>
                <span className="text-white/80">Festpreis</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mb-5">
                <Link href="/anfrage?service=komplettsanierung">
                  <Button 
                    size="lg" 
                    className="bg-orange-500 hover:bg-orange-600 text-white h-12 px-6 text-base font-semibold shadow-lg"
                    data-testid="button-anfrage-wohnung"
                  >
                    <Building className="w-5 h-5 mr-2" />
                    Jetzt Angebot anfordern
                  </Button>
                </Link>
                <a href="tel:+498944438872">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="h-12 px-6 text-base border-white/40 text-white backdrop-blur-sm"
                    data-testid="button-phone-wohnung"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    089 - Anrufen
                  </Button>
                </a>
              </div>

              <div className="flex flex-col gap-1.5 text-white/90 text-sm">
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Alle Gewerke aus einer Hand</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>5 Jahre Garantie</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-4 lg:py-6 bg-background">
          <div className="max-w-7xl mx-auto px-24">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              Was wir sanieren
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {leistungen.map((item) => (
                <Card key={item.title}>
                  <CardContent className="p-6 text-center">
                    <item.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-4 lg:py-6 bg-accent/30">
          <div className="max-w-7xl mx-auto px-24">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              Preisübersicht nach Wohnungsgröße
            </h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {wohnungstypen.map((item) => (
                <Card key={item.typ}>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-2">{item.typ}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{item.groesse}</p>
                    <div className="text-2xl font-bold text-primary mb-2">{item.preis}</div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{item.dauer}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-4 lg:py-6 bg-background">
          <div className="max-w-7xl mx-auto px-24">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
                Für Eigentümer und Vermieter
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Für Eigentümer</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Wertsteigerung Ihrer Immobilie</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Moderner Wohnkomfort</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Energetische Optimierung möglich</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Für Vermieter</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Schnelle Neuvermietung</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Höhere Mieteinnahmen</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Steuerliche Vorteile</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-4 lg:py-6 bg-accent/30">
          <div className="max-w-7xl mx-auto px-24">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 flex items-center justify-center gap-3">
                <HelpCircle className="w-8 h-8 text-primary" />
                Häufige Fragen zur Wohnungssanierung
              </h2>
              <Accordion type="single" collapsible className="w-full">
                {wohnungFaqs.map((faq, index) => (
                  <AccordionItem key={index} value={`faq-${index}`}>
                    <AccordionTrigger className="text-left" data-testid={`faq-wohnung-${index}`}>
                      {faq.frage}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.antwort}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        <section className="py-6 lg:py-10 bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground">
          <div className="max-w-7xl mx-auto px-24 text-center max-w-7xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Schluss mit der alten Wohnung - Zeit für Ihr neues Zuhause!
            </h2>
            <div className="text-lg opacity-90 mb-4 flex flex-col gap-1">
              <span>Abgenutzte Böden, veraltete Küche, renovierungsbedürftiges Bad?</span>
              <span><strong>Wir verwandeln Ihre Wohnung komplett.</strong></span>
            </div>
            <div className="text-base opacity-80 mb-6 flex flex-col gap-0.5">
              <span>Ob Eigentümer oder Vermieter - wir haben die passende Lösung.</span>
              <span>Festpreis. Fester Termin. Fertig.</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/anfrage?service=komplettsanierung">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white h-14 px-8 text-lg font-semibold shadow-xl" data-testid="button-anfrage-wohnung-cta">
                  Ja, Wohnung jetzt sanieren lassen
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <a href="tel:+498944438872">
                <Button size="lg" variant="outline" className="border-white/40 text-white h-14 px-6">
                  <Phone className="w-5 h-5 mr-2" />
                  Kostenlos beraten lassen
                </Button>
              </a>
            </div>
            <p className="mt-6 text-sm opacity-70">
              100% kostenlos. Unverbindlich. Antwort in 24 Stunden garantiert.
            </p>
          </div>
        </section>
      </main>

      <SeoFooter />
    </div>
  );
}
