import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useLocation, useSearch } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { 
  Home, 
  Bath, 
  ChefHat, 
  Layers, 
  Zap, 
  Flame, 
  Leaf, 
  HardHat,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Shield,
  Clock,
  Award,
  Phone,
  Loader2,
  Building2,
  Star,
  Sparkles,
  Crown,
  AlertTriangle,
  ThermometerSun,
  Droplets,
  Plug,
  PaintBucket,
  Mail,
  MapPin
} from "lucide-react";
import { Link } from "wouter";

const headerServices = [
  { id: "komplettsanierung", title: "Komplettsanierung" },
  { id: "badsanierung", title: "Badsanierung" },
  { id: "kuechensanierung", title: "Küchensanierung" },
  { id: "bodensanierung", title: "Bodensanierung" },
  { id: "heizungssanierung", title: "Heizungssanierung" },
];

const serviceOptions = [
  { 
    id: "komplettsanierung", 
    label: "Komplettsanierung", 
    icon: Home,
    problem: "Alles muss raus - aber wer koordiniert das alles?",
    description: "Wir übernehmen die komplette Renovierung von A bis Z",
    painPoint: "Viele Handwerker, viele Termine, viel Stress?"
  },
  { 
    id: "badsanierung", 
    label: "Badsanierung", 
    icon: Bath,
    problem: "Ihr Bad ist in die Jahre gekommen?",
    description: "Modernes Traumbad in 2-3 Wochen",
    painPoint: "Schimmel, alte Fliesen, undichte Fugen?"
  },
  { 
    id: "kuechensanierung", 
    label: "Küchensanierung", 
    icon: ChefHat,
    problem: "Die Küche passt nicht mehr zu Ihrem Leben?",
    description: "Neue Küche mit allem Komfort",
    painPoint: "Zu wenig Platz, alte Geräte, unpraktische Aufteilung?"
  },
  { 
    id: "bodensanierung", 
    label: "Bodensanierung", 
    icon: Layers,
    problem: "Der Boden hat seine besten Tage hinter sich?",
    description: "Neuer Boden - sauber und schnell verlegt",
    painPoint: "Kratzer, Dellen, quietschende Dielen?"
  },
  { 
    id: "elektrosanierung", 
    label: "Elektrosanierung", 
    icon: Zap,
    problem: "Die Elektrik macht Ihnen Sorgen?",
    description: "Sichere Elektrik nach aktuellen Standards",
    painPoint: "Zu wenig Steckdosen, flackerndes Licht, alte Sicherungen?"
  },
  { 
    id: "heizungssanierung", 
    label: "Heizungssanierung", 
    icon: Flame,
    problem: "Die Heizkosten explodieren?",
    description: "Effiziente Heizsysteme mit Förderung",
    painPoint: "Alte Heizung, hohe Kosten, kalte Räume?"
  },
  { 
    id: "energetische-sanierung", 
    label: "Energetische Sanierung", 
    icon: Leaf,
    problem: "Im Winter frieren, im Sommer schwitzen?",
    description: "Bis zu 50% Heizkosten sparen",
    painPoint: "Zugluft, hohe Nebenkosten, schlechte Energiebilanz?"
  },
  { 
    id: "dachsanierung", 
    label: "Dachsanierung", 
    icon: HardHat,
    problem: "Das Dach macht Probleme?",
    description: "Dicht, gedämmt, langlebig",
    painPoint: "Undichtigkeiten, fehlende Dämmung, alte Ziegel?"
  },
];

const propertyTypes = [
  { id: "wohnung", label: "Wohnung", icon: Building2, desc: "Eigentumswohnung oder Mietwohnung" },
  { id: "einfamilienhaus", label: "Einfamilienhaus", icon: Home, desc: "Freistehendes Haus" },
  { id: "doppelhaushaelfte", label: "Doppelhaushälfte", icon: Home, desc: "Reihen- oder Doppelhaus" },
  { id: "mehrfamilienhaus", label: "Mehrfamilienhaus", icon: Building2, desc: "Mehrere Wohneinheiten" },
];

const bathroomTypes = [
  { id: "hauptbad", label: "Hauptbad", icon: Bath, desc: "Das tägliche Familienbad" },
  { id: "gaeste-wc", label: "Gäste-WC", icon: Droplets, desc: "Kleines WC für Besucher" },
  { id: "duschbad", label: "Duschbad", icon: Droplets, desc: "Bad mit Dusche, ohne Wanne" },
  { id: "bad-und-wc", label: "Bad + Gäste-WC", icon: Bath, desc: "Beide Räume sanieren" },
];

const kitchenWorkTypes = [
  { id: "komplett", label: "Komplette Sanierung", icon: ChefHat, desc: "Alle Arbeiten aus einer Hand" },
  { id: "fliesen", label: "Fliesenverlegung", icon: Layers, desc: "Boden und/oder Wand neu fliesen" },
  { id: "elektro", label: "Elektroinstallation", icon: Zap, desc: "Steckdosen, Anschlüsse, Beleuchtung" },
  { id: "wasser", label: "Wasserleitungen", icon: Droplets, desc: "Spüle und Wasseranschlüsse" },
  { id: "maler", label: "Malerarbeiten", icon: PaintBucket, desc: "Wände und Decke streichen" },
];

const floorRoomTypes = [
  { id: "wohnzimmer", label: "Wohnzimmer", icon: Layers, desc: "Der zentrale Lebensraum" },
  { id: "flur", label: "Flur", icon: Layers, desc: "Eingangsbereich & Durchgänge" },
  { id: "schlafzimmer", label: "Schlafzimmer", icon: Layers, desc: "Ruhe und Erholung" },
  { id: "komplett-wohnung", label: "Komplette Wohnung", icon: Layers, desc: "Alle Räume neu gestalten" },
];

const roofPropertyTypes = [
  { id: "einfamilienhaus", label: "Einfamilienhaus", icon: Home, desc: "Freistehendes Haus" },
  { id: "doppelhaushaelfte", label: "Doppelhaushälfte", icon: Home, desc: "Reihen- oder Doppelhaus" },
  { id: "reihenhaus", label: "Reihenhaus", icon: Home, desc: "Haus in einer Reihe" },
  { id: "mehrfamilienhaus", label: "Mehrfamilienhaus", icon: Building2, desc: "Mehrere Wohneinheiten" },
  { id: "gewerbe", label: "Gewerbegebäude", icon: Building2, desc: "Büro, Halle, Werkstatt" },
];

type ServiceConfig = {
  scopeTitle: string;
  scopeSubtitle: string;
  conditionTitle: string;
  conditionSubtitle: string;
  qualityTitle: string;
  qualityOptions: { id: string; label: string; desc: string; examples: string }[];
  timelineTitle: string;
  urgencyQuestion: string;
  budgetRanges: { id: string; label: string; desc: string }[];
};

