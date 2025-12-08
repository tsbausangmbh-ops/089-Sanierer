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
  Building2
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

type ServiceDetails = {
  squareMeters?: string;
  roomCount?: string;
  buildYear?: string;
  condition?: string;
  sanitaryCount?: string;
  barrierFree?: boolean;
  newAppliances?: boolean;
  countertopMaterial?: string;
  floorType?: string;
  underfloorHeating?: boolean;
  electricYear?: string;
  newFuseBox?: boolean;
  currentHeating?: string;
  desiredHeating?: string;
  insulationType?: string;
  newWindows?: boolean;
  roofArea?: string;
  roofType?: string;
  roofInsulation?: boolean;
};

export default function FunnelPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  
  const [formData, setFormData] = useState({
    service: "",
    propertyType: "wohnung",
    serviceDetails: {} as ServiceDetails,
    address: "",
    city: "",
    postalCode: "",
    description: "",
    isUrgent: false,
    name: "",
    phone: "",
    email: "",
  });

  const totalSteps = 5;
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
        return true;
      case 4:
        return formData.postalCode !== "" && formData.city !== "";
      case 5:
        return formData.name !== "" && formData.phone !== "" && formData.email !== "" && privacyAccepted;
      default:
        return false;
    }
  };

  const renderServiceQuestions = () => {
    const service = formData.service;
    
    switch (service) {
      case "badsanierung":
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="squareMeters" className="text-base font-medium">Wie groß ist Ihr Bad?</Label>
              <div className="flex items-center gap-2 mt-2">
                <Input
                  id="squareMeters"
                  type="number"
                  placeholder="z.B. 8"
                  value={formData.serviceDetails.squareMeters || ""}
                  onChange={(e) => updateServiceDetails("squareMeters", e.target.value)}
                  className="max-w-32"
                  data-testid="input-square-meters"
                />
                <span className="text-muted-foreground">m²</span>
              </div>
            </div>
            
            <div>
              <Label className="text-base font-medium">Wie viele Sanitärobjekte sollen erneuert werden?</Label>
              <p className="text-sm text-muted-foreground mb-2">(WC, Waschbecken, Dusche, Badewanne, etc.)</p>
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
              <Label className="text-base font-medium">Aktueller Zustand des Bades</Label>
              <RadioGroup
                value={formData.serviceDetails.condition || ""}
                onValueChange={(value) => updateServiceDetails("condition", value)}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="alt" id="condition-alt" data-testid="radio-condition-alt" />
                  <Label htmlFor="condition-alt" className="font-normal">Stark veraltet (30+ Jahre)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="mittel" id="condition-mittel" data-testid="radio-condition-mittel" />
                  <Label htmlFor="condition-mittel" className="font-normal">Renovierungsbedürftig (15-30 Jahre)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="okay" id="condition-okay" data-testid="radio-condition-okay" />
                  <Label htmlFor="condition-okay" className="font-normal">Grundsätzlich okay, aber Modernisierung gewünscht</Label>
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
            <div>
              <Label htmlFor="squareMeters" className="text-base font-medium">Wie groß ist Ihre Küche?</Label>
              <div className="flex items-center gap-2 mt-2">
                <Input
                  id="squareMeters"
                  type="number"
                  placeholder="z.B. 12"
                  value={formData.serviceDetails.squareMeters || ""}
                  onChange={(e) => updateServiceDetails("squareMeters", e.target.value)}
                  className="max-w-32"
                  data-testid="input-square-meters"
                />
                <span className="text-muted-foreground">m²</span>
              </div>
            </div>

            <div>
              <Label className="text-base font-medium">Aktueller Zustand der Küche</Label>
              <RadioGroup
                value={formData.serviceDetails.condition || ""}
                onValueChange={(value) => updateServiceDetails("condition", value)}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="komplett-neu" id="condition-neu" data-testid="radio-condition-neu" />
                  <Label htmlFor="condition-neu" className="font-normal">Komplett neue Küche gewünscht</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="teilweise" id="condition-teilweise" data-testid="radio-condition-teilweise" />
                  <Label htmlFor="condition-teilweise" className="font-normal">Teilrenovierung (Fronten, Arbeitsplatte)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="geraete" id="condition-geraete" data-testid="radio-condition-geraete" />
                  <Label htmlFor="condition-geraete" className="font-normal">Nur neue Geräte</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="newAppliances"
                checked={formData.serviceDetails.newAppliances || false}
                onCheckedChange={(checked) => updateServiceDetails("newAppliances", checked)}
                data-testid="checkbox-new-appliances"
              />
              <Label htmlFor="newAppliances" className="font-normal">Neue Elektrogeräte gewünscht?</Label>
            </div>

            <div>
              <Label className="text-base font-medium">Gewünschtes Arbeitsplatten-Material</Label>
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
                  <SelectItem value="edelstahl">Edelstahl</SelectItem>
                  <SelectItem value="unsicher">Noch unsicher</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case "komplettsanierung":
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="squareMeters" className="text-base font-medium">Wohnfläche</Label>
              <div className="flex items-center gap-2 mt-2">
                <Input
                  id="squareMeters"
                  type="number"
                  placeholder="z.B. 85"
                  value={formData.serviceDetails.squareMeters || ""}
                  onChange={(e) => updateServiceDetails("squareMeters", e.target.value)}
                  className="max-w-32"
                  data-testid="input-square-meters"
                />
                <span className="text-muted-foreground">m²</span>
              </div>
            </div>

            <div>
              <Label htmlFor="roomCount" className="text-base font-medium">Anzahl der Zimmer</Label>
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
                  <SelectItem value="7+">7 oder mehr Zimmer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="buildYear" className="text-base font-medium">Baujahr des Gebäudes</Label>
              <Select
                value={formData.serviceDetails.buildYear || ""}
                onValueChange={(value) => updateServiceDetails("buildYear", value)}
              >
                <SelectTrigger className="max-w-48 mt-2" data-testid="select-build-year">
                  <SelectValue placeholder="Bitte wählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vor-1950">Vor 1950</SelectItem>
                  <SelectItem value="1950-1970">1950-1970</SelectItem>
                  <SelectItem value="1970-1990">1970-1990</SelectItem>
                  <SelectItem value="1990-2010">1990-2010</SelectItem>
                  <SelectItem value="nach-2010">Nach 2010</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-base font-medium">Aktueller Zustand</Label>
              <RadioGroup
                value={formData.serviceDetails.condition || ""}
                onValueChange={(value) => updateServiceDetails("condition", value)}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="kernsanierung" id="condition-kern" data-testid="radio-condition-kern" />
                  <Label htmlFor="condition-kern" className="font-normal">Kernsanierung nötig</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="umfangreich" id="condition-umfang" data-testid="radio-condition-umfang" />
                  <Label htmlFor="condition-umfang" className="font-normal">Umfangreiche Renovierung</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="modernisierung" id="condition-modern" data-testid="radio-condition-modern" />
                  <Label htmlFor="condition-modern" className="font-normal">Modernisierung einzelner Bereiche</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        );

      case "bodensanierung":
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="squareMeters" className="text-base font-medium">Zu renovierende Fläche</Label>
              <div className="flex items-center gap-2 mt-2">
                <Input
                  id="squareMeters"
                  type="number"
                  placeholder="z.B. 60"
                  value={formData.serviceDetails.squareMeters || ""}
                  onChange={(e) => updateServiceDetails("squareMeters", e.target.value)}
                  className="max-w-32"
                  data-testid="input-square-meters"
                />
                <span className="text-muted-foreground">m²</span>
              </div>
            </div>

            <div>
              <Label className="text-base font-medium">Gewünschter Bodenbelag</Label>
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
                  <SelectItem value="teppich">Teppich</SelectItem>
                  <SelectItem value="unsicher">Noch unsicher</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-base font-medium">Aktueller Zustand des Bodens</Label>
              <RadioGroup
                value={formData.serviceDetails.condition || ""}
                onValueChange={(value) => updateServiceDetails("condition", value)}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="beschaedigt" id="condition-beschaedigt" data-testid="radio-condition-beschaedigt" />
                  <Label htmlFor="condition-beschaedigt" className="font-normal">Stark beschädigt / muss raus</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="abgenutzt" id="condition-abgenutzt" data-testid="radio-condition-abgenutzt" />
                  <Label htmlFor="condition-abgenutzt" className="font-normal">Abgenutzt, aber intakt</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="neubau" id="condition-neubau" data-testid="radio-condition-neubau" />
                  <Label htmlFor="condition-neubau" className="font-normal">Neubau / Rohbau</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="underfloorHeating"
                checked={formData.serviceDetails.underfloorHeating || false}
                onCheckedChange={(checked) => updateServiceDetails("underfloorHeating", checked)}
                data-testid="checkbox-underfloor-heating"
              />
              <Label htmlFor="underfloorHeating" className="font-normal">Fußbodenheizung gewünscht oder vorhanden?</Label>
            </div>
          </div>
        );

      case "elektrosanierung":
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="roomCount" className="text-base font-medium">Anzahl der Räume</Label>
              <Select
                value={formData.serviceDetails.roomCount || ""}
                onValueChange={(value) => updateServiceDetails("roomCount", value)}
              >
                <SelectTrigger className="max-w-48 mt-2" data-testid="select-room-count">
                  <SelectValue placeholder="Bitte wählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-3">1-3 Räume</SelectItem>
                  <SelectItem value="4-6">4-6 Räume</SelectItem>
                  <SelectItem value="7-10">7-10 Räume</SelectItem>
                  <SelectItem value="10+">Mehr als 10 Räume</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-base font-medium">Alter der Elektroinstallation</Label>
              <Select
                value={formData.serviceDetails.electricYear || ""}
                onValueChange={(value) => updateServiceDetails("electricYear", value)}
              >
                <SelectTrigger className="max-w-48 mt-2" data-testid="select-electric-year">
                  <SelectValue placeholder="Bitte wählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vor-1970">Vor 1970</SelectItem>
                  <SelectItem value="1970-1990">1970-1990</SelectItem>
                  <SelectItem value="1990-2010">1990-2010</SelectItem>
                  <SelectItem value="nach-2010">Nach 2010</SelectItem>
                  <SelectItem value="unbekannt">Unbekannt</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-base font-medium">Umfang der Arbeiten</Label>
              <RadioGroup
                value={formData.serviceDetails.condition || ""}
                onValueChange={(value) => updateServiceDetails("condition", value)}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="komplett" id="condition-komplett" data-testid="radio-condition-komplett" />
                  <Label htmlFor="condition-komplett" className="font-normal">Komplette Neuverkabelung</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="teilweise" id="condition-teilweise" data-testid="radio-condition-teilweise" />
                  <Label htmlFor="condition-teilweise" className="font-normal">Teilweise Erneuerung</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="erweiterung" id="condition-erweiterung" data-testid="radio-condition-erweiterung" />
                  <Label htmlFor="condition-erweiterung" className="font-normal">Erweiterung / Zusätzliche Steckdosen</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="newFuseBox"
                checked={formData.serviceDetails.newFuseBox || false}
                onCheckedChange={(checked) => updateServiceDetails("newFuseBox", checked)}
                data-testid="checkbox-new-fuse-box"
              />
              <Label htmlFor="newFuseBox" className="font-normal">Neuer Sicherungskasten / Verteilerkasten benötigt?</Label>
            </div>
          </div>
        );

      case "heizungssanierung":
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="squareMeters" className="text-base font-medium">Zu beheizende Wohnfläche</Label>
              <div className="flex items-center gap-2 mt-2">
                <Input
                  id="squareMeters"
                  type="number"
                  placeholder="z.B. 120"
                  value={formData.serviceDetails.squareMeters || ""}
                  onChange={(e) => updateServiceDetails("squareMeters", e.target.value)}
                  className="max-w-32"
                  data-testid="input-square-meters"
                />
                <span className="text-muted-foreground">m²</span>
              </div>
            </div>

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
              <Label className="text-base font-medium">Gewünschte Heizungsart</Label>
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
                  <SelectItem value="unsicher">Noch unsicher / Beratung gewünscht</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-base font-medium">Zustand der aktuellen Heizung</Label>
              <RadioGroup
                value={formData.serviceDetails.condition || ""}
                onValueChange={(value) => updateServiceDetails("condition", value)}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="defekt" id="condition-defekt" data-testid="radio-condition-defekt" />
                  <Label htmlFor="condition-defekt" className="font-normal">Defekt / Funktioniert nicht mehr</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="alt" id="condition-alt" data-testid="radio-condition-alt" />
                  <Label htmlFor="condition-alt" className="font-normal">Veraltet / Ineffizient</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="planung" id="condition-planung" data-testid="radio-condition-planung" />
                  <Label htmlFor="condition-planung" className="font-normal">Funktioniert noch, plane Wechsel</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        );

      case "energetische-sanierung":
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="squareMeters" className="text-base font-medium">Wohnfläche</Label>
              <div className="flex items-center gap-2 mt-2">
                <Input
                  id="squareMeters"
                  type="number"
                  placeholder="z.B. 150"
                  value={formData.serviceDetails.squareMeters || ""}
                  onChange={(e) => updateServiceDetails("squareMeters", e.target.value)}
                  className="max-w-32"
                  data-testid="input-square-meters"
                />
                <span className="text-muted-foreground">m²</span>
              </div>
            </div>

            <div>
              <Label htmlFor="buildYear" className="text-base font-medium">Baujahr des Gebäudes</Label>
              <Select
                value={formData.serviceDetails.buildYear || ""}
                onValueChange={(value) => updateServiceDetails("buildYear", value)}
              >
                <SelectTrigger className="max-w-48 mt-2" data-testid="select-build-year">
                  <SelectValue placeholder="Bitte wählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vor-1950">Vor 1950</SelectItem>
                  <SelectItem value="1950-1970">1950-1970</SelectItem>
                  <SelectItem value="1970-1990">1970-1990</SelectItem>
                  <SelectItem value="1990-2010">1990-2010</SelectItem>
                  <SelectItem value="nach-2010">Nach 2010</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-base font-medium">Gewünschte Dämmungsmaßnahmen</Label>
              <Select
                value={formData.serviceDetails.insulationType || ""}
                onValueChange={(value) => updateServiceDetails("insulationType", value)}
              >
                <SelectTrigger className="max-w-64 mt-2" data-testid="select-insulation-type">
                  <SelectValue placeholder="Bitte wählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fassade">Fassadendämmung</SelectItem>
                  <SelectItem value="dach">Dachdämmung</SelectItem>
                  <SelectItem value="keller">Kellerdämmung</SelectItem>
                  <SelectItem value="komplett">Komplett (mehrere Bereiche)</SelectItem>
                  <SelectItem value="unsicher">Noch unsicher / Beratung gewünscht</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="newWindows"
                checked={formData.serviceDetails.newWindows || false}
                onCheckedChange={(checked) => updateServiceDetails("newWindows", checked)}
                data-testid="checkbox-new-windows"
              />
              <Label htmlFor="newWindows" className="font-normal">Neue Fenster gewünscht?</Label>
            </div>

            <div>
              <Label className="text-base font-medium">Hauptgrund für die energetische Sanierung</Label>
              <RadioGroup
                value={formData.serviceDetails.condition || ""}
                onValueChange={(value) => updateServiceDetails("condition", value)}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="kosten" id="condition-kosten" data-testid="radio-condition-kosten" />
                  <Label htmlFor="condition-kosten" className="font-normal">Hohe Energiekosten senken</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="komfort" id="condition-komfort" data-testid="radio-condition-komfort" />
                  <Label htmlFor="condition-komfort" className="font-normal">Wohnkomfort verbessern</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pflicht" id="condition-pflicht" data-testid="radio-condition-pflicht" />
                  <Label htmlFor="condition-pflicht" className="font-normal">Gesetzliche Vorgaben erfüllen</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="wert" id="condition-wert" data-testid="radio-condition-wert" />
                  <Label htmlFor="condition-wert" className="font-normal">Immobilienwert steigern</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        );

      case "dachsanierung":
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="roofArea" className="text-base font-medium">Geschätzte Dachfläche</Label>
              <div className="flex items-center gap-2 mt-2">
                <Input
                  id="roofArea"
                  type="number"
                  placeholder="z.B. 100"
                  value={formData.serviceDetails.roofArea || ""}
                  onChange={(e) => updateServiceDetails("roofArea", e.target.value)}
                  className="max-w-32"
                  data-testid="input-roof-area"
                />
                <span className="text-muted-foreground">m²</span>
              </div>
            </div>

            <div>
              <Label className="text-base font-medium">Dachform</Label>
              <Select
                value={formData.serviceDetails.roofType || ""}
                onValueChange={(value) => updateServiceDetails("roofType", value)}
              >
                <SelectTrigger className="max-w-48 mt-2" data-testid="select-roof-type">
                  <SelectValue placeholder="Bitte wählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="satteldach">Satteldach</SelectItem>
                  <SelectItem value="flachdach">Flachdach</SelectItem>
                  <SelectItem value="pultdach">Pultdach</SelectItem>
                  <SelectItem value="walmdach">Walmdach</SelectItem>
                  <SelectItem value="mansarddach">Mansarddach</SelectItem>
                  <SelectItem value="andere">Andere Form</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-base font-medium">Aktueller Zustand des Dachs</Label>
              <RadioGroup
                value={formData.serviceDetails.condition || ""}
                onValueChange={(value) => updateServiceDetails("condition", value)}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="undicht" id="condition-undicht" data-testid="radio-condition-undicht" />
                  <Label htmlFor="condition-undicht" className="font-normal">Undicht / Wasserschaden</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="alt" id="condition-alt" data-testid="radio-condition-alt" />
                  <Label htmlFor="condition-alt" className="font-normal">Ziegel alt / beschädigt</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="optisch" id="condition-optisch" data-testid="radio-condition-optisch" />
                  <Label htmlFor="condition-optisch" className="font-normal">Optische Aufwertung gewünscht</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="ausbau" id="condition-ausbau" data-testid="radio-condition-ausbau" />
                  <Label htmlFor="condition-ausbau" className="font-normal">Dachausbau geplant</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="roofInsulation"
                checked={formData.serviceDetails.roofInsulation || false}
                onCheckedChange={(checked) => updateServiceDetails("roofInsulation", checked)}
                data-testid="checkbox-roof-insulation"
              />
              <Label htmlFor="roofInsulation" className="font-normal">Dachdämmung gewünscht?</Label>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-8 text-muted-foreground">
            <p>Bitte wählen Sie zuerst einen Service aus.</p>
          </div>
        );
    }
  };

  const getServiceLabel = (serviceId: string) => {
    return serviceOptions.find(s => s.id === serviceId)?.label || serviceId;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-muted-foreground">
                  Schritt {currentStep} von {totalSteps}
                </span>
                <span className="text-sm font-medium text-muted-foreground">
                  {Math.round(progress)}%
                </span>
              </div>
              <Progress value={progress} className="h-2" data-testid="progress-bar" />
            </div>

            <Card className="shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl lg:text-2xl">
                  {currentStep === 1 && "Welches Problem sollen wir für Sie lösen?"}
                  {currentStep === 2 && "Um welche Art von Objekt handelt es sich?"}
                  {currentStep === 3 && `Details zu Ihrer ${getServiceLabel(formData.service)}`}
                  {currentStep === 4 && "Wo befindet sich das Objekt?"}
                  {currentStep === 5 && "Wie erreichen wir Sie?"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {currentStep === 1 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {serviceOptions.map((service) => {
                      const Icon = service.icon;
                      const isSelected = formData.service === service.id;
                      return (
                        <button
                          key={service.id}
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
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-primary">{service.problem}</p>
                              <p className="font-medium">{service.label}</p>
                              <p className="text-sm text-muted-foreground">{service.description}</p>
                            </div>
                            {isSelected && (
                              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-3">
                      {propertyTypes.map((property) => {
                        const Icon = property.icon;
                        const isSelected = formData.propertyType === property.id;
                        return (
                          <button
                            key={property.id}
                            onClick={() => updateFormData("propertyType", property.id)}
                            className={`p-4 rounded-lg border-2 text-center transition-all hover-elevate ${
                              isSelected 
                                ? "border-primary bg-primary/5" 
                                : "border-border"
                            }`}
                            data-testid={`button-property-${property.id}`}
                          >
                            <Icon className={`w-8 h-8 mx-auto mb-2 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                            <p className="font-medium">{property.label}</p>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-6">
                    {renderServiceQuestions()}
                  </div>
                )}

                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="postalCode" className="text-base font-medium">Postleitzahl *</Label>
                      <Input
                        id="postalCode"
                        type="text"
                        placeholder="z.B. 81379"
                        value={formData.postalCode}
                        onChange={(e) => updateFormData("postalCode", e.target.value)}
                        className="mt-2 max-w-48"
                        maxLength={5}
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

                    <div>
                      <Label htmlFor="address" className="text-base font-medium">Straße und Hausnummer (optional)</Label>
                      <Input
                        id="address"
                        type="text"
                        placeholder="z.B. Musterstraße 123"
                        value={formData.address}
                        onChange={(e) => updateFormData("address", e.target.value)}
                        className="mt-2"
                        data-testid="input-address"
                      />
                    </div>

                    <div>
                      <Label htmlFor="description" className="text-base font-medium">Beschreiben Sie Ihr Problem (optional)</Label>
                      <Textarea
                        id="description"
                        placeholder="Was genau stört Sie? Was ist Ihnen besonders wichtig?"
                        value={formData.description}
                        onChange={(e) => updateFormData("description", e.target.value)}
                        className="mt-2 min-h-24"
                        data-testid="textarea-description"
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="isUrgent"
                        checked={formData.isUrgent}
                        onCheckedChange={(checked) => updateFormData("isUrgent", checked)}
                        data-testid="checkbox-is-urgent"
                      />
                      <Label htmlFor="isUrgent" className="font-normal">
                        Dringend - Schnelle Bearbeitung gewünscht
                      </Label>
                    </div>
                  </div>
                )}

                {currentStep === 5 && (
                  <div className="space-y-6">
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
                        placeholder="ihre.email@beispiel.de"
                        value={formData.email}
                        onChange={(e) => updateFormData("email", e.target.value)}
                        className="mt-2"
                        data-testid="input-email"
                      />
                    </div>

                    <div className="flex items-start space-x-2 pt-4 border-t">
                      <Checkbox
                        id="privacy"
                        checked={privacyAccepted}
                        onCheckedChange={(checked) => setPrivacyAccepted(checked as boolean)}
                        data-testid="checkbox-privacy"
                      />
                      <Label htmlFor="privacy" className="font-normal text-sm leading-relaxed">
                        Ich stimme der Verarbeitung meiner Daten gemäß der Datenschutzerklärung zu. 
                        Meine Daten werden nur zur Bearbeitung meiner Anfrage verwendet.
                      </Label>
                    </div>
                  </div>
                )}

                <div className="flex justify-between mt-8 pt-6 border-t">
                  {currentStep > 1 ? (
                    <Button
                      variant="outline"
                      onClick={handleBack}
                      data-testid="button-back"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Zurück
                    </Button>
                  ) : (
                    <div />
                  )}

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
                          Anfrage absenden
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:w-80 space-y-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">100% Unverbindlich</p>
                    <p className="text-sm text-muted-foreground">Kostenlose Beratung</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Schnelle Antwort</p>
                    <p className="text-sm text-muted-foreground">Innerhalb von 24 Stunden</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Award className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Meisterqualität</p>
                    <p className="text-sm text-muted-foreground">20+ Jahre Erfahrung</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-4">Ihre Vorteile</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Kein Stress mit Handwerkersuche</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Keine Überraschungen bei den Kosten</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Keine ewigen Wartezeiten</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Ein Ansprechpartner für alles</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Lieber telefonisch?
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Rufen Sie uns direkt an:
                </p>
                <a 
                  href="tel:+4915212274043" 
                  className="text-lg font-bold text-primary hover:underline"
                  data-testid="link-phone"
                >
                  0152 122 740 43
                </a>
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Zielstattstr. 9, 81379 München
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
