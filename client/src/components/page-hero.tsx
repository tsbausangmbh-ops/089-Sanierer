import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Shield, ChevronRight, Phone } from "lucide-react";
import defaultHeroImage from "@assets/generated_images/modern_renovated_home_interior.webp";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  badge?: string;
  showCta?: boolean;
  showStats?: boolean;
  compact?: boolean;
  image?: string;
  imageAlt?: string;
}

const stats = [
  { value: "268+", label: "Abgeschlossene Projekte" },
  { value: "20+", label: "Jahre Erfahrung" },
  { value: "98%", label: "Zufriedene Kunden" },
];

export function PageHero({ 
  title, 
  subtitle, 
  description, 
  badge = "Im Partnernetzwerk",
  showCta = true,
  showStats = false,
  compact = true,
  image,
  imageAlt
}: PageHeroProps) {
  const minHeight = compact ? "min-h-[40vh] lg:min-h-[35vh]" : "min-h-[85vh] lg:min-h-[75vh]";
  const padding = compact ? "py-8 lg:py-12" : "py-12 lg:py-20";

  return (
    <section className={`relative pt-16 ${minHeight} flex items-center`}>
      <div className="absolute inset-0 pt-16">
        <img 
          src={image || defaultHeroImage} 
          alt={imageAlt || "Haussanierung Vorher-Nachher"}
          className="w-full h-full object-cover"
          loading="eager"
          decoding="async"
          // @ts-ignore - fetchpriority is valid HTML attribute
          fetchpriority="high"
          width={1200}
          height={655}
          aria-label={imageAlt || "Haussanierung Vorher-Nachher"}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/40 lg:to-black/20" />
      </div>
      
      <div className={`relative z-10 max-w-7xl mx-auto px-4 lg:px-8 ${padding} w-full`}>
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-4 border border-white/20">
            <Shield className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium text-white">{badge}</span>
          </div>
          
          <h1 className={`${compact ? 'text-3xl lg:text-5xl' : 'text-4xl lg:text-6xl'} font-bold mb-4 leading-tight text-white`}>
            {title}
            {subtitle && (
              <span className={`block ${compact ? 'text-xl lg:text-2xl' : 'text-2xl lg:text-3xl'} font-normal mt-2 text-white/90`}>
                {subtitle}
              </span>
            )}
          </h1>
          
          {description && (
            <p className="text-lg lg:text-xl text-white/85 mb-6 leading-relaxed">
              {description}
            </p>
          )}
          
          {showCta && (
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-6">
              <Link href="/anfrage">
                <Button size="lg" className="text-lg w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white border-orange-500 shadow-lg" data-testid="button-hero-cta">
                  Kostenlos anfragen
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <a href="tel:+498944438872">
                <Button size="lg" variant="outline" className="text-lg w-full sm:w-auto bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20">
                  <Phone className="w-5 h-5 mr-2" />
                  089 444438872
                </Button>
              </a>
            </div>
          )}
          
          {showStats && (
            <div className="grid grid-cols-3 gap-4 lg:gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <p className="text-2xl lg:text-3xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs lg:text-sm text-white/70">{stat.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background to-transparent h-12 lg:h-16" />
    </section>
  );
}
