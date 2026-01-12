import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Phone, ArrowRight, CheckCircle, BadgeCheck } from "lucide-react";

export interface HeroContent {
  backgroundImage: string;
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
    <section className="relative min-h-[65vh] lg:min-h-[70vh] flex items-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{ backgroundImage: `url(${content.backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-24 pt-16 lg:pt-24 pb-10 lg:pb-16 w-full">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/15 backdrop-blur-md rounded-full text-white text-sm mb-4 border border-white/20">
            <BadgeCheck className="w-4 h-4 text-green-400" />
            <span>{content.badge}</span>
          </div>
          
          <h1 className="text-3xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            {content.titleLine1} <br />
            <span className="text-orange-400">{content.titleLine2}</span>
          </h1>
          
          <div className="text-lg lg:text-xl text-white/90 mb-5 max-w-lg flex flex-col gap-0.5">
            {content.descriptions.map((desc, i) => (
              <span key={i}>{desc}</span>
            ))}
            <strong className="text-white">{content.strongText}</strong>
          </div>

          {content.subText && (
            <p className="text-white/90 text-sm mb-3 font-medium">
              {content.subText}
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-3 mb-5">
            {scrollToElement ? (
              <Button 
                size="lg" 
                onClick={handleCTA}
                className="bg-orange-500 hover:bg-orange-600 text-white h-12 px-6 text-base font-semibold shadow-lg animate-pulse hover:animate-none"
                data-testid={`button-${testIdPrefix}-cta`}
              >
                {content.ctaText}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Link href={content.ctaLink || "/anfrage"}>
                <Button 
                  size="lg" 
                  className="bg-orange-500 hover:bg-orange-600 text-white h-12 px-6 text-base font-semibold shadow-lg animate-pulse hover:animate-none"
                  data-testid={`button-${testIdPrefix}-cta`}
                >
                  {content.ctaText}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            )}
            <a href="tel:+498944438872">
              <Button 
                size="lg" 
                variant="outline" 
                className="h-12 px-6 text-base border-white/40 text-white backdrop-blur-sm"
                data-testid={`button-${testIdPrefix}-phone`}
              >
                <Phone className="w-4 h-4 mr-2" />
                089 - Anrufen
              </Button>
            </a>
          </div>

          <div className="flex flex-col gap-1.5 text-white/90 text-sm">
            {content.checkmarks.map((check, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>{check}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
