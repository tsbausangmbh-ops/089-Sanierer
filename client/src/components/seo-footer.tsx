import { Link } from "wouter";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import kshwLogoWhiteBg from "@assets/favicon-192-whitebg_1765228119332.png";

const allServices = [
  { id: "komplettsanierung", title: "Komplettsanierung München", shortTitle: "Komplettsanierung" },
  { id: "badsanierung", title: "Badsanierung München", shortTitle: "Badsanierung" },
  { id: "kuechensanierung", title: "Küchensanierung München", shortTitle: "Küchensanierung" },
  { id: "bodensanierung", title: "Bodensanierung München", shortTitle: "Bodensanierung" },
  { id: "elektrosanierung", title: "Elektrosanierung München", shortTitle: "Elektrosanierung" },
  { id: "heizungssanierung", title: "Heizungssanierung München", shortTitle: "Heizungssanierung" },
  { id: "dachsanierung", title: "Dachsanierung München", shortTitle: "Dachsanierung" },
  { id: "energetische-sanierung", title: "Energetische Sanierung München", shortTitle: "Energetische Sanierung" },
];

const informationLinks = [
  { href: "/faq-preise", title: "FAQ & Preise", description: "Sanierungskosten München" },
  { href: "/ratgeber", title: "Ratgeber", description: "Tipps zur Sanierung" },
  { href: "/gewerke", title: "Handwerker-Vermittlung", description: "Einzelgewerke München" },
  { href: "/kontakt", title: "Kontakt", description: "Beratung München" },
];

const legalLinks = [
  { href: "/impressum", title: "Impressum" },
  { href: "/datenschutz", title: "Datenschutz" },
  { href: "/agb", title: "AGB" },
  { href: "/cookies", title: "Cookie-Richtlinie" },
];

const muenchnerStadtteile = [
  "Pasing", "Allach", "Untermenzing", "Obermenzing", "Aubing", "Moosach", 
  "Feldmoching", "Schwabing", "Sendling", "Bogenhausen", "Haidhausen", 
  "Neuhausen", "Laim", "Nymphenburg", "Giesing", "Berg am Laim", "Trudering", 
  "Riem", "Milbertshofen", "Freimann", "Solln", "Großhadern", "Hadern", 
  "Fürstenried", "Forstenried", "Thalkirchen", "Obersendling", "Ramersdorf", 
  "Perlach", "Neuperlach"
];

const muenchnerUmland = [
  "Dachau", "Karlsfeld", "Germering", "Fürstenfeldbruck", "Freising", 
  "Starnberg", "Garching", "Unterschleißheim", "Oberschleißheim", "Ottobrunn", 
  "Haar", "Gräfelfing", "Planegg", "Pullach", "Grünwald"
];

