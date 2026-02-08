import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SiteHeader } from "@/components/site-header";
import { SeoFooter } from "@/components/seo-footer";
import { InternalLinks, linkSets } from "@/components/internal-links";
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
  Clock,
  Euro,
  Shield,
  Zap,
  Droplets,
  Flame,
  Layers,
  Hammer,
  HelpCircle,
  Phone,
  ArrowRight,
  Building,
  Bath,
  Calculator
} from "lucide-react";
import { GlobalHero, HeroContent } from "@/components/global-hero";
import { ServiceIntro } from "@/components/service-intro";
const hausImg = "/images/energieeffizientes_saniertes_haus.webp";

const hausHeroContent: HeroContent = {
  backgroundImage: hausImg,
  imageAlt: "Haussanierung München – Einfamilienhaus komplett sanieren lassen mit Dach, Fassade, Heizung und Innenausbau vom Generalunternehmer zum Festpreis",
  badge: "Über 45 erfolgreich sanierte Häuser in München",
  titleLine1: "Haussanierung München – Haus renovieren, Altbau sanieren & Modernisierung.",
  titleLine2: "Energetisch & förderfähig. Festpreis ab 1.200€/m².",
  descriptions: ["Ihr persönlicher Bauleiter koordiniert bis zu 22 Gewerke.", "Energetische Modernisierung inklusive Fördermittel-Optimierung."],
  strongText: "Volle Festpreisgarantie ab 1.200€/m².",
  subText: "Für anspruchsvolle Immobilienbesitzer, die Qualität schätzen.",
  ctaText: "Jetzt exklusives Festpreis-Konzept anfordern",
  ctaLink: "/anfrage?service=komplettsanierung",
  checkmarks: ["98% Weiterempfehlung", "5 Jahre Gewährleistung", "KfW-Förderung möglich"],
  dataTestIdPrefix: "haus"
};

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
        title="Haussanierung München ab 1.200€/m² | Komplettsanierung mit Festpreisgarantie"
        description="Haussanierung München: Komplettsanierung ab 1.200€/m² mit Festpreisgarantie. Kernsanierung, Altbausanierung, energetische Sanierung. Alle Gewerke aus einer Hand."
        canonicalPath="/haussanierung"
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Haussanierung München",
          "provider": {"@id": "https://089-sanierer.de/#organization"},
          "areaServed": "München",
          "description": "Professionelle Haussanierung in München"
        }}
        preloadImage={hausImg}
      />
      <SiteHeader />

      <main>
        <GlobalHero content={hausHeroContent} />
        <div className="max-w-7xl mx-auto px-6 pt-3 pb-0">
          <p className="text-xs text-muted-foreground text-right" data-testid="text-last-updated">
            Stand: Februar 2026
          </p>
        </div>

        <ServiceIntro
          headline="Haussanierung München – Ihre Sanierungsfirma für das komplette Haus"
          paragraphs={[
            "Eine Haussanierung ist eines der größten Projekte im Leben eines Eigentümers. Als Generalunternehmer für Sanierungen in München koordinieren wir alle Renovierungsarbeiten aus einer Hand – von der Heizung über Elektrik und Sanitär bis hin zu Dach, Fassade und Innenausbau. Bis zu 22 Gewerke, ein Ansprechpartner, ein Festpreis.",
            "Unser Handwerkerservice in München umfasst zertifizierte Meisterbetriebe für jedes Gewerk. Ob energetische Modernisierung mit KfW-Förderung oder komplette Kernsanierung: Als erfahrene Renovierungsfirma München stehen wir für termingerechte Sanierungsarbeiten mit voller Festpreisgarantie. Ihre Handwerker in München – zuverlässig und transparent."
          ]}
          benefits={["Festpreis ab 1.200€/m²", "KfW-Förderung möglich", "Bis zu 22 Gewerke", "5 Jahre Gewährleistung"]}
        />

        <section className="py-8 lg:py-12 bg-gradient-to-b from-primary/5 to-background">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-lg sm:text-xl md:text-3xl font-bold mb-6">
              Ihr Haus frisst Heizkosten und braucht ständig Reparaturen?
            </h2>
            <div className="prose prose-lg dark:prose-invert max-w-none text-left space-y-4">
              <p className="text-sm sm:text-base text-muted-foreground">
                <strong>Kennen Sie das?</strong> Jedes Jahr eine neue Überraschung: Mal die Heizung, mal das Dach, mal die Fenster. Die Gasrechnung ist ein Alptraum. Im Winter frieren Sie, im Sommer schwitzen Sie. Und bei jedem Problem denken Sie: "Wäre ein Neubau nicht einfacher?"
              </p>
              <p className="text-sm sm:text-base text-muted-foreground">
                <strong>Die bittere Wahrheit:</strong> Ein Neubau in München? 3.500-4.500€ pro Quadratmeter. Dazu Abrisskosten. Dazu monatelange Baugenehmigungsverfahren. Und am Ende haben Sie ein neues Haus – aber keines mit dem Charakter Ihres Altbaus.
              </p>
              <p className="text-sm sm:text-base font-semibold text-foreground">
                <strong>Der klügere Weg:</strong> Eine professionelle Haussanierung für 920-1.500€/m². Sie behalten Ihr Grundstück, Ihren Bestandsschutz, Ihren Charakter. Aber Sie bekommen moderne Technik, niedrige Heizkosten und ein Haus, das wieder Wert hat. Und: Sie können oft KfW-Förderung bis 150.000€ bekommen.
              </p>
              <p className="text-sm sm:text-base text-primary font-semibold">
                <strong>Stellen Sie sich vor:</strong> Nächsten Winter sitzen Sie in Ihrem komplett sanierten Haus. Die Heizkosten sind um 60% gesunken. Keine kalten Wände mehr. Keine Zugluft. Ein Haus, das Ihre Enkel noch erben werden.
              </p>
            </div>
            <div className="mt-8">
              <Link href="/anfrage?service=komplettsanierung">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white min-h-12 px-4 sm:px-6 text-sm sm:text-base font-semibold" data-testid="button-haus-nlp-cta">
                  Ja, ich will mein Haus sanieren lassen
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-4 lg:py-6 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-lg sm:text-xl md:text-3xl font-bold text-center mb-12">
              Unsere Leistungen – Sanierungsarbeiten aus einer Hand
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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-lg sm:text-xl md:text-3xl font-bold text-center mb-12">
              Preisübersicht nach Haustyp – Sanierungen München
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
              Preise für Standardsanierung inkl. aller Renovierungsarbeiten. Kernsanierung ab 1.200€/m².
            </p>
          </div>
        </section>

        <section className="py-4 lg:py-6 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-lg sm:text-xl md:text-3xl font-bold text-center mb-8">
                Warum 089-Sanierer – Ihre Sanierungsfirma München
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6">
                  <Euro className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Festpreisgarantie</h3>
                  <p className="text-muted-foreground text-sm">
                    Der Preis im Angebot ist der Endpreis. Keine Überraschungen bei Ihren Renovierungsarbeiten.
                  </p>
                </div>
                <div className="text-center p-6">
                  <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Sanierung aus einer Hand</h3>
                  <p className="text-muted-foreground text-sm">
                    Als Generalunternehmer Sanierung koordinieren wir alle Gewerke. Sie haben einen festen Kontakt.
                  </p>
                </div>
                <div className="text-center p-6">
                  <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">5 Jahre Garantie</h3>
                  <p className="text-muted-foreground text-sm">
                    Langfristige Gewährleistung auf alle Sanierungsarbeiten und Renovierungen.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-4 lg:py-6 bg-accent/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-lg sm:text-xl md:text-3xl font-bold text-center mb-8 flex items-center justify-center gap-3">
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

        <section className="py-4 lg:py-6 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-lg sm:text-xl md:text-3xl font-bold text-center mb-8">
              Haussanierung München – Kosten und Finanzierung
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-2">Sanierungskosten pro Quadratmeter in München</h3>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Die Kosten für Sanierungen München variieren je nach Umfang zwischen 920€ und 2.500€ pro Quadratmeter. Eine Standardsanierung mit neuer Elektrik, Sanitär, Heizung und Innenausbau liegt bei ca. 1.200€/m². Als erfahrene Renovierungsfirma München bieten wir Kernsanierungen bis auf den Rohbau für 1.800-2.500€/m² – immer noch deutlich günstiger als ein Neubau mit 3.500-4.500€/m².
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">KfW-Förderung und BAFA-Zuschüsse nutzen</h3>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Die KfW bietet für energetische Sanierungen zinsgünstige Kredite bis 150.000€ pro Wohneinheit mit Tilgungszuschüssen von bis zu 45%. Das BAFA bezuschusst den Heizungstausch mit bis zu 70% der förderfähigen Kosten. Wir arbeiten mit zertifizierten Energieberatern zusammen und helfen Ihnen, die maximale Fördersumme zu sichern.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-4 lg:py-6 bg-accent/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-lg sm:text-xl md:text-3xl font-bold text-center mb-8">
              Energetische Haussanierung – Renovierungen München mit Zukunft
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-2">Gebäudeenergiegesetz (GEG) 2026 – Was Eigentümer wissen müssen</h3>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Das GEG verpflichtet Hauseigentümer bei umfassenden Sanierungen zur Einhaltung bestimmter energetischer Mindeststandards. Ab 2026 gelten verschärfte Anforderungen an den Primärenergiebedarf. Wer jetzt saniert, kann die Vorgaben vorausschauend erfüllen und profitiert von deutlich niedrigeren Heizkosten – häufig bis zu 60% Einsparung gegenüber dem unsanierten Zustand.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Wärmedämmung, Fenster und Heizungstausch</h3>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Die drei wichtigsten Maßnahmen der energetischen Sanierung sind Wärmedämmung (Fassade, Dach, Kellerdecke), neue Fenster mit Dreifachverglasung und ein modernes Heizsystem. Eine Wärmepumpe in Kombination mit Photovoltaik senkt die Heizkosten drastisch. Unser Handwerkerservice München plant alle Maßnahmen aufeinander abgestimmt, damit Sie den optimalen Energiestandard erreichen.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-4 lg:py-6 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-lg sm:text-xl md:text-3xl font-bold text-center mb-8">
              Fassadensanierung und Außenarbeiten – Handwerker München
            </h2>
            <div className="max-w-3xl mx-auto">
              <h3 className="font-semibold mb-2">WDVS-Fassadendämmung in München</h3>
              <p className="text-muted-foreground text-sm sm:text-base">
                Ein Wärmedämmverbundsystem (WDVS) ist die effektivste Methode zur Fassadendämmung. In München kostet eine WDVS-Fassadendämmung zwischen 120€ und 220€ pro Quadratmeter Fassadenfläche, je nach Dämmstärke und Material. Die Investition amortisiert sich durch Heizkosteneinsparungen in der Regel innerhalb von 8-12 Jahren und steigert den Immobilienwert nachhaltig.
              </p>
            </div>
          </div>
        </section>

        <section className="py-4 lg:py-6 bg-accent/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-lg sm:text-xl md:text-3xl font-bold text-center mb-8">
              Haussanierung nach Baujahr – Was ist zu beachten?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-2">Häuser der 60er und 70er Jahre sanieren</h3>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Häuser aus den 1960er und 1970er Jahren haben häufig Flachdächer, einschalige Außenwände ohne Dämmung und veraltete Elektro- sowie Sanitärinstallationen. Asbest in Fassadenplatten oder Bodenbelägen muss fachgerecht entfernt werden. Als Innenausbau Firma München übernehmen wir die Komplettsanierung dieser Häuser – mit enormen Energieeinsparungen und der Verwandlung in moderne, komfortable Wohnhäuser.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Häuser der 80er und 90er Jahre modernisieren</h3>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Häuser aus den 1980er und 1990er Jahren haben oft bereits eine Grunddämmung, aber Fenster, Heizungsanlage und Bäder sind nach 30-40 Jahren erneuerungsbedürftig. Der Sanierungsaufwand ist in der Regel geringer als bei älteren Häusern. Typische Maßnahmen sind Fenstertausch, Heizungsmodernisierung, Badsanierung und die Erneuerung der Elektroverteilung.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-6 lg:py-10 bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-7xl">
            <h2 className="text-lg sm:text-xl md:text-3xl font-bold mb-4">
              Ihr Haus verdient eine Komplettsanierung - Sie auch!
            </h2>
            <div className="text-sm sm:text-base opacity-90 mb-4 flex flex-col gap-1">
              <span>Hohe Heizkosten, veraltete Technik, Sanierungsstau?</span>
              <span><strong>Wir lösen alle Probleme - aus einer Hand.</strong></span>
            </div>
            <div className="text-base opacity-80 mb-6 flex flex-col gap-0.5">
              <span>In wenigen Monaten wohnen Sie in Ihrem frisch sanierten Traumhaus.</span>
              <span>Ein Ansprechpartner. Ein Festpreis. Keine Überraschungen.</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/anfrage?service=komplettsanierung" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white min-h-12 px-6 text-sm sm:text-base font-semibold shadow-xl" data-testid="button-anfrage-haus-cta">
                  Ja, ich will mein Haus sanieren lassen
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <a href="tel:+498944438872" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/40 text-white min-h-12 px-6 text-sm sm:text-base">
                  <Phone className="w-4 h-4 mr-2" />
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

      <InternalLinks links={linkSets.fromHaussanierung} />
      <SeoFooter />
    </div>
  );
}
