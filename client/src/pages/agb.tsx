import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Building2 } from "lucide-react";

const services = [
  { id: "komplettsanierung", title: "Komplettsanierung" },
  { id: "badsanierung", title: "Badsanierung" },
  { id: "kuechensanierung", title: "Küchensanierung" },
  { id: "bodensanierung", title: "Bodensanierung" },
  { id: "elektrosanierung", title: "Elektrosanierung" },
  { id: "heizungssanierung", title: "Heizungssanierung" },
  { id: "energetisch", title: "Energetische Sanierung" },
  { id: "dachsanierung", title: "Dachsanierung" },
];

export default function AGB() {
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
          <h1 className="text-3xl lg:text-4xl font-bold mb-8">Allgemeine Geschäftsbedingungen (AGB)</h1>

          <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
            
            <section>
              <h2 className="text-xl font-bold mb-4">§ 1 Geltungsbereich und Rechtsgrundlage</h2>
              <p className="text-muted-foreground">
                (1) Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge über Sanierungsarbeiten zwischen der KSHW München (nachfolgend "Auftragnehmer") und dem Auftraggeber.
              </p>
              <p className="text-muted-foreground mt-2">
                (2) Rechtsgrundlage: Unsere Leistungen werden auf Grundlage des BGB-Bauvertragsrechts in der jeweils gültigen Fassung erbracht. Es gelten die §§ 631 ff. BGB (Werkvertragsrecht) sowie bei Bauverträgen im Sinne des § 650a BGB die besonderen Vorschriften der §§ 650a bis 650h BGB, insbesondere:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1 mt-2">
                <li>§ 650a BGB – Bauvertrag</li>
                <li>§ 650b BGB – Änderung des Vertrags; Anordnungsrecht des Bestellers</li>
                <li>§ 650c BGB – Vergütungsanpassung bei Anordnungen nach § 650b Abs. 2</li>
                <li>§ 650d BGB – Einstweilige Verfügung</li>
                <li>§ 650e BGB – Sicherungshypothek des Bauunternehmers</li>
                <li>§ 650f BGB – Bauhandwerkersicherung</li>
                <li>§ 650g BGB – Zustandsfeststellung bei Verweigerung der Abnahme; Schlussrechnung</li>
                <li>§ 650h BGB – Schriftform der Kündigung</li>
              </ul>
              <p className="text-muted-foreground mt-2">
                (3) Bei Verträgen mit Verbrauchern im Sinne des § 13 BGB über den Bau eines neuen Gebäudes oder erhebliche Umbaumaßnahmen gelten zusätzlich die Vorschriften über den Verbraucherbauvertrag (§§ 650i bis 650n BGB).
              </p>
              <p className="text-muted-foreground mt-2">
                (4) Bei Verträgen mit Unternehmern im Sinne des § 14 BGB können ergänzend die Bestimmungen der VOB/B und VOB/C in der jeweils gültigen Fassung vereinbart werden, sofern dies ausdrücklich im Vertrag festgehalten wird.
              </p>
              <p className="text-muted-foreground mt-2">
                (5) Abweichende Geschäftsbedingungen des Auftraggebers werden nicht Vertragsbestandteil, es sei denn, der Auftragnehmer stimmt ihrer Geltung ausdrücklich schriftlich zu.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">§ 2 Angebote und Vertragsschluss</h2>
              <p className="text-muted-foreground">
                (1) Angebote des Auftragnehmers sind freibleibend und unverbindlich, sofern sie nicht ausdrücklich als verbindlich gekennzeichnet sind.
              </p>
              <p className="text-muted-foreground mt-2">
                (2) Die Angebotsbindungsfrist beträgt 10 Tage ab Angebotsdatum, sofern nicht anders angegeben.
              </p>
              <p className="text-muted-foreground mt-2">
                (3) Ein Vertrag kommt erst durch die schriftliche Auftragsbestätigung des Auftragnehmers oder durch Beginn der Ausführung der beauftragten Arbeiten zustande.
              </p>
              <p className="text-muted-foreground mt-2">
                (4) Kostenvoranschläge, Zeichnungen und andere technische Unterlagen bleiben Eigentum des Auftragnehmers und dürfen ohne dessen Zustimmung weder vervielfältigt noch Dritten zugänglich gemacht werden.
              </p>
              <p className="text-muted-foreground mt-2">
                (5) Die dem Angebot zugrunde liegende Kalkulation wird auf Wunsch hinterlegt und dient als Grundlage für die Berechnung von Mehr- oder Minderleistungen gemäß § 650c BGB.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">§ 3 Änderungen des Vertrags und Nachträge (§§ 650b, 650c BGB)</h2>
              <p className="text-muted-foreground">
                (1) Änderungsbegehren des Auftraggebers: Der Auftraggeber kann gemäß § 650b Abs. 1 BGB Änderungen des vereinbarten Werkerfolgs oder Änderungen, die zur Erreichung des vereinbarten Werkerfolgs notwendig sind, verlangen.
              </p>
              <p className="text-muted-foreground mt-2">
                (2) Erstangebot des Auftragnehmers: Auf ein Änderungsbegehren erstellt der Auftragnehmer unverzüglich ein Angebot über die Mehr- oder Mindervergütung. Dieses Erstangebot enthält eine nachvollziehbare Aufstellung der Mehr- oder Minderkosten auf Basis der hinterlegten Kalkulation.
              </p>
              <p className="text-muted-foreground mt-2">
                (3) Einigung oder Anordnung: Die Parteien sollen eine Einigung über die Änderung und die Vergütungsanpassung anstreben. Kommt binnen 30 Tagen keine Einigung zustande, kann der Auftraggeber die Änderung gemäß § 650b Abs. 2 BGB anordnen, sofern diese zumutbar ist.
              </p>
              <p className="text-muted-foreground mt-2">
                (4) Vergütungsanpassung nach § 650c BGB: Bei einer Anordnung nach § 650b Abs. 2 BGB wird die Vergütung für den vermehrten oder verminderten Aufwand nach den tatsächlich erforderlichen Kosten mit angemessenen Zuschlägen für allgemeine Geschäftskosten, Wagnis und Gewinn ermittelt.
              </p>
              <p className="text-muted-foreground mt-2">
                (5) 80%-Regelung (§ 650c Abs. 3 BGB): Bis zur endgültigen Feststellung der Vergütung kann der Auftragnehmer eine Abschlagszahlung in Höhe von 80% der in seinem Erstangebot genannten Mehrvergütung verlangen, sofern sich aus dem Erstangebot die Grundlagen für die Berechnung erkennen lassen.
              </p>
              <p className="text-muted-foreground mt-2">
                (6) Sämtliche Änderungsbegehren, Angebote und Anordnungen sind zu Dokumentationszwecken schriftlich oder in Textform festzuhalten.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">§ 4 Preise und Zahlungsbedingungen</h2>
              <p className="text-muted-foreground">
                (1) Die Preise verstehen sich netto zuzüglich der gesetzlichen Mehrwertsteuer in der am Tag der Rechnungsstellung gültigen Höhe.
              </p>
              <p className="text-muted-foreground mt-2">
                (2) Zahlungsstaffelung: Sofern nicht anders vereinbart, gelten folgende Zahlungsbedingungen:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1 mt-2">
                <li>Bei Aufträgen bis 5.000 EUR: 50% Anzahlung bei Auftragserteilung, 50% bei Fertigstellung und Abnahme</li>
                <li>Bei Aufträgen über 5.000 EUR: 40% Anzahlung bei Auftragserteilung, jeweils weitere Abschlagszahlungen nach Baufortschritt, 5% nach Abnahme</li>
              </ul>
              <p className="text-muted-foreground mt-2">
                (3) Abschlagszahlungen (§ 632a BGB): Der Auftragnehmer kann Abschlagszahlungen für bereits erbrachte Leistungen verlangen. Die Höhe der Abschlagszahlungen richtet sich nach dem Wert der erbrachten und nach dem Vertrag geschuldeten Leistungen.
              </p>
              <p className="text-muted-foreground mt-2">
                (4) Bei Verbraucherbauverträgen (§ 650m BGB): Die Gesamtsumme der Abschlagszahlungen darf 90% der vereinbarten Gesamtvergütung nicht übersteigen.
              </p>
              <p className="text-muted-foreground mt-2">
                (5) Rechnungen sind innerhalb von 5 Tagen nach Zugang ohne Abzug (kein Skonto) zahlbar.
              </p>
              <p className="text-muted-foreground mt-2">
                (6) Prüfbare Schlussrechnung (§ 650g Abs. 4 BGB): Bei Bauverträgen stellt der Auftragnehmer eine prüfbare Schlussrechnung. Die Schlusszahlung ist innerhalb von 5 Tagen nach Abnahme fällig.
              </p>
              <p className="text-muted-foreground mt-2">
                (7) Bei Zahlungsverzug ist der Auftragnehmer berechtigt, Verzugszinsen in gesetzlicher Höhe zu berechnen (5 Prozentpunkte über dem Basiszinssatz bei Verbrauchern, 9 Prozentpunkte bei Unternehmern).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">§ 5 Bauhandwerkersicherung (§ 650f BGB)</h2>
              <p className="text-muted-foreground">
                (1) Der Auftragnehmer kann vom Auftraggeber gemäß § 650f BGB eine Sicherheit für die vereinbarte Vergütung einschließlich Nebenforderungen verlangen. Dies gilt nicht bei Verträgen mit Verbrauchern über Umbaumaßnahmen an deren selbst bewohntem Eigenheim.
              </p>
              <p className="text-muted-foreground mt-2">
                (2) Die Sicherheit kann durch Bürgschaft eines in Deutschland zugelassenen Kreditinstituts oder Kreditversicherers geleistet werden.
              </p>
              <p className="text-muted-foreground mt-2">
                (3) Wird die Sicherheit nicht fristgerecht geleistet, kann der Auftragnehmer die Arbeiten einstellen oder den Vertrag kündigen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">§ 6 Ausführung der Arbeiten</h2>
              <p className="text-muted-foreground">
                (1) Die Ausführung der Arbeiten erfolgt nach den anerkannten Regeln der Technik und den einschlägigen DIN-Normen.
              </p>
              <p className="text-muted-foreground mt-2">
                (2) Der Auftraggeber hat für einen ungehinderten Zugang zur Baustelle zu sorgen und die für die Durchführung der Arbeiten erforderlichen Strom- und Wasseranschlüsse kostenfrei zur Verfügung zu stellen.
              </p>
              <p className="text-muted-foreground mt-2">
                (3) Vereinbarte Ausführungsfristen verlängern sich angemessen bei:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1 mt-2">
                <li>Höherer Gewalt und anderen unvorhersehbaren Ereignissen</li>
                <li>Witterungsbedingungen, die eine fachgerechte Ausführung nicht zulassen</li>
                <li>Vom Auftraggeber zu vertretenden Verzögerungen</li>
                <li>Nachträglichen Änderungswünschen des Auftraggebers (§ 650b BGB)</li>
              </ul>
              <p className="text-muted-foreground mt-2">
                (4) Der Auftragnehmer ist berechtigt, Unterauftragnehmer mit der Ausführung von Teilleistungen zu beauftragen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">§ 7 Mitwirkungspflichten des Auftraggebers</h2>
              <p className="text-muted-foreground">
                (1) Der Auftraggeber hat dem Auftragnehmer alle für die Ausführung der Arbeiten erforderlichen Informationen rechtzeitig und vollständig mitzuteilen.
              </p>
              <p className="text-muted-foreground mt-2">
                (2) Vor Arbeitsbeginn hat der Auftraggeber auf vorhandene Leitungen (Gas, Wasser, Strom, etc.) sowie auf Asbest oder andere Gefahrstoffe hinzuweisen.
              </p>
              <p className="text-muted-foreground mt-2">
                (3) Der Auftraggeber sorgt für die Zugänglichkeit des Arbeitsbereichs und räumt auf Verlangen Hindernisse auf eigene Kosten beiseite.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">§ 8 Abnahme (§§ 640, 650g BGB)</h2>
              <p className="text-muted-foreground">
                (1) Nach Fertigstellung der Arbeiten hat der Auftraggeber diese unverzüglich abzunehmen. Die Abnahme kann förmlich erfolgen oder durch Ingebrauchnahme des Werks.
              </p>
              <p className="text-muted-foreground mt-2">
                (2) Unwesentliche Mängel berechtigen nicht zur Verweigerung der Abnahme (§ 640 Abs. 1 Satz 2 BGB).
              </p>
              <p className="text-muted-foreground mt-2">
                (3) Zustandsfeststellung bei Verweigerung der Abnahme (§ 650g BGB): Verweigert der Auftraggeber die Abnahme unter Angabe von Mängeln, hat der Auftragnehmer Anspruch auf eine gemeinsame Zustandsfeststellung. Das Ergebnis wird schriftlich dokumentiert.
              </p>
              <p className="text-muted-foreground mt-2">
                (4) Nimmt der Auftraggeber an einer gemeinsamen Zustandsfeststellung nicht teil, kann der Auftragnehmer die Zustandsfeststellung auch einseitig vornehmen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">§ 9 Gewährleistung (§§ 633 ff. BGB)</h2>
              <p className="text-muted-foreground">
                (1) Verjährungsfrist: Die Gewährleistungsfrist beträgt gemäß § 634a BGB:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1 mt-2">
                <li>5 Jahre für Arbeiten an einem Bauwerk (Neubauten, Sanierungen, wesentliche Instandhaltungen)</li>
                <li>2 Jahre für Reparatur- und Wartungsarbeiten, die nicht am Bauwerk selbst erfolgen</li>
              </ul>
              <p className="text-muted-foreground mt-2">
                (2) Die Gewährleistungsfrist beginnt mit der Abnahme der Leistung.
              </p>
              <p className="text-muted-foreground mt-2">
                (3) Mängel sind dem Auftragnehmer unverzüglich schriftlich anzuzeigen. Der Auftragnehmer ist berechtigt, berechtigte Mängel nach seiner Wahl durch Nachbesserung oder Neuherstellung zu beseitigen (Nacherfüllung gemäß § 635 BGB).
              </p>
              <p className="text-muted-foreground mt-2">
                (4) Die Gewährleistung erstreckt sich nicht auf Schäden, die durch unsachgemäße Behandlung, Eingriffe Dritter, unterlassene Wartung oder höhere Gewalt entstanden sind.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">§ 10 Haftung</h2>
              <p className="text-muted-foreground">
                (1) Der Auftragnehmer haftet unbeschränkt für Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit sowie für vorsätzlich oder grob fahrlässig verursachte Schäden.
              </p>
              <p className="text-muted-foreground mt-2">
                (2) Für leicht fahrlässig verursachte Schäden haftet der Auftragnehmer nur bei Verletzung wesentlicher Vertragspflichten (Kardinalpflichten). Die Haftung ist in diesen Fällen auf den vertragstypischen, vorhersehbaren Schaden begrenzt.
              </p>
              <p className="text-muted-foreground mt-2">
                (3) Die vorstehenden Haftungsbeschränkungen gelten nicht für Ansprüche nach dem Produkthaftungsgesetz oder bei Übernahme einer Garantie.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">§ 11 Eigentumsvorbehalt</h2>
              <p className="text-muted-foreground">
                (1) Die gelieferten Materialien bleiben bis zur vollständigen Bezahlung aller Forderungen aus dem Vertragsverhältnis Eigentum des Auftragnehmers.
              </p>
              <p className="text-muted-foreground mt-2">
                (2) Der Auftraggeber ist verpflichtet, die unter Eigentumsvorbehalt stehenden Materialien pfleglich zu behandeln und vor Beschädigung zu schützen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">§ 12 Kündigung (§§ 648, 648a, 650h BGB)</h2>
              <p className="text-muted-foreground">
                (1) Freie Kündigung durch den Auftraggeber (§ 648 BGB): Der Auftraggeber kann den Vertrag jederzeit kündigen. In diesem Fall behält der Auftragnehmer den Anspruch auf die vereinbarte Vergütung abzüglich ersparter Aufwendungen.
              </p>
              <p className="text-muted-foreground mt-2">
                (2) Kündigung aus wichtigem Grund (§ 648a BGB): Beide Parteien können den Vertrag aus wichtigem Grund ohne Einhaltung einer Frist kündigen.
              </p>
              <p className="text-muted-foreground mt-2">
                (3) Schriftform der Kündigung (§ 650h BGB): Bei Bauverträgen bedarf die Kündigung der Schriftform.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">§ 13 Notdienst und Sofortreparaturen</h2>
              <p className="text-muted-foreground">
                (1) Für Notdienst-Einsätze außerhalb der regulären Geschäftszeiten (Mo-Fr 8:00-16:30 Uhr) gelten folgende Zuschläge:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1 mt-2">
                <li>Abends (16:30-22 Uhr): 25% Zuschlag</li>
                <li>Nachts (22-8 Uhr): 50% Zuschlag</li>
                <li>Samstags: 50% Zuschlag</li>
                <li>Sonn- und Feiertags: 100% Zuschlag</li>
              </ul>
              <p className="text-muted-foreground mt-2">
                (2) Im Notdienst ausgeführte Sofortmaßnahmen zur Schadensbegrenzung werden nach Aufwand berechnet. Ein detaillierter Kostenvoranschlag für Folgearbeiten wird zeitnah erstellt.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">§ 14 Sturmschäden und Versicherungsarbeiten</h2>
              <p className="text-muted-foreground">
                (1) Bei Sturmschäden unterstützt der Auftragnehmer den Auftraggeber bei der Schadensmeldung an die Versicherung durch Dokumentation und Kostenvoranschlag.
              </p>
              <p className="text-muted-foreground mt-2">
                (2) Die Beauftragung der Reparaturarbeiten erfolgt unabhängig von der Regulierung durch die Versicherung. Der Auftraggeber bleibt zahlungspflichtig, auch wenn die Versicherung die Kostenübernahme ganz oder teilweise ablehnt.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">§ 15 Widerrufsrecht für Verbraucher</h2>
              <p className="text-muted-foreground">
                (1) Verbraucher haben bei außerhalb von Geschäftsräumen geschlossenen Verträgen und bei Fernabsatzverträgen ein Widerrufsrecht von 14 Tagen gemäß §§ 312g, 355 BGB.
              </p>
              <p className="text-muted-foreground mt-2">
                (2) Bei Verbraucherbauverträgen (§ 650l BGB): Die Widerrufsfrist beginnt nicht, bevor der Auftragnehmer den Verbraucher über sein Widerrufsrecht belehrt hat.
              </p>
              <p className="text-muted-foreground mt-2">
                (3) Das Widerrufsrecht erlischt vorzeitig, wenn der Auftragnehmer die Dienstleistung vollständig erbracht hat und mit der Ausführung erst begonnen hat, nachdem der Verbraucher hierzu seine ausdrückliche Zustimmung gegeben und gleichzeitig seine Kenntnis davon bestätigt hat, dass er sein Widerrufsrecht bei vollständiger Vertragserfüllung verliert.
              </p>
              <p className="text-muted-foreground mt-2">
                (4) Die ausführliche Widerrufsbelehrung wird dem Verbraucher bei Vertragsschluss in Textform übermittelt.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">§ 16 Datenschutz</h2>
              <p className="text-muted-foreground">
                Die Verarbeitung personenbezogener Daten erfolgt gemäß unserer <Link href="/datenschutz" className="text-primary hover:underline">Datenschutzerklärung</Link> und den geltenden datenschutzrechtlichen Bestimmungen (DSGVO, BDSG).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">§ 17 Streitbeilegung und Schlichtung</h2>
              <p className="text-muted-foreground">
                (1) Schlichtungsverfahren: Bei Streitigkeiten aus dem Vertragsverhältnis verpflichten sich beide Parteien, vor Einleitung eines gerichtlichen Verfahrens ein Schlichtungsverfahren durchzuführen.
              </p>
              <p className="text-muted-foreground mt-2">
                (2) Schlichtungsstelle: Als Schlichtungsstelle wird die Schlichtungsstelle der Handwerkskammer für München und Oberbayern oder eine andere von den Parteien einvernehmlich gewählte Schlichtungsstelle vereinbart.
              </p>
              <p className="text-muted-foreground mt-2">
                (3) Das Schlichtungsverfahren ist Voraussetzung für die Zulässigkeit einer Klage. Die Parteien sind verpflichtet, am Schlichtungsverfahren teilzunehmen und sich um eine einvernehmliche Lösung zu bemühen.
              </p>
              <p className="text-muted-foreground mt-2">
                (4) Die Kosten des Schlichtungsverfahrens werden von den Parteien je zur Hälfte getragen, sofern im Schlichtungsverfahren nichts anderes vereinbart wird.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">§ 18 Schlussbestimmungen</h2>
              <p className="text-muted-foreground">
                (1) Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts.
              </p>
              <p className="text-muted-foreground mt-2">
                (2) Erfüllungsort für alle Leistungen ist der Sitz des Auftragnehmers in München.
              </p>
              <p className="text-muted-foreground mt-2">
                (3) Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden, so berührt dies die Wirksamkeit der übrigen Bestimmungen nicht. An Stelle der unwirksamen Bestimmung tritt eine solche, die dem wirtschaftlichen Zweck der unwirksamen Bestimmung am nächsten kommt.
              </p>
              <p className="text-muted-foreground mt-2">
                (4) Änderungen und Ergänzungen des Vertrages bedürfen der Schriftform. Dies gilt auch für die Aufhebung dieses Schriftformerfordernisses.
              </p>
            </section>

            <section className="border-t pt-8 mt-8">
              <p className="text-sm text-muted-foreground">
                Hinweis: Diese AGB basieren auf dem BGB-Bauvertragsrecht in der jeweils gültigen Fassung (Stand 2025). Bei Verträgen mit Unternehmern kann ergänzend die VOB/B vereinbart werden.
              </p>
              <p className="text-muted-foreground mt-4">
                <strong>KSHW München</strong><br />
                Ali Kemal Kurt<br />
                Zielstattstr. 9, 81379 München<br />
                Telefon: 0152 122 740 43<br />
                E-Mail: info@komplettsanierungen-haus-wohnung.de
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
