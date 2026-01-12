import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SiteHeader } from "@/components/site-header";
import { SeoFooter } from "@/components/seo-footer";
import { SeoHead } from "@/components/seo-head";
import {
  Building,
  Home as HomeIcon,
  Bath,
  ChefHat,
  Zap,
  Droplets,
  Layers,
  Flame,
  Paintbrush,
  ArrowRight,
  ArrowLeft,
  Calculator,
  Phone,
  CheckCircle,
  Euro,
  Leaf,
  BadgePercent,
  Sun,
  Wind,
  ThermometerSun
} from "lucide-react";

type PropertyType = "wohnung" | "haus" | "foerderung" | null;
type RoomSize = "klein" | "mittel" | "gross" | null;

interface ServiceOption {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  basePrice: { wohnung: number; haus: number; foerderung: number };
  perSqm: { wohnung: number; haus: number; foerderung: number };
  foerderungProzent?: number;
}

// Münchner Preise 2026 - Netto zzgl. 19% MwSt.
// Bad/Küche = Festpreise (Raumgröße, nicht Wohnfläche)
// Andere = qm-Preise (Gesamtfläche)
const serviceOptions: ServiceOption[] = [
  { 
    id: "komplett", 
    label: "Komplettsanierung", 
    icon: HomeIcon,
    basePrice: { wohnung: 0, haus: 0, foerderung: 0 },
    perSqm: { wohnung: 1600, haus: 2800, foerderung: 3200 },
    foerderungProzent: 20
  },
  { 
    id: "bad", 
    label: "Badsanierung", 
    icon: Bath,
    basePrice: { wohnung: 18000, haus: 28000, foerderung: 32000 },
    perSqm: { wohnung: 0, haus: 0, foerderung: 0 },
    foerderungProzent: 15
  },
  { 
    id: "kueche", 
    label: "Küchensanierung", 
    icon: ChefHat,
    basePrice: { wohnung: 15000, haus: 25000, foerderung: 28000 },
    perSqm: { wohnung: 0, haus: 0, foerderung: 0 },
    foerderungProzent: 10
  },
  { 
    id: "elektro", 
    label: "Elektrosanierung", 
    icon: Zap,
    basePrice: { wohnung: 0, haus: 0, foerderung: 0 },
    perSqm: { wohnung: 130, haus: 160, foerderung: 180 },
    foerderungProzent: 15
  },
  { 
    id: "sanitaer", 
    label: "Sanitärsanierung", 
    icon: Droplets,
    basePrice: { wohnung: 0, haus: 0, foerderung: 0 },
    perSqm: { wohnung: 75, haus: 120, foerderung: 140 },
    foerderungProzent: 15
  },
  { 
    id: "boden", 
    label: "Bodensanierung", 
    icon: Layers,
    basePrice: { wohnung: 0, haus: 0, foerderung: 0 },
    perSqm: { wohnung: 95, haus: 140, foerderung: 160 },
    foerderungProzent: 10
  },
  { 
    id: "heizung", 
    label: "Heizungssanierung", 
    icon: Flame,
    basePrice: { wohnung: 12000, haus: 28000, foerderung: 35000 },
    perSqm: { wohnung: 0, haus: 0, foerderung: 0 },
    foerderungProzent: 30
  },
  { 
    id: "maler", 
    label: "Malerarbeiten", 
    icon: Paintbrush,
    basePrice: { wohnung: 0, haus: 0, foerderung: 0 },
    perSqm: { wohnung: 28, haus: 38, foerderung: 45 },
    foerderungProzent: 5
  }
];

