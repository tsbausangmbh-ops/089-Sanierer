import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
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
  MapPin,
  Loader2,
  Building2,
  Calendar,
  Euro,
  Star,
  Sparkles,
  Crown
} from "lucide-react";

const serviceOptions = [
  { 
    id: "komplettsanierung", 
    label: "Komplettsanierung", 
    icon: Home,
    problem: "Alles muss raus?",
    description: "Komplette Renovierung von A bis Z"
  },
  { 
    id: "badsanierung", 
    label: "Badsanierung", 
    icon: Bath,
    problem: "Altes Bad nervt?",
    description: "Modernes Bad nach Ihren Wünschen"
  },
  { 
    id: "kuechensanierung", 
    label: "Küchensanierung", 
    icon: ChefHat,
    problem: "Küche veraltet?",
    description: "Neue Küche mit allem Komfort"
  },
  { 
    id: "bodensanierung", 
    label: "Bodensanierung", 
    icon: Layers,
    problem: "Boden kaputt?",
    description: "Neuer Boden für jedes Zimmer"
  },
  { 
    id: "elektrosanierung", 
    label: "Elektrosanierung", 
    icon: Zap,
    problem: "Alte Leitungen?",
    description: "Sichere Elektrik nach aktuellen Standards"
  },
  { 
    id: "heizungssanierung", 
    label: "Heizungssanierung", 
    icon: Flame,
    problem: "Heizung schwächelt?",
    description: "Effiziente Heizsysteme für Ihr Zuhause"
  },
  { 
    id: "energetische-sanierung", 
    label: "Energetische Sanierung", 
    icon: Leaf,
    problem: "Hohe Energiekosten?",
    description: "Senken Sie Ihre Heizkosten dauerhaft"
  },
  { 
    id: "dachsanierung", 
    label: "Dachsanierung", 
    icon: HardHat,
    problem: "Dach undicht?",
    description: "Zuverlässiger Schutz von oben"
  },
];

const propertyTypes = [
  { id: "wohnung", label: "Wohnung", icon: Building2 },
  { id: "einfamilienhaus", label: "Einfamilienhaus", icon: Home },
  { id: "mehrfamilienhaus", label: "Mehrfamilienhaus", icon: Building2 },
  { id: "gewerbe", label: "Gewerbe", icon: Building2 },
];

const qualityLevels = [
  { 
    id: "standard", 
    label: "Standard", 
    icon: Star,
    description: "Gute Qualität zum fairen Preis",
    examples: "Bewährte Materialien, funktionale Lösungen"
  },
  { 
    id: "komfort", 
    label: "Komfort", 
    icon: Sparkles,
    description: "Gehobene Ausstattung mit mehr Komfort",
    examples: "Hochwertige Materialien, erweiterte Features"
  },
  { 
    id: "premium", 
    label: "Premium", 
    icon: Crown,
    description: "Luxuriöse Ausstattung ohne Kompromisse",
    examples: "Exklusive Materialien, maßgeschneiderte Lösungen"
  },
];

const timelineOptions = [
  { id: "sofort", label: "So schnell wie möglich", description: "Innerhalb der nächsten 2 Wochen" },
  { id: "1-monat", label: "In 1-2 Monaten", description: "Zeitnah, aber nicht sofort" },
  { id: "3-monate", label: "In 3-6 Monaten", description: "Geplantes Projekt" },
  { id: "6-monate", label: "In 6-12 Monaten", description: "Langfristige Planung" },
  { id: "flexibel", label: "Flexibel", description: "Kein fester Zeitrahmen" },
];

const budgetRanges = [
  { id: "unter-10k", label: "Bis 10.000 €", range: "Kleinere Projekte" },
  { id: "10k-25k", label: "10.000 - 25.000 €", range: "Mittlere Projekte" },
  { id: "25k-50k", label: "25.000 - 50.000 €", range: "Größere Projekte" },
  { id: "50k-100k", label: "50.000 - 100.000 €", range: "Umfangreiche Sanierung" },
  { id: "ueber-100k", label: "Über 100.000 €", range: "Komplettsanierung" },
  { id: "unsicher", label: "Noch unsicher", range: "Beratung erwünscht" },
];

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
  subfloorCondition?: string;
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
  skylightCount?: string;
  structuralChanges?: boolean;
  includesBathroom?: boolean;
  includesKitchen?: boolean;
  ownership?: string;
  occupancy?: string;
};

