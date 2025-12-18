import { Link } from "wouter";
import { SiteHeader } from "@/components/site-header";
import { PageHero } from "@/components/page-hero";
import { SeoFooter } from "@/components/seo-footer";
import { Breadcrumb } from "@/components/breadcrumb";
import { SeoHead } from "@/components/seo-head";

export default function Datenschutz() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SeoHead
        title="Datenschutz | 089-sanierer.de | DSGVO-konform"
        description="Datenschutzerklärung: So schützen wir Ihre Daten. DSGVO-konform, Ihre Rechte, Cookies und Datenverarbeitung bei Sanierungsanfragen erklärt."
        keywords="Datenschutz Handwerker München, DSGVO Sanierung, Datenschutzerklärung Renovierung"
        canonicalPath="/datenschutz"
      />
      <SiteHeader />
      <PageHero 
        title="Datenschutz" 
        subtitle="Ihre Daten sind sicher"
        showCta={false}
        compact={true}
      />
      <Breadcrumb items={[{ label: "Datenschutz" }]} />

      <main className="pb-16 flex-1">
        <div className="max-w-3xl mx-auto px-4 lg:px-8">

          <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
            
            <section>
              <p className="text-muted-foreground">
                Diese Datenschutzerklärung klärt Sie über die Art, den Umfang und Zweck der Verarbeitung von personenbezogenen Daten im Rahmen unseres Onlineangebotes und der damit verbundenen Dienste der Marke 089-sanierer.de auf.
              </p>
              <p className="text-muted-foreground mt-4">
                <strong>Verantwortlicher im Sinne der Datenschutzgesetze, insbesondere der EU-Datenschutzgrundverordnung (DSGVO), ist:</strong><br />
                KSHW München, Zielstattstr. 9, 81379 München (im Folgenden: „wir" oder „089-sanierer.de")
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">Ihre Betroffenenrechte</h2>
              <p className="text-muted-foreground mb-4">
                Unter den angegebenen Kontaktdaten unseres Datenschutzbeauftragten können Sie jederzeit folgende Rechte ausüben:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                <li>Auskunft über Ihre bei uns gespeicherten Daten und deren Verarbeitung (Art. 15 DSGVO),</li>
                <li>Berichtigung unrichtiger personenbezogener Daten (Art. 16 DSGVO),</li>
                <li>Löschung Ihrer bei uns gespeicherten Daten (Art. 17 DSGVO),</li>
                <li>Einschränkung der Datenverarbeitung, sofern wir Ihre Daten aufgrund gesetzlicher Pflichten noch nicht löschen dürfen (Art. 18 DSGVO),</li>
                <li>Widerspruch gegen die Verarbeitung Ihrer Daten bei uns (Art. 21 DSGVO) und</li>
                <li>Datenübertragbarkeit, sofern Sie in die Datenverarbeitung eingewilligt haben oder einen Vertrag mit uns abgeschlossen haben (Art. 20 DSGVO).</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                Sofern Sie uns eine Einwilligung erteilt haben, können Sie diese jederzeit mit Wirkung für die Zukunft widerrufen. Sie können sich jederzeit mit einer Beschwerde an eine Aufsichtsbehörde wenden, z. B. an die zuständige Aufsichtsbehörde des Bundeslands Ihres Wohnsitzes oder an die für uns als verantwortliche Stelle zuständige Behörde. Eine Liste der Aufsichtsbehörden (für den nichtöffentlichen Bereich) mit Anschrift finden Sie unter: <a href="https://www.bfdi.bund.de" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">https://www.bfdi.bund.de</a>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">Weitergabe von personenbezogenen Daten an Dritte</h2>
              
              <h3 className="text-lg font-semibold mb-2">Art und Zweck der Verarbeitung:</h3>
              <p className="text-muted-foreground">
                Wir erheben und verarbeiten personenbezogene Daten, die Sie uns über das Anfrageformular auf unserer Website 089-sanierer.de zur Verfügung stellen. Diese initialen Daten dienen der Bearbeitung Ihrer Anfrage und der telefonischen Qualifizierung durch unsere Mitarbeiter. Im Rahmen dieser telefonischen Qualifizierung werden wir Ihre Angaben detailliert besprechen und Ihnen gegebenenfalls weitere Informationen zu Ihrer Anfrage geben.
              </p>
              <p className="text-muted-foreground mt-4">
                Erst nach Ihrer ausdrücklichen mündlichen Zustimmung im Rahmen dieses Telefonats werden Ihre Daten (Vor- und Nachname, E-Mail-Adresse, Telefonnummer, sowie spezifische Angaben zu Ihrer Anfrage) an unsere Partnerunternehmen weitergegeben. Der Zweck dieser Weitergabe ist es, dass unsere Partnerunternehmen Ihnen auf Ihre Anfrage zugeschnittene Angebote unterbreiten und Sie direkt kontaktieren können.
              </p>
              <p className="text-muted-foreground mt-4">
                Ohne Ihre mündliche Zustimmung im Telefonat erfolgt keine Weitergabe Ihrer Daten an Dritte. Eine Vermittlung von Angeboten durch unsere Partner ist in diesem Fall nicht möglich.
              </p>

              <h3 className="text-lg font-semibold mb-2 mt-6">Empfänger der Daten:</h3>
              <p className="text-muted-foreground">
                Ihre personenbezogenen Daten können nach Ihrer mündlichen Einwilligung an sorgfältig ausgewählte Partnerunternehmen aus dem Bereich Sanierung und Handwerk weitergegeben werden.
              </p>
              <p className="text-muted-foreground mt-4">
                Unsere Partnerunternehmen sind unabhängige Dienstleister, mit denen wir Kooperationen zur Vermittlung von Anfragen abgeschlossen haben. Sie sind vertraglich dazu verpflichtet, die erhaltenen Daten ausschließlich zum Zweck der Angebotserstellung zu verwenden und die geltenden Datenschutzbestimmungen einzuhalten.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">Telefonische Einwilligung zur Weitergabe von Daten an Partnerunternehmen</h2>
              <p className="text-muted-foreground">
                Wenn Sie uns über das Kontaktformular auf unserer Website eine Anfrage übermitteln, verwenden wir Ihre personenbezogenen Daten (z. B. Name, Telefonnummer, E-Mail-Adresse und Angaben zu Ihrem geplanten Vorhaben/ Projekt) zunächst ausschließlich zur Bearbeitung Ihrer Anfrage und zur telefonischen Kontaktaufnahme.
              </p>
              <p className="text-muted-foreground mt-4">
                Im Rahmen eines Telefongesprächs erläutert Ihnen unser Mitarbeiter den weiteren Ablauf. Erst wenn Sie im Gespräch ausdrücklich zustimmen, dass wir Ihre Daten zur Angebotserstellung an passende Partnerunternehmen aus dem Bereich Sanierung und Handwerk weitergeben dürfen, erfolgt diese Datenweitergabe. Die Einwilligung erfolgt mündlich und freiwillig.
              </p>
              <p className="text-muted-foreground mt-4">
                <strong>Ohne Ihre Zustimmung erfolgt keine Weitergabe Ihrer Daten an Dritte.</strong>
              </p>
              <p className="text-muted-foreground mt-4">
                Zur Dokumentation Ihrer Einwilligung erfassen wir:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1 mt-2">
                <li>das Datum und die Uhrzeit des Telefonats,</li>
                <li>die Telefonnummer, unter der Sie kontaktiert wurden,</li>
                <li>den Namen des Mitarbeiters, der das Gespräch geführt hat,</li>
                <li>sowie den Eintrag „Einwilligung erteilt" in unserem internen CRM-System.</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                Die Einwilligung kann jederzeit widerrufen werden, per E-Mail an <a href="mailto:info@komplettsanierungen-haus-wohnung.de" className="text-primary hover:underline">info@komplettsanierungen-haus-wohnung.de</a>. Der Widerruf berührt nicht die Rechtmäßigkeit der bis zum Widerruf erfolgten Verarbeitung.
              </p>
              <p className="text-muted-foreground mt-4">
                Die Einwilligungsdaten werden für die Dauer der gesetzlichen Nachweispflicht (gemäß Art. 5 Abs. 2 DSGVO) gespeichert und anschließend gelöscht, sofern keine längeren gesetzlichen Aufbewahrungsfristen bestehen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">Rechtsgrundlage</h2>
              <p className="text-muted-foreground">
                Die Verarbeitung Ihrer Daten zur initialen Bearbeitung und telefonischen Qualifizierung Ihrer Anfrage erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung bzw. vorvertragliche Maßnahmen).
              </p>
              <p className="text-muted-foreground mt-4">
                Die Weitergabe Ihrer Daten an unsere Partnerunternehmen erfolgt ausschließlich auf Grundlage Ihrer ausdrücklichen mündlichen Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO. Ohne diese gesonderte mündliche Zustimmung werden Ihre Daten nicht an Dritte weitergegeben.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">Widerruf der Einwilligung</h2>
              <p className="text-muted-foreground">
                Sie haben jederzeit das Recht, Ihre Einwilligung zur Verarbeitung und Weitergabe Ihrer Daten an Partnerunternehmen zu widerrufen. Der Widerruf kann per E-Mail an <a href="mailto:info@komplettsanierungen-haus-wohnung.de" className="text-primary hover:underline">info@komplettsanierungen-haus-wohnung.de</a> erfolgen. Ein Widerruf hat keine Auswirkungen auf die Rechtmäßigkeit der vor dem Widerruf erfolgten Verarbeitung.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">Speicherdauer</h2>
              <p className="text-muted-foreground">
                Ihre Daten werden nur solange gespeichert, wie es für die Erfüllung der genannten Zwecke (Bearbeitung Ihrer Anfrage, Vermittlung von Angeboten) erforderlich ist oder bis Sie Ihre Einwilligung widerrufen. Nach Widerruf oder Wegfall des Zwecks werden die Daten gelöscht, sofern keine gesetzlichen Aufbewahrungspflichten bestehen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">Bereitstellung vorgeschrieben oder erforderlich</h2>
              <p className="text-muted-foreground">
                Die Bereitstellung Ihrer personenbezogenen Daten im Formular erfolgt freiwillig. Ohne die Bereitstellung der für die Kontaktaufnahme erforderlichen Daten können wir Ihre Anfrage nicht bearbeiten und Sie nicht telefonisch qualifizieren.
              </p>
              <p className="text-muted-foreground mt-4">
                Die mündliche Einwilligung zur Weitergabe Ihrer Daten an Partner erfolgt ebenfalls freiwillig. Ohne diese Einwilligung können wir Ihnen jedoch keine Angebote von unseren Partnerunternehmen vermitteln.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">Erfassung allgemeiner Informationen beim Besuch unserer Website</h2>
              
              <h3 className="text-lg font-semibold mb-2">Technische Umsetzung des Formulars:</h3>
              <p className="text-muted-foreground">
                Das Formular zur Anforderung einer Anfrage wird technisch so bereitgestellt, dass die Einwilligung zur Datenweitergabe erfasst und gespeichert wird. Dabei wird ausschließlich die Bestätigung der Einwilligung gespeichert, nicht jedoch die IP-Adresse. Die Übermittlung der Formulardaten erfolgt verschlüsselt. Die Verarbeitung der Formulardaten erfolgt auf Grundlage eines Auftragsverarbeitungsvertrags gemäß Art. 28 DSGVO.
              </p>

              <h3 className="text-lg font-semibold mb-2 mt-6">Art und Zweck der Verarbeitung:</h3>
              <p className="text-muted-foreground">
                Wenn Sie auf unsere Website zugreifen, d.h., wenn Sie sich nicht registrieren oder anderweitig Informationen übermitteln, werden automatisch Informationen allgemeiner Natur erfasst. Diese Informationen (Server-Logfiles) beinhalten etwa die Art des Webbrowsers, das verwendete Betriebssystem, den Domainnamen Ihres Internet-Service-Providers, Ihre IP-Adresse und ähnliches. Sie werden insbesondere zu folgenden Zwecken verarbeitet:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1 mt-2">
                <li>Sicherstellung eines problemlosen Verbindungsaufbaus der Website,</li>
                <li>Sicherstellung einer reibungslosen Nutzung unserer Website,</li>
                <li>Auswertung der Systemsicherheit und -stabilität sowie</li>
                <li>zu weiteren administrativen Zwecken.</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                Wir verwenden Ihre Daten nicht, um Rückschlüsse auf Ihre Person zu ziehen. Informationen dieser Art werden von uns ggfs. statistisch ausgewertet, um unseren Internetauftritt und die dahinterstehende Technik zu optimieren.
              </p>

              <h3 className="text-lg font-semibold mb-2 mt-6">Rechtsgrundlage:</h3>
              <p className="text-muted-foreground">
                Die Verarbeitung erfolgt gemäß Art. 6 Abs. 1 lit. f DSGVO auf Basis unseres berechtigten Interesses an der Verbesserung der Stabilität und Funktionalität unserer Website.
              </p>

              <h3 className="text-lg font-semibold mb-2 mt-6">Empfänger:</h3>
              <p className="text-muted-foreground">
                Empfänger der Daten sind ggf. technische Dienstleister, die für den Betrieb und die Wartung unserer Webseite als Auftragsverarbeiter tätig werden.
              </p>

              <h3 className="text-lg font-semibold mb-2 mt-6">Speicherdauer:</h3>
              <p className="text-muted-foreground">
                Die Daten werden gelöscht, sobald diese für den Zweck der Erhebung nicht mehr erforderlich sind. Dies ist für die Daten, die der Bereitstellung der Webseite dienen, grundsätzlich der Fall, wenn die jeweilige Sitzung beendet ist.
              </p>

              <h3 className="text-lg font-semibold mb-2 mt-6">Bereitstellung vorgeschrieben oder erforderlich:</h3>
              <p className="text-muted-foreground">
                Die Bereitstellung der vorgenannten personenbezogenen Daten ist weder gesetzlich noch vertraglich vorgeschrieben. Ohne die IP-Adresse ist jedoch der Dienst und die Funktionsfähigkeit unserer Website nicht gewährleistet. Zudem können einzelne Dienste und Services nicht verfügbar oder eingeschränkt sein. Aus diesem Grund ist ein Widerspruch ausgeschlossen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">Cookies</h2>
              
              <h3 className="text-lg font-semibold mb-2">Art und Zweck der Verarbeitung:</h3>
              <p className="text-muted-foreground">
                Wie viele andere Webseiten verwenden wir auch so genannte „Cookies". Bei Cookies handelt es sich um kleine Textdateien, die auf Ihrem Endgerät (Laptop, Tablet, Smartphone o.ä.) gespeichert werden, wenn Sie unsere Webseite besuchen. Hierdurch erhalten wir bestimmte Daten wie z. B. IP-Adresse, verwendeter Browser und Betriebssystem. Cookies können nicht verwendet werden, um Programme zu starten oder Viren auf einen Computer zu übertragen.
              </p>

              <h3 className="text-lg font-semibold mb-2 mt-6">Speicherdauer und eingesetzte Cookies:</h3>
              <p className="text-muted-foreground">
                Soweit Sie uns durch Ihre Browsereinstellungen oder Zustimmung die Verwendung von Cookies erlauben, können folgende Cookies auf unseren Webseiten zum Einsatz kommen.
              </p>
              <p className="text-muted-foreground mt-4">
                Soweit diese Cookies (auch) personenbezogene Daten betreffen können, informieren wir Sie darüber in den folgenden Abschnitten. Sie können über Ihre Browsereinstellungen einzelne Cookies oder den gesamten Cookie-Bestand löschen.
              </p>
              <p className="text-muted-foreground mt-4">
                Darüber hinaus erhalten Sie Informationen und Anleitungen, wie diese Cookies gelöscht oder deren Speicherung vorab blockiert werden können. Je nach Anbieter Ihres Browsers finden Sie die notwendigen Informationen unter den nachfolgenden Links:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1 mt-2">
                <li>Mozilla Firefox: <a href="https://support.mozilla.org/de/kb/cookies-loeschen-daten-von-websites-entfernen" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">https://support.mozilla.org/de/kb/cookies-loeschen-daten-von-websites-entfernen</a></li>
                <li>Internet Explorer: <a href="https://support.microsoft.com/de-de/help/17442/windows-internet-explorer-delete-manage-cookies" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">https://support.microsoft.com/de-de/help/17442/windows-internet-explorer-delete-manage-cookies</a></li>
                <li>Google Chrome: <a href="https://support.google.com/accounts/answer/61416?hl=de" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">https://support.google.com/accounts/answer/61416?hl=de</a></li>
                <li>Opera: <a href="http://www.opera.com/de/help" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">http://www.opera.com/de/help</a></li>
                <li>Safari: <a href="https://support.apple.com/kb/PH17191?locale=de_DE" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">https://support.apple.com/kb/PH17191?locale=de_DE</a></li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">Newsletter</h2>
              
              <h3 className="text-lg font-semibold mb-2">Art und Zweck der Verarbeitung:</h3>
              <p className="text-muted-foreground">
                Ihre Daten werden ausschließlich dazu verwendet, Ihnen den abonnierten Newsletter per E-Mail zuzustellen. Die Angabe Ihres Namens erfolgt, um Sie im Newsletter persönlich ansprechen zu können und ggf. zu identifizieren, falls Sie von Ihren Rechten als Betroffener Gebrauch machen wollen. Für den Empfang des Newsletters ist die Angabe Ihrer E-Mail-Adresse ausreichend. Bei der Anmeldung zum Bezug unseres Newsletters werden die von Ihnen angegebenen Daten ausschließlich für diesen Zweck verwendet.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">SSL-Verschlüsselung</h2>
              <p className="text-muted-foreground">
                Um die Sicherheit Ihrer Daten bei der Übertragung zu schützen, verwenden wir dem aktuellen Stand der Technik entsprechende Verschlüsselungsverfahren (z. B. SSL) über HTTPS.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">Einsatz von Künstlicher Intelligenz (KI-Hinweis gem. EU AI Act)</h2>
              <p className="text-sm text-muted-foreground mb-4">Transparenzhinweis gemäß Art. 50 Verordnung (EU) 2024/1689 | Stand: Dezember 2025</p>
              <p className="text-muted-foreground bg-muted/30 p-4 rounded-lg border">
                KSHW München setzt zur Unterstützung der Geschäftsprozesse KI-basierte Systeme ein. Diese werden u.a. bei der Angebotserstellung, Kommunikation und Dokumentenverarbeitung genutzt. Alle endgültigen Entscheidungen werden von qualifizierten Mitarbeitern getroffen und verantwortet.
              </p>
              <p className="text-muted-foreground mt-4">
                <strong>Rechtsgrundlage:</strong> Verordnung (EU) 2024/1689 (EU AI Act), Art. 22 DSGVO
              </p>
              <p className="text-muted-foreground mt-4">
                <strong>Einsatzbereiche:</strong> Wir nutzen KI-Technologien ausschließlich zur Verbesserung unserer Servicequalität, beispielsweise für die Analyse von Anfragen, Terminplanung oder Kommunikationsunterstützung. Es erfolgt keine automatisierte Entscheidungsfindung mit rechtlicher oder ähnlich erheblicher Wirkung für Sie.
              </p>
              <p className="text-muted-foreground mt-4">
                <strong>Ihre Rechte:</strong> Sie haben das Recht, Auskunft über den Einsatz von KI-Systemen bei der Verarbeitung Ihrer Daten zu erhalten. Bei Fragen wenden Sie sich bitte an: <a href="mailto:info@komplettsanierungen-haus-wohnung.de" className="text-primary hover:underline">info@komplettsanierungen-haus-wohnung.de</a>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">Änderung unserer Datenschutzbestimmungen</h2>
              <p className="text-muted-foreground">
                Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen rechtlichen Anforderungen entspricht oder um Änderungen unserer Leistungen in der Datenschutzerklärung umzusetzen, z.B. bei der Einführung neuer Services. Für Ihren erneuten Besuch gilt dann die neue Datenschutzerklärung.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">Fragen an den Datenschutzbeauftragten</h2>
              <p className="text-muted-foreground">
                Wenn Sie Fragen zum Datenschutz haben, schreiben Sie uns bitte eine E-Mail an: <a href="mailto:info@komplettsanierungen-haus-wohnung.de" className="text-primary hover:underline">info@komplettsanierungen-haus-wohnung.de</a>
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

      <SeoFooter />
    </div>
  );
}
