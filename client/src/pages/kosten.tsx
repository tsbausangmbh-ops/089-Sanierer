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
  Bath,
  HomeIcon,
  Building,
  Hammer,
  Euro,
  CheckCircle,
  Calculator,
  Shield,
  Clock,
  HelpCircle,
  Phone,
  ArrowRight
} from "lucide-react";
import { GlobalHero, HeroContent } from "@/components/global-hero";
import kostenImg from "@assets/generated_images/complete_home_renovation_result.png";

const kostenHeroContent: HeroContent = {
  backgroundImage: kostenImg,
  badge: "Transparente Münchner Marktpreise 2026",
  titleLine1: "Investition in Ihre Immobilie.",
  titleLine2: "Volle Transparenz. Keine Überraschungen.",
  descriptions: ["Detaillierte Leistungsverzeichnisse für volle Kontrolle.", "Festpreisgarantie ohne versteckte Nachforderungen."],
  strongText: "Ihr Investment ist bei uns sicher.",
  subText: "Für anspruchsvolle Eigentümer, die Klarheit schätzen.",
  ctaText: "Jetzt exklusives Festpreis-Konzept anfordern",
  ctaLink: "/anfrage",
  checkmarks: ["98% Weiterempfehlung", "5 Jahre Gewährleistung", "Meisterbetriebe"],
  dataTestIdPrefix: "kosten"
};

const kostenFaqs = [
  {
    frage: "Wie setzt sich der Preis für eine Sanierung zusammen?",
    antwort: "Der Preis hängt von mehreren Faktoren ab: Größe der Fläche, Umfang der Arbeiten, gewählte Materialien und Ausstattungsqualität. Bei uns erhalten Sie nach der kostenlosen Erstberatung ein detailliertes Festpreisangebot, das alle Kosten transparent aufschlüsselt."
  },
  {
    frage: "Was bedeutet Festpreisgarantie?",
    antwort: "Der im Angebot genannte Preis ist der Endpreis. Es gibt keine versteckten Kosten oder Nachforderungen. Sollten während der Sanierung unvorhergesehene Probleme auftreten (z.B. Wasserschaden hinter den Fliesen), besprechen wir das mit Ihnen, bevor zusätzliche Kosten entstehen."
  },
  {
    frage: "Wann muss ich bezahlen?",
    antwort: "Wir arbeiten mit einem fairen Zahlungsplan: 30% bei Auftragserteilung, 40% bei Halbzeit und 30% nach Abnahme. So haben Sie Sicherheit während der gesamten Bauphase."
  },
  {
    frage: "Gibt es Fördermittel für Sanierungen in München?",
    antwort: "Ja, besonders für energetische Sanierungen gibt es attraktive Förderprogramme der KfW und BAFA. Auch die Stadt München bietet Zuschüsse für bestimmte Maßnahmen. Wir beraten Sie gerne zu den aktuellen Fördermöglichkeiten."
  },
  {
    frage: "Warum sind Ihre Preise günstiger als bei Einzelhandwerkern?",
    antwort: "Als Generalunternehmer koordinieren wir alle Gewerke effizient. Dadurch gibt es keine Wartezeiten, keine doppelte Anfahrt und optimierte Materialbestellung. Diese Einsparungen geben wir an Sie weiter."
  }
];

const kostenuebersicht = [
  {
    service: "Badsanierung",
    icon: Bath,
    priceFrom: "9.200",
    priceTo: "25.000",
    unit: "pauschal",
    description: "Komplettbad 6-8 m² inkl. aller Arbeiten",
    includes: ["Demontage Altbad", "Fliesen & Sanitär", "Elektro", "Bodengleiche Dusche"]
  },
  {
    service: "Komplettsanierung",
    icon: HomeIcon,
    priceFrom: "920",
    priceTo: "1.600",
    unit: "pro m²",
    description: "Schlüsselfertige Sanierung Wohnung/Haus",
    includes: ["Alle Gewerke", "Festpreisgarantie", "Koordination", "5 Jahre Gewährleistung"]
  },
  {
    service: "Wohnungssanierung",
    icon: Building,
    priceFrom: "800",
    priceTo: "1.400",
    unit: "pro m²",
    description: "Komplettsanierung einer Wohnung",
    includes: ["Elektro & Sanitär", "Böden & Wände", "Küche & Bad", "Malerarbeiten"]
  },
  {
    service: "Kernsanierung",
    icon: Hammer,
    priceFrom: "1.200",
    priceTo: "2.000",
    unit: "pro m²",
    description: "Bis auf die Grundmauern saniert",
    includes: ["Entkernung", "Neue Leitungen", "Neue Wände", "Komplett neu"]
  }
];

