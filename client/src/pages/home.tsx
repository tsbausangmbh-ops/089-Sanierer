import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { SiteHeader } from "@/components/site-header";
import { SeoFooter } from "@/components/seo-footer";
import { InternalLinks, linkSets } from "@/components/internal-links";
import { LazyImage } from "@/components/lazy-image";
import { highlightKeywords, pageKeywords } from "@/lib/highlight";
import { SeoHead, generateCombinedSchema } from "@/components/seo-head";
import { useToast } from "@/hooks/use-toast";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const heroImage = "/images/haus_wohnung_sanierung_hero.webp";
import { GlobalHero, HeroContent } from "@/components/global-hero";

const homeHeroContent: HeroContent = {
  backgroundImage: heroImage,
  imageAlt: "Haus und Wohnung sanieren München – Vorher-Nachher Komplettsanierung mit Festpreisgarantie",
  badge: "Über 150 erfolgreich realisierte Projekte in München",
  titleLine1: "Sanierung München – Komplettsanierung, Renovierung & Modernisierung.",
  titleLine2: "Bis zu 22 Gewerke. Ein Ansprechpartner. Festpreis.",
  descriptions: ["Professionelle Komplettsanierung aus einer Hand.", "Sie entspannen – wir koordinieren."],
  strongText: "Volle Festpreisgarantie ohne versteckte Nachforderungen.",
  subText: "Für anspruchsvolle Immobilienbesitzer in München und Umgebung.",
  ctaText: "Jetzt exklusives Festpreis-Konzept anfordern",
  checkmarks: ["98% Weiterempfehlung", "5 Jahre Gewährleistung", "Meisterbetriebe"],
  dataTestIdPrefix: "hero"
};
const bathroomImg = "/images/moderne_badsanierung.webp";
const kitchenImg = "/images/kuechensanierung_arbeiten.webp";
const floorImg = "/images/parkettboden_sanierung.webp";
const electricImg = "/images/elektrosanierung_installation.webp";
const heatingImg = "/images/heizungsanlage_einbau.webp";
const completeImg = "/images/komplettsanierung_ergebnis.webp";

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
  Users,
  ArrowRight,
  AlertTriangle,
  XCircle,
  Award,
  ThumbsUp,
  Calendar,
  FileCheck,
  HeartHandshake,
  Building,
  Wrench,
  Download,
  Gift,
  Target,
  Heart,
  Sparkles,
  TrendingUp,
  BadgeCheck,
  Timer,
  FileText,
  HelpCircle,
  CircleCheck
} from "lucide-react";

const allServices = [
  { 
    id: "komplettsanierung", 
    title: "Komplettsanierung", 
    icon: HomeIcon, 
    image: completeImg,
    imageAlt: "Komplettsanierung München - Professionelle Altbausanierung mit Festpreisgarantie",
    description: "Rundum-Sanierung aus einer Hand",
    price: "ab 1.200€/m²",
    features: ["Alle Gewerke koordiniert", "Festpreisgarantie", "Ein Ansprechpartner"]
  },
  { 
    id: "badsanierung", 
    title: "Badsanierung", 
    icon: Bath, 
    image: bathroomImg,
    imageAlt: "Badsanierung München - Modernes Badezimmer nach Komplettrenovierung",
    description: "Ihr Traumbad in 2-3 Wochen",
    price: "ab 18.500€",
    features: ["Barrierefreie Optionen", "Moderne Designs", "Sanitär & Fliesen"]
  },
  { 
    id: "kuechensanierung", 
    title: "Küchensanierung", 
    icon: UtensilsCrossed, 
    image: kitchenImg,
    imageAlt: "Küchensanierung München - Fachgerechte Küchenrenovierung mit Elektrik",
    description: "Bauarbeiten für Ihre Traumküche",
    price: "ab 6.500€",
    features: ["Fliesen & Elektrik", "Wasser & Abfluss", "Wanddurchbrüche"]
  },
  { 
    id: "bodensanierung", 
    title: "Bodensanierung", 
    icon: Layers, 
    image: floorImg,
    imageAlt: "Bodensanierung München - Parkett verlegen und Fußbodenheizung einbauen",
    description: "Parkett, Fliesen oder Vinyl",
    price: "ab 65€/m²",
    features: ["Fachgerechte Verlegung", "Untergrundvorbereitung", "Fußbodenheizung"]
  },
  { 
    id: "elektrosanierung", 
    title: "Elektrosanierung", 
    icon: Zap, 
    image: electricImg,
    imageAlt: "Elektrosanierung München - VDE-konforme Elektroinstallation vom Meisterbetrieb",
    description: "VDE-konforme Installation",
    price: "ab 85€/m²",
    features: ["Neue Leitungen", "Smart-Home ready", "Sicherheitstechnik"]
  },
  { 
    id: "heizungssanierung", 
    title: "Heizungssanierung", 
    icon: Flame, 
    image: heatingImg,
    imageAlt: "Heizungssanierung München - Wärmepumpe und Fußbodenheizung Installation",
    description: "Bis zu 40% Heizkosten sparen",
    price: "ab 12.000€",
    features: ["Wärmepumpen", "Fußbodenheizung", "Fördermittelberatung"]
  },
];