// Münchner Preise 2026 für Fördermaßnahmen - Netto zzgl. 19% MwSt.
const foerderungServices: ServiceOption[] = [
  { 
    id: "waermepumpe", 
    label: "Wärmepumpe", 
    icon: ThermometerSun,
    basePrice: { wohnung: 0, haus: 0, foerderung: 0 },
    perSqm: { wohnung: 280, haus: 320, foerderung: 320 },
    foerderungProzent: 35
  },
  { 
    id: "daemmung", 
    label: "Fassadendämmung", 
    icon: HomeIcon,
    basePrice: { wohnung: 0, haus: 0, foerderung: 0 },
    perSqm: { wohnung: 180, haus: 220, foerderung: 220 },
    foerderungProzent: 20
  },
  { 
    id: "fenster", 
    label: "Fensteraustausch", 
    icon: Wind,
    basePrice: { wohnung: 0, haus: 0, foerderung: 0 },
    perSqm: { wohnung: 180, haus: 280, foerderung: 280 },
    foerderungProzent: 20
  },
  { 
    id: "solar", 
    label: "Solarthermie", 
    icon: Sun,
    basePrice: { wohnung: 0, haus: 0, foerderung: 0 },
    perSqm: { wohnung: 120, haus: 160, foerderung: 160 },
    foerderungProzent: 25
  },
  { 
    id: "photovoltaik", 
    label: "Photovoltaik", 
    icon: Zap,
    basePrice: { wohnung: 0, haus: 0, foerderung: 0 },
    perSqm: { wohnung: 150, haus: 220, foerderung: 220 },
    foerderungProzent: 0
  },
  { 
    id: "heizung_foerder", 
    label: "Heizungstausch (förderfähig)", 
    icon: Flame,
    basePrice: { wohnung: 0, haus: 0, foerderung: 0 },
    perSqm: { wohnung: 150, haus: 250, foerderung: 250 },
    foerderungProzent: 30
  }
];

const sizeOptions = {
  wohnung: [
    { id: "klein", label: "Klein", sqm: "30-50 m²", avgSqm: 40 },
    { id: "mittel", label: "Mittel", sqm: "50-80 m²", avgSqm: 65 },
    { id: "gross", label: "Groß", sqm: "80-120 m²", avgSqm: 100 }
  ],
  haus: [
    { id: "klein", label: "Klein", sqm: "80-120 m²", avgSqm: 100 },
    { id: "mittel", label: "Mittel", sqm: "120-180 m²", avgSqm: 150 },
    { id: "gross", label: "Groß", sqm: "180-250 m²", avgSqm: 215 }
  ],
  foerderung: [
    { id: "klein", label: "Klein", sqm: "80-120 m²", avgSqm: 100 },
    { id: "mittel", label: "Mittel", sqm: "120-180 m²", avgSqm: 150 },
    { id: "gross", label: "Groß", sqm: "180-250 m²", avgSqm: 215 }
  ]
};

