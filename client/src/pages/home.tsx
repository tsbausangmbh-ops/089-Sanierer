import { Link } from "wouter";
import { lazy, Suspense } from "react";
import { Button } from "@/components/ui/button";
import houseBeforeAfter from "@assets/generated_images/house_old_vs_new_clear_split.png";
import kshwLogoWhiteBg from "@assets/favicon-192-whitebg_1765228119332.png";
import { Card } from "@/components/ui/card";
import { SiteHeader } from "@/components/site-header";

const ChatBot = lazy(() => import("@/components/chat-bot").then(m => ({ default: m.ChatBot })));

const headerServices = [
  { id: "komplettsanierung", title: "Komplettsanierung" },
  { id: "badsanierung", title: "Badsanierung" },
  { id: "dachsanierung", title: "Dachsanierung" },
  { id: "energetische-sanierung", title: "Energetische Sanierung" },
];
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  Bath, 
  UtensilsCrossed, 
  Layers, 
  Zap, 
  Flame, 
  Home as HomeIcon,
  Shield,
  Clock,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Star,
  CheckCircle,
  Calculator,
  MessageSquare,
  Hammer,
  Euro,
  Handshake,
  PaintBucket,
  Plug,
  Droplets,
  Thermometer,
  Calendar,
  Wrench
} from "lucide-react";

const allServices = [
  { id: "komplettsanierung", title: "Komplettsanierung", icon: HomeIcon, description: "Rundum-Sanierung mit Festpreisgarantie – ein Ansprechpartner für Ihr gesamtes Projekt in München." },
  { id: "badsanierung", title: "Badsanierung", icon: Bath, description: "Ihr Traumbad in 2-3 Wochen – barrierefrei, modern & mit 2 Jahren Gewährleistung." },
  { id: "kuechensanierung", title: "Küchensanierung", icon: UtensilsCrossed, description: "Professionelle Küchenplanung & Montage – alles aus einer Hand, termingerecht." },
  { id: "bodensanierung", title: "Bodensanierung", icon: Layers, description: "Parkett, Fliesen oder Vinyl – fachgerechte Verlegung durch erfahrene Handwerker." },
  { id: "elektrosanierung", title: "Elektrosanierung", icon: Zap, description: "VDE-konforme Elektroinstallation – Sicherheit für Ihre Familie in München." },
  { id: "heizungssanierung", title: "Heizungssanierung", icon: Flame, description: "Bis zu 40% Heizkosten sparen – mit Wärmepumpe, Gas oder Fernwärme." },
  { id: "energetische-sanierung", title: "Energetische Sanierung", icon: Flame, description: "KfW-Förderung nutzen – wir beraten Sie zu allen Fördermöglichkeiten." },
  { id: "dachsanierung", title: "Dachsanierung", icon: HomeIcon, description: "Dämmung & Neueindeckung – Werterhalt und Energieeinsparung für Ihr Haus." },
];

const processSteps = [
  {
    number: 1,
    title: "Kostenlose Anfrage stellen",
    description: "In nur 2 Minuten ausgefüllt – Sie erhalten eine unverbindliche Kostenschätzung basierend auf 268+ Projekten in München.",
    icon: Calculator,
  },
  {
    number: 2,
    title: "Persönliche Beratung",
    description: "Innerhalb von 24 Stunden meldet sich Ihr persönlicher Ansprechpartner – keine Callcenter, keine Wartezeiten.",
    icon: MessageSquare,
  },
  {
    number: 3,
    title: "Sorgenfrei sanieren",
    description: "Festpreis, fester Termin, volle Gewährleistung – Sie lehnen sich zurück, wir koordinieren alles.",
    icon: Hammer,
  },
];

const benefits = [
  {
    icon: Clock,
    title: "Keine Handwerkersuche mehr",
    description: "Vergessen Sie wochenlanges Telefonieren – wir haben geprüfte Partner für jedes Gewerk sofort verfügbar.",
  },
  {
    icon: Euro,
    title: "Festpreisgarantie",
    description: "Der Preis, den wir nennen, ist der Preis, den Sie zahlen. Keine versteckten Kosten, keine bösen Überraschungen.",
  },
  {
    icon: Shield,
    title: "2 Jahre Gewährleistung",
    description: "Alle Arbeiten mit voller Gewährleistung – wir stehen zu unserer Qualität, auch nach Projektabschluss.",
  },
  {
    icon: CheckCircle,
    title: "Ein Ansprechpartner",
    description: "Sie haben einen festen Projektleiter – bei Fragen sind wir direkt erreichbar, nicht über ein Callcenter.",
  },
];

