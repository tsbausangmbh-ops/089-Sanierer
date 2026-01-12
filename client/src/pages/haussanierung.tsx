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
  Home as HomeIcon,
  CheckCircle,
  Phone,
  ArrowRight,
  Clock,
  Euro,
  Shield,
  Zap,
  Droplets,
  Flame,
  Layers,
  Hammer,
  HelpCircle
} from "lucide-react";

const hausLeistungen = [
  { icon: Hammer, title: "Kernsanierung", description: "Komplette Erneuerung bis auf Rohbau" },
  { icon: Zap, title: "Elektrik", description: "Neue Leitungen nach aktuellen Standards" },
  { icon: Droplets, title: "Sanitär", description: "Bäder, Küche, Wasserleitungen" },
  { icon: Flame, title: "Heizung", description: "Moderne Heizsysteme, Wärmepumpen" },
  { icon: Layers, title: "Dämmung", description: "Energetische Sanierung, Fassade, Dach" },
  { icon: HomeIcon, title: "Innenausbau", description: "Böden, Wände, Decken, Türen" }
];

const haustypen = [
  { typ: "Reihenhaus", groesse: "100-140 m²", preis: "ab 120.000€", dauer: "10-12 Wochen" },
  { typ: "Doppelhaushälfte", groesse: "120-180 m²", preis: "ab 145.000€", dauer: "12-14 Wochen" },
  { typ: "Einfamilienhaus", groesse: "150-250 m²", preis: "ab 180.000€", dauer: "14-18 Wochen" }
];

const hausFaqs = [
  {
    frage: "Lohnt sich eine Sanierung oder besser Abriss und Neubau?",
    antwort: "In München lohnt sich die Sanierung meist mehr: Grundstückspreise sind extrem hoch, Baurecht oft eingeschränkt. Eine Kernsanierung kostet ca. 1.200-2.000€/m², ein Neubau 3.000-4.000€/m². Wir beraten Sie ehrlich, was in Ihrem Fall sinnvoller ist."
  },
  {
    frage: "Welche Fördermittel gibt es für die Haussanierung?",
    antwort: "Die KfW fördert energetische Sanierungen mit günstigen Krediten und Tilgungszuschüssen bis 150.000€. BAFA bezuschusst Heizungstausch mit bis zu 70%. Wir helfen bei der Antragstellung und maximieren Ihre Förderung."
  },
  {
    frage: "Können wir während der Sanierung im Haus wohnen?",
    antwort: "Bei einer Komplett- oder Kernsanierung ist das nicht möglich. Bei Teilsanierungen (z.B. nur Dach oder nur Bad) kann oft ein Teil des Hauses bewohnt bleiben. Wir besprechen das individuell."
  },
  {
    frage: "Wie gehen Sie mit Altlasten um (Asbest, Blei)?",
    antwort: "Wir lassen vor Beginn eine Schadstoffuntersuchung durchführen. Asbest, Bleirohre oder andere Schadstoffe werden von zertifizierten Fachbetrieben fachgerecht entsorgt. Die Kosten sind im Festpreis enthalten, wenn wir sie vorher identifizieren."
  },
  {
    frage: "Was passiert mit dem Garten während der Bauphase?",
    antwort: "Wir schützen bestehende Bepflanzung so gut wie möglich. Für Materialanlieferung brauchen wir Zufahrt, planen aber gemeinsam mit Ihnen den schonendsten Weg. Nach Abschluss stellen wir beschädigte Rasenflächen wieder her."
  }
];

