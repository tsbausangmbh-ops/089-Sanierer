import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
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

const services = [
  { id: "komplettsanierung", title: "Komplettsanierung", icon: HomeIcon },
  { id: "badsanierung", title: "Badsanierung", icon: Bath },
  { id: "kuechensanierung", title: "Küchensanierung", icon: UtensilsCrossed },
  { id: "bodensanierung", title: "Bodensanierung", icon: Layers },
  { id: "elektrosanierung", title: "Elektrosanierung", icon: Zap },
  { id: "heizungssanierung", title: "Heizungssanierung", icon: Flame },
  { id: "energetisch", title: "Energetische Sanierung", icon: Flame },
  { id: "dachsanierung", title: "Dachsanierung", icon: HomeIcon },
];

const reviews = [
  { name: "Michael S.", text: "Hervorragende Arbeit! Das Team war pünktlich, professionell und das Ergebnis übertrifft unsere Erwartungen.", rating: 5 },
  { name: "Sandra K.", text: "Unsere Badsanierung wurde termingerecht und im Budget abgeschlossen. Sehr zufrieden!", rating: 5 },
  { name: "Thomas M.", text: "Kompetente Beratung und saubere Ausführung. Kann ich nur weiterempfehlen.", rating: 5 },
  { name: "Anna B.", text: "Super Service von der ersten Anfrage bis zur Fertigstellung. Top Qualität!", rating: 5 },
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
  { value: "500+", label: "Abgeschlossene Projekte" },
  { value: "20+", label: "Jahre Erfahrung" },
  { value: "98%", label: "Zufriedene Kunden" },
];

