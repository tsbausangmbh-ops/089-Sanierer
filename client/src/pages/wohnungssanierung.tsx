import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SiteHeader } from "@/components/site-header";
import { SeoFooter } from "@/components/seo-footer";
import { SeoHead } from "@/components/seo-head";
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
  Paintbrush
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

export default function Wohnungssanierung() {
  return (
    <div className="min-h-screen bg-background">
      <SeoHead
        title="Wohnungssanierung München ab 800€/m² | Festpreis | KSHW"
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
        <section className="py-16 lg:py-24 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Wohnungssanierung München
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-6">
                Komplettsanierung Ihrer Wohnung zum Festpreis. 
                Alle Gewerke koordiniert aus einer Hand.
              </p>
              <div className="flex items-baseline justify-center gap-2 mb-8">
                <span className="text-4xl font-bold text-primary">ab 800€/m²</span>
                <span className="text-muted-foreground">Festpreis</span>
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/anfrage?service=komplettsanierung">
                  <Button size="lg" data-testid="button-anfrage-wohnung">
                    <Building className="w-5 h-5 mr-2" />
                    Jetzt Angebot anfordern
                  </Button>
                </Link>
                <a href="tel:+4915212274043">
                  <Button variant="outline" size="lg" data-testid="button-phone-wohnung">
                    <Phone className="w-5 h-5 mr-2" />
                    0152 1227 4043
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              Was wir sanieren
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
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

        <section className="py-16 bg-accent/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              Preisübersicht nach Wohnungsgröße
            </h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
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

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
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

        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Jetzt Wohnungssanierung planen
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Kostenlose Beratung und Festpreisangebot innerhalb von 24 Stunden.
            </p>
            <Link href="/anfrage?service=komplettsanierung">
              <Button size="lg" variant="secondary" data-testid="button-anfrage-wohnung-cta">
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
