import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Phone, ArrowRight, CheckCircle, BadgeCheck } from "lucide-react";

export interface HeroContent {
  backgroundImage: string;
  mobileImageSrc?: string;
  imageAlt?: string;
  badge: string;
  titleLine1: string;
  titleLine2: string;
  descriptions: string[];
  strongText: string;
  subText?: string;
  ctaText: string;
  ctaLink?: string;
  checkmarks: string[];
  dataTestIdPrefix?: string;
}

interface GlobalHeroProps {
  content: HeroContent;
  scrollToElement?: () => void;
}

export function GlobalHero({ content, scrollToElement }: GlobalHeroProps) {
  const handleCTA = () => {
    if (scrollToElement) {
      scrollToElement();
    }
  };

  const testIdPrefix = content.dataTestIdPrefix || "hero";

  return (
    <section className="relative min-h-[65vh] lg:min-h-[70vh] flex items-start lg:items-center overflow-hidden hero-section">
      {/* Optimized background image with eager loading for LCP */}
      <div className="absolute inset-0 bg-slate-800" />
      <picture>
        {content.mobileImageSrc && (
          <source
            media="(max-width: 768px)"
            srcSet={`${content.mobileImageSrc}?v=${Date.now()}`}
            type="image/webp"
          />
        )}
        <img 
          src={`${content.backgroundImage}?v=${Date.now()}`} 
          alt={content.imageAlt || ""}
          loading="eager"
          decoding="async"
          // @ts-ignore - fetchpriority is valid HTML attribute
          fetchpriority="high"
          width={1920}
          height={1048}
          sizes="100vw"
          className="absolute inset-0 w-full h-full object-cover animate-fade-in"
          style={{ objectPosition: 'center' }}
        />
      </picture>
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-24 pt-24 lg:pt-24 pb-10 lg:pb-16 w-full">
        <div className="max-w-2xl text-center sm:text-left mx-auto sm:mx-0">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/15 backdrop-blur-md rounded-full text-white text-xs sm:text-sm mb-3 sm:mb-4 border border-white/20">
            <BadgeCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-400 flex-shrink-0" />
            <span className="line-clamp-1">{content.badge}</span>
          </div>
          
          <h1 className="text-xl sm:text-2xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 leading-tight">
            {content.titleLine1} <br />
            <span className="text-orange-400">{content.titleLine2}</span>
          </h1>
          
          <div className="text-xs sm:text-base lg:text-xl text-white/90 mb-4 sm:mb-5 max-w-lg mx-auto sm:mx-0 flex flex-col gap-0.5">
            {content.descriptions.map((desc, i) => (
              <span key={i}>{desc}</span>
            ))}
            <strong className="text-white">{content.strongText}</strong>
          </div>

          {content.subText && (
            <p className="text-white/90 text-xs sm:text-sm mb-3 font-medium">
              {content.subText}
            </p>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-3 mb-4 sm:mb-5">
            {scrollToElement ? (
              <Button 
                size="lg" 
                onClick={handleCTA}
                className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white min-h-12 px-4 sm:px-6 text-xs sm:text-base font-semibold shadow-lg animate-pulse hover:animate-none whitespace-normal text-center leading-tight"
                data-testid={`button-${testIdPrefix}-cta`}
              >
                <span className="flex-1">{content.ctaText}</span>
                <ArrowRight className="w-4 h-4 ml-1.5 flex-shrink-0" />
              </Button>
            ) : (
              <Link href={content.ctaLink || "/anfrage"} className="w-full sm:w-auto">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white min-h-12 px-4 sm:px-6 text-xs sm:text-base font-semibold shadow-lg animate-pulse hover:animate-none whitespace-normal text-center leading-tight"
                  data-testid={`button-${testIdPrefix}-cta`}
                >
                  <span className="flex-1">{content.ctaText}</span>
                  <ArrowRight className="w-4 h-4 ml-1.5 flex-shrink-0" />
                </Button>
              </Link>
            )}
            <a href="tel:+498944438872" className="w-full sm:w-auto">
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto min-h-12 px-6 text-sm sm:text-base bg-green-600 border-green-600 text-white"
                data-testid={`button-${testIdPrefix}-phone`}
              >
                <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
                089 - Anrufen
              </Button>
            </a>
          </div>

          <div className="flex flex-col gap-1 sm:gap-1.5 text-white/90 text-xs sm:text-sm">
            {content.checkmarks.map((check, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-400 flex-shrink-0" />
                <span>{check}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
