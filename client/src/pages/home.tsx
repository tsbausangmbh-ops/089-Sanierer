import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import bathroomBeforeAfter from "@assets/generated_images/bathroom_before_after_renovation.png";
import { Card } from "@/components/ui/card";
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
  Award,
  Clock,
  Users,
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
  Building2
} from "lucide-react";

const headerServices = [
  { id: "komplettsanierung", title: "Komplettsanierung" },
  { id: "badsanierung", title: "Badsanierung" },
  { id: "kuechensanierung", title: "Küchensanierung" },
  { id: "dachsanierung", title: "Dachsanierung" },
  { id: "energetische-sanierung", title: "Energetische Sanierung" },
];

const allServices = [
  { id: "komplettsanierung", title: "Komplettsanierung", icon: HomeIcon, description: "Rundum-Sanierung Ihrer Immobilie in München – von Grund auf neu gestaltet." },
  { id: "badsanierung", title: "Badsanierung", icon: Bath, description: "Moderne Bäder für München – barrierefrei, zeitgemäß und hochwertig." },
  { id: "kuechensanierung", title: "Küchensanierung", icon: UtensilsCrossed, description: "Traumküchen in München – funktional, modern und individuell geplant." },
  { id: "bodensanierung", title: "Bodensanierung", icon: Layers, description: "Neue Böden für München – Parkett, Fliesen oder Vinyl vom Profi." },
  { id: "elektrosanierung", title: "Elektrosanierung", icon: Zap, description: "Sichere Elektrik in München – Modernisierung nach aktuellen Standards." },
  { id: "heizungssanierung", title: "Heizungssanierung", icon: Flame, description: "Effiziente Heizsysteme für München – Wärmepumpe, Gas oder Fernwärme." },
  { id: "energetische-sanierung", title: "Energetische Sanierung", icon: Flame, description: "Energieeffizient sanieren in München – KfW-Förderung nutzen." },
  { id: "dachsanierung", title: "Dachsanierung", icon: HomeIcon, description: "Professionelle Dacharbeiten in München – Dämmung und Neueindeckung." },
];

const processSteps = [
  {
    number: 1,
    title: "Beschreiben Sie Ihr Vorhaben",
    description: "Füllen Sie unser Formular aus und erhalten Sie eine transparente Kostenschätzung für Ihr Projekt.",
    icon: Calculator,
  },
  {
    number: 2,
    title: "Wir kontaktieren Sie",
    description: "Unser Expertenteam meldet sich bei Ihnen, um die Details zu besprechen und einen Termin zu vereinbaren.",
    icon: MessageSquare,
  },
  {
    number: 3,
    title: "Professionelle Umsetzung",
    description: "Qualifizierte Handwerker renovieren Ihr Zuhause termingerecht und zum vereinbarten Preis.",
    icon: Hammer,
  },
];

const benefits = [
  {
    icon: Clock,
    title: "Schnell und unkompliziert",
    description: "In wenigen Minuten erhalten Sie eine Kostenschätzung. Sparen Sie Wochen der Handwerkersuche.",
  },
  {
    icon: Euro,
    title: "Auf Ihr Budget zugeschnitten",
    description: "Wählen Sie zwischen Budget, Standard oder Premium Ausstattung nach Ihren Wünschen.",
  },
  {
    icon: Shield,
    title: "Geprüfte Handwerker",
    description: "Wir arbeiten nur mit verifizierten Meisterbetrieben zusammen, die höchste Qualität liefern.",
  },
  {
    icon: CheckCircle,
    title: "Kosteneinschätzung vorab",
    description: "Dank unserer Erfahrung aus hunderten Projekten erhalten Sie eine präzise Kostenschätzung.",
  },
];

const stats = [
  { value: "268", label: "Abgeschlossene Projekte" },
  { value: "20+", label: "Jahre Erfahrung" },
  { value: "98%", label: "Zufriedene Kunden" },
];

