import { Link } from "wouter";
import { SiteHeader } from "@/components/site-header";
import { PageHero } from "@/components/page-hero";
import { SeoFooter } from "@/components/seo-footer";
import { Breadcrumb } from "@/components/breadcrumb";
import { SeoHead } from "@/components/seo-head";

export default function AGB() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SeoHead
        title="AGB | KSHW München - Allgemeine Geschäftsbedingungen"
        description="Allgemeine Geschäftsbedingungen von KSHW München. Informationen für Interessenten und Handwerkerpartner zu Leistungen, Haftung und Vertragsgestaltung."
        canonicalPath="/agb"
      />
      <SiteHeader />
      <PageHero 
        title="AGB" 
        subtitle="Allgemeine Geschäftsbedingungen"
        showCta={false}
        compact={true}
      />
      <Breadcrumb items={[{ label: "AGB" }]} />

      <main className="pb-16 flex-1">
        <div className="max-w-3xl mx-auto px-4 lg:px-8">

          <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">

            <section>
              <h2 className="text-xl font-bold mb-4">Teil A: AGB für Interessenten (Endkunden)</h2>
            </section>
            
            <section>
              <h3 className="text-lg font-bold mb-4">Geltungsbereich</h3>
              <p className="text-muted-foreground">
                a. Die nachfolgenden Allgemeinen Geschäftsbedingungen („AGB") gelten für die Nutzung des auf der Website 089-sanierer.de bereitgestellten Dienstes. Betreiber dieses Angebots ist KSHW München, Zielstattstr. 9, 81379 München, im Folgenden „wir" oder „uns" genannt.
              </p>
              <p className="text-muted-foreground mt-4">
                b. Diese AGB regeln das vertragliche Verhältnis zwischen uns und den Nutzern unseres Dienstes, im Folgenden als „Interessenten" bezeichnet.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-bold mb-4">Unsere Leistungen</h3>
              <p className="text-muted-foreground">
                a. Über unsere Website haben Interessenten die Möglichkeit, eine Anfrage zu stellen, um unverbindliche und kostenfreie Angebote für Produkte und Dienstleistungen im Bereich Immobilienmodernisierung und -sanierung zu erhalten. Die eingegangene Anfrage wird hierfür an eine begrenzte Zahl von kooperierenden Partnerunternehmen („Anbieter") weitergeleitet, die dann mit dem Interessenten in Kontakt treten können.
              </p>
              <p className="text-muted-foreground mt-4">
                <strong>Wichtiger Hinweis:</strong> Eine Übermittlung Ihrer persönlichen Daten an Partnerunternehmen erfolgt ausschließlich nach vorheriger telefonischer Einwilligung. Näheres entnehmen Sie bitte unserer <Link href="/datenschutz" className="text-primary hover:underline">Datenschutzerklärung</Link>.
              </p>
              <p className="text-muted-foreground mt-4">
                b. Die Nutzung unseres Dienstes ist für den Interessenten mit keinen Kosten verbunden.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-bold mb-4">Zustandekommen eines Vertrages, Vertragsdokumentation, Sprache</h3>
              <p className="text-muted-foreground">
                a. Die Präsentation unserer Dienstleistung auf der Website stellt noch kein bindendes Angebot auf Abschluss eines Vermittlungsvertrages dar. Ein Angebot zum Abschluss eines unentgeltlichen Vermittlungsvertrages erfolgt erst durch die Absendung einer Anfrage durch den Interessenten. Wird diese Anfrage von uns akzeptiert, so erfolgt eine Bestätigung entweder unmittelbar auf der Website oder per E-Mail. Erst mit dieser Bestätigung kommt ein Vertrag zustande.
              </p>
              <p className="text-muted-foreground mt-4">
                b. Die Vertragsinhalte inklusive dieser AGB werden von uns gespeichert. Der Interessent kann diese über die Druck- oder Speicherfunktion seines Browsers sichern. Die aktuell gültige Version der AGB kann jederzeit auf der Website eingesehen werden; ältere Versionen sind nicht mehr verfügbar.
              </p>
              <p className="text-muted-foreground mt-4">
                c. Die Vertragssprache ist Deutsch.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-bold mb-4">Pflichten des Interessenten</h3>
              <p className="text-muted-foreground">
                Der Interessent ist verpflichtet, bei der Nutzung unseres Angebots wahrheitsgemäße und vollständige Angaben zu machen.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-bold mb-4">Haftungsausschluss und -begrenzung</h3>
              <p className="text-muted-foreground">
                a. Wir haften für Schäden ausschließlich bei Vorsatz oder grober Fahrlässigkeit. Bei einfacher Fahrlässigkeit haften wir nur, sofern eine wesentliche Vertragspflicht („Kardinalpflicht") verletzt wurde – also eine Pflicht, deren Einhaltung für die ordnungsgemäße Vertragserfüllung unerlässlich ist und auf die der Vertragspartner regelmäßig vertrauen darf.
              </p>
              <p className="text-muted-foreground mt-4">
                b. Die Haftung bei einfacher Fahrlässigkeit ist in jedem Fall auf den typischen, bei Vertragsschluss vorhersehbaren Schaden beschränkt.
              </p>
              <p className="text-muted-foreground mt-4">
                c. Die genannten Haftungsausschlüsse und -begrenzungen gelten nicht für Ansprüche nach dem Produkthaftungsgesetz sowie bei Schäden an Leben, Körper oder Gesundheit.
              </p>
              <p className="text-muted-foreground mt-4">
                d. Diese Haftungsregelungen gelten ebenfalls für unsere gesetzlichen Vertreter, Mitarbeitenden sowie Erfüllungsgehilfen.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-bold mb-4">Anwendbares Recht, Gerichtsstand, Teilnichtigkeit</h3>
              <p className="text-muted-foreground">
                a. Es gilt deutsches Recht. Bei Verbrauchern gilt diese Rechtswahl nur, soweit keine zwingenden gesetzlichen Regelungen des Landes eingeschränkt werden, in dem der Verbraucher seinen Wohnsitz oder gewöhnlichen Aufenthalt hat.
              </p>
              <p className="text-muted-foreground mt-4">
                b. Hat der Interessent oder ein Anbieter keinen allgemeinen Gerichtsstand in Deutschland oder einem anderen EU-Mitgliedsstaat, oder handelt es sich um einen Kaufmann, oder wird der Wohnsitz nach Inkrafttreten dieser AGB ins Ausland verlegt, oder ist der Wohnsitz oder gewöhnliche Aufenthaltsort im Zeitpunkt der Klageerhebung nicht bekannt, so ist der Gerichtsstand am Sitz unseres Unternehmens.
              </p>
              <p className="text-muted-foreground mt-4">
                c. Sollte eine Bestimmung dieser AGB ganz oder teilweise unwirksam sein oder im Widerspruch zu gesetzlichen Vorschriften stehen, bleibt die Wirksamkeit der übrigen Bestimmungen davon unberührt.
              </p>
            </section>

            <section className="border-t pt-8 mt-8">
              <h2 className="text-xl font-bold mb-4">Teil B: AGB für Partner (Gewerbliche Vertragspartner)</h2>
              <p className="text-muted-foreground mb-4">
                der KSHW München – Marke 089-sanierer – für die Lieferung von Sanierungs-Leads an gewerbliche Vertragspartner.
              </p>
              <p className="text-muted-foreground text-sm">Stand: Dezember 2025</p>
            </section>

            <section>
              <h3 className="text-lg font-bold mb-4">§ 1 Geltungsbereich und Vertragspartner</h3>
              <p className="text-muted-foreground">
                Diese Allgemeinen Geschäftsbedingungen (AGB) regeln die vertraglichen Beziehungen zwischen der KSHW München, Zielstattstr. 9, 81379 München, handelnd unter der Marke 089-sanierer (nachfolgend „KSHW München" oder „Anbieter") und dem jeweiligen gewerblichen Vertragspartner („Vertragspartner"), der von KSHW München Leads bezieht.
              </p>
              <p className="text-muted-foreground mt-4">
                Diese AGB gelten ausschließlich gegenüber Unternehmern im Sinne des § 14 BGB. Der Vertragspartner bestätigt mit Abschluss, dass er nicht als Verbraucher handelt.
              </p>
              <p className="text-muted-foreground mt-4">
                Abweichende oder entgegenstehende Bedingungen des Vertragspartners werden nicht anerkannt, es sei denn, KSHW München hat deren Geltung ausdrücklich in Textform bestätigt.
              </p>
              <p className="text-muted-foreground mt-4">
                Mit Absenden des Onlineformulars unter Anerkennung dieser AGB und Betätigung des Abschlussbuttons gibt der Vertragspartner ein verbindliches Angebot auf Abschluss des Vertrages ab. Der Vertrag kommt mit der Annahme durch KSHW München zustande, die ausdrücklich oder konkludent durch die Lieferung der ersten Leads erfolgt.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-bold mb-4">§ 2 Vertragsgegenstand</h3>
              <p className="text-muted-foreground">
                Gegenstand des Vertrages ist die Lieferung von Leads durch KSHW München an den Vertragspartner.
              </p>
              <p className="text-muted-foreground mt-4">
                Leads sind Datensätze von Personen, die über Online-Formulare der Marke 089-sanierer oder über sonstige rechtmäßig beauftragte oder eingebundene Partnerkanäle eine unverbindliche Anfrage zu Sanierungs-, Modernisierungs- oder Renovierungsleistungen gestellt und hierbei der Weitergabe ihrer Daten an Partnerunternehmen von KSHW München zugestimmt haben.
              </p>
              <p className="text-muted-foreground mt-4">
                Die Leads werden dem Vertragspartner für das im Onlineformular angegebene Gebiet (Postleitzahl + Umkreis in Luftlinienkilometern) zur Verfügung gestellt. Geringfügige Abweichungen von bis zu 5 Kilometern Luftlinie bezogen auf die jeweilige Ortsgrenze gelten als vertragsgemäß.
              </p>
              <p className="text-muted-foreground mt-4">
                Die Leads können an bis zu zwei weitere geeignete Partnerunternehmen zur Verfügung gestellt werden.
              </p>
              <p className="text-muted-foreground mt-4">
                KSHW München liefert Leads, die auf Selbstauskünften der Interessenten beruhen. Die angegebenen Daten werden technisch auf Plausibilität geprüft und zusätzlich im Rahmen eines telefonischen Kontakts durch Mitarbeiter von KSHW München überprüft.
              </p>
              <p className="text-muted-foreground mt-4">
                Im Telefonat wird insbesondere sichergestellt, dass die angegebene Telefonnummer erreichbar ist, die wesentlichen Angaben zum Vorhaben mit dem Interessenten abgestimmt werden und dieser ausdrücklich der Weitergabe seiner Daten an Partnerunternehmen zustimmt. Eine weitergehende persönliche oder wirtschaftliche Prüfung des Interessenten erfolgt nicht. Das tatsächliche Verhalten, die Erreichbarkeit oder das Interesse des Interessenten kann naturgemäß nicht beeinflusst werden.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-bold mb-4">§ 3 Leistungen des Anbieters</h3>
              <p className="text-muted-foreground">
                KSHW München liefert dem Vertragspartner die Leads in elektronischer Form, in der Regel per E-Mail.
              </p>
              <p className="text-muted-foreground mt-4">
                Der Anbieter ist nicht verpflichtet, eine bestimmte Anzahl von Leads oder eine Mindestmenge zu liefern. Die tatsächliche Liefermenge richtet sich nach der Verfügbarkeit geeigneter Anfragen innerhalb des vereinbarten Zeitraums.
              </p>
              <p className="text-muted-foreground mt-4">
                Der Vertragspartner nutzt die übermittelten Leads zur eigenen gewerblichen Kontaktaufnahme. Zwischen KSHW München und den Interessenten besteht kein Vertragsverhältnis.
              </p>
              <p className="text-muted-foreground mt-4">
                Nach Übermittlung des Leads steht es dem Vertragspartner frei, mit dem Interessenten weitere Gespräche oder Geschäfte zu führen. Etwaige Folgeaufträge oder Vertragsabschlüsse zwischen dem Vertragspartner und dem Interessenten begründen keine zusätzlichen Ansprüche oder Zahlungsverpflichtungen gegenüber KSHW München.
              </p>
              <p className="text-muted-foreground mt-4">
                Sämtliche auf der Website, in Präsentationen oder in sonstigen Informationsmedien enthaltenen Angaben über Art, Umfang und Qualität der Leads oder Leistungen dienen ausschließlich der allgemeinen Beschreibung und stellen keine verbindliche Zusicherung oder Garantie dar.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-bold mb-4">§ 4 Pflichten des Vertragspartners</h3>
              <p className="text-muted-foreground">
                Der Vertragspartner verpflichtet sich, alle von KSHW München gelieferten Leads vertraulich zu behandeln und ausschließlich für die eigene gewerbliche Tätigkeit im Rahmen von Sanierungs-, Modernisierungs- oder Renovierungsleistungen zu verwenden.
              </p>
              <p className="text-muted-foreground mt-4">
                Eine Weitergabe oder der Verkauf der übermittelten Daten an Dritte ist nur mit vorheriger schriftlicher Zustimmung von KSHW München und unter Beachtung der geltenden Datenschutzvorschriften zulässig.
              </p>
              <p className="text-muted-foreground mt-4">
                Der Vertragspartner hat die übermittelten personenbezogenen Daten gemäß den Vorgaben der Datenschutz-Grundverordnung (DSGVO), insbesondere nach Art. 13, 14 und 32 DSGVO, zu verarbeiten und die jeweiligen Interessenten entsprechend zu informieren.
              </p>
              <p className="text-muted-foreground mt-4">
                Der Vertragspartner ist verpflichtet, die von KSHW München übermittelten Leads zeitnah zu bearbeiten und die Interessenten in angemessener Form zu kontaktieren. Die Kommunikation hat stets professionell, sachlich und respektvoll zu erfolgen.
              </p>
              <p className="text-muted-foreground mt-4">
                Der Vertragspartner ist verpflichtet, KSHW München unverzüglich alle Änderungen seiner Kontaktdaten, insbesondere der E-Mail-Adresse für die Lead-Lieferung und Rechnungsstellung, mitzuteilen. Zustellungen an die zuletzt bekannte E-Mail-Adresse gelten als ordnungsgemäß.
              </p>
              <p className="text-muted-foreground mt-4">
                Der Vertragspartner ist dafür verantwortlich, alle gesetzlichen Vorschriften im Zusammenhang mit seiner Tätigkeit einzuhalten, insbesondere im Hinblick auf Verbraucherrechte, Wettbewerbsrecht, Datenschutz und steuerrechtliche Pflichten.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-bold mb-4">§ 5 Vergütung und Zahlungsbedingungen</h3>
              <p className="text-muted-foreground">
                Die vom Vertragspartner im Onlineformular angegebene gewünschte Anzahl an Leads – je Produktkategorie und je Woche oder in der dort definierten Frequenz – stellt die vereinbarte Berechnungsgrundlage für die monatliche Gesamtmenge der Lead-Lieferung dar.
              </p>
              <p className="text-muted-foreground mt-4">
                Der Vertragspartner verpflichtet sich, die tatsächlich gelieferten Leads bis zu dieser Gesamtmenge pro Monat abzunehmen und zu vergüten, soweit KSHW München entsprechende Leads anbietet und liefert.
              </p>
              <p className="text-muted-foreground mt-4">
                KSHW München übernimmt keine Verpflichtung, eine bestimmte Anzahl von Leads pro Woche oder pro Monat zu liefern oder eine durchgehende Lieferbarkeit zu gewährleisten und ist berechtigt, die Liefermenge nach eigenem Ermessen zu variieren.
              </p>
              <p className="text-muted-foreground mt-4">
                Die Lead-Gebühren werden am Ende eines Monats für alle gelieferten Leads abgerechnet. Die Rechnung wird elektronisch übermittelt; der Rechnungsbetrag ist sofort fällig.
              </p>
              <p className="text-muted-foreground mt-4">
                Die Gebühr ist unabhängig von der Richtigkeit, Vollständigkeit oder Erreichbarkeit des Kunden zu entrichten.
              </p>
              <p className="text-muted-foreground mt-4">
                Anerkannte Reklamationen liegen ausschließlich in den folgenden Fällen vor:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1 mt-2">
                <li>der identische Lead wurde mehrfach an den Vertragspartner geliefert (Dublettenfall), oder</li>
                <li>der gelieferte Lead befindet sich außerhalb des vom Vertragspartner gebuchten Umkreises (Toleranz: bis zu 5 Kilometer), oder</li>
                <li>der gelieferte Lead entspricht nicht der im Onlineformular ausgewählten Kategorie.</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                Reklamationen aufgrund fehlenden oder nachträglich entfallenen Projektinteresses, aufgrund nicht erreichbarer, nicht reagierender oder nicht rückrufender Interessenten sind ausgeschlossen, da diese Umstände außerhalb des Einflussbereichs von KSHW München liegen.
              </p>
              <p className="text-muted-foreground mt-4">
                Eine entsprechende Mitteilung an KSHW München muss innerhalb von fünf (5) Werktagen nach Zuführung des Leads per E-Mail erfolgen.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-bold mb-4">§ 6 Laufzeit und Kündigung</h3>
              <p className="text-muted-foreground">
                Der Vertrag wird auf unbestimmte Zeit geschlossen.
              </p>
              <p className="text-muted-foreground mt-4">
                Der Vertrag kann von beiden Parteien mit einer Frist von einem Monat zum Monatsende ordentlich gekündigt werden.
              </p>
              <p className="text-muted-foreground mt-4">
                Das Recht zur außerordentlichen Kündigung aus wichtigem Grund bleibt unberührt.
              </p>
              <p className="text-muted-foreground mt-4">
                Kündigungen bedürfen zu ihrer Wirksamkeit der Textform (E-Mail oder Brief) und sind an folgende Adresse zu richten: <a href="mailto:info@komplettsanierungen-haus-wohnung.de" className="text-primary hover:underline">info@komplettsanierungen-haus-wohnung.de</a>
              </p>
            </section>

            <section>
              <h3 className="text-lg font-bold mb-4">§ 7 Widerruf und Rücktritt</h3>
              <p className="text-muted-foreground">
                Da der Vertragspartner Unternehmer ist (§ 14 BGB), besteht kein gesetzliches Widerrufsrecht.
              </p>
              <p className="text-muted-foreground mt-4">
                Ein freiwilliges Widerrufsrecht wird nicht eingeräumt.
              </p>
              <p className="text-muted-foreground mt-4">
                Ein Rücktritt vom Vertrag ist nur nach den gesetzlichen Bestimmungen oder aufgrund ausdrücklicher Vereinbarung in Textform möglich.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-bold mb-4">§ 8 Haftung und Gewährleistung</h3>
              <p className="text-muted-foreground">
                KSHW München haftet nicht für die Richtigkeit, Vollständigkeit oder Aktualität der von den Interessenten angegebenen Daten.
              </p>
              <p className="text-muted-foreground mt-4">
                Für etwaige Schäden oder Ansprüche aus den vom Vertragspartner durchgeführten Beratungen, Besichtigungen, Sanierungsleistungen oder sonstigen Tätigkeiten haftet allein der Vertragspartner.
              </p>
              <p className="text-muted-foreground mt-4">
                Der Vertragspartner stellt KSHW München von sämtlichen Ansprüchen Dritter frei, die im Zusammenhang mit seiner Tätigkeit gegenüber den Interessenten entstehen.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-bold mb-4">§ 9 Datenschutz</h3>
              <p className="text-muted-foreground">
                Die Verarbeitung personenbezogener Daten erfolgt gemäß unserer <Link href="/datenschutz" className="text-primary hover:underline">Datenschutzerklärung</Link> und den geltenden datenschutzrechtlichen Bestimmungen (DSGVO, BDSG).
              </p>
            </section>

            <section>
              <h3 className="text-lg font-bold mb-4">§ 10 Vertraulichkeit und Schutzrechte</h3>
              <p className="text-muted-foreground">
                Der Vertragspartner verpflichtet sich, alle ihm im Rahmen der Zusammenarbeit bekannt gewordenen Geschäftsgeheimnisse und vertraulichen Informationen von KSHW München vertraulich zu behandeln und nicht an Dritte weiterzugeben.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-bold mb-4">§ 11 Schlussbestimmungen</h3>
              <p className="text-muted-foreground">
                Es gilt deutsches Recht unter Ausschluss des UN-Kaufrechts.
              </p>
              <p className="text-muted-foreground mt-4">
                Gerichtsstand für alle Streitigkeiten aus diesem Vertragsverhältnis ist München, sofern der Vertragspartner Kaufmann, juristische Person des öffentlichen Rechts oder öffentlich-rechtliches Sondervermögen ist.
              </p>
              <p className="text-muted-foreground mt-4">
                Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden, berührt dies die Wirksamkeit der übrigen Bestimmungen nicht.
              </p>
            </section>

            <section className="border-t pt-8 mt-8">
              <h2 className="text-xl font-bold mb-4">Kontakt</h2>
              <p className="text-muted-foreground">
                KSHW München<br />
                Zielstattstr. 9<br />
                81379 München<br /><br />
                E-Mail: <a href="mailto:info@komplettsanierungen-haus-wohnung.de" className="text-primary hover:underline">info@komplettsanierungen-haus-wohnung.de</a><br />
                Telefon: 0152 122 740 43
              </p>
            </section>

            <section className="border-t pt-8 mt-8">
              <h2 className="text-xl font-bold mb-4">Weitere rechtliche Informationen</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link href="/impressum" className="text-primary hover:underline">Impressum</Link></li>
                <li><Link href="/datenschutz" className="text-primary hover:underline">Datenschutzerklärung</Link></li>
              </ul>
            </section>

          </div>
        </div>
      </main>

      <SeoFooter />
    </div>
  );
}
