import { Link, useParams, useLocation } from "wouter";
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
  MapPin,
  CheckCircle,
  Phone,
  ArrowRight,
  Clock,
  Euro,
  Shield,
  Bath,
  Home as HomeIcon,
  Building,
  Hammer,
  HelpCircle
} from "lucide-react";

interface StadtteilData {
  name: string;
  slug: string;
  beschreibung: string;
  besonderheiten: string[];
  altbauAnteil: string;
  typischeObjekte: string[];
}

const stadtteile: Record<string, StadtteilData> = {
  "schwabing": {
    name: "Schwabing",
    slug: "schwabing",
    beschreibung: "Schwabing ist bekannt für seine wunderschönen Altbauten aus der Gründerzeit. Viele Gebäude stammen aus den Jahren 1890-1920 und bieten hohes Sanierungspotenzial mit Stuck, hohen Decken und Parkettböden.",
    besonderheiten: ["Hoher Altbaubestand", "Gründerzeit-Architektur", "Denkmalschutz beachten"],
    altbauAnteil: "ca. 65%",
    typischeObjekte: ["3-5 Zimmer Altbauwohnungen", "Jugendstil-Häuser", "Reihenhäuser"]
  },
  "bogenhausen": {
    name: "Bogenhausen",
    slug: "bogenhausen",
    beschreibung: "Bogenhausen gehört zu den exklusivsten Wohnlagen Münchens. Hier finden sich repräsentative Villen, großzügige Einfamilienhäuser und hochwertige Eigentumswohnungen, die oft aufwendige Sanierungen erfordern.",
    besonderheiten: ["Exklusive Villenlage", "Großzügige Grundstücke", "Hochwertige Sanierungsstandards"],
    altbauAnteil: "ca. 45%",
    typischeObjekte: ["Villen", "Einfamilienhäuser", "Luxus-Eigentumswohnungen"]
  },
  "maxvorstadt": {
    name: "Maxvorstadt",
    slug: "maxvorstadt",
    beschreibung: "Die Maxvorstadt ist das Universitätsviertel Münchens mit vielen denkmalgeschützten Gebäuden. Hier sanieren wir häufig Altbauwohnungen für Studenten, junge Familien und Akademiker.",
    besonderheiten: ["Universitätsnähe", "Viele Denkmalschutz-Objekte", "Kompakte Wohnungsgrößen"],
    altbauAnteil: "ca. 70%",
    typischeObjekte: ["1-3 Zimmer Altbauwohnungen", "WG-geeignete Wohnungen", "Ladenlokale mit Wohnung"]
  },
  "haidhausen": {
    name: "Haidhausen",
    slug: "haidhausen",
    beschreibung: "Das Franzosenviertel in Haidhausen ist geprägt von charmanten Altbauten und einem lebendigen Kiezcharakter. Viele Eigentümer investieren hier in behutsame Sanierungen, die den historischen Charme erhalten.",
    besonderheiten: ["Franzosenviertel", "Lebendiges Viertel", "Historischer Charme"],
    altbauAnteil: "ca. 60%",
    typischeObjekte: ["2-4 Zimmer Altbauwohnungen", "Reihenhäuser", "Gewerbeobjekte"]
  },
  "sendling": {
    name: "Sendling",
    slug: "sendling",
    beschreibung: "Sendling bietet eine Mischung aus Altbau und Nachkriegsbestand. Besonders beliebt ist die Großmarkthallen-Nähe. Hier sanieren wir oft für Familien und Paare, die zentral wohnen möchten.",
    besonderheiten: ["Gemischter Bestand", "Familienfreundlich", "Gute Infrastruktur"],
    altbauAnteil: "ca. 40%",
    typischeObjekte: ["3-4 Zimmer Wohnungen", "Nachkriegsbauten", "Reihenhäuser"]
  },
  "neuhausen": {
    name: "Neuhausen-Nymphenburg",
    slug: "neuhausen",
    beschreibung: "Neuhausen-Nymphenburg ist ein beliebtes Familienviertel mit vielen Altbauten und Grünflächen. Die Nähe zum Nymphenburger Schlosspark macht das Viertel besonders attraktiv.",
    besonderheiten: ["Schlossnähe", "Viele Grünflächen", "Familienfreundlich"],
    altbauAnteil: "ca. 50%",
    typischeObjekte: ["Einfamilienhäuser", "Großzügige Altbauwohnungen", "Villen"]
  },
  "pasing": {
    name: "Pasing",
    slug: "pasing",
    beschreibung: "Pasing hat sich vom ehemaligen Dorf zum beliebten Wohnviertel entwickelt. Hier finden sich viele Einfamilienhäuser und Reihenhäuser aus verschiedenen Epochen mit Sanierungsbedarf.",
    besonderheiten: ["Eigenheime dominieren", "Gute S-Bahn-Anbindung", "Vielfältiger Bestand"],
    altbauAnteil: "ca. 35%",
    typischeObjekte: ["Einfamilienhäuser", "Reihenhäuser", "Doppelhaushälften"]
  },
  "giesing": {
    name: "Giesing",
    slug: "giesing",
    beschreibung: "Giesing ist ein traditionelles Arbeiterviertel mit zunehmender Gentrifizierung. Viele Altbauten werden hier saniert und modernisiert, während der ursprüngliche Charakter erhalten bleibt.",
    besonderheiten: ["Traditionelles Viertel", "Aufstrebende Lage", "Bezahlbare Objekte"],
    altbauAnteil: "ca. 55%",
    typischeObjekte: ["2-3 Zimmer Altbauwohnungen", "Mehrfamilienhäuser", "Gewerbeobjekte"]
  },
  "lehel": {
    name: "Lehel",
    slug: "lehel",
    beschreibung: "Das Lehel ist eines der ältesten Viertel Münchens und liegt zwischen Altstadt und Isar. Die historischen Gebäude erfordern oft besondere Sorgfalt bei der Sanierung.",
    besonderheiten: ["Zentrumsnah", "Historischer Bestand", "Isarnähe"],
    altbauAnteil: "ca. 75%",
    typischeObjekte: ["Historische Stadtvillen", "Altbauwohnungen", "Denkmalgeschützte Objekte"]
  },
  "trudering": {
    name: "Trudering-Riem",
    slug: "trudering",
    beschreibung: "Trudering-Riem bietet viel Grün und ist besonders bei Familien beliebt. Der Stadtteil hat viele Einfamilienhäuser und Reihenhäuser aus den 1950er-70er Jahren, die Kernsanierungen benötigen.",
    besonderheiten: ["Familienfreundlich", "Viel Grün", "Nachkriegsbestand"],
    altbauAnteil: "ca. 25%",
    typischeObjekte: ["Einfamilienhäuser", "Reihenhäuser", "Doppelhaushälften"]
  }
};

