import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock, Send, Calendar } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { SiteHeader } from "@/components/site-header";
import { GlobalHero, HeroContent } from "@/components/global-hero";
import { SeoFooter } from "@/components/seo-footer";
import { Breadcrumb } from "@/components/breadcrumb";
import { SeoHead } from "@/components/seo-head";
import contactHeroImage from "@assets/generated_images/customer_service_contact.webp";

const kontaktHeroContent: HeroContent = {
  backgroundImage: contactHeroImage,
  badge: "Ihr direkter Draht zum Projekt-Kurator",
  titleLine1: "Sanierung München Kontakt – Beratung, Angebot & Terminvereinbarung.",
  titleLine2: "Kostenlos. Persönlich. Unverbindlich.",
  descriptions: ["Telefon: 089 444438872.", "E-Mail: info@089-sanierer.de."],
  strongText: "Persönliche Antwort innerhalb 24h.",
  ctaText: "Jetzt exklusives Festpreis-Konzept anfordern",
  ctaLink: "/anfrage",
  checkmarks: ["98% Weiterempfehlung", "Kostenlose Beratung", "Meisterbetriebe"],
  dataTestIdPrefix: "kontakt"
};

const contactFormSchema = z.object({
  name: z.string().min(2, "Bitte geben Sie Ihren Namen ein"),
  email: z.string().email("Bitte geben Sie eine gültige E-Mail-Adresse ein"),
  phone: z.string().optional(),
  address: z.string().optional(),
  message: z.string().min(10, "Bitte geben Sie eine Nachricht ein (mind. 10 Zeichen)"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function Kontakt() {
  const { toast } = useToast();
  
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      return apiRequest("POST", "/api/leads", {
        service: "kontakt",
        name: data.name,
        email: data.email,
        phone: data.phone || "",
        message: data.message,
        address: data.address || "",
        postalCode: "",
        preferredContact: "email",
      });
    },
    onSuccess: () => {
      toast({
        title: "Nachricht gesendet",
        description: "Vielen Dank für Ihre Nachricht. Wir melden uns schnellstmöglich bei Ihnen.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Fehler",
        description: "Es gab ein Problem beim Senden Ihrer Nachricht. Bitte versuchen Sie es erneut.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SeoHead
        title="Sanierung München Anfrage | Kostenlose Beratung 24h"
        description="Sanierung München anfragen: Kostenlose Beratung, Antwort in 24h, Festpreis-Angebot. Tel: 089 444438872. Jetzt unverbindlich Projekt besprechen!"
        keywords="Sanierung München Anfrage, Handwerker München kontaktieren, Renovierung Angebot München, Sanierung Beratung kostenlos, Badsanierung München Termin vereinbaren, Komplettsanierung Anfrage stellen München, Handwerker München schnell verfügbar, Renovierung München kostenlose Besichtigung, Sanierung Angebot einholen München, Altbausanierung München Beratung buchen, Elektrosanierung München Angebot anfordern, Heizungssanierung München Kontakt aufnehmen, 089 Sanierer Telefon Öffnungszeiten, 089-Sanierer erreichbar, Sanierung München Rückruf Service"
        canonicalPath="/kontakt"
      />
      <SiteHeader />

      <GlobalHero content={kontaktHeroContent} />
      <Breadcrumb items={[{ label: "Kontakt" }]} />

      <main id="main-content" className="py-6 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-6">Ihre kostenlose Sanierungsanfrage – 100% unverbindlich</h2>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name *</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Ihr vollständiger Name" 
                                data-testid="input-contact-name"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>E-Mail *</FormLabel>
                            <FormControl>
                              <Input 
                                type="email" 
                                placeholder="ihre@email.de" 
                                data-testid="input-contact-email"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Telefon (optional)</FormLabel>
                            <FormControl>
                              <Input 
                                type="tel" 
                                placeholder="Ihre Telefonnummer" 
                                data-testid="input-contact-phone"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Adresse / Ort (optional)</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Straße, PLZ Ort" 
                                data-testid="input-contact-address"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nachricht *</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Ihre Nachricht an uns..." 
                                className="min-h-32"
                                data-testid="input-contact-message"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button 
                        type="submit" 
                        size="lg"
                        className="w-full min-h-12 bg-orange-500 hover:bg-orange-600 text-white border-orange-500"
                        disabled={mutation.isPending}
                        data-testid="button-contact-submit"
                      >
                        {mutation.isPending ? (
                          "Wird gesendet..."
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Nachricht senden
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                  <div className="bg-muted/50 p-4 rounded-md mt-4">
                    <p className="text-xs text-muted-foreground">
                      <strong>Hinweis zum Vertragsabschluss:</strong> Anfragen über Kontaktformulare, E-Mail oder Telefon dienen ausschließlich der unverbindlichen Kontaktaufnahme. Ein Vertrag kommt erst nach persönlicher Abstimmung, Besichtigung vor Ort und ausdrücklicher Annahme eines schriftlichen Angebots zustande. Es erfolgt keine kostenpflichtige Bestellung über diese Website.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">Wie erreichen Sie <strong>089-Sanierer</strong>?</h2>
                  <div className="space-y-4">
                    <a href="tel:+498944438872" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                      <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
                        <Phone className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Telefon</p>
                        <p className="font-medium">089 444438872</p>
                      </div>
                    </a>
                    <a href="mailto:info@089-sanierer.de" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                      <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">E-Mail</p>
                        <p className="font-medium">info@089-sanierer.de</p>
                      </div>
                    </a>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Adresse</p>
                        <p className="font-medium">Hardenbergstr. 4, 80992 <strong>München-Moosach</strong></p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
                        <Clock className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Öffnungszeiten</p>
                        <p className="font-medium">Mo-Fr: 8:00-16:30 Uhr</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">
                    <strong>Sanierungsbetrieb München</strong> – Wir sind in allen Stadtteilen für Sie da: Schwabing, Bogenhausen, Haidhausen, Sendling, Pasing, Trudering und Umland.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">Welche <strong>Sanierung</strong> brauchen Sie in <strong>München</strong>?</h2>
                  <p className="text-muted-foreground mb-4">
                    Sie wissen schon, was Sie brauchen? In 2 Minuten zum kostenlosen <strong>Festpreis-Angebot</strong>.
                  </p>
                  <div className="space-y-4">
                    <Link href="/termin">
                      <Button size="lg" className="w-full min-h-12 bg-yellow-500 hover:bg-yellow-600 text-black border-yellow-500" data-testid="button-contact-booking">
                        <Calendar className="w-4 h-4 mr-2" />
                        24 Std. Online Termin
                      </Button>
                    </Link>
                    <Link href="/anfrage" className="block mt-4">
                      <Button size="lg" className="w-full min-h-12" data-testid="button-contact-funnel">
                        Zur Projektanfrage
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-muted/30 border-primary/20">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">Hinweis zu Vertragspartnern</h2>
                  <p className="text-muted-foreground text-sm">
                    Vertragspartner dieses Angebots ist der im Angebot namentlich genannte Gewerbebetrieb. 
                    Rechnungsstellung, Gewährleistung und Haftung erfolgen ausschließlich über den jeweiligen Vertragspartner. 
                    Weitere Leistungen können durch rechtlich selbstständige Partnerbetriebe ausgeführt werden.
                  </p>
                  <p className="text-muted-foreground text-sm mt-2">
                    Weitere Informationen finden Sie in unserem <Link href="/impressum" className="text-primary hover:underline">Impressum</Link> und unseren <Link href="/agb" className="text-primary hover:underline">AGB</Link>.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">Weiterführende Informationen</h2>
                  <ul className="space-y-3">
                    <li>
                      <Link href="/ratgeber" className="text-primary hover:underline flex items-center gap-2" data-testid="link-kontakt-ratgeber">
                        Sanierung München Ratgeber – Kosten, Förderung & Tipps
                      </Link>
                    </li>
                    <li>
                      <Link href="/faq-preise" className="text-primary hover:underline flex items-center gap-2" data-testid="link-kontakt-faq">
                        FAQ & Preise – Handwerkerkosten in München
                      </Link>
                    </li>
                    <li>
                      <Link href="/gewerke" className="text-primary hover:underline flex items-center gap-2" data-testid="link-kontakt-gewerke">
                        Handwerker-Vermittlung München – Geprüfte Partnerbetriebe
                      </Link>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <SeoFooter />
    </div>
  );
}
