import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock, Home, Paintbrush, Bath, ArrowRight, Euro, Calendar, CheckCircle, Building, Thermometer, DoorOpen, Zap, Triangle } from "lucide-react";
import kshwLogoWhiteBg from "@assets/favicon-192-whitebg_1765228119332.png";

const headerServices = [
  { id: "komplettsanierung", title: "Komplettsanierung" },
  { id: "badsanierung", title: "Badsanierung" },
  { id: "kuechensanierung", title: "Küchensanierung" },
  { id: "dachsanierung", title: "Dachsanierung" },
  { id: "energetische-sanierung", title: "Energetische Sanierung" },
];

export default function Ratgeber() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-50 bg-[hsl(220,85%,10%)] text-white border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="h-16 flex items-center justify-between gap-4">
            <Link href="/">
              <div className="flex items-center gap-2 cursor-pointer">
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
              <Link href="/ratgeber">
                <Button variant="ghost" size="sm" className="text-sm text-white/80 hover:text-white hover:bg-white/10">
                  Ratgeber
                </Button>
              </Link>
              <Link href="/faq-preise">
                <Button variant="ghost" size="sm" className="text-sm text-white/80 hover:text-white hover:bg-white/10">
                  FAQ & Preise
                </Button>
              </Link>
            </div>
            <a href="tel:+4915212274043" className="hidden sm:flex">
              <Button className="bg-green-500 hover:bg-green-600 text-white border-green-500">
                <Phone className="w-4 h-4 mr-2" />
                0152 122 740 43
              </Button>
            </a>
            <Link href="/anfrage">
              <Button data-testid="button-header-cta">
                Kostenlose Anfrage
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-16 flex-1">
        <div className="max-w-5xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">Sanierung München: Was kostet es wirklich? Ihr ehrlicher Ratgeber</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Transparente Preise, echte Erfahrungswerte und Fördertipps aus der Praxis. So sparen Sie Zeit, Geld und Nerven bei Ihrer Sanierung in München.
            </p>
          </div>

          <nav className="mb-12 p-4 bg-muted/50 rounded-lg">
            <h2 className="font-semibold mb-3">Direkt zum Thema springen</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
              <a href="#haus-sanieren" className="text-primary hover:underline flex items-center gap-1"><Home className="w-4 h-4" /> Haus sanieren</a>
              <a href="#fassade" className="text-primary hover:underline flex items-center gap-1"><Paintbrush className="w-4 h-4" /> Fassade</a>
              <a href="#dach" className="text-primary hover:underline flex items-center gap-1"><Triangle className="w-4 h-4" /> Dach</a>
              <a href="#badezimmer" className="text-primary hover:underline flex items-center gap-1"><Bath className="w-4 h-4" /> Badezimmer</a>
              <a href="#keller" className="text-primary hover:underline flex items-center gap-1"><Building className="w-4 h-4" /> Keller</a>
              <a href="#daemmung" className="text-primary hover:underline flex items-center gap-1"><Thermometer className="w-4 h-4" /> Dämmung</a>
              <a href="#wohnung" className="text-primary hover:underline flex items-center gap-1"><DoorOpen className="w-4 h-4" /> Wohnung</a>
              <a href="#energetisch" className="text-primary hover:underline flex items-center gap-1"><Zap className="w-4 h-4" /> Energetische Sanierung</a>
            </div>
          </nav>

          <div className="space-y-16">

            <section id="haus-sanieren" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Home className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold">Haussanierung München: Endlich wissen, was es kostet</h2>
              </div>

              <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
                <p className="text-muted-foreground">
                  Was kostet eine Haussanierung in München? Wie teuer ist eine Kernsanierung? Lohnt sich die Sanierung eines alten Hauses? 
                  Diese Fragen beschäftigen viele Immobilienbesitzer in der Region München.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Euro className="w-5 h-5 text-primary" />
                      Kernsanierung Kosten
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-muted-foreground">Was kostet eine Kernsanierung pro m²?</p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Einfache Kernsanierung:</strong> 400-600 EUR/m²</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Mittlere Ausstattung:</strong> 600-900 EUR/m²</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Hochwertig:</strong> 900-1.400 EUR/m²</span>
                      </li>
                    </ul>
                    <p className="text-xs text-muted-foreground mt-4">
                      Beispiel: Kernsanierung 120 m² Haus = ca. 72.000-108.000 EUR (mittlere Ausstattung)
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building className="w-5 h-5 text-primary" />
                      Altbausanierung
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-muted-foreground">Altes Haus sanieren - was ist zu beachten?</p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Bausubstanz prüfen:</strong> Fundament, Tragwerk, Feuchtigkeit</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Schadstoffe:</strong> Asbest, Blei, PCB untersuchen lassen</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Energieeffizienz:</strong> Dämmung, Fenster, Heizung erneuern</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Denkmalschutz:</strong> Genehmigungen einholen</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-3">Das fragen uns Münchner Hausbesitzer am häufigsten</h3>
                  <div className="space-y-4 text-sm">
                    <div>
                      <p className="font-medium">Wie lange dauert eine Haussanierung?</p>
                      <p className="text-muted-foreground">Eine Kernsanierung dauert typischerweise 3-6 Monate, abhängig vom Umfang der Arbeiten.</p>
                    </div>
                    <div>
                      <p className="font-medium">Lohnt sich die Sanierung eines alten Hauses?</p>
                      <p className="text-muted-foreground">In München mit hohen Grundstückspreisen lohnt sich die Sanierung oft mehr als Abriss und Neubau. Zudem gibt es KfW-Förderungen bis zu 150.000 EUR.</p>
                    </div>
                    <div>
                      <p className="font-medium">Was ist bei einer Altbausanierung wichtig?</p>
                      <p className="text-muted-foreground">Fachgerechte Analyse der Bausubstanz, Schadstoffprüfung und ein realistischer Kostenplan mit Puffer (ca. 20%).</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section id="fassade" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Paintbrush className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold">Fassadenarbeiten München: So wird Ihr Haus wieder zum Hingucker</h2>
              </div>

              <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
                <p className="text-muted-foreground">
                  Was kostet Fassade streichen in München? Wo finde ich gute Malerarbeiten in meiner Nähe? 
                  Hier finden Sie alle Informationen zu Fassadensanierung und Malerarbeiten.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Euro className="w-5 h-5 text-primary" />
                      Fassade streichen Kosten
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-muted-foreground">Was kosten Malerarbeiten an der Fassade?</p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Nur Anstrich:</strong> 20-35 EUR/m²</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Inkl. Grundierung:</strong> 30-45 EUR/m²</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Inkl. Gerüst:</strong> 8-15 EUR/m² zusätzlich</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Rissausbesserung:</strong> 15-25 EUR/lfm</span>
                      </li>
                    </ul>
                    <p className="text-xs text-muted-foreground mt-4">
                      Beispiel: Fassade 150 m² streichen = ca. 4.500-7.500 EUR inkl. Gerüst
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Paintbrush className="w-5 h-5 text-primary" />
                      Fassadensanierung
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-muted-foreground">Umfassende Fassadensanierung mit Dämmung:</p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>WDVS-System:</strong> 120-180 EUR/m²</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Putz erneuern:</strong> 50-80 EUR/m²</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Fördermöglichkeit:</strong> 15% BAFA-Zuschuss</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-3">Ihre Fragen zu Fassade und Malerarbeiten</h3>
                  <div className="space-y-4 text-sm">
                    <div>
                      <p className="font-medium">Wie finde ich gute Malerarbeiten in meiner Nähe?</p>
                      <p className="text-muted-foreground">Achten Sie auf Meisterbetriebe mit Referenzen aus Ihrer Region München. Wir arbeiten mit geprüften Partnerbetrieben zusammen.</p>
                    </div>
                    <div>
                      <p className="font-medium">Wie oft muss man eine Fassade streichen?</p>
                      <p className="text-muted-foreground">Alle 10-15 Jahre bei normaler Beanspruchung. Nordseiten und Wetterseiten können früher Auffrischung benötigen.</p>
                    </div>
                    <div>
                      <p className="font-medium">Wann ist die beste Zeit für Fassadenarbeiten?</p>
                      <p className="text-muted-foreground">April bis Oktober bei trockener Witterung und Temperaturen über 5°C. Keine direkte Sonneneinstrahlung beim Trocknen.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section id="dach" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Triangle className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold">Dachsanierung München: Endlich ein dichtes, gedämmtes Dach</h2>
              </div>

              <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
                <p className="text-muted-foreground">
                  Was kostet eine Dachsanierung in München? Wie teuer ist ein Dachausbau? Welche Kosten fallen beim Dachboden ausbauen an? 
                  Alle wichtigen Informationen zu Dacharbeiten und Kosten.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Euro className="w-5 h-5 text-primary" />
                      Dachsanierung Kosten
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Neueindeckung:</strong> 120-240 EUR/m²</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Inkl. Dämmung:</strong> 180-360 EUR/m²</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Dachstuhl-Erneuerung:</strong> ab 72 EUR/m²</span>
                      </li>
                    </ul>
                    <p className="text-xs text-muted-foreground mt-4">
                      Beispiel: Dach 100 m² neu eindecken mit Dämmung = ca. 18.000-36.000 EUR
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building className="w-5 h-5 text-primary" />
                      Dachausbau Kosten
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Einfacher Ausbau:</strong> 600-960 EUR/m²</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Mit Bad/Küche:</strong> 960-1.440 EUR/m²</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Dachgauben:</strong> 3.600-9.600 EUR/Stück</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-primary" />
                      Dachboden ausbauen
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Dämmung:</strong> 48-120 EUR/m²</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Trockenbau:</strong> 60-96 EUR/m²</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Fenster/Gauben:</strong> 1.200-6.000 EUR</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-3">Das wollen Sie über Dachsanierung wissen</h3>
                  <div className="space-y-4 text-sm">
                    <div>
                      <p className="font-medium">Wann muss ein Dach saniert werden?</p>
                      <p className="text-muted-foreground">Bei undichten Stellen, beschädigten Ziegeln, Moos-/Algenbefall oder nach 40-60 Jahren Lebensdauer.</p>
                    </div>
                    <div>
                      <p className="font-medium">Gibt es Förderung für Dachsanierung?</p>
                      <p className="text-muted-foreground">Ja! BAFA fördert Dachdämmung mit 15% Zuschuss, bei iSFP sogar 20%. KfW bietet günstige Kredite.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section id="badezimmer" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Bath className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold">Badsanierung München: Ihr Traumbad in 2-4 Wochen</h2>
              </div>

              <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
                <p className="text-muted-foreground">
                  Was kostet eine Badsanierung in München? Welche Kosten fallen bei einem neuen Badezimmer an? 
                  Alle Informationen zu Badsanierungen mit Preisbeispielen.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Euro className="w-5 h-5 text-primary" />
                      Badezimmer Kosten
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-muted-foreground">Was kostet ein neues Bad komplett?</p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Kleines Bad (4-6 m²):</strong> 8.000-15.000 EUR</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Mittleres Bad (6-10 m²):</strong> 15.000-25.000 EUR</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Großes Bad (10+ m²):</strong> 25.000-40.000 EUR</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Luxusbad:</strong> ab 40.000 EUR</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-primary" />
                      Badsanierung Ablauf
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-muted-foreground">Was gehört zu einer Badsanierung?</p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Demontage Altinstallation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Sanitär- und Elektroinstallation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Abdichtung und Fliesen</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Sanitärobjekte montieren</span>
                      </li>
                    </ul>
                    <p className="text-xs text-muted-foreground mt-4">
                      Dauer: 2-4 Wochen je nach Umfang
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-3">Ihre Fragen zur Badsanierung</h3>
                  <div className="space-y-4 text-sm">
                    <div>
                      <p className="font-medium">Wie lange dauert eine Badsanierung?</p>
                      <p className="text-muted-foreground">Ein Standard-Bad dauert ca. 2-3 Wochen. Größere Umbauten mit Grundrissänderung 3-4 Wochen.</p>
                    </div>
                    <div>
                      <p className="font-medium">Gibt es Förderung für barrierefreie Bäder?</p>
                      <p className="text-muted-foreground">Ja! KfW fördert altersgerechte Umbauten mit bis zu 6.250 EUR Zuschuss (Programm 455-B).</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section id="keller" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Building className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold">Kellersanierung München: Schluss mit Feuchtigkeit und Schimmel</h2>
              </div>

              <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
                <p className="text-muted-foreground">
                  Was kostet eine Kellersanierung? Wie wird ein feuchter Keller trockengelegt? 
                  Informationen zu Kellerabdichtung, Kellersanierung und Kosten.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Euro className="w-5 h-5 text-primary" />
                      Kellersanierung Kosten
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Innenabdichtung:</strong> 100-200 EUR/m²</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Außenabdichtung:</strong> 300-600 EUR/lfm</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Drainage:</strong> 150-300 EUR/lfm</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Horizontalsperre:</strong> 200-400 EUR/lfm</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building className="w-5 h-5 text-primary" />
                      Kellerausbau
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-muted-foreground">Keller als Wohnraum nutzen:</p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Einfacher Ausbau:</strong> 400-600 EUR/m²</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Wohnraum-Standard:</strong> 700-1.000 EUR/m²</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Inkl. Bad/Küche:</strong> ab 1.200 EUR/m²</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section id="daemmung" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Thermometer className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold">Dämmung München: Bis zu 30% Heizkosten sparen</h2>
              </div>

              <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
                <p className="text-muted-foreground">
                  Was kostet eine Dachdämmung? Wie teuer ist eine Innendämmung? 
                  Alle Informationen zu Dämmmaßnahmen, Kosten und Fördermöglichkeiten.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Triangle className="w-5 h-5 text-primary" />
                      Aufsparrendämmung
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Kosten:</strong> 150-250 EUR/m²</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>U-Wert:</strong> bis 0,14 W/m²K</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Förderung:</strong> bis 20% BAFA</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building className="w-5 h-5 text-primary" />
                      Zwischensparrendämmung
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Kosten:</strong> 50-100 EUR/m²</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Material:</strong> Mineralwolle, Zellulose</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Einfache Montage</strong></span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Thermometer className="w-5 h-5 text-primary" />
                      Innendämmung
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Kosten:</strong> 80-150 EUR/m²</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Ideal für:</strong> Denkmalschutz</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Förderfähig:</strong> BAFA, KfW</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-3">Das wollen Sie über Dämmung wissen</h3>
                  <div className="space-y-4 text-sm">
                    <div>
                      <p className="font-medium">Was bringt eine Dachdämmung?</p>
                      <p className="text-muted-foreground">Bis zu 30% Heizenergie-Ersparnis. Die Investition amortisiert sich oft in 8-12 Jahren.</p>
                    </div>
                    <div>
                      <p className="font-medium">Welche Dämmung ist die beste?</p>
                      <p className="text-muted-foreground">Die Aufsparrendämmung bietet die beste Dämmwirkung, ist aber teurer. Zwischensparrendämmung ist ein guter Kompromiss.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section id="wohnung" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <DoorOpen className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold">Wohnungssanierung München: Vom Altbau zum Wohlfühl-Zuhause</h2>
              </div>

              <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
                <p className="text-muted-foreground">
                  Was kostet eine Wohnungssanierung in München? Wie teuer ist die Renovierung einer Altbauwohnung? 
                  Alle Informationen zu Kosten und Ablauf.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Euro className="w-5 h-5 text-primary" />
                      Wohnungssanierung Kosten
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Renovierung:</strong> 200-400 EUR/m²</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Teil-Sanierung:</strong> 400-700 EUR/m²</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Komplettsanierung:</strong> 700-1.200 EUR/m²</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Luxus-Standard:</strong> ab 1.200 EUR/m²</span>
                      </li>
                    </ul>
                    <p className="text-xs text-muted-foreground mt-4">
                      Beispiel: 80 m² Wohnung komplett sanieren = ca. 56.000-96.000 EUR
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-primary" />
                      Was ist enthalten?
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-muted-foreground">Leistungen bei Komplettsanierung:</p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Elektrik komplett erneuern</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Sanitärleitungen neu</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Neue Böden (Parkett/Fliesen)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Wände/Decken neu</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Neues Bad und neue Küche</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section id="energetisch" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Zap className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold">Energetische Sanierung: Bis zu 70% Förderung sichern</h2>
              </div>

              <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
                <p className="text-muted-foreground">
                  Was kostet eine energetische Sanierung? Welche Förderungen gibt es von BAFA und KfW? 
                  Welche Vorteile hat die energetische Sanierung für den Kunden?
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Card className="border-green-200 dark:border-green-800">
                  <CardHeader className="bg-green-50 dark:bg-green-900/20">
                    <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-300">
                      <CheckCircle className="w-5 h-5" />
                      Mit Förderung (BAFA/KfW)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 pt-6">
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Dämmung:</strong> 15-20% Zuschuss (BAFA)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Wärmepumpe:</strong> 30-70% Zuschuss (BAFA)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Fenster:</strong> 15-20% Zuschuss (BAFA)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Effizienzhaus:</strong> bis 150.000 EUR Kredit + Tilgungszuschuss (KfW)</span>
                      </li>
                    </ul>
                    <p className="text-xs text-muted-foreground mt-4 font-medium text-green-700 dark:text-green-300">
                      Beispiel Wärmepumpe: 30.000 EUR Kosten - 21.000 EUR Förderung = 9.000 EUR Eigenanteil
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Euro className="w-5 h-5 text-primary" />
                      Ohne Förderung
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 pt-6">
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <span><strong>Fassadendämmung:</strong> 120-180 EUR/m²</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <span><strong>Wärmepumpe:</strong> 25.000-40.000 EUR</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <span><strong>Fenster (10 Stk):</strong> 8.000-15.000 EUR</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <span><strong>Dachdämmung:</strong> 15.000-30.000 EUR</span>
                      </li>
                    </ul>
                    <p className="text-xs text-muted-foreground mt-4">
                      Ohne Förderung zahlen Sie den vollen Preis selbst.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 mb-8">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-4 text-green-700 dark:text-green-300">Das bringt Ihnen die energetische Sanierung:</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Heizkosten senken:</strong> Bis zu 50-70% Ersparnis pro Jahr</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Immobilienwert steigern:</strong> Bessere Energieklasse = höherer Verkaufspreis</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Wohnkomfort erhöhen:</strong> Keine kalten Wände, angenehmes Raumklima</span>
                      </li>
                    </ul>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Unabhängigkeit:</strong> Weniger abhängig von Energiepreisen</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Umwelt schützen:</strong> CO2-Ausstoß reduzieren</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Förderung nutzen:</strong> Bis zu 70% der Kosten zurückbekommen</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-3">So funktioniert die Förderung</h3>
                  <div className="space-y-4 text-sm">
                    <div>
                      <p className="font-medium">Was ist der Unterschied zwischen BAFA und KfW Förderung?</p>
                      <p className="text-muted-foreground">BAFA bietet Zuschüsse für Einzelmaßnahmen (Heizung, Dämmung, Fenster). KfW bietet günstige Kredite mit Tilgungszuschuss für Komplettsanierungen zum Effizienzhaus.</p>
                    </div>
                    <div>
                      <p className="font-medium">Brauche ich einen Energieberater?</p>
                      <p className="text-muted-foreground">Für die meisten Förderungen ja. Der Energieberater erstellt den individuellen Sanierungsfahrplan (iSFP) und Sie erhalten 5% zusätzliche Förderung.</p>
                    </div>
                    <div>
                      <p className="font-medium">Wie beantrage ich die Förderung?</p>
                      <p className="text-muted-foreground">BAFA-Anträge werden online gestellt BEVOR die Arbeiten beginnen. Wir unterstützen Sie gerne dabei!</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

          </div>

          <div className="mt-16 text-center">
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="pt-8 pb-8">
                <h2 className="text-2xl font-bold mb-4">Bereit für Ihre Sanierung? Wir beraten Sie kostenlos.</h2>
                <p className="mb-6 opacity-90">
                  Unverbindliches Angebot, ehrliche Beratung, transparente Preise – starten Sie jetzt Ihr Projekt in München.
                </p>
                <Link href="/anfrage">
                  <Button size="lg" variant="secondary" className="gap-2" data-testid="button-ratgeber-cta">
                    Jetzt kostenlos anfragen
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

        </div>
      </main>

      <footer className="pt-12 pb-6 bg-[hsl(220,85%,10%)] text-white">
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
                <li><Link href="/kontakt" className="hover:text-white">Kontakt</Link></li>
                <li><Link href="/faq-preise" className="hover:text-white">FAQ & Preise</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8">
            <p className="text-white/70 text-sm mb-4 text-center">
              Ihr Münchner Sanierungspartner für Schwabing, Bogenhausen, Sendling, Pasing, Trudering, Riem, Haidhausen, Giesing und alle weiteren Stadtteile. 
              Auch im Münchner Umland: Dachau, Starnberg, Fürstenfeldbruck, Freising, Germering und Umgebung.
            </p>
            <p className="text-center text-sm text-white/70">
              © 2025 KSHW München. Alle Rechte vorbehalten.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
