import { Link } from "wouter";
import { SiteHeader } from "@/components/site-header";
import { GlobalHero, HeroContent } from "@/components/global-hero";
import { SeoFooter } from "@/components/seo-footer";
import { Breadcrumb } from "@/components/breadcrumb";
import { SeoHead } from "@/components/seo-head";
const datenschutzHeroImage = "/images/datenschutz_sicherheit.webp";

const datenschutzHeroContent: HeroContent = {
  backgroundImage: datenschutzHeroImage,
  mobileImageSrc: "/images/mobile/datenschutz_sicherheit.webp",
  imageAlt: "Datenschutzerklärung Sanierungsfirma München – DSGVO-konforme Datenverarbeitung bei 089-Sanierer Komplettsanierung und Renovierung",
  badge: "Höchste Datenschutzstandards",
  titleLine1: "Datenschutz.",
  titleLine2: "Ihre Daten in sicheren Händen.",
  descriptions: ["KSHW München – Ihr exklusiver Projekt-Kurator.", "Transparente und sichere Datenverarbeitung."],
  strongText: "DSGVO-konform. SSL-verschlüsselt.",
  ctaText: "Jetzt exklusives Festpreis-Konzept anfordern",
  ctaLink: "/anfrage",
  checkmarks: ["98% Weiterempfehlung", "Meisterbetriebe", "Festpreisgarantie"],
  dataTestIdPrefix: "datenschutz"
};

