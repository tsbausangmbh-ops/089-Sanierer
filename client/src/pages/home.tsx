import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
  MapPin
} from "lucide-react";

const services = [
  {
    id: "komplettsanierung",
    title: "Komplettsanierung",
    description: "Rundum-Erneuerung Ihrer Immobilie aus einer Hand",
    icon: HomeIcon,
  },
  {
    id: "badsanierung",
    title: "Badsanierung",
    description: "Moderne Badezimmer nach Ihren Wünschen",
    icon: Bath,
  },
  {
    id: "kuechensanierung",
    title: "Küchensanierung",
    description: "Funktionale und stilvolle Küchenräume",
    icon: UtensilsCrossed,
  },
  {
    id: "bodensanierung",
    title: "Bodensanierung",
    description: "Hochwertige Bodenbeläge fachgerecht verlegt",
    icon: Layers,
  },
  {
    id: "elektrosanierung",
    title: "Elektrosanierung",
    description: "Sichere und moderne Elektroinstallationen",
    icon: Zap,
  },
  {
    id: "heizungssanierung",
    title: "Heizungssanierung",
    description: "Effiziente Heizungssysteme für Ihr Zuhause",
    icon: Flame,
  },
];

const trustBadges = [
  { icon: Shield, label: "Vollversichert" },
  { icon: Award, label: "Meisterbetrieb" },
  { icon: Clock, label: "Termingerecht" },
  { icon: Users, label: "20+ Jahre Erfahrung" },
];

const processSteps = [
  {
    number: 1,
    title: "Kostenlose Beratung",
    description: "Wir besprechen Ihre Wünsche und erstellen einen individuellen Plan.",
  },
  {
    number: 2,
    title: "Detaillierte Planung",
    description: "Sie erhalten ein transparentes Angebot mit allen Leistungen.",
  },
  {
    number: 3,
    title: "Professionelle Umsetzung",
    description: "Unser Expertenteam realisiert Ihr Projekt termingerecht.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <HomeIcon className="w-6 h-6 text-primary" />
            <span className="font-bold text-lg">KSHW München</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <a href="tel:+4989123456789" className="flex items-center gap-2 hover:text-foreground transition-colors">
              <Phone className="w-4 h-4" />
              089 123 456 789
            </a>
          </div>
          <Link href="/anfrage">
            <Button data-testid="button-header-cta">
              Kostenlose Anfrage
            </Button>
          </Link>
        </div>
      </header>

      <section className="relative min-h-[75vh] flex items-center justify-center pt-16">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
          }}
        />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            Komplettsanierung in München
          </h1>
          <p className="text-xl lg:text-2xl text-white/90 mb-8">
            Vom Bad bis zur Heizung - Alles aus Meisterhand
          </p>
          <Link href="/anfrage">
            <Button size="lg" className="text-lg px-8" data-testid="button-hero-cta">
              Jetzt kostenlos anfragen
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <div className="mt-12 flex flex-wrap justify-center gap-6 text-white/80 text-sm">
            {trustBadges.map((badge) => (
              <div key={badge.label} className="flex items-center gap-2">
                <badge.icon className="w-5 h-5" />
                <span>{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Unsere Leistungen
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Von der Badsanierung bis zur Komplettrenovierung - wir bieten Ihnen alle Gewerke aus einer Hand.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link key={service.id} href={`/anfrage?service=${service.id}`}>
                <Card 
                  className="p-6 lg:p-8 cursor-pointer hover-elevate active-elevate-2 transition-transform hover:-translate-y-1"
                  data-testid={`card-service-${service.id}`}
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
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
              Ihr Weg zur Traumrenovierung
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              In drei einfachen Schritten zu Ihrem perfekten Zuhause
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {processSteps.map((step) => (
              <div key={step.number} className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground text-2xl font-bold flex items-center justify-center mx-auto mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Bereit für Ihre Renovierung?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Fordern Sie jetzt Ihr kostenloses und unverbindliches Angebot an.
          </p>
          <Link href="/anfrage">
            <Button 
              size="lg" 
              variant="secondary" 
              className="text-lg px-8"
              data-testid="button-cta-section"
            >
              Kostenlose Anfrage starten
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      <footer className="py-12 bg-card border-t">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <HomeIcon className="w-6 h-6 text-primary" />
                <span className="font-bold text-lg">KSHW München</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Ihr Partner für Komplettsanierungen in München und Umgebung.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Kontakt</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <a href="tel:+4989123456789" className="flex items-center gap-2 hover:text-foreground">
                  <Phone className="w-4 h-4" />
                  089 123 456 789
                </a>
                <a href="mailto:info@kshw-muenchen.de" className="flex items-center gap-2 hover:text-foreground">
                  <Mail className="w-4 h-4" />
                  info@kshw-muenchen.de
                </a>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  München und Umgebung
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">Leistungen</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {services.slice(0, 4).map((service) => (
                  <li key={service.id}>
                    <Link href={`/anfrage?service=${service.id}`} className="hover:text-foreground">
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} KSHW München. Alle Rechte vorbehalten.
          </div>
        </div>
      </footer>
    </div>
  );
}
