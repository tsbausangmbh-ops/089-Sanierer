import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import christmasBackground from "@assets/generated_images/festive_christmas_background_lights.png";

function isChristmasSeason(): boolean {
  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();

  return month === 12 && day >= 16 && day <= 26;
}

export default function ChristmasPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (!isChristmasSeason()) {
      return;
    }

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-all duration-300 ${
        isClosing ? "opacity-0" : "opacity-100"
      }`}
      onClick={handleClose}
      data-testid="christmas-popup-overlay"
    >
      <div 
        className={`relative max-w-4xl w-full mx-4 rounded-lg overflow-hidden shadow-2xl transition-all duration-300 ${
          isClosing ? "scale-95" : "scale-100"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <img 
          src={christmasBackground} 
          alt="Weihnachtsgrüße" 
          className="w-full h-auto"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/90 via-emerald-900/50 to-transparent" />
        
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <p 
            className="text-7xl md:text-[10rem] font-bold text-white/15 whitespace-nowrap select-none"
            style={{ transform: "rotate(-15deg)" }}
          >
            089Dach GmbH
          </p>
        </div>
        
        <Button
          size="lg"
          variant="ghost"
          className="absolute top-4 right-4 text-white p-3"
          onClick={handleClose}
          data-testid="button-close-christmas"
        >
          <X className="w-8 h-8" />
        </Button>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-center text-white">
          <h3 className="text-xl md:text-3xl font-bold mb-4 text-amber-200">
            Frohe Weihnachten und ein gesundes und glückliches Jahr 2026
          </h3>
          <p className="text-base md:text-lg font-medium mb-3">
            Liebe Kunden und Kundinnen,
          </p>
          <p className="text-sm md:text-base mb-2 text-white/90">
            Wir sagen Danke für die gute Zusammenarbeit und das Vertrauen, das Sie uns 2025 entgegengebracht haben.
          </p>
          <p className="text-sm md:text-base text-white/90">
            Wir freuen uns, auch im nächsten Jahr für Sie im Einsatz zu sein.
          </p>
          <p className="text-base md:text-lg mt-4 font-semibold text-amber-300">
            Ihr Team von KSHW München
          </p>
        </div>
      </div>
    </div>
  );
}