const painPoints = [
  { 
    icon: XCircle, 
    title: "Endlose Suche nach Handwerkern",
    description: "Sie rufen an, niemand meldet sich zurück. Wochen vergehen. Die Frustration wächst."
  },
  { 
    icon: Euro, 
    title: "Angst vor Kostenexplosion",
    description: "Ihr Budget wird gesprengt. Nachforderungen kommen. Das Projekt wird zum finanziellen Albtraum."
  },
  { 
    icon: AlertTriangle, 
    title: "Chaos ohne Ende",
    description: "Handwerker kommen nicht, Material fehlt, keiner koordiniert. Ihr Leben steht still."
  },
  { 
    icon: Timer, 
    title: "Monate statt Wochen",
    description: "Die Sanierung zieht sich. Kein Ende in Sicht. Sie fragen sich: War das richtig?"
  },
];

const problemSolutions = [
  {
    question: "Wer koordiniert all die verschiedenen Handwerker?",
    problem: "Sie müssten selbst 5-8 verschiedene Gewerke abstimmen: Elektriker, Fliesenleger, Sanitär, Maler... Wer hat dafür Zeit?",
    solution: "Als Ihr Generalunternehmer übernehmen wir die komplette Koordination. Sie haben einen Ansprechpartner - wir regeln den Rest.",
    keyword: "Generalunternehmer"
  },
  {
    question: "Was passiert, wenn die Kosten explodieren?",
    problem: "Die größte Angst: Am Ende zahlen Sie das Doppelte. Versteckte Kosten, Nachträge, böse Überraschungen.",
    solution: "Unser Festpreisangebot ist verbindlich. Der genannte Preis ist der Endpreis. Punkt. Keine Nachforderungen.",
    keyword: "Festpreis"
  },
  {
    question: "Wie lange dauert eine Badsanierung wirklich?",
    problem: "Ihr Badezimmer ist wochenlang nicht nutzbar. Handwerker kommen und gehen. Kein Ende in Sicht.",
    solution: "Wir nennen Ihnen den genauen Zeitrahmen vorher. Ein Standard-Bad: 2-3 Wochen. Wir halten den Termin.",
    keyword: "Badsanierung"
  },
  {
    question: "Was ist, wenn nach der Sanierung Mängel auftreten?",
    problem: "Der Albtraum: Die Handwerker sind weg, aber Probleme tauchen auf. Keiner fühlt sich zuständig.",
    solution: "5 Jahre Gewährleistung auf alle Arbeiten. Wir stehen zu unserem Wort - auch Jahre später.",
    keyword: "Garantie"
  },
];

const transformations = [
  {
    icon: Handshake,
    title: "Ihr persönlicher Bauleiter",
    description: "Ein fester Ansprechpartner hält Ihnen den Rücken frei und übernimmt die komplette Verantwortung für Ihr Projekt."
  },
  {
    icon: Award,
    title: "Zertifizierte Meisterbetriebe",
    description: "Wir arbeiten ausschließlich mit einem Netzwerk aus geprüften Meisterbetrieben zusammen – für höchste Qualität."
  },
  {
    icon: FileCheck,
    title: "Transparenz als Standard",
    description: "Sie erhalten detaillierte Leistungsverzeichnisse, damit Sie immer die volle Kontrolle über Ihr Investment behalten."
  },
  {
    icon: Clock,
    title: "Wertvolle Lebenszeit zurück",
    description: "Durch die Koordination aller bis zu 22 Gewerke gewinnen Sie wertvolle Lebenszeit zurück. Sie entspannen – wir arbeiten."
  },
];

const stats = [
  { value: "150+", label: "erfolgreich realisierte Projekte", icon: Award },
  { value: "98%", label: "Weiterempfehlungsquote", icon: ThumbsUp },
  { value: "100%", label: "Festpreisgarantie", icon: BadgeCheck },
  { value: "5 Jahre", label: "Gewährleistung", icon: Shield },
];

