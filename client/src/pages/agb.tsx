import { Link } from "wouter";
import { SiteHeader } from "@/components/site-header";
import { GlobalHero, HeroContent } from "@/components/global-hero";
import { SeoFooter } from "@/components/seo-footer";
import { Breadcrumb } from "@/components/breadcrumb";
import { SeoHead } from "@/components/seo-head";
import agbHeroImage from "@assets/generated_images/business_contract_agb.webp";

const agbHeroContent: HeroContent = {
  backgroundImage: agbHeroImage,
  badge: "Faire Vertragsbedingungen",
  titleLine1: "AGB.",
  titleLine2: "Transparente Geschäftsbedingungen.",
  descriptions: ["KSHW München – Ihr exklusiver Projekt-Kurator.", "Klare Verträge ohne versteckte Klauseln."],
  strongText: "Rechtsgrundlagen Stand 2026.",
  ctaText: "Jetzt exklusives Festpreis-Konzept anfordern",
  ctaLink: "/anfrage",
  checkmarks: ["Festpreisgarantie", "5 Jahre Gewährleistung", "98% Weiterempfehlung"],
  dataTestIdPrefix: "agb"
};

export default function AGB() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SeoHead
        title="AGB | 089-sanierer.de | Allgemeine Geschäftsbedingungen"
        description="Allgemeine Geschäftsbedingungen für Sanierungsleistungen. Bauvertragsrecht, Verbraucherschutz, Gewährleistung. KSHW München."
        keywords="AGB Sanierung München, Allgemeine Geschäftsbedingungen Renovierung, Bauvertrag München, Sanierungsvertrag AGB, Handwerker AGB Bayern, Komplettsanierung Vertragsbedingungen"
        canonicalPath="/agb"
      />
      <SiteHeader />
      <GlobalHero content={agbHeroContent} />
      <Breadcrumb items={[{ label: "AGB" }]} />

      <main className="pb-16 flex-1">
        <div className="max-w-4xl mx-auto px-6">

          <div className="prose prose-lg dark:prose-invert max-w-none space-y-6">

            <section className="bg-muted/30 p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4">Rechtsgrundlagen dieser AGB (Stand 2026)</h2>
              <p className="text-muted-foreground mb-4">
                Diese AGB wurden gemäß den aktuellen gesetzlichen Anforderungen für das Baugewerbe erstellt und berücksichtigen insbesondere:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li><strong>BGB §§ 631-651</strong> (Werkvertragsrecht) – Grundlagen des Werkvertrags</li>
                <li><strong>BGB §§ 650a-650h</strong> (Bauvertragsrecht) – Spezielle Regelungen für Bauverträge seit 01.01.2018</li>
                <li><strong>BGB §§ 650i-650n</strong> (Verbraucherbauvertrag) – Besonderer Schutz für Verbraucher</li>
                <li><strong>BGB §§ 305-310</strong> (AGB-Recht) – Inhaltskontrolle und Einbeziehung</li>
                <li><strong>DSGVO & BDSG</strong> – Datenschutzrechtliche Anforderungen</li>
                <li><strong>VOB/B 2019</strong> – Vergabe- und Vertragsordnung für Bauleistungen (bei B2B-Verträgen)</li>
              </ul>
            </section>

            <section className="bg-primary/10 p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4">Hinweis zum Vertragsabschluss</h2>
              <p className="text-muted-foreground">
                Die auf dieser Website dargestellten Inhalte, Leistungen und Informationen stellen kein verbindliches Angebot im rechtlichen Sinne dar.
                Ein Vertragsabschluss über diese Website findet nicht statt.
              </p>
              <p className="text-muted-foreground mt-4">
                Anfragen über Kontaktformulare, E-Mail oder Telefon dienen ausschließlich der unverbindlichen Kontaktaufnahme und der Vorbereitung einer individuellen Angebotserstellung.
                Ein Vertrag kommt erst nach persönlicher Abstimmung, Besichtigung vor Ort und ausdrücklicher Annahme eines schriftlichen Angebots zustande.
              </p>
              <p className="text-muted-foreground mt-4">
                Es erfolgt keine kostenpflichtige Bestellung, keine Buchung und keine Online-Zahlung über diese Website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6 text-primary">1. Allgemeines und Vertragsschluss</h2>
              
              <h3 className="text-xl font-bold mb-4">§ 1 Geltungsbereich</h3>
              <p className="text-muted-foreground">
                (1) Die nachstehenden Allgemeinen Geschäftsbedingungen gelten für alle Rechtsgeschäfte der KSHW München, Mustafa Sakar, Hardenbergstraße 4, 80992 München, sowie Ali Kemal Kurt, Zielstattstr. 9, 81379 München (nachfolgend je nach Vertragspartner "Auftragnehmer" genannt) mit ihren Vertragspartnern (nachfolgend "Auftraggeber" genannt).
              </p>
              <p className="text-muted-foreground mt-4">
                (2) Diese AGB gelten für Werkverträge im Sinne der §§ 631 ff. BGB sowie für Bauverträge im Sinne des § 650a BGB. Bei Verträgen mit Verbrauchern (§ 13 BGB) gelten ergänzend die Bestimmungen zum Verbraucherbauvertrag (§§ 650i-650n BGB).
              </p>
              <p className="text-muted-foreground mt-4">
                (3) Abweichende, entgegenstehende oder ergänzende Allgemeine Geschäftsbedingungen des Auftraggebers werden nur dann Vertragsbestandteil, wenn und soweit der Auftragnehmer ihrer Geltung ausdrücklich schriftlich zugestimmt hat.
              </p>
              <p className="text-muted-foreground mt-4">
                (4) Diese AGB gelten gegenüber Unternehmern (§ 14 BGB) auch für alle zukünftigen Geschäftsbeziehungen.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold mb-4">§ 2 Vertragsgegenstand (Bauvertrag § 650a BGB)</h3>
              <p className="text-muted-foreground">
                (1) Der Auftragnehmer erbringt Werkleistungen im Bereich Sanierung, Renovierung und Baukoordination. Der genaue Leistungsumfang ergibt sich aus dem jeweiligen Angebot und der Leistungsbeschreibung.
              </p>
              <p className="text-muted-foreground mt-4">
                (2) Der Vertrag ist ein Bauvertrag im Sinne des § 650a Abs. 1 BGB, wenn er die Herstellung, die Wiederherstellung, die Beseitigung oder den Umbau eines Bauwerks, einer Außenanlage oder eines Teils davon zum Gegenstand hat.
              </p>
              <p className="text-muted-foreground mt-4">
                (3) Der Auftragnehmer ist berechtigt, zur Ausführung des Auftrags qualifizierte Subunternehmer und Partnerbetriebe heranzuziehen.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold mb-4">§ 3 Zustandekommen des Vertrages</h3>
              <p className="text-muted-foreground">
                (1) Angebote des Auftragnehmers sind freibleibend und unverbindlich, sofern sie nicht ausdrücklich als verbindlich gekennzeichnet sind. Die Angebotserstellung kann kostenpflichtig sein, wenn dies vorher vereinbart wurde.
              </p>
              <p className="text-muted-foreground mt-4">
                (2) Ein Vertrag kommt durch schriftliche Auftragserteilung (Brief, E-Mail, Fax) oder durch ausdrückliche mündliche Beauftragung mit schriftlicher Bestätigung zustande.
              </p>
              <p className="text-muted-foreground mt-4">
                (3) Bei Verbraucherbauverträgen (§ 650i BGB) erhält der Auftraggeber vor Vertragsschluss eine detaillierte Baubeschreibung gemäß § 650j BGB, die Gegenstand des Vertrages wird.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold mb-4">§ 4 Getrennte Gewerbebetriebe / Vertragspartner</h3>
              <p className="text-muted-foreground">
                (1) Die auf dieser Website dargestellten Leistungen werden von rechtlich selbstständigen Einzelgewerbebetrieben erbracht.
              </p>
              <p className="text-muted-foreground mt-4">
                (2) Vertragspartner des Kunden ist ausschließlich der im jeweiligen Angebot, Auftrag und in der Rechnung ausdrücklich benannte Gewerbebetrieb.
              </p>
              <p className="text-muted-foreground mt-4">
                (3) Eine gemeinschaftliche Leistungserbringung im Sinne einer Gesellschaft bürgerlichen Rechts (GbR) oder eine gesamtschuldnerische Haftung mehrerer Gewerbebetriebe ist nicht vereinbart und wird ausdrücklich ausgeschlossen.
              </p>
              <p className="text-muted-foreground mt-4">
                (4) Soweit Leistungen durch weitere, rechtlich selbstständige Partnerbetriebe ausgeführt werden, erfolgt dies im Auftrag und unter Verantwortung des jeweiligen Vertragspartners.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6 text-primary">2. Besondere Bestimmungen für Verbraucher</h2>
              
              <h3 className="text-xl font-bold mb-4">§ 5 Widerrufsrecht bei außerhalb von Geschäftsräumen geschlossenen Verträgen</h3>
              <div className="bg-primary/10 p-4 rounded-lg mb-4">
                <p className="font-bold mb-2">Widerrufsbelehrung (§§ 312g, 355 BGB)</p>
                <p className="text-muted-foreground">
                  <strong>Widerrufsrecht:</strong> Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsabschlusses.
                </p>
                <p className="text-muted-foreground mt-4">
                  Um Ihr Widerrufsrecht auszuüben, müssen Sie uns (KSHW München, Hardenbergstraße 4, 80992 München, E-Mail: info@089-sanierer.de, Tel: 089 444438872) mittels einer eindeutigen Erklärung (z. B. ein mit der Post versandter Brief oder E-Mail) über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren.
                </p>
                <p className="text-muted-foreground mt-4">
                  <strong>Folgen des Widerrufs:</strong> Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen erhalten haben, unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über Ihren Widerruf bei uns eingegangen ist. Haben Sie verlangt, dass die Dienstleistungen während der Widerrufsfrist beginnen sollen, so haben Sie uns einen angemessenen Betrag zu zahlen, der dem Anteil der bis zum Widerruf erbrachten Leistungen entspricht.
                </p>
              </div>
              <p className="text-muted-foreground">
                (1) Das Widerrufsrecht gilt nur für Verbraucher bei Verträgen, die außerhalb unserer Geschäftsräume geschlossen wurden (z.B. beim Kunden vor Ort).
              </p>
              <p className="text-muted-foreground mt-4">
                (2) Das Widerrufsrecht erlischt bei einem Vertrag zur Erbringung von Dienstleistungen, wenn der Auftragnehmer die Dienstleistung vollständig erbracht hat und mit der Ausführung erst begonnen hat, nachdem der Verbraucher ausdrücklich zugestimmt hat.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold mb-4">§ 6 Baubeschreibung (§ 650j BGB)</h3>
              <p className="text-muted-foreground">
                (1) Bei Verbraucherbauverträgen erhält der Auftraggeber rechtzeitig vor Abgabe seiner Vertragserklärung eine Baubeschreibung in Textform.
              </p>
              <p className="text-muted-foreground mt-4">
                (2) Die Baubeschreibung enthält die wesentlichen Eigenschaften des Bauwerks, insbesondere: Art und Umfang der Bauleistungen, Gebäudedaten, Beschreibung der Baukonstruktion, Ausbaustandards und technische Angaben.
              </p>
              <p className="text-muted-foreground mt-4">
                (3) Soweit die Baubeschreibung unvollständig oder unklar ist, ist der Vertrag zugunsten des Verbrauchers auszulegen (§ 650k Abs. 2 BGB).
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold mb-4">§ 7 Abschlagszahlungen bei Verbraucherverträgen (§ 650m BGB)</h3>
              <p className="text-muted-foreground">
                (1) Bei Verbraucherbauverträgen dürfen Abschlagszahlungen insgesamt maximal 90 % der vereinbarten Gesamtvergütung nicht übersteigen.
              </p>
              <p className="text-muted-foreground mt-4">
                (2) Der Auftragnehmer kann eine Abschlagszahlung in Höhe des Wertes der von ihm erbrachten und nach dem Vertrag geschuldeten Leistungen verlangen (§ 632a Abs. 1 BGB).
              </p>
              <p className="text-muted-foreground mt-4">
                (3) Die Schlusszahlung (mindestens 10 %) wird nach erfolgter Abnahme fällig.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6 text-primary">3. Ausführung und Vergütung</h2>
              
              <h3 className="text-xl font-bold mb-4">§ 8 Vergütung & Zahlungsbedingungen</h3>
              <p className="text-muted-foreground">
                (1) Es gelten die im Angebot vereinbarten Preise. Alle Preise verstehen sich in Euro netto zuzüglich der gesetzlichen Mehrwertsteuer, sofern nicht anders angegeben.
              </p>
              <p className="text-muted-foreground mt-4">
                (2) Zahlungen sind, sofern nicht anders vereinbart, innerhalb von 14 Tagen nach Rechnungsstellung ohne Abzug fällig.
              </p>
              <p className="text-muted-foreground mt-4">
                (3) Bei Zahlungsverzug ist der Auftragnehmer berechtigt, Verzugszinsen in Höhe von 5 Prozentpunkten über dem Basiszinssatz (bei Verbrauchern) bzw. 9 Prozentpunkten über dem Basiszinssatz (bei Unternehmern) zu verlangen (§§ 288, 247 BGB).
              </p>
              <p className="text-muted-foreground mt-4">
                (4) Abschlagszahlungen werden gemäß § 632a BGB nach Baufortschritt in Rechnung gestellt. Die Höhe der Abschläge richtet sich nach dem Wert der erbrachten Leistung.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold mb-4">§ 9 Anordnungsrecht des Auftraggebers (§ 650b BGB)</h3>
              <p className="text-muted-foreground">
                (1) Der Auftraggeber kann Änderungen des vereinbarten Werkerfolgs oder Änderungen, die zur Erreichung des vereinbarten Werkerfolgs notwendig sind, verlangen.
              </p>
              <p className="text-muted-foreground mt-4">
                (2) Streben die Parteien Einvernehmen über die Änderung an, trifft den Auftragnehmer eine Mitwirkungspflicht. Nach Ablauf einer 30-Tage-Frist kann der Auftraggeber die Änderung in Textform anordnen.
              </p>
              <p className="text-muted-foreground mt-4">
                (3) Der Auftragnehmer ist nur dann zur Ausführung der Änderung verpflichtet, wenn ihm die Ausführung zumutbar ist.
              </p>
              <p className="text-muted-foreground mt-4">
                (4) Für die Vergütungsanpassung gilt § 650c BGB.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold mb-4">§ 10 Vergütungsanpassung (§ 650c BGB)</h3>
              <p className="text-muted-foreground">
                (1) Bei Anordnungen nach § 650b BGB hat der Auftragnehmer Anspruch auf Anpassung der Vergütung.
              </p>
              <p className="text-muted-foreground mt-4">
                (2) Die Höhe des Vergütungsanspruchs bemisst sich nach den tatsächlich erforderlichen Kosten mit angemessenen Zuschlägen für allgemeine Geschäftskosten, Wagnis und Gewinn.
              </p>
              <p className="text-muted-foreground mt-4">
                (3) Der Auftragnehmer kann zur Berechnung auf die Ansätze einer vereinbarten Urkalkulation zurückgreifen.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold mb-4">§ 11 Mitwirkungspflichten des Auftraggebers</h3>
              <p className="text-muted-foreground">
                (1) Der Auftraggeber ist verpflichtet, alle notwendigen Mitwirkungshandlungen zu erbringen (z.B. Zugang zur Baustelle, Bereitstellung von Strom/Wasser, Vorlage erforderlicher Unterlagen und Genehmigungen, Räumung der Arbeitsbereiche).
              </p>
              <p className="text-muted-foreground mt-4">
                (2) Verzögerungen, die durch fehlende Mitwirkung entstehen, gehen nicht zu Lasten des Auftragnehmers. Entstehende Mehrkosten können dem Auftraggeber in Rechnung gestellt werden.
              </p>
              <p className="text-muted-foreground mt-4">
                (3) Der Auftraggeber hat den Auftragnehmer über alle ihm bekannten Umstände zu informieren, die für die Ausführung relevant sind (z.B. Asbest, Altlasten, besondere Gebäudebedingungen).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6 text-primary">4. Abnahme und Gewährleistung</h2>
              
              <h3 className="text-xl font-bold mb-4">§ 12 Abnahme (§ 640 BGB)</h3>
              <p className="text-muted-foreground">
                (1) Der Auftraggeber ist verpflichtet, das vertragsmäßig hergestellte Werk abzunehmen, sofern nicht nach der Beschaffenheit des Werkes die Abnahme ausgeschlossen ist.
              </p>
              <p className="text-muted-foreground mt-4">
                (2) Wegen unwesentlicher Mängel kann die Abnahme nicht verweigert werden.
              </p>
              <p className="text-muted-foreground mt-4">
                (3) Als abgenommen gilt ein Werk auch, wenn der Auftragnehmer dem Auftraggeber nach Fertigstellung eine angemessene Frist zur Abnahme gesetzt hat und der Auftraggeber die Abnahme nicht innerhalb dieser Frist unter Angabe mindestens eines Mangels verweigert hat (fiktive Abnahme gemäß § 640 Abs. 2 BGB).
              </p>
              <p className="text-muted-foreground mt-4">
                (4) Mit der Abnahme gehen die Gefahr und die Beweislast auf den Auftraggeber über. Zudem werden die Gewährleistungsfristen in Gang gesetzt und die Schlussrechnung wird fällig.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold mb-4">§ 13 Gewährleistung (§§ 633, 634 BGB)</h3>
              <p className="text-muted-foreground">
                (1) Der Auftragnehmer gewährleistet, dass das Werk bei Abnahme frei von Sach- und Rechtsmängeln ist.
              </p>
              <p className="text-muted-foreground mt-4">
                (2) Die Gewährleistungsfrist beträgt gemäß § 634a Abs. 1 Nr. 2 BGB <strong>fünf (5) Jahre</strong> bei Bauwerken und Arbeiten an Bauwerken, beginnend mit der Abnahme.
              </p>
              <p className="text-muted-foreground mt-4">
                (3) Offensichtliche Mängel sind dem Auftragnehmer unverzüglich, spätestens jedoch innerhalb von zwei Wochen nach Abnahme schriftlich anzuzeigen.
              </p>
              <p className="text-muted-foreground mt-4">
                (4) Bei Mängeln stehen dem Auftraggeber folgende Rechte zu (§ 634 BGB):
              </p>
              <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                <li>Nacherfüllung verlangen</li>
                <li>Selbst beseitigen und Ersatz der erforderlichen Aufwendungen verlangen</li>
                <li>Vom Vertrag zurücktreten oder die Vergütung mindern</li>
                <li>Schadensersatz oder Ersatz vergeblicher Aufwendungen verlangen</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                (5) Der Auftraggeber hat dem Auftragnehmer zunächst Gelegenheit zur Nacherfüllung zu geben. Erst nach erfolglosem Fristablauf oder Verweigerung stehen dem Auftraggeber die weiteren Rechte zu.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold mb-4">§ 14 Haftung</h3>
              <p className="text-muted-foreground">
                (1) Der Auftragnehmer haftet unbeschränkt für Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit, die auf einer vorsätzlichen oder fahrlässigen Pflichtverletzung beruhen.
              </p>
              <p className="text-muted-foreground mt-4">
                (2) Der Auftragnehmer haftet unbeschränkt für sonstige Schäden, die auf einer vorsätzlichen oder grob fahrlässigen Pflichtverletzung beruhen.
              </p>
              <p className="text-muted-foreground mt-4">
                (3) Bei leicht fahrlässiger Verletzung wesentlicher Vertragspflichten (Kardinalpflichten) ist die Haftung auf den vertragstypischen, vorhersehbaren Schaden begrenzt.
              </p>
              <p className="text-muted-foreground mt-4">
                (4) Die Haftung nach dem Produkthaftungsgesetz sowie aufgrund von Garantiezusagen bleibt unberührt.
              </p>
              <p className="text-muted-foreground mt-4">
                (5) Der Auftragnehmer verfügt über eine Betriebshaftpflichtversicherung. Details zur Deckungssumme können auf Anfrage mitgeteilt werden.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6 text-primary">5. Kündigung und Beendigung</h2>
              
              <h3 className="text-xl font-bold mb-4">§ 15 Kündigung durch den Auftraggeber (§ 648 BGB)</h3>
              <p className="text-muted-foreground">
                (1) Der Auftraggeber kann den Vertrag jederzeit bis zur Vollendung des Werkes kündigen.
              </p>
              <p className="text-muted-foreground mt-4">
                (2) Bei Kündigung ist der Auftragnehmer berechtigt, die vereinbarte Vergütung zu verlangen, muss sich jedoch dasjenige anrechnen lassen, was er infolge der Aufhebung an Aufwendungen erspart oder durch anderweitige Verwendung seiner Arbeitskraft erwirbt.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold mb-4">§ 16 Kündigung aus wichtigem Grund (§ 648a BGB)</h3>
              <p className="text-muted-foreground">
                (1) Beide Vertragsparteien können den Vertrag aus wichtigem Grund ohne Einhaltung einer Kündigungsfrist kündigen.
              </p>
              <p className="text-muted-foreground mt-4">
                (2) Ein wichtiger Grund liegt vor, wenn dem kündigenden Teil unter Berücksichtigung aller Umstände und unter Abwägung der beiderseitigen Interessen die Fortsetzung des Vertragsverhältnisses nicht zugemutet werden kann.
              </p>
              <p className="text-muted-foreground mt-4">
                (3) Nach der Kündigung können beide Parteien verlangen, dass der Zustand des Werkes gemeinsam festgestellt wird.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6 text-primary">6. Sonstige Bestimmungen</h2>
              
              <h3 className="text-xl font-bold mb-4">§ 17 Eigentumsvorbehalt</h3>
              <p className="text-muted-foreground">
                (1) Bis zur vollständigen Bezahlung aller Forderungen aus der Geschäftsverbindung verbleiben gelieferte Materialien und Waren im Eigentum des Auftragnehmers.
              </p>
              <p className="text-muted-foreground mt-4">
                (2) Bei vertragswidrigem Verhalten des Auftraggebers, insbesondere bei Zahlungsverzug, ist der Auftragnehmer berechtigt, die Vorbehaltsware zurückzufordern.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold mb-4">§ 18 Datenschutz</h3>
              <p className="text-muted-foreground">
                (1) Der Auftragnehmer erhebt und verarbeitet personenbezogene Daten des Auftraggebers im Rahmen der Vertragserfüllung gemäß Art. 6 Abs. 1 lit. b DSGVO.
              </p>
              <p className="text-muted-foreground mt-4">
                (2) Weitere Informationen zur Datenverarbeitung finden sich in unserer <Link href="/datenschutz" className="text-primary hover:underline">Datenschutzerklärung</Link>.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold mb-4">§ 19 Streitschlichtung</h3>
              <p className="text-muted-foreground">
                (1) Wir sind bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
              </p>
              <p className="text-muted-foreground mt-4">
                (2) Bei Streitigkeiten aus Bauverträgen kann die Schlichtungsstelle der Handwerkskammer München angerufen werden.
              </p>
              <p className="text-muted-foreground mt-4 text-sm">
                Hinweis: Die EU-Online-Streitbeilegungsplattform (OS) wurde gemäß Verordnung (EU) 2024/3228 zum 20. Juli 2025 eingestellt.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold mb-4">§ 20 Schriftform und Textform</h3>
              <p className="text-muted-foreground">
                (1) Änderungen und Ergänzungen dieses Vertrages bedürfen zu ihrer Wirksamkeit der Textform (§ 126b BGB). Dies gilt auch für die Abbedingung dieser Schriftformklausel.
              </p>
              <p className="text-muted-foreground mt-4">
                (2) Mündliche Nebenabreden sind nur wirksam, wenn sie schriftlich bestätigt werden.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold mb-4">§ 21 Anwendbares Recht und Gerichtsstand</h3>
              <p className="text-muted-foreground">
                (1) Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts (CISG).
              </p>
              <p className="text-muted-foreground mt-4">
                (2) Gerichtsstand für alle Streitigkeiten aus dem Vertragsverhältnis ist, soweit gesetzlich zulässig, München. Bei Verbrauchern gilt der gesetzliche Gerichtsstand.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold mb-4">§ 22 Salvatorische Klausel</h3>
              <p className="text-muted-foreground">
                (1) Sollte eine Bestimmung dieser AGB unwirksam sein oder werden, so bleibt der Vertrag im Übrigen wirksam.
              </p>
              <p className="text-muted-foreground mt-4">
                (2) Anstelle der unwirksamen Bestimmung gilt eine dem wirtschaftlichen Zweck der unwirksamen Bestimmung möglichst nahekommende wirksame Regelung als vereinbart.
              </p>
            </section>

            <section className="bg-muted/30 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-6 text-primary">7. Wichtige gesetzliche Hinweise</h2>
              <p className="text-muted-foreground font-bold mb-4">Zusammenfassung der relevanten Gesetze (Stand 2026)</p>
              
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <p className="font-bold">Werkvertragsrecht (§§ 631-651 BGB)</p>
                  <p>Grundlagen für alle Werkverträge: Vergütung, Abnahme, Gewährleistung, Kündigung.</p>
                </div>
                
                <div>
                  <p className="font-bold">Bauvertragsrecht (§§ 650a-650h BGB) – seit 01.01.2018</p>
                  <p>Spezielle Regelungen für Bauverträge: Anordnungsrecht (§ 650b), Vergütungsanpassung (§ 650c), Kündigung aus wichtigem Grund (§ 648a), Zustandsfeststellung (§ 650g).</p>
                </div>
                
                <div>
                  <p className="font-bold">Verbraucherbauvertrag (§§ 650i-650n BGB)</p>
                  <p>Besonderer Schutz für Verbraucher: Baubeschreibung (§ 650j), 14-Tage-Widerrufsrecht (§ 650h), max. 90% Abschlagszahlungen (§ 650m), Unterlagenzugang (§ 650n).</p>
                </div>
                
                <div>
                  <p className="font-bold">AGB-Recht (§§ 305-310 BGB)</p>
                  <p>Einbeziehung, Inhaltskontrolle, Klauselverbote. Transparenzgebot und Verbot überraschender Klauseln.</p>
                </div>
                
                <div>
                  <p className="font-bold">Gewährleistungsfristen (§ 634a BGB)</p>
                  <p>5 Jahre bei Bauwerken (ab Abnahme), 2 Jahre bei sonstigen Werken.</p>
                </div>
                
                <div>
                  <p className="font-bold">Datenschutz (DSGVO, BDSG)</p>
                  <p>Datenschutzerklärung, Einwilligung, Betroffenenrechte, Auftragsverarbeitung.</p>
                </div>
                
                <div>
                  <p className="font-bold">Fernabsatzrecht (§§ 312-312k BGB)</p>
                  <p>Widerrufsrecht bei außerhalb von Geschäftsräumen geschlossenen Verträgen.</p>
                </div>
                
                <div>
                  <p className="font-bold">VOB/B 2019</p>
                  <p>Vergabe- und Vertragsordnung für Bauleistungen – bei B2B-Verträgen als Ergänzung vereinbar.</p>
                </div>
              </div>
            </section>

            <section className="border-t pt-8 mt-8">
              <p className="text-sm text-muted-foreground">
                <strong>Stand:</strong> 2026 – Diese AGB wurden gemäß den aktuellen Anforderungen für das Baugewerbe und Verbraucherschutzrecht 2026 erstellt.
              </p>
            </section>

            <section className="border-t pt-8">
              <h2 className="text-xl font-bold mb-4">Weitere rechtliche Informationen</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link href="/impressum" className="text-primary hover:underline">Impressum</Link></li>
                <li><Link href="/datenschutz" className="text-primary hover:underline">Datenschutzerklärung</Link></li>
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
