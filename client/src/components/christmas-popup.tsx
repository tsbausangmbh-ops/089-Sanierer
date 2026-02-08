import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
const christmasBackground = "/images/weihnachtsbeleuchtung_hintergrund.webp";

const COOKIE_NAME = "kshw_christmas_popup_shown";
const COOKIE_CONSENT_KEY = "kshw_cookie_consent";

function isChristmasSeason(): boolean {
  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();

  // Zeigt vom 16.12 bis 26.12 (00:01 - 23:59)
  return month === 12 && day >= 16 && day <= 26;
}

function hasMarketingConsent(): boolean {
  const savedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
  if (!savedConsent) {
    return false;
  }
  try {
    const parsed = JSON.parse(savedConsent);
    return parsed.marketing === true;
  } catch {
    return false;
  }
}

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}

function setCookie(name: string, value: string, days: number): void {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
}

function hasSeenPopup(): boolean {
  const year = new Date().getFullYear();
  const cookieValue = getCookie(COOKIE_NAME);
  const localValue = localStorage.getItem(COOKIE_NAME);
  return cookieValue === String(year) || localValue === String(year);
}

function markPopupAsSeen(): void {
  const year = new Date().getFullYear();
  setCookie(COOKIE_NAME, String(year), 30);
  localStorage.setItem(COOKIE_NAME, String(year));
}

export default function ChristmasPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [nextYear, setNextYear] = useState(new Date().getFullYear() + 1);

  useEffect(() => {
    if (!isChristmasSeason()) {
      return;
    }

    if (hasSeenPopup()) {
      return;
    }

    // Warte bis Cookie-Banner geschlossen wurde und Marketing-Cookies akzeptiert wurden
    const checkInterval = setInterval(() => {
      if (hasMarketingConsent()) {
        clearInterval(checkInterval);
        
        const year = new Date().getFullYear();
        setCurrentYear(year);
        setNextYear(year + 1);

        setTimeout(() => {
          setIsVisible(true);
        }, 2000);
      }
    }, 500);

    return () => clearInterval(checkInterval);
  }, []);

  const handleClose = () => {
    markPopupAsSeen();
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
        className={`relative max-w-4xl w-full mx-4 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 ${
          isClosing ? "scale-95" : "scale-100"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <img 
          src={christmasBackground} 
          alt="Weihnachtsaktion 089-Sanierer München - Sanierung mit Festpreisgarantie" 
          className="w-full h-auto"
          loading="lazy"
          decoding="async"
          width={1200}
          height={655}
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/50 to-transparent" />
        
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <p 
            className="text-7xl md:text-[10rem] font-bold text-white/15 whitespace-nowrap select-none"
            style={{ transform: "rotate(-15deg)" }}
          >
            089-Sanierer
          </p>
        </div>
        
        <button
          type="button"
          className="absolute z-50 text-white bg-black/30 rounded-full p-2"
          style={{ top: "12px", right: "12px", left: "auto" }}
          onClick={handleClose}
          data-testid="button-close-christmas"
        >
          <X className="w-8 h-8" />
        </button>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-center text-white">
          <h3 className="text-xl md:text-3xl font-bold mb-4 text-amber-200">
            Frohe Weihnachten und ein gesundes und glückliches Jahr {nextYear}
          </h3>
          <p className="text-base md:text-lg font-medium mb-3">
            Liebe Kunden und Kundinnen,
          </p>
          <p className="text-sm md:text-base mb-2 text-white/90">
            Wir sagen Danke für die gute Zusammenarbeit und das Vertrauen, das Sie uns {currentYear} entgegengebracht haben.
          </p>
          <p className="text-sm md:text-base mb-2 text-white/90">
            In dieser besinnlichen Zeit wünschen wir Ihnen und Ihrer Familie erholsame Feiertage.
          </p>
          <p className="text-sm md:text-base mb-2 text-white/90">
            Genießen Sie die Zeit mit Ihren Liebsten und tanken Sie neue Energie für das kommende Jahr.
          </p>
          <p className="text-sm md:text-base text-white/90">
            Wir freuen uns, auch {nextYear} als Ihr zuverlässiger Partner für alle Sanierungsprojekte an Ihrer Seite zu stehen.
          </p>
          <p className="text-base md:text-lg mt-4 font-semibold text-amber-300">
            Ihr Team von 089-Sanierer
          </p>
        </div>
      </div>
    </div>
  );
}