const faqs = [
  {
    question: "Was kostet eine Komplettsanierung in München?",
    answer: "Die Kosten für eine Sanierung in München hängen vom Umfang der Arbeiten, der Größe der Immobilie und den gewählten Materialien ab. Eine einfache Renovierung in München beginnt bei wenigen tausend Euro, während eine Komplettsanierung fünf- bis sechsstellige Beträge erreichen kann. Nutzen Sie unser Anfrageformular für eine individuelle Kostenschätzung für Ihre Münchner Immobilie.",
  },
  {
    question: "Wie lange dauert eine Sanierung in München?",
    answer: "Die Dauer hängt von der Größe und dem Umfang ab. Eine Badsanierung in München dauert typischerweise 2-3 Wochen, während eine Komplettsanierung mehrere Monate in Anspruch nehmen kann. Wir erstellen Ihnen einen detaillierten Zeitplan für Ihr Projekt in München.",
  },
  {
    question: "Welche Sanierungsmaßnahmen steigern den Immobilienwert in München?",
    answer: "In München sind energetische Maßnahmen wie Dämmung, neue Fenster oder Heizungsmodernisierung besonders wertsteigernd. Auch ein modernes Badezimmer oder hochwertige Böden machen Ihre Münchner Immobilie deutlich attraktiver auf dem lokalen Markt.",
  },
  {
    question: "Muss ich während der Sanierung in München ausziehen?",
    answer: "Das hängt vom Umfang ab. Bei einer Badsanierung in München ist ein Weiterwohnen meist möglich. Bei einer Komplettsanierung empfehlen wir einen vorübergehenden Auszug für mehr Komfort und schnellere Fertigstellung.",
  },
  {
    question: "Bieten Sie eine Garantie auf die Sanierungsarbeiten in München?",
    answer: "Ja, alle unsere Sanierungsarbeiten in München werden mit einer Gewährleistung von mindestens 2 Jahren durchgeführt. Bei vielen Materialien gelten zusätzlich Herstellergarantien.",
  },
  {
    question: "In welchen Stadtteilen und Umland von München sind Sie tätig?",
    answer: "Wir sind in ganz München tätig – Allach, Untermenzing, Pasing, Obermenzing, Aubing, Moosach, Feldmoching und allen anderen Stadtteilen. Auch im Münchner Umland wie Dachau, Karlsfeld, Germering, Fürstenfeldbruck, Freising und Starnberg sind wir für Sie da.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-50 bg-[hsl(220,85%,10%)] text-white border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="h-16 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Building2 className="w-7 h-7 text-white" />
              <div className="flex flex-col">
                <span className="font-bold text-base leading-tight text-white">Komplettsanierungen</span>
                <span className="text-xs text-white/70 leading-tight">Haus & Wohnung</span>
              </div>
            </div>
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
            <Link href="/anfrage">
              <Button data-testid="button-header-cta">
                Kostenlose Anfrage
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <section className="relative pt-16">
        <div className="bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10 lg:py-14">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
              <div className="flex flex-col justify-center">
                <h1 className="text-3xl lg:text-5xl font-bold mb-6 leading-tight">
                  Sanierungsprobleme in München? <span className="text-primary">Wir lösen sie.</span>
                </h1>
                <p className="text-lg text-muted-foreground mb-8">
                  Altes Bad? Kaputte Heizung? Schimmel an der Wand? Wir beheben jedes Sanierungsproblem in München – schnell, sauber und zu fairen Festpreisen.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/anfrage">
                    <Button size="lg" className="text-lg w-full sm:w-auto" data-testid="button-hero-cta">
                      Problem schildern
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
              <div className="relative flex items-stretch">
                <img 
                  src={bathroomBeforeAfter} 
                  alt="Badezimmer Vorher-Nachher: Links alt und veraltet, rechts modern saniert"
                  className="rounded-lg shadow-2xl w-full h-full object-cover"
                  data-testid="img-hero-bathroom"
                />
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
                  <p className="text-sm text-muted-foreground">Basierend auf 50+ Kundenbewertungen</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-5 bg-white dark:bg-card rounded-lg border">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-bold text-xl">268</p>
                  <p className="text-sm text-muted-foreground">Projekte erfolgreich abgeschlossen</p>
                </div>
              </div>
            </div>
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
              Welches Problem haben Sie?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Sagen Sie uns, was Sie stört – wir kümmern uns um alles. Kein Handwerker-Chaos, keine Überraschungen.
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
              Und so funktioniert es
            </h2>
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
          <div className="text-center mt-12">
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
              Warum KSHW München für Ihre Sanierung?
            </h2>
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

      <section className="py-10 lg:py-14 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Unsere Erfolge sind Ihre Vorteile
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
              Häufig gestellte Fragen zur Sanierung in München
            </h2>
            <p className="text-lg text-muted-foreground">
              Hier finden Sie Antworten auf die wichtigsten Fragen zur Haus- und Wohnungssanierung in München.
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
            Starten Sie jetzt Ihre kostenlose und unverbindliche Anfrage für München und Umgebung.
          </p>
          <Link href="/anfrage">
            <Button size="lg" className="text-lg px-8" data-testid="button-cta-section">
              Kostenlose Anfrage starten
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      <section className="py-10 lg:py-14">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-bold mb-6 text-center">
            Sanierung München: Komplettsanierung, Badsanierung & Handwerker
          </h2>
          
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
            <p>
              <strong>KSHW München</strong> – Ihr Partner für <strong>Komplettsanierungen in München</strong>. Badsanierung, Küchensanierung, Haussanierung, Dachsanierung und energetische Sanierung aus einer Hand. Kostenlose Beratung, faire Festpreise, Termingarantie.
            </p>

            <div className="grid md:grid-cols-2 gap-4 my-6">
              <div className="bg-muted/30 p-4 rounded-md">
                <h3 className="text-lg font-bold text-foreground mb-2">Unsere Leistungen</h3>
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
                <h3 className="text-lg font-bold text-foreground mb-2">Ihre Vorteile</h3>
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

            <p className="text-sm">
              Wir sanieren in <strong>München</strong> und Umgebung: Pasing, Allach, Schwabing, Sendling, Bogenhausen, Haidhausen, Giesing, Trudering, Neuhausen, Laim, Nymphenburg, Moosach, Feldmoching, Solln, Hadern, Perlach. Auch im Umland: Dachau, Karlsfeld, Germering, Fürstenfeldbruck, Freising, Starnberg, Garching, Unterschleißheim, Ottobrunn, Grünwald.
            </p>
          </div>

          <div className="text-center mt-8">
            <Link href="/anfrage">
              <Button size="lg" className="text-lg" data-testid="button-content-cta">
                Kostenlose Anfrage starten
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <p className="text-sm text-muted-foreground mt-3">
              Antwort innerhalb von 24 Stunden
            </p>
          </div>
        </div>
      </section>

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
          <div className="mt-8 pt-6 border-t border-white/20">
            <h4 className="font-bold mb-3 text-center">Wir sind für Sie da in München und Umgebung</h4>
            <p className="text-sm text-white/70 text-center leading-relaxed">
              München Pasing · Allach · Untermenzing · Obermenzing · Aubing · Moosach · Feldmoching · Schwabing · Sendling · Bogenhausen · Haidhausen · Neuhausen · Laim · Nymphenburg · Giesing · Berg am Laim · Trudering · Riem · Milbertshofen · Freimann · Solln · Großhadern · Hadern · Fürstenried · Forstenried · Thalkirchen · Obersendling · Ramersdorf · Perlach · Neuperlach
            </p>
            <p className="text-sm text-white/70 text-center mt-2 leading-relaxed">
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