const faqs = [
  {
    question: "Was kostet eine Komplettsanierung?",
    answer: "Die Kosten hängen vom Umfang der Arbeiten, der Größe der Immobilie und den gewählten Materialien ab. Eine einfache Renovierung beginnt bei wenigen tausend Euro, während eine Komplettsanierung fünf- bis sechsstellige Beträge erreichen kann. Nutzen Sie unser Anfrageformular für eine individuelle Kostenschätzung.",
  },
  {
    question: "Wie lange dauert eine Sanierung?",
    answer: "Die Dauer hängt von der Größe und dem Umfang ab. Eine Badsanierung dauert typischerweise 2-3 Wochen, während eine Komplettsanierung mehrere Monate in Anspruch nehmen kann. Wir erstellen Ihnen einen detaillierten Zeitplan.",
  },
  {
    question: "Welche Sanierungsmaßnahmen steigern den Immobilienwert?",
    answer: "Energetische Maßnahmen wie Dämmung, neue Fenster oder Heizungsmodernisierung erhöhen den Wert deutlich. Auch ein neues Badezimmer oder hochwertige Böden machen die Immobilie attraktiver.",
  },
  {
    question: "Muss ich während der Sanierung ausziehen?",
    answer: "Das hängt vom Umfang ab. Bei einer Badsanierung ist ein Weiterwohnen meist möglich. Bei einer Komplettsanierung empfehlen wir einen vorübergehenden Auszug für mehr Komfort und schnellere Fertigstellung.",
  },
  {
    question: "Bieten Sie eine Garantie auf die Arbeiten?",
    answer: "Ja, alle unsere Arbeiten werden mit einer Gewährleistung von mindestens 2 Jahren durchgeführt. Bei vielen Materialien gelten zusätzlich Herstellergarantien.",
  },
  {
    question: "Wie finde ich heraus, ob meine Immobilie sanierungsbedürftig ist?",
    answer: "Typische Anzeichen sind veraltete Elektrik, undichte Fenster, hohe Heizkosten, Feuchtigkeitsschäden oder ein in die Jahre gekommenes Bad. Wir beraten Sie gerne kostenlos.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-black border-b">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="h-16 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Building2 className="w-7 h-7 text-primary" />
              <div className="flex flex-col">
                <span className="font-bold text-base leading-tight">Komplettsanierungen</span>
                <span className="text-xs text-muted-foreground leading-tight">Haus & Wohnung</span>
              </div>
            </div>
            <div className="hidden lg:flex items-center gap-1">
              {services.map((service) => (
                <Link key={service.id} href={`/anfrage?service=${service.id}`}>
                  <Button variant="ghost" size="sm" className="text-sm">
                    {service.title}
                  </Button>
                </Link>
              ))}
            </div>
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
          <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12 lg:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-3xl lg:text-5xl font-bold mb-6 leading-tight">
                  Haus oder Wohnung sanieren – <span className="text-primary">Planung & Kosten</span> auf einen Blick
                </h1>
                <p className="text-lg text-muted-foreground mb-8">
                  Sie möchten Ihr Bad modernisieren, die Küche erneuern oder eine Komplettsanierung durchführen? Mit unserem Service erhalten Sie schnell eine präzise Kostenschätzung und qualifizierte Handwerker.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Link href="/anfrage">
                    <Button size="lg" className="text-lg w-full sm:w-auto" data-testid="button-hero-cta">
                      Jetzt Anfrage starten
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                  <a href="tel:+4989123456789">
                    <Button size="lg" variant="outline" className="text-lg w-full sm:w-auto">
                      <Phone className="w-5 h-5 mr-2" />
                      089 123 456 789
                    </Button>
                  </a>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white dark:bg-card rounded-lg border">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <div>
                    <p className="font-semibold">Hervorragend bewertet</p>
                    <p className="text-sm text-muted-foreground">Basierend auf 50+ Kundenbewertungen</p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Moderne Küche nach Sanierung"
                  className="rounded-lg shadow-2xl w-full"
                />
                <div className="absolute -bottom-6 -left-6 bg-white dark:bg-card p-4 rounded-lg shadow-lg border hidden lg:block">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-bold text-lg">500+</p>
                      <p className="text-sm text-muted-foreground">Projekte abgeschlossen</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 border-b">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex flex-wrap justify-center gap-6 lg:gap-12">
            {reviews.slice(0, 4).map((review, index) => (
              <div key={index} className="flex items-center gap-3 text-sm">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-muted-foreground">"{review.text.substring(0, 40)}..."</span>
                <span className="font-medium">- {review.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Unsere Leistungen
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Von der Badsanierung bis zur Komplettrenovierung - wir bieten Ihnen professionelle Sanierung aus einer Hand.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {services.map((service) => (
              <Link key={service.id} href={`/anfrage?service=${service.id}`}>
                <Card 
                  className="p-6 text-center cursor-pointer hover-elevate transition-transform hover:-translate-y-1 h-full"
                  data-testid={`card-service-${service.id}`}
                >
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <service.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-sm">{service.title}</h3>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
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

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Warum Komplettsanierungen Haus & Wohnung?
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

      <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
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

      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Häufig gestellte Fragen
            </h2>
            <p className="text-lg text-muted-foreground">
              Hier finden Sie Antworten auf die wichtigsten Fragen zur Haus- und Wohnungssanierung.
            </p>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-semibold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-card">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Bereit für Ihre Sanierung?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Starten Sie jetzt Ihre kostenlose und unverbindliche Anfrage.
          </p>
          <Link href="/anfrage">
            <Button size="lg" className="text-lg px-8" data-testid="button-cta-section">
              Kostenlose Anfrage starten
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      <footer className="py-12 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="w-6 h-6 text-primary" />
                <div className="flex flex-col">
                  <span className="font-bold leading-tight">Komplettsanierungen</span>
                  <span className="text-xs text-white/70 leading-tight">Haus & Wohnung</span>
                </div>
              </div>
              <p className="text-white/70 text-sm">
                Ihr Partner für professionelle Sanierungen in München und Umgebung.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Kontakt</h4>
              <div className="space-y-2 text-sm text-white/70">
                <a href="tel:+4989123456789" className="flex items-center gap-2 hover:text-white">
                  <Phone className="w-4 h-4" />
                  089 123 456 789
                </a>
                <a href="mailto:info@komplettsanierungen-haus-wohnung.de" className="flex items-center gap-2 hover:text-white">
                  <Mail className="w-4 h-4" />
                  info@komplettsanierungen-haus-wohnung.de
                </a>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  München und Umgebung
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">Leistungen</h4>
              <ul className="space-y-2 text-sm text-white/70">
                {services.map((service) => (
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
                <li><a href="#" className="hover:text-white">AGB</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/20 text-center text-sm text-white/70">
            &copy; {new Date().getFullYear()} komplettsanierungen-haus-wohnung.de - Alle Rechte vorbehalten.
          </div>
        </div>
      </footer>
    </div>
  );
}
