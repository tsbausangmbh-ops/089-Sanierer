import { CheckCircle } from "lucide-react";

interface ServiceIntroProps {
  headline: string;
  paragraphs: string[];
  benefits: string[];
}

export function ServiceIntro({ headline, paragraphs, benefits }: ServiceIntroProps) {
  return (
    <section className="py-6 lg:py-10 bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold mb-4">
          {headline}
        </h2>
        {paragraphs.map((text, i) => (
          <p key={i} className="text-sm sm:text-base text-muted-foreground mb-4">
            {text}
          </p>
        ))}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
          {benefits.map((benefit, i) => (
            <div key={i} className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
              <span className="text-sm font-medium">{benefit}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
