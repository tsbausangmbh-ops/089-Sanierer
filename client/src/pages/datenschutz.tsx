import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Building2 } from "lucide-react";

const services = [
  { id: "komplettsanierung", title: "Komplettsanierung" },
  { id: "badsanierung", title: "Badsanierung" },
  { id: "kuechensanierung", title: "Küchensanierung" },
  { id: "haussanierung", title: "Haussanierung" },
  { id: "energetisch", title: "Energetische Sanierung" },
];

export default function Datenschutz() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
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
            <div className="hidden lg:flex items-center gap-1">
              {services.map((service) => (
                <Link key={service.id} href={`/anfrage?service=${service.id}`}>
                  <Button variant="ghost" size="sm" className="text-sm">
                    {service.title}
                  </Button>
                </Link>
              ))}
            </div>
            <Link href="/anfrage">
              <Button data-testid="button-header-cta">
                Kostenlose Anfrage
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-16 flex-1">
        <div className="max-w-3xl mx-auto px-4 lg:px-8">
          <h1 className="text-3xl lg:text-4xl font-bold mb-8">Datenschutzerklärung – KSHW Komplettsanierungen München</h1>

          <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
            
            <section>
              <h2 className="text-xl font-bold mb-4">Einleitung</h2>
              <p className="text-muted-foreground">
                Mit der folgenden Datenschutzerklärung möchten wir Sie darüber aufklären, welche Arten Ihrer personenbezogenen Daten (nachfolgend auch kurz als "Daten" bezeichnet) wir zu welchen Zwecken und in welchem Umfang verarbeiten. Die Datenschutzerklärung gilt für alle von uns durchgeführten Verarbeitungen personenbezogener Daten, sowohl im Rahmen der Erbringung unserer Leistungen als auch insbesondere auf unseren Webseiten, in mobilen Applikationen sowie innerhalb externer Onlinepräsenzen, wie z.B. unserer Social-Media-Profile (nachfolgend zusammenfassend bezeichnet als "Onlineangebot").
              </p>
              <p className="text-muted-foreground mt-2">
                Die verwendeten Begriffe sind nicht geschlechtsspezifisch.
              </p>
              <p className="text-muted-foreground mt-2">
                Stand: 7. August 2025
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">Verantwortlicher</h2>
              <p className="text-muted-foreground">
                <a href="https://089-sanierer.de/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">www.089-sanierer.de</a><br />
                <a href="https://komplettsanierungen-haus-wohnung.de" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">www.komplettsanierungen-haus-wohnung.de</a>
              </p>
              <p className="text-muted-foreground mt-4">
                KSHW München<br />
                Ali Kemal Kurt<br />
                Zielstattstr. 9<br />
                81379 München<br /><br />
                Vertretungsberechtigte Personen: Ali Kurtas<br />
                E-Mail-Adresse: info@komplettsanierungen-haus-wohnung.de<br />
                Telefon: 0152 122 740 43<br />
                Impressum: <Link href="/impressum" className="text-primary hover:underline">www.komplettsanierungen-haus-wohnung.de/impressum</Link>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">Übersicht der Verarbeitungen</h2>
              <p className="text-muted-foreground mb-4">
                Die nachfolgende Übersicht fasst die Arten der verarbeiteten Daten und die Zwecke ihrer Verarbeitung zusammen und verweist auf die betroffenen Personen.
              </p>
              
              <h3 className="text-lg font-semibold mb-2">Arten der verarbeiteten Daten</h3>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                <li>Bestandsdaten</li>
                <li>Zahlungsdaten</li>
                <li>Kontaktdaten</li>
                <li>Inhaltsdaten</li>
                <li>Vertragsdaten</li>
                <li>Nutzungsdaten</li>
                <li>Meta-/Kommunikationsdaten</li>
              </ul>

              <h3 className="text-lg font-semibold mb-2 mt-4">Kategorien betroffener Personen</h3>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                <li>Kunden</li>
                <li>Interessenten</li>
                <li>Kommunikationspartner</li>
                <li>Nutzer</li>
                <li>Geschäfts- und Vertragspartner</li>
              </ul>

              <h3 className="text-lg font-semibold mb-2 mt-4">Zwecke der Verarbeitung</h3>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                <li>Erbringung vertraglicher Leistungen und Kundenservice</li>
                <li>Kontaktanfragen und Kommunikation</li>
                <li>Sicherheitsmaßnahmen</li>
                <li>Direktmarketing</li>
                <li>Reichweitenmessung</li>
                <li>Büro- und Organisationsverfahren</li>
                <li>Verwaltung und Beantwortung von Anfragen</li>
                <li>Feedback</li>
                <li>Marketing</li>
                <li>Bereitstellung unseres Onlineangebotes und Nutzerfreundlichkeit</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">Maßgebliche Rechtsgrundlagen</h2>
              <p className="text-muted-foreground">
                Im Folgenden erhalten Sie eine Übersicht der Rechtsgrundlagen der DSGVO, auf deren Basis wir personenbezogene Daten verarbeiten. Bitte nehmen Sie zur Kenntnis, dass neben den Regelungen der DSGVO nationale Datenschutzvorgaben in Ihrem bzw. unserem Wohn- oder Sitzland gelten können.
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-4">
                <li><strong>Einwilligung (Art. 6 Abs. 1 S. 1 lit. a) DSGVO)</strong> - Die betroffene Person hat ihre Einwilligung in die Verarbeitung der sie betreffenden personenbezogenen Daten für einen spezifischen Zweck oder mehrere bestimmte Zwecke gegeben.</li>
                <li><strong>Vertragserfüllung und vorvertragliche Anfragen (Art. 6 Abs. 1 S. 1 lit. b) DSGVO)</strong> - Die Verarbeitung ist für die Erfüllung eines Vertrags, dessen Vertragspartei die betroffene Person ist, oder zur Durchführung vorvertraglicher Maßnahmen erforderlich, die auf Anfrage der betroffenen Person erfolgen.</li>
                <li><strong>Rechtliche Verpflichtung (Art. 6 Abs. 1 S. 1 lit. c) DSGVO)</strong> - Die Verarbeitung ist zur Erfüllung einer rechtlichen Verpflichtung erforderlich, der der Verantwortliche unterliegt.</li>
                <li><strong>Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f) DSGVO)</strong> - Die Verarbeitung ist zur Wahrung der berechtigten Interessen des Verantwortlichen oder eines Dritten erforderlich, sofern nicht die Interessen oder Grundrechte und Grundfreiheiten der betroffenen Person, die den Schutz personenbezogener Daten erfordern, überwiegen.</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                Zusätzlich zu den Datenschutzregelungen der Datenschutz-Grundverordnung gelten nationale Regelungen zum Datenschutz in Deutschland. Hierzu gehört insbesondere das Gesetz zum Schutz vor Missbrauch personenbezogener Daten bei der Datenverarbeitung (Bundesdatenschutzgesetz – BDSG).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">Sicherheitsmaßnahmen</h2>
              <p className="text-muted-foreground">
                Wir treffen nach Maßgabe der gesetzlichen Vorgaben unter Berücksichtigung des Stands der Technik, der Implementierungskosten und der Art, des Umfangs, der Umstände und der Zwecke der Verarbeitung sowie der unterschiedlichen Eintrittswahrscheinlichkeiten und des Ausmaßes der Bedrohung der Rechte und Freiheiten natürlicher Personen geeignete technische und organisatorische Maßnahmen, um ein dem Risiko angemessenes Schutzniveau zu gewährleisten.
              </p>
              <p className="text-muted-foreground mt-2">
                Zu den Maßnahmen gehören insbesondere die Sicherung der Vertraulichkeit, Integrität und Verfügbarkeit von Daten durch Kontrolle des physischen und elektronischen Zugangs zu den Daten als auch des sie betreffenden Zugriffs, der Eingabe, der Weitergabe, der Sicherung der Verfügbarkeit und ihrer Trennung.
              </p>
              <p className="text-muted-foreground mt-2">
                <strong>SSL-Verschlüsselung (https):</strong> Um Ihre via unserem Online-Angebot übermittelten Daten zu schützen, nutzen wir eine SSL-Verschlüsselung. Sie erkennen derart verschlüsselte Verbindungen an dem Präfix https:// in der Adresszeile Ihres Browsers.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">Übermittlung von personenbezogenen Daten</h2>
              <p className="text-muted-foreground">
                Im Rahmen unserer Verarbeitung von personenbezogenen Daten kommt es vor, dass die Daten an andere Stellen, Unternehmen, rechtlich selbstständige Organisationseinheiten oder Personen übermittelt oder sie ihnen gegenüber offengelegt werden. Zu den Empfängern dieser Daten können z.B. mit IT-Aufgaben beauftragte Dienstleister oder Anbieter von Diensten und Inhalten, die in eine Webseite eingebunden werden, gehören. In solchen Fall beachten wir die gesetzlichen Vorgaben und schließen insbesondere entsprechende Verträge bzw. Vereinbarungen, die dem Schutz Ihrer Daten dienen, mit den Empfängern Ihrer Daten ab.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">Datenverarbeitung in Drittländern</h2>
              <p className="text-muted-foreground">
                Sofern wir Daten in einem Drittland (d.h., außerhalb der Europäischen Union (EU), des Europäischen Wirtschaftsraums (EWR)) verarbeiten oder die Verarbeitung im Rahmen der Inanspruchnahme von Diensten Dritter oder der Offenlegung bzw. Übermittlung von Daten an andere Personen, Stellen oder Unternehmen stattfindet, erfolgt dies nur im Einklang mit den gesetzlichen Vorgaben.
              </p>
              <p className="text-muted-foreground mt-2">
                Vorbehaltlich ausdrücklicher Einwilligung oder vertraglich oder gesetzlich erforderlicher Übermittlung verarbeiten oder lassen wir die Daten nur in Drittländern mit einem anerkannten Datenschutzniveau, vertraglichen Verpflichtung durch sogenannte Standardschutzklauseln der EU-Kommission, beim Vorliegen von Zertifizierungen oder verbindlicher internen Datenschutzvorschriften verarbeiten (Art. 44 bis 49 DSGVO).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">Löschung von Daten</h2>
              <p className="text-muted-foreground">
                Die von uns verarbeiteten Daten werden nach Maßgabe der gesetzlichen Vorgaben gelöscht, sobald deren zur Verarbeitung erlaubten Einwilligungen widerrufen werden oder sonstige Erlaubnisse entfallen (z.B. wenn der Zweck der Verarbeitung dieser Daten entfallen ist oder sie für den Zweck nicht erforderlich sind).
              </p>
              <p className="text-muted-foreground mt-2">
                Sofern die Daten nicht gelöscht werden, weil sie für andere und gesetzlich zulässige Zwecke erforderlich sind, wird deren Verarbeitung auf diese Zwecke beschränkt. D.h., die Daten werden gesperrt und nicht für andere Zwecke verarbeitet. Das gilt z.B. für Daten, die aus handels- oder steuerrechtlichen Gründen aufbewahrt werden müssen oder deren Speicherung zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen erforderlich ist.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">Einsatz von Cookies</h2>
              <p className="text-muted-foreground">
                Cookies sind kleine Textdateien, bzw. sonstige Speichervermerke, die Informationen auf Endgeräten speichern und Informationen aus den Endgeräten auslesen. Z.B. um den Login-Status in einem Nutzerkonto, einen Warenkorbinhalt in einem E-Shop, die aufgerufenen Inhalte oder verwendete Funktionen eines Onlineangebotes speichern. Cookies können ferner zu unterschiedlichen Zwecken eingesetzt werden, z.B. zu Zwecken der Funktionsfähigkeit, Sicherheit und Komfort von Onlineangeboten sowie der Erstellung von Analysen der Besucherströme.
              </p>
              <p className="text-muted-foreground mt-4">
                <strong>Hinweise zur Einwilligung:</strong> Wir setzen Cookies im Einklang mit den gesetzlichen Vorschriften ein. Daher holen wir von den Nutzern eine vorhergehende Einwilligung ein, außer wenn diese gesetzlich nicht gefordert ist.
              </p>
              <p className="text-muted-foreground mt-4">
                <strong>Speicherdauer:</strong> Im Hinblick auf die Speicherdauer werden temporäre Cookies (Session-Cookies), die spätestens nach Verlassen des Online-Angebots gelöscht werden, und permanente Cookies unterschieden, die auch nach dem Schließen des Browsers gespeichert bleiben.
              </p>
              <p className="text-muted-foreground mt-4">
                <strong>Allgemeine Hinweise zum Widerruf und Widerspruch (Opt-Out):</strong> Nutzer können die von ihnen abgegebenen Einwilligungen jederzeit widerrufen und zudem einen Widerspruch gegen die Verarbeitung entsprechend den gesetzlichen Vorgaben im Art. 21 DSGVO einlegen. Nutzer können ihren Widerspruch auch über die Einstellungen ihres Browsers erklären.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">Geschäftliche Leistungen</h2>
              <p className="text-muted-foreground">
                Wir verarbeiten Daten unserer Vertrags- und Geschäftspartner, z.B. Kunden und Interessenten (zusammenfassend bezeichnet als "Vertragspartner") im Rahmen von vertraglichen und vergleichbaren Rechtsverhältnissen sowie damit verbundenen Maßnahmen und im Rahmen der Kommunikation mit den Vertragspartnern (oder vorvertraglich), z.B., um Anfragen zu beantworten.
              </p>
              <p className="text-muted-foreground mt-2">
                Wir verarbeiten diese Daten, um unsere vertraglichen Verpflichtungen zu erfüllen. Dazu gehören insbesondere die Verpflichtungen zur Erbringung der vereinbarten Leistungen, etwaige Aktualisierungspflichten und Abhilfe bei Gewährleistungs- und sonstigen Leistungsstörungen.
              </p>
              <p className="text-muted-foreground mt-2">
                <strong>Handwerkliche Leistungen:</strong> Wir verarbeiten die Daten unserer Kunden sowie Auftraggeber (nachfolgend einheitlich als "Kunden" bezeichnet), um ihnen die Auswahl, den Erwerb bzw. die Beauftragung der gewählten Leistungen oder Werke sowie verbundener Tätigkeiten als auch deren Bezahlung und Zustellung bzw. Ausführung oder Erbringung zu ermöglichen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">Kontakt- und Anfragenverwaltung</h2>
              <p className="text-muted-foreground">
                Bei der Kontaktaufnahme mit uns (z.B. per Kontaktformular, E-Mail, Telefon oder via soziale Medien) sowie im Rahmen bestehender Nutzer- und Geschäftsbeziehungen werden die Angaben der anfragenden Personen verarbeitet soweit dies zur Beantwortung der Kontaktanfragen und etwaiger angefragter Maßnahmen erforderlich ist.
              </p>
              <p className="text-muted-foreground mt-2">
                <strong>Kontaktformular:</strong> Wenn Nutzer über unser Kontaktformular, E-Mail oder andere Kommunikationswege mit uns in Kontakt treten, verarbeiten wir die uns in diesem Zusammenhang mitgeteilten Daten zur Bearbeitung des mitgeteilten Anliegens.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">Rechte der betroffenen Personen</h2>
              <p className="text-muted-foreground mb-4">
                Ihnen stehen als Betroffene nach der DSGVO verschiedene Rechte zu, die sich insbesondere aus Art. 15 bis 21 DSGVO ergeben:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>Widerspruchsrecht:</strong> Sie haben das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben, jederzeit gegen die Verarbeitung der Sie betreffenden personenbezogenen Daten Widerspruch einzulegen.</li>
                <li><strong>Widerrufsrecht bei Einwilligungen:</strong> Sie haben das Recht, erteilte Einwilligungen jederzeit zu widerrufen.</li>
                <li><strong>Auskunftsrecht:</strong> Sie haben das Recht, eine Bestätigung darüber zu verlangen, ob betreffende Daten verarbeitet werden und auf Auskunft über diese Daten sowie auf weitere Informationen und Kopie der Daten entsprechend den gesetzlichen Vorgaben.</li>
                <li><strong>Recht auf Berichtigung:</strong> Sie haben entsprechend den gesetzlichen Vorgaben das Recht, die Vervollständigung der Sie betreffenden Daten oder die Berichtigung der Sie betreffenden unrichtigen Daten zu verlangen.</li>
                <li><strong>Recht auf Löschung und Einschränkung der Verarbeitung:</strong> Sie haben nach Maßgabe der gesetzlichen Vorgaben das Recht, zu verlangen, dass Sie betreffende Daten unverzüglich gelöscht werden, bzw. alternativ eine Einschränkung der Verarbeitung der Daten zu verlangen.</li>
                <li><strong>Recht auf Datenübertragbarkeit:</strong> Sie haben das Recht, Sie betreffende Daten, die Sie uns bereitgestellt haben, nach Maßgabe der gesetzlichen Vorgaben in einem strukturierten, gängigen und maschinenlesbaren Format zu erhalten.</li>
                <li><strong>Beschwerde bei Aufsichtsbehörde:</strong> Sie haben das Recht auf Beschwerde bei einer Aufsichtsbehörde, insbesondere in dem Mitgliedstaat ihres gewöhnlichen Aufenthaltsorts, wenn Sie der Ansicht sind, dass die Verarbeitung der Sie betreffenden personenbezogenen Daten gegen die Vorgaben der DSGVO verstößt.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">Begriffsdefinitionen</h2>
              <p className="text-muted-foreground mb-4">
                In diesem Abschnitt erhalten Sie eine Übersicht über die in dieser Datenschutzerklärung verwendeten Begrifflichkeiten:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>Personenbezogene Daten:</strong> Alle Informationen, die sich auf eine identifizierte oder identifizierbare natürliche Person beziehen.</li>
                <li><strong>Verarbeitung:</strong> Jeder mit oder ohne Hilfe automatisierter Verfahren ausgeführte Vorgang im Zusammenhang mit personenbezogenen Daten.</li>
                <li><strong>Verantwortlicher:</strong> Die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten entscheidet.</li>
                <li><strong>Reichweitenmessung:</strong> Dient der Auswertung der Besucherströme eines Onlineangebotes.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">Änderung und Aktualisierung der Datenschutzerklärung</h2>
              <p className="text-muted-foreground">
                Wir bitten Sie, sich regelmäßig über den Inhalt unserer Datenschutzerklärung zu informieren. Wir passen die Datenschutzerklärung an, sobald die Änderungen der von uns durchgeführten Datenverarbeitungen dies erforderlich machen. Wir informieren Sie, sobald durch die Änderungen eine Mitwirkungshandlung Ihrerseits (z.B. Einwilligung) oder eine sonstige individuelle Benachrichtigung erforderlich wird.
              </p>
            </section>

            <section className="border-t pt-8">
              <h2 className="text-xl font-bold mb-4">Standort</h2>
              <p className="text-muted-foreground">
                KSHW München<br />
                Zielstattstr. 9<br />
                81379 München<br /><br />
                info@komplettsanierungen-haus-wohnung.de
              </p>
              <p className="text-muted-foreground mt-4">
                <strong>Öffnungszeiten:</strong><br />
                Mo - Fr: 08:00 - 16:30 Uhr<br />
                Sa - So: Geschlossen
              </p>
            </section>

            <section className="border-t pt-8 mt-8">
              <h2 className="text-xl font-bold mb-4">Weitere rechtliche Informationen</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link href="/impressum" className="text-primary hover:underline">Impressum</Link></li>
                <li><Link href="/agb" className="text-primary hover:underline">Allgemeine Geschäftsbedingungen (AGB)</Link></li>
              </ul>
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