const processSteps = [
  {
    number: 1,
    title: "Sie beschreiben Ihren Traum",
    description: "2 Minuten genügen. Erzählen Sie uns, was Sie sich wünschen. Wir hören zu.",
    icon: MessageSquare,
    duration: "2 Min"
  },
  {
    number: 2,
    title: "Wir kommen zu Ihnen",
    description: "Innerhalb von 24 Stunden. Kostenlos. Wir schauen uns alles an und beraten Sie.",
    icon: Users,
    duration: "24h"
  },
  {
    number: 3,
    title: "Ihr Festpreis-Angebot",
    description: "Transparent, detailliert, verbindlich. Sie wissen genau, was Sie bekommen.",
    icon: FileCheck,
    duration: "48h"
  },
  {
    number: 4,
    title: "Sie genießen das Ergebnis",
    description: "Wir arbeiten. Sie entspannen. Und am Ende: Ihr Traumzuhause.",
    icon: Sparkles,
    duration: "Ihr Termin"
  },
];

const testimonials = [
  {
    name: "Familie Huber",
    location: "München-Schwabing",
    project: "Komplettsanierung",
    text: "Wir hatten Jahre lang gezögert. Zu viel Angst vor dem Chaos. Aber mit 089-Sanierer war es anders: Ein Anruf, ein Ansprechpartner, null Stress. Heute sitzen wir in unserer Traumwohnung und können es noch immer nicht glauben.",
    rating: 5,
    highlight: "null Stress"
  },
  {
    name: "Dr. Thomas M.",
    location: "Bogenhausen",
    project: "Luxus-Badsanierung",
    text: "Als Chirurg bin ich Präzision gewöhnt. Diese Handwerker haben mich beeindruckt: Pünktlich, sauber, auf den Cent genau wie angeboten. So muss Handwerk sein.",
    rating: 5,
    highlight: "Präzision"
  },
  {
    name: "Hausverwaltung Schmidt",
    location: "Sendling",
    project: "3 Wohnungen",
    text: "Wir verwalten 200 Wohnungen. Seit 4 Jahren arbeiten wir nur noch mit 089-Sanierer. Warum? Weil die Mieter danach glücklich sind. Und wir auch.",
    rating: 5,
    highlight: "seit 4 Jahren"
  },
];

const faqs = [
  {
    question: "Was kostet eine Komplettsanierung in München?",
    answer: "Aus unserer Erfahrung mit 268+ Projekten: Eine Komplettsanierung in München kostet zwischen 1.200€ und 2.300€ pro Quadratmeter. Eine 80m² Wohnung liegt damit zwischen 96.000€ und 184.000€. In Ihrer kostenlosen Beratung erhalten Sie eine genaue Schätzung für Ihr Projekt."
  },
  {
    question: "Was kostet eine Badsanierung in München?",
    answer: "Eine Badsanierung startet bei etwa 18.500€ für ein Komplettbad. Mittelgroße Bäder liegen bei 20.000-28.000€, Luxusbäder bei 35.000€+. Wir erstellen Ihnen ein verbindliches Festpreis-Angebot."
  },
  {
    question: "Wie lange dauert eine Sanierung?",
    answer: "Badsanierung: 2-3 Wochen. Küchenbauarbeiten: 1-2 Wochen. Komplettsanierung: 6-12 Wochen. Wir nennen Ihnen einen verbindlichen Endtermin und halten ihn."
  },
  {
    question: "Was bedeutet Festpreisgarantie?",
    answer: "Der Preis in unserem Angebot ist der Preis, den Sie zahlen. Keine versteckten Kosten, keine Nachforderungen. Ausgenommen sind nur Änderungswünsche Ihrerseits oder dokumentierte Bausubstanzprobleme."
  },
  {
    question: "In welchen Stadtteilen sind Sie tätig?",
    answer: "Wir sind in ganz München und Umgebung tätig: Schwabing, Bogenhausen, Sendling, Pasing, Trudering, Haidhausen und alle anderen Stadtteile. Im Umland: Dachau, Starnberg, Germering, Freising und weitere."
  },
  {
    question: "Gibt es Fördermittel für Sanierungen?",
    answer: "Ja! KfW-Förderung bis 45.000€ pro Wohneinheit, BAFA-Zuschüsse für Heizungsaustausch, Münchner Förderprogramm. Wir beraten Sie kostenlos zu allen Fördermöglichkeiten."
  },
];