export default function FunnelPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  
  const [formData, setFormData] = useState({
    service: "",
    propertyType: "",
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

  const totalSteps = 8;
  const progress = (currentStep / totalSteps) * 100;

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

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.service !== "";
      case 2:
        return formData.propertyType !== "";
      case 3:
        return formData.serviceDetails.squareMeters !== undefined && formData.serviceDetails.squareMeters !== "";
      case 4:
        return formData.serviceDetails.condition !== undefined && formData.serviceDetails.condition !== "";
      case 5:
        return formData.qualityLevel !== "";
      case 6:
        return formData.timeline !== "";
      case 7:
        return formData.postalCode !== "" && formData.city !== "";
      case 8:
        return formData.name !== "" && formData.phone !== "" && formData.email !== "" && privacyAccepted;
      default:
        return false;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return "Welches Problem sollen wir für Sie lösen?";
      case 2: return "Um welches Objekt handelt es sich?";
      case 3: return "Wie groß ist der Projektumfang?";
      case 4: return "Wie ist der aktuelle Zustand?";
      case 5: return "Welche Qualität wünschen Sie sich?";
      case 6: return "Wann soll es losgehen?";
      case 7: return "Wo befindet sich das Objekt?";
      case 8: return "Wie erreichen wir Sie?";
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
            className={`p-4 rounded-lg border-2 text-left transition-all hover-elevate ${
              isSelected 
                ? "border-primary bg-primary/5" 
                : "border-border"
            }`}
            data-testid={`button-service-${service.id}`}
          >
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-lg ${isSelected ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-primary">{service.problem}</p>
                <p className="font-medium">{service.label}</p>
                <p className="text-sm text-muted-foreground">{service.description}</p>
              </div>
              {isSelected && <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />}
            </div>
          </button>
        );
      })}
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {propertyTypes.map((type) => {
          const Icon = type.icon;
          const isSelected = formData.propertyType === type.id;
          return (
            <button
              key={type.id}
              type="button"
              onClick={() => updateFormData("propertyType", type.id)}
              className={`p-4 rounded-lg border-2 text-center transition-all hover-elevate ${
                isSelected 
                  ? "border-primary bg-primary/5" 
                  : "border-border"
              }`}
              data-testid={`button-property-${type.id}`}
            >
              <Icon className={`w-8 h-8 mx-auto mb-2 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
              <p className="font-medium text-sm">{type.label}</p>
              {isSelected && <CheckCircle className="w-4 h-4 text-primary mx-auto mt-2" />}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
        <div>
          <Label className="text-base font-medium">Baujahr des Gebäudes</Label>
          <Select
            value={formData.serviceDetails.buildYear || ""}
            onValueChange={(value) => updateServiceDetails("buildYear", value)}
          >
            <SelectTrigger className="mt-2" data-testid="select-build-year">
              <SelectValue placeholder="Bitte wählen" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="vor-1950">Vor 1950</SelectItem>
              <SelectItem value="1950-1970">1950-1970</SelectItem>
              <SelectItem value="1970-1990">1970-1990</SelectItem>
              <SelectItem value="1990-2010">1990-2010</SelectItem>
              <SelectItem value="nach-2010">Nach 2010</SelectItem>
              <SelectItem value="unbekannt">Unbekannt</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-base font-medium">Eigentumsverhältnis</Label>
          <Select
            value={formData.serviceDetails.ownership || ""}
            onValueChange={(value) => updateServiceDetails("ownership", value)}
          >
            <SelectTrigger className="mt-2" data-testid="select-ownership">
              <SelectValue placeholder="Bitte wählen" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="eigentuemer">Eigentümer</SelectItem>
              <SelectItem value="mieter">Mieter</SelectItem>
              <SelectItem value="verwalter">Verwalter/Hausverwaltung</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );

  const renderStep3Scope = () => {
    const service = formData.service;
    
    const commonSizeInput = (label: string, placeholder: string) => (
      <div>
        <Label htmlFor="squareMeters" className="text-base font-medium">{label}</Label>
        <div className="flex items-center gap-2 mt-2">
          <Input
            id="squareMeters"
            type="number"
            placeholder={placeholder}
            value={formData.serviceDetails.squareMeters || ""}
            onChange={(e) => updateServiceDetails("squareMeters", e.target.value)}
            className="max-w-32"
            data-testid="input-square-meters"
          />
          <span className="text-muted-foreground">m²</span>
        </div>
      </div>
    );

    switch (service) {
      case "badsanierung":
        return (
          <div className="space-y-6">
            {commonSizeInput("Wie groß ist Ihr Bad?", "z.B. 8")}
            
            <div>
              <Label className="text-base font-medium">Anzahl der Sanitärobjekte</Label>
              <p className="text-sm text-muted-foreground mb-2">(WC, Waschbecken, Dusche, Badewanne)</p>
              <Select
                value={formData.serviceDetails.sanitaryCount || ""}
                onValueChange={(value) => updateServiceDetails("sanitaryCount", value)}
              >
                <SelectTrigger className="max-w-48" data-testid="select-sanitary-count">
                  <SelectValue placeholder="Bitte wählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-2">1-2 Objekte</SelectItem>
                  <SelectItem value="3-4">3-4 Objekte</SelectItem>
                  <SelectItem value="5+">5 oder mehr</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-base font-medium">Gewünschte Duschvariante</Label>
              <RadioGroup
                value={formData.serviceDetails.showerType || ""}
                onValueChange={(value) => updateServiceDetails("showerType", value)}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="dusche" id="shower-dusche" />
                  <Label htmlFor="shower-dusche" className="font-normal">Dusche</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="badewanne" id="shower-wanne" />
                  <Label htmlFor="shower-wanne" className="font-normal">Badewanne</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="beides" id="shower-beides" />
                  <Label htmlFor="shower-beides" className="font-normal">Beides</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="barrierFree"
                checked={formData.serviceDetails.barrierFree || false}
                onCheckedChange={(checked) => updateServiceDetails("barrierFree", checked)}
                data-testid="checkbox-barrier-free"
              />
              <Label htmlFor="barrierFree" className="font-normal">Barrierefreies Bad gewünscht?</Label>
            </div>
          </div>
        );

      case "kuechensanierung":
        return (
          <div className="space-y-6">
            {commonSizeInput("Wie groß ist Ihre Küche?", "z.B. 12")}

            <div>
              <Label className="text-base font-medium">Gewünschte Arbeitsplatte</Label>
              <Select
                value={formData.serviceDetails.countertopMaterial || ""}
                onValueChange={(value) => updateServiceDetails("countertopMaterial", value)}
              >
                <SelectTrigger className="max-w-64 mt-2" data-testid="select-countertop">
                  <SelectValue placeholder="Bitte wählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="laminat">Laminat / Schichtstoff</SelectItem>
                  <SelectItem value="granit">Granit / Naturstein</SelectItem>
                  <SelectItem value="quarz">Quarzkomposit</SelectItem>
                  <SelectItem value="holz">Massivholz</SelectItem>
                  <SelectItem value="keramik">Keramik</SelectItem>
                  <SelectItem value="unsicher">Noch unsicher</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="newAppliances"
                  checked={formData.serviceDetails.newAppliances || false}
                  onCheckedChange={(checked) => updateServiceDetails("newAppliances", checked)}
                  data-testid="checkbox-new-appliances"
                />
                <Label htmlFor="newAppliances" className="font-normal">Neue Elektrogeräte gewünscht?</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="layoutChange"
                  checked={formData.serviceDetails.layoutChange || false}
                  onCheckedChange={(checked) => updateServiceDetails("layoutChange", checked)}
                />
                <Label htmlFor="layoutChange" className="font-normal">Umbauten/Layout-Änderungen geplant?</Label>
              </div>
            </div>
          </div>
        );

      case "komplettsanierung":
        return (
          <div className="space-y-6">
            {commonSizeInput("Gesamte Wohnfläche", "z.B. 85")}

            <div>
              <Label className="text-base font-medium">Anzahl der Zimmer</Label>
              <Select
                value={formData.serviceDetails.roomCount || ""}
                onValueChange={(value) => updateServiceDetails("roomCount", value)}
              >
                <SelectTrigger className="max-w-48 mt-2" data-testid="select-room-count">
                  <SelectValue placeholder="Bitte wählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-2">1-2 Zimmer</SelectItem>
                  <SelectItem value="3-4">3-4 Zimmer</SelectItem>
                  <SelectItem value="5-6">5-6 Zimmer</SelectItem>
                  <SelectItem value="7+">7 oder mehr</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label className="text-base font-medium">Was soll saniert werden?</Label>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="includesBathroom"
                  checked={formData.serviceDetails.includesBathroom || false}
                  onCheckedChange={(checked) => updateServiceDetails("includesBathroom", checked)}
                />
                <Label htmlFor="includesBathroom" className="font-normal">Bad/Bäder</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="includesKitchen"
                  checked={formData.serviceDetails.includesKitchen || false}
                  onCheckedChange={(checked) => updateServiceDetails("includesKitchen", checked)}
                />
                <Label htmlFor="includesKitchen" className="font-normal">Küche</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="structuralChanges"
                  checked={formData.serviceDetails.structuralChanges || false}
                  onCheckedChange={(checked) => updateServiceDetails("structuralChanges", checked)}
                />
                <Label htmlFor="structuralChanges" className="font-normal">Grundrissänderungen geplant</Label>
              </div>
            </div>
          </div>
        );

      case "bodensanierung":
        return (
          <div className="space-y-6">
            {commonSizeInput("Zu renovierende Fläche", "z.B. 60")}

            <div>
              <Label className="text-base font-medium">Aktueller Bodenbelag</Label>
              <Select
                value={formData.serviceDetails.currentFloor || ""}
                onValueChange={(value) => updateServiceDetails("currentFloor", value)}
              >
                <SelectTrigger className="max-w-64 mt-2" data-testid="select-current-floor">
                  <SelectValue placeholder="Bitte wählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="parkett">Parkett</SelectItem>
                  <SelectItem value="laminat">Laminat</SelectItem>
                  <SelectItem value="fliesen">Fliesen</SelectItem>
                  <SelectItem value="teppich">Teppich</SelectItem>
                  <SelectItem value="vinyl">Vinyl/PVC</SelectItem>
                  <SelectItem value="estrich">Estrich/Rohboden</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-base font-medium">Gewünschter neuer Boden</Label>
              <Select
                value={formData.serviceDetails.floorType || ""}
                onValueChange={(value) => updateServiceDetails("floorType", value)}
              >
                <SelectTrigger className="max-w-64 mt-2" data-testid="select-floor-type">
                  <SelectValue placeholder="Bitte wählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="parkett">Parkett</SelectItem>
                  <SelectItem value="laminat">Laminat</SelectItem>
                  <SelectItem value="vinyl">Vinyl / Designboden</SelectItem>
                  <SelectItem value="fliesen">Fliesen</SelectItem>
                  <SelectItem value="unsicher">Noch unsicher</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="underfloorHeating"
                checked={formData.serviceDetails.underfloorHeating || false}
                onCheckedChange={(checked) => updateServiceDetails("underfloorHeating", checked)}
                data-testid="checkbox-underfloor-heating"
              />
              <Label htmlFor="underfloorHeating" className="font-normal">Fußbodenheizung vorhanden oder gewünscht?</Label>
            </div>
          </div>
        );

      case "elektrosanierung":
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-base font-medium">Anzahl der Räume</Label>
              <Select
                value={formData.serviceDetails.roomCount || ""}
                onValueChange={(value) => {
                  updateServiceDetails("roomCount", value);
                  if (!formData.serviceDetails.squareMeters) {
                    updateServiceDetails("squareMeters", "1");
                  }
                }}
              >
                <SelectTrigger className="max-w-48 mt-2" data-testid="select-room-count">
                  <SelectValue placeholder="Bitte wählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-3">1-3 Räume</SelectItem>
                  <SelectItem value="4-6">4-6 Räume</SelectItem>
                  <SelectItem value="7-10">7-10 Räume</SelectItem>
                  <SelectItem value="10+">Mehr als 10</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {commonSizeInput("Wohnfläche (optional)", "z.B. 80")}

            <div>
              <Label className="text-base font-medium">Zusätzliche Stromkreise benötigt?</Label>
              <Select
                value={formData.serviceDetails.additionalCircuits || ""}
                onValueChange={(value) => updateServiceDetails("additionalCircuits", value)}
              >
                <SelectTrigger className="max-w-48 mt-2" data-testid="select-circuits">
                  <SelectValue placeholder="Bitte wählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="keine">Keine zusätzlichen</SelectItem>
                  <SelectItem value="1-5">1-5 Stromkreise</SelectItem>
                  <SelectItem value="5-10">5-10 Stromkreise</SelectItem>
                  <SelectItem value="10+">Mehr als 10</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="newFuseBox"
                  checked={formData.serviceDetails.newFuseBox || false}
                  onCheckedChange={(checked) => updateServiceDetails("newFuseBox", checked)}
                  data-testid="checkbox-new-fuse-box"
                />
                <Label htmlFor="newFuseBox" className="font-normal">Neuer Sicherungskasten benötigt?</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="smartHome"
                  checked={formData.serviceDetails.smartHome || false}
                  onCheckedChange={(checked) => updateServiceDetails("smartHome", checked)}
                />
                <Label htmlFor="smartHome" className="font-normal">Smart Home Vorbereitung gewünscht?</Label>
              </div>
            </div>
          </div>
        );

      case "heizungssanierung":
        return (
          <div className="space-y-6">
            {commonSizeInput("Zu beheizende Wohnfläche", "z.B. 120")}

            <div>
              <Label className="text-base font-medium">Aktuelle Heizungsart</Label>
              <Select
                value={formData.serviceDetails.currentHeating || ""}
                onValueChange={(value) => updateServiceDetails("currentHeating", value)}
              >
                <SelectTrigger className="max-w-64 mt-2" data-testid="select-current-heating">
                  <SelectValue placeholder="Bitte wählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gas">Gasheizung</SelectItem>
                  <SelectItem value="oel">Ölheizung</SelectItem>
                  <SelectItem value="waermepumpe">Wärmepumpe</SelectItem>
                  <SelectItem value="fernwaerme">Fernwärme</SelectItem>
                  <SelectItem value="elektro">Elektroheizung</SelectItem>
                  <SelectItem value="keine">Keine / Neubau</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-base font-medium">Gewünschte neue Heizung</Label>
              <Select
                value={formData.serviceDetails.desiredHeating || ""}
                onValueChange={(value) => updateServiceDetails("desiredHeating", value)}
              >
                <SelectTrigger className="max-w-64 mt-2" data-testid="select-desired-heating">
                  <SelectValue placeholder="Bitte wählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gas-brennwert">Gas-Brennwerttherme</SelectItem>
                  <SelectItem value="waermepumpe-luft">Wärmepumpe (Luft)</SelectItem>
                  <SelectItem value="waermepumpe-erde">Wärmepumpe (Erdwärme)</SelectItem>
                  <SelectItem value="fernwaerme">Fernwärme</SelectItem>
                  <SelectItem value="hybrid">Hybridsystem</SelectItem>
                  <SelectItem value="unsicher">Beratung gewünscht</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="hotWaterIntegration"
                checked={formData.serviceDetails.hotWaterIntegration || false}
                onCheckedChange={(checked) => updateServiceDetails("hotWaterIntegration", checked)}
              />
              <Label htmlFor="hotWaterIntegration" className="font-normal">Warmwasser über Heizung?</Label>
            </div>
          </div>
        );

      case "energetische-sanierung":
        return (
          <div className="space-y-6">
            {commonSizeInput("Wohnfläche des Gebäudes", "z.B. 150")}

            <div>
              <Label className="text-base font-medium">Welche Bereiche sollen gedämmt werden?</Label>
              <div className="mt-2 space-y-2">
                {["Fassade", "Dach", "Kellerdecke", "Oberste Geschossdecke"].map((area) => (
                  <div key={area} className="flex items-center space-x-2">
                    <Checkbox
                      id={`insulation-${area}`}
                      checked={(formData.serviceDetails.insulationType || []).includes(area)}
                      onCheckedChange={(checked) => {
                        const current = formData.serviceDetails.insulationType || [];
                        if (checked) {
                          updateServiceDetails("insulationType", [...current, area]);
                        } else {
                          updateServiceDetails("insulationType", current.filter(t => t !== area));
                        }
                      }}
                    />
                    <Label htmlFor={`insulation-${area}`} className="font-normal">{area}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="newWindows"
                  checked={formData.serviceDetails.newWindows || false}
                  onCheckedChange={(checked) => updateServiceDetails("newWindows", checked)}
                />
                <Label htmlFor="newWindows" className="font-normal">Neue Fenster gewünscht?</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="renewableInterest"
                  checked={formData.serviceDetails.renewableInterest || false}
                  onCheckedChange={(checked) => updateServiceDetails("renewableInterest", checked)}
                />
                <Label htmlFor="renewableInterest" className="font-normal">Interesse an Photovoltaik/Solar?</Label>
              </div>
            </div>
          </div>
        );

      case "dachsanierung":
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="roofArea" className="text-base font-medium">Dachfläche</Label>
              <div className="flex items-center gap-2 mt-2">
                <Input
                  id="roofArea"
                  type="number"
                  placeholder="z.B. 100"
                  value={formData.serviceDetails.roofArea || ""}
                  onChange={(e) => {
                    updateServiceDetails("roofArea", e.target.value);
                    updateServiceDetails("squareMeters", e.target.value);
                  }}
                  className="max-w-32"
                  data-testid="input-roof-area"
                />
                <span className="text-muted-foreground">m²</span>
              </div>
            </div>

            <div>
              <Label className="text-base font-medium">Dachtyp</Label>
              <Select
                value={formData.serviceDetails.roofType || ""}
                onValueChange={(value) => updateServiceDetails("roofType", value)}
              >
                <SelectTrigger className="max-w-64 mt-2" data-testid="select-roof-type">
                  <SelectValue placeholder="Bitte wählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="satteldach">Satteldach</SelectItem>
                  <SelectItem value="flachdach">Flachdach</SelectItem>
                  <SelectItem value="walmdach">Walmdach</SelectItem>
                  <SelectItem value="pultdach">Pultdach</SelectItem>
                  <SelectItem value="mansarde">Mansarddach</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-base font-medium">Dachgeschoss-Nutzung</Label>
              <Select
                value={formData.serviceDetails.atticUse || ""}
                onValueChange={(value) => updateServiceDetails("atticUse", value)}
              >
                <SelectTrigger className="max-w-64 mt-2" data-testid="select-attic-use">
                  <SelectValue placeholder="Bitte wählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="wohnraum">Ausgebauter Wohnraum</SelectItem>
                  <SelectItem value="ausbau-geplant">Ausbau geplant</SelectItem>
                  <SelectItem value="lager">Lagerraum/Speicher</SelectItem>
                  <SelectItem value="unbenutz">Unbenutzt</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="roofInsulation"
                checked={formData.serviceDetails.roofInsulation || false}
                onCheckedChange={(checked) => updateServiceDetails("roofInsulation", checked)}
              />
              <Label htmlFor="roofInsulation" className="font-normal">Dachdämmung gewünscht?</Label>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-6">
            {commonSizeInput("Projektfläche", "z.B. 50")}
          </div>
        );
    }
  };

  const renderStep4Condition = () => {
    const service = formData.service;

    const getConditionOptions = () => {
      switch (service) {
        case "badsanierung":
          return [
            { value: "stark-veraltet", label: "Stark veraltet (30+ Jahre)", desc: "Kompletterneuerung notwendig" },
            { value: "veraltet", label: "Veraltet (15-30 Jahre)", desc: "Modernisierung empfohlen" },
            { value: "okay", label: "Grundsätzlich okay", desc: "Optische Aufwertung gewünscht" },
          ];
        case "kuechensanierung":
          return [
            { value: "komplett-neu", label: "Komplett neue Küche", desc: "Alles muss raus" },
            { value: "teilrenovierung", label: "Teilrenovierung", desc: "Fronten, Arbeitsplatte erneuern" },
            { value: "modernisierung", label: "Modernisierung", desc: "Geräte, kleine Anpassungen" },
          ];
        case "komplettsanierung":
          return [
            { value: "kernsanierung", label: "Kernsanierung nötig", desc: "Bis auf die Grundmauern" },
            { value: "umfangreich", label: "Umfangreiche Renovierung", desc: "Mehrere Gewerke betroffen" },
            { value: "teilsanierung", label: "Teilsanierung", desc: "Einzelne Bereiche" },
          ];
        case "bodensanierung":
          return [
            { value: "beschaedigt", label: "Stark beschädigt", desc: "Boden muss komplett raus" },
            { value: "abgenutzt", label: "Abgenutzt", desc: "Oberfläche erneuern" },
            { value: "neubau", label: "Neubau/Rohbau", desc: "Erstverlegung" },
          ];
        case "elektrosanierung":
          return [
            { value: "komplett", label: "Komplette Neuverkabelung", desc: "Alle Leitungen erneuern" },
            { value: "teilweise", label: "Teilweise Erneuerung", desc: "Einzelne Räume/Bereiche" },
            { value: "erweiterung", label: "Erweiterung", desc: "Zusätzliche Steckdosen/Leitungen" },
          ];
        case "heizungssanierung":
          return [
            { value: "defekt", label: "Heizung defekt", desc: "Funktioniert nicht mehr" },
            { value: "veraltet", label: "Veraltet/Ineffizient", desc: "Hohe Heizkosten" },
            { value: "wechsel", label: "Geplanter Wechsel", desc: "Umstieg auf neue Technik" },
          ];
        case "energetische-sanierung":
          return [
            { value: "unsaniert", label: "Unsanierter Altbau", desc: "Keine Dämmung vorhanden" },
            { value: "teilgedaemmt", label: "Teilweise gedämmt", desc: "Einzelne Maßnahmen bereits durchgeführt" },
            { value: "optimierung", label: "Optimierung", desc: "Verbesserung vorhandener Dämmung" },
          ];
        case "dachsanierung":
          return [
            { value: "undicht", label: "Dach undicht", desc: "Wassereinbruch vorhanden" },
            { value: "beschaedigt", label: "Beschädigt", desc: "Sichtbare Schäden" },
            { value: "veraltet", label: "Veraltet", desc: "Vorsorglich erneuern" },
          ];
        default:
          return [
            { value: "schlecht", label: "Schlechter Zustand", desc: "Dringend sanierungsbedürftig" },
            { value: "mittel", label: "Mittlerer Zustand", desc: "Renovierung empfohlen" },
            { value: "gut", label: "Guter Zustand", desc: "Kleinere Verbesserungen" },
          ];
      }
    };

    return (
      <div className="space-y-6">
        <div>
          <Label className="text-base font-medium mb-4 block">Wie würden Sie den aktuellen Zustand beschreiben?</Label>
          <RadioGroup
            value={formData.serviceDetails.condition || ""}
            onValueChange={(value) => updateServiceDetails("condition", value)}
            className="space-y-3"
          >
            {getConditionOptions().map((option) => (
              <div key={option.value} className="flex items-start space-x-3 p-3 rounded-lg border hover-elevate">
                <RadioGroupItem value={option.value} id={`condition-${option.value}`} className="mt-1" data-testid={`radio-condition-${option.value}`} />
                <div>
                  <Label htmlFor={`condition-${option.value}`} className="font-medium cursor-pointer">{option.label}</Label>
                  <p className="text-sm text-muted-foreground">{option.desc}</p>
                </div>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div>
          <Label htmlFor="additionalNotes" className="text-base font-medium">Gibt es besondere Umstände?</Label>
          <p className="text-sm text-muted-foreground mb-2">(Optional: Asbest, Schimmel, Wasserschäden, etc.)</p>
          <Textarea
            id="additionalNotes"
            placeholder="Beschreiben Sie hier besondere Umstände oder Probleme..."
            value={formData.additionalNotes}
            onChange={(e) => updateFormData("additionalNotes", e.target.value)}
            className="min-h-24"
            data-testid="textarea-additional-notes"
          />
        </div>
      </div>
    );
  };

  const renderStep5Quality = () => (
    <div className="space-y-4">
      <p className="text-muted-foreground mb-6">
        Die Qualitätsstufe beeinflusst Materialien, Marken und Ausführungsdetails. 
        Wir beraten Sie gerne zu den Unterschieden.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {qualityLevels.map((level) => {
          const Icon = level.icon;
          const isSelected = formData.qualityLevel === level.id;
          return (
            <button
              key={level.id}
              type="button"
              onClick={() => updateFormData("qualityLevel", level.id)}
              className={`p-6 rounded-lg border-2 text-left transition-all hover-elevate ${
                isSelected 
                  ? "border-primary bg-primary/5" 
                  : "border-border"
              }`}
              data-testid={`button-quality-${level.id}`}
            >
              <div className="flex flex-col items-center text-center">
                <div className={`p-3 rounded-full mb-3 ${isSelected ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <p className="font-semibold text-lg">{level.label}</p>
                <p className="text-sm text-muted-foreground mt-1">{level.description}</p>
                <p className="text-xs text-muted-foreground mt-2 italic">{level.examples}</p>
                {isSelected && <CheckCircle className="w-5 h-5 text-primary mt-3" />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );

  const renderStep6Timeline = () => (
    <div className="space-y-6">
      <div>
        <Label className="text-base font-medium mb-4 block">Wann soll das Projekt beginnen?</Label>
        <RadioGroup
          value={formData.timeline}
          onValueChange={(value) => {
            updateFormData("timeline", value);
            if (value === "sofort") {
              updateFormData("isUrgent", true);
            }
          }}
          className="space-y-3"
        >
          {timelineOptions.map((option) => (
            <div key={option.id} className="flex items-start space-x-3 p-3 rounded-lg border hover-elevate">
              <RadioGroupItem value={option.id} id={`timeline-${option.id}`} className="mt-1" data-testid={`radio-timeline-${option.id}`} />
              <div>
                <Label htmlFor={`timeline-${option.id}`} className="font-medium cursor-pointer">{option.label}</Label>
                <p className="text-sm text-muted-foreground">{option.description}</p>
              </div>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div>
        <Label htmlFor="preferredStartDate" className="text-base font-medium">Wunsch-Starttermin (optional)</Label>
        <Input
          id="preferredStartDate"
          type="date"
          value={formData.preferredStartDate}
          onChange={(e) => updateFormData("preferredStartDate", e.target.value)}
          className="max-w-48 mt-2"
          data-testid="input-start-date"
        />
      </div>

      <div>
        <Label className="text-base font-medium mb-4 block">Budget-Rahmen (optional)</Label>
        <p className="text-sm text-muted-foreground mb-3">
          Diese Angabe hilft uns, Ihnen passende Lösungen vorzuschlagen.
        </p>
        <Select
          value={formData.budgetRange}
          onValueChange={(value) => updateFormData("budgetRange", value)}
        >
          <SelectTrigger className="max-w-64" data-testid="select-budget">
            <SelectValue placeholder="Bitte wählen (optional)" />
          </SelectTrigger>
          <SelectContent>
            {budgetRanges.map((range) => (
              <SelectItem key={range.id} value={range.id}>
                {range.label} - {range.range}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  const renderStep7Location = () => (
    <div className="space-y-6">
      <p className="text-muted-foreground">
        Wo befindet sich das Objekt? Diese Information ist wichtig für eine genaue Kostenschätzung.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        <Label htmlFor="address" className="text-base font-medium">Straße und Hausnummer (optional)</Label>
        <Input
          id="address"
          type="text"
          placeholder="z.B. Zielstattstr. 9"
          value={formData.address}
          onChange={(e) => updateFormData("address", e.target.value)}
          className="mt-2"
          data-testid="input-address"
        />
        <p className="text-sm text-muted-foreground mt-1">
          Die Adresse hilft uns bei der Terminplanung für eine Vor-Ort-Besichtigung.
        </p>
      </div>
    </div>
  );

  const renderStep8Contact = () => (
    <div className="space-y-6">
      <p className="text-muted-foreground">
        Fast geschafft! Hinterlassen Sie uns Ihre Kontaktdaten und wir melden uns innerhalb von 24 Stunden mit einem unverbindlichen Angebot.
      </p>

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
          <Label htmlFor="phone" className="text-base font-medium">Telefonnummer *</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="z.B. 0152 123 456 78"
            value={formData.phone}
            onChange={(e) => updateFormData("phone", e.target.value)}
            className="mt-2"
            data-testid="input-phone"
          />
        </div>

        <div>
          <Label htmlFor="email" className="text-base font-medium">E-Mail-Adresse *</Label>
          <Input
            id="email"
            type="email"
            placeholder="ihre@email.de"
            value={formData.email}
            onChange={(e) => updateFormData("email", e.target.value)}
            className="mt-2"
            data-testid="input-email"
          />
        </div>
      </div>

      <div className="flex items-start space-x-3 p-4 bg-muted/50 rounded-lg">
        <Checkbox
          id="privacy"
          checked={privacyAccepted}
          onCheckedChange={(checked) => setPrivacyAccepted(checked as boolean)}
          className="mt-0.5"
          data-testid="checkbox-privacy"
        />
        <Label htmlFor="privacy" className="text-sm font-normal leading-relaxed cursor-pointer">
          Ich stimme der Verarbeitung meiner Daten gemäß der Datenschutzerklärung zu. 
          Meine Daten werden nur zur Bearbeitung meiner Anfrage verwendet.
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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
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
              </CardHeader>
              <CardContent>
                {renderCurrentStep()}

                <div className="flex justify-between gap-4 mt-8 pt-6 border-t">
                  {currentStep > 1 && (
                    <Button
                      variant="outline"
                      onClick={handleBack}
                      data-testid="button-back"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Zurück
                    </Button>
                  )}
                  
                  <div className="ml-auto">
                    {currentStep < totalSteps ? (
                      <Button
                        onClick={handleNext}
                        disabled={!canProceed()}
                        data-testid="button-next"
                      >
                        Weiter
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    ) : (
                      <Button
                        onClick={handleSubmit}
                        disabled={!canProceed() || createLeadMutation.isPending}
                        data-testid="button-submit"
                      >
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
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    Kein Stress mit Handwerkersuche
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    Keine Überraschungen bei den Kosten
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    Keine ewigen Wartezeiten
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    Ein Ansprechpartner für alles
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
                <a 
                  href="tel:+4915212274043" 
                  className="text-lg font-semibold text-primary"
                  data-testid="link-phone"
                >
                  0152 122 740 43
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
