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
  Hammer,
  CheckCircle,
  Phone,
  ArrowRight,
  Clock,
  Euro,
  Shield,
  Zap,
  Droplets,
  Flame,
  Building2,
  HardHat,
  HelpCircle,
  BadgeCheck
} from "lucide-react";

import kernImg from "@assets/generated_images/house_old_vs_new_clear_split.png";

const kernsanierungPhasen = [
  { 
    phase: 1, 
    title: "Entkernung", 
    description: "Rückbau bis auf den Rohbau. Alle alten Installationen werden entfernt." 
  },
  { 
    phase: 2, 
    title: "Rohbauarbeiten", 
    description: "Statische Anpassungen, neue Grundrisse, Wanddurchbrüche." 
  },
  { 
    phase: 3, 
    title: "Haustechnik", 
    description: "Komplett neue Elektrik, Sanitär und Heizung nach aktuellen Standards." 
  },
  { 
    phase: 4, 
    title: "Ausbau", 
    description: "Trockenbau, Estrich, Dämmung, Fenster und Türen." 
  },
  { 
    phase: 5, 
    title: "Innenausbau", 
    description: "Fliesen, Böden, Malerarbeiten, Sanitärobjekte, Küche." 
  }
];

const wasIstInklusive = [
  "Entkernung und Entsorgung",
  "Neue Elektroinstallation komplett",
  "Neue Sanitärleitungen",
  "Neue Heizungsanlage",
  "Dämmung nach EnEV",
  "Neue Fenster und Türen",
  "Fußbodenaufbau mit Estrich",
  "Bodenbeläge nach Wahl",
  "Komplette Bäder",
  "Malerarbeiten",
  "Bauleitung und Koordination",
  "5 Jahre Gewährleistung"
];

const kernFaqs = [
  {
    frage: "Was ist der Unterschied zwischen Kernsanierung und Komplettsanierung?",
    antwort: "Bei einer Kernsanierung wird das Gebäude bis auf die tragenden Wände zurückgebaut - alle Installationen, Böden, nicht-tragenden Wände werden entfernt. Eine Komplettsanierung kann auch bedeuten, dass bestehende Elemente erhalten bleiben. Die Kernsanierung ist umfassender und teurer, aber das Ergebnis entspricht einem Neubau."
  },
  {
    frage: "Wie lange dauert eine Kernsanierung?",
    antwort: "Je nach Größe und Umfang 12-24 Wochen. Eine 100m² Wohnung: ca. 12-14 Wochen. Ein Einfamilienhaus: 16-24 Wochen. Wir nennen Ihnen im Angebot den verbindlichen Zeitrahmen."
  },
  {
    frage: "Bleibt bei einer Kernsanierung wirklich nur der Rohbau?",
    antwort: "Ja, wir entfernen: alle Leitungen (Elektro, Wasser, Heizung), Böden inkl. Estrich, nicht-tragende Wände, Deckenverkleidungen, Fenster und Türen. Erhalten bleiben: tragende Wände, Decken, das Dach. Danach bauen wir komplett neu auf."
  },
  {
    frage: "Ist eine Kernsanierung günstiger als ein Neubau?",
    antwort: "In der Regel ja: Kernsanierung kostet 1.200-2.000€/m², Neubau 3.000-4.000€/m². Außerdem: Bei Bestandsgebäuden gilt oft Bestandsschutz, während für einen Neubau aktuelle Bauvorschriften gelten, die teurer umzusetzen sind."
  },
  {
    frage: "Welche Genehmigungen brauche ich für eine Kernsanierung?",
    antwort: "Für reine Innenarbeiten meist keine. Bei Änderungen an tragenden Wänden, Fenstern oder Fassade ist eine Baugenehmigung nötig. Wir klären das im Vorfeld und übernehmen bei Bedarf die komplette Antragsstellung."
  }
];

