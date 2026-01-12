import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import fireworksBackground from "@assets/generated_images/new_year_fireworks_celebration.png";

const COOKIE_NAME = "kshw_newyear_popup_shown";
const COOKIE_CONSENT_KEY = "kshw_cookie_consent";

function isNewYearDay(): boolean {
  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();

  // Zeigt am 01.01 (00:01 - 23:59)
  return month === 1 && day === 1;
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

export default function NewYearPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [lastYear, setLastYear] = useState(new Date().getFullYear() - 1);

  useEffect(() => {
    if (!isNewYearDay()) {
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
        setLastYear(year - 1);

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
      data-testid="newyear-popup-overlay"
    >
      <div 
        className={`relative max-w-4xl w-full mx-4 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 ${
          isClosing ? "scale-95" : "scale-100"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="absolute z-50 text-white bg-black/30 rounded-full p-2"
          style={{ top: "12px", right: "12px", left: "auto" }}
          onClick={handleClose}
          data-testid="button-close-newyear"
        >
          <X className="w-8 h-8" />
        </button>
        <img 
          src={fireworksBackground} 
          alt="Neujahrsgrüße" 
          className="w-full h-auto"
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
        
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-center text-white">
          <h3 className="text-xl md:text-3xl font-bold mb-4 text-amber-200">
            Frohes neues Jahr {currentYear}!
          </h3>
          <p className="text-base md:text-lg font-medium mb-3">
            Liebe Kunden und Kundinnen,
          </p>
          <p className="text-sm md:text-base mb-2 text-white/90">
            Herzlichen Dank für Ihr Vertrauen und die tolle Zusammenarbeit in {lastYear}!
          </p>
          <p className="text-sm md:text-base mb-2 text-white/90">
            Ihre Zufriedenheit ist unser größter Antrieb und motiviert uns jeden Tag aufs Neue.
          </p>
          <p className="text-sm md:text-base mb-2 text-white/90">
            Auch {currentYear} stehen wir Ihnen als zuverlässiger Partner für alle Sanierungsprojekte zur Seite - von der Komplettsanierung bis zur Badsanierung.
          </p>
          <p className="text-sm md:text-base mb-2 text-white/90">
            Wir wünschen Ihnen und Ihrer Familie Gesundheit, Erfolg, Glück und ein wundervolles neues Jahr!
          </p>
          <p className="text-sm md:text-base text-white/90">
            Auf eine weiterhin erfolgreiche Partnerschaft!
          </p>
          <p className="text-base md:text-lg mt-4 font-semibold text-amber-300">
            Ihr Team von 089-Sanierer
          </p>
        </div>
      </div>
    </div>
  );
}
