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
const Kosten = lazy(() => import("@/pages/kosten"));
const Badsanierung = lazy(() => import("@/pages/badsanierung"));
const Wohnungssanierung = lazy(() => import("@/pages/wohnungssanierung"));
const Haussanierung = lazy(() => import("@/pages/haussanierung"));
const Kernsanierung = lazy(() => import("@/pages/kernsanierung"));
const StadtteilPage = lazy(() => import("@/pages/stadtteil"));
const Rechner = lazy(() => import("@/pages/rechner"));
const NotFound = lazy(() => import("@/pages/404"));

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

function ScrollToTop() {
  const [location] = useLocation();
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location]);
  
  return null;
}

function Router() {
  usePageTracking();
  return (
    <>
      <ScrollToTop />
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
        <Route path="/kosten" component={Kosten} />
        <Route path="/badsanierung" component={Badsanierung} />
        <Route path="/wohnungssanierung" component={Wohnungssanierung} />
        <Route path="/haussanierung" component={Haussanierung} />
        <Route path="/kernsanierung" component={Kernsanierung} />
        <Route path="/rechner" component={Rechner} />
        {/* München Stadtteile */}
        <Route path="/muenchen-schwabing" component={StadtteilPage} />
        <Route path="/muenchen-bogenhausen" component={StadtteilPage} />
        <Route path="/muenchen-maxvorstadt" component={StadtteilPage} />
        <Route path="/muenchen-haidhausen" component={StadtteilPage} />
        <Route path="/muenchen-sendling" component={StadtteilPage} />
        <Route path="/muenchen-neuhausen" component={StadtteilPage} />
        <Route path="/muenchen-pasing" component={StadtteilPage} />
        <Route path="/muenchen-giesing" component={StadtteilPage} />
        <Route path="/muenchen-lehel" component={StadtteilPage} />
        <Route path="/muenchen-trudering" component={StadtteilPage} />
        <Route path="/muenchen-allach" component={StadtteilPage} />
        <Route path="/muenchen-untermenzing" component={StadtteilPage} />
        <Route path="/muenchen-obermenzing" component={StadtteilPage} />
        <Route path="/muenchen-aubing" component={StadtteilPage} />
        <Route path="/muenchen-moosach" component={StadtteilPage} />
        <Route path="/muenchen-feldmoching" component={StadtteilPage} />
        <Route path="/muenchen-laim" component={StadtteilPage} />
        <Route path="/muenchen-nymphenburg" component={StadtteilPage} />
        <Route path="/muenchen-berg-am-laim" component={StadtteilPage} />
        <Route path="/muenchen-riem" component={StadtteilPage} />
        <Route path="/muenchen-milbertshofen" component={StadtteilPage} />
        <Route path="/muenchen-freimann" component={StadtteilPage} />
        <Route path="/muenchen-solln" component={StadtteilPage} />
        <Route path="/muenchen-grosshadern" component={StadtteilPage} />
        <Route path="/muenchen-hadern" component={StadtteilPage} />
        <Route path="/muenchen-fuerstenried" component={StadtteilPage} />
        <Route path="/muenchen-forstenried" component={StadtteilPage} />
        <Route path="/muenchen-thalkirchen" component={StadtteilPage} />
        <Route path="/muenchen-obersendling" component={StadtteilPage} />
        <Route path="/muenchen-ramersdorf" component={StadtteilPage} />
        <Route path="/muenchen-perlach" component={StadtteilPage} />
        <Route path="/muenchen-neuperlach" component={StadtteilPage} />
        {/* Umland */}
        <Route path="/dachau" component={StadtteilPage} />
        <Route path="/karlsfeld" component={StadtteilPage} />
        <Route path="/germering" component={StadtteilPage} />
        <Route path="/fuerstenfeldbruck" component={StadtteilPage} />
        <Route path="/freising" component={StadtteilPage} />
        <Route path="/starnberg" component={StadtteilPage} />
        <Route path="/garching" component={StadtteilPage} />
        <Route path="/unterschleissheim" component={StadtteilPage} />
        <Route path="/oberschleissheim" component={StadtteilPage} />
        <Route path="/ottobrunn" component={StadtteilPage} />
        <Route path="/haar" component={StadtteilPage} />
        <Route path="/graefelfing" component={StadtteilPage} />
        <Route path="/planegg" component={StadtteilPage} />
        <Route path="/pullach" component={StadtteilPage} />
        <Route path="/gruenwald" component={StadtteilPage} />
        <Route path="/danke" component={Confirmation} />
        <Route component={NotFound} />
      </Switch>
      </Suspense>
    </>
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