export default function Haussanierung() {
  return (
    <div className="min-h-screen bg-background">
      <SeoHead
        title="Haussanierung München ab 920€/m² | Festpreis | 089-Sanierer"
        description="Haussanierung München: Komplettsanierung ab 920€/m² mit Festpreisgarantie. Kernsanierung, Altbausanierung, energetische Sanierung. Alle Gewerke aus einer Hand."
        canonicalPath="/haussanierung"
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Haussanierung München",
          "provider": {"@id": "https://089-sanierer.de/#organization"},
          "areaServed": "München",
          "description": "Professionelle Haussanierung in München"
        }}
      />
      <SiteHeader />

      <main>
        <section className="py-6 lg:py-8 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Haussanierung München
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-6">
                Ihr Haus komplett saniert zum Festpreis. 
                Von der Kernsanierung bis zur energetischen Modernisierung.
              </p>
              <div className="flex items-baseline justify-center gap-2 mb-8">
                <span className="text-4xl font-bold text-primary">ab 920€/m²</span>
                <span className="text-muted-foreground">Festpreis</span>
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/anfrage?service=komplettsanierung">
                  <Button size="lg" data-testid="button-anfrage-haus">
                    <HomeIcon className="w-5 h-5 mr-2" />
                    Jetzt Angebot anfordern
                  </Button>
                </Link>
                <a href="tel:+498944438872">
                  <Button variant="outline" size="lg" data-testid="button-phone-haus">
                    <Phone className="w-5 h-5 mr-2" />
                    0152 1227 4043
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="py-4 lg:py-6 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              Unsere Leistungen
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {hausLeistungen.map((item) => (
                <Card key={item.title}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <item.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{item.title}</h3>
                        <p className="text-muted-foreground text-sm">{item.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-4 lg:py-6 bg-accent/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              Preisübersicht nach Haustyp
            </h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {haustypen.map((item) => (
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
            <p className="text-center text-muted-foreground text-sm mt-6">
              Preise für Standardsanierung. Kernsanierung ab 1.200€/m².
            </p>
          </div>
        </section>

        <section className="py-4 lg:py-6 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
                Warum 089-Sanierer für Ihre Haussanierung?
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6">
                  <Euro className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Festpreisgarantie</h3>
                  <p className="text-muted-foreground text-sm">
                    Der Preis im Angebot ist der Endpreis. Keine Überraschungen.
                  </p>
                </div>
                <div className="text-center p-6">
                  <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Ein Ansprechpartner</h3>
                  <p className="text-muted-foreground text-sm">
                    Wir koordinieren alle Gewerke. Sie haben einen festen Kontakt.
                  </p>
                </div>
                <div className="text-center p-6">
                  <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">5 Jahre Garantie</h3>
                  <p className="text-muted-foreground text-sm">
                    Langfristige Gewährleistung auf alle Arbeiten.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-4 lg:py-6 bg-accent/30">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 flex items-center justify-center gap-3">
                <HelpCircle className="w-8 h-8 text-primary" />
                Häufige Fragen zur Haussanierung
              </h2>
              <Accordion type="single" collapsible className="w-full">
                {hausFaqs.map((faq, index) => (
                  <AccordionItem key={index} value={`faq-${index}`}>
                    <AccordionTrigger className="text-left" data-testid={`faq-haus-${index}`}>
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
          <div className="container mx-auto px-4 text-center max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ihr Haus verdient eine Komplettsanierung - Sie auch!
            </h2>
            <div className="text-lg opacity-90 mb-4 flex flex-col gap-1">
              <span>Hohe Heizkosten, veraltete Technik, Sanierungsstau?</span>
              <span><strong>Wir lösen alle Probleme - aus einer Hand.</strong></span>
            </div>
            <div className="text-base opacity-80 mb-6 flex flex-col gap-0.5">
              <span>In wenigen Monaten wohnen Sie in Ihrem frisch sanierten Traumhaus.</span>
              <span>Ein Ansprechpartner. Ein Festpreis. Keine Überraschungen.</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/anfrage?service=komplettsanierung">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white h-14 px-8 text-lg font-semibold shadow-xl" data-testid="button-anfrage-haus-cta">
                  Ja, ich will mein Haus sanieren lassen
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <a href="tel:+498944438872">
                <Button size="lg" variant="outline" className="border-white/40 text-white h-14 px-6">
                  <Phone className="w-5 h-5 mr-2" />
                  Jetzt beraten lassen
                </Button>
              </a>
            </div>
            <p className="mt-6 text-sm opacity-70">
              100% kostenlos. Unverbindlich. Festpreisangebot in 48 Stunden.
            </p>
          </div>
        </section>
      </main>

      <SeoFooter />
    </div>
  );
}