const allgemeineLeistungen = [
  { icon: Bath, title: "Badsanierung", preis: "ab 9.200€" },
  { icon: HomeIcon, title: "Komplettsanierung", preis: "ab 920€/m²" },
  { icon: Building, title: "Wohnungssanierung", preis: "ab 800€/m²" },
  { icon: Hammer, title: "Kernsanierung", preis: "ab 1.200€/m²" }
];

interface StadtteilPageProps {
  stadtteil: string;
}

function StadtteilContent({ stadtteil }: StadtteilPageProps) {
  const data = stadtteile[stadtteil];
  
  if (!data) {
    return null;
  }

  const faqs = [
    {
      frage: `Wie lange dauert eine Sanierung in ${data.name}?`,
      antwort: `Die Dauer hängt vom Umfang ab. Eine Badsanierung in ${data.name}: 2-3 Wochen. Eine Komplettsanierung: 6-12 Wochen je nach Größe. Wir nennen Ihnen den genauen Zeitrahmen im Angebot.`
    },
    {
      frage: `Gibt es Besonderheiten bei Altbausanierungen in ${data.name}?`,
      antwort: `${data.name} hat ${data.altbauAnteil} Altbaubestand. ${data.beschreibung.split('.')[0]}. Wir kennen die lokalen Gegebenheiten und arbeiten bei Bedarf eng mit dem Denkmalschutz zusammen.`
    },
    {
      frage: `Kommen Sie auch für kleinere Projekte nach ${data.name}?`,
      antwort: `Ja, wir übernehmen auch einzelne Gewerke wie Badsanierungen oder Bodensanierungen in ${data.name}. Ab einem Auftragsvolumen von 5.000€ sind wir Ihr Partner.`
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SeoHead
        title={`Sanierung ${data.name} München | Festpreis | 089-Sanierer`}
        description={`Sanierung in ${data.name}: Badsanierung, Komplettsanierung, Kernsanierung zum Festpreis. Lokaler Anbieter mit 5 Jahren Gewährleistung. Kostenlose Beratung.`}
        canonicalPath={`/muenchen-${data.slug}`}
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": `Sanierung ${data.name} München`,
          "provider": {"@id": "https://089-sanierer.de/#organization"},
          "areaServed": {
            "@type": "City",
            "name": `München ${data.name}`
          },
          "description": `Professionelle Sanierungsleistungen in München ${data.name}`
        }}
      />
      <SiteHeader />

      <main>
        <section className="py-6 lg:py-8 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
                <MapPin className="w-4 h-4" />
                <span className="text-sm font-medium">München {data.name}</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Sanierung in {data.name}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                {data.beschreibung}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/anfrage">
                  <Button size="lg" data-testid={`button-anfrage-${data.slug}`}>
                    <HomeIcon className="w-5 h-5 mr-2" />
                    Kostenloses Angebot
                  </Button>
                </Link>
                <a href="tel:+498944438872">
                  <Button variant="outline" size="lg" data-testid={`button-phone-${data.slug}`}>
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
              Unsere Leistungen in {data.name}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {allgemeineLeistungen.map((item) => (
                <Card key={item.title}>
                  <CardContent className="p-6 text-center">
                    <item.icon className="w-10 h-10 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-primary font-bold">{item.preis}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-4 lg:py-6 bg-accent/30">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
                Besonderheiten in {data.name}
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-lg mb-4">Stadtteil-Charakteristik</h3>
                  <ul className="space-y-3">
                    {data.besonderheiten.map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span>Altbauanteil: {data.altbauAnteil}</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-4">Typische Objekte</h3>
                  <ul className="space-y-3">
                    {data.typischeObjekte.map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-4 lg:py-6 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
                Ihre Vorteile
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6">
                  <Euro className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Festpreisgarantie</h3>
                  <p className="text-muted-foreground text-sm">
                    Der genannte Preis ist der Endpreis.
                  </p>
                </div>
                <div className="text-center p-6">
                  <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Lokal in München</h3>
                  <p className="text-muted-foreground text-sm">
                    Wir kennen {data.name} und seine Besonderheiten.
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
                Häufige Fragen
              </h2>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`faq-${index}`}>
                    <AccordionTrigger className="text-left" data-testid={`faq-${data.slug}-${index}`}>
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
              Sanierung in {data.name} starten
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Kostenlose Beratung vor Ort in {data.name}. Festpreisangebot innerhalb von 24 Stunden.
            </p>
            <Link href="/anfrage">
              <Button size="lg" variant="secondary" data-testid={`button-anfrage-${data.slug}-cta`}>
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

export default function StadtteilPage() {
  const [location] = useLocation();
  
  // Extract slug safely: remove /muenchen- prefix, trailing slashes, and query params
  let stadtteil = location
    .split('?')[0]           // Remove query parameters
    .replace(/^\/muenchen-/, '')  // Remove /muenchen- prefix
    .replace(/\/$/, '')      // Remove trailing slash
    .toLowerCase()           // Normalize to lowercase
    .trim();
  
  if (!stadtteile[stadtteil]) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Stadtteil nicht gefunden</h1>
          <Link href="/">
            <Button>Zurück zur Startseite</Button>
          </Link>
        </div>
      </div>
    );
  }

  return <StadtteilContent stadtteil={stadtteil} />;
}

export { stadtteile };