export default function Kosten() {
  return (
    <div className="min-h-screen bg-background">
      <SeoHead
        title="Was kostet eine Sanierung in München? Preise 2025 | 089-Sanierer"
        description="Sanierung München Kosten: Badsanierung ab 9.200€, Komplettsanierung ab 920€/m², Kernsanierung ab 1.200€/m². Festpreisgarantie, keine versteckten Kosten."
        canonicalPath="/kosten"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Sanierung München Kosten",
          "description": "Aktuelle Preise für Sanierungen in München 2025"
        }}
      />
      <SiteHeader />

      <main>
        <GlobalHero content={kostenHeroContent} />

        <section className="py-8 lg:py-12 bg-gradient-to-b from-primary/5 to-background">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Haben Sie Angst vor der Kostenfalle Sanierung?
            </h2>
            <div className="prose prose-lg dark:prose-invert max-w-none text-left space-y-4">
              <p className="text-lg text-muted-foreground">
                <strong>Kennen Sie diese Geschichten?</strong> "Der Handwerker hat am Ende das Doppelte verlangt." "Nach drei Wochen kamen immer neue Rechnungen." "Die Sanierung hat mein Budget komplett gesprengt." – Diese Horrorgeschichten machen vielen Eigentümern zu Recht Angst.
              </p>
              <p className="text-lg text-muted-foreground">
                <strong>Das Grundproblem:</strong> Bei den meisten Handwerkern bekommen Sie einen Kostenvoranschlag. Der kann "um bis zu 20%" überschritten werden – legal! Und bei unvorhergesehenen Problemen kommen weitere Nachforderungen. Am Ende wissen Sie nie, was Sie wirklich zahlen.
              </p>
              <p className="text-lg font-semibold text-foreground">
                <strong>Unser Versprechen:</strong> Bei uns gibt es keine Kostenvoranschläge. Sie bekommen einen verbindlichen Festpreis – bevor wir anfangen. Dieser Preis gilt. Punkt. Wenn wir einen versteckten Wasserschaden finden, klären wir das mit Ihnen, bevor zusätzliche Kosten entstehen.
              </p>
              <p className="text-lg text-primary font-semibold">
                <strong>Ihre Sicherheit:</strong> Sie wissen vom ersten Tag an, was Sie zahlen. Sie können planen. Sie können finanzieren. Sie können ruhig schlafen. Und falls doch etwas schiefgeht: 5 Jahre Gewährleistung auf alles.
              </p>
            </div>
            <div className="mt-8">
              <Link href="/anfrage">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white h-14 px-8 text-lg font-semibold" data-testid="button-kosten-nlp-cta">
                  Ja, ich will meinen Festpreis erfahren
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-4 lg:py-6 bg-background">
          <div className="max-w-7xl mx-auto px-24">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              Aktuelle Preise 2026
            </h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-7xl mx-auto">
              {kostenuebersicht.map((item) => (
                <Card key={item.service} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <item.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold">{item.service}</h3>
                        <p className="text-muted-foreground text-sm">{item.description}</p>
                      </div>
                    </div>
                    <div className="bg-accent/50 rounded-lg p-4 mb-4">
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-bold text-primary">{item.priceFrom}€</span>
                        <span className="text-muted-foreground">-</span>
                        <span className="text-2xl font-semibold text-foreground">{item.priceTo}€</span>
                        <span className="text-muted-foreground ml-1">{item.unit}</span>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {item.includes.map((inc) => (
                        <li key={inc} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-4 lg:py-6 bg-accent/30">
          <div className="max-w-7xl mx-auto px-24">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
                Warum Festpreise?
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6">
                  <Euro className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Keine Nachforderungen</h3>
                  <p className="text-muted-foreground text-sm">
                    Der genannte Preis ist der Endpreis. Garantiert.
                  </p>
                </div>
                <div className="text-center p-6">
                  <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Planungssicherheit</h3>
                  <p className="text-muted-foreground text-sm">
                    Sie wissen vorher genau, was Sie bezahlen.
                  </p>
                </div>
                <div className="text-center p-6">
                  <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Verbindlicher Zeitrahmen</h3>
                  <p className="text-muted-foreground text-sm">
                    Fester Termin für Fertigstellung.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-4 lg:py-6 bg-background">
          <div className="max-w-7xl mx-auto px-24">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 flex items-center justify-center gap-3">
                <HelpCircle className="w-8 h-8 text-primary" />
                Häufige Fragen zu Kosten
              </h2>
              <Accordion type="single" collapsible className="w-full">
                {kostenFaqs.map((faq, index) => (
                  <AccordionItem key={index} value={`faq-${index}`}>
                    <AccordionTrigger className="text-left" data-testid={`faq-kosten-${index}`}>
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
              Schluss mit der Unsicherheit bei Sanierungskosten!
            </h2>
            <div className="text-lg opacity-90 mb-4 flex flex-col gap-1">
              <span>Angst vor versteckten Kosten und bösen Überraschungen?</span>
              <span><strong>Bei uns bekommen Sie einen Festpreis - garantiert.</strong></span>
            </div>
            <div className="text-base opacity-80 mb-6 flex flex-col gap-0.5">
              <span>Der Preis im Angebot ist der Endpreis. Ohne Wenn und Aber.</span>
              <span>Transparent. Verbindlich. Fair.</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/anfrage">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white h-14 px-8 text-lg font-semibold shadow-xl" data-testid="button-anfrage-cta">
                  Ja, ich will einen Festpreis
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <a href="tel:+498944438872">
                <Button size="lg" variant="outline" className="border-white/40 text-white h-14 px-6">
                  <Phone className="w-5 h-5 mr-2" />
                  Kosten klären - Jetzt anrufen
                </Button>
              </a>
            </div>
            <p className="mt-6 text-sm opacity-70">
              100% kostenlos. Festpreisangebot in 24 Stunden. Keine versteckten Kosten.
            </p>
          </div>
        </section>
      </main>

      <SeoFooter />
    </div>
  );
}
