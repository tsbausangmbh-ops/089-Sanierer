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
        {/* Hero Section - matching homepage style */}
        <section className="relative min-h-[65vh] lg:min-h-[70vh] flex items-center overflow-hidden bg-primary">
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/80" />
          
          <div className="relative z-10 max-w-7xl mx-auto px-24 py-16 lg:py-24 w-full">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/15 backdrop-blur-md rounded-full text-white text-sm mb-4 border border-white/20">
                <MapPin className="w-4 h-4 text-orange-400" />
                <span>München {data.name}</span>
              </div>
              
              <h1 className="text-3xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                Sanierung in {data.name}
              </h1>
              
              <p className="text-lg lg:text-xl text-white/90 mb-6 max-w-lg">
                {data.beschreibung}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-5">
                <Link href="/anfrage">
                  <Button 
                    size="lg" 
                    className="bg-orange-500 hover:bg-orange-600 text-white h-12 px-6 text-base font-semibold shadow-lg"
                    data-testid={`button-anfrage-${data.slug}`}
                  >
                    <HomeIcon className="w-5 h-5 mr-2" />
                    Kostenloses Angebot
                  </Button>
                </Link>
                <a href="tel:+498944438872">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="h-12 px-6 text-base border-white/40 text-white backdrop-blur-sm"
                    data-testid={`button-phone-${data.slug}`}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    089 - Anrufen
                  </Button>
                </a>
              </div>

              <div className="flex flex-col gap-1.5 text-white/90 text-sm">
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Lokaler Anbieter</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Festpreisgarantie</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-4 lg:py-6 bg-background">
          <div className="max-w-7xl mx-auto px-24">
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
          <div className="max-w-7xl mx-auto px-24">
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
          <div className="max-w-7xl mx-auto px-24">
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
          <div className="max-w-7xl mx-auto px-24">
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

        <section className="py-6 lg:py-10 bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground">
          <div className="max-w-7xl mx-auto px-24 text-center max-w-7xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {data.name} verdient nur die beste Sanierung!
            </h2>
            <div className="text-lg opacity-90 mb-4 flex flex-col gap-1">
              <span>Wir kennen die Bausubstanz und Besonderheiten in {data.name}.</span>
              <span><strong>Ihr lokaler Partner für hochwertige Sanierungen.</strong></span>
            </div>
            <div className="text-base opacity-80 mb-6 flex flex-col gap-0.5">
              <span>Kurze Wege, schnelle Reaktionszeiten, persönliche Betreuung.</span>
              <span>Festpreis. Fester Termin. Münchner Qualität.</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/anfrage">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white h-14 px-8 text-lg font-semibold shadow-xl" data-testid={`button-anfrage-${data.slug}-cta`}>
                  Ja, Projekt in {data.name} starten
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <a href="tel:+498944438872">
                <Button size="lg" variant="outline" className="border-white/40 text-white h-14 px-6">
                  <Phone className="w-5 h-5 mr-2" />
                  Lokale Beratung anfordern
                </Button>
              </a>
            </div>
            <p className="mt-6 text-sm opacity-70">
              100% kostenlos. Beratung vor Ort in {data.name}. Festpreisangebot in 24 Stunden.
            </p>
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
