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
  MapPin,
  HelpCircle,
  Calendar,
  Menu,
  X
} from "lucide-react";
import { Link } from "wouter";
import kshwLogoWhiteBg from "@assets/favicon-192-whitebg_1765228119332.png";
import { SiteHeader } from "@/components/site-header";
import { PageHero } from "@/components/page-hero";
import { SeoHead, generateServiceSchema, generateFaqSchema } from "@/components/seo-head";
import consultationHeroImage from "@assets/generated_images/renovation_consultation_meeting.png";
import komplettsanierungHeroImage from "@assets/generated_images/complete_renovation_before-after_split.png";
import badsanierungHeroImage from "@assets/generated_images/modern_luxury_bathroom_renovation.png";

const serviceHeroImages: Record<string, string> = {
  komplettsanierung: komplettsanierungHeroImage,
  badsanierung: badsanierungHeroImage,
  kuechensanierung: consultationHeroImage,
  bodensanierung: consultationHeroImage,
  elektrosanierung: consultationHeroImage,
  heizungssanierung: consultationHeroImage,
  "energetische-sanierung": consultationHeroImage,
  dachsanierung: consultationHeroImage,
};

const headerServices = [
  { id: "komplettsanierung", title: "Komplettsanierung" },
  { id: "badsanierung", title: "Badsanierung" },
  { id: "dachsanierung", title: "Dachsanierung" },
  { id: "energetische-sanierung", title: "Energetische Sanierung" },
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

// SEO Content for each service - shown as intro when service is pre-selected
// Optimized for Google, Bing, and AI search (ChatGPT, Perplexity, Gemini)
const serviceSeoContent: Record<string, {
  headline: string;
  subheadline: string;
  intro: string;
  problems: string[];
  solutions: string[];
  benefits: string[];
  geoText: string;
  ctaText: string;
  faq: { question: string; answer: string }[];
  keywords: string[];
}> = {
  komplettsanierung: {
    headline: "Komplettsanierung München | Haus & Wohnung renovieren lassen",
    subheadline: "Schlüsselfertige Sanierung aus einer Hand – Festpreis, Termingarantie, 5 Jahre Gewährleistung",
    intro: "Was kostet eine Komplettsanierung in München? Wie lange dauert eine Kernsanierung? Wer koordiniert die Handwerker? Bei KSHW München erhalten Sie Antworten und eine professionelle Komplettlösung. Wir sanieren Häuser und Wohnungen in München schlüsselfertig – mit einem festen Ansprechpartner, transparenten Festpreisen ab 1.000€/m² (netto zzgl. MwSt., Stand 12/2025) und einer Fertigstellungsgarantie. Über 268 zufriedene Kunden in München vertrauen auf unsere Meisterqualität.",
    problems: [
      "Handwerkersuche in München: Wochenlange Wartezeiten und unzuverlässige Termine",
      "Kostenexplosion: Angebote ohne Festpreis führen zu 30-50% Mehrkosten",
      "Koordinationschaos: 5-8 verschiedene Gewerke müssen aufeinander abgestimmt werden",
      "Qualitätsprobleme: Pfusch durch fehlende Bauleitung und Qualitätskontrolle",
      "Zeitverlust: Durchschnittlich 3 Monate Verzögerung ohne professionelle Projektleitung"
    ],
    solutions: [
      "Ein Fachbetrieb koordiniert alle Gewerke: Elektriker, Sanitär, Maler, Fliesenleger, Trockenbauer",
      "Festpreisgarantie nach kostenloser Vor-Ort-Besichtigung – keine Nachträge",
      "Terminplan mit Meilensteinen und Fertigstellungsdatum im Vertrag",
      "Eigener Bauleiter mit täglicher Qualitätskontrolle auf der Baustelle",
      "24/7 Erreichbarkeit über WhatsApp, Telefon und E-Mail während der Bauphase"
    ],
    benefits: [
      "Zeitersparnis: 100+ Stunden weniger Aufwand durch Komplettkoordination",
      "Kostensicherheit: Festpreis ab 1.000€/m² (netto zzgl. MwSt.) – was im Angebot steht, wird bezahlt",
      "Qualitätsgarantie: 5 Jahre Gewährleistung auf alle Arbeiten, Materialien und Gewerke",
      "Erfahrung: 268+ Projekte in München seit 2010 – Altbau, Neubau, Gewerbe",
      "Flexibilität: Sanierung bei bewohnter Immobilie möglich – Staubschutz, Lärmschutz, Reinigung inklusive"
    ],
    geoText: "KSHW München – Ihr Sanierungspartner vor Ort. Wir sanieren in allen Münchner Stadtteilen: Schwabing, Maxvorstadt, Bogenhausen, Haidhausen, Au, Giesing, Sendling, Westend, Neuhausen, Nymphenburg, Laim, Pasing, Obermenzing, Allach, Moosach, Milbertshofen, Freimann, Trudering, Riem, Berg am Laim, Ramersdorf, Perlach, Neuperlach, Solln, Obersendling, Thalkirchen, Fürstenried, Forstenried, Großhadern und Hadern. Ebenso im Münchner Umland: Landkreis München, Dachau, Karlsfeld, Germering, Fürstenfeldbruck, Freising, Starnberg, Garching, Unterschleißheim, Ottobrunn, Haar, Grünwald, Pullach, Gräfelfing und Planegg.",
    ctaText: "Kostenloses Angebot in 24h",
    faq: [
      { question: "Was kostet eine Komplettsanierung in München pro m²?", answer: "Eine Komplettsanierung in München kostet ca. 1.000-2.300€/m² (netto zzgl. MwSt., Stand 12/2025), abhängig von Zustand, Ausstattungswunsch und Umfang der Arbeiten." },
      { question: "Wie lange dauert eine Komplettsanierung?", answer: "Eine Komplettsanierung einer 80m² Wohnung dauert ca. 6-8 Wochen, ein Einfamilienhaus 10-16 Wochen – abhängig vom Sanierungsumfang." },
      { question: "Kann ich während der Sanierung in der Wohnung bleiben?", answer: "Ja, wir bieten Sanierung bei bewohnter Immobilie an – mit Staubschutz, Lärmschutzzeiten und täglicher Reinigung." }
    ],
    keywords: ["Komplettsanierung München", "Haus sanieren München", "Wohnung renovieren München", "Kernsanierung München Kosten", "Altbausanierung München", "Sanierung aus einer Hand München"]
  },
  badsanierung: {
    headline: "Badsanierung München | Bad renovieren & neu gestalten lassen",
    subheadline: "Komplette Badrenovierung in 10-15 Werktagen – Festpreis ab 8.000€, alle Gewerke inklusive",
    intro: "Was kostet eine Badsanierung in München? Wie lange dauert eine komplette Badrenovierung? Welcher Handwerker macht alles? Bei KSHW München erhalten Sie ein komplett neues Badezimmer aus einer Hand – Fliesenleger, Sanitär, Elektriker und Maler perfekt koordiniert. Badsanierung München ab 8.000€ für Gäste-WC bis 50.000€ für Wellness-Bad (netto zzgl. MwSt., Stand 12/2025). Festpreisgarantie, 14-21 Tage Bauzeit, 5 Jahre Gewährleistung. Bereits 300+ Bäder in München erfolgreich saniert.",
    problems: [
      "Schimmel im Bad München: Gesundheitsrisiko durch schwarze Fugen und feuchte Wände",
      "Alte Badezimmer: 70er/80er Jahre Fliesen, verkalkte Armaturen, vergilbte Wannen",
      "Wasserschäden: Undichte Silikonfugen und defekte Abdichtungen verursachen teure Folgeschäden",
      "Platzmangel: Unpraktische Raumaufteilung, fehlender Stauraum, keine bodengleiche Dusche",
      "Hohe Wasserkosten: Alte Spülkästen und Armaturen verschwenden 30-50% mehr Wasser"
    ],
    solutions: [
      "Schimmelsanierung: Professionelle Entfernung, Ursachenbekämpfung, neue Abdichtung nach DIN 18534",
      "Komplettumbau: Neue Fliesen, Sanitärobjekte, Armaturen – Marken wie Villeroy & Boch, Grohe, Geberit",
      "Wasserdicht: Fachmännische Abdichtung aller Nassbereiche, 10 Jahre Dichtheitsgarantie",
      "Raumwunder: Clevere Grundrissoptimierung, Einbauschränke, Walk-In-Dusche statt Wanne",
      "Wassersparen: Moderne Spülsysteme und Armaturen reduzieren Wasserverbrauch um 40%"
    ],
    benefits: [
      "Schnell: Komplette Badsanierung in 10-15 Werktagen, Gäste-WC in 5-7 Tagen",
      "Festpreis: Ab 8.000€ (Gäste-WC) bis 50.000€ (Wellness-Bad) netto zzgl. MwSt. – keine Nachträge",
      "Alles inklusive: Fliesenleger, Sanitär, Elektriker, Maler aus einer Hand",
      "Qualität: 5 Jahre Gewährleistung, nur Markenprodukte, Meisterqualität",
      "Sauber: Staubschutz, tägliche Reinigung, Nutzung von Ersatz-WC organisiert"
    ],
    geoText: "Badsanierung in München und Umgebung – Ihr lokaler Badexperte. Wir sanieren Badezimmer in: Schwabing, Maxvorstadt, Bogenhausen, Haidhausen, Giesing, Sendling, Westend, Neuhausen, Nymphenburg, Laim, Pasing, Trudering, Riem, Berg am Laim, Perlach, Neuperlach, Solln, Großhadern und allen weiteren Stadtteilen. Auch im Münchner Umland: Dachau, Karlsfeld, Germering, Starnberg, Freising, Garching, Unterschleißheim, Ottobrunn, Haar, Grünwald und Pullach.",
    ctaText: "Traumbad planen lassen",
    faq: [
      { question: "Was kostet eine komplette Badsanierung in München?", answer: "Eine Badsanierung in München kostet (netto zzgl. MwSt., Stand 12/2025): Gäste-WC 8.000-12.000€, Standard-Bad 16.000-22.000€, Komfort-Bad 22.000-32.000€, Luxus-Bad 35.000-50.000€. Barrierefreier Umbau: +3.000-5.000€." },
      { question: "Wie lange dauert eine Badsanierung?", answer: "Eine komplette Badsanierung dauert 10-15 Werktage. Ein Gäste-WC ist in 5-7 Tagen fertig. Während der Bauzeit organisieren wir Ersatz-WC-Nutzung." },
      { question: "Muss ich während der Badsanierung ausziehen?", answer: "Nein, Sie können in Ihrer Wohnung bleiben. Wir installieren Staubschutzwände und organisieren die Nutzung eines Ersatz-WCs." }
    ],
    keywords: ["Badsanierung München", "Bad renovieren München", "Badezimmer sanieren München Kosten", "Badsanierung München Festpreis", "Badrenovierung München", "Bad komplett sanieren München"]
  },
  kuechensanierung: {
    headline: "Küchensanierung München | Küche renovieren & umbauen lassen",
    subheadline: "Neue Küche komplett installiert – Elektrik, Wasser, Fliesen, Montage aus einer Hand",
    intro: "Was kostet eine Küchenrenovierung in München? Wer verlegt die Anschlüsse für die neue Küche? Wie lange dauert ein Küchenumbau? Bei KSHW München erhalten Sie den kompletten Küchenumbau aus einer Hand – Elektroinstallation, Wasseranschlüsse, Fliesenarbeiten und finale Montage perfekt koordiniert. Ob Sie Ihre alte Küche aufwerten oder komplett neu gestalten möchten: Festpreis, fester Termin, 5 Jahre Gewährleistung.",
    problems: [
      "Zu wenig Steckdosen: Moderne Küchen brauchen 8-12 Steckdosen, alte haben oft nur 3-4",
      "Veraltete Elektrik: Alte Leitungen sind nicht für Induktion, Backofen und Dampfgarer ausgelegt",
      "Wasseranschlüsse: Falsche Position für Spüle, Spülmaschine, Kühlschrank mit Wasserspender",
      "Alte Fliesen: Abgenutzte Fliesenspiegel passen nicht zur neuen Küche",
      "Schlechte Beleuchtung: Dunkle Arbeitsflächen durch fehlende Unterbauleuchten"
    ],
    solutions: [
      "Elektro-Komplettpaket: Ausreichend Steckdosen, Starkstrom für Herd, LED-Beleuchtung",
      "Moderne Installation: Neue Leitungen für Induktion bis 7,4kW, Backofen, alle Geräte",
      "Wasserinstallation: Anschlüsse exakt nach Küchenplan, Absperrventile, Rückstausicherung",
      "Fliesenarbeiten: Neuer Fliesenspiegel oder Nischenrückwand aus Glas/Edelstahl",
      "Lichtkonzept: Arbeitslicht, Ambientelicht, smarte Steuerung auf Wunsch"
    ],
    benefits: [
      "Alles inklusive: Elektriker, Sanitär, Fliesenleger – ein Ansprechpartner für alles",
      "Festpreis: Komplette Kücheninstallation ab 3.500€, keine versteckten Kosten",
      "Schnell: Küchenumbau in 5-10 Werktagen, minimale Zeit ohne Küche",
      "Sauber: Staubschutz, Möbelschutz, tägliche Reinigung der Baustelle",
      "Garantie: 5 Jahre Gewährleistung auf alle Installations- und Handwerksarbeiten"
    ],
    geoText: "Küchensanierung in München und Umgebung – Ihr Partner für den Küchenumbau. Wir arbeiten in allen Münchner Stadtteilen: Schwabing, Maxvorstadt, Bogenhausen, Haidhausen, Giesing, Sendling, Westend, Neuhausen, Nymphenburg, Pasing, Trudering, Riem, Perlach, Solln und allen weiteren. Service auch in: Dachau, Karlsfeld, Germering, Starnberg, Freising, Garching, Unterschleißheim, Ottobrunn, Haar und Grünwald.",
    ctaText: "Küchenumbau planen",
    faq: [
      { question: "Was kostet ein kompletter Küchenumbau in München?", answer: "Die Handwerkerarbeiten für einen Küchenumbau (Elektro, Wasser, Fliesen, Montage) kosten in München 3.500-8.000€ – abhängig von Umfang und Anpassungen. Die Küchenmöbel kommen separat dazu." },
      { question: "Wie lange dauert eine Küchenrenovierung?", answer: "Ein Küchenumbau mit neuen Anschlüssen dauert 5-10 Werktage. Die reine Küchenmontage ohne Umbauarbeiten ist in 1-2 Tagen erledigt." },
      { question: "Können Sie auch nur die Anschlüsse verlegen?", answer: "Ja, wir bieten auch einzelne Leistungen an: Elektroinstallation, Wasseranschlüsse oder Fliesenarbeiten – ganz nach Ihrem Bedarf." }
    ],
    keywords: ["Küchensanierung München", "Küche renovieren München", "Küchenumbau München Kosten", "Küche umbauen München", "Küchenanschlüsse verlegen München", "Küche neu gestalten München"]
  },
  bodensanierung: {
    headline: "Bodensanierung München | Parkett, Fliesen & Vinylboden verlegen",
    subheadline: "Neuer Boden in 2-5 Tagen – Parkett ab 45€/m², Vinyl ab 35€/m², Fliesen ab 55€/m²",
    intro: "Was kostet ein neuer Boden in München? Wie lange dauert eine Bodenrenovierung? Welcher Bodenbelag ist der beste? Bei KSHW München erhalten Sie professionelle Bodenverlegung vom Fachmann – Parkett, Laminat, Vinyl, Fliesen oder Designboden. Inklusive Untergrundvorbereitung, Trittschalldämmung und Sockelleisten. Festpreis pro m², schnelle Umsetzung, 5 Jahre Gewährleistung.",
    problems: [
      "Alte Böden: Kratzer, Dellen, Verfärbungen – der Boden sieht abgenutzt aus",
      "Quietschende Dielen: Lose Parkettstäbe und knarrende Böden bei jedem Schritt",
      "Teppich-Probleme: Allergene, Gerüche, Flecken – unhygienisch und unmodern",
      "Unebener Untergrund: Stolperfallen durch Höhenunterschiede und Wellen",
      "Kalte Füße: Fehlende Fußbodenheizung, schlechte Wärmedämmung"
    ],
    solutions: [
      "Bodenaufarbeitung: Parkett schleifen, versiegeln oder ölen – wie neu für 25-40€/m²",
      "Untergrundausgleich: Spachteln, nivellieren, Trittschalldämmung verlegen",
      "Neuer Bodenbelag: Parkett, Vinyl, Laminat, Fliesen – fachgerecht verlegt",
      "Präzise Verlegung: Laser-Nivellierung für perfekt ebene Oberflächen",
      "Fußbodenheizung: Nachrüstung möglich, kompatible Bodenbeläge"
    ],
    benefits: [
      "Große Auswahl: Parkett, Laminat, Vinyl, Fliesen, Designböden – alle Marken",
      "Schnell: 50m² Wohnung in 2-3 Tagen, 100m² Haus in 4-5 Tagen fertig",
      "Staubarm: Maschinen mit Absaugung, tägliche Reinigung, Möbelschutz",
      "Festpreis: Ab 35€/m² (Vinyl) bis 85€/m² (Massivparkett) – inklusive allem",
      "Garantie: 5 Jahre Gewährleistung auf Verlegung und Material"
    ],
    geoText: "Bodensanierung in München und Umgebung – Ihr Bodenleger-Fachbetrieb. Wir verlegen neue Böden in: Schwabing, Maxvorstadt, Bogenhausen, Haidhausen, Giesing, Sendling, Westend, Neuhausen, Nymphenburg, Pasing, Trudering, Riem, Perlach, Solln und allen Münchner Stadtteilen. Service auch in: Dachau, Karlsfeld, Germering, Starnberg, Freising, Garching, Unterschleißheim, Ottobrunn, Haar und Grünwald.",
    ctaText: "Bodenangebot anfordern",
    faq: [
      { question: "Was kostet ein neuer Boden pro m² in München?", answer: "Bodenpreise in München: Vinyl ab 35€/m², Laminat ab 40€/m², Parkett ab 45€/m², Fliesen ab 55€/m² – jeweils inkl. Verlegung, Trittschalldämmung und Sockelleisten." },
      { question: "Wie lange dauert eine Bodenrenovierung?", answer: "Eine 50m² Wohnung ist in 2-3 Tagen fertig, ein 100m² Haus in 4-5 Tagen. Parkett schleifen dauert 1-2 Tage pro Raum." },
      { question: "Können Sie auch altes Parkett aufarbeiten?", answer: "Ja, Parkett schleifen und versiegeln kostet 25-40€/m² und macht Ihren Boden wie neu. Wir prüfen, ob Aufarbeiten oder Austausch sinnvoller ist." }
    ],
    keywords: ["Bodensanierung München", "Parkett verlegen München", "Vinylboden München", "Boden erneuern München Kosten", "Laminat verlegen München", "Fliesen verlegen München"]
  },
  elektrosanierung: {
    headline: "Elektrosanierung München | Elektrik erneuern & modernisieren",
    subheadline: "Sichere Elektroinstallation nach VDE – mehr Steckdosen, FI-Schutz, Smart Home ready",
    intro: "Ist Ihre Elektrik noch sicher? Wie viele Steckdosen braucht eine moderne Wohnung? Was kostet eine Elektrosanierung in München? Bei KSHW München modernisieren wir Ihre Elektroinstallation fachgerecht nach VDE-Norm. Vom neuen Sicherungskasten über ausreichend Steckdosen bis zur Wallbox-Vorbereitung. Eingetragener Elektrofachbetrieb, E-Check, Prüfprotokoll für Versicherung inklusive.",
    problems: [
      "Zu wenige Steckdosen: Moderne Haushalte brauchen 40-60 Steckdosen, Altbauten haben oft nur 15-20",
      "Veraltete Sicherungen: Schmelzsicherungen und fehlender FI-Schutz – lebensgefährlich",
      "Alte Leitungen: Stoff- oder Gummi-ummantelte Leitungen aus den 50er-70er Jahren – Brandgefahr",
      "Überlastung: Sicherungen fliegen raus, flackerndes Licht, Geräte funktionieren nicht richtig",
      "Keine Zukunftssicherheit: Keine Vorbereitung für E-Auto, Wärmepumpe oder Smart Home"
    ],
    solutions: [
      "Bedarfsanalyse: Ausreichend Steckdosen für jeden Raum nach aktuellem Standard planen",
      "Sicherungskasten neu: Moderner Verteiler mit FI-Schaltern, Überspannungsschutz, Reserveplätze",
      "Neue Leitungen: Komplette Neuverkabelung mit NYM-Leitungen, sauber unter Putz oder in Kabelkanälen",
      "Leistungserhöhung: Zählerkasten-Upgrade, Hausanschluss prüfen, ausreichend Absicherung",
      "Zukunftssicher: Wallbox-Vorbereitung, Wärmepumpen-Anschluss, Smart-Home-Verkabelung"
    ],
    benefits: [
      "VDE-konform: Alle Arbeiten nach aktuellen Normen und Vorschriften",
      "Fachbetrieb: Eingetragener Elektrofachbetrieb, nur geprüfte Elektriker",
      "E-Check: Prüfprotokoll für Versicherung und Vermieter inklusive",
      "Festpreis: Elektrosanierung ab 3.500€ (Wohnung) bis 12.000€ (Haus) – transparent kalkuliert",
      "Garantie: 5 Jahre Gewährleistung auf alle Elektroarbeiten"
    ],
    geoText: "Elektrosanierung in München und Umgebung – Ihr Elektrofachbetrieb im Partnernetzwerk. Wir modernisieren Elektrik in: Schwabing, Maxvorstadt, Bogenhausen, Haidhausen, Giesing, Sendling, Westend, Neuhausen, Nymphenburg, Pasing, Trudering, Riem, Perlach, Solln und allen Münchner Stadtteilen. Service auch in: Dachau, Karlsfeld, Germering, Starnberg, Freising, Garching, Unterschleißheim, Ottobrunn, Haar und Grünwald.",
    ctaText: "Elektrik-Check anfordern",
    faq: [
      { question: "Was kostet eine komplette Elektrosanierung in München?", answer: "Eine Elektrosanierung kostet in München: 2-Zimmer-Wohnung 3.500-5.500€, 4-Zimmer-Wohnung 5.500-8.000€, Einfamilienhaus 8.000-15.000€ – abhängig von Zustand und Umfang." },
      { question: "Wie erkenne ich, ob meine Elektrik veraltet ist?", answer: "Warnsignale: Schmelzsicherungen statt Automaten, fehlender FI-Schalter, zu wenige Steckdosen, flackerndes Licht, Sicherungen fliegen oft raus. Wir machen einen kostenlosen E-Check." },
      { question: "Wie lange dauert eine Elektrosanierung?", answer: "Eine Wohnung ist in 3-5 Tagen fertig, ein Einfamilienhaus in 5-10 Tagen – abhängig davon, ob die Leitungen über oder unter Putz verlegt werden." }
    ],
    keywords: ["Elektrosanierung München", "Elektrik erneuern München", "Elektriker München Altbau", "Elektroinstallation München Kosten", "Steckdosen nachrüsten München", "Sicherungskasten erneuern München"]
  },
  heizungssanierung: {
    headline: "Heizungssanierung München | Neue Heizung mit bis zu 70% Förderung",
    subheadline: "Wärmepumpe, Gas-Brennwert, Pellets – staatliche Förderung sichern, Heizkosten senken",
    intro: "Was kostet eine neue Heizung in München? Welche Förderung gibt es 2024/2025? Wärmepumpe oder Gas-Brennwert – was ist besser? Bei KSHW München erhalten Sie unabhängige Beratung und kompletten Heizungstausch aus einer Hand. Wir beantragen Ihre BEG-Förderung (bis 70% Zuschuss), koordinieren alle Gewerke und garantieren einen reibungslosen Umstieg. Zertifizierter Fachbetrieb für Wärmepumpen, Gas, Öl und Pellets.",
    problems: [
      "Hohe Heizkosten: Alte Heizungen verbrauchen 30-50% mehr Energie als moderne Anlagen",
      "Ausfall-Risiko: Heizkessel über 20 Jahre haben erhöhte Ausfallgefahr – gerade im Winter kritisch",
      "Gesetzliche Pflicht: Heizungen über 30 Jahre müssen laut GEG ausgetauscht werden",
      "Förderung ungenutzt: Viele verschenken bis zu 70% staatlichen Zuschuss durch falsche Beratung",
      "Ungleichmäßige Wärme: Manche Räume zu warm, andere zu kalt – fehlender hydraulischer Abgleich"
    ],
    solutions: [
      "Heizungsanalyse: Welches System passt zu Ihrem Haus? Wärmepumpe, Gas, Pellets, Hybrid?",
      "Förderberatung: BEG-Förderung beantragen – bis zu 70% Zuschuss für Wärmepumpe möglich",
      "Kompletter Austausch: Alte Heizung raus, neue rein – an 1-3 Tagen, minimale Ausfallzeit",
      "Hydraulischer Abgleich: Optimale Wärmeverteilung in allen Räumen, Pflicht für Förderung",
      "Wartungsvertrag: Regelmäßige Wartung für lange Lebensdauer und Garantieerhalt"
    ],
    benefits: [
      "Förderung: Bis zu 70% Zuschuss (BEG EM) – wir stellen den Antrag für Sie",
      "Ersparnis: 30-50% niedrigere Heizkosten durch moderne Technik",
      "Schnell: Heizungstausch in 1-3 Tagen, fast keine Zeit ohne Heizung",
      "Marken: Viessmann, Vaillant, Bosch, Daikin, Wolf – nur bewährte Hersteller",
      "Garantie: 5 Jahre Gewährleistung plus Herstellergarantie bis 10 Jahre"
    ],
    geoText: "Heizungssanierung in München und Umgebung – Ihr zertifizierter Heizungsfachbetrieb. Wir installieren neue Heizungen in: Schwabing, Maxvorstadt, Bogenhausen, Haidhausen, Giesing, Sendling, Westend, Neuhausen, Nymphenburg, Pasing, Trudering, Riem, Perlach, Solln und allen Münchner Stadtteilen. Service auch in: Dachau, Karlsfeld, Germering, Starnberg, Freising, Garching, Unterschleißheim, Ottobrunn, Haar und Grünwald.",
    ctaText: "Förderung & Angebot sichern",
    faq: [
      { question: "Was kostet eine neue Heizung in München?", answer: "Heizungskosten München (netto zzgl. MwSt., Stand 12/2025): Gas-Brennwert 12.000-20.000€, Luft-Wärmepumpe 35.000-52.000€, Sole-Wärmepumpe 52.000-65.000€ – minus bis zu 70% Förderung möglich." },
      { question: "Wie viel Förderung bekomme ich für eine neue Heizung?", answer: "BEG-Förderung 2024: 30% Basis + 20% Klimabonus + 20% Einkommensbonus = bis zu 70%. Wärmepumpe mit max. Förderung: Von 20.000€ Kosten zahlen Sie nur 6.000€." },
      { question: "Wie lange dauert ein Heizungstausch?", answer: "Ein Heizungstausch dauert 1-3 Tage. In dieser Zeit stellen wir eine mobile Heizung, damit Sie nicht frieren. Bei Wärmepumpen kann die Außeneinheit manchmal länger dauern." }
    ],
    keywords: ["Heizungssanierung München", "Neue Heizung München", "Wärmepumpe München Kosten", "Heizung austauschen München", "Heizungsförderung München", "Gas Brennwert München"]
  },
  "energetische-sanierung": {
    headline: "Energetische Sanierung München | Dämmung, Fenster & Förderung",
    subheadline: "Heizkosten um 50% senken – bis zu 45% staatliche Förderung für Dämmung und Fenster",
    intro: "Wie viel kann ich durch Dämmung sparen? Was kostet eine energetische Sanierung in München? Welche Förderung gibt es? Bei KSHW München erstellen wir Ihren individuellen Sanierungsfahrplan (iSFP) und setzen alle Maßnahmen um – Fassadendämmung, Dachdämmung, neue Fenster, Kellerdeckendämmung. Mit iSFP erhalten Sie 5% Extra-Förderung und sparen langfristig 40-60% Heizkosten. Zertifizierte Energieeffizienz-Experten, BEG-Förderung inklusive.",
    problems: [
      "Hohe Heizkosten: Schlecht gedämmte Häuser verbrauchen 150-250 kWh/m² statt möglicher 50-70 kWh/m²",
      "Kalte Wände: Außenwände unter 17°C führen zu Schimmel und Unbehaglichkeit",
      "Zugluft: Undichte Fenster und Türen lassen kalte Luft herein und warme Luft raus",
      "Sommerhitze: Fehlende Dämmung bedeutet auch Überhitzung im Sommer",
      "Wärmebrücken: Rollladenkästen, Balkone, Fensterstürze – hier entweicht die meiste Wärme"
    ],
    solutions: [
      "Fassadendämmung: WDVS oder vorgehängte Fassade – 20-40% Heizkostenersparnis",
      "Dachdämmung: Zwischensparren, Aufsparren oder Geschossdecke – bis 30% Ersparnis",
      "Neue Fenster: 3-fach-Verglasung Uw ≤ 0,95 – bis 15% Ersparnis, plus Lärmschutz",
      "Kellerdeckendämmung: Einfachste Maßnahme – 5-10% Ersparnis, schnell umgesetzt",
      "Wärmebrückenoptimierung: Rollladenkästen, Balkone, Fensteranschlüsse fachgerecht dämmen"
    ],
    benefits: [
      "Förderung: 15% BEG-Förderung + 5% iSFP-Bonus = 20% Zuschuss auf Dämmung und Fenster",
      "Ersparnis: 40-60% niedrigere Heizkosten – die Investition zahlt sich in 8-15 Jahren zurück",
      "Wohnkomfort: Warme Wände, keine Zugluft, angenehmes Raumklima ganzjährig",
      "Wertsteigerung: Bessere Energieeffizienzklasse = höherer Immobilienwert",
      "Garantie: 5 Jahre Gewährleistung auf alle Dämmarbeiten"
    ],
    geoText: "Energetische Sanierung in München und Umgebung – Ihr Partner für Wärmedämmung und Fenstertausch. Wir sanieren energetisch in: Schwabing, Maxvorstadt, Bogenhausen, Haidhausen, Giesing, Sendling, Westend, Neuhausen, Nymphenburg, Pasing, Trudering, Riem, Perlach, Solln und allen Münchner Stadtteilen. Service auch in: Dachau, Karlsfeld, Germering, Starnberg, Freising, Garching, Unterschleißheim, Ottobrunn, Haar und Grünwald.",
    ctaText: "Energieberatung anfordern",
    faq: [
      { question: "Was kostet eine energetische Sanierung in München?", answer: "Kosten pro Maßnahme: Fassadendämmung 120-180€/m², Dachdämmung 80-150€/m², neue Fenster 400-800€/Stück, Kellerdeckendämmung 30-50€/m² – minus 20% BEG-Förderung." },
      { question: "Wie viel Heizkosten spare ich durch Dämmung?", answer: "Typische Ersparnis: Fassadendämmung 20-40%, Dachdämmung 15-30%, neue Fenster 10-15%, Kellerdecke 5-10%. Komplett saniert: 50-70% Ersparnis möglich." },
      { question: "Welche Förderung gibt es für energetische Sanierung?", answer: "BEG EM 2024: 15% Zuschuss auf Dämmung, Fenster, Türen. Mit iSFP (individueller Sanierungsfahrplan): +5% Bonus = 20% Förderung. Steuerliche Förderung alternativ: 20% über 3 Jahre." }
    ],
    keywords: ["Energetische Sanierung München", "Dämmung München", "Fenster tauschen München", "Fassadendämmung München Kosten", "Wärmedämmung München", "iSFP München"]
  },
  dachsanierung: {
    headline: "Dachsanierung München | Dachdecker für Neueindeckung & Dämmung",
    subheadline: "Dach reparieren, dämmen oder komplett neu eindecken – Festpreis, 10 Jahre Garantie",
    intro: "Ist mein Dach noch dicht? Was kostet eine Dachsanierung in München? Wann lohnt sich eine Neueindeckung? Bei KSHW München erhalten Sie professionelle Dacharbeiten vom Fachbetrieb – Reparatur, Dämmung, Neueindeckung. Wir arbeiten mit allen Dachformen: Steildach, Flachdach, Walmdach, Pultdach. Festpreis nach kostenloser Dachinspektion, bis zu 20% Förderung für Dachdämmung, 10 Jahre Gewährleistung auf Eindeckung.",
    problems: [
      "Undichtes Dach: Wassereintritt bei Regen oder Schnee – teure Folgeschäden an Dämmung und Bausubstanz",
      "Alte Dachziegel: Poröse, bemooste oder gebrochene Ziegel – Sturmschäden und weitere Undichtigkeiten drohen",
      "Fehlende Dämmung: Ungedämmtes Dach bedeutet 20-30% höhere Heizkosten und kalte Räume oben",
      "Defekte Dachrinnen: Verstopfte oder undichte Rinnen führen zu Fassadenschäden und Wassereintritt",
      "Schädlingsbefall: Marder, Wespen, Tauben – beschädigte Unterspannbahn und Dämmung"
    ],
    solutions: [
      "Dachreparatur: Undichte Stellen abdichten, einzelne Ziegel tauschen, Bleianschlüsse erneuern",
      "Dachdämmung: Zwischensparren, Aufsparren oder Untersparren – nach GEG, bis zu 30% Heizkosten sparen",
      "Neueindeckung: Alte Ziegel runter, neue drauf – mit Unterspannbahn und Lattung nach aktuellen Standards",
      "Dachrinnen: Zink, Kupfer oder Kunststoff – Rinnen und Fallrohre komplett erneuern",
      "Schädlingsschutz: Marderabwehr, Taubenspikes, neue Lüftungsöffnungen mit Gittern"
    ],
    benefits: [
      "10 Jahre Garantie: Überdurchschnittliche Gewährleistung auf Neueindeckung und Abdichtung",
      "Förderung: Bis zu 20% BEG-Zuschuss für Dachdämmung möglich",
      "Fachbetrieb: Eingetragener Dachdeckerbetrieb, zertifizierte Facharbeiter",
      "Alle Dachformen: Steildach, Flachdach, Walmdach, Pultdach, Mansarddach",
      "Festpreis: Verbindliches Angebot nach kostenloser Dachinspektion"
    ],
    geoText: "Dachsanierung in München und Umgebung – Ihr Dachdeckerbetrieb im Partnernetzwerk. Wir arbeiten an Dächern in: Schwabing, Maxvorstadt, Bogenhausen, Haidhausen, Giesing, Sendling, Westend, Neuhausen, Nymphenburg, Pasing, Trudering, Riem, Perlach, Solln und allen Münchner Stadtteilen. Service auch in: Dachau, Karlsfeld, Germering, Starnberg, Freising, Garching, Unterschleißheim, Ottobrunn, Haar und Grünwald.",
    ctaText: "Kostenlose Dachinspektion",
    faq: [
      { question: "Was kostet eine Dachsanierung in München?", answer: "Dachkosten in München: Reparatur 500-3.000€, Neueindeckung 100-180€/m², Dachdämmung 80-150€/m², Dachrinnen 30-60€/lfm. Ein 100m² Dach komplett: 15.000-25.000€." },
      { question: "Wie lange hält ein neues Dach?", answer: "Lebensdauer nach Material: Tonziegel 60-100 Jahre, Betondachsteine 40-60 Jahre, Schiefer 100+ Jahre, Flachdach-Bitumen 20-30 Jahre, Flachdach-EPDM 40-50 Jahre." },
      { question: "Wann sollte ich mein Dach sanieren lassen?", answer: "Warnsignale: Ziegel gebrochen/bemooste Flächen, Wasserspuren am Dachboden, Zugluft unter dem Dach, Dachrinnen undicht. Nach 30-40 Jahren ist meist eine Sanierung sinnvoll." }
    ],
    keywords: ["Dachsanierung München", "Dachdecker München", "Dach neu eindecken München Kosten", "Dachreparatur München", "Dachdämmung München", "Dachziegel erneuern München"]
  }
};

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

const getPriceRangeForService = (service: string): string => {
  // Münchner Preise Stand 12/2025 (Internet-Recherche + 30% Zuschlag), netto zzgl. MwSt., ca.-Angaben ohne Gewähr
  const priceRanges: Record<string, string> = {
    komplettsanierung: "Ca.-Preise München: Standard 1.000-1.300€/m² | Gehoben 1.300-1.700€/m² | Premium 1.700-2.300€/m² netto zzgl. MwSt. (Stand 12/2025, Angabe ohne Gewähr)",
    badsanierung: "Ca.-Preise München je nach Umfang: Dusche ca. 3.300€ | Gäste-WC ca. 8.000-12.000€ | Standard-Bad ca. 16.000-22.000€ | Luxus-Bad ca. 35.000-50.000€ | Barrierefrei +3.000-5.000€ netto zzgl. MwSt. (Stand 12/2025, Angabe ohne Gewähr)",
    kuechensanierung: "Ca.-Preise München (nur Bauarbeiten OHNE Küchenmöbel): Fliesen, Elektro, Wasser - kleine Küche ca. 6.500-10.000€ | mittlere ca. 10.000-15.000€ | große ca. 15.000-22.000€ netto zzgl. MwSt. (Stand 12/2025, Angabe ohne Gewähr)",
    bodensanierung: "Ca.-Preise München: Laminat/Vinyl 65-100€/m² | Parkett 130-200€/m² | Fliesen 100-160€/m² netto zzgl. MwSt. (Stand 12/2025, Angabe ohne Gewähr)",
    elektrosanierung: "Ca.-Preise München: Teilsanierung 85-130€/m² | Komplett 130-200€/m² | Mit Smart Home 200-300€/m² netto zzgl. MwSt. (Stand 12/2025, Angabe ohne Gewähr)",
    heizungssanierung: "Ca.-Preise München: Gasheizung 12.000-20.000€ | Wärmepumpe Luft 35.000-52.000€ | Wärmepumpe Sole 52.000-65.000€ netto zzgl. MwSt. (Stand 12/2025, Angabe ohne Gewähr)",
    "energetische-sanierung": "Ca.-Preise München: Fassadendämmung 200-350€/m² | Fenster 650-1.000€/Stk | Dachdämmung 100-200€/m² netto zzgl. MwSt. (Stand 12/2025, Angabe ohne Gewähr)",
    dachsanierung: "Ca.-Preise München: Eindeckung 200-280€/m² | Mit Dämmung 280-400€/m² | Flachdach 130-200€/m² netto zzgl. MwSt. (Stand 12/2025, Angabe ohne Gewähr)",
  };
  return priceRanges[service] || "Fordern Sie jetzt Ihr kostenloses Festpreis-Angebot an!";
};

export default function FunnelPage() {
  const [, setLocation] = useLocation();
  const searchString = useSearch();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [showSeoIntro, setShowSeoIntro] = useState(false);
  const [preSelectedService, setPreSelectedService] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
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
      setPreSelectedService(serviceParam);
      // Show SEO intro if content exists for this service
      if (serviceSeoContent[serviceParam]) {
        setShowSeoIntro(true);
      } else {
        setFormData(prev => ({ ...prev, service: serviceParam }));
        setCurrentStep(2);
      }
    }
  }, [searchString]);

  const handleStartFromSeoIntro = () => {
    if (preSelectedService) {
      setFormData(prev => ({ ...prev, service: preSelectedService }));
      setCurrentStep(2);
    }
    setShowSeoIntro(false);
  };

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
      case 1: return formData.service !== "" && formData.postalCode !== "" && formData.city !== "";
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
      case 1: return "Wo und was möchten Sie sanieren?";
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
      case 1: return "Ihr Standort hilft uns bei der Kostenschätzung";
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
      case 8: return "Wir melden uns innerhalb von 48 Stunden";
      default: return "";
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <Label className="text-sm font-medium mb-3 block flex items-center gap-2">
          <MapPin className="w-4 h-4 text-primary" />
          In welcher Stadt/PLZ befindet sich Ihr Objekt?
        </Label>
        <div className="grid grid-cols-2 gap-3">
          <Input
            placeholder="PLZ (z.B. 80331)"
            value={formData.postalCode}
            onChange={(e) => updateFormData("postalCode", e.target.value)}
            maxLength={5}
            data-testid="input-postal-code-step1"
          />
          <Input
            placeholder="Stadt (z.B. München)"
            value={formData.city}
            onChange={(e) => updateFormData("city", e.target.value)}
            data-testid="input-city-step1"
          />
        </div>
      </div>

      <div>
        <Label className="text-sm font-medium mb-3 block">Welche Sanierung benötigen Sie?</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {serviceOptions.map((service) => {
            const Icon = service.icon;
            const isSelected = formData.service === service.id;
            return (
              <button
                key={service.id}
                type="button"
                onClick={() => updateFormData("service", service.id)}
                className={`p-3 rounded-md border text-left transition-all hover-elevate ${
                  isSelected ? "border-primary bg-primary/5" : "border-border"
                }`}
                data-testid={`button-service-${service.id}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-md flex-shrink-0 ${
                    isSelected ? "bg-primary/20" : "bg-muted"
                  }`}>
                    <Icon className={`w-5 h-5 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`font-semibold text-sm truncate ${isSelected ? "text-primary" : ""}`}>
                      {service.label}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {service.painPoint}
                    </p>
                  </div>
                  {isSelected && <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderOptionCard = (type: { id: string; label: string; desc: string; icon: any }, isSelected: boolean, onClick: () => void, testId: string) => {
    const Icon = type.icon;
    return (
      <button
        key={type.id}
        type="button"
        onClick={onClick}
        className={`p-3 rounded-md border text-center transition-all hover-elevate ${
          isSelected ? "border-primary bg-primary/5" : "border-border"
        }`}
        data-testid={testId}
      >
        <div className={`w-10 h-10 mx-auto mb-2 rounded-md flex items-center justify-center ${
          isSelected ? "bg-primary/20" : "bg-muted"
        }`}>
          <Icon className={`w-5 h-5 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
        </div>
        <p className={`font-semibold text-sm truncate ${isSelected ? "text-primary" : ""}`}>{type.label}</p>
        <p className="text-xs text-muted-foreground mt-0.5 truncate">{type.desc}</p>
        {isSelected && <CheckCircle className="w-4 h-4 text-primary mx-auto mt-2" />}
      </button>
    );
  };

  const renderStep2 = () => {
    const service = formData.service;
    
    if (service === "badsanierung") {
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {bathroomTypes.map((type) => 
              renderOptionCard(
                type, 
                formData.propertyType === type.id, 
                () => updateFormData("propertyType", type.id),
                `button-property-${type.id}`
              )
            )}
          </div>
          <div className="p-3 bg-primary/5 rounded-lg border border-primary/20" data-testid="info-price-range">
            <p className="text-xs text-muted-foreground leading-relaxed">
              {getPriceRangeForService(service)}
            </p>
          </div>
        </div>
      );
    }
    
    if (service === "kuechensanierung") {
      return (
        <div className="space-y-5">
          <p className="text-sm text-muted-foreground">Welche Arbeiten sollen durchgeführt werden?</p>
          <div className="grid grid-cols-2 gap-3">
            {kitchenWorkTypes.map((type) => 
              renderOptionCard(
                type, 
                formData.propertyType === type.id, 
                () => updateFormData("propertyType", type.id),
                `button-property-${type.id}`
              )
            )}
          </div>
          
          <div className="p-4 bg-gradient-to-br from-muted/50 to-muted/30 rounded-xl border">
            <p className="text-sm font-semibold mb-3">Wird eine neue Küche (Möbel & Geräte) gewünscht?</p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => updateFormData("kitchenNeeded", "ja")}
                className={`flex-1 p-3 rounded-lg border-2 text-center transition-all font-semibold ${
                  formData.kitchenNeeded === "ja" 
                    ? "border-primary bg-primary/10 text-primary" 
                    : "border-border hover:border-primary/50"
                }`}
                data-testid="button-kitchen-yes"
              >
                Ja
              </button>
              <button
                type="button"
                onClick={() => updateFormData("kitchenNeeded", "nein")}
                className={`flex-1 p-3 rounded-lg border-2 text-center transition-all font-semibold ${
                  formData.kitchenNeeded === "nein" 
                    ? "border-primary bg-primary/10 text-primary" 
                    : "border-border hover:border-primary/50"
                }`}
                data-testid="button-kitchen-no"
              >
                Nein
              </button>
            </div>
          </div>
          
          <div className="p-3 bg-primary/5 rounded-lg border border-primary/20" data-testid="info-price-range">
            <p className="text-xs text-muted-foreground leading-relaxed">
              {getPriceRangeForService(service)}
            </p>
          </div>
        </div>
      );
    }
    
    if (service === "bodensanierung") {
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {floorRoomTypes.map((type) => 
              renderOptionCard(
                type, 
                formData.propertyType === type.id, 
                () => updateFormData("propertyType", type.id),
                `button-property-${type.id}`
              )
            )}
          </div>
          <div className="p-3 bg-primary/5 rounded-lg border border-primary/20" data-testid="info-price-range">
            <p className="text-xs text-muted-foreground leading-relaxed">
              {getPriceRangeForService(service)}
            </p>
          </div>
        </div>
      );
    }
    
    if (service === "dachsanierung") {
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {roofPropertyTypes.map((type) => 
              renderOptionCard(
                type, 
                formData.propertyType === type.id, 
                () => updateFormData("propertyType", type.id),
                `button-property-${type.id}`
              )
            )}
          </div>
          <div className="p-3 bg-primary/5 rounded-lg border border-primary/20" data-testid="info-price-range">
            <p className="text-xs text-muted-foreground leading-relaxed">
              {getPriceRangeForService(service)}
            </p>
          </div>
        </div>
      );
    }
    
    return (
      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-3">
          {propertyTypes.map((type) => 
            renderOptionCard(
              type, 
              formData.propertyType === type.id, 
              () => updateFormData("propertyType", type.id),
              `button-property-${type.id}`
            )
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
          <div>
            <Label className="text-sm font-medium">Baujahr des Gebäudes</Label>
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
            <Label className="text-sm font-medium">Sie sind...</Label>
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

        <div className="p-3 bg-primary/5 rounded-lg border border-primary/20" data-testid="info-price-range">
          <p className="text-xs text-muted-foreground leading-relaxed">
            {getPriceRangeForService(service)}
          </p>
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
                <Label className="text-sm font-medium">Anzahl Sanitärobjekte</Label>
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
              <Label className="text-sm font-medium">Was wünschen Sie sich?</Label>
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
                <Label className="text-sm font-medium">Küchenform</Label>
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
              <Label className="text-sm font-medium">Arbeitsplatte</Label>
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
              <Label className="text-sm font-medium">Zusätzliche Wünsche</Label>
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
                <Label className="text-sm font-medium">Anzahl Zimmer</Label>
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
              <Label className="text-sm font-medium">Was soll alles saniert werden?</Label>
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
              <Label className="text-sm font-medium">Wird das Objekt bewohnt?</Label>
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
                <Label className="text-sm font-medium">Anzahl Räume</Label>
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
              <Label className="text-sm font-medium">Aktueller Bodenbelag</Label>
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
              <Label className="text-sm font-medium">Gewünschter neuer Boden</Label>
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
                <Label className="text-sm font-medium">Anzahl Räume</Label>
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
              <Label className="text-sm font-medium">Alter der Elektroinstallation</Label>
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
              <Label className="text-sm font-medium">Was wird benötigt?</Label>
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
                <Label className="text-sm font-medium">Aktuelle Heizung</Label>
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
              <Label className="text-sm font-medium">Gewünschtes neues System</Label>
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
              <Label className="text-sm font-medium">Was soll gedämmt werden?</Label>
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
                <Label className="text-sm font-medium">Dachform</Label>
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
              <Label className="text-sm font-medium">Dachgeschoss-Nutzung</Label>
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
              <Label className="text-sm font-medium">Projektgröße</Label>
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
          <Label htmlFor="specialRequirements" className="text-sm font-medium">Gibt es Besonderheiten?</Label>
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
          <Label htmlFor="postalCode" className="text-sm font-medium">Postleitzahl *</Label>
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
          <Label htmlFor="city" className="text-sm font-medium">Ort *</Label>
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
        <Label htmlFor="address" className="text-sm font-medium">Straße und Hausnummer</Label>
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
        <Label htmlFor="name" className="text-sm font-medium">Ihr Name *</Label>
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
          <Label htmlFor="phone" className="text-sm font-medium">Telefon *</Label>
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
          <Label htmlFor="email" className="text-sm font-medium">E-Mail *</Label>
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

  const renderSeoIntro = () => {
    if (!preSelectedService || !serviceSeoContent[preSelectedService]) return null;
    const content = serviceSeoContent[preSelectedService];
    
    return (
      <div className="container mx-auto px-4 py-8 max-w-5xl flex-1">
        <div className="prose prose-lg max-w-none mb-8">
          <p className="text-foreground leading-relaxed">{content.intro}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
                Kennen Sie diese Probleme?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {content.problems.map((problem, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 flex items-center justify-center flex-shrink-0 text-sm font-medium">{index + 1}</span>
                    <span className="text-muted-foreground">{problem}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Unsere Lösung für Sie
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {content.solutions.map((solution, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{solution}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8 border-primary/20 bg-primary/5">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Star className="w-5 h-5 text-primary" />
              Ihre Vorteile mit KSHW München
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {content.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-2">
                  <Award className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                  <span className="text-sm text-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Wir sind vor Ort – Ihr lokaler Partner in München</h3>
                <p className="text-muted-foreground text-sm">{content.geoText}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section - Optimized for AI Search (ChatGPT, Perplexity, Gemini) */}
        {content.faq && content.faq.length > 0 && (
          <Card className="mb-8">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-primary" />
                Häufige Fragen
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {content.faq.map((item, index) => (
                  <div key={index} className="border-b border-border last:border-0 pb-4 last:pb-0">
                    <h4 className="font-semibold text-foreground mb-2">{item.question}</h4>
                    <p className="text-muted-foreground text-sm">{item.answer}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Hidden structured data for AI and SEO */}
        {content.keywords && (
          <div className="sr-only" aria-hidden="true">
            <p>Relevante Suchbegriffe: {content.keywords.join(", ")}</p>
          </div>
        )}

        <div className="text-center py-8 bg-muted/30 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">In 2 Minuten zum kostenlosen Festpreis-Angebot</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Kurze Fragen beantworten – Angebot in 48 Stunden erhalten. Unverbindlich, kostenlos und ohne versteckte Kosten.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/termin">
              <Button size="lg" className="text-lg bg-yellow-500 hover:bg-yellow-600 text-black border-yellow-500" data-testid="button-seo-booking">
                <Calendar className="w-5 h-5 mr-2" />
                24 Std. Online Termin
              </Button>
            </Link>
            <Button size="lg" onClick={handleStartFromSeoIntro} className="text-lg" data-testid="button-start-funnel">
              {content.ctaText}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Keine versteckten Kosten. Keine Verpflichtungen.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="flex flex-col items-center">
            <Shield className="w-10 h-10 text-primary mb-3" />
            <h4 className="font-semibold">100% Unverbindlich</h4>
            <p className="text-sm text-muted-foreground">Kostenlose Erstberatung</p>
          </div>
          <div className="flex flex-col items-center">
            <Clock className="w-10 h-10 text-primary mb-3" />
            <h4 className="font-semibold">Schnelle Reaktion</h4>
            <p className="text-sm text-muted-foreground">Angebot in 48 Stunden</p>
          </div>
          <div className="flex flex-col items-center">
            <Award className="w-10 h-10 text-primary mb-3" />
            <h4 className="font-semibold">Meisterqualität</h4>
            <p className="text-sm text-muted-foreground">5 Jahre Gewährleistung</p>
          </div>
        </div>
      </div>
    );
  };

  if (showSeoIntro && preSelectedService && serviceSeoContent[preSelectedService]) {
    const content = serviceSeoContent[preSelectedService];
    const serviceSchema = generateServiceSchema({
      name: content.headline.split("|")[0].trim(),
      description: content.intro,
      priceRange: "€€-€€€",
      areaServed: "München"
    });
    const faqSchema = generateFaqSchema(content.faq);
    const combinedSchema = {
      "@context": "https://schema.org",
      "@graph": [serviceSchema, faqSchema]
    };
    
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <SeoHead
          title={`${content.headline} | München`}
          description={content.intro.substring(0, 155) + "..."}
          keywords={content.keywords.join(", ")}
          canonicalPath={`/anfrage?service=${preSelectedService}`}
          schema={combinedSchema}
        />
        <SiteHeader />
        <PageHero 
          title={content.headline}
          subtitle={content.subheadline}
          showCta={true}
          showStats={false}
          compact={true}
          image={serviceHeroImages[preSelectedService] || consultationHeroImage}
          imageAlt={`${content.headline.split("|")[0].trim()} in München`}
        />

        <main id="main-content" className="pb-16 flex-1">
        {renderSeoIntro()}
        </main>

        <footer className="pt-12 pb-6 bg-[hsl(220,75%,22%)] text-white">
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
                    Mo-Fr: 8:00-16:30 Uhr
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
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SiteHeader />

      <main id="main-content" className="container mx-auto px-4 py-6 max-w-4xl pt-20 flex-1">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">Schritt {currentStep} von {totalSteps}</span>
            <span className="text-sm font-medium">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div>
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">{getStepTitle()}</CardTitle>
                <p className="text-sm text-muted-foreground">{getStepSubtitle()}</p>
              </CardHeader>
              <CardContent>
                {renderCurrentStep()}

                <div className="flex justify-between gap-4 mt-6 pt-4 border-t">
                  {currentStep === 1 ? (
                    <Link href="/">
                      <Button variant="outline" data-testid="button-back-home">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Startseite
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
                            Kostenlos anfragen
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
        </div>
      </main>

      <footer className="pt-12 pb-6 bg-[hsl(220,75%,22%)] text-white">
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
                  Mo-Fr: 8:00-16:30 Uhr
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
                <li><Link href="/kontakt" className="hover:text-white">Kontakt</Link></li>
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
    </div>
  );
}