const serviceConfigs: Record<string, ServiceConfig> = {
  komplettsanierung: {
    scopeTitle: "Wie groß ist Ihr Sanierungsprojekt?",
    scopeSubtitle: "Je genauer Ihre Angaben, desto präziser unser Angebot",
    conditionTitle: "In welchem Zustand ist die Immobilie aktuell?",
    conditionSubtitle: "Keine Sorge - wir haben schon alles gesehen",
    qualityTitle: "Welchen Standard wünschen Sie sich?",
    qualityOptions: [
      { id: "standard", label: "Solide & Funktional", desc: "Bewährte Materialien, saubere Ausführung", examples: "Markenprodukte, zeitloses Design" },
      { id: "komfort", label: "Gehoben & Modern", desc: "Hochwertige Ausstattung, aktuelle Trends", examples: "Designarmaturen, Echtholzböden" },
      { id: "premium", label: "Exklusiv & Individuell", desc: "Maßanfertigung, Luxusmaterialien", examples: "Naturstein, Smart Home, Markenküche" },
    ],
    timelineTitle: "Wann soll die Sanierung beginnen?",
    urgencyQuestion: "Ist die Immobilie derzeit bewohnt?",
    budgetRanges: [
      { id: "30k-50k", label: "30.000 - 50.000 €", desc: "Teilsanierung, einzelne Räume" },
      { id: "50k-80k", label: "50.000 - 80.000 €", desc: "Umfangreiche Renovierung" },
      { id: "80k-120k", label: "80.000 - 120.000 €", desc: "Komplettsanierung Wohnung" },
      { id: "120k-200k", label: "120.000 - 200.000 €", desc: "Komplettsanierung Haus" },
      { id: "ueber-200k", label: "Über 200.000 €", desc: "Luxussanierung / Kernsanierung" },
      { id: "beratung", label: "Beratung gewünscht", desc: "Wir helfen bei der Einschätzung" },
    ],
  },
  badsanierung: {
    scopeTitle: "Erzählen Sie uns von Ihrem Bad",
    scopeSubtitle: "So können wir Ihr Traumbad planen",
    conditionTitle: "Wie ist der aktuelle Zustand?",
    conditionSubtitle: "Keine falsche Scham - wir sind Profis",
    qualityTitle: "Welches Bad schwebt Ihnen vor?",
    qualityOptions: [
      { id: "standard", label: "Praktisch & Pflegeleicht", desc: "Funktionales Bad, gute Qualität", examples: "Markenarmaturen, pflegeleichte Fliesen" },
      { id: "komfort", label: "Wohlfühl-Oase", desc: "Komfortausstattung, modernes Design", examples: "Rainshower, Handtuchheizkörper, große Fliesen" },
      { id: "premium", label: "Wellness-Bad", desc: "Spa-Atmosphäre zuhause", examples: "Freistehende Wanne, Naturstein, Dampfdusche" },
    ],
    timelineTitle: "Wann soll Ihr neues Bad fertig sein?",
    urgencyQuestion: "Ist das Bad Ihr einziges Badezimmer?",
    budgetRanges: [
      { id: "8k-12k", label: "8.000 - 12.000 €", desc: "Kleines Bad, Standardausstattung" },
      { id: "12k-18k", label: "12.000 - 18.000 €", desc: "Mittleres Bad, gehobene Ausstattung" },
      { id: "18k-25k", label: "18.000 - 25.000 €", desc: "Großes Bad oder Komfortausstattung" },
      { id: "25k-40k", label: "25.000 - 40.000 €", desc: "Wellness-Bad, Premium-Ausstattung" },
      { id: "ueber-40k", label: "Über 40.000 €", desc: "Luxusbad mit allen Extras" },
      { id: "beratung", label: "Beratung gewünscht", desc: "Wir helfen bei der Planung" },
    ],
  },
  kuechensanierung: {
    scopeTitle: "Wie sieht Ihre Traumküche aus?",
    scopeSubtitle: "Die Küche ist das Herz des Hauses",
    conditionTitle: "Was stört Sie an der aktuellen Küche?",
    conditionSubtitle: "So verstehen wir Ihre Wünsche besser",
    qualityTitle: "Welche Küchenklasse passt zu Ihnen?",
    qualityOptions: [
      { id: "standard", label: "Funktional & Clever", desc: "Durchdachte Planung, solide Qualität", examples: "Markenhersteller, praktische Aufteilung" },
      { id: "komfort", label: "Koch-Paradies", desc: "Hochwertige Geräte, mehr Stauraum", examples: "Induktion, Dampfgarer, Soft-Close" },
      { id: "premium", label: "Profi-Küche", desc: "Gastro-Qualität für Zuhause", examples: "Markengeräte, Naturstein, Maßanfertigung" },
    ],
    timelineTitle: "Wann möchten Sie in der neuen Küche kochen?",
    urgencyQuestion: "Haben Sie eine Ausweichmöglichkeit während der Renovierung?",
    budgetRanges: [
      { id: "10k-15k", label: "10.000 - 15.000 €", desc: "Küchenzeile, gute Grundausstattung" },
      { id: "15k-25k", label: "15.000 - 25.000 €", desc: "Einbauküche mit Markengeräten" },
      { id: "25k-40k", label: "25.000 - 40.000 €", desc: "Hochwertige Küche, Premium-Geräte" },
      { id: "40k-60k", label: "40.000 - 60.000 €", desc: "Designerküche, Maßanfertigung" },
      { id: "ueber-60k", label: "Über 60.000 €", desc: "Luxusküche ohne Kompromisse" },
      { id: "beratung", label: "Beratung gewünscht", desc: "Wir planen mit Ihnen gemeinsam" },
    ],
  },
  bodensanierung: {
    scopeTitle: "Welche Fläche soll renoviert werden?",
    scopeSubtitle: "Ein neuer Boden verändert den ganzen Raum",
    conditionTitle: "Wie ist der aktuelle Boden?",
    conditionSubtitle: "Die Untergrundvorbereitung ist entscheidend",
    qualityTitle: "Welcher Bodenbelag passt zu Ihrem Leben?",
    qualityOptions: [
      { id: "standard", label: "Robust & Pflegeleicht", desc: "Strapazierfähig, einfache Pflege", examples: "Laminat, Vinyl in guter Qualität" },
      { id: "komfort", label: "Wohnlich & Hochwertig", desc: "Natürliche Optik, angenehmes Laufgefühl", examples: "Mehrschichtparkett, Design-Vinyl" },
      { id: "premium", label: "Echt & Langlebig", desc: "Massivholz, zeitlose Eleganz", examples: "Massivparkett, Naturstein, Fischgrät" },
    ],
    timelineTitle: "Wann soll der neue Boden verlegt werden?",
    urgencyQuestion: "Können die Räume während der Verlegung geräumt werden?",
    budgetRanges: [
      { id: "30-50qm", label: "30 - 50 € pro m²", desc: "Laminat, günstiges Vinyl" },
      { id: "50-80qm", label: "50 - 80 € pro m²", desc: "Hochwertiges Vinyl, Einstiegsparkett" },
      { id: "80-120qm", label: "80 - 120 € pro m²", desc: "Mehrschichtparkett, Designböden" },
      { id: "120-180qm", label: "120 - 180 € pro m²", desc: "Massivparkett, große Fliesen" },
      { id: "ueber-180qm", label: "Über 180 € pro m²", desc: "Naturstein, Exotenhölzer" },
      { id: "beratung", label: "Beratung gewünscht", desc: "Wir zeigen Ihnen Muster" },
    ],
  },
  elektrosanierung: {
    scopeTitle: "Was soll erneuert werden?",
    scopeSubtitle: "Sicherheit und Komfort gehen vor",
    conditionTitle: "Wie alt ist die Elektroinstallation?",
    conditionSubtitle: "Alte Leitungen können gefährlich sein",
    qualityTitle: "Welchen Elektro-Standard wünschen Sie?",
    qualityOptions: [
      { id: "standard", label: "Sicher & Zeitgemäß", desc: "Aktuelle Normen, ausreichend Steckdosen", examples: "FI-Schalter, neue Verteilung" },
      { id: "komfort", label: "Komfortabel & Flexibel", desc: "Mehr Anschlüsse, Vorbereitung für Zukunft", examples: "Netzwerk, E-Auto Vorbereitung" },
      { id: "premium", label: "Smart & Vernetzt", desc: "Intelligente Steuerung, Energiemanagement", examples: "KNX/Smart Home, Photovoltaik-ready" },
    ],
    timelineTitle: "Wie dringend ist die Elektrosanierung?",
    urgencyQuestion: "Gibt es akute Sicherheitsprobleme?",
    budgetRanges: [
      { id: "3k-6k", label: "3.000 - 6.000 €", desc: "Einzelne Räume, Teilsanierung" },
      { id: "6k-12k", label: "6.000 - 12.000 €", desc: "Wohnung komplett, neue Verteilung" },
      { id: "12k-20k", label: "12.000 - 20.000 €", desc: "Einfamilienhaus, moderne Ausstattung" },
      { id: "20k-35k", label: "20.000 - 35.000 €", desc: "Smart Home Vorbereitung" },
      { id: "ueber-35k", label: "Über 35.000 €", desc: "Komplett inkl. Smart Home System" },
      { id: "beratung", label: "Beratung gewünscht", desc: "E-Check und Beratung vor Ort" },
    ],
  },
  heizungssanierung: {
    scopeTitle: "Welche Heizung haben Sie aktuell?",
    scopeSubtitle: "Wir finden die beste Lösung für Sie",
    conditionTitle: "Was ist das Problem mit Ihrer Heizung?",
    conditionSubtitle: "Die richtige Diagnose spart Geld",
    qualityTitle: "Welches Heizsystem passt zu Ihnen?",
    qualityOptions: [
      { id: "gas-brennwert", label: "Gas-Brennwert", desc: "Bewährt, effizient, schnell installiert", examples: "Niedrige Investition, gute Effizienz" },
      { id: "waermepumpe", label: "Wärmepumpe", desc: "Zukunftssicher, hohe Förderung", examples: "Luft-Wasser oder Erdwärme" },
      { id: "hybrid", label: "Hybrid-System", desc: "Das Beste aus beiden Welten", examples: "Wärmepumpe + Gas als Backup" },
    ],
    timelineTitle: "Wie schnell brauchen Sie die neue Heizung?",
    urgencyQuestion: "Funktioniert die aktuelle Heizung noch?",
    budgetRanges: [
      { id: "8k-12k", label: "8.000 - 12.000 €", desc: "Gas-Brennwert, einfacher Tausch" },
      { id: "12k-18k", label: "12.000 - 18.000 €", desc: "Gas-Brennwert mit neuen Heizkörpern" },
      { id: "18k-30k", label: "18.000 - 30.000 €", desc: "Luft-Wärmepumpe" },
      { id: "30k-45k", label: "30.000 - 45.000 €", desc: "Wärmepumpe mit Fußbodenheizung" },
      { id: "ueber-45k", label: "Über 45.000 €", desc: "Erdwärme, Komplettsystem" },
      { id: "beratung", label: "Beratung gewünscht", desc: "Energieberatung inkl. Fördercheck" },
    ],
  },
  "energetische-sanierung": {
    scopeTitle: "Welche Bereiche sollen gedämmt werden?",
    scopeSubtitle: "Jede Maßnahme spart Heizkosten",
    conditionTitle: "Wie ist der aktuelle energetische Zustand?",
    conditionSubtitle: "Ein Energieausweis hilft bei der Einschätzung",
    qualityTitle: "Wie weit soll die Sanierung gehen?",
    qualityOptions: [
      { id: "einzelmassnahme", label: "Einzelmaßnahme", desc: "Gezielte Verbesserung, schneller Effekt", examples: "Dachdämmung ODER Fenster ODER Fassade" },
      { id: "teilsanierung", label: "Mehrere Maßnahmen", desc: "Kombinierte Wirkung, bessere Förderung", examples: "Dämmung + Fenster + Heizung" },
      { id: "effizienzhaus", label: "Effizienzhaus-Standard", desc: "Maximale Förderung, minimale Kosten", examples: "KfW 55/40, iSFP-Bonus" },
    ],
    timelineTitle: "Wann soll die Sanierung stattfinden?",
    urgencyQuestion: "Haben Sie bereits einen Energieberater kontaktiert?",
    budgetRanges: [
      { id: "15k-30k", label: "15.000 - 30.000 €", desc: "Einzelmaßnahme (z.B. Dämmung)" },
      { id: "30k-60k", label: "30.000 - 60.000 €", desc: "Fenster + Teilfassade" },
      { id: "60k-100k", label: "60.000 - 100.000 €", desc: "Umfassende Sanierung" },
      { id: "100k-150k", label: "100.000 - 150.000 €", desc: "Effizienzhaus-Sanierung" },
      { id: "ueber-150k", label: "Über 150.000 €", desc: "Komplett inkl. Haustechnik" },
      { id: "beratung", label: "Beratung gewünscht", desc: "Energieberatung + Fördercheck" },
    ],
  },
  dachsanierung: {
    scopeTitle: "Was für ein Dach haben Sie?",
    scopeSubtitle: "Jeder Dachtyp hat seine Besonderheiten",
    conditionTitle: "Was ist das Problem mit Ihrem Dach?",
    conditionSubtitle: "Schnelles Handeln verhindert Folgeschäden",
    qualityTitle: "Was soll alles gemacht werden?",
    qualityOptions: [
      { id: "reparatur", label: "Reparatur & Ausbesserung", desc: "Gezielte Behebung, schnelle Lösung", examples: "Undichte Stellen, einzelne Ziegel" },
      { id: "neueindeckung", label: "Neueindeckung", desc: "Komplett neue Dachfläche", examples: "Neue Ziegel/Schindeln, Lattung" },
      { id: "komplett", label: "Dach + Dämmung", desc: "Energetische Sanierung von oben", examples: "Aufsparrendämmung, neue Eindeckung" },
    ],
    timelineTitle: "Wie dringend muss das Dach gemacht werden?",
    urgencyQuestion: "Gibt es akute Undichtigkeiten?",
    budgetRanges: [
      { id: "5k-10k", label: "5.000 - 10.000 €", desc: "Reparaturen, kleine Flächen" },
      { id: "10k-25k", label: "10.000 - 25.000 €", desc: "Teilsanierung, Neueindeckung klein" },
      { id: "25k-50k", label: "25.000 - 50.000 €", desc: "Komplette Neueindeckung" },
      { id: "50k-80k", label: "50.000 - 80.000 €", desc: "Neueindeckung + Dämmung" },
      { id: "ueber-80k", label: "Über 80.000 €", desc: "Dachstuhl + Eindeckung + Dämmung" },
      { id: "beratung", label: "Beratung gewünscht", desc: "Dachinspektion vor Ort" },
    ],
  },
};

