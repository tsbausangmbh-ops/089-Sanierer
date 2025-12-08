import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Building2 } from "lucide-react";

export default function Datenschutz() {
  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-black border-b">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="h-16 flex items-center justify-between gap-4">
            <Link href="/">
              <div className="flex items-center gap-2 cursor-pointer">
                <Building2 className="w-7 h-7 text-primary" />
                <div className="flex flex-col">
                  <span className="font-bold text-base leading-tight">Komplettsanierungen</span>
                  <span className="text-xs text-muted-foreground leading-tight">Haus & Wohnung</span>
                </div>
              </div>
            </Link>
            <Link href="/">
              <Button variant="ghost" data-testid="button-back-home">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Zurück zur Startseite
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 lg:px-8">
          <h1 className="text-3xl lg:text-4xl font-bold mb-8">Datenschutzerklärung</h1>

          <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-xl font-bold mb-4">1. Datenschutz auf einen Blick</h2>
              <h3 className="text-lg font-semibold mb-2">Allgemeine Hinweise</h3>
              <p className="text-muted-foreground">
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen 
                Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen 
                Sie persönlich identifiziert werden können.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">2. Verantwortliche Stelle</h2>
              <p className="text-muted-foreground">
                Verantwortlich für die Datenverarbeitung auf dieser Website ist:<br /><br />
                KSHW München<br />
                Zielstattstr. 9<br />
                81379 München<br /><br />
                E-Mail: info@komplettsanierungen-haus-wohnung.de
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">3. Datenerfassung auf dieser Website</h2>
              <h3 className="text-lg font-semibold mb-2">Kontaktformular und Anfragen</h3>
              <p className="text-muted-foreground">
                Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem 
                Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung 
                der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben 
                wir nicht ohne Ihre Einwilligung weiter.
              </p>
              <p className="text-muted-foreground mt-4">
                Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern 
                Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung 
                vorvertraglicher Maßnahmen erforderlich ist.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">4. Ihre Rechte</h2>
              <p className="text-muted-foreground">
                Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck 
                Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, 
                die Berichtigung oder Löschung dieser Daten zu verlangen.
              </p>
              <p className="text-muted-foreground mt-4">
                Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese jederzeit 
                für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter bestimmten Umständen die 
                Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">5. Hosting</h2>
              <p className="text-muted-foreground">
                Diese Website wird extern gehostet. Die personenbezogenen Daten, die auf dieser Website 
                erfasst werden, werden auf den Servern des Hosters gespeichert. Hierbei kann es sich v.a. 
                um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten, Kontaktdaten, 
                Namen, Websitezugriffe und sonstige Daten handeln.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">6. Cookies</h2>
              <p className="text-muted-foreground">
                Unsere Internetseiten verwenden teilweise so genannte Cookies. Cookies richten auf Ihrem 
                Rechner keinen Schaden an und enthalten keine Viren. Cookies dienen dazu, unser Angebot 
                nutzerfreundlicher, effektiver und sicherer zu machen.
              </p>
              <p className="text-muted-foreground mt-4">
                Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies informiert 
                werden und Cookies nur im Einzelfall erlauben, die Annahme von Cookies für bestimmte Fälle 
                oder generell ausschließen sowie das automatische Löschen der Cookies beim Schließen des 
                Browsers aktivieren.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">7. Kontaktaufnahme</h2>
              <p className="text-muted-foreground">
                Bei der Kontaktaufnahme mit uns (z.B. per Kontaktformular, E-Mail, Telefon) werden die 
                Angaben des Nutzers zur Bearbeitung der Kontaktanfrage und deren Abwicklung gemäß Art. 6 
                Abs. 1 lit. b DSGVO verarbeitet.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">8. Änderung dieser Datenschutzerklärung</h2>
              <p className="text-muted-foreground">
                Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen 
                rechtlichen Anforderungen entspricht oder um Änderungen unserer Leistungen in der 
                Datenschutzerklärung umzusetzen. Für Ihren erneuten Besuch gilt dann die neue 
                Datenschutzerklärung.
              </p>
            </section>
          </div>
        </div>
      </main>

      <footer className="py-8 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 text-center text-sm text-white/70">
          &copy; {new Date().getFullYear()} komplettsanierungen-haus-wohnung.de - Alle Rechte vorbehalten.
        </div>
      </footer>
    </div>
  );
}