export default function RechnerPage() {
  const [step, setStep] = useState(1);
  const [propertyType, setPropertyType] = useState<PropertyType>(null);
  const [customSqm, setCustomSqm] = useState<number>(0);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const handlePropertySelect = (type: PropertyType) => {
    setPropertyType(type);
    setSelectedServices([]);
    // Set default sqm based on property type
    if (type === "wohnung") {
      setCustomSqm(65);
    } else {
      setCustomSqm(150);
    }
    setStep(2);
  };

  const handleSqmChange = (value: number) => {
    setCustomSqm(value);
  };

  const handleSqmConfirm = () => {
    if (customSqm > 0) {
      setStep(3);
    }
  };

  const toggleService = (serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(s => s !== serviceId)
        : [...prev, serviceId]
    );
  };

  const getCurrentServices = () => {
    return propertyType === "foerderung" ? foerderungServices : serviceOptions;
  };

  const calculatePrice = () => {
    if (!propertyType || customSqm <= 0 || selectedServices.length === 0) return { min: 0, max: 0, foerderung: 0 };
    
    let totalBase = 0;
    let totalPerSqm = 0;
    let totalFoerderung = 0;
    
    const services = getCurrentServices();
    
    selectedServices.forEach(serviceId => {
      const service = services.find(s => s.id === serviceId);
      if (service) {
        const serviceTotal = service.basePrice[propertyType] + (service.perSqm[propertyType] * customSqm);
        totalBase += service.basePrice[propertyType];
        totalPerSqm += service.perSqm[propertyType];
        if (propertyType === "foerderung" && service.foerderungProzent) {
          totalFoerderung += Math.round(serviceTotal * (service.foerderungProzent / 100));
        }
      }
    });
    
    const total = totalBase + (totalPerSqm * customSqm);
    
    return {
      min: Math.round(total * 0.85 / 1000) * 1000,
      max: Math.round(total * 1.15 / 1000) * 1000,
      foerderung: totalFoerderung
    };
  };

  const goBack = () => {
    if (step === 2) {
      setStep(1);
      setPropertyType(null);
      setCustomSqm(0);
    } else if (step === 3) {
      setStep(2);
    } else if (step === 4) {
      setStep(3);
    }
  };

  const showResult = () => {
    if (selectedServices.length > 0) {
      setStep(4);
    }
  };

  const resetCalculator = () => {
    setStep(1);
    setPropertyType(null);
    setCustomSqm(0);
    setSelectedServices([]);
  };

  const price = calculatePrice();
  const currentServices = getCurrentServices();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SeoHead 
        title="Sanierungsrechner München | Kosten berechnen | 089 Sanierer"
        description="Berechnen Sie die Kosten für Ihre Wohnungs- oder Haussanierung in München. Unverbindlicher Online-Rechner für Komplettsanierung, Badsanierung und mehr."
      />
      <SiteHeader />

      <main className="flex-1 pt-16">
        <section className="py-6 lg:py-10 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Calculator className="w-10 h-10 text-primary" />
                <h1 className="text-3xl md:text-4xl font-bold">Sanierungsrechner</h1>
              </div>
              <p className="text-lg text-muted-foreground">
                Berechnen Sie in wenigen Klicks die ungefähren Kosten für Ihre Sanierung
              </p>
            </div>

            <div className="max-w-7xl mx-auto">
              <div className="flex justify-center mb-8">
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4].map((s) => (
                    <div key={s} className="flex items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${
                        step >= s ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                      }`}>
                        {step > s ? <CheckCircle className="w-5 h-5" /> : s}
                      </div>
                      {s < 4 && (
                        <div className={`w-8 md:w-16 h-1 mx-1 transition-colors ${
                          step > s ? 'bg-primary' : 'bg-muted'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {step === 1 && (
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-6">Was möchten Sie sanieren?</h2>
                  <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    <Card 
                      className="cursor-pointer transition-all hover:border-primary hover:shadow-lg"
                      onClick={() => handlePropertySelect("wohnung")}
                      data-testid="select-wohnung"
                    >
                      <CardContent className="p-8 text-center">
                        <Building className="w-16 h-16 text-primary mx-auto mb-4" />
                        <h3 className="text-xl font-bold mb-2">Wohnung</h3>
                        <p className="text-muted-foreground text-sm">
                          Eigentumswohnung oder Mietwohnung
                        </p>
                      </CardContent>
                    </Card>
                    <Card 
                      className="cursor-pointer transition-all hover:border-primary hover:shadow-lg"
                      onClick={() => handlePropertySelect("haus")}
                      data-testid="select-haus"
                    >
                      <CardContent className="p-8 text-center">
                        <HomeIcon className="w-16 h-16 text-primary mx-auto mb-4" />
                        <h3 className="text-xl font-bold mb-2">Haus</h3>
                        <p className="text-muted-foreground text-sm">
                          Einfamilienhaus, Reihenhaus oder DHH
                        </p>
                      </CardContent>
                    </Card>
                    <Card 
                      className="cursor-pointer transition-all hover:border-green-500 hover:shadow-lg border-green-200 bg-green-50/50"
                      onClick={() => handlePropertySelect("foerderung")}
                      data-testid="select-foerderung"
                    >
                      <CardContent className="p-8 text-center">
                        <div className="relative">
                          <Leaf className="w-16 h-16 text-green-600 mx-auto mb-4" />
                          <BadgePercent className="w-8 h-8 text-green-600 absolute -top-1 -right-1" />
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-green-700">KfW & BAFA</h3>
                        <p className="text-muted-foreground text-sm">
                          Förderfähige energetische Sanierung
                        </p>
                        <div className="mt-2 inline-block bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded">
                          Bis zu 35% Förderung
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              {step === 2 && propertyType && (
                <div className="text-center">
                  <Button variant="ghost" onClick={goBack} className="mb-4" data-testid="button-back-step2">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Zurück
                  </Button>
                  <h2 className="text-2xl font-bold mb-6">
                    {propertyType === "foerderung" 
                      ? "Wie groß ist Ihr Gebäude?" 
                      : `Wie groß ist ${propertyType === "wohnung" ? "Ihre Wohnung" : "Ihr Haus"}?`
                    }
                  </h2>
                  <Card className="max-w-md mx-auto">
                    <CardContent className="p-8">
                      <div className="mb-6">
                        <label className="block text-lg font-medium mb-3">
                          Wohnfläche in m²
                        </label>
                        <div className="flex items-center gap-4">
                          <input
                            type="number"
                            min="10"
                            max="500"
                            value={customSqm}
                            onChange={(e) => handleSqmChange(Number(e.target.value))}
                            className="w-full text-center text-3xl font-bold p-4 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                            data-testid="input-sqm"
                          />
                          <span className="text-2xl font-medium text-muted-foreground">m²</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">
                          {propertyType === "wohnung" 
                            ? "Typische Wohnungen: 30-120 m²" 
                            : "Typische Häuser: 80-250 m²"
                          }
                        </p>
                      </div>
                      <Button 
                        onClick={handleSqmConfirm}
                        disabled={customSqm < 10}
                        className="w-full"
                        size="lg"
                        data-testid="button-confirm-sqm"
                      >
                        Weiter
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              )}

              {step === 3 && (
                <div className="text-center">
                  <Button variant="ghost" onClick={goBack} className="mb-4" data-testid="button-back-step3">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Zurück
                  </Button>
                  <h2 className="text-2xl font-bold mb-2">
                    {propertyType === "foerderung" 
                      ? "Welche förderfähigen Maßnahmen interessieren Sie?"
                      : "Welche Arbeiten sollen durchgeführt werden?"
                    }
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    {propertyType === "foerderung" 
                      ? "Wählen Sie die gewünschten Maßnahmen - wir zeigen Ihnen die mögliche Förderung"
                      : "Wählen Sie alle gewünschten Leistungen aus"
                    }
                  </p>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto mb-8">
                    {currentServices.map((service) => {
                      const isSelected = selectedServices.includes(service.id);
                      const IconComponent = service.icon;
                      return (
                        <Card 
                          key={service.id}
                          className={`cursor-pointer transition-all ${
                            isSelected 
                              ? propertyType === "foerderung"
                                ? 'border-green-500 bg-green-50 shadow-lg ring-2 ring-green-500'
                                : 'border-primary bg-primary/5 shadow-lg ring-2 ring-primary'
                              : 'hover:border-primary/50 hover:shadow-md'
                          }`}
                          onClick={() => toggleService(service.id)}
                          data-testid={`select-service-${service.id}`}
                        >
                          <CardContent className="p-4 text-center">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${
                              isSelected 
                                ? propertyType === "foerderung" ? 'bg-green-500 text-white' : 'bg-primary text-primary-foreground'
                                : 'bg-muted'
                            }`}>
                              <IconComponent className="w-6 h-6" />
                            </div>
                            <h3 className="font-semibold text-sm">{service.label}</h3>
                            {propertyType === "foerderung" && service.foerderungProzent && service.foerderungProzent > 0 && (
                              <div className="mt-2 inline-block bg-green-100 text-green-700 text-xs font-medium px-2 py-0.5 rounded">
                                bis {service.foerderungProzent}% Förderung
                              </div>
                            )}
                            {isSelected && (
                              <CheckCircle className={`w-5 h-5 mx-auto mt-2 ${propertyType === "foerderung" ? "text-green-600" : "text-primary"}`} />
                            )}
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                  <Button 
                    size="lg" 
                    onClick={showResult}
                    disabled={selectedServices.length === 0}
                    className={propertyType === "foerderung" 
                      ? "bg-green-600 hover:bg-green-700 text-white h-14 px-8 text-lg"
                      : "bg-orange-500 hover:bg-orange-600 text-white h-14 px-8 text-lg"
                    }
                    data-testid="button-calculate"
                  >
                    {propertyType === "foerderung" ? "Förderung berechnen" : "Kosten berechnen"}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              )}

              {step === 4 && (
                <div className="text-center">
                  <Button variant="ghost" onClick={goBack} className="mb-4" data-testid="button-back-step4">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Zurück
                  </Button>
                  
                  <Card className="max-w-2xl mx-auto mb-8">
                    <CardContent className="p-8">
                      <h2 className="text-2xl font-bold mb-6">
                        {propertyType === "foerderung" 
                          ? "Ihre geschätzten Kosten & Förderungen"
                          : "Ihre geschätzten Sanierungskosten"
                        }
                      </h2>
                      
                      <div className={`rounded-xl p-6 mb-6 ${propertyType === "foerderung" ? "bg-green-50" : "bg-primary/5"}`}>
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <Euro className={`w-8 h-8 ${propertyType === "foerderung" ? "text-green-600" : "text-primary"}`} />
                          <span className={`text-4xl md:text-5xl font-bold ${propertyType === "foerderung" ? "text-green-700" : "text-primary"}`}>
                            {price.min.toLocaleString('de-DE')} - {price.max.toLocaleString('de-DE')} €
                          </span>
                        </div>
                        <p className="text-muted-foreground">
                          Geschätzte Kosten inkl. Material und Arbeit
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Alle Preise netto zzgl. 19% MwSt. | Münchner Marktpreise 2026
                        </p>
                        
                        {propertyType === "foerderung" && price.foerderung > 0 && (
                          <div className="mt-4 p-4 bg-green-100 rounded-lg">
                            <div className="flex items-center justify-center gap-2">
                              <BadgePercent className="w-6 h-6 text-green-700" />
                              <span className="text-2xl font-bold text-green-700">
                                bis zu {price.foerderung.toLocaleString('de-DE')} € Förderung möglich
                              </span>
                            </div>
                            <p className="text-green-600 text-sm mt-1">
                              KfW & BAFA Förderprogramme für energetische Sanierung
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="text-left space-y-3 mb-6">
                        <div className="flex justify-between py-2 border-b">
                          <span className="text-muted-foreground">Objekttyp:</span>
                          <span className="font-medium">
                            {propertyType === "wohnung" ? "Wohnung" : propertyType === "haus" ? "Haus" : "Energetische Sanierung"}
                          </span>
                        </div>
                        <div className="flex justify-between py-2 border-b">
                          <span className="text-muted-foreground">Wohnfläche:</span>
                          <span className="font-medium">{customSqm} m²</span>
                        </div>
                        <div className="flex justify-between py-2 border-b">
                          <span className="text-muted-foreground">Leistungen:</span>
                          <span className="font-medium text-right max-w-[60%]">
                            {selectedServices.map(id => 
                              currentServices.find(s => s.id === id)?.label
                            ).join(', ')}
                          </span>
                        </div>
                        {propertyType === "foerderung" && (
                          <div className="flex justify-between py-2 border-b">
                            <span className="text-muted-foreground">Effektive Kosten (nach Förderung):</span>
                            <span className="font-bold text-green-700">
                              {(price.min - price.foerderung).toLocaleString('de-DE')} - {(price.max - price.foerderung).toLocaleString('de-DE')} €
                            </span>
                          </div>
                        )}
                      </div>

                      <div className={`rounded-lg p-4 text-sm mb-6 ${propertyType === "foerderung" ? "bg-green-50 text-green-800" : "bg-accent/50 text-muted-foreground"}`}>
                        {propertyType === "foerderung" ? (
                          <>
                            <strong>Wichtig:</strong> Die tatsächliche Förderung hängt von vielen Faktoren ab (Gebäudezustand, 
                            Effizienzklasse, Antragszeitpunkt). Wir beraten Sie kostenlos zu den aktuellen Förderprogrammen 
                            und übernehmen die Antragstellung für Sie.
                          </>
                        ) : (
                          <>
                            <strong>Hinweis:</strong> Dies ist eine unverbindliche Schätzung basierend auf Durchschnittswerten. 
                            Der tatsächliche Preis hängt von vielen Faktoren ab. Für ein verbindliches Festpreisangebot 
                            kontaktieren Sie uns für eine kostenlose Beratung vor Ort.
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  <div className="max-w-2xl mx-auto">
                    <h3 className="text-xl font-bold mb-4">
                      {propertyType === "foerderung" 
                        ? "Jetzt Förderberatung & Festpreisangebot anfordern"
                        : "Jetzt unverbindliches Festpreisangebot anfordern"
                      }
                    </h3>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
                      <Link href={propertyType === "foerderung" ? "/anfrage?service=energetische-sanierung" : "/anfrage"}>
                        <Button 
                          size="lg" 
                          className={`h-14 px-8 text-lg font-semibold shadow-xl ${
                            propertyType === "foerderung" 
                              ? "bg-green-600 hover:bg-green-700 text-white"
                              : "bg-orange-500 hover:bg-orange-600 text-white"
                          }`}
                          data-testid="button-anfrage-rechner"
                        >
                          {propertyType === "foerderung" ? "Kostenlose Förderberatung" : "Kostenloses Angebot anfordern"}
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                      </Link>
                      <a href="tel:+498944438872">
                        <Button size="lg" variant="outline" className="h-14 px-6">
                          <Phone className="w-5 h-5 mr-2" />
                          089 444438872
                        </Button>
                      </a>
                    </div>
                    <Button variant="ghost" onClick={resetCalculator} data-testid="button-reset">
                      Neue Berechnung starten
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className={`py-6 lg:py-10 ${propertyType === "foerderung" ? "bg-green-600" : "bg-primary"} text-white`}>
          <div className="container mx-auto px-4 text-center max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {propertyType === "foerderung" 
                ? "Maximale Förderung sichern!"
                : "Warum auf Schätzungen verlassen?"
              }
            </h2>
            <div className="text-lg opacity-90 mb-4 flex flex-col gap-1">
              {propertyType === "foerderung" ? (
                <>
                  <span>Wir kennen alle KfW & BAFA Programme und übernehmen die Antragstellung.</span>
                  <span><strong>Keine Förderung verpassen - wir kümmern uns um alles.</strong></span>
                </>
              ) : (
                <>
                  <span>Unser Festpreis ist verbindlich - ohne versteckte Kosten.</span>
                  <span><strong>Lassen Sie sich jetzt kostenlos beraten.</strong></span>
                </>
              )}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={propertyType === "foerderung" ? "/anfrage?service=energetische-sanierung" : "/anfrage"}>
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white h-14 px-8 text-lg font-semibold shadow-xl" data-testid="button-anfrage-cta">
                  {propertyType === "foerderung" ? "Ja, ich will die maximale Förderung" : "Ja, ich will einen echten Festpreis"}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SeoFooter />
    </div>
  );
}
