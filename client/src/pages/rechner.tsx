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
  Euro
} from "lucide-react";

type PropertyType = "wohnung" | "haus" | null;
type RoomSize = "klein" | "mittel" | "gross" | null;

interface ServiceOption {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  basePrice: { wohnung: number; haus: number };
  perSqm: { wohnung: number; haus: number };
}

const serviceOptions: ServiceOption[] = [
  { 
    id: "komplett", 
    label: "Komplettsanierung", 
    icon: HomeIcon,
    basePrice: { wohnung: 15000, haus: 35000 },
    perSqm: { wohnung: 850, haus: 1200 }
  },
  { 
    id: "bad", 
    label: "Badsanierung", 
    icon: Bath,
    basePrice: { wohnung: 8000, haus: 12000 },
    perSqm: { wohnung: 1800, haus: 2000 }
  },
  { 
    id: "kueche", 
    label: "Küchensanierung", 
    icon: ChefHat,
    basePrice: { wohnung: 6000, haus: 8000 },
    perSqm: { wohnung: 800, haus: 900 }
  },
  { 
    id: "elektro", 
    label: "Elektrosanierung", 
    icon: Zap,
    basePrice: { wohnung: 3000, haus: 6000 },
    perSqm: { wohnung: 80, haus: 100 }
  },
  { 
    id: "sanitaer", 
    label: "Sanitärsanierung", 
    icon: Droplets,
    basePrice: { wohnung: 4000, haus: 8000 },
    perSqm: { wohnung: 60, haus: 80 }
  },
  { 
    id: "boden", 
    label: "Bodensanierung", 
    icon: Layers,
    basePrice: { wohnung: 2000, haus: 4000 },
    perSqm: { wohnung: 80, haus: 90 }
  },
  { 
    id: "heizung", 
    label: "Heizungssanierung", 
    icon: Flame,
    basePrice: { wohnung: 5000, haus: 15000 },
    perSqm: { wohnung: 40, haus: 60 }
  },
  { 
    id: "maler", 
    label: "Malerarbeiten", 
    icon: Paintbrush,
    basePrice: { wohnung: 1500, haus: 3000 },
    perSqm: { wohnung: 25, haus: 30 }
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
  ]
};

