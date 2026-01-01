import { Switch, Route, useLocation } from "wouter";
import { useEffect, lazy, Suspense } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/lib/protected-route";
import { CookieConsent } from "@/components/cookie-consent";
import ChristmasPopup from "@/components/christmas-popup";
import NewYearPopup from "@/components/newyear-popup";
import { Loader2 } from "lucide-react";

import Home from "@/pages/home";

const Funnel = lazy(() => import("@/pages/funnel"));
const Confirmation = lazy(() => import("@/pages/confirmation"));
const Admin = lazy(() => import("@/pages/admin"));
const AdminLogin = lazy(() => import("@/pages/admin-login"));
const Impressum = lazy(() => import("@/pages/impressum"));
const Datenschutz = lazy(() => import("@/pages/datenschutz"));
const AGB = lazy(() => import("@/pages/agb"));
const Kontakt = lazy(() => import("@/pages/kontakt"));
const Ratgeber = lazy(() => import("@/pages/ratgeber"));
const GewerkeFunnel = lazy(() => import("@/pages/gewerke-funnel"));
const FaqPreise = lazy(() => import("@/pages/faq-preise"));
const Cookies = lazy(() => import("@/pages/cookies"));
const Termin = lazy(() => import("@/pages/termin"));
const NotFound = lazy(() => import("@/pages/not-found"));

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
    </div>
  );
}

function usePageTracking() {
  const [location] = useLocation();
  
  useEffect(() => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', { page_path: location });
    }
  }, [location]);
}

function Router() {
  usePageTracking();
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/anfrage" component={Funnel} />
        <Route path="/bestaetigung" component={Confirmation} />
        <Route path="/admin-login" component={AdminLogin} />
        <ProtectedRoute path="/admin" component={Admin} />
        <Route path="/impressum" component={Impressum} />
        <Route path="/datenschutz" component={Datenschutz} />
        <Route path="/agb" component={AGB} />
        <Route path="/kontakt" component={Kontakt} />
        <Route path="/ratgeber" component={Ratgeber} />
        <Route path="/gewerke" component={GewerkeFunnel} />
        <Route path="/faq-preise" component={FaqPreise} />
        <Route path="/cookies" component={Cookies} />
        <Route path="/termin" component={Termin} />
        <Route path="/danke" component={Confirmation} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Router />
          <Toaster />
          <CookieConsent />
          <ChristmasPopup />
          <NewYearPopup />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