const urgencyOptions = [
  { id: "sofort", label: "So schnell wie möglich", sublabel: "In den nächsten 4 Wochen" },
  { id: "bald", label: "In 1-3 Monaten", sublabel: "Gute Planungszeit" },
  { id: "planung", label: "Ich plane erst", sublabel: "Mehr als 3 Monate" },
];

function LeadMagnetSection() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    toast({
      title: "Ratgeber wird gesendet!",
      description: "Prüfen Sie Ihr E-Mail-Postfach.",
    });
  };

  return (
    <section className="py-4 lg:py-6 bg-gradient-to-br from-primary/10 via-primary/5 to-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(var(--primary-rgb),0.08),transparent_50%)]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-6 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 text-orange-600 rounded-full text-sm font-medium mb-6">
              <Gift className="w-4 h-4" />
              <span>Kostenloses Geschenk</span>
            </div>
            
            <h2 className="text-lg sm:text-2xl lg:text-4xl font-bold mb-6 leading-tight">
              Der Ratgeber, der Ihnen <span className="text-primary">tausende Euro</span> spart
            </h2>
            
            <div className="space-y-4 mb-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Die 7 teuersten Fehler</strong> bei Sanierungen und wie Sie sie vermeiden
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Realistische Kostenübersicht</strong> für alle Sanierungsarten in München
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Checkliste Handwerkerauswahl</strong>: Woran Sie seriöse Betriebe erkennen
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Fördermittel-Guide 2025</strong>: Bis zu 70% Zuschüsse sichern
                </p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground italic">
              Über 1.200 Münchner haben diesen Ratgeber bereits heruntergeladen.
            </p>
          </div>

          <Card className="p-8 shadow-xl border-2 border-primary/20">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Kostenloser Sanierungs-Ratgeber</h3>
                  <p className="text-muted-foreground text-sm mt-1">32 Seiten geballtes Expertenwissen</p>
                </div>

                <div>
                  <Label htmlFor="lead-email" className="sr-only">E-Mail</Label>
                  <Input
                    id="lead-email"
                    type="email"
                    placeholder="Ihre E-Mail-Adresse"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12"
                    data-testid="input-lead-email"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs sm:text-sm"
                  disabled={isSubmitting}
                  data-testid="button-download-guide"
                >
                  {isSubmitting ? (
                    "Wird gesendet..."
                  ) : (
                    <>
                      <Download className="w-5 h-5 mr-2" />
                      Jetzt kostenlos herunterladen
                    </>
                  )}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  Kein Spam. Sie können sich jederzeit abmelden.
                </p>
              </form>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Geschafft!</h3>
                <p className="text-muted-foreground mb-6">
                  Der Ratgeber ist auf dem Weg zu Ihnen. Prüfen Sie Ihr Postfach.
                </p>
                <Link href="/anfrage">
                  <Button className="bg-primary hover:bg-primary/90 text-xs sm:text-sm" data-testid="button-after-download-cta">
                    Oder: Jetzt kostenlose Beratung anfragen
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
}