export default function RechnerPage() {
  const [step, setStep] = useState(1);
  const [propertyType, setPropertyType] = useState<PropertyType>(null);
  const [size, setSize] = useState<RoomSize>(null);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const handlePropertySelect = (type: PropertyType) => {
    setPropertyType(type);
    setStep(2);
  };

  const handleSizeSelect = (selectedSize: RoomSize) => {
    setSize(selectedSize);
    setStep(3);
  };

  const toggleService = (serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(s => s !== serviceId)
        : [...prev, serviceId]
    );
  };

  const calculatePrice = () => {
    if (!propertyType || !size || selectedServices.length === 0) return { min: 0, max: 0 };
    
    const sizeData = sizeOptions[propertyType].find(s => s.id === size);
    if (!sizeData) return { min: 0, max: 0 };
    
    let totalBase = 0;
    let totalPerSqm = 0;
    
    selectedServices.forEach(serviceId => {
      const service = serviceOptions.find(s => s.id === serviceId);
      if (service) {
        totalBase += service.basePrice[propertyType];
        totalPerSqm += service.perSqm[propertyType];
      }
    });
    
    const sqmPrice = totalPerSqm * sizeData.avgSqm;
    const total = totalBase + sqmPrice;
    
    return {
      min: Math.round(total * 0.85 / 1000) * 1000,
      max: Math.round(total * 1.15 / 1000) * 1000
    };
  };

  const goBack = () => {
    if (step === 2) {
      setStep(1);
      setPropertyType(null);
    } else if (step === 3) {
      setStep(2);
      setSize(null);
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
    setSize(null);
    setSelectedServices([]);
  };

  const price = calculatePrice();
  const selectedSizeData = propertyType && size ? sizeOptions[propertyType].find(s => s.id === size) : null;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SeoHead 
        title="Sanierungsrechner München | Kosten berechnen | 089 Sanierer"
        description="Berechnen Sie die Kosten für Ihre Wohnungs- oder Haussanierung in München. Unverbindlicher Online-Rechner für Komplettsanierung, Badsanierung und mehr."
      />
      <SiteHeader />

      <main className="flex-1">
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
                  <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                    <Card 
                      className="cursor-pointer transition-all hover:border-primary hover:shadow-lg"
                      onClick={() => handlePropertySelect("wohnung")}
                      data-testid="select-wohnung"
                    >
                      <CardContent className="p-8 text-center">
                        <Building className="w-16 h-16 text-primary mx-auto mb-4" />
                        <h3 className="text-xl font-bold mb-2">Wohnung</h3>
                        <p className="text-muted-foreground">
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
                        <p className="text-muted-foreground">
                          Einfamilienhaus, Reihenhaus oder Doppelhaushälfte
                        </p>
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
                    Wie groß ist Ihre {propertyType === "wohnung" ? "Wohnung" : "Ihr Haus"}?
                  </h2>
                  <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    {sizeOptions[propertyType].map((option) => (
                      <Card 
                        key={option.id}
                        className="cursor-pointer transition-all hover:border-primary hover:shadow-lg"
                        onClick={() => handleSizeSelect(option.id as RoomSize)}
                        data-testid={`select-size-${option.id}`}
                      >
                        <CardContent className="p-6 text-center">
                          <div className="text-4xl font-bold text-primary mb-2">{option.label}</div>
                          <p className="text-lg text-muted-foreground">{option.sqm}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="text-center">
                  <Button variant="ghost" onClick={goBack} className="mb-4" data-testid="button-back-step3">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Zurück
                  </Button>
                  <h2 className="text-2xl font-bold mb-2">Welche Arbeiten sollen durchgeführt werden?</h2>
                  <p className="text-muted-foreground mb-6">Wählen Sie alle gewünschten Leistungen aus</p>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mb-8">
                    {serviceOptions.map((service) => {
                      const isSelected = selectedServices.includes(service.id);
                      const IconComponent = service.icon;
                      return (
                        <Card 
                          key={service.id}
                          className={`cursor-pointer transition-all ${
                            isSelected 
                              ? 'border-primary bg-primary/5 shadow-lg ring-2 ring-primary' 
                              : 'hover:border-primary/50 hover:shadow-md'
                          }`}
                          onClick={() => toggleService(service.id)}
                          data-testid={`select-service-${service.id}`}
                        >
                          <CardContent className="p-4 text-center">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${
                              isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted'
                            }`}>
                              <IconComponent className="w-6 h-6" />
                            </div>
                            <h3 className="font-semibold text-sm">{service.label}</h3>
                            {isSelected && (
                              <CheckCircle className="w-5 h-5 text-primary mx-auto mt-2" />
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
                    className="bg-orange-500 hover:bg-orange-600 text-white h-14 px-8 text-lg"
                    data-testid="button-calculate"
                  >
                    Kosten berechnen
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
                      <h2 className="text-2xl font-bold mb-6">Ihre geschätzten Sanierungskosten</h2>
                      
                      <div className="bg-primary/5 rounded-xl p-6 mb-6">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <Euro className="w-8 h-8 text-primary" />
                          <span className="text-4xl md:text-5xl font-bold text-primary">
                            {price.min.toLocaleString('de-DE')} - {price.max.toLocaleString('de-DE')} €
                          </span>
                        </div>
                        <p className="text-muted-foreground">
                          Geschätzte Kosten inkl. Material und Arbeit
                        </p>
                      </div>

                      <div className="text-left space-y-3 mb-6">
                        <div className="flex justify-between py-2 border-b">
                          <span className="text-muted-foreground">Objekttyp:</span>
                          <span className="font-medium">{propertyType === "wohnung" ? "Wohnung" : "Haus"}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b">
                          <span className="text-muted-foreground">Größe:</span>
                          <span className="font-medium">{selectedSizeData?.sqm}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b">
                          <span className="text-muted-foreground">Leistungen:</span>
                          <span className="font-medium text-right">
                            {selectedServices.map(id => 
                              serviceOptions.find(s => s.id === id)?.label
                            ).join(', ')}
                          </span>
                        </div>
                      </div>

                      <div className="bg-accent/50 rounded-lg p-4 text-sm text-muted-foreground mb-6">
                        <strong>Hinweis:</strong> Dies ist eine unverbindliche Schätzung basierend auf Durchschnittswerten. 
                        Der tatsächliche Preis hängt von vielen Faktoren ab. Für ein verbindliches Festpreisangebot 
                        kontaktieren Sie uns für eine kostenlose Beratung vor Ort.
                      </div>
                    </CardContent>
                  </Card>

                  <div className="max-w-2xl mx-auto">
                    <h3 className="text-xl font-bold mb-4">Jetzt unverbindliches Festpreisangebot anfordern</h3>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
                      <Link href="/anfrage">
                        <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white h-14 px-8 text-lg font-semibold shadow-xl" data-testid="button-anfrage-rechner">
                          Kostenloses Angebot anfordern
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

        <section className="py-6 lg:py-10 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Warum auf Schätzungen verlassen?
            </h2>
            <div className="text-lg opacity-90 mb-4 flex flex-col gap-1">
              <span>Unser Festpreis ist verbindlich - ohne versteckte Kosten.</span>
              <span><strong>Lassen Sie sich jetzt kostenlos beraten.</strong></span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/anfrage">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white h-14 px-8 text-lg font-semibold shadow-xl" data-testid="button-anfrage-cta">
                  Ja, ich will einen echten Festpreis
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