export default function Kernsanierung() {
  return (
    <div className="min-h-screen bg-background">
      <SeoHead
        title="Kernsanierung München ab 1.200€/m² | Festpreis | 089-Sanierer"
        description="Kernsanierung München: Komplettsanierung bis auf den Rohbau ab 1.200€/m². Neue Elektrik, Sanitär, Heizung. Festpreisgarantie, 5 Jahre Gewährleistung."
        canonicalPath="/kernsanierung"
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Kernsanierung München",
          "provider": {"@id": "https://089-sanierer.de/#organization"},
          "areaServed": "München",
          "description": "Professionelle Kernsanierung in München"
        }}
      />
      <SiteHeader />

      <main>
        {/* Hero Section - matching homepage style */}
        <section className="relative min-h-[65vh] lg:min-h-[70vh] flex items-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center scale-105"
            style={{ backgroundImage: `url(${kernImg})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-24 pt-16 lg:pt-24 pb-10 lg:pb-16 w-full">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/15 backdrop-blur-md rounded-full text-white text-sm mb-4 border border-white/20">
                <BadgeCheck className="w-4 h-4 text-green-400" />
                <span>20+ Kernsanierungen in München</span>
              </div>
              
              <h1 className="text-3xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                Altbau wird Neubau. <br />
                <span className="text-orange-400">Komplett bis auf Rohbau.</span>
              </h1>
              
              <div className="text-lg lg:text-xl text-white/90 mb-5 max-w-lg flex flex-col gap-0.5">
                <span>Alles raus, alles neu.</span>
                <span>Modernste Haustechnik.</span>
                <strong className="text-white">Ab 1.200€/m² Festpreis.</strong>
              </div>

              <p className="text-white/90 text-sm mb-3 font-medium">
                Günstiger als Neubau, besser als vorher. Ihr Altbau wird zum Traumobjekt.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-5">
                <Link href="/anfrage?service=komplettsanierung">
                  <Button 
                    size="lg" 
                    className="bg-orange-500 hover:bg-orange-600 text-white h-12 px-6 text-base font-semibold shadow-lg animate-pulse hover:animate-none"
                    data-testid="button-anfrage-kern"
                  >
                    Jetzt Kernsanierung planen
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <a href="tel:+498944438872">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="h-12 px-6 text-base border-white/40 text-white backdrop-blur-sm"
                    data-testid="button-phone-kern"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    089 - Anrufen
                  </Button>
                </a>
              </div>

              <div className="flex flex-col gap-1.5 text-white/90 text-sm">
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Neubau-Qualität garantiert</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>5 Jahre Gewährleistung</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>KfW-Förderung möglich</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-4 lg:py-6 bg-background">
          <div className="max-w-7xl mx-auto px-24">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
              Was ist eine Kernsanierung?
            </h2>
            <p className="text-center text-muted-foreground max-w-7xl mx-auto mb-12">
              Bei einer Kernsanierung wird das Gebäude bis auf die tragenden Wände zurückgebaut. 
              Alle Installationen, Böden, Wände und Decken werden erneuert. 
              Das Ergebnis: Ein Altbau mit dem Komfort eines Neubaus.
            </p>
            <div className="max-w-7xl mx-auto">
              <div className="space-y-6">
                {kernsanierungPhasen.map((item) => (
                  <div key={item.phase} className="flex gap-6 items-start">
                    <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0">
                      {item.phase}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-4 lg:py-6 bg-accent/30">
          <div className="max-w-7xl mx-auto px-24">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              Was ist inklusive?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
              {wasIstInklusive.map((item) => (
                <div key={item} className="flex items-center gap-3 p-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-4 lg:py-6 bg-background">
          <div className="max-w-7xl mx-auto px-24">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
                Wann lohnt sich eine Kernsanierung?
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-primary" />
                      Altbau vor 1980
                    </h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>Veraltete Elektrik (keine FI-Schalter)</li>
                      <li>Blei- oder Stahlleitungen</li>
                      <li>Keine/schlechte Dämmung</li>
                      <li>Ineffiziente Heizung</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                      <HardHat className="w-5 h-5 text-primary" />
                      Grundrissänderung gewünscht
                    </h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>Wände sollen versetzt werden</li>
                      <li>Offene Küche gewünscht</li>
                      <li>Zusätzliches Badezimmer</li>
                      <li>Raumaufteilung optimieren</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="py-4 lg:py-6 bg-accent/30">
          <div className="max-w-7xl mx-auto px-24">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 flex items-center justify-center gap-3">
                <HelpCircle className="w-8 h-8 text-primary" />
                Häufige Fragen zur Kernsanierung
              </h2>
              <Accordion type="single" collapsible className="w-full">
                {kernFaqs.map((faq, index) => (
                  <AccordionItem key={index} value={`faq-${index}`}>
                    <AccordionTrigger className="text-left" data-testid={`faq-kern-${index}`}>
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
              Ihr Gebäude hat eine Rundum-Erneuerung verdient!
            </h2>
            <div className="text-lg opacity-90 mb-4 flex flex-col gap-1">
              <span>Marode Leitungen, veraltete Heizung, undichte Fenster?</span>
              <span><strong>Mit einer Kernsanierung starten Sie komplett neu.</strong></span>
            </div>
            <div className="text-base opacity-80 mb-6 flex flex-col gap-0.5">
              <span>Wir koordinieren alle Gewerke - Sie haben nur einen Ansprechpartner.</span>
              <span>Festpreis. Fester Termin. Qualitätsgarantie.</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/anfrage?service=komplettsanierung">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white h-14 px-8 text-lg font-semibold shadow-xl" data-testid="button-anfrage-kern-cta">
                  Ja, ich will komplett neu starten
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <a href="tel:+498944438872">
                <Button size="lg" variant="outline" className="border-white/40 text-white h-14 px-6">
                  <Phone className="w-5 h-5 mr-2" />
                  Erstberatung anfordern
                </Button>
              </a>
            </div>
            <p className="mt-6 text-sm opacity-70">
              100% kostenlos. Wir prüfen vor Ort, ob eine Kernsanierung sinnvoll ist.
            </p>
          </div>
        </section>
      </main>

      <SeoFooter />
    </div>
  );
}
