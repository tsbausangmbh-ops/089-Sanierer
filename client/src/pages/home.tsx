import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import houseBeforeAfter from "@assets/generated_images/house_old_vs_new_clear_split.png";
import kshwLogoWhiteBg from "@assets/favicon-192-whitebg_1765228119332.png";
import { Card, CardContent } from "@/components/ui/card";
import { SiteHeader } from "@/components/site-header";
import { SeoFooter } from "@/components/seo-footer";
import { SeoHead, generateFaqSchema } from "@/components/seo-head";
import { useToast } from "@/hooks/use-toast";

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
  Wrench,
  AlertCircle,
  Users,
  ArrowRight
} from "lucide-react";

const allServices = [
  { id: "komplettsanierung", title: "Komplettsanierung", icon: HomeIcon, description: "Rundum-Sanierung mit Festpreisgarantie – ein Ansprechpartner für Ihr gesamtes Projekt in München." },
  { id: "badsanierung", title: "Badsanierung", icon: Bath, description: "Ihr Traumbad in 2-3 Wochen – barrierefrei, modern & mit 5 Jahren Gewährleistung." },
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
    title: "5 Jahre Gewährleistung",
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

const painPoints = [
  { id: "handwerkersuche", label: "Zuverlässige Handwerker sind schwer zu finden", icon: Users },
  { id: "kosten", label: "Angst vor Kostenexplosion", icon: Euro },
  { id: "zeit", label: "Keine Zeit für die Koordination", icon: Clock },
  { id: "qualitaet", label: "Sorge um Qualität der Arbeit", icon: AlertCircle },
];

const urgencyOptions = [
  { id: "sofort", label: "So schnell wie möglich", sublabel: "Innerhalb der nächsten 4 Wochen" },
  { id: "bald", label: "In den nächsten 1-3 Monaten", sublabel: "Gute Planungszeit" },
  { id: "planung", label: "Ich plane erst mal", sublabel: "Mehr als 3 Monate" },
];

const painPointSolutions: Record<string, string> = {
  handwerkersuche: "Wir haben ein Netzwerk aus 40+ geprüften Fachbetrieben in München. Kein Telefonieren mehr für Sie.",
  kosten: "Festpreisgarantie: Der Preis, den wir nennen, ist der Preis, den Sie zahlen. Keine versteckten Kosten.",
  zeit: "Ein Ansprechpartner koordiniert alles. Sie lehnen sich zurück, wir kümmern uns um den Rest.",
  qualitaet: "5 Jahre Gewährleistung auf alle Arbeiten. 98% unserer Kunden empfehlen uns weiter.",
};

function MiniLeadFunnel() {
  const [step, setStep] = useState(1);
  const [problem, setProblem] = useState("");
  const [urgency, setUrgency] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [, navigate] = useLocation();
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!problem || !urgency || !name || !contact) return;
    
    const isEmail = contact.includes("@");
    const params = new URLSearchParams({
      problem,
      urgency,
      name,
      ...(isEmail ? { email: contact } : { phone: contact }),
    });
    
    toast({
      title: "Fast geschafft!",
      description: "Bitte vervollständigen Sie Ihre Angaben.",
    });
    
    navigate(`/anfrage?${params.toString()}`);
  };

  const progressPercent = (step / 3) * 100;

  return (
    <section className="py-12 lg:py-16 bg-gradient-to-b from-primary/5 to-background">
      <div className="max-w-2xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl lg:text-3xl font-bold mb-3">
            Starten Sie jetzt Ihre Sanierung
          </h2>
          <p className="text-muted-foreground">
            3 kurze Fragen, dann erhalten Sie Ihre persönliche Beratung
          </p>
        </div>

        <Card className="p-6 lg:p-8">
          <div className="mb-6">
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
              <span>Schritt {step} von 3</span>
              <span>{Math.round(progressPercent)}%</span>
            </div>
            <Progress value={progressPercent} className="h-2" />
          </div>

          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">
                  Was bereitet Ihnen aktuell die größten Sorgen?
                </h3>
                <p className="text-sm text-muted-foreground">
                  Wählen Sie Ihre größte Herausforderung
                </p>
              </div>
              <RadioGroup value={problem} onValueChange={setProblem} className="space-y-3">
                {painPoints.map((point) => (
                  <Label
                    key={point.id}
                    htmlFor={`pain-${point.id}`}
                    className={`flex items-center gap-4 p-4 rounded-md border cursor-pointer transition-colors ${
                      problem === point.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover-elevate"
                    }`}
                    data-testid={`radio-pain-${point.id}`}
                  >
                    <RadioGroupItem value={point.id} id={`pain-${point.id}`} />
                    <point.icon className="w-5 h-5 text-primary" />
                    <span className="font-medium">{point.label}</span>
                  </Label>
                ))}
              </RadioGroup>
              {problem && (
                <div className="flex items-start gap-3 p-4 bg-primary/5 rounded-md border border-primary/20">
                  <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-primary">Unsere Lösung für Sie:</p>
                    <p className="text-sm text-muted-foreground">{painPointSolutions[problem]}</p>
                  </div>
                </div>
              )}
              <div className="text-center text-sm text-muted-foreground">
                <Users className="w-4 h-4 inline mr-1" />
                Sie sind nicht allein: <strong>268+ Münchner</strong> hatten dieselben Sorgen
              </div>
              <Button
                onClick={() => setStep(2)}
                disabled={!problem}
                className="w-full"
                size="lg"
                data-testid="button-funnel-step1"
              >
                Weiter
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">
                  Wie dringend ist Ihr Projekt?
                </h3>
                <p className="text-sm text-muted-foreground">
                  Je früher Sie anfragen, desto schneller können wir Ihnen helfen
                </p>
              </div>
              <RadioGroup value={urgency} onValueChange={setUrgency} className="space-y-3">
                {urgencyOptions.map((option) => (
                  <Label
                    key={option.id}
                    htmlFor={`urgency-${option.id}`}
                    className={`flex items-center gap-4 p-4 rounded-md border cursor-pointer transition-colors ${
                      urgency === option.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover-elevate"
                    }`}
                    data-testid={`radio-urgency-${option.id}`}
                  >
                    <RadioGroupItem value={option.id} id={`urgency-${option.id}`} />
                    <div>
                      <span className="font-medium block">{option.label}</span>
                      <span className="text-sm text-muted-foreground">{option.sublabel}</span>
                    </div>
                  </Label>
                ))}
              </RadioGroup>
              {urgency === "sofort" && (
                <div className="flex items-start gap-3 p-4 bg-orange-500/10 rounded-md border border-orange-500/20">
                  <Clock className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                  <p className="text-sm">
                    <strong>Eilig?</strong> Wir haben aktuell Kapazitäten frei und können sofort starten.
                  </p>
                </div>
              )}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="flex-1"
                  data-testid="button-funnel-back2"
                >
                  Zurück
                </Button>
                <Button
                  onClick={() => setStep(3)}
                  disabled={!urgency}
                  className="flex-1"
                  size="lg"
                  data-testid="button-funnel-step2"
                >
                  Weiter
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">
                  Wie können wir Sie erreichen?
                </h3>
                <p className="text-sm text-muted-foreground">
                  In 24 Stunden meldet sich Ihr persönlicher Ansprechpartner
                </p>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="funnel-name" className="text-sm font-medium">Ihr Vorname</Label>
                  <Input
                    id="funnel-name"
                    placeholder="z.B. Thomas"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1"
                    data-testid="input-funnel-name"
                  />
                </div>
                <div>
                  <Label htmlFor="funnel-contact" className="text-sm font-medium">Telefon oder E-Mail</Label>
                  <Input
                    id="funnel-contact"
                    placeholder="z.B. 0170 1234567 oder name@email.de"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    className="mt-1"
                    data-testid="input-funnel-contact"
                  />
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-primary/5 rounded-md border border-primary/20">
                <Shield className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  Ihre Daten sind bei uns sicher. Kein Spam, kein Weiterverkauf.
                </p>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setStep(2)}
                  className="flex-1"
                  data-testid="button-funnel-back3"
                >
                  Zurück
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={!name || !contact}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                  size="lg"
                  data-testid="button-funnel-submit"
                >
                  Jetzt Beratung sichern
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </section>
  );
}

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
    answer: "Selbstverständlich: Alle Arbeiten werden mit mindestens 5 Jahren Gewährleistung ausgeführt. Bei Materialien wie Sanitärkeramik, Armaturen oder Heizsystemen gelten zusätzlich die Herstellergarantien. Sollte nach der Sanierung etwas nicht stimmen, sind wir sofort für Sie da.",
  },
  {
    question: "In welchen Stadtteilen von München sind Sie tätig?",
    answer: "Wir sind in ganz München und Umgebung tätig: Pasing, Laim, Sendling, Schwabing, Bogenhausen, Trudering, Neuperlach, Solln, Hadern und alle anderen Stadtteile. Im Umland bedienen wir Dachau, Karlsfeld, Germering, Fürstenfeldbruck, Freising, Starnberg, Garching und weitere Gemeinden.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <SeoHead
        title="Sanierung München | KSHW - Badsanierung, Komplettsanierung ab 920€/m²"
        description="Was kostet eine Sanierung in München? KSHW: Badsanierung ab 9.200€, Komplettsanierung ab 920€/m². 268+ zufriedene Kunden, 5 Jahre Gewährleistung."
        keywords="Sanierung München, Badsanierung München, Komplettsanierung München, Küchensanierung München, KSHW"
        canonicalPath="/"
        schema={generateFaqSchema(faqs)}
      />
      <SiteHeader />

      <main id="main-content">
      <section className="relative pt-16 min-h-[85vh] lg:min-h-[75vh] flex items-center">
        <div className="absolute inset-0 pt-16">
          <img 
            src={houseBeforeAfter} 
            alt="Haussanierung Vorher-Nachher: Links alt und renovierungsbedürftig, rechts komplett saniert"
            className="w-full h-full object-cover"
            loading="eager"
            decoding="async"
            data-testid="img-hero-bathroom"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30 lg:to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 py-12 lg:py-20 w-full">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20">
              <Shield className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium text-white">Im Partnernetzwerk</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight text-white">
              Sanierung München
              <span className="block text-2xl lg:text-3xl font-normal mt-2 text-white/90">
                Ihr Zuhause in sicheren Händen
              </span>
            </h1>
            
            <p className="text-lg lg:text-xl text-white/85 mb-8 leading-relaxed">
              Schluss mit Handwerkersuche und Terminproblemen. <strong className="text-white">Festpreisgarantie</strong>, ein persönlicher Ansprechpartner und <strong className="text-white">5 Jahre Gewährleistung</strong> – das ist KSHW München.
            </p>
            
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-10">
              <Link href="/anfrage">
                <Button size="lg" className="text-lg w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white border-orange-500 shadow-lg" data-testid="button-hero-cta">
                  Kostenlos anfragen
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <a href="tel:+4915212274043">
                <Button size="lg" variant="outline" className="text-lg w-full sm:w-auto bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20">
                  <Phone className="w-5 h-5 mr-2" />
                  0152 122 740 43
                </Button>
              </a>
            </div>
            
            <div className="grid grid-cols-3 gap-4 lg:gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <p className="text-2xl lg:text-3xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs lg:text-sm text-white/70">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background to-transparent h-16 lg:h-24" />
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

      <MiniLeadFunnel />

      <section className="py-10 lg:py-14">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Was möchten Sie in München sanieren lassen?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Von der <strong>Badsanierung</strong> bis zur <strong>Komplettsanierung</strong> – <strong>268+ Münchner Familien</strong> haben uns bereits vertraut. <strong>Festpreis-Garantie, fester Termin, 5 Jahre Gewährleistung.</strong>
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

      <SeoFooter />
      </main>
    </div>
  );
}