export default function Datenschutz() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SeoHead
        title="Datenschutz | 089-sanierer.de | DSGVO-konform"
        description="Datenschutzerklärung: So schützen wir Ihre Daten. DSGVO-konform, Ihre Rechte, Cookies und Datenverarbeitung bei Sanierungsanfragen erklärt."
        keywords="Datenschutz Sanierung München, DSGVO Renovierungsfirma, Datenschutzerklärung Handwerker, Privatsphäre Baufirma Bayern, Komplettsanierung Datenschutz, DSGVO konform Bauunternehmen"
        canonicalPath="/datenschutz"
      />
      <SiteHeader />
      <GlobalHero content={datenschutzHeroContent} />
      <Breadcrumb items={[{ label: "Datenschutz" }]} />

      <main className="pb-16 flex-1">
        <div className="max-w-4xl mx-auto px-6">

          <div className="prose prose-lg dark:prose-invert max-w-none space-y-6">

            <section>
              <h2 className="text-lg sm:text-xl font-bold mb-6 text-primary">1. Datenschutz auf einen Blick</h2>
              
              <h3 className="text-xl font-bold mb-4">Allgemeine Hinweise</h3>
              <p className="text-muted-foreground">
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
              </p>

              <h3 className="text-xl font-bold mb-4 mt-6">Datenerfassung auf dieser Website</h3>
              <p className="text-muted-foreground font-bold">Wer ist verantwortlich für die Datenerfassung auf dieser Website?</p>
              <p className="text-muted-foreground">
                Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem <Link href="/impressum" className="text-primary hover:underline">Impressum</Link> dieser Website entnehmen.
              </p>

              <p className="text-muted-foreground font-bold mt-4">Wie erfassen wir Ihre Daten?</p>
              <p className="text-muted-foreground">
                Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben.
              </p>
              <p className="text-muted-foreground mt-2">
                Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie diese Website betreten.
              </p>

              <p className="text-muted-foreground font-bold mt-4">Wofür nutzen wir Ihre Daten?</p>
              <p className="text-muted-foreground">
                Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.
              </p>

              <div className="bg-muted/30 p-4 rounded-lg mt-6">
                <p className="text-muted-foreground font-bold">Hinweis zu Vertragspartnern</p>
                <p className="text-muted-foreground mt-2">
                  Vertragspartner dieses Angebots ist der im Angebot namentlich genannte Gewerbebetrieb. Rechnungsstellung, Gewährleistung und Haftung erfolgen ausschließlich über den jeweiligen Vertragspartner. Weitere Leistungen können durch rechtlich selbstständige Partnerbetriebe ausgeführt werden.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold mb-6 text-primary">2. Hosting & Content Delivery Networks (CDN)</h2>
              <p className="text-muted-foreground">
                Wir hosten die Inhalte unserer Website bei einem externen Anbieter. Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den Servern des Hosters gespeichert. Hierbei kann es sich v. a. um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten, Kontaktdaten, Namen, Websitezugriffe und sonstige Daten, die über eine Website generiert werden, handeln.
              </p>
              <div className="bg-muted/30 p-4 rounded-lg mt-4">
                <p className="text-muted-foreground">
                  <strong>Serverstandort:</strong> EU (Rechenzentren innerhalb der Europäischen Union)<br />
                  <strong>Auftragsverarbeitung:</strong> Wir haben einen Vertrag über Auftragsverarbeitung (AVV) abgeschlossen. Dieser stellt sicher, dass die Daten unserer Websitebesucher nur nach unseren Weisungen und unter Einhaltung der DSGVO verarbeitet werden.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold mb-6 text-primary">3. Allgemeine Hinweise und Pflichtinformationen</h2>
              
              <h3 className="text-xl font-bold mb-4">Datenschutz & Datensicherheit</h3>
              <p className="text-muted-foreground">
                Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
              </p>

              <h3 className="text-xl font-bold mb-4 mt-6">Weitergabe von Daten</h3>
              <p className="text-muted-foreground">
                Eine Übermittlung Ihrer persönlichen Daten an Dritte zu anderen als den im Folgenden aufgeführten Zwecken findet nicht statt. Wir geben Ihre persönlichen Daten nur an Dritte weiter, wenn:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 mt-2">
                <li>Sie Ihre nach Art. 6 Abs. 1 S. 1 lit. a DSGVO ausdrückliche Einwilligung dazu erteilt haben,</li>
                <li>die Weitergabe nach Art. 6 Abs. 1 S. 1 lit. f DSGVO zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen erforderlich ist,</li>
                <li>für die Weitergabe nach Art. 6 Abs. 1 S. 1 lit. c DSGVO eine gesetzliche Verpflichtung besteht,</li>
                <li>dies gesetzlich zulässig und nach Art. 6 Abs. 1 S. 1 lit. b DSGVO für die Abwicklung von Vertragsverhältnissen mit Ihnen erforderlich ist.</li>
              </ul>

              <h3 className="text-xl font-bold mb-4 mt-6">Weitergabe an Handwerker und Subunternehmer</h3>
              <p className="text-muted-foreground">
                Zur Erfüllung unseres Auftrags (Komplettsanierung, Koordination verschiedener Gewerke) ist es erforderlich, Ihre Kontaktdaten (Name, Anschrift, Telefonnummer, ggf. E-Mail) an von uns beauftragte Subunternehmer (z. B. Elektriker, Installateure, Maler) und Fachplaner (z. B. Architekten, Statiker) weiterzugeben.
              </p>
              <p className="text-muted-foreground mt-2">
                Die Weitergabe erfolgt ausschließlich zum Zweck der Terminvereinbarung, Angebotserstellung für Teilleistungen oder Durchführung der handwerklichen Tätigkeiten bei Ihnen vor Ort. Rechtsgrundlage hierfür ist Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung bzw. vorvertragliche Maßnahmen). Unsere Partner sind ebenfalls zur Einhaltung der Datenschutzbestimmungen verpflichtet.
              </p>

              <h3 className="text-xl font-bold mb-4 mt-6">SSL- bzw. TLS-Verschlüsselung</h3>
              <p className="text-muted-foreground">
                Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von „http://" auf „https://" wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.
              </p>

              <h3 className="text-xl font-bold mb-4 mt-6">Server-Log-Dateien</h3>
              <p className="text-muted-foreground">
                Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 mt-2">
                <li>Browsertyp und Browserversion</li>
                <li>Verwendetes Betriebssystem</li>
                <li>Referrer URL</li>
                <li>Hostname des zugreifenden Rechners</li>
                <li>Uhrzeit der Serveranfrage</li>
                <li>IP-Adresse</li>
              </ul>
              <p className="text-muted-foreground mt-2">
                Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.
              </p>

              <h3 className="text-xl font-bold mb-4 mt-6">Cookies</h3>
              <p className="text-muted-foreground">
                Unsere Internetseiten verwenden so genannte „Cookies". Cookies sind kleine Textdateien und richten auf Ihrem Endgerät keinen Schaden an. Sie werden entweder vorübergehend für die Dauer einer Sitzung (Session-Cookies) oder dauerhaft (permanente Cookies) auf Ihrem Endgerät gespeichert.
              </p>
              <p className="text-muted-foreground mt-2">
                Cookies haben verschiedene Funktionen. Zahlreiche Cookies sind technisch notwendig, da bestimmte Websitefunktionen ohne diese nicht funktionieren würden. Andere Cookies dienen dazu, das Nutzerverhalten auszuwerten oder Werbung anzuzeigen.
              </p>

              <h3 className="text-xl font-bold mb-4 mt-6">Hinweis zur verantwortlichen Stelle</h3>
              <div className="bg-muted/30 p-4 rounded-lg">
                <p className="text-muted-foreground">
                  Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:<br /><br />
                  <strong>Ali Kemal Kurt</strong><br />
                  KSHW München<br />
                  Zielstattstr. 9<br />
                  81379 München<br /><br />
                  E-Mail: <a href="mailto:info@komplettsanierungen-haus-wohnung.de" className="text-primary hover:underline">info@komplettsanierungen-haus-wohnung.de</a>
                </p>
              </div>

              <h3 className="text-xl font-bold mb-4 mt-6">Widerruf Ihrer Einwilligung zur Datenverarbeitung</h3>
              <p className="text-muted-foreground">
                Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.
              </p>

              <h3 className="text-xl font-bold mb-4 mt-6">Beschwerderecht bei der zuständigen Aufsichtsbehörde</h3>
              <p className="text-muted-foreground">
                Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei einer Aufsichtsbehörde, insbesondere in dem Mitgliedstaat ihres gewöhnlichen Aufenthalts, ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes zu.
              </p>

              <h3 className="text-xl font-bold mb-4 mt-6">Recht auf Datenübertragbarkeit</h3>
              <p className="text-muted-foreground">
                Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung eines Vertrags automatisiert verarbeiten, an sich oder an einen Dritten in einem gängigen, maschinenlesbaren Format aushändigen zu lassen.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold mb-6 text-primary">4. Datenerfassung auf dieser Website</h2>
              
              <h3 className="text-xl font-bold mb-4">Kontaktformular</h3>
              <p className="text-muted-foreground">
                Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
              </p>
              <p className="text-muted-foreground mt-2">
                Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist.
              </p>
              <p className="text-muted-foreground mt-2">
                Die von Ihnen im Kontaktformular eingegebenen Daten verbleiben bei uns, bis Sie uns zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung entfällt. Zwingende gesetzliche Bestimmungen – insbesondere Aufbewahrungsfristen – bleiben unberührt.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold mb-6 text-primary">5. Soziale Medien & Online-Marketing</h2>
              
              <h3 className="text-xl font-bold mb-4">Allgemeine Hinweise zu Social Media</h3>
              <p className="text-muted-foreground">
                Wir setzen auf unserer Website Social-Media-Plugins und Verlinkungen ein (z. B. Facebook, Instagram, LinkedIn). Um Ihre Daten zu schützen, nutzen wir datenschutzfreundliche Einbindungsmethoden.
              </p>
              <p className="text-muted-foreground mt-2">
                Das bedeutet: Wenn Sie unsere Seite besuchen, werden zunächst keine personenbezogenen Daten an die Anbieter der Social-Media-Plugins weitergegeben. Erst wenn Sie aktiv auf einen der Social-Media-Buttons klicken, wird eine Verbindung zum Server des jeweiligen Anbieters hergestellt.
              </p>

              <div className="space-y-4 mt-6">
                <div className="bg-muted/30 p-4 rounded-lg">
                  <p className="font-bold">Facebook (Meta Platforms Ireland Limited)</p>
                  <p className="text-muted-foreground text-sm mt-1">
                    Anbieter: Meta Platforms Ireland Limited, 4 Grand Canal Square, Dublin 2, Irland<br />
                    Datenschutzerklärung: <a href="https://www.facebook.com/privacy/policy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">facebook.com/privacy/policy</a><br />
                    Drittlandübermittlung: USA (auf Basis von EU-US Data Privacy Framework)
                  </p>
                </div>

                <div className="bg-muted/30 p-4 rounded-lg">
                  <p className="font-bold">Instagram (Meta Platforms Ireland Limited)</p>
                  <p className="text-muted-foreground text-sm mt-1">
                    Anbieter: Meta Platforms Ireland Limited, 4 Grand Canal Square, Dublin 2, Irland<br />
                    Datenschutzerklärung: <a href="https://help.instagram.com/519522125107875" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">help.instagram.com</a><br />
                    Drittlandübermittlung: USA (auf Basis von EU-US Data Privacy Framework)
                  </p>
                </div>

                <div className="bg-muted/30 p-4 rounded-lg">
                  <p className="font-bold">LinkedIn (LinkedIn Ireland Unlimited Company)</p>
                  <p className="text-muted-foreground text-sm mt-1">
                    Anbieter: LinkedIn Ireland Unlimited Company, Wilton Place, Dublin 2, Irland<br />
                    Datenschutzerklärung: <a href="https://www.linkedin.com/legal/privacy-policy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">linkedin.com/legal/privacy-policy</a><br />
                    Drittlandübermittlung: USA (auf Basis von Standardvertragsklauseln)
                  </p>
                </div>

                <div className="bg-muted/30 p-4 rounded-lg">
                  <p className="font-bold">TikTok (TikTok Technology Limited)</p>
                  <p className="text-muted-foreground text-sm mt-1">
                    Anbieter: TikTok Technology Limited, 10 Earlsfort Terrace, Dublin, D02 T380, Irland<br />
                    Datenschutzerklärung: <a href="https://www.tiktok.com/legal/privacy-policy-eea" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">tiktok.com/legal/privacy-policy-eea</a><br />
                    Drittlandübermittlung: Singapur, USA (auf Basis von Standardvertragsklauseln)
                  </p>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-4 mt-6">Facebook Pixel & Meta Conversion API</h3>
              <p className="text-muted-foreground">
                Wir setzen auf unserer Website das „Facebook Pixel" von Meta ein. Hierdurch kann das Verhalten von Nutzern nachverfolgt werden, nachdem diese durch Klick auf eine Facebook-Werbeanzeige auf unsere Website weitergeleitet wurden.
              </p>
              <p className="text-muted-foreground mt-2">
                Die erhobenen Daten sind für uns anonym. Diese Daten werden jedoch von Meta gespeichert und verarbeitet. Rechtsgrundlage: Ihre Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO. Sie können diese jederzeit widerrufen.
              </p>

              <h3 className="text-xl font-bold mb-4 mt-6">Retargeting / Remarketing</h3>
              <p className="text-muted-foreground">
                Wir nutzen Retargeting-Technologien, um Ihnen auf anderen Websites personalisierte Werbung anzuzeigen. Die Nutzung dieser Dienste erfolgt ausschließlich auf Grundlage Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO).
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold mb-6 text-primary">6. Analyse-Tools und Werbung</h2>
              
              <h3 className="text-xl font-bold mb-4">Google Analytics</h3>
              <p className="text-muted-foreground">
                Diese Website nutzt Funktionen des Webanalysedienstes Google Analytics. Anbieter ist die Google Ireland Limited („Google"), Gordon House, Barrow Street, Dublin 4, Irland.
              </p>
              <p className="text-muted-foreground mt-2">
                Google Analytics verwendet so genannte „Cookies". Die Speicherung von Google-Analytics-Cookies und die Nutzung dieses Analyse-Tools erfolgen auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.
              </p>

              <h4 className="text-lg font-bold mb-2 mt-4">IP-Anonymisierung</h4>
              <p className="text-muted-foreground">
                Wir haben auf dieser Website die Funktion IP-Anonymisierung aktiviert. Dadurch wird Ihre IP-Adresse von Google innerhalb von Mitgliedstaaten der Europäischen Union vor der Übermittlung in die USA gekürzt.
              </p>

              <h4 className="text-lg font-bold mb-2 mt-4">Browser Plugin</h4>
              <p className="text-muted-foreground">
                Sie können die Erfassung durch Google Analytics verhindern, indem Sie das Browser-Plugin herunterladen: <a href="https://tools.google.com/dlpage/gaoptout?hl=de" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">tools.google.com/dlpage/gaoptout</a>
              </p>

              <h3 className="text-xl font-bold mb-4 mt-6">Google Ads</h3>
              <p className="text-muted-foreground">
                Der Websitebetreiber verwendet Google Ads. Google Ads ist ein Online-Werbeprogramm der Google Ireland Limited. Die Nutzung von Google Ads erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.
              </p>

              <h3 className="text-xl font-bold mb-4 mt-6">Google Tag Manager</h3>
              <p className="text-muted-foreground">
                Wir setzen den Google Tag Manager ein. Der Google Tag Manager selbst erstellt keine Nutzerprofile, speichert keine Cookies und nimmt keine eigenständigen Analysen vor. Er dient lediglich der Verwaltung und Ausspielung der über ihn eingebundenen Tools.
              </p>

              <h3 className="text-xl font-bold mb-4 mt-6">Meta Pixel (ehemals Facebook Pixel)</h3>
              <p className="text-muted-foreground">
                Diese Website nutzt zur Konversionsmessung der Besucheraktions-Pixel von Facebook/Meta. Die Nutzung dieses Dienstes erfolgt auf Grundlage Ihrer Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG. Die Einwilligung ist jederzeit widerrufbar.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold mb-6 text-primary">7. Plugins, Tools und Externe Medien</h2>
              
              <h3 className="text-xl font-bold mb-4">Google Web Fonts (lokales Hosting)</h3>
              <p className="text-muted-foreground">
                Diese Seite nutzt zur einheitlichen Darstellung von Schriftarten so genannte Web Fonts, die von Google bereitgestellt werden. Die Google Fonts sind lokal installiert. Eine Verbindung zu Servern von Google findet dabei nicht statt.
              </p>

              <h3 className="text-xl font-bold mb-4 mt-6">YouTube mit erweitertem Datenschutz</h3>
              <p className="text-muted-foreground">
                Diese Website bindet Videos der Website YouTube ein. Wir nutzen YouTube im erweiterten Datenschutzmodus. Dieser Modus bewirkt laut YouTube, dass YouTube keine Informationen über die Besucher auf dieser Website speichert, bevor diese sich das Video ansehen.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold mb-6 text-primary">8. Rechte der Betroffenen (Ihre Rechte)</h2>
              <p className="text-muted-foreground mb-4">
                Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li><strong>Auskunft (Art. 15 DSGVO):</strong> Sie können Informationen über Ihre von uns verarbeiteten personenbezogenen Daten verlangen.</li>
                <li><strong>Berichtigung (Art. 16 DSGVO):</strong> Sie können die Berichtigung unrichtiger oder Vervollständigung Ihrer bei uns gespeicherten Daten verlangen.</li>
                <li><strong>Löschung (Art. 17 DSGVO):</strong> Sie können die Löschung Ihrer Daten verlangen, sofern keine gesetzlichen Aufbewahrungspflichten entgegenstehen.</li>
                <li><strong>Einschränkung der Verarbeitung (Art. 18 DSGVO):</strong> Sie können die Einschränkung der Verarbeitung Ihrer Daten verlangen.</li>
                <li><strong>Datenübertragbarkeit (Art. 20 DSGVO):</strong> Sie können Ihre Daten in einem strukturierten, gängigen Format erhalten.</li>
                <li><strong>Widerspruch (Art. 21 DSGVO):</strong> Sie können der Datenverarbeitung widersprechen, sofern diese auf Grundlage eines berechtigten Interesses erfolgt.</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                Zur Ausübung dieser Rechte können Sie sich jederzeit unter den im <Link href="/impressum" className="text-primary hover:underline">Impressum</Link> angegebenen Kontaktdaten an uns wenden.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold mb-6 text-primary">9. Google Maps</h2>
              <p className="text-muted-foreground">
                Diese Seite nutzt den Kartendienst Google Maps. Anbieter ist die Google Ireland Limited („Google"), Gordon House, Barrow Street, Dublin 4, Irland.
              </p>
              <p className="text-muted-foreground mt-2">
                Zur Nutzung der Funktionen von Google Maps ist es notwendig, Ihre IP-Adresse zu speichern. Die Nutzung von Google Maps erfolgt im Interesse einer ansprechenden Darstellung unserer Online-Angebote (Art. 6 Abs. 1 lit. f DSGVO).
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold mb-6 text-primary">10. Speicherdauer und Löschkonzept</h2>
              <p className="text-muted-foreground">
                Wir speichern Ihre personenbezogenen Daten nur so lange, wie es für die Erreichung der hier genannten Zwecke erforderlich ist oder wie es die vom Gesetzgeber vorgesehenen vielfältigen Speicherfristen vorsehen.
              </p>
              <p className="text-muted-foreground mt-2">
                Nach Fortfall des jeweiligen Zweckes bzw. Ablauf dieser Fristen werden die entsprechenden Daten routinemäßig und entsprechend den gesetzlichen Vorschriften gesperrt oder gelöscht. Für buchhalterische Daten (Rechnungen) beträgt die gesetzliche Aufbewahrungsfrist in Deutschland 10 Jahre (§ 147 AO).
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold mb-6 text-primary">11. Auftragsverarbeitung</h2>
              <p className="text-muted-foreground">
                Wir haben mit unseren externen Dienstleistern (z. B. Webhoster, IT-Service) Verträge zur Auftragsverarbeitung (AVV) gemäß Art. 28 DSGVO abgeschlossen. Dies stellt sicher, dass diese Ihre Daten streng nach unseren Weisungen und unter Einhaltung höchster Sicherheitsstandards verarbeiten.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold mb-6 text-primary">12. Datenerhebung auf dieser Website</h2>
              <p className="text-muted-foreground">
                Auf unserer Website werden verschiedene Daten erhoben, die für den technischen Betrieb und die Verbesserung unseres Angebots erforderlich sind. Nachfolgend erläutern wir die einzelnen Erhebungsvorgänge im Detail.
              </p>

              <h3 className="text-xl font-bold mb-4 mt-6">Server-Log-Dateien</h3>
              <p className="text-muted-foreground">
                Bei jedem Zugriff auf unsere Website werden automatisch Informationen in Server-Log-Dateien gespeichert, die Ihr Browser automatisch übermittelt. Dazu gehören unter anderem die IP-Adresse, der verwendete Browser und das Betriebssystem, die Referrer-URL sowie Datum und Uhrzeit des Zugriffs. Diese Daten werden ausschließlich zur Sicherstellung eines störungsfreien Betriebs der Website und zur Verbesserung unseres Angebots ausgewertet. Eine Zusammenführung mit anderen Datenquellen findet nicht statt. Die Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse).
              </p>

              <h3 className="text-xl font-bold mb-4 mt-6">Kontaktformular und Anfragen</h3>
              <p className="text-muted-foreground">
                Wenn Sie uns über das Kontaktformular oder per E-Mail eine Anfrage senden, werden die von Ihnen angegebenen Daten (Name, E-Mail-Adresse, Telefonnummer, Nachricht) zur Bearbeitung Ihrer Anfrage gespeichert. Diese Daten werden nicht ohne Ihre Einwilligung an Dritte weitergegeben. Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrages zusammenhängt, oder auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO bei berechtigtem Interesse an der Bearbeitung Ihrer Anfrage.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold mb-6 text-primary">13. Cookies und Tracking-Technologien</h2>
              <p className="text-muted-foreground">
                Unsere Website verwendet Cookies und ähnliche Tracking-Technologien, um die Benutzererfahrung zu verbessern und statistische Auswertungen zu ermöglichen. Detaillierte Informationen finden Sie auch in unserer <Link href="/cookies" className="text-primary hover:underline">Cookie-Richtlinie</Link>.
              </p>

              <h3 className="text-xl font-bold mb-4 mt-6">Technisch notwendige Cookies</h3>
              <p className="text-muted-foreground">
                Technisch notwendige Cookies sind für den ordnungsgemäßen Betrieb unserer Website unerlässlich. Sie ermöglichen grundlegende Funktionen wie die Seitennavigation und den Zugriff auf geschützte Bereiche. Diese Cookies werden ohne Ihre Einwilligung gesetzt, da die Website ohne sie nicht funktionieren würde. Die Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.
              </p>

              <h3 className="text-xl font-bold mb-4 mt-6">Analyse-Tools und Reichweitenmessung</h3>
              <p className="text-muted-foreground">
                Wir setzen Analyse-Tools ein, um die Nutzung unserer Website statistisch auszuwerten und unser Angebot zu verbessern. Die dabei verwendeten Cookies werden nur nach Ihrer ausdrücklichen Einwilligung gesetzt. Sie können Ihre Einwilligung jederzeit über die Cookie-Einstellungen auf unserer Website widerrufen. Die Rechtsgrundlage für die Verarbeitung ist Art. 6 Abs. 1 lit. a DSGVO (Einwilligung).
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold mb-6 text-primary">14. Ihre Rechte als Betroffener</h2>
              <p className="text-muted-foreground">
                Nach der Datenschutz-Grundverordnung stehen Ihnen umfassende Rechte hinsichtlich der Verarbeitung Ihrer personenbezogenen Daten zu. Diese Rechte können Sie jederzeit gegenüber uns geltend machen.
              </p>

              <h3 className="text-xl font-bold mb-4 mt-6">Auskunft, Berichtigung und Löschung</h3>
              <p className="text-muted-foreground">
                Sie haben das Recht, jederzeit unentgeltlich Auskunft über die bei uns gespeicherten personenbezogenen Daten zu erhalten (Art. 15 DSGVO). Darüber hinaus können Sie die Berichtigung unrichtiger Daten (Art. 16 DSGVO) sowie die Löschung Ihrer Daten verlangen, sofern keine gesetzlichen Aufbewahrungspflichten entgegenstehen (Art. 17 DSGVO). Zur Ausübung dieser Rechte genügt eine formlose Mitteilung an die im Impressum angegebene Kontaktadresse.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold mb-6 text-primary">15. Datensicherheit und technische Maßnahmen</h2>
              <p className="text-muted-foreground">
                Wir setzen umfangreiche technische und organisatorische Maßnahmen ein, um Ihre personenbezogenen Daten vor unberechtigtem Zugriff, Verlust oder Missbrauch zu schützen.
              </p>

              <h3 className="text-xl font-bold mb-4 mt-6">SSL/TLS-Verschlüsselung</h3>
              <p className="text-muted-foreground">
                Unsere Website nutzt eine SSL- bzw. TLS-Verschlüsselung für die sichere Übertragung aller Daten. Dies gewährleistet, dass Ihre Eingaben – insbesondere bei Kontaktformularen und Anfragen – verschlüsselt an unseren Server übermittelt werden. Eine verschlüsselte Verbindung erkennen Sie am Schloss-Symbol in der Browserleiste und am Präfix „https://" in der Adresszeile.
              </p>

              <h3 className="text-xl font-bold mb-4 mt-6">Auftragsverarbeitung nach Art. 28 DSGVO</h3>
              <p className="text-muted-foreground">
                Mit allen externen Dienstleistern, die in unserem Auftrag personenbezogene Daten verarbeiten, haben wir Verträge zur Auftragsverarbeitung (AVV) gemäß Art. 28 DSGVO abgeschlossen. Diese Verträge stellen sicher, dass unsere Partner Ihre Daten ausschließlich nach unseren Weisungen und unter Einhaltung der geltenden Datenschutzbestimmungen verarbeiten. Regelmäßige Überprüfungen stellen die Einhaltung der vereinbarten Sicherheitsstandards sicher.
              </p>
            </section>

            <section className="border-t pt-8 mt-8">
              <p className="text-sm text-muted-foreground">
                <strong>Stand:</strong> 2026 – Diese Datenschutzerklärung wurde gemäß den aktuellen Anforderungen der DSGVO und des TDDDG erstellt.
              </p>
            </section>

            <section className="border-t pt-8">
              <h2 className="text-xl font-bold mb-4">Weitere rechtliche Informationen</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link href="/impressum" className="text-primary hover:underline">Impressum</Link></li>
                <li><Link href="/agb" className="text-primary hover:underline">Allgemeine Geschäftsbedingungen (AGB)</Link></li>
                <li><Link href="/cookies" className="text-primary hover:underline">Cookie-Richtlinie</Link></li>
              </ul>
            </section>

          </div>
        </div>
      </main>

      <SeoFooter />
    </div>
  );
}