type ServiceDetails = {
  squareMeters?: string;
  roomCount?: string;
  buildYear?: string;
  condition?: string;
  sanitaryCount?: string;
  barrierFree?: boolean;
  showerType?: string;
  newAppliances?: boolean;
  countertopMaterial?: string;
  layoutChange?: boolean;
  floorType?: string;
  currentFloor?: string;
  underfloorHeating?: boolean;
  electricYear?: string;
  newFuseBox?: boolean;
  smartHome?: boolean;
  additionalCircuits?: string;
  currentHeating?: string;
  desiredHeating?: string;
  hotWaterIntegration?: boolean;
  insulationType?: string[];
  newWindows?: boolean;
  renewableInterest?: boolean;
  roofArea?: string;
  roofType?: string;
  roofInsulation?: boolean;
  atticUse?: string;
  damageType?: string;
  structuralChanges?: boolean;
  includesBathroom?: boolean;
  includesKitchen?: boolean;
  ownership?: string;
  occupancy?: string;
  urgencyReason?: string;
  specialRequirements?: string;
};

export default function FunnelPage() {
  const [, setLocation] = useLocation();
  const searchString = useSearch();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  
  const [formData, setFormData] = useState({
    service: "",
    propertyType: "",
    kitchenNeeded: "",
    serviceDetails: {} as ServiceDetails,
    qualityLevel: "",
    timeline: "",
    preferredStartDate: "",
    budgetRange: "",
    additionalNotes: "",
    address: "",
    city: "",
    postalCode: "",
    description: "",
    isUrgent: false,
    name: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    const params = new URLSearchParams(searchString);
    const serviceParam = params.get("service");
    const validServices = ["komplettsanierung", "badsanierung", "kuechensanierung", "bodensanierung", "elektrosanierung", "heizungssanierung", "energetische-sanierung", "dachsanierung"];
    
    if (serviceParam && validServices.includes(serviceParam)) {
      setFormData(prev => ({ ...prev, service: serviceParam }));
      setCurrentStep(2);
    }
  }, [searchString]);

  const totalSteps = 8;
  const progress = (currentStep / totalSteps) * 100;
  const config = serviceConfigs[formData.service] || serviceConfigs.komplettsanierung;

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateServiceDetails = (field: keyof ServiceDetails, value: any) => {
    setFormData(prev => ({
      ...prev,
      serviceDetails: { ...prev.serviceDetails, [field]: value }
    }));
  };

  const createLeadMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      return apiRequest("POST", "/api/leads", data);
    },
    onSuccess: () => {
      setLocation("/bestaetigung");
    },
    onError: () => {
      toast({
        title: "Fehler beim Senden",
        description: "Bitte versuchen Sie es erneut oder rufen Sie uns an.",
        variant: "destructive",
      });
    },
  });

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = () => {
    if (!privacyAccepted) {
      toast({
        title: "Datenschutz",
        description: "Bitte akzeptieren Sie die Datenschutzerklärung.",
        variant: "destructive",
      });
      return;
    }
    createLeadMutation.mutate(formData);
  };

  const canProceedStep3 = () => {
    const service = formData.service;
    const details = formData.serviceDetails;
    
    switch (service) {
      case "badsanierung":
        return !!details.squareMeters;
      case "kuechensanierung":
        return !!details.squareMeters;
      case "komplettsanierung":
        return !!details.squareMeters;
      case "bodensanierung":
        return !!details.squareMeters;
      case "elektrosanierung":
        return !!details.squareMeters || !!details.roomCount;
      case "heizungssanierung":
        return !!details.squareMeters;
      case "energetische-sanierung":
        return !!details.squareMeters || (details.insulationType && details.insulationType.length > 0);
      case "dachsanierung":
        return !!details.squareMeters || !!details.roofArea;
      default:
        return !!details.squareMeters;
    }
  };

  const canProceedStep4 = () => {
    return !!formData.serviceDetails.condition;
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return formData.service !== "";
      case 2: 
        if (formData.service === "kuechensanierung") {
          return formData.propertyType !== "" && formData.kitchenNeeded !== "";
        }
        return formData.propertyType !== "";
      case 3: return canProceedStep3();
      case 4: return canProceedStep4();
      case 5: return formData.qualityLevel !== "";
      case 6: return formData.timeline !== "";
      case 7: return formData.postalCode !== "" && formData.city !== "";
      case 8: return formData.name !== "" && formData.phone !== "" && formData.email !== "" && privacyAccepted;
      default: return false;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return "Welches Problem können wir für Sie lösen?";
      case 2: 
        if (formData.service === "badsanierung") return "Was für ein Bad soll saniert werden?";
        if (formData.service === "kuechensanierung") return "Welche Sanierungsarbeiten werden benötigt?";
        if (formData.service === "bodensanierung") return "Welche Räume brauchen neuen Boden?";
        return "Um welches Objekt handelt es sich?";
      case 3: return config.scopeTitle;
      case 4: return config.conditionTitle;
      case 5: return config.qualityTitle;
      case 6: return config.timelineTitle;
      case 7: return "Wo befindet sich das Objekt?";
      case 8: return "Fast geschafft - Ihre Kontaktdaten";
      default: return "";
    }
  };

  const getStepSubtitle = () => {
    switch (currentStep) {
      case 1: return "Wählen Sie den Bereich, der Ihnen am meisten Kopfzerbrechen bereitet";
      case 2: 
        if (formData.service === "badsanierung") return "Hauptbad, Gäste-WC oder beides?";
        if (formData.service === "kuechensanierung") return "Wählen Sie die gewünschten Arbeiten - ohne Küchenmöbel";
        if (formData.service === "bodensanierung") return "Einzelner Raum oder die ganze Wohnung?";
        return "Jedes Objekt hat seine Besonderheiten";
      case 3: return config.scopeSubtitle;
      case 4: return config.conditionSubtitle;
      case 5: return "Ihre Wahl bestimmt Materialien und Ausführung";
      case 6: return "So können wir optimal planen";
      case 7: return "Für eine realistische Kostenschätzung";
      case 8: return "Wir melden uns innerhalb von 24 Stunden";
      default: return "";
    }
  };

  const renderStep1 = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {serviceOptions.map((service) => {
        const Icon = service.icon;
        const isSelected = formData.service === service.id;
        return (
          <button
            key={service.id}
            type="button"
            onClick={() => updateFormData("service", service.id)}
            className={`p-5 rounded-lg border-2 text-left transition-all hover-elevate ${
              isSelected ? "border-primary bg-primary/5" : "border-border"
            }`}
            data-testid={`button-service-${service.id}`}
          >
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-lg ${isSelected ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                <Icon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-primary mb-1">{service.problem}</p>
                <p className="font-semibold">{service.label}</p>
                <p className="text-sm text-muted-foreground mt-1">{service.painPoint}</p>
              </div>
              {isSelected && <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />}
            </div>
          </button>
        );
      })}
    </div>
  );

  const renderStep2 = () => {
    const service = formData.service;
    
    if (service === "badsanierung") {
      return (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {bathroomTypes.map((type) => {
              const Icon = type.icon;
              const isSelected = formData.propertyType === type.id;
              return (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => updateFormData("propertyType", type.id)}
                  className={`p-5 rounded-lg border-2 text-center transition-all hover-elevate ${
                    isSelected ? "border-primary bg-primary/5" : "border-border"
                  }`}
                  data-testid={`button-property-${type.id}`}
                >
                  <Icon className={`w-10 h-10 mx-auto mb-3 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                  <p className="font-semibold">{type.label}</p>
                  <p className="text-xs text-muted-foreground mt-1">{type.desc}</p>
                  {isSelected && <CheckCircle className="w-5 h-5 text-primary mx-auto mt-3" />}
                </button>
              );
            })}
          </div>
        </div>
      );
    }
    
    if (service === "kuechensanierung") {
      return (
        <div className="space-y-6">
          <p className="text-sm text-muted-foreground mb-2">Welche Arbeiten sollen durchgeführt werden?</p>
          <div className="grid grid-cols-2 gap-4">
            {kitchenWorkTypes.map((type) => {
              const Icon = type.icon;
              const isSelected = formData.propertyType === type.id;
              return (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => updateFormData("propertyType", type.id)}
                  className={`p-5 rounded-lg border-2 text-center transition-all hover-elevate ${
                    isSelected ? "border-primary bg-primary/5" : "border-border"
                  }`}
                  data-testid={`button-property-${type.id}`}
                >
                  <Icon className={`w-10 h-10 mx-auto mb-3 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                  <p className="font-semibold">{type.label}</p>
                  <p className="text-xs text-muted-foreground mt-1">{type.desc}</p>
                  {isSelected && <CheckCircle className="w-5 h-5 text-primary mx-auto mt-3" />}
                </button>
              );
            })}
          </div>
          
          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <p className="font-medium mb-3">Wird eine neue Küche (Möbel & Geräte) gewünscht?</p>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => updateFormData("kitchenNeeded", "ja")}
                className={`flex-1 p-3 rounded-lg border-2 text-center transition-all hover-elevate ${
                  formData.kitchenNeeded === "ja" ? "border-primary bg-primary/5" : "border-border"
                }`}
                data-testid="button-kitchen-yes"
              >
                <p className="font-semibold">Ja, neue Küche</p>
                <p className="text-xs text-muted-foreground">Inkl. Planung & Einbau</p>
              </button>
              <button
                type="button"
                onClick={() => updateFormData("kitchenNeeded", "nein")}
                className={`flex-1 p-3 rounded-lg border-2 text-center transition-all hover-elevate ${
                  formData.kitchenNeeded === "nein" ? "border-primary bg-primary/5" : "border-border"
                }`}
                data-testid="button-kitchen-no"
              >
                <p className="font-semibold">Nein, nur Sanierung</p>
                <p className="text-xs text-muted-foreground">Bestehende Küche bleibt</p>
              </button>
            </div>
          </div>
        </div>
      );
    }
    
    if (service === "bodensanierung") {
      return (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {floorRoomTypes.map((type) => {
              const Icon = type.icon;
              const isSelected = formData.propertyType === type.id;
              return (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => updateFormData("propertyType", type.id)}
                  className={`p-5 rounded-lg border-2 text-center transition-all hover-elevate ${
                    isSelected ? "border-primary bg-primary/5" : "border-border"
                  }`}
                  data-testid={`button-property-${type.id}`}
                >
                  <Icon className={`w-10 h-10 mx-auto mb-3 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                  <p className="font-semibold">{type.label}</p>
                  <p className="text-xs text-muted-foreground mt-1">{type.desc}</p>
                  {isSelected && <CheckCircle className="w-5 h-5 text-primary mx-auto mt-3" />}
                </button>
              );
            })}
          </div>
        </div>
      );
    }
    
    if (service === "dachsanierung") {
      return (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {roofPropertyTypes.map((type) => {
              const Icon = type.icon;
              const isSelected = formData.propertyType === type.id;
              return (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => updateFormData("propertyType", type.id)}
                  className={`p-5 rounded-lg border-2 text-center transition-all hover-elevate ${
                    isSelected ? "border-primary bg-primary/5" : "border-border"
                  }`}
                  data-testid={`button-property-${type.id}`}
                >
                  <Icon className={`w-10 h-10 mx-auto mb-3 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                  <p className="font-semibold">{type.label}</p>
                  <p className="text-xs text-muted-foreground mt-1">{type.desc}</p>
                  {isSelected && <CheckCircle className="w-5 h-5 text-primary mx-auto mt-3" />}
                </button>
              );
            })}
          </div>
        </div>
      );
    }
    
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          {propertyTypes.map((type) => {
            const Icon = type.icon;
            const isSelected = formData.propertyType === type.id;
            return (
              <button
                key={type.id}
                type="button"
                onClick={() => updateFormData("propertyType", type.id)}
                className={`p-5 rounded-lg border-2 text-center transition-all hover-elevate ${
                  isSelected ? "border-primary bg-primary/5" : "border-border"
                }`}
                data-testid={`button-property-${type.id}`}
              >
                <Icon className={`w-10 h-10 mx-auto mb-3 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                <p className="font-semibold">{type.label}</p>
                <p className="text-xs text-muted-foreground mt-1">{type.desc}</p>
                {isSelected && <CheckCircle className="w-5 h-5 text-primary mx-auto mt-3" />}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
          <div>
            <Label className="text-base font-medium">Baujahr des Gebäudes</Label>
            <Select
              value={formData.serviceDetails.buildYear || ""}
              onValueChange={(value) => updateServiceDetails("buildYear", value)}
            >
              <SelectTrigger className="mt-2" data-testid="select-build-year">
                <SelectValue placeholder="Ungefähres Baujahr" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vor-1950">Altbau (vor 1950)</SelectItem>
                <SelectItem value="1950-1970">Nachkriegsbau (1950-1970)</SelectItem>
                <SelectItem value="1970-1990">1970-1990</SelectItem>
                <SelectItem value="1990-2010">1990-2010</SelectItem>
                <SelectItem value="nach-2010">Neubau (nach 2010)</SelectItem>
                <SelectItem value="unbekannt">Weiß ich nicht</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-base font-medium">Sie sind...</Label>
            <Select
              value={formData.serviceDetails.ownership || ""}
              onValueChange={(value) => updateServiceDetails("ownership", value)}
            >
              <SelectTrigger className="mt-2" data-testid="select-ownership">
                <SelectValue placeholder="Bitte wählen" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="eigentuemer">Eigentümer</SelectItem>
                <SelectItem value="kaeufer">Käufer (Kauf geplant)</SelectItem>
                <SelectItem value="verwalter">Hausverwaltung</SelectItem>
                <SelectItem value="mieter">Mieter (mit Genehmigung)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    );
  };

  const renderStep3Scope = () => {
    const service = formData.service;

    switch (service) {
      case "badsanierung":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="text-base font-medium flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-primary" />
                  Badgröße
                </Label>
                <div className="flex items-center gap-2 mt-2">
                  <Input
                    type="number"
                    placeholder="z.B. 8"
                    value={formData.serviceDetails.squareMeters || ""}
                    onChange={(e) => updateServiceDetails("squareMeters", e.target.value)}
                    className="max-w-24"
                    data-testid="input-square-meters"
                  />
                  <span className="text-muted-foreground">m²</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Geschätzt reicht aus</p>
              </div>

              <div>
                <Label className="text-base font-medium">Anzahl Sanitärobjekte</Label>
                <Select
                  value={formData.serviceDetails.sanitaryCount || ""}
                  onValueChange={(value) => updateServiceDetails("sanitaryCount", value)}
                >
                  <SelectTrigger className="mt-2" data-testid="select-sanitary-count">
                    <SelectValue placeholder="WC, Waschtisch, Dusche..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2-3">2-3 Objekte (kleines Bad)</SelectItem>
                    <SelectItem value="4-5">4-5 Objekte (Standard)</SelectItem>
                    <SelectItem value="6+">6+ Objekte (großes Bad)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label className="text-base font-medium">Was wünschen Sie sich?</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
                {[
                  { id: "dusche", label: "Ebenerdige Dusche", icon: Droplets },
                  { id: "wanne", label: "Badewanne", icon: Bath },
                  { id: "beides", label: "Dusche + Wanne", icon: Bath },
                ].map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => updateServiceDetails("showerType", option.id)}
                    className={`p-4 rounded-lg border-2 text-center transition-all hover-elevate ${
                      formData.serviceDetails.showerType === option.id ? "border-primary bg-primary/5" : "border-border"
                    }`}
                  >
                    <option.icon className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <p className="text-sm font-medium">{option.label}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-3 p-4 bg-muted/50 rounded-lg">
              <Checkbox
                id="barrierFree"
                checked={formData.serviceDetails.barrierFree || false}
                onCheckedChange={(checked) => updateServiceDetails("barrierFree", checked)}
                data-testid="checkbox-barrier-free"
              />
              <div>
                <Label htmlFor="barrierFree" className="font-medium cursor-pointer">Barrierefreies Bad</Label>
                <p className="text-sm text-muted-foreground">Bodengleiche Dusche, Haltegriffe, breitere Türen</p>
              </div>
            </div>
          </div>
        );

      case "kuechensanierung":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="text-base font-medium flex items-center gap-2">
                  <ChefHat className="w-4 h-4 text-primary" />
                  Küchengröße
                </Label>
                <div className="flex items-center gap-2 mt-2">
                  <Input
                    type="number"
                    placeholder="z.B. 12"
                    value={formData.serviceDetails.squareMeters || ""}
                    onChange={(e) => updateServiceDetails("squareMeters", e.target.value)}
                    className="max-w-24"
                    data-testid="input-square-meters"
                  />
                  <span className="text-muted-foreground">m²</span>
                </div>
              </div>

              <div>
                <Label className="text-base font-medium">Küchenform</Label>
                <Select
                  value={formData.serviceDetails.currentFloor || ""}
                  onValueChange={(value) => updateServiceDetails("currentFloor", value)}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Aktuelle Anordnung" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="zeile">Küchenzeile</SelectItem>
                    <SelectItem value="l-form">L-Form</SelectItem>
                    <SelectItem value="u-form">U-Form</SelectItem>
                    <SelectItem value="insel">Kochinsel</SelectItem>
                    <SelectItem value="offen">Offene Küche</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label className="text-base font-medium">Arbeitsplatte</Label>
              <Select
                value={formData.serviceDetails.countertopMaterial || ""}
                onValueChange={(value) => updateServiceDetails("countertopMaterial", value)}
              >
                <SelectTrigger className="mt-2 max-w-md" data-testid="select-countertop">
                  <SelectValue placeholder="Gewünschtes Material" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="laminat">Laminat (günstig, pflegeleicht)</SelectItem>
                  <SelectItem value="holz">Massivholz (warm, natürlich)</SelectItem>
                  <SelectItem value="quarz">Quarzkomposit (robust, edel)</SelectItem>
                  <SelectItem value="granit">Granit (exklusiv, langlebig)</SelectItem>
                  <SelectItem value="keramik">Keramik (kratzfest, hitzebeständig)</SelectItem>
                  <SelectItem value="unsicher">Beratung gewünscht</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label className="text-base font-medium">Zusätzliche Wünsche</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center space-x-3 p-3 border rounded-lg">
                  <Checkbox
                    id="newAppliances"
                    checked={formData.serviceDetails.newAppliances || false}
                    onCheckedChange={(checked) => updateServiceDetails("newAppliances", checked)}
                    data-testid="checkbox-new-appliances"
                  />
                  <Label htmlFor="newAppliances" className="font-normal cursor-pointer">Neue Elektrogeräte</Label>
                </div>
                <div className="flex items-center space-x-3 p-3 border rounded-lg">
                  <Checkbox
                    id="layoutChange"
                    checked={formData.serviceDetails.layoutChange || false}
                    onCheckedChange={(checked) => updateServiceDetails("layoutChange", checked)}
                  />
                  <Label htmlFor="layoutChange" className="font-normal cursor-pointer">Grundriss ändern</Label>
                </div>
              </div>
            </div>
          </div>
        );

      case "komplettsanierung":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="text-base font-medium flex items-center gap-2">
                  <Home className="w-4 h-4 text-primary" />
                  Wohnfläche gesamt
                </Label>
                <div className="flex items-center gap-2 mt-2">
                  <Input
                    type="number"
                    placeholder="z.B. 85"
                    value={formData.serviceDetails.squareMeters || ""}
                    onChange={(e) => updateServiceDetails("squareMeters", e.target.value)}
                    className="max-w-24"
                    data-testid="input-square-meters"
                  />
                  <span className="text-muted-foreground">m²</span>
                </div>
              </div>

              <div>
                <Label className="text-base font-medium">Anzahl Zimmer</Label>
                <Select
                  value={formData.serviceDetails.roomCount || ""}
                  onValueChange={(value) => updateServiceDetails("roomCount", value)}
                >
                  <SelectTrigger className="mt-2" data-testid="select-room-count">
                    <SelectValue placeholder="Ohne Bad/Küche" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-2">1-2 Zimmer</SelectItem>
                    <SelectItem value="3-4">3-4 Zimmer</SelectItem>
                    <SelectItem value="5-6">5-6 Zimmer</SelectItem>
                    <SelectItem value="7+">7+ Zimmer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label className="text-base font-medium">Was soll alles saniert werden?</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                {[
                  { id: "includesBathroom", label: "Bad/Bäder", icon: Bath },
                  { id: "includesKitchen", label: "Küche", icon: ChefHat },
                  { id: "floorType", label: "Böden", icon: Layers },
                  { id: "structuralChanges", label: "Wände/Grundriss", icon: PaintBucket },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      if (item.id === "floorType") {
                        updateServiceDetails("floorType", formData.serviceDetails.floorType ? "" : "ja");
                      } else {
                        updateServiceDetails(item.id as keyof ServiceDetails, !formData.serviceDetails[item.id as keyof ServiceDetails]);
                      }
                    }}
                    className={`p-4 rounded-lg border-2 text-center transition-all hover-elevate ${
                      (item.id === "floorType" ? formData.serviceDetails.floorType : formData.serviceDetails[item.id as keyof ServiceDetails])
                        ? "border-primary bg-primary/5" 
                        : "border-border"
                    }`}
                  >
                    <item.icon className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <p className="text-sm font-medium">{item.label}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-base font-medium">Wird das Objekt bewohnt?</Label>
              <Select
                value={formData.serviceDetails.occupancy || ""}
                onValueChange={(value) => updateServiceDetails("occupancy", value)}
              >
                <SelectTrigger className="mt-2 max-w-md">
                  <SelectValue placeholder="Aktuelle Nutzung" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bewohnt">Ja, während der Sanierung bewohnt</SelectItem>
                  <SelectItem value="leerzug">Wird vor Beginn leer gezogen</SelectItem>
                  <SelectItem value="leer">Steht bereits leer</SelectItem>
                  <SelectItem value="neukauf">Neu gekauft, noch nicht eingezogen</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case "bodensanierung":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="text-base font-medium flex items-center gap-2">
                  <Layers className="w-4 h-4 text-primary" />
                  Fläche
                </Label>
                <div className="flex items-center gap-2 mt-2">
                  <Input
                    type="number"
                    placeholder="z.B. 60"
                    value={formData.serviceDetails.squareMeters || ""}
                    onChange={(e) => updateServiceDetails("squareMeters", e.target.value)}
                    className="max-w-24"
                    data-testid="input-square-meters"
                  />
                  <span className="text-muted-foreground">m²</span>
                </div>
              </div>

              <div>
                <Label className="text-base font-medium">Anzahl Räume</Label>
                <Select
                  value={formData.serviceDetails.roomCount || ""}
                  onValueChange={(value) => updateServiceDetails("roomCount", value)}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Wie viele Räume?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Raum</SelectItem>
                    <SelectItem value="2-3">2-3 Räume</SelectItem>
                    <SelectItem value="4-5">4-5 Räume</SelectItem>
                    <SelectItem value="6+">6+ Räume / ganze Wohnung</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label className="text-base font-medium">Aktueller Bodenbelag</Label>
              <Select
                value={formData.serviceDetails.currentFloor || ""}
                onValueChange={(value) => updateServiceDetails("currentFloor", value)}
              >
                <SelectTrigger className="mt-2 max-w-md" data-testid="select-current-floor">
                  <SelectValue placeholder="Was liegt aktuell?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="teppich">Teppich</SelectItem>
                  <SelectItem value="laminat">Laminat</SelectItem>
                  <SelectItem value="parkett">Parkett</SelectItem>
                  <SelectItem value="fliesen">Fliesen</SelectItem>
                  <SelectItem value="vinyl-pvc">Vinyl/PVC</SelectItem>
                  <SelectItem value="estrich">Estrich/Rohboden</SelectItem>
                  <SelectItem value="gemischt">Verschiedene Beläge</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-base font-medium">Gewünschter neuer Boden</Label>
              <Select
                value={formData.serviceDetails.floorType || ""}
                onValueChange={(value) => updateServiceDetails("floorType", value)}
              >
                <SelectTrigger className="mt-2 max-w-md" data-testid="select-floor-type">
                  <SelectValue placeholder="Was soll es werden?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="laminat">Laminat (günstig, robust)</SelectItem>
                  <SelectItem value="vinyl">Vinyl/Designboden (pflegeleicht)</SelectItem>
                  <SelectItem value="parkett">Parkett (warm, wertig)</SelectItem>
                  <SelectItem value="fliesen">Fliesen (langlebig)</SelectItem>
                  <SelectItem value="unsicher">Beratung gewünscht</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-3 p-4 bg-muted/50 rounded-lg">
              <Checkbox
                id="underfloorHeating"
                checked={formData.serviceDetails.underfloorHeating || false}
                onCheckedChange={(checked) => updateServiceDetails("underfloorHeating", checked)}
                data-testid="checkbox-underfloor-heating"
              />
              <div>
                <Label htmlFor="underfloorHeating" className="font-medium cursor-pointer">Fußbodenheizung</Label>
                <p className="text-sm text-muted-foreground">Vorhanden oder gewünscht?</p>
              </div>
            </div>
          </div>
        );

      case "elektrosanierung":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="text-base font-medium flex items-center gap-2">
                  <Zap className="w-4 h-4 text-primary" />
                  Wohnfläche
                </Label>
                <div className="flex items-center gap-2 mt-2">
                  <Input
                    type="number"
                    placeholder="z.B. 80"
                    value={formData.serviceDetails.squareMeters || ""}
                    onChange={(e) => updateServiceDetails("squareMeters", e.target.value)}
                    className="max-w-24"
                    data-testid="input-square-meters"
                  />
                  <span className="text-muted-foreground">m²</span>
                </div>
              </div>

              <div>
                <Label className="text-base font-medium">Anzahl Räume</Label>
                <Select
                  value={formData.serviceDetails.roomCount || ""}
                  onValueChange={(value) => updateServiceDetails("roomCount", value)}
                >
                  <SelectTrigger className="mt-2" data-testid="select-room-count">
                    <SelectValue placeholder="Alle Räume?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-3">1-3 Räume (Teilbereich)</SelectItem>
                    <SelectItem value="4-6">4-6 Räume (Wohnung)</SelectItem>
                    <SelectItem value="7-10">7-10 Räume (großes Haus)</SelectItem>
                    <SelectItem value="10+">Mehr als 10 Räume</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label className="text-base font-medium">Alter der Elektroinstallation</Label>
              <Select
                value={formData.serviceDetails.electricYear || ""}
                onValueChange={(value) => updateServiceDetails("electricYear", value)}
              >
                <SelectTrigger className="mt-2 max-w-md" data-testid="select-electric-year">
                  <SelectValue placeholder="Wann wurde zuletzt etwas gemacht?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vor-1970">Vor 1970 (dringend erneuerungsbedürftig)</SelectItem>
                  <SelectItem value="1970-1990">1970-1990 (veraltet)</SelectItem>
                  <SelectItem value="1990-2010">1990-2010 (ausbaufähig)</SelectItem>
                  <SelectItem value="nach-2010">Nach 2010 (relativ neu)</SelectItem>
                  <SelectItem value="unbekannt">Weiß ich nicht</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label className="text-base font-medium">Was wird benötigt?</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center space-x-3 p-3 border rounded-lg">
                  <Checkbox
                    id="newFuseBox"
                    checked={formData.serviceDetails.newFuseBox || false}
                    onCheckedChange={(checked) => updateServiceDetails("newFuseBox", checked)}
                    data-testid="checkbox-new-fuse-box"
                  />
                  <Label htmlFor="newFuseBox" className="font-normal cursor-pointer">Neuer Sicherungskasten</Label>
                </div>
                <div className="flex items-center space-x-3 p-3 border rounded-lg">
                  <Checkbox
                    id="smartHome"
                    checked={formData.serviceDetails.smartHome || false}
                    onCheckedChange={(checked) => updateServiceDetails("smartHome", checked)}
                  />
                  <Label htmlFor="smartHome" className="font-normal cursor-pointer">Smart Home Vorbereitung</Label>
                </div>
              </div>
            </div>
          </div>
        );

      case "heizungssanierung":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="text-base font-medium flex items-center gap-2">
                  <ThermometerSun className="w-4 h-4 text-primary" />
                  Zu beheizende Fläche
                </Label>
                <div className="flex items-center gap-2 mt-2">
                  <Input
                    type="number"
                    placeholder="z.B. 120"
                    value={formData.serviceDetails.squareMeters || ""}
                    onChange={(e) => updateServiceDetails("squareMeters", e.target.value)}
                    className="max-w-24"
                    data-testid="input-square-meters"
                  />
                  <span className="text-muted-foreground">m²</span>
                </div>
              </div>

              <div>
                <Label className="text-base font-medium">Aktuelle Heizung</Label>
                <Select
                  value={formData.serviceDetails.currentHeating || ""}
                  onValueChange={(value) => updateServiceDetails("currentHeating", value)}
                >
                  <SelectTrigger className="mt-2" data-testid="select-current-heating">
                    <SelectValue placeholder="Was haben Sie aktuell?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gas-alt">Gasheizung (älter als 15 Jahre)</SelectItem>
                    <SelectItem value="gas-neu">Gasheizung (jünger als 15 Jahre)</SelectItem>
                    <SelectItem value="oel">Ölheizung</SelectItem>
                    <SelectItem value="nachtspeicher">Nachtspeicher</SelectItem>
                    <SelectItem value="fernwaerme">Fernwärme</SelectItem>
                    <SelectItem value="keine">Keine / Neubau</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label className="text-base font-medium">Gewünschtes neues System</Label>
              <Select
                value={formData.serviceDetails.desiredHeating || ""}
                onValueChange={(value) => updateServiceDetails("desiredHeating", value)}
              >
                <SelectTrigger className="mt-2 max-w-md" data-testid="select-desired-heating">
                  <SelectValue placeholder="Wohin soll die Reise gehen?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gas-brennwert">Gas-Brennwert (bewährt, günstig)</SelectItem>
                  <SelectItem value="waermepumpe-luft">Luft-Wärmepumpe (hohe Förderung)</SelectItem>
                  <SelectItem value="waermepumpe-erde">Erdwärmepumpe (sehr effizient)</SelectItem>
                  <SelectItem value="hybrid">Hybrid Gas + Wärmepumpe</SelectItem>
                  <SelectItem value="pellets">Pelletheizung</SelectItem>
                  <SelectItem value="beratung">Beratung gewünscht</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-3 p-4 bg-muted/50 rounded-lg">
              <Checkbox
                id="hotWaterIntegration"
                checked={formData.serviceDetails.hotWaterIntegration || false}
                onCheckedChange={(checked) => updateServiceDetails("hotWaterIntegration", checked)}
              />
              <div>
                <Label htmlFor="hotWaterIntegration" className="font-medium cursor-pointer">Warmwasser über Heizung</Label>
                <p className="text-sm text-muted-foreground">Zentrale Warmwasserbereitung gewünscht</p>
              </div>
            </div>
          </div>
        );

      case "energetische-sanierung":
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-base font-medium flex items-center gap-2">
                <Leaf className="w-4 h-4 text-primary" />
                Gebäudefläche
              </Label>
              <div className="flex items-center gap-2 mt-2">
                <Input
                  type="number"
                  placeholder="z.B. 150"
                  value={formData.serviceDetails.squareMeters || ""}
                  onChange={(e) => updateServiceDetails("squareMeters", e.target.value)}
                  className="max-w-24"
                  data-testid="input-square-meters"
                />
                <span className="text-muted-foreground">m²</span>
              </div>
            </div>

            <div>
              <Label className="text-base font-medium">Was soll gedämmt werden?</Label>
              <p className="text-sm text-muted-foreground mb-3">Mehrfachauswahl möglich</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: "Fassade", label: "Fassade/Außenwände" },
                  { id: "Dach", label: "Dach/Oberste Decke" },
                  { id: "Keller", label: "Kellerdecke" },
                  { id: "Fenster", label: "Fenster erneuern" },
                ].map((area) => (
                  <button
                    key={area.id}
                    type="button"
                    onClick={() => {
                      const current = formData.serviceDetails.insulationType || [];
                      if (current.includes(area.id)) {
                        updateServiceDetails("insulationType", current.filter(t => t !== area.id));
                      } else {
                        updateServiceDetails("insulationType", [...current, area.id]);
                      }
                    }}
                    className={`p-4 rounded-lg border-2 text-center transition-all hover-elevate ${
                      (formData.serviceDetails.insulationType || []).includes(area.id)
                        ? "border-primary bg-primary/5" 
                        : "border-border"
                    }`}
                  >
                    <p className="font-medium">{area.label}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 border rounded-lg">
                <Checkbox
                  id="renewableInterest"
                  checked={formData.serviceDetails.renewableInterest || false}
                  onCheckedChange={(checked) => updateServiceDetails("renewableInterest", checked)}
                />
                <Label htmlFor="renewableInterest" className="font-normal cursor-pointer">Interesse an Photovoltaik/Solar</Label>
              </div>
            </div>
          </div>
        );

      case "dachsanierung":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="text-base font-medium flex items-center gap-2">
                  <HardHat className="w-4 h-4 text-primary" />
                  Dachfläche
                </Label>
                <div className="flex items-center gap-2 mt-2">
                  <Input
                    type="number"
                    placeholder="z.B. 100"
                    value={formData.serviceDetails.squareMeters || ""}
                    onChange={(e) => {
                      updateServiceDetails("squareMeters", e.target.value);
                      updateServiceDetails("roofArea", e.target.value);
                    }}
                    className="max-w-24"
                    data-testid="input-square-meters"
                  />
                  <span className="text-muted-foreground">m²</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Geschätzt reicht aus</p>
              </div>

              <div>
                <Label className="text-base font-medium">Dachform</Label>
                <Select
                  value={formData.serviceDetails.roofType || ""}
                  onValueChange={(value) => updateServiceDetails("roofType", value)}
                >
                  <SelectTrigger className="mt-2" data-testid="select-roof-type">
                    <SelectValue placeholder="Welche Form?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="satteldach">Satteldach</SelectItem>
                    <SelectItem value="flachdach">Flachdach</SelectItem>
                    <SelectItem value="walmdach">Walmdach</SelectItem>
                    <SelectItem value="pultdach">Pultdach</SelectItem>
                    <SelectItem value="andere">Andere Form</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label className="text-base font-medium">Dachgeschoss-Nutzung</Label>
              <Select
                value={formData.serviceDetails.atticUse || ""}
                onValueChange={(value) => updateServiceDetails("atticUse", value)}
              >
                <SelectTrigger className="mt-2 max-w-md" data-testid="select-attic-use">
                  <SelectValue placeholder="Wie wird das DG genutzt?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="wohnraum">Ausgebauter Wohnraum</SelectItem>
                  <SelectItem value="ausbau-geplant">Ausbau geplant</SelectItem>
                  <SelectItem value="speicher">Abstellraum/Speicher</SelectItem>
                  <SelectItem value="unbenutzt">Nicht genutzt</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-3 p-4 bg-muted/50 rounded-lg">
              <Checkbox
                id="roofInsulation"
                checked={formData.serviceDetails.roofInsulation || false}
                onCheckedChange={(checked) => updateServiceDetails("roofInsulation", checked)}
              />
              <div>
                <Label htmlFor="roofInsulation" className="font-medium cursor-pointer">Dachdämmung gewünscht</Label>
                <p className="text-sm text-muted-foreground">Spart Heizkosten, erhöht Wohnkomfort</p>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-base font-medium">Projektgröße</Label>
              <div className="flex items-center gap-2 mt-2">
                <Input
                  type="number"
                  placeholder="z.B. 50"
                  value={formData.serviceDetails.squareMeters || ""}
                  onChange={(e) => updateServiceDetails("squareMeters", e.target.value)}
                  className="max-w-24"
                  data-testid="input-square-meters"
                />
                <span className="text-muted-foreground">m²</span>
              </div>
            </div>
          </div>
        );
    }
  };

  const renderStep4Condition = () => {
    const service = formData.service;

    const conditionOptions: Record<string, { value: string; label: string; desc: string; icon?: any }[]> = {
      badsanierung: [
        { value: "komplett-neu", label: "Alles muss raus", desc: "Kompletter Abriss und Neuaufbau", icon: AlertTriangle },
        { value: "veraltet", label: "Veraltet, aber funktional", desc: "Alte Fliesen, vergilbte Armaturen", icon: Clock },
        { value: "modernisierung", label: "Nur Modernisierung", desc: "Grundsubstanz in Ordnung", icon: Sparkles },
      ],
      kuechensanierung: [
        { value: "komplett-neu", label: "Neue Küche", desc: "Kompletter Austausch gewünscht", icon: Star },
        { value: "fronten-arbeitsplatte", label: "Optische Auffrischung", desc: "Fronten, Arbeitsplatte, Griffe", icon: PaintBucket },
        { value: "geraete-tausch", label: "Nur Geräte", desc: "Küche okay, Geräte veraltet", icon: Plug },
      ],
      komplettsanierung: [
        { value: "kernsanierung", label: "Kernsanierung", desc: "Bis auf den Rohbau zurück", icon: AlertTriangle },
        { value: "vollsanierung", label: "Vollständige Renovierung", desc: "Alle Räume, alle Gewerke", icon: Home },
        { value: "teilsanierung", label: "Teilsanierung", desc: "Nur bestimmte Bereiche", icon: Layers },
      ],
      bodensanierung: [
        { value: "beschaedigt", label: "Stark beschädigt", desc: "Löcher, Quietschen, Wasserschäden", icon: AlertTriangle },
        { value: "abgenutzt", label: "Abgenutzt", desc: "Kratzer, stumpfe Oberfläche", icon: Layers },
        { value: "optisch", label: "Optisch nicht mehr schön", desc: "Funktioniert, gefällt nicht mehr", icon: PaintBucket },
      ],
      elektrosanierung: [
        { value: "unsicher", label: "Sicherheitsbedenken", desc: "Flackern, Wackelkontakte, alte Sicherungen", icon: AlertTriangle },
        { value: "veraltet", label: "Veraltet", desc: "Zu wenig Steckdosen, keine FI-Schalter", icon: Zap },
        { value: "erweiterung", label: "Erweiterung gewünscht", desc: "Mehr Anschlüsse, Smart Home", icon: Plug },
      ],
      heizungssanierung: [
        { value: "defekt", label: "Heizung defekt", desc: "Fällt aus, heizt nicht mehr richtig", icon: AlertTriangle },
        { value: "ineffizient", label: "Zu hohe Kosten", desc: "Funktioniert, aber teuer", icon: Flame },
        { value: "umstieg", label: "Technologie-Wechsel", desc: "Weg von Öl/Gas, hin zu Wärmepumpe", icon: Leaf },
      ],
      "energetische-sanierung": [
        { value: "ungedaemmt", label: "Keine Dämmung", desc: "Altbau ohne energetische Maßnahmen", icon: ThermometerSun },
        { value: "teilgedaemmt", label: "Teilweise gedämmt", desc: "Einzelne Maßnahmen vorhanden", icon: Layers },
        { value: "optimierung", label: "Optimierung gewünscht", desc: "Besser dämmen, effizienter heizen", icon: Leaf },
      ],
      dachsanierung: [
        { value: "undicht", label: "Dach ist undicht", desc: "Wassereintritt, Schäden sichtbar", icon: AlertTriangle },
        { value: "alt", label: "Alte Eindeckung", desc: "Ziegel porös, Beschichtung ab", icon: Clock },
        { value: "daemmung", label: "Dämmung fehlt", desc: "Dach dicht, aber kalt", icon: ThermometerSun },
      ],
    };

    const options = conditionOptions[service] || conditionOptions.komplettsanierung;

    return (
      <div className="space-y-6">
        <RadioGroup
          value={formData.serviceDetails.condition || ""}
          onValueChange={(value) => updateServiceDetails("condition", value)}
          className="space-y-4"
        >
          {options.map((option) => {
            const Icon = option.icon || CheckCircle;
            return (
              <div 
                key={option.value} 
                className={`flex items-start space-x-4 p-4 rounded-lg border-2 cursor-pointer transition-all hover-elevate ${
                  formData.serviceDetails.condition === option.value ? "border-primary bg-primary/5" : "border-border"
                }`}
                onClick={() => updateServiceDetails("condition", option.value)}
              >
                <RadioGroupItem value={option.value} id={`condition-${option.value}`} className="mt-1" data-testid={`radio-condition-${option.value}`} />
                <Icon className={`w-6 h-6 flex-shrink-0 ${formData.serviceDetails.condition === option.value ? "text-primary" : "text-muted-foreground"}`} />
                <div className="flex-1">
                  <Label htmlFor={`condition-${option.value}`} className="font-semibold text-base cursor-pointer">{option.label}</Label>
                  <p className="text-sm text-muted-foreground mt-1">{option.desc}</p>
                </div>
              </div>
            );
          })}
        </RadioGroup>

        <div className="pt-4 border-t">
          <Label htmlFor="specialRequirements" className="text-base font-medium">Gibt es Besonderheiten?</Label>
          <p className="text-sm text-muted-foreground mb-2">Asbest, Schimmel, Denkmalschutz, besondere Wünsche...</p>
          <Textarea
            id="specialRequirements"
            placeholder="Optional: Beschreiben Sie besondere Umstände..."
            value={formData.serviceDetails.specialRequirements || ""}
            onChange={(e) => updateServiceDetails("specialRequirements", e.target.value)}
            className="min-h-20"
            data-testid="textarea-special-requirements"
          />
        </div>
      </div>
    );
  };

  const renderStep5Quality = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {config.qualityOptions.map((level, index) => {
          const icons = [Star, Sparkles, Crown];
          const Icon = icons[index] || Star;
          const isSelected = formData.qualityLevel === level.id;
          return (
            <button
              key={level.id}
              type="button"
              onClick={() => updateFormData("qualityLevel", level.id)}
              className={`p-6 rounded-lg border-2 text-left transition-all hover-elevate ${
                isSelected ? "border-primary bg-primary/5" : "border-border"
              }`}
              data-testid={`button-quality-${level.id}`}
            >
              <div className="flex flex-col">
                <div className={`p-3 rounded-full w-fit mb-4 ${isSelected ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <p className="font-bold text-lg">{level.label}</p>
                <p className="text-sm text-muted-foreground mt-2">{level.desc}</p>
                <p className="text-xs text-muted-foreground mt-3 italic">{level.examples}</p>
                {isSelected && <CheckCircle className="w-5 h-5 text-primary mt-4" />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );

  const renderStep6Timeline = () => {
    const timelineOptions = [
      { id: "sofort", label: "So schnell wie möglich", desc: "Innerhalb der nächsten 2 Wochen", urgent: true },
      { id: "1-monat", label: "In 1-2 Monaten", desc: "Zeitnah, aber nicht sofort", urgent: false },
      { id: "3-monate", label: "In 3-6 Monaten", desc: "Geplantes Projekt", urgent: false },
      { id: "6-monate", label: "In 6-12 Monaten", desc: "Langfristige Planung", urgent: false },
      { id: "flexibel", label: "Flexibel", desc: "Kein fester Zeitrahmen", urgent: false },
    ];

    return (
      <div className="space-y-6">
        <RadioGroup
          value={formData.timeline}
          onValueChange={(value) => {
            updateFormData("timeline", value);
            const isUrgent = value === "sofort";
            updateFormData("isUrgent", isUrgent);
          }}
          className="space-y-3"
        >
          {timelineOptions.map((option) => (
            <div 
              key={option.id} 
              className={`flex items-start space-x-4 p-4 rounded-lg border-2 cursor-pointer transition-all hover-elevate ${
                formData.timeline === option.id ? "border-primary bg-primary/5" : "border-border"
              }`}
              onClick={() => {
                updateFormData("timeline", option.id);
                updateFormData("isUrgent", option.urgent);
              }}
            >
              <RadioGroupItem value={option.id} id={`timeline-${option.id}`} className="mt-1" data-testid={`radio-timeline-${option.id}`} />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Label htmlFor={`timeline-${option.id}`} className="font-semibold cursor-pointer">{option.label}</Label>
                  {option.urgent && <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded">Dringend</span>}
                </div>
                <p className="text-sm text-muted-foreground mt-1">{option.desc}</p>
              </div>
            </div>
          ))}
        </RadioGroup>

        <div className="pt-4 border-t">
          <Label className="text-base font-medium mb-4 block">Budget-Orientierung</Label>
          <p className="text-sm text-muted-foreground mb-4">
            Hilft uns, passende Lösungen vorzuschlagen. Alle Preise sind Richtwerte.
          </p>
          <Select
            value={formData.budgetRange}
            onValueChange={(value) => updateFormData("budgetRange", value)}
          >
            <SelectTrigger className="max-w-md" data-testid="select-budget">
              <SelectValue placeholder="Budget-Rahmen wählen" />
            </SelectTrigger>
            <SelectContent>
              {config.budgetRanges.map((range) => (
                <SelectItem key={range.id} value={range.id}>
                  <span className="font-medium">{range.label}</span>
                  <span className="text-muted-foreground ml-2">- {range.desc}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    );
  };

  const renderStep7Location = () => (
    <div className="space-y-6">
      <div className="p-4 bg-muted/50 rounded-lg mb-6">
        <p className="text-sm">
          Wir arbeiten in München und Umgebung (ca. 50km Radius). 
          Die genaue Adresse ist optional, hilft uns aber bei der Planung.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="postalCode" className="text-base font-medium">Postleitzahl *</Label>
          <Input
            id="postalCode"
            type="text"
            placeholder="z.B. 81379"
            value={formData.postalCode}
            onChange={(e) => updateFormData("postalCode", e.target.value)}
            className="mt-2"
            data-testid="input-postal-code"
          />
        </div>

        <div>
          <Label htmlFor="city" className="text-base font-medium">Ort *</Label>
          <Input
            id="city"
            type="text"
            placeholder="z.B. München"
            value={formData.city}
            onChange={(e) => updateFormData("city", e.target.value)}
            className="mt-2"
            data-testid="input-city"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="address" className="text-base font-medium">Straße und Hausnummer</Label>
        <Input
          id="address"
          type="text"
          placeholder="Optional - für den Vor-Ort-Termin"
          value={formData.address}
          onChange={(e) => updateFormData("address", e.target.value)}
          className="mt-2"
          data-testid="input-address"
        />
      </div>
    </div>
  );

  const renderStep8Contact = () => (
    <div className="space-y-6">
      <div className="p-4 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 rounded-lg">
        <div className="flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-green-800 dark:text-green-200">Sie erhalten von uns:</p>
            <ul className="text-sm text-green-700 dark:text-green-300 mt-1 space-y-1">
              <li>Unverbindliches Angebot innerhalb von 24h</li>
              <li>Transparente Kostenaufstellung</li>
              <li>Persönliche Beratung durch Experten</li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <Label htmlFor="name" className="text-base font-medium">Ihr Name *</Label>
        <Input
          id="name"
          type="text"
          placeholder="Vor- und Nachname"
          value={formData.name}
          onChange={(e) => updateFormData("name", e.target.value)}
          className="mt-2"
          data-testid="input-name"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="phone" className="text-base font-medium">Telefon *</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="Für Rückfragen"
            value={formData.phone}
            onChange={(e) => updateFormData("phone", e.target.value)}
            className="mt-2"
            data-testid="input-phone"
          />
        </div>

        <div>
          <Label htmlFor="email" className="text-base font-medium">E-Mail *</Label>
          <Input
            id="email"
            type="email"
            placeholder="Für das Angebot"
            value={formData.email}
            onChange={(e) => updateFormData("email", e.target.value)}
            className="mt-2"
            data-testid="input-email"
          />
        </div>
      </div>

      <div className="flex items-start space-x-3 p-4 border rounded-lg">
        <Checkbox
          id="privacy"
          checked={privacyAccepted}
          onCheckedChange={(checked) => setPrivacyAccepted(checked as boolean)}
          className="mt-0.5"
          data-testid="checkbox-privacy"
        />
        <Label htmlFor="privacy" className="text-sm font-normal leading-relaxed cursor-pointer">
          Ich stimme der Verarbeitung meiner Daten gemäß der Datenschutzerklärung zu. 
          Meine Daten werden ausschließlich zur Bearbeitung meiner Anfrage verwendet und nicht an Dritte weitergegeben.
        </Label>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3Scope();
      case 4: return renderStep4Condition();
      case 5: return renderStep5Quality();
      case 6: return renderStep6Timeline();
      case 7: return renderStep7Location();
      case 8: return renderStep8Contact();
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-50 bg-[hsl(220,85%,10%)] text-white border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="h-16 flex items-center justify-between gap-4">
            <Link href="/">
              <div className="flex items-center gap-2 cursor-pointer">
                <Building2 className="w-7 h-7 text-white" />
                <div className="flex flex-col">
                  <span className="font-bold text-base leading-tight text-white">Komplettsanierungen</span>
                  <span className="text-xs text-white/70 leading-tight">Haus & Wohnung</span>
                </div>
              </div>
            </Link>
            <div className="hidden lg:flex items-center gap-1">
              {headerServices.map((service) => (
                <Link key={service.id} href={`/anfrage?service=${service.id}`}>
                  <Button variant="ghost" size="sm" className="text-sm text-white/80 hover:text-white hover:bg-white/10">
                    {service.title}
                  </Button>
                </Link>
              ))}
            </div>
            <a href="tel:+4915212274043" className="hidden sm:flex">
              <Button className="bg-green-500 hover:bg-green-600 text-white border-green-500">
                <Phone className="w-4 h-4 mr-2" />
                0152 122 740 43
              </Button>
            </a>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl pt-24 flex-1">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">Schritt {currentStep} von {totalSteps}</span>
            <span className="text-sm font-medium">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl md:text-2xl">{getStepTitle()}</CardTitle>
                <p className="text-muted-foreground">{getStepSubtitle()}</p>
              </CardHeader>
              <CardContent>
                {renderCurrentStep()}

                <div className="flex justify-between gap-4 mt-8 pt-6 border-t">
                  {currentStep === 1 ? (
                    <Link href="/">
                      <Button className="bg-green-500 hover:bg-green-600 text-white border-green-500" data-testid="button-back-home">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Zurück zur Startseite
                      </Button>
                    </Link>
                  ) : (
                    <Button variant="outline" onClick={handleBack} data-testid="button-back">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Zurück
                    </Button>
                  )}
                  
                  <div className="ml-auto">
                    {currentStep < totalSteps ? (
                      <Button onClick={handleNext} disabled={!canProceed()} data-testid="button-next">
                        Weiter
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    ) : (
                      <Button onClick={handleSubmit} disabled={!canProceed() || createLeadMutation.isPending} data-testid="button-submit">
                        {createLeadMutation.isPending ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Wird gesendet...
                          </>
                        ) : (
                          <>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Angebot anfordern
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">100% Unverbindlich</p>
                      <p className="text-sm text-muted-foreground">Kostenlose Beratung</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Schnelle Antwort</p>
                      <p className="text-sm text-muted-foreground">Innerhalb von 24 Stunden</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Award className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Meisterqualität</p>
                      <p className="text-sm text-muted-foreground">20+ Jahre Erfahrung</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-3">Ihre Vorteile</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span>Kein Stress mit Handwerkersuche</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span>Festpreis ohne Überraschungen</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span>Ein Ansprechpartner für alles</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span>Termintreue Umsetzung</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold">Lieber telefonisch?</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-2">Rufen Sie uns direkt an:</p>
                <a href="tel:+4915212274043" className="text-lg font-bold text-primary" data-testid="link-phone">
                  0152 122 740 43
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <footer className="pt-12 pb-6 bg-[hsl(220,85%,10%)] text-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Building2 className="w-8 h-8 text-white" />
                <div className="flex flex-col">
                  <span className="font-bold text-xl leading-tight">KSHW München</span>
                  <span className="text-sm text-white/70 leading-tight">Komplettsanierungen Haus & Wohnung</span>
                </div>
              </div>
              <p className="text-white/70 text-sm mt-2">
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
              </ul>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-white/20 text-center text-sm text-white/70">
            &copy; {new Date().getFullYear()} komplettsanierungen-haus-wohnung.de - Alle Rechte vorbehalten.
          </div>
        </div>
      </footer>
    </div>
  );
}