const stats = [
  { value: "268+", label: "Abgeschlossene Projekte" },
  { value: "20+", label: "Jahre Erfahrung" },
  { value: "98%", label: "Zufriedene Kunden" },
];

const faqs = [
  {
    question: "Was kostet eine Komplettsanierung in München?",
    answer: "Aus unserer Erfahrung mit 268+ Projekten in München: Eine Badsanierung beginnt ab ca. 8.000€, eine Küchensanierung ab ca. 12.000€ und eine Komplettsanierung ab ca. 800€/m². Der genaue Preis hängt von Ihren Wünschen ab – wir erstellen Ihnen eine kostenlose, unverbindliche Kostenschätzung innerhalb von 24 Stunden.",
  },
  {
    question: "Wie lange dauert eine Sanierung in München?",
    answer: "Dank unseres eingespielten Handwerkernetzwerks arbeiten wir schneller als Einzelhandwerker: Badsanierung 2-3 Wochen, Küchensanierung 1-2 Wochen, Komplettsanierung 6-12 Wochen je nach Größe. Wir nennen Ihnen einen verbindlichen Endtermin – und halten ihn.",
  },
  {
    question: "Warum sollte ich KSHW München beauftragen statt einzelne Handwerker?",
    answer: "Sie sparen Zeit, Nerven und oft auch Geld: Statt 5-8 verschiedene Handwerker zu koordinieren, haben Sie einen Ansprechpartner. Wir übernehmen Terminkoordination, Qualitätskontrolle und Gewährleistung. 98% unserer Kunden empfehlen uns weiter – weil alles einfach funktioniert.",
  },
  {
    question: "Sind die Handwerker von KSHW qualifiziert?",
    answer: "Ja, alle unsere Partnerfirmen sind geprüfte Fachbetriebe aus München und Umgebung. Meisterpflichtige Gewerke werden von qualifizierten Handwerkern ausgeführt. Wir arbeiten nur mit Partnern zusammen, die unsere Qualitätsstandards erfüllen – das ist unsere Garantie an Sie.",
  },
  {
    question: "Gibt es eine Garantie auf die Sanierungsarbeiten?",
    answer: "Selbstverständlich: Alle Arbeiten werden mit mindestens 2 Jahren Gewährleistung ausgeführt. Bei Materialien wie Sanitärkeramik, Armaturen oder Heizsystemen gelten zusätzlich die Herstellergarantien. Sollte nach der Sanierung etwas nicht stimmen, sind wir sofort für Sie da.",
  },
  {
    question: "In welchen Stadtteilen von München sind Sie tätig?",
    answer: "Wir sind in ganz München und Umgebung tätig: Pasing, Laim, Sendling, Schwabing, Bogenhausen, Trudering, Neuperlach, Solln, Hadern und alle anderen Stadtteile. Im Umland bedienen wir Dachau, Karlsfeld, Germering, Fürstenfeldbruck, Freising, Starnberg, Garching und weitere Gemeinden.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main id="main-content">
      <section className="relative pt-16">
        <div className="bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 pt-10 lg:pt-14 pb-6 lg:pb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch lg:items-stretch">
              <div className="flex flex-col justify-center">
                <h1 className="text-3xl lg:text-5xl font-bold mb-6 leading-tight">
                  <strong>Sanierung München</strong> – Ihr Zuhause in sicheren Händen seit über 20 Jahren
                </h1>
                <p className="text-lg text-muted-foreground mb-8">
                  <strong>Kennen Sie das?</strong> Wochenlange Handwerkersuche, Terminprobleme, unklare Kosten? <strong>Das muss nicht sein.</strong> Seit über 20 Jahren sanieren wir Häuser und Wohnungen in München – mit Festpreisgarantie, einem persönlichen Ansprechpartner und 2 Jahren Gewährleistung. <strong>268+ zufriedene Kunden</strong> vertrauen uns bereits.
                </p>
                <div className="flex flex-col sm:flex-row flex-wrap gap-4">
                  <Link href="/gewerke">
                    <Button size="lg" className="text-lg w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white border-orange-500" data-testid="button-hero-cta">
                      Handwerker-Vermittlung
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                  <a href="tel:+4915212274043">
                    <Button size="lg" className="text-lg w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white border-green-500">
                      <Phone className="w-5 h-5 mr-2" />
                      0152 122 740 43
                    </Button>
                  </a>
                </div>
              </div>
              <div className="relative h-full">
                <div className="w-full h-full overflow-hidden rounded-lg shadow-2xl">
                  <img 
                    src={houseBeforeAfter} 
                    alt="Haussanierung Vorher-Nachher: Links alt und renovierungsbedürftig, rechts komplett saniert"
                    className="w-full h-full object-cover object-center"
                    data-testid="img-hero-bathroom"
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
              <div className="flex items-center gap-4 p-5 bg-white dark:bg-card rounded-lg border">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <div>
                  <p className="font-semibold text-lg">Hervorragend bewertet</p>
                  <p className="text-sm text-muted-foreground">Basierend auf 98 Kundenbewertungen</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-5 bg-white dark:bg-card rounded-lg border">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-bold text-xl">268+</p>
                  <p className="text-sm text-muted-foreground">Projekte erfolgreich abgeschlossen</p>
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-2">
              „Full Service" Baubetreuung und Schlüsselfertige Koordination von Partnerfirmen (Meisterpflichtige Gewerke werden von unseren Partnerfirmen ausgeführt)
            </p>
          </div>
        </div>
      </section>

      <section className="py-8 bg-primary">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-8 text-sm">
            <span className="font-medium text-white">Unsere Markenpartner:</span>
            <span className="text-white/80">Villeroy & Boch</span>
            <span className="text-white/80">Hansgrohe</span>
            <span className="text-white/80">Dornbracht</span>
            <span className="text-white/80">Gira</span>
            <span className="text-white/80">Geberit</span>
            <span className="text-white/80">Duravit</span>
            <span className="text-white/80">Ideal Standard</span>
          </div>
        </div>
      </section>

      <section className="py-10 lg:py-14">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Was möchten Sie in München sanieren lassen?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Von der <strong>Badsanierung</strong> bis zur <strong>Komplettsanierung</strong> – <strong>268+ Münchner Familien</strong> haben uns bereits vertraut. <strong>Festpreis-Garantie, fester Termin, 2 Jahre Gewährleistung.</strong>
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {allServices.map((service) => (
              <Link key={service.id} href={`/anfrage?service=${service.id}`}>
                <Card 
                  className="p-6 text-center cursor-pointer hover-elevate transition-transform hover:-translate-y-1 h-full"
                  data-testid={`card-service-${service.id}`}
                >
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <service.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-sm mb-2">{service.title}</h3>
                  <p className="text-xs text-muted-foreground">{service.description}</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 lg:py-14 bg-card">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Wie läuft eine Sanierung mit KSHW München ab?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              <strong>Transparent, planbar, sicher:</strong> Während andere Anbieter wochenlang auf Angebote warten lassen, erhalten Sie bei uns <strong>innerhalb von 24 Stunden</strong> Ihre persönliche Kostenschätzung.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {processSteps.map((step) => (
              <div key={step.number} className="text-center">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <step.icon className="w-10 h-10 text-primary" />
                </div>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                    {step.number}
                  </span>
                  <h3 className="text-xl font-bold">{step.title}</h3>
                </div>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="https://app.acuityscheduling.com/schedule.php?owner=37431138" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="text-lg bg-yellow-500 hover:bg-yellow-600 text-black border-yellow-500" data-testid="button-process-booking">
                <Calendar className="w-5 h-5 mr-2" />
                24 Std. Online Termin
              </Button>
            </a>
            <Link href="/anfrage">
              <Button size="lg" className="text-lg" data-testid="button-process-cta">
                Zum Anfrageformular
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-10 lg:py-14">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Was macht KSHW München so vertrauenswürdig?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              <strong>268+ erfolgreiche Projekte, 98% Weiterempfehlung, 20+ Jahre Erfahrung</strong> – wir geben Ihnen schriftliche Garantien, die andere nicht bieten:
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 lg:py-14 bg-card">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Handshake className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Brauchen Sie nur einen <strong>Handwerker in München</strong>?
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Sie brauchen nur einen <strong>Maler, Elektriker oder Fliesenleger</strong>? Kein Problem – wir vermitteln Ihnen <strong>geprüfte Fachbetriebe</strong> aus München. Alle Partner sind von uns persönlich ausgewählt und liefern nachweislich Qualitätsarbeit.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <Link href="/gewerke?trade=maler">
              <Card className="p-4 text-center hover-elevate cursor-pointer" data-testid="card-trade-maler">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                  <PaintBucket className="w-5 h-5 text-primary" />
                </div>
                <p className="text-sm font-medium">Maler</p>
              </Card>
            </Link>
            <Link href="/gewerke?trade=elektriker">
              <Card className="p-4 text-center hover-elevate cursor-pointer" data-testid="card-trade-elektriker">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                  <Plug className="w-5 h-5 text-primary" />
                </div>
                <p className="text-sm font-medium">Elektriker</p>
              </Card>
            </Link>
            <Link href="/gewerke?trade=sanitaer">
              <Card className="p-4 text-center hover-elevate cursor-pointer" data-testid="card-trade-sanitaer">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                  <Droplets className="w-5 h-5 text-primary" />
                </div>
                <p className="text-sm font-medium">Sanitär</p>
              </Card>
            </Link>
            <Link href="/gewerke?trade=heizung">
              <Card className="p-4 text-center hover-elevate cursor-pointer" data-testid="card-trade-heizung">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                  <Thermometer className="w-5 h-5 text-primary" />
                </div>
                <p className="text-sm font-medium">Heizung</p>
              </Card>
            </Link>
            <Link href="/gewerke?trade=fliesenleger">
              <Card className="p-4 text-center hover-elevate cursor-pointer" data-testid="card-trade-fliesenleger">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                  <Layers className="w-5 h-5 text-primary" />
                </div>
                <p className="text-sm font-medium">Fliesenleger</p>
              </Card>
            </Link>
            <Link href="/gewerke?trade=schreiner">
              <Card className="p-4 text-center hover-elevate cursor-pointer" data-testid="card-trade-schreiner">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                  <Wrench className="w-5 h-5 text-primary" />
                </div>
                <p className="text-sm font-medium">Schreiner</p>
              </Card>
            </Link>
          </div>
          <div className="text-center mt-8">
            <p className="text-muted-foreground mb-4">
              Alle unsere Partnerfirmen sind geprüfte Handwerker aus München und Umgebung mit nachgewiesener Qualität und Zuverlässigkeit.
            </p>
            <Link href="/gewerke">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white border-orange-500" data-testid="button-partner-cta">
                Handwerker-Vermittlung anfragen
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-10 lg:py-14 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Unsere Bilanz: 268+ zufriedene Kunden in München
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-5xl lg:text-6xl font-bold mb-2">{stat.value}</p>
                <p className="text-xl opacity-90">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 lg:py-14">
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Ihre Fragen – unsere ehrlichen Antworten
            </h2>
            <p className="text-lg text-muted-foreground">
              <strong>Was kostet eine Sanierung in München wirklich?</strong> Wie lange dauert es? Aus 268+ Projekten teilen wir echte Erfahrungswerte:
            </p>
          </div>
          <Accordion type="single" collapsible className="w-full space-y-1">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b-0 bg-card rounded-md px-4">
                <AccordionTrigger className="text-left font-semibold py-3">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-3">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="py-10 lg:py-14 bg-card">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Bereit für Ihre Sanierung in München?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            <strong>Kostenlose Erstberatung</strong>, unverbindliches Festpreis-Angebot, <strong>Antwort in 24 Stunden</strong>. Wir sind vor Ort in München, Pasing, Schwabing, Sendling, Dachau, Starnberg und Umgebung.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="https://app.acuityscheduling.com/schedule.php?owner=37431138" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="text-lg bg-yellow-500 hover:bg-yellow-600 text-black border-yellow-500" data-testid="button-cta-booking">
                <Calendar className="w-5 h-5 mr-2" />
                24 Std. Online Termin
              </Button>
            </a>
            <Link href="/anfrage">
              <Button size="lg" className="text-lg px-8" data-testid="button-cta-section">
                Kostenlose Anfrage starten
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-6 lg:py-8">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-bold mb-6 text-center">
            Komplettsanierung München – von Altbau bis Neubau, alles aus einer Hand
          </h2>
          
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
            <p>
              <strong>KSHW München</strong> – Ihr Partner für <strong>Komplettsanierungen in München</strong>. Badsanierung, Küchensanierung, Haussanierung, Dachsanierung und energetische Sanierung aus einer Hand. Kostenlose Beratung, faire Festpreise, Termingarantie.
            </p>

            <div className="grid md:grid-cols-2 gap-4 my-6">
              <div className="bg-muted/30 p-4 rounded-md">
                <h3 className="text-lg font-bold text-foreground mb-2">Das bekommen Sie bei uns</h3>
                <ul className="text-sm space-y-1">
                  <li>Komplettsanierung Haus & Wohnung</li>
                  <li>Badsanierung & Badumbau</li>
                  <li>Küchensanierung & Küchenumbau</li>
                  <li>Dachsanierung & Dachreparatur</li>
                  <li>Energetische Sanierung</li>
                  <li>Bodensanierung & Fliesen</li>
                </ul>
              </div>
              <div className="bg-muted/30 p-4 rounded-md">
                <h3 className="text-lg font-bold text-foreground mb-2">Darum vertrauen uns Münchner</h3>
                <ul className="text-sm space-y-1">
                  <li>Festpreis-Garantie</li>
                  <li>Alle Gewerke aus einer Hand</li>
                  <li>Lokale Münchner Handwerker</li>
                  <li>Schnelle Terminvergabe</li>
                  <li>Kostenlose Vor-Ort-Beratung</li>
                  <li>5 Jahre Gewährleistung</li>
                </ul>
              </div>
            </div>

            </div>

          <div className="text-center mt-8">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="https://app.acuityscheduling.com/schedule.php?owner=37431138" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="text-lg bg-yellow-500 hover:bg-yellow-600 text-black border-yellow-500" data-testid="button-content-booking">
                  <Calendar className="w-5 h-5 mr-2" />
                  24 Std. Online Termin
                </Button>
              </a>
              <Link href="/anfrage">
                <Button size="lg" className="text-lg" data-testid="button-content-cta">
                  Kostenlose Anfrage starten
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              Antwort innerhalb von 48 Stunden
            </p>
          </div>
        </div>
      </section>

      <footer className="pt-12 pb-6 bg-[hsl(220,80%,10%)] text-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src={kshwLogoWhiteBg} alt="KSHW München Logo" className="h-10 w-auto rounded" />
                <div className="flex flex-col">
                  <span className="font-bold text-base leading-tight">Komplettsanierungen</span>
                  <span className="text-xs text-white/70 leading-tight">Haus & Wohnung</span>
                </div>
              </div>
              <p className="text-white/70 text-sm">
                Ihr zuverlässiger Partner für Komplettsanierungen in München und Umgebung.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Kontakt</h4>
              <div className="space-y-2 text-sm text-white/70">
                <a href="tel:+4915212274043" className="flex items-center gap-2 hover:text-white">
                  <Phone className="w-4 h-4" />
                  0152 122 740 43
                </a>
                <a href="mailto:info@komplettsanierungen-haus-wohnung.de" className="flex items-center gap-2 hover:text-white">
                  <Mail className="w-4 h-4" />
                  info@komplettsanierungen-haus-wohnung.de
                </a>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Zielstattstr. 9<br />81379 München</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Mo-Fr: 8:00-17:00 Uhr
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">Leistungen</h4>
              <ul className="space-y-2 text-sm text-white/70">
                {headerServices.map((service) => (
                  <li key={service.id}>
                    <Link href={`/anfrage?service=${service.id}`} className="hover:text-white">
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Rechtliches</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><Link href="/impressum" className="hover:text-white">Impressum</Link></li>
                <li><Link href="/datenschutz" className="hover:text-white">Datenschutz</Link></li>
                <li><Link href="/agb" className="hover:text-white">AGB</Link></li>
                <li><Link href="/cookies" className="hover:text-white">Cookie-Richtlinie</Link></li>
                <li><Link href="/kontakt" className="hover:text-white">Kontakt</Link></li>
                <li><Link href="/faq-preise" className="hover:text-white">FAQ & Preise</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-white/20">
            <h4 className="font-bold mb-2 text-sm">Haus oder Wohnung sanieren in München – Planung, Kosten & Handwerker</h4>
            <p className="text-xs text-white/60 mb-2">
              München Pasing · Allach · Untermenzing · Obermenzing · Aubing · Moosach · Feldmoching · Schwabing · Sendling · Bogenhausen · Haidhausen · Neuhausen · Laim · Nymphenburg · Giesing · Berg am Laim · Trudering · Riem · Milbertshofen · Freimann · Solln · Großhadern · Hadern · Fürstenried · Forstenried · Thalkirchen · Obersendling · Ramersdorf · Perlach · Neuperlach
            </p>
            <p className="text-xs text-white/60">
              Sowie im Münchner Umland: Dachau · Karlsfeld · Germering · Fürstenfeldbruck · Freising · Starnberg · Garching · Unterschleißheim · Oberschleißheim · Ottobrunn · Haar · Gräfelfing · Planegg · Pullach · Grünwald
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-white/20 text-center text-sm text-white/70">
            &copy; {new Date().getFullYear()} <a href="https://komplettsanierungen-haus-wohnung.de" className="hover:text-white underline">komplettsanierungen-haus-wohnung.de</a> - Alle Rechte vorbehalten.
          </div>
        </div>
      </footer>
      </main>

      <Suspense fallback={null}>
        <ChatBot />
      </Suspense>
    </div>
  );
}
