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
  CheckCircle,
  Phone,
  ArrowRight,
  Clock,
  Euro,
  Shield,
  Droplets,
  Sparkles,
  Users,
  HelpCircle
} from "lucide-react";

import bathroomImg from "@assets/generated_images/modern_bathroom_renovation.png";

const badFeatures = [
  { title: "Bodengleiche Dusche", description: "Modernes Design, barrierefrei" },
  { title: "Hochwertige Fliesen", description: "Große Auswahl, fachgerechte Verlegung" },
  { title: "Moderne Sanitärobjekte", description: "Markenqualität von führenden Herstellern" },
  { title: "LED-Beleuchtung", description: "Stimmungsvolle Lichtkonzepte" },
  { title: "Fußbodenheizung", description: "Auf Wunsch nachrüstbar" },
  { title: "Handtuchheizkörper", description: "Praktisch und stylisch" }
];

const prozessSteps = [
  { step: 1, title: "Beratung", description: "Kostenlose Erstberatung bei Ihnen vor Ort" },
  { step: 2, title: "Planung", description: "3D-Visualisierung Ihres neuen Bades" },
  { step: 3, title: "Festpreis", description: "Verbindliches Angebot ohne Nachforderungen" },
  { step: 4, title: "Umsetzung", description: "Ihr neues Bad in 2-3 Wochen" }
];

const badFaqs = [
  {
    frage: "Wie lange dauert eine Badsanierung?",
    antwort: "Ein Standard-Bad (6-8 m²) sanieren wir in 2-3 Wochen komplett. Bei größeren Bädern oder aufwendigen Umbauten kann es etwas länger dauern. Den genauen Zeitrahmen nennen wir Ihnen im Angebot."
  },
  {
    frage: "Kann ich während der Badsanierung in der Wohnung bleiben?",
    antwort: "Ja, in den meisten Fällen ist das möglich. Wir richten bei Bedarf eine provisorische Dusche ein. Nur bei sehr umfangreichen Arbeiten empfehlen wir, vorübergehend auszuziehen."
  },
  {
    frage: "Was kostet eine bodengleiche Dusche?",
    antwort: "Eine bodengleiche Dusche ist in unseren Standardpaketen ab 9.200€ bereits enthalten. Sie ist nicht nur optisch ansprechend, sondern auch barrierefrei und pflegeleicht."
  },
  {
    frage: "Welche Fliesen empfehlen Sie für das Bad?",
    antwort: "Wir empfehlen großformatige Fliesen (60x60 oder 60x120 cm) für ein modernes, großzügiges Raumgefühl. Bei der Auswahl beraten wir Sie gerne - wir arbeiten mit allen namhaften Herstellern."
  },
  {
    frage: "Ist eine Fußbodenheizung im Bad möglich?",
    antwort: "Ja, wir können eine elektrische Fußbodenheizung nachrüsten. Die Kosten liegen bei ca. 80-120€ pro m². Sie sorgt für warme Füße und hilft, das Bad schneller zu trocknen."
  }
];

export default function Badsanierung() {
  return (
    <div className="min-h-screen bg-background">
      <SeoHead
        title="Badsanierung München ab 9.200€ | Festpreis | 089-Sanierer"
        description="Badsanierung München: Komplett-Bad ab 9.200€ mit Festpreisgarantie. Bodengleiche Dusche, moderne Fliesen, 5 Jahre Gewährleistung. In 2-3 Wochen fertig."
        canonicalPath="/badsanierung"
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Badsanierung München",
          "provider": {"@id": "https://089-sanierer.de/#organization"},
          "areaServed": "München",
          "description": "Professionelle Badsanierung in München ab 9.200€"
        }}
      />
      <SiteHeader />

      <main>
        <section className="py-6 lg:py-8 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                  Badsanierung München
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-6">
                  Ihr Traumbad zum Festpreis. Komplett saniert in 2-3 Wochen, 
                  inklusive bodengleicher Dusche und 5 Jahren Gewährleistung.
                </p>
                <div className="flex items-baseline gap-2 mb-8">
                  <span className="text-4xl font-bold text-primary">ab 9.200€</span>
                  <span className="text-muted-foreground">Festpreis</span>
                </div>
                <div className="flex flex-wrap gap-4">
                  <Link href="/anfrage?service=badsanierung">
                    <Button size="lg" data-testid="button-anfrage-bad">
                      <Bath className="w-5 h-5 mr-2" />
                      Jetzt Angebot anfordern
                    </Button>
                  </Link>
                  <a href="tel:+498944438872">
                    <Button variant="outline" size="lg" data-testid="button-phone-bad">
                      <Phone className="w-5 h-5 mr-2" />
                      0152 1227 4043
                    </Button>
                  </a>
                </div>
              </div>
              <div className="relative">
                <img 
                  src={bathroomImg} 
                  alt="Moderne Badsanierung München" 
                  className="rounded-lg shadow-xl w-full"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-4 lg:py-6 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              Was ist inklusive?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {badFeatures.map((feature) => (
                <div key={feature.title} className="flex items-start gap-3 p-4">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-4 lg:py-6 bg-accent/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              So läuft Ihre Badsanierung ab
            </h2>
            <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {prozessSteps.map((item) => (
                <div key={item.step} className="text-center">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-4 lg:py-6 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
                Ihre Vorteile
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6 text-center">
                    <Euro className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Festpreisgarantie</h3>
                    <p className="text-muted-foreground text-sm">
                      Keine versteckten Kosten, keine Nachforderungen
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">2-3 Wochen</h3>
                    <p className="text-muted-foreground text-sm">
                      Schnelle Fertigstellung, fester Termin
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">5 Jahre Garantie</h3>
                    <p className="text-muted-foreground text-sm">
                      Langfristige Gewährleistung auf alle Arbeiten
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="py-4 lg:py-6 bg-accent/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 flex items-center justify-center gap-3">
                <HelpCircle className="w-8 h-8 text-primary" />
                Häufige Fragen zur Badsanierung
              </h2>
              <Accordion type="single" collapsible className="w-full">
                {badFaqs.map((faq, index) => (
                  <AccordionItem key={index} value={`faq-${index}`}>
                    <AccordionTrigger className="text-left" data-testid={`faq-bad-${index}`}>
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

        <section className="py-4 lg:py-6 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Jetzt Badsanierung starten
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Kostenlose Beratung und verbindliches Festpreisangebot innerhalb von 24 Stunden.
            </p>
            <Link href="/anfrage?service=badsanierung">
              <Button size="lg" variant="secondary" data-testid="button-anfrage-bad-cta">
                Angebot anfordern
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <SeoFooter />
    </div>
  );
}