function FunnelForm() {
  const [step, setStep] = useState(1);
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [urgency, setUrgency] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [, navigate] = useLocation();
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!postalCode || !city || !selectedService || !urgency || !firstName || !lastName || !contact || !address) return;
    
    const isEmail = contact.includes("@");
    const params = new URLSearchParams({
      postalCode,
      city,
      address,
      service: selectedService,
      urgency,
      name: `${firstName} ${lastName}`,
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
    <section id="anfrage-form" className="py-4 lg:py-6 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-600 rounded-full text-sm font-medium mb-4">
            <CheckCircle className="w-4 h-4" />
            <span>Über 268 Münchner Familien vertrauen uns bereits</span>
          </div>
          <h2 className="text-lg sm:text-2xl lg:text-4xl font-bold mb-4">
            <span className="text-accent">Stellen Sie sich vor:</span> In 8 Wochen ist Ihre Sanierung abgeschlossen.
          </h2>
          <p className="text-sm sm:text-lg text-muted-foreground max-w-7xl mx-auto mb-2">
            <strong>Kein Handwerker-Chaos.</strong> Kein Budget-Albtraum. Nur Ihr traumhaftes neues Zuhause.
          </p>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
            In nur 2 Minuten erfahren Sie, wie wir das für Sie möglich machen.
          </p>
        </div>

        <Card className="p-6 lg:p-10 shadow-xl border-2">
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
              <span className="font-medium">Schritt {step} von 3</span>
              <span>{Math.round(progressPercent)}%</span>
            </div>
            <Progress value={progressPercent} className="h-3" />
          </div>

          {step === 1 && (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2">
                  Wo entsteht Ihr <span className="text-accent">neues Zuhause</span>?
                </h3>
                <p className="text-muted-foreground">
                  Wir finden das perfekte Handwerker-Team in Ihrer Nähe
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="postal-code" className="text-sm font-medium">PLZ</Label>
                  <Input
                    id="postal-code"
                    placeholder="z.B. 80331"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    maxLength={5}
                    className="mt-1 h-12"
                    data-testid="input-funnel-plz"
                  />
                </div>
                <div>
                  <Label htmlFor="city" className="text-sm font-medium">Stadt</Label>
                  <Input
                    id="city"
                    placeholder="z.B. München"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="mt-1 h-12"
                    data-testid="input-funnel-city"
                  />
                </div>
              </div>
              
              <div className="text-center pt-4">
                <h3 className="text-xl font-bold mb-2">
                  Was wird sich <span className="text-accent">verändern</span>?
                </h3>
              </div>
              <RadioGroup value={selectedService} onValueChange={setSelectedService} className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                {allServices.map((service) => (
                  <Label
                    key={service.id}
                    htmlFor={`service-${service.id}`}
                    className={`flex flex-col items-center gap-2 p-3 sm:p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedService === service.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover-elevate"
                    }`}
                    data-testid={`radio-service-${service.id}`}
                  >
                    <RadioGroupItem value={service.id} id={`service-${service.id}`} className="sr-only" />
                    <service.icon className={`w-8 h-8 ${selectedService === service.id ? 'text-primary' : 'text-muted-foreground'}`} />
                    <span className="font-medium text-center text-sm">{service.title}</span>
                  </Label>
                ))}
              </RadioGroup>
              
              <Button
                onClick={() => setStep(2)}
                disabled={!selectedService || !postalCode || !city}
                className="w-full h-12 text-xs sm:text-sm"
                data-testid="button-funnel-step1"
              >
                Weiter
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2">
                  Wann möchten Sie <span className="text-accent">einziehen</span>?
                </h3>
                <p className="text-muted-foreground">
                  Je früher Sie starten, desto schneller genießen Sie Ihr neues Zuhause
                </p>
              </div>
              <RadioGroup value={urgency} onValueChange={setUrgency} className="space-y-4">
                {urgencyOptions.map((option) => (
                  <Label
                    key={option.id}
                    htmlFor={`urgency-${option.id}`}
                    className={`flex items-center gap-4 p-5 rounded-lg border-2 cursor-pointer transition-all ${
                      urgency === option.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover-elevate"
                    }`}
                    data-testid={`radio-urgency-${option.id}`}
                  >
                    <RadioGroupItem value={option.id} id={`urgency-${option.id}`} />
                    <div>
                      <span className="font-semibold block">{option.label}</span>
                      <span className="text-sm text-muted-foreground">{option.sublabel}</span>
                    </div>
                  </Label>
                ))}
              </RadioGroup>
              
              {urgency === "sofort" && (
                <div className="flex items-start gap-3 p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                  <Sparkles className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <p className="text-sm">
                    <strong>Gute Nachricht:</strong> Wir haben aktuell freie Kapazitäten und können zeitnah starten.
                  </p>
                </div>
              )}
              
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="flex-1 h-12 text-xs sm:text-sm"
                  data-testid="button-funnel-back2"
                >
                  Zurück
                </Button>
                <Button
                  onClick={() => setStep(3)}
                  disabled={!urgency}
                  className="flex-1 h-12 text-xs sm:text-sm"
                  data-testid="button-funnel-step2"
                >
                  Weiter
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2">
                  Fast geschafft! <span className="text-accent">Wer darf sich freuen?</span>
                </h3>
                <p className="text-muted-foreground">
                  Innerhalb von 24 Stunden meldet sich Ihr persönlicher Sanierungsexperte
                </p>
              </div>
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="funnel-firstname" className="text-sm font-medium">Vorname</Label>
                    <Input
                      id="funnel-firstname"
                      placeholder="z.B. Thomas"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="mt-1 h-12"
                      data-testid="input-funnel-firstname"
                    />
                  </div>
                  <div>
                    <Label htmlFor="funnel-lastname" className="text-sm font-medium">Nachname</Label>
                    <Input
                      id="funnel-lastname"
                      placeholder="z.B. Müller"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="mt-1 h-12"
                      data-testid="input-funnel-lastname"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="funnel-contact" className="text-sm font-medium">Telefon oder E-Mail</Label>
                  <Input
                    id="funnel-contact"
                    placeholder="z.B. 0170 1234567"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    className="mt-1 h-12"
                    data-testid="input-funnel-contact"
                  />
                </div>
                <div>
                  <Label htmlFor="funnel-address" className="text-sm font-medium">Straße & Hausnummer</Label>
                  <Input
                    id="funnel-address"
                    placeholder="z.B. Marienplatz 1"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="mt-1 h-12"
                    data-testid="input-funnel-address"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    PLZ/Ort: {postalCode} {city}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
                <Shield className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Ihre Daten sind sicher.</strong> Kein Spam. Kein Weiterverkauf. Versprochen.
                </p>
              </div>
              
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={() => setStep(2)}
                  className="flex-1 h-12 text-xs sm:text-sm"
                  data-testid="button-funnel-back3"
                >
                  Zurück
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={!firstName || !lastName || !contact || !address}
                  className="flex-1 h-12 bg-orange-500 hover:bg-orange-600 text-xs sm:text-sm"
                  data-testid="button-funnel-submit"
                >
                  Kostenlose Beratung sichern
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}
        </Card>

        <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span>100% kostenlos</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span>Unverbindlich</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span>Antwort in 24h</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  // FAQPage schema removed - only on /faq-preise page per Google guidelines
  const combinedSchema = generateCombinedSchema([]);
  
  const scrollToForm = () => {
    document.getElementById('anfrage-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <SeoHead
        title="Sanierung München | Badsanierung ab 18.500€, Komplettsanierung ab 1.200€/m² Festpreis"
        description="Sanierung München 2026: Badsanierung ab 18.500€, Komplettsanierung ab 1.200€/m². Festpreisgarantie, 5 Jahre Gewährleistung. Kostenlose Beratung in 24h."
        keywords="Sanierung München, Sanierungen München, Sanierung aus einer Hand, Wohnungssanierung, Wohnungssanierungen, Wohnungsrenovierung München, Renovierung München, Renovierung, Renovierungen, renovierung aus einer Hand, Handwerker München, Handwerker, Generalunternehmer München, Generalunternehmer, Haussanierung München, Haussanierungen, Haus sanieren lassen, Badsanierung München, Badsanierungen sofort, Innenausbau, Kosten, Angebote, Komplettsanierung München Festpreis, Altbausanierung München"
        canonicalPath="/"
        schema={combinedSchema}
        preloadImage={heroImage}
      />
      
      <div className="min-h-screen bg-background">
        <SiteHeader />

        {/* Hero Section - Clean & Professional */}
        <GlobalHero content={homeHeroContent} scrollToElement={scrollToForm} />
        <div className="max-w-7xl mx-auto px-6 pt-3 pb-0">
          <p className="text-xs text-muted-foreground text-right" data-testid="text-last-updated">
            Stand: Februar 2026
          </p>
        </div>

        {/* Stats Section */}
        <section className="py-4 lg:py-5 bg-primary text-primary-foreground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-base sm:text-xl lg:text-2xl font-bold text-center mb-4">
              Warum Münchner uns vertrauen
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <stat.icon className="w-6 h-6 mx-auto mb-2 opacity-80" />
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold mb-0.5">{stat.value}</div>
                  <div className="text-xs opacity-80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pain Points Section - NLP: Problem-Agitation */}
        <section className="py-6 lg:py-8 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-6">
              <h2 className="text-lg sm:text-2xl lg:text-4xl font-bold mb-4">
                Kennen Sie das Gefühl?
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
                Eine <span className="text-accent font-semibold">Sanierung</span> planen, aber nur an Probleme denken?
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {painPoints.map((point, index) => (
                <Card key={index} className="p-5 bg-background border-destructive/20 hover-elevate">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-destructive/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <point.icon className="w-5 h-5 text-destructive" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">{point.title}</h3>
                      <p className="text-sm text-muted-foreground">{point.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* NLP: Problem-Solver CTA after Pain Points */}
            <div className="mt-8 bg-gradient-to-r from-primary to-primary/80 rounded-xl p-6 lg:p-8 text-center">
              <h3 className="text-base sm:text-xl lg:text-2xl font-bold text-white mb-2">
                Das muss nicht so sein. Wir sind Ihre Problemlöser.
              </h3>
              <p className="text-white/90 mb-4 max-w-xl mx-auto">
                Seit 20 Jahren lösen wir genau diese Probleme für Münchner Familien. 
                <strong> Jeden Tag. Zuverlässig. Zum Festpreis.</strong>
              </p>
              <Button 
                size="lg" 
                onClick={() => document.getElementById('anfrage-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-primary hover:bg-white/90 font-semibold text-xs sm:text-sm"
                data-testid="button-pain-points-cta"
              >
                Jetzt Lösung anfragen - kostenlos
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </section>

        {/* Problem-Solution FAQ Section - NLP: Question-based targeting */}
        <section className="py-6 lg:py-8 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium mb-4">
                <HelpCircle className="w-4 h-4" />
                <span>Ihre Fragen - Unsere Antworten</span>
              </div>
              <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold mb-3">
                Das fragen uns Kunden am häufigsten
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Wir verstehen Ihre Bedenken. Hier sind die ehrlichen Antworten auf die Fragen, 
                die Sie sich bei einer <span className="text-accent font-medium">Renovierung in München</span> stellen.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {problemSolutions.map((item, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="p-5">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <HelpCircle className="w-5 h-5 text-accent" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-base mb-3">{item.question}</h3>
                        
                        <div className="space-y-3">
                          <div className="bg-destructive/5 rounded-lg p-3 border-l-3 border-destructive/30">
                            <div className="flex items-center gap-2 text-destructive font-medium text-sm mb-1">
                              <XCircle className="w-4 h-4" />
                              Problem
                            </div>
                            <p className="text-sm text-muted-foreground">{item.problem}</p>
                          </div>
                          
                          <div className="bg-green-500/5 rounded-lg p-3 border-l-3 border-green-500/50">
                            <div className="flex items-center gap-2 text-green-600 font-medium text-sm mb-1">
                              <CircleCheck className="w-4 h-4" />
                              Lösung
                            </div>
                            <p className="text-sm text-muted-foreground">{item.solution}</p>
                          </div>
                        </div>
                        
                        <div className="mt-3">
                          <span className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">
                            <strong>{item.keyword}</strong>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="text-center mt-8 bg-green-500/10 rounded-xl p-6 border border-green-500/20">
              <p className="text-base sm:text-lg font-semibold text-foreground mb-2">
                Genug gelesen? Handeln Sie jetzt.
              </p>
              <p className="text-muted-foreground mb-4 max-w-lg mx-auto">
                Jede Woche, die Sie warten, kostet Sie Zeit und Nerven. Wir lösen Ihr Problem - 
                <strong className="text-foreground"> heute noch.</strong>
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button 
                  size="lg" 
                  onClick={() => document.getElementById('anfrage-form')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full sm:w-auto min-h-12 bg-green-600 hover:bg-green-700 text-white text-sm sm:text-base"
                  data-testid="button-faq-cta"
                >
                  Ja, ich will mein Problem lösen
                  <ArrowRight className="w-4 h-4 ml-2 flex-shrink-0" />
                </Button>
                <a href="tel:+498944438872" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto min-h-12 text-sm sm:text-base" data-testid="button-faq-phone">
                    <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
                    089 444438872
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Solution Section - NLP: Future Pacing + Transformation */}
        <section className="py-4 lg:py-6 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-600 rounded-full text-sm font-medium mb-4">
                <Target className="w-4 h-4" />
                <span>Die Lösung</span>
              </div>
              <h2 className="text-lg sm:text-2xl lg:text-4xl font-bold mb-4">
                So fühlt sich <span className="text-accent">Sanierung</span> wirklich an
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
                Mit uns an Ihrer Seite wird Ihre Sanierung zum entspannten Erlebnis.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {transformations.map((item, index) => (
                <Card key={index} className="p-6 border-primary/20 hover-elevate">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </Card>
              ))}
            </div>

            {/* NLP: Urgency CTA after Transformation */}
            <div className="mt-8 text-center">
              <p className="text-sm sm:text-base text-muted-foreground mb-4">
                So könnte Ihre Sanierung auch aussehen. Der erste Schritt?
              </p>
              <Button 
                size="lg" 
                onClick={() => document.getElementById('anfrage-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-accent hover:bg-accent/90 min-h-12 px-8 sm:px-10 text-sm sm:text-base"
                data-testid="button-transformation-cta"
              >
                Jetzt Ihr Problem schildern
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </section>

        {/* Lead Magnet Section */}
        <LeadMagnetSection />

        {/* Process Section */}
        <section className="py-4 lg:py-6 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-6">
              <h2 className="text-lg sm:text-2xl lg:text-4xl font-bold mb-4">
                Ihr Weg zum <span className="text-accent">Traumzuhause</span>
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
                In 4 einfachen Schritten von der Idee zur fertigen Sanierung.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {processSteps.map((step, index) => (
                <div key={index} className="relative">
                  <Card className="p-6 h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                        {step.number}
                      </div>
                      <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded">
                        {step.duration}
                      </span>
                    </div>
                    <h3 className="font-bold mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </Card>
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-border" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section - NLP: Social Proof + Emotional Language */}
        <section className="py-4 lg:py-6 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-6">
              <h2 className="text-lg sm:text-2xl lg:text-4xl font-bold mb-4">
                Das sagen unsere <span className="text-accent">Kunden</span>
              </h2>
              <div className="text-sm sm:text-lg text-muted-foreground flex flex-col gap-0.5">
                <span>Echte Erfahrungen.</span>
                <span>Echte Ergebnisse.</span>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 italic">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    </div>
                    <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded">
                      {testimonial.project}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Services Preview */}
        <section className="py-4 lg:py-6 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-6">
              <h2 className="text-lg sm:text-2xl lg:text-4xl font-bold mb-4">
                Unsere <span className="text-accent">Leistungen</span>
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
                Von der kleinen Badrenovierung bis zur kompletten Haussanierung.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allServices.map((service) => (
                <Card key={service.id} className="overflow-hidden group hover-elevate">
                  <div className="relative h-36 sm:h-48">
                    <LazyImage 
                      src={service.image} 
                      alt={service.imageAlt}
                      className="w-full h-full object-cover"
                      width="400"
                      height="192"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-bold text-white">{service.title}</h3>
                      <p className="text-white/80 text-sm">{service.description}</p>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-primary">{service.price}</span>
                      <Link href={`/anfrage?service=${service.id}`}>
                        <Button variant="default" size="sm" className="bg-accent hover:bg-accent/90" data-testid={`button-service-${service.id}`}>
                          Jetzt anfragen
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Funnel Form */}
        <FunnelForm />

        {/* FAQ Section */}
        <section className="py-4 lg:py-6 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-6">
              <h2 className="text-lg sm:text-2xl lg:text-4xl font-bold mb-4">
                Häufige <span className="text-accent">Fragen</span>
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground">
                Alles, was Sie wissen müssen.
              </p>
            </div>
            
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`} className="bg-background rounded-lg border px-6">
                  <AccordionTrigger className="text-left font-semibold hover:no-underline py-4" data-testid={`accordion-faq-${index}`}>
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Final CTA - NLP: Urgency + Future Pacing + Problem-Solver */}
        <section className="py-6 lg:py-10 bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
              <Clock className="w-4 h-4" />
              <span>Handeln Sie heute - nicht morgen</span>
            </div>
            
            <h2 className="text-lg sm:text-2xl lg:text-4xl font-bold mb-4">
              Wie lange wollen Sie noch mit <br className="hidden lg:block" />
              Ihrem Sanierungsproblem leben?
            </h2>
            <div className="text-sm sm:text-lg opacity-90 mb-4 max-w-2xl mx-auto flex flex-col gap-1">
              <span><strong>In 3 Monaten</strong> könnten Sie in Ihrem frisch sanierten Zuhause sitzen.</span>
              <span>Oder Sie schieben es wieder auf.</span>
            </div>
            <div className="text-sm sm:text-base opacity-80 mb-6 max-w-xl mx-auto flex flex-col gap-0.5">
              <span>Wir sind die Problemlöser, die Sie suchen.</span>
              <span>Der erste Schritt dauert nur 2 Minuten.</span>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center sm:justify-center gap-3">
              <Button 
                size="lg" 
                onClick={scrollToForm}
                className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white min-h-12 px-5 sm:px-6 text-sm sm:text-base font-semibold shadow-xl whitespace-normal text-center"
                data-testid="button-final-cta"
              >
                Ja, ich will mein Problem endlich lösen
                <ArrowRight className="w-4 h-4 ml-2 flex-shrink-0" />
              </Button>
            </div>
            <p className="mt-6 text-sm opacity-70">
              100% kostenlos. Unverbindlich. Antwort garantiert in 24 Stunden.
            </p>
          </div>
        </section>

        <InternalLinks links={linkSets.fromHome} />
        <SeoFooter />
      </div>
    </>
  );
}
