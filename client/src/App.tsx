import { Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/lib/protected-route";
import Home from "@/pages/home";
import Funnel from "@/pages/funnel";
import Confirmation from "@/pages/confirmation";
import Admin from "@/pages/admin";
import AdminLogin from "@/pages/admin-login";
import Impressum from "@/pages/impressum";
import Datenschutz from "@/pages/datenschutz";
import AGB from "@/pages/agb";
import Kontakt from "@/pages/kontakt";
import Ratgeber from "@/pages/ratgeber";
import GewerkeFunnel from "@/pages/gewerke-funnel";
import FaqPreise from "@/pages/faq-preise";
import NotFound from "@/pages/not-found";

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

function usePageTracking() {
  const [location] = useLocation();
  
  useEffect(() => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'session_start', {});
    }
  }, [location]);
}

function Router() {
  usePageTracking();
  return (
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
      <Route path="/danke" component={Confirmation} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Router />
          <Toaster />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