export function SeoFooter() {
  return (
    <footer className="pt-12 pb-6 bg-[hsl(220,80%,10%)] text-white" role="contentinfo" itemScope itemType="https://schema.org/WPFooter">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-1">
            <Link href="/" aria-label="KSHW München Startseite">
              <div className="flex items-center gap-2 mb-4 cursor-pointer" data-testid="link-footer-logo">
                <img 
                  src={kshwLogoWhiteBg} 
                  alt="KSHW München Logo" 
                  className="h-10 w-auto rounded"
                  width="40"
                  height="40"
                  loading="lazy"
                />
                <div className="flex flex-col">
                  <span className="font-bold text-base leading-tight">KSHW München</span>
                  <span className="text-xs text-white/70 leading-tight">Komplettsanierungen</span>
                </div>
              </div>
            </Link>
            <p className="text-white/70 text-sm mb-4">
              Ihr zuverlässiger Partner für <strong>Komplettsanierungen in München</strong> und Umgebung. 268+ Projekte, 5 Jahre Gewährleistung.
            </p>
            <div className="space-y-2 text-sm text-white/70" itemScope itemType="https://schema.org/LocalBusiness">
              <meta itemProp="name" content="KSHW München - Komplettsanierungen Haus & Wohnung" />
              <a href="tel:+4915212274043" className="flex items-center gap-2 hover:text-white" itemProp="telephone" data-testid="link-footer-phone">
                <Phone className="w-4 h-4" aria-hidden="true" />
                0152 122 740 43
              </a>
              <a href="mailto:info@komplettsanierungen-haus-wohnung.de" className="flex items-center gap-2 hover:text-white" itemProp="email" data-testid="link-footer-email">
                <Mail className="w-4 h-4" aria-hidden="true" />
                info@komplettsanierungen-haus-wohnung.de
              </a>
              <div className="flex items-start gap-2" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <span>
                  <span itemProp="streetAddress">Zielstattstr. 9</span><br />
                  <span itemProp="postalCode">81379</span> <span itemProp="addressLocality">München</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" aria-hidden="true" />
                <span>Mo-Fr: 8:00-17:00 Uhr</span>
              </div>
            </div>
          </div>

          <nav className="lg:col-span-1" aria-label="Sanierungsleistungen">
            <h4 className="font-bold mb-4">Sanierung München</h4>
            <ul className="space-y-2 text-sm text-white/70">
              {allServices.slice(0, 4).map((service) => (
                <li key={service.id}>
                  <Link 
                    href={`/anfrage?service=${service.id}`} 
                    className="hover:text-white"
                    title={service.title}
                    data-testid={`link-footer-service-${service.id}`}
                  >
                    {service.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="lg:col-span-1" aria-label="Weitere Leistungen">
            <h4 className="font-bold mb-4">Weitere Leistungen</h4>
            <ul className="space-y-2 text-sm text-white/70">
              {allServices.slice(4).map((service) => (
                <li key={service.id}>
                  <Link 
                    href={`/anfrage?service=${service.id}`} 
                    className="hover:text-white"
                    title={service.title}
                    data-testid={`link-footer-service-${service.id}`}
                  >
                    {service.shortTitle}
                  </Link>
                </li>
              ))}
              <li>
                <Link 
                  href="/gewerke" 
                  className="hover:text-white font-medium"
                  title="Handwerker München vermitteln"
                  data-testid="link-footer-gewerke"
                >
                  Handwerker-Vermittlung
                </Link>
              </li>
            </ul>
          </nav>

          <nav className="lg:col-span-1" aria-label="Informationen">
            <h4 className="font-bold mb-4">Informationen</h4>
            <ul className="space-y-2 text-sm text-white/70">
              {informationLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="hover:text-white"
                    title={link.description}
                    data-testid={`link-footer-info-${link.href.slice(1)}`}
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link 
                  href="/anfrage" 
                  className="hover:text-white font-medium text-orange-400"
                  title="Kostenlose Sanierungsanfrage München"
                  data-testid="link-footer-anfrage"
                >
                  Kostenlose Anfrage
                </Link>
              </li>
            </ul>
          </nav>

          <nav className="lg:col-span-1" aria-label="Rechtliches">
            <h4 className="font-bold mb-4">Rechtliches</h4>
            <ul className="space-y-2 text-sm text-white/70">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="hover:text-white"
                    data-testid={`link-footer-legal-${link.href.slice(1)}`}
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-8 pt-6 border-t border-white/20">
          <h4 className="font-bold mb-2 text-sm">Sanierung in München – Wir sind vor Ort in allen Stadtteilen</h4>
          <p className="text-xs text-white/60 mb-2">
            <strong>München:</strong> {muenchnerStadtteile.join(" · ")}
          </p>
          <p className="text-xs text-white/60">
            <strong>Münchner Umland:</strong> {muenchnerUmland.join(" · ")}
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-white/20">
          <p className="text-xs text-white/50 mb-2">
            <strong>KI-Hinweis gem. Art. 50 Verordnung (EU) 2024/1689:</strong> KSHW München setzt zur Unterstützung der Geschäftsprozesse KI-basierte Systeme ein. Diese werden u.a. bei der Angebotserstellung, Kommunikation und Dokumentenverarbeitung genutzt. Alle endgültigen Entscheidungen werden von qualifizierten Mitarbeitern getroffen und verantwortet.
          </p>
        </div>

        <div className="mt-4 pt-4 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/70">
          <p>
            &copy; {new Date().getFullYear()} <a href="https://extrucon.de" target="_blank" rel="noopener noreferrer" className="hover:text-white underline">ExtruCon GmbH</a> - Alle Rechte vorbehalten.
          </p>
          <nav aria-label="Schnelllinks" className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/" className="hover:text-white" data-testid="link-footer-home">Startseite</Link>
            <Link href="/anfrage" className="hover:text-white" data-testid="link-footer-anfrage-bottom">Anfrage</Link>
            <Link href="/faq-preise" className="hover:text-white" data-testid="link-footer-faq-bottom">FAQ</Link>
            <Link href="/kontakt" className="hover:text-white" data-testid="link-footer-kontakt-bottom">Kontakt</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
