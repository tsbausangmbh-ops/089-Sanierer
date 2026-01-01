import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

const PRIMARY_COLOR = "#1e40af";
const ACCENT_COLOR = "#d97706";
const TEXT_COLOR = "#1f2937";
const LIGHT_GRAY = "#f3f4f6";

function createPDF() {
  const doc = new PDFDocument({
    size: "A4",
    margins: { top: 60, bottom: 60, left: 50, right: 50 },
    info: {
      Title: "Der große Sanierungs-Ratgeber 2025",
      Author: "KSHW München - Komplettsanierungen Haus & Wohnung",
      Subject: "Sanierung München - Tipps, Kosten, Förderungen",
      Keywords: "Sanierung, München, Renovierung, Tipps, Kosten, Förderung",
    },
  });

  const outputPath = path.join(process.cwd(), "public", "downloads", "sanierungs-ratgeber-2025.pdf");
  const outputDir = path.dirname(outputPath);
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const stream = fs.createWriteStream(outputPath);
  doc.pipe(stream);

  let pageNumber = 0;

  function addPageNumber() {
    pageNumber++;
    doc.fontSize(10).fillColor("#666666");
    doc.text(`Seite ${pageNumber}`, 50, doc.page.height - 40, { align: "center", width: doc.page.width - 100 });
  }

  function addHeader(title: string) {
    doc.fontSize(24).fillColor(PRIMARY_COLOR).font("Helvetica-Bold");
    doc.text(title, { align: "left" });
    doc.moveDown(0.5);
    doc.moveTo(50, doc.y).lineTo(doc.page.width - 50, doc.y).strokeColor(ACCENT_COLOR).lineWidth(2).stroke();
    doc.moveDown(1);
  }

  function addSubHeader(title: string) {
    doc.fontSize(16).fillColor(PRIMARY_COLOR).font("Helvetica-Bold");
    doc.text(title, { align: "left" });
    doc.moveDown(0.5);
  }

  function addParagraph(text: string) {
    doc.fontSize(11).fillColor(TEXT_COLOR).font("Helvetica");
    doc.text(text, { align: "justify", lineGap: 4 });
    doc.moveDown(0.8);
  }

  function addBulletPoint(text: string) {
    doc.fontSize(11).fillColor(TEXT_COLOR).font("Helvetica");
    doc.text(`• ${text}`, { indent: 20, lineGap: 3 });
  }

  function addTip(title: string, text: string) {
    const startY = doc.y;
    doc.rect(50, startY, doc.page.width - 100, 60).fill(LIGHT_GRAY);
    doc.fillColor(ACCENT_COLOR).fontSize(12).font("Helvetica-Bold");
    doc.text(`💡 ${title}`, 60, startY + 10, { width: doc.page.width - 120 });
    doc.fillColor(TEXT_COLOR).fontSize(10).font("Helvetica");
    doc.text(text, 60, startY + 28, { width: doc.page.width - 120 });
    doc.y = startY + 70;
  }

  function addChecklistItem(text: string, checked: boolean = false) {
    const checkbox = checked ? "☑" : "☐";
    doc.fontSize(11).fillColor(TEXT_COLOR).font("Helvetica");
    doc.text(`${checkbox} ${text}`, { indent: 20, lineGap: 3 });
  }

  function addCostTable(items: { item: string; cost: string }[]) {
    const startY = doc.y;
    const colWidth = (doc.page.width - 100) / 2;
    
    doc.rect(50, startY, doc.page.width - 100, 25).fill(PRIMARY_COLOR);
    doc.fillColor("white").fontSize(11).font("Helvetica-Bold");
    doc.text("Leistung", 60, startY + 7, { width: colWidth - 20 });
    doc.text("Kosten (ca.)", 50 + colWidth, startY + 7, { width: colWidth - 20 });
    
    let y = startY + 25;
    items.forEach((row, i) => {
      const bgColor = i % 2 === 0 ? "#ffffff" : LIGHT_GRAY;
      doc.rect(50, y, doc.page.width - 100, 22).fill(bgColor);
      doc.fillColor(TEXT_COLOR).fontSize(10).font("Helvetica");
      doc.text(row.item, 60, y + 6, { width: colWidth - 20 });
      doc.text(row.cost, 50 + colWidth, y + 6, { width: colWidth - 20 });
      y += 22;
    });
    doc.y = y + 10;
  }

  // ===== TITELSEITE (Seite 1) =====
  doc.rect(0, 0, doc.page.width, doc.page.height).fill(PRIMARY_COLOR);
  doc.fillColor("white").fontSize(42).font("Helvetica-Bold");
  doc.text("Der große", 50, 180, { align: "center", width: doc.page.width - 100 });
  doc.text("Sanierungs-Ratgeber", 50, 230, { align: "center", width: doc.page.width - 100 });
  doc.fontSize(28).font("Helvetica");
  doc.text("2025", 50, 290, { align: "center", width: doc.page.width - 100 });
  doc.moveDown(3);
  doc.fontSize(16);
  doc.text("32 Seiten Expertenwissen", 50, 380, { align: "center", width: doc.page.width - 100 });
  doc.text("Tipps, Kosten & Checklisten", 50, 410, { align: "center", width: doc.page.width - 100 });
  doc.text("für Ihre erfolgreiche Sanierung", 50, 440, { align: "center", width: doc.page.width - 100 });
  doc.fillColor(ACCENT_COLOR).fontSize(14).font("Helvetica-Bold");
  doc.text("KSHW München", 50, 550, { align: "center", width: doc.page.width - 100 });
  doc.fillColor("white").fontSize(12).font("Helvetica");
  doc.text("Komplettsanierungen Haus & Wohnung", 50, 575, { align: "center", width: doc.page.width - 100 });
  doc.text("www.komplettsanierungen-haus-wohnung.de", 50, 600, { align: "center", width: doc.page.width - 100 });
  addPageNumber();

  // ===== INHALTSVERZEICHNIS (Seite 2) =====
  doc.addPage();
  addHeader("Inhaltsverzeichnis");
  const contents = [
    { title: "1. Einleitung: Warum dieser Ratgeber?", page: "3" },
    { title: "2. Die richtige Planung - Der Schlüssel zum Erfolg", page: "4" },
    { title: "3. Komplettsanierung: Alles aus einer Hand", page: "6" },
    { title: "4. Badsanierung: Ihr Traumbad realisieren", page: "8" },
    { title: "5. Küchensanierung: Bauarbeiten richtig planen", page: "10" },
    { title: "6. Bodensanierung: Parkett, Fliesen & mehr", page: "12" },
    { title: "7. Elektrosanierung: Sicherheit geht vor", page: "14" },
    { title: "8. Heizungssanierung: Effizient heizen", page: "16" },
    { title: "9. Energetische Sanierung & Förderungen", page: "18" },
    { title: "10. Dachsanierung: Von oben gut geschützt", page: "20" },
    { title: "11. Kostenübersicht & Budgetplanung", page: "22" },
    { title: "12. Die 10 größten Sanierungsfehler", page: "24" },
    { title: "13. Checklisten für Ihre Sanierung", page: "26" },
    { title: "14. Handwerker finden & beauftragen", page: "28" },
    { title: "15. Rechtliches & Versicherungen", page: "30" },
    { title: "16. Über KSHW München", page: "32" },
  ];
  contents.forEach((item) => {
    doc.fontSize(12).fillColor(TEXT_COLOR).font("Helvetica");
    doc.text(item.title, 60, doc.y, { continued: true, width: 380 });
    doc.text(item.page, { align: "right", width: 60 });
    doc.moveDown(0.5);
  });
  addPageNumber();

  // ===== KAPITEL 1: EINLEITUNG (Seite 3) =====
  doc.addPage();
  addHeader("1. Einleitung: Warum dieser Ratgeber?");
  addParagraph("Liebe Leserin, lieber Leser,");
  addParagraph("eine Sanierung ist eine der größten Investitionen im Leben vieler Menschen. Ob Sie eine Eigentumswohnung modernisieren, ein Einfamilienhaus kernsanieren oder einzelne Räume renovieren möchten – die Entscheidungen, die Sie treffen, haben langfristige Auswirkungen auf Ihren Wohnkomfort, Ihre Energiekosten und den Wert Ihrer Immobilie.");
  addParagraph("Als Münchner Sanierungsunternehmen mit über 268 erfolgreich abgeschlossenen Projekten wissen wir: Die meisten Probleme entstehen nicht während der Bauphase, sondern durch mangelnde Planung im Vorfeld. Genau hier setzt dieser Ratgeber an.");
  addSubHeader("Was Sie in diesem Ratgeber erfahren:");
  addBulletPoint("Welche Sanierungsarten es gibt und was sie kosten");
  addBulletPoint("Wie Sie Ihre Sanierung richtig planen und budgetieren");
  addBulletPoint("Welche Förderungen Sie nutzen können (bis zu 45%!)");
  addBulletPoint("Die 10 größten Fehler bei Sanierungen und wie Sie sie vermeiden");
  addBulletPoint("Praktische Checklisten für jede Sanierungsphase");
  addBulletPoint("Tipps zur Handwerkerauswahl und Vertragsgestaltung");
  doc.moveDown(1);
  addTip("Unser Versprechen", "Dieses Wissen stammt aus über 20 Jahren Erfahrung in der Münchner Baubranche. Nutzen Sie es, um Ihre Sanierung stressfrei und erfolgreich zu gestalten.");
  addPageNumber();

  // ===== KAPITEL 2: PLANUNG (Seite 4-5) =====
  doc.addPage();
  addHeader("2. Die richtige Planung");
  addSubHeader("Der Schlüssel zum Erfolg");
  addParagraph("Eine gründliche Planung ist das Fundament jeder erfolgreichen Sanierung. Statistiken zeigen: 70% aller Budgetüberschreitungen und Terminverzögerungen entstehen durch unzureichende Planung. Investieren Sie daher ausreichend Zeit in diese Phase.");
  addSubHeader("Phase 1: Bestandsaufnahme (2-4 Wochen)");
  addBulletPoint("Dokumentieren Sie den aktuellen Zustand mit Fotos");
  addBulletPoint("Erstellen Sie eine Liste aller notwendigen Maßnahmen");
  addBulletPoint("Prüfen Sie vorhandene Unterlagen (Baupläne, Energieausweis)");
  addBulletPoint("Identifizieren Sie versteckte Mängel (Feuchtigkeit, Schimmel, Asbest)");
  doc.moveDown(0.5);
  addSubHeader("Phase 2: Konzeption (2-4 Wochen)");
  addBulletPoint("Definieren Sie Ihre Ziele und Prioritäten");
  addBulletPoint("Erstellen Sie ein realistisches Budget inkl. 15-20% Reserve");
  addBulletPoint("Legen Sie den zeitlichen Rahmen fest");
  addBulletPoint("Klären Sie behördliche Genehmigungen");
  doc.moveDown(0.5);
  addSubHeader("Phase 3: Angebote & Auftragsvergabe (3-6 Wochen)");
  addBulletPoint("Holen Sie mindestens 3 vergleichbare Angebote ein");
  addBulletPoint("Achten Sie auf detaillierte Leistungsbeschreibungen");
  addBulletPoint("Prüfen Sie Referenzen und Qualifikationen");
  addBulletPoint("Vereinbaren Sie Festpreise wo möglich");
  addPageNumber();

  doc.addPage();
  addSubHeader("Die wichtigsten Planungsfragen");
  addParagraph("Beantworten Sie diese Fragen ehrlich, bevor Sie mit der Sanierung beginnen:");
  doc.moveDown(0.5);
  addChecklistItem("Was ist das Hauptziel der Sanierung? (Wertsteigerung, Energieeffizienz, Komfort)");
  addChecklistItem("Wie hoch ist mein realistisches Budget?");
  addChecklistItem("Bis wann muss die Sanierung abgeschlossen sein?");
  addChecklistItem("Kann ich während der Sanierung in der Immobilie wohnen?");
  addChecklistItem("Welche Arbeiten kann ich eventuell selbst übernehmen?");
  addChecklistItem("Benötige ich eine Finanzierung oder Förderung?");
  addChecklistItem("Wer koordiniert die verschiedenen Gewerke?");
  doc.moveDown(1);
  addTip("Profi-Tipp: Der Bauzeitenplan", "Erstellen Sie einen detaillierten Bauzeitenplan mit allen Gewerken und deren Abhängigkeiten. So vermeiden Sie teure Leerlaufzeiten und Koordinationsprobleme zwischen den Handwerkern.");
  addSubHeader("Typischer Ablauf einer Komplettsanierung");
  addParagraph("1. Entrümpelung und Rückbau (1-2 Wochen)\n2. Rohbauarbeiten und Trockenbau (2-4 Wochen)\n3. Elektro- und Sanitärinstallation (2-3 Wochen)\n4. Estrich und Trocknung (3-4 Wochen)\n5. Fliesen- und Bodenarbeiten (2-3 Wochen)\n6. Malerarbeiten und Feinarbeiten (1-2 Wochen)\n7. Montage und Abnahme (1 Woche)");
  addPageNumber();

  // ===== KAPITEL 3: KOMPLETTSANIERUNG (Seite 6-7) =====
  doc.addPage();
  addHeader("3. Komplettsanierung");
  addSubHeader("Alles aus einer Hand");
  addParagraph("Eine Komplettsanierung umfasst die vollständige Erneuerung aller Gewerke in einem Gebäude oder einer Wohnung. Sie ist die umfassendste Form der Sanierung und bietet den Vorteil, dass alle Arbeiten perfekt aufeinander abgestimmt werden können.");
  addSubHeader("Was gehört zu einer Komplettsanierung?");
  addBulletPoint("Komplette Elektroinstallation nach aktuellen Normen");
  addBulletPoint("Sanitärinstallation inkl. neuer Leitungen");
  addBulletPoint("Heizungsanlage und Wärmeverteilung");
  addBulletPoint("Fenster und Türen");
  addBulletPoint("Böden, Wände und Decken");
  addBulletPoint("Bäder und Küche (Bauarbeiten)");
  addBulletPoint("Fassade und Dämmung (bei Häusern)");
  doc.moveDown(0.5);
  addSubHeader("Kostenübersicht Komplettsanierung");
  addCostTable([
    { item: "Einfacher Standard", cost: "800 - 1.200 €/m²" },
    { item: "Gehobener Standard", cost: "1.200 - 1.800 €/m²" },
    { item: "Premium/Luxus", cost: "1.800 - 2.500 €/m²" },
    { item: "Beispiel: 80m² Wohnung (mittel)", cost: "96.000 - 144.000 €" },
  ]);
  addTip("Kostenersparnis", "Bei einer Komplettsanierung aus einer Hand sparen Sie oft 15-25% gegenüber der Einzelvergabe, da Koordinationsaufwand und Leerlaufzeiten minimiert werden.");
  addPageNumber();

  doc.addPage();
  addSubHeader("Vorteile einer Komplettsanierung");
  addParagraph("Warum sich eine Komplettsanierung oft mehr lohnt als schrittweise Renovierungen:");
  addBulletPoint("Ein Ansprechpartner für alle Gewerke");
  addBulletPoint("Perfekte Abstimmung der Arbeiten untereinander");
  addBulletPoint("Kürzere Gesamtbauzeit durch optimierte Planung");
  addBulletPoint("Festpreisgarantie möglich");
  addBulletPoint("Einheitliche Gewährleistung");
  addBulletPoint("Höhere Wertsteigerung der Immobilie");
  doc.moveDown(0.5);
  addSubHeader("Wann lohnt sich eine Komplettsanierung?");
  addParagraph("Eine Komplettsanierung ist besonders sinnvoll, wenn:");
  addBulletPoint("Die Immobilie älter als 30-40 Jahre ist");
  addBulletPoint("Mehrere Gewerke gleichzeitig erneuert werden müssen");
  addBulletPoint("Eine energetische Sanierung geplant ist");
  addBulletPoint("Die Immobilie verkauft oder vermietet werden soll");
  addBulletPoint("Grundrissänderungen gewünscht sind");
  doc.moveDown(0.5);
  addSubHeader("Typische Dauer");
  addParagraph("Wohnung (60-100 m²): 8-12 Wochen\nEinfamilienhaus: 12-20 Wochen\nMehrfamilienhaus: 4-12 Monate (je nach Umfang)");
  addPageNumber();

  // ===== KAPITEL 4: BADSANIERUNG (Seite 8-9) =====
  doc.addPage();
  addHeader("4. Badsanierung");
  addSubHeader("Ihr Traumbad realisieren");
  addParagraph("Das Badezimmer ist einer der wichtigsten Räume in jeder Wohnung. Eine moderne Badsanierung steigert nicht nur den Wohnkomfort erheblich, sondern auch den Wert Ihrer Immobilie. Dabei sind viele Faktoren zu beachten.");
  addSubHeader("Die wichtigsten Entscheidungen");
  addBulletPoint("Badewanne, Dusche oder beides?");
  addBulletPoint("Barrierefreie Gestaltung für die Zukunft?");
  addBulletPoint("Fliesen oder alternative Wandgestaltung?");
  addBulletPoint("Welche Sanitärobjekte (WC, Waschtisch)?");
  addBulletPoint("Beleuchtungskonzept und Spiegel");
  doc.moveDown(0.5);
  addSubHeader("Kostenübersicht Badsanierung");
  addCostTable([
    { item: "Gäste-WC (2-4 m²)", cost: "5.000 - 10.000 €" },
    { item: "Kleines Bad (4-6 m²)", cost: "10.000 - 18.000 €" },
    { item: "Standard-Bad (6-8 m²)", cost: "15.000 - 28.000 €" },
    { item: "Großes Bad (8-12 m²)", cost: "25.000 - 45.000 €" },
    { item: "Wellness-Bad/Luxus", cost: "40.000 - 80.000 €" },
  ]);
  addTip("Barrierefreiheit", "Auch wenn Sie jetzt noch jung sind: Planen Sie bodengleiche Duschen und ausreichend breite Türen. Diese Investition zahlt sich aus und ist oft sogar förderfähig.");
  addPageNumber();

  doc.addPage();
  addSubHeader("Ablauf einer Badsanierung");
  addParagraph("1. Demontage der alten Sanitärobjekte und Fliesen (1-2 Tage)\n2. Prüfung und ggf. Erneuerung der Rohrleitungen (1-2 Tage)\n3. Elektrische Installationen (1 Tag)\n4. Abdichtung und Estricharbeiten (2-3 Tage + Trocknungszeit)\n5. Fliesenarbeiten (3-5 Tage)\n6. Montage Sanitärobjekte (1-2 Tage)\n7. Feinarbeiten und Silikonfugen (1 Tag)");
  addSubHeader("Häufige Fehler bei der Badsanierung");
  addBulletPoint("Zu wenig Steckdosen eingeplant");
  addBulletPoint("Keine Fußbodenheizung trotz Fliesenboden");
  addBulletPoint("Unzureichende Belüftung (Schimmelgefahr)");
  addBulletPoint("Falsche Fliesenwahl (rutschige Fliesen)");
  addBulletPoint("Zu kleine Dusche gewählt");
  addBulletPoint("Keine Nischen oder Ablagen eingeplant");
  doc.moveDown(0.5);
  addSubHeader("Trends 2025");
  addBulletPoint("Walk-in-Duschen mit Glasabtrennung");
  addBulletPoint("Großformatige Fliesen (weniger Fugen)");
  addBulletPoint("Schwarze Armaturen als Akzent");
  addBulletPoint("Smarte Spiegel mit LED-Beleuchtung");
  addBulletPoint("Nachhaltige Materialien");
  addPageNumber();

  // ===== KAPITEL 5: KÜCHENSANIERUNG (Seite 10-11) =====
  doc.addPage();
  addHeader("5. Küchensanierung");
  addSubHeader("Bauarbeiten richtig planen");
  addParagraph("Bei der Küchensanierung konzentrieren wir uns auf die baulichen Vorbereitungen für Ihre neue Küche. Die Küchenplanung und -montage erfolgt durch Ihren Küchenfachhandel – wir sorgen dafür, dass alle Anschlüsse perfekt vorbereitet sind.");
  addSubHeader("Unsere Leistungen bei der Küchensanierung");
  addBulletPoint("Wasser- und Abwasseranschlüsse verlegen");
  addBulletPoint("Elektrische Anschlüsse für Geräte installieren");
  addBulletPoint("Starkstromanschluss für Herd vorbereiten");
  addBulletPoint("Dunstabzugshaube: Mauerwerk durchbrechen oder Umluft vorbereiten");
  addBulletPoint("Fliesen oder Spritzschutz anbringen");
  addBulletPoint("Boden erneuern (vor Küchenmontage)");
  addBulletPoint("Wände spachteln und streichen");
  doc.moveDown(0.5);
  addSubHeader("Kostenübersicht Küchen-Bauarbeiten");
  addCostTable([
    { item: "Elektroinstallation (Anschlüsse)", cost: "800 - 2.000 €" },
    { item: "Sanitärarbeiten (Wasser/Abwasser)", cost: "600 - 1.500 €" },
    { item: "Wanddurchbruch Dunstabzug", cost: "300 - 800 €" },
    { item: "Fliesenspiegel/Spritzschutz", cost: "400 - 1.200 €" },
    { item: "Bodenbelag (Fliesen/Vinyl)", cost: "40 - 120 €/m²" },
    { item: "Malerarbeiten", cost: "15 - 30 €/m²" },
  ]);
  addPageNumber();

  doc.addPage();
  addSubHeader("Zeitliche Abstimmung mit dem Küchenstudio");
  addParagraph("Eine perfekte Koordination zwischen Bauarbeiten und Küchenmontage ist entscheidend:");
  addBulletPoint("4-6 Wochen vor Lieferung: Exakte Anschlusspositionen vom Küchenstudio anfordern");
  addBulletPoint("2-3 Wochen vor Lieferung: Alle Bauarbeiten abschließen");
  addBulletPoint("1 Woche vor Lieferung: Endkontrolle aller Anschlüsse");
  addBulletPoint("Liefertag: Küche wird montiert, wir sind für Anpassungen erreichbar");
  doc.moveDown(0.5);
  addTip("Wichtig: Anschlusshöhen", "Lassen Sie sich vom Küchenstudio einen technischen Plan mit allen Anschlusshöhen geben. Falschen Anschlüsse nachträglich zu verlegen ist teuer und zeitaufwändig.");
  addSubHeader("Typische Problemstellen");
  addBulletPoint("Steckdosen in der Arbeitsfläche: Brauchen spezielle Unterputzdosen");
  addBulletPoint("Beleuchtung unter Hängeschränken: Kabel vorher einplanen");
  addBulletPoint("Geschirrspüler neben Spüle: Kürzere Wege für Wasseranschluss");
  addBulletPoint("Kühl-Gefrier-Kombination: Oft Starkstrom nötig");
  addPageNumber();

  // ===== KAPITEL 6: BODENSANIERUNG (Seite 12-13) =====
  doc.addPage();
  addHeader("6. Bodensanierung");
  addSubHeader("Parkett, Fliesen & mehr");
  addParagraph("Der Boden prägt maßgeblich die Atmosphäre eines Raumes. Bei der Bodensanierung ist die Wahl des richtigen Materials ebenso wichtig wie die fachgerechte Verlegung und Untergrundvorbereitung.");
  addSubHeader("Bodenbeläge im Vergleich");
  addCostTable([
    { item: "Laminat (inkl. Verlegung)", cost: "25 - 50 €/m²" },
    { item: "Vinyl/Designboden", cost: "40 - 80 €/m²" },
    { item: "Parkett Landhausdiele", cost: "70 - 150 €/m²" },
    { item: "Parkett Fischgrät/Muster", cost: "100 - 200 €/m²" },
    { item: "Fliesen (inkl. Verlegung)", cost: "60 - 150 €/m²" },
    { item: "Naturstein", cost: "100 - 300 €/m²" },
  ]);
  addSubHeader("Untergrundvorbereitung");
  addParagraph("Der Untergrund ist entscheidend für ein dauerhaft schönes Ergebnis:");
  addBulletPoint("Alter Belag entfernen und Reste beseitigen");
  addBulletPoint("Unebenheiten ausgleichen (Spachtelmasse, Ausgleichsschüttung)");
  addBulletPoint("Bei Fußbodenheizung: Aufbauhöhe und Heizleistung beachten");
  addBulletPoint("Feuchtigkeitsmessung durchführen");
  addBulletPoint("Trittschalldämmung einplanen");
  addPageNumber();

  doc.addPage();
  addSubHeader("Parkett oder Fliesen mit Fußbodenheizung?");
  addParagraph("Beide Beläge funktionieren mit Fußbodenheizung, haben aber unterschiedliche Eigenschaften:");
  addBulletPoint("Fliesen: Schnellere Wärmeübertragung, ideal für Bäder");
  addBulletPoint("Parkett: Wärmere Haptik, max. 15mm Stärke empfohlen");
  addBulletPoint("Vinyl: Guter Kompromiss, geringe Aufbauhöhe");
  doc.moveDown(0.5);
  addTip("Parkett aufarbeiten statt erneuern", "Massivparkett kann 3-5 Mal abgeschliffen und neu versiegelt werden. Das kostet nur 30-50 €/m² und gibt dem Boden neues Leben.");
  addSubHeader("Besondere Bereiche");
  addBulletPoint("Badezimmer: Nur Fliesen oder spezielles Vinyl verwenden");
  addBulletPoint("Küche: Fliesen oder robustes Vinyl empfohlen");
  addBulletPoint("Wohnbereich: Parkett für Wärme und Wertigkeit");
  addBulletPoint("Schlafzimmer: Teppich oder Parkett für Gemütlichkeit");
  addBulletPoint("Flur: Robuste Materialien wegen hoher Beanspruchung");
  addSubHeader("Verlegemuster");
  addParagraph("Das Verlegemuster beeinflusst die Raumwirkung:\n• Längs zur Lichtquelle: Raum wirkt länger\n• Quer zum Licht: Raum wirkt breiter\n• Diagonal: Dynamische Wirkung\n• Fischgrät: Klassisch und elegant");
  addPageNumber();

  // ===== KAPITEL 7: ELEKTROSANIERUNG (Seite 14-15) =====
  doc.addPage();
  addHeader("7. Elektrosanierung");
  addSubHeader("Sicherheit geht vor");
  addParagraph("Veraltete Elektroinstallationen sind nicht nur unpraktisch, sondern auch ein erhebliches Sicherheitsrisiko. Überlastete Leitungen sind eine der häufigsten Brandursachen in Deutschland.");
  addSubHeader("Wann ist eine Elektrosanierung nötig?");
  addBulletPoint("Sicherungskasten mit Schmelzsicherungen statt Automaten");
  addBulletPoint("Nur 2-polige Steckdosen ohne Schutzkontakt");
  addBulletPoint("Leitungen aus Aluminium (vor 1970)");
  addBulletPoint("Zu wenig Steckdosen (Mehrfachstecker überall)");
  addBulletPoint("Keine FI-Schutzschalter vorhanden");
  addBulletPoint("Flackerndes Licht oder häufig auslösende Sicherungen");
  doc.moveDown(0.5);
  addSubHeader("Kostenübersicht Elektrosanierung");
  addCostTable([
    { item: "Neue Unterverteilung", cost: "800 - 2.000 €" },
    { item: "Pro Raum komplett neu", cost: "1.200 - 2.500 €" },
    { item: "Wohnung 80m² komplett", cost: "8.000 - 15.000 €" },
    { item: "Smart-Home Vorbereitung", cost: "2.000 - 5.000 €" },
    { item: "E-Ladepunkt Garage", cost: "1.500 - 3.500 €" },
  ]);
  addPageNumber();

  doc.addPage();
  addSubHeader("Moderne Standards einplanen");
  addParagraph("Bei einer Elektrosanierung sollten Sie zukunftssicher planen:");
  addBulletPoint("Mindestens 3 Steckdosen pro Raum (Wohnzimmer: 6-8)");
  addBulletPoint("USB-Steckdosen im Wohn- und Schlafbereich");
  addBulletPoint("Netzwerkkabel (CAT7) in alle Räume");
  addBulletPoint("Dimmer für Wohnräume");
  addBulletPoint("Vorbereitung für Klimaanlage");
  addBulletPoint("Außensteckdosen für Terrasse/Balkon");
  doc.moveDown(0.5);
  addTip("Smart-Home-Vorbereitung", "Auch wenn Sie noch keine Smart-Home-Steuerung planen: Lassen Sie Leerohre für spätere Erweiterungen einziehen. Das kostet jetzt wenig und spart später viel.");
  addSubHeader("Ablauf einer Elektrosanierung");
  addParagraph("1. Bestandsaufnahme und Planung\n2. Neue Unterverteilung installieren\n3. Schlitze stemmen und Leerrohre verlegen\n4. Kabel einziehen\n5. Dosen und Schalter setzen\n6. Anschluss und Prüfung\n7. Protokoll und Abnahme");
  addSubHeader("Normen und Sicherheit");
  addParagraph("Alle Elektroarbeiten müssen von einem zugelassenen Elektrofachbetrieb ausgeführt werden. Nach Abschluss erhalten Sie ein Prüfprotokoll, das Sie für Ihre Versicherung und bei Verkauf benötigen.");
  addPageNumber();

  // ===== KAPITEL 8: HEIZUNGSSANIERUNG (Seite 16-17) =====
  doc.addPage();
  addHeader("8. Heizungssanierung");
  addSubHeader("Effizient heizen");
  addParagraph("Die Heizung ist für etwa 70% des Energieverbrauchs eines Haushalts verantwortlich. Eine moderne Heizungsanlage kann bis zu 30% Energie einsparen und wird zudem staatlich gefördert.");
  addSubHeader("Heizungssysteme im Vergleich");
  addCostTable([
    { item: "Gas-Brennwertkessel", cost: "6.000 - 10.000 €" },
    { item: "Luft-Wärmepumpe", cost: "15.000 - 25.000 €" },
    { item: "Erdwärmepumpe", cost: "20.000 - 35.000 €" },
    { item: "Pelletheizung", cost: "15.000 - 25.000 €" },
    { item: "Fußbodenheizung nachrüsten", cost: "50 - 100 €/m²" },
  ]);
  addSubHeader("Ab 2024: Neue Regelungen");
  addParagraph("Das Gebäudeenergiegesetz (GEG) schreibt vor, dass neue Heizungen zu mindestens 65% mit erneuerbaren Energien betrieben werden müssen. Für bestehende Heizungen gilt eine Übergangsfrist.");
  addBulletPoint("Fossile Heizungen (Öl, Gas) dürfen repariert werden");
  addBulletPoint("Bei Austausch: 65% erneuerbare Energie Pflicht");
  addBulletPoint("Kommunale Wärmeplanung beachten");
  addBulletPoint("Förderungen nutzen (bis zu 70%!)");
  addPageNumber();

  doc.addPage();
  addSubHeader("Wärmepumpe: Die Heizung der Zukunft?");
  addParagraph("Wärmepumpen sind besonders effizient und werden stark gefördert. Aber sie passen nicht zu jedem Gebäude:");
  addBulletPoint("Ideal bei guter Dämmung (Energieeffizienzklasse B oder besser)");
  addBulletPoint("Optimal mit Fußbodenheizung (niedrige Vorlauftemperatur)");
  addBulletPoint("Luft-Wärmepumpe: Einfache Installation, aber Geräuschentwicklung");
  addBulletPoint("Erdwärme: Effizienter, aber teurer und Genehmigung nötig");
  doc.moveDown(0.5);
  addTip("Hybridheizung als Kompromiss", "Eine Wärmepumpe kombiniert mit einer Gas-Brennwerttherme ist ideal für Altbauten. Die Wärmepumpe deckt die Grundlast, das Gas springt bei Spitzenlast ein.");
  addSubHeader("Hydraulischer Abgleich");
  addParagraph("Der hydraulische Abgleich sorgt dafür, dass alle Heizkörper gleichmäßig warm werden. Er ist Voraussetzung für viele Förderungen und spart 5-15% Heizkosten.");
  addSubHeader("Kosten-Nutzen-Rechnung");
  addParagraph("Beispiel: Austausch einer 25 Jahre alten Gasheizung gegen Wärmepumpe:\n• Investition: ca. 25.000 €\n• Förderung: bis zu 17.500 € (70%)\n• Eigenanteil: ca. 7.500 €\n• Ersparnis: ca. 800 €/Jahr\n• Amortisation: unter 10 Jahre");
  addPageNumber();

  // ===== KAPITEL 9: ENERGETISCHE SANIERUNG (Seite 18-19) =====
  doc.addPage();
  addHeader("9. Energetische Sanierung");
  addSubHeader("Förderungen optimal nutzen");
  addParagraph("Eine energetische Sanierung senkt dauerhaft Ihre Energiekosten, steigert den Immobilienwert und wird vom Staat großzügig gefördert. Bis zu 45% der Kosten können übernommen werden!");
  addSubHeader("Die wichtigsten Maßnahmen");
  addBulletPoint("Dämmung der Fassade (WDVS)");
  addBulletPoint("Dachdämmung oder oberste Geschossdecke");
  addBulletPoint("Kellerdämmung");
  addBulletPoint("Fensteraustausch (3-fach Verglasung)");
  addBulletPoint("Heizungserneuerung (Wärmepumpe, Pellets)");
  addBulletPoint("Lüftungsanlage mit Wärmerückgewinnung");
  addBulletPoint("Photovoltaik-Anlage");
  doc.moveDown(0.5);
  addSubHeader("KfW-Förderung 2025");
  addCostTable([
    { item: "Einzelmaßnahme Dämmung", cost: "bis 15% Zuschuss" },
    { item: "Einzelmaßnahme Fenster", cost: "bis 15% Zuschuss" },
    { item: "Heizungstausch (Wärmepumpe)", cost: "bis 70% Zuschuss" },
    { item: "Effizienzhaus 55", cost: "bis 45% (max. 150.000 €)" },
    { item: "Effizienzhaus 40", cost: "bis 45% (max. 150.000 €)" },
  ]);
  addPageNumber();

  doc.addPage();
  addSubHeader("Der individuelle Sanierungsfahrplan (iSFP)");
  addParagraph("Ein vom Staat geförderter Energieberater erstellt für Sie einen individuellen Sanierungsfahrplan. Dieser zeigt:");
  addBulletPoint("Aktuellen energetischen Zustand Ihrer Immobilie");
  addBulletPoint("Sinnvolle Maßnahmen in der richtigen Reihenfolge");
  addBulletPoint("Erwartete Energieeinsparungen");
  addBulletPoint("Kosten und Förderungen für jede Maßnahme");
  addBulletPoint("5% Extra-Förderung für Umsetzung nach iSFP!");
  doc.moveDown(0.5);
  addTip("Zuerst den Energieberater", "Bevor Sie mit einer energetischen Sanierung beginnen, holen Sie sich einen Energieberater. Die Beratung wird mit bis zu 80% gefördert und Sie erhalten 5% mehr Förderung auf alle Maßnahmen.");
  addSubHeader("Reihenfolge der Maßnahmen");
  addParagraph("Die richtige Reihenfolge ist entscheidend:\n\n1. Zuerst: Gebäudehülle dämmen\n2. Dann: Fenster austauschen\n3. Danach: Heizung anpassen (kleinere Anlage möglich!)\n4. Optional: Lüftungsanlage einbauen\n5. Optional: Photovoltaik installieren");
  addSubHeader("Wirtschaftlichkeit");
  addParagraph("Eine energetische Komplettsanierung auf Effizienzhaus-Niveau kostet etwa 400-600 €/m², kann aber bis zu 70% der Energiekosten einsparen und wird zu fast 50% gefördert.");
  addPageNumber();

  // ===== KAPITEL 10: DACHSANIERUNG (Seite 20-21) =====
  doc.addPage();
  addHeader("10. Dachsanierung");
  addSubHeader("Von oben gut geschützt");
  addParagraph("Das Dach schützt Ihr Haus vor Witterung und ist maßgeblich für die Energieeffizienz verantwortlich. Über ein ungedämmtes Dach gehen bis zu 30% der Heizwärme verloren.");
  addSubHeader("Arten der Dachsanierung");
  addBulletPoint("Neueindeckung: Nur Dachziegel erneuern (ab 80 €/m²)");
  addBulletPoint("Aufsparrendämmung: Dämmung von außen (150-250 €/m²)");
  addBulletPoint("Zwischensparrendämmung: Dämmung zwischen Sparren (50-100 €/m²)");
  addBulletPoint("Untersparrendämmung: Zusätzliche Dämmung innen (30-60 €/m²)");
  addBulletPoint("Dachstuhl erneuern: Komplett neuer Aufbau (ab 200 €/m²)");
  doc.moveDown(0.5);
  addSubHeader("Kostenübersicht Dachsanierung");
  addCostTable([
    { item: "Neueindeckung (Ziegel)", cost: "80 - 150 €/m²" },
    { item: "Dachdämmung (Aufsparren)", cost: "150 - 250 €/m²" },
    { item: "Flachdachsanierung", cost: "100 - 200 €/m²" },
    { item: "Dachfenster (inkl. Einbau)", cost: "1.500 - 3.500 €/Stk." },
    { item: "Dachrinne erneuern", cost: "30 - 60 €/lfm" },
  ]);
  addPageNumber();

  doc.addPage();
  addSubHeader("Wann muss das Dach saniert werden?");
  addParagraph("Diese Anzeichen deuten auf Sanierungsbedarf hin:");
  addBulletPoint("Ziegel sind gebrochen, verschoben oder fehlen");
  addBulletPoint("Moos- und Algenbefall (nicht nur optisch problematisch)");
  addBulletPoint("Undichtigkeiten oder Wasserflecken im Dachgeschoss");
  addBulletPoint("Hohe Heizkosten durch fehlende Dämmung");
  addBulletPoint("Dach älter als 50 Jahre (bei Ziegeln)");
  addBulletPoint("Energetische Sanierung geplant");
  doc.moveDown(0.5);
  addTip("Dachsanierung mit Photovoltaik kombinieren", "Wenn Sie ohnehin das Dach sanieren, ist der ideale Zeitpunkt für eine PV-Anlage. Das Gerüst steht bereits und die Mehrkosten sind minimal.");
  addSubHeader("Genehmigungen beachten");
  addParagraph("In vielen Fällen ist eine Dachsanierung genehmigungsfrei. Aber Achtung:");
  addBulletPoint("Dachgauben: Meist genehmigungspflichtig");
  addBulletPoint("Dachaufstockung: Immer genehmigungspflichtig");
  addBulletPoint("Denkmalschutz: Abstimmung mit Behörde nötig");
  addBulletPoint("Änderung der Dachform: Genehmigung erforderlich");
  addPageNumber();

  // ===== KAPITEL 11: KOSTENÜBERSICHT (Seite 22-23) =====
  doc.addPage();
  addHeader("11. Kostenübersicht");
  addSubHeader("Budgetplanung leicht gemacht");
  addParagraph("Eine realistische Budgetplanung ist das A und O jeder Sanierung. Hier finden Sie eine Übersicht aller wichtigen Kostenpositionen.");
  addSubHeader("Gesamtkosten nach Sanierungsart (München 2025)");
  addCostTable([
    { item: "Komplettsanierung Wohnung/m²", cost: "1.000 - 2.300 €" },
    { item: "Komplettsanierung Haus/m²", cost: "1.200 - 2.500 €" },
    { item: "Badsanierung komplett", cost: "15.000 - 45.000 €" },
    { item: "Küchen-Bauarbeiten", cost: "3.000 - 8.000 €" },
    { item: "Elektrosanierung Wohnung", cost: "8.000 - 15.000 €" },
    { item: "Heizungstausch (inkl. Förderung)", cost: "5.000 - 15.000 €" },
    { item: "Dachsanierung/m²", cost: "150 - 300 €" },
    { item: "Fassadendämmung/m²", cost: "150 - 250 €" },
  ]);
  addSubHeader("Budgetregeln");
  addBulletPoint("Immer 15-20% Reserve für Unvorhergesehenes einplanen");
  addBulletPoint("Priorisieren Sie: Was muss, was kann, was wäre schön?");
  addBulletPoint("Förderungen VOR Baubeginn beantragen");
  addBulletPoint("Zahlungsplan mit Handwerkern vereinbaren");
  addPageNumber();

  doc.addPage();
  addSubHeader("Finanzierungsmöglichkeiten");
  addParagraph("Verschiedene Wege, Ihre Sanierung zu finanzieren:");
  addBulletPoint("Eigenkapital: Beste Option, keine Zinskosten");
  addBulletPoint("KfW-Kredit: Günstige Zinsen für energetische Sanierung");
  addBulletPoint("Bausparvertrag: Wenn vorhanden, ideale Ergänzung");
  addBulletPoint("Modernisierungskredit: Schnell verfügbar, flexible Laufzeiten");
  addBulletPoint("Immobilienkredit (Aufstockung): Bei Grundbuchsicherheit");
  doc.moveDown(0.5);
  addTip("Förderungen zuerst prüfen", "Prüfen Sie vor jeder Finanzierung, welche Förderungen möglich sind. Oft ist ein Zuschuss attraktiver als ein Kredit – und Sie müssen das Geld nicht zurückzahlen.");
  addSubHeader("Beispielrechnung Komplettsanierung");
  addParagraph("80m² Altbauwohnung in München:\n\n• Komplettsanierung gehobener Standard: 128.000 €\n• Davon förderfähig (Heizung, Fenster): 35.000 €\n• Förderung 40%: 14.000 €\n• Verbleibende Kosten: 114.000 €\n• Reserve 15%: 17.100 €\n• Gesamtbudget: 131.100 €");
  addPageNumber();

  // ===== KAPITEL 12: DIE 10 GRÖSSTEN FEHLER (Seite 24-25) =====
  doc.addPage();
  addHeader("12. Die 10 größten Sanierungsfehler");
  addSubHeader("Und wie Sie diese vermeiden");
  addParagraph("Aus über 268 Projekten in München haben wir die häufigsten Fehler identifiziert. Lernen Sie aus den Erfahrungen anderer!");
  doc.moveDown(0.5);
  addSubHeader("Fehler 1: Unzureichende Planung");
  addParagraph("Viele Bauherren starten zu schnell. Nehmen Sie sich 4-8 Wochen für eine gründliche Planung.");
  addSubHeader("Fehler 2: Zu knappes Budget");
  addParagraph("15-20% Reserve sind Pflicht. Unvorhergesehenes passiert bei jeder Sanierung.");
  addSubHeader("Fehler 3: Billigster Anbieter gewählt");
  addParagraph("Qualität hat ihren Preis. Der günstigste Anbieter ist selten der beste.");
  addSubHeader("Fehler 4: Keine schriftlichen Verträge");
  addParagraph("Alles schriftlich fixieren: Leistungsumfang, Preis, Termine, Gewährleistung.");
  addSubHeader("Fehler 5: Förderungen zu spät beantragt");
  addParagraph("Förderanträge müssen VOR Baubeginn gestellt werden!");
  addPageNumber();

  doc.addPage();
  addSubHeader("Fehler 6: Falsche Reihenfolge der Gewerke");
  addParagraph("Erst Rohbau, dann Installation, dann Ausbau. Diese Reihenfolge ist unantastbar.");
  addSubHeader("Fehler 7: Eigenleistung überschätzt");
  addParagraph("Realistisch planen: Eigenleistung spart Geld, kostet aber Zeit und Nerven.");
  addSubHeader("Fehler 8: Keine Bauleitung");
  addParagraph("Wer koordiniert die Handwerker? Ohne Bauleitung entstehen teure Abstimmungsprobleme.");
  addSubHeader("Fehler 9: Versteckte Mängel ignoriert");
  addParagraph("Asbest, Feuchtigkeit, marode Leitungen – Voruntersuchung ist Pflicht.");
  addSubHeader("Fehler 10: Abnahme ohne Protokoll");
  addParagraph("Dokumentieren Sie alle Mängel bei der Abnahme schriftlich mit Fotos.");
  doc.moveDown(1);
  addTip("Der wichtigste Rat", "Holen Sie sich professionelle Hilfe. Eine Bauleitung durch einen erfahrenen Partner spart am Ende Zeit, Geld und Nerven – auch wenn sie zunächst Kosten verursacht.");
  addPageNumber();

  // ===== KAPITEL 13: CHECKLISTEN (Seite 26-27) =====
  doc.addPage();
  addHeader("13. Checklisten");
  addSubHeader("Vor Sanierungsbeginn");
  addChecklistItem("Budget festgelegt inkl. 15-20% Reserve");
  addChecklistItem("Zeitplan erstellt");
  addChecklistItem("Förderungen recherchiert und beantragt");
  addChecklistItem("Genehmigungen eingeholt (falls nötig)");
  addChecklistItem("Mindestens 3 Angebote verglichen");
  addChecklistItem("Referenzen der Handwerker geprüft");
  addChecklistItem("Schriftliche Verträge abgeschlossen");
  addChecklistItem("Versicherungsschutz geklärt");
  addChecklistItem("Alternative Unterkunft organisiert (falls nötig)");
  addChecklistItem("Nachbarn informiert");
  doc.moveDown(1);
  addSubHeader("Während der Sanierung");
  addChecklistItem("Regelmäßige Baustellenbesuche");
  addChecklistItem("Bautagebuch führen (Fotos!)");
  addChecklistItem("Änderungen schriftlich dokumentieren");
  addChecklistItem("Rechnungen nur nach Leistungsnachweis zahlen");
  addChecklistItem("Kommunikation mit Bauleitung aufrechterhalten");
  addPageNumber();

  doc.addPage();
  addSubHeader("Bei der Abnahme");
  addChecklistItem("Alle Räume bei guter Beleuchtung prüfen");
  addChecklistItem("Fenster und Türen auf Funktion testen");
  addChecklistItem("Elektrik: Alle Steckdosen und Schalter prüfen");
  addChecklistItem("Sanitär: Wasserdruck und Abfluss testen");
  addChecklistItem("Heizung: Alle Heizkörper warm?");
  addChecklistItem("Böden auf Unebenheiten prüfen");
  addChecklistItem("Malerarbeiten bei Tageslicht kontrollieren");
  addChecklistItem("Mängel sofort schriftlich dokumentieren");
  addChecklistItem("Fotos von allen Mängeln machen");
  addChecklistItem("Mängel mit Frist zur Nachbesserung vereinbaren");
  doc.moveDown(1);
  addSubHeader("Nach Abschluss");
  addChecklistItem("Schlussrechnung prüfen und freigeben");
  addChecklistItem("Gewährleistungsbescheinigungen sammeln");
  addChecklistItem("Alle Unterlagen archivieren");
  addChecklistItem("Versicherungen aktualisieren");
  addChecklistItem("Neue Energieeffizienzklasse eintragen lassen");
  addChecklistItem("Fördergelder abrufen / Verwendungsnachweis");
  addPageNumber();

  // ===== KAPITEL 14: HANDWERKER FINDEN (Seite 28-29) =====
  doc.addPage();
  addHeader("14. Handwerker finden");
  addSubHeader("Die richtige Wahl treffen");
  addParagraph("Der beste Handwerker nützt nichts, wenn er nicht verfügbar ist. In München sind gute Handwerker oft Monate im Voraus ausgebucht. Planen Sie entsprechend!");
  addSubHeader("Wo finde ich gute Handwerker?");
  addBulletPoint("Empfehlungen von Freunden und Familie");
  addBulletPoint("Handwerkskammer München (offizielle Betriebsliste)");
  addBulletPoint("Online-Bewertungen (aber kritisch lesen!)");
  addBulletPoint("Lokale Innungen und Fachverbände");
  addBulletPoint("Generalunternehmer für Komplettsanierungen");
  doc.moveDown(0.5);
  addSubHeader("Das sollte ein gutes Angebot enthalten");
  addBulletPoint("Detaillierte Leistungsbeschreibung");
  addBulletPoint("Materialangaben mit Qualitätsmerkmalen");
  addBulletPoint("Verbindlicher Preis (Festpreis oder Einheitspreise)");
  addBulletPoint("Zahlungsplan nach Baufortschritt");
  addBulletPoint("Termine für Beginn und Fertigstellung");
  addBulletPoint("Gewährleistungsfristen");
  addBulletPoint("Ansprechpartner und Erreichbarkeit");
  addPageNumber();

  doc.addPage();
  addSubHeader("Warnsignale bei Handwerkern");
  addBulletPoint("Ungewöhnlich niedrige Preise");
  addBulletPoint("Keine Referenzen vorhanden");
  addBulletPoint("Druck zur schnellen Unterschrift");
  addBulletPoint("Vorauskasse verlangt (mehr als 30%)");
  addBulletPoint("Keine Gewährleistung genannt");
  addBulletPoint("Nur Barzahlung möglich");
  addBulletPoint("Kein Impressum auf der Website");
  doc.moveDown(0.5);
  addTip("Generalunternehmer statt Einzelvergabe", "Bei größeren Projekten ist ein Generalunternehmer oft die bessere Wahl. Sie haben einen Ansprechpartner, klare Verantwortlichkeiten und oft sogar niedrigere Gesamtkosten durch bessere Koordination.");
  addSubHeader("Der Vertrag");
  addParagraph("Folgende Punkte müssen im Vertrag stehen:\n• Genaue Beschreibung der Leistungen\n• Materialien und Qualitäten\n• Festpreis oder Einheitspreise\n• Zahlungsplan (max. 30% Anzahlung)\n• Termine mit Vertragsstrafe bei Verzug\n• Gewährleistung (mind. 5 Jahre)\n• Abnahmeregelung\n• Haftung und Versicherung");
  addPageNumber();

  // ===== KAPITEL 15: RECHTLICHES (Seite 30-31) =====
  doc.addPage();
  addHeader("15. Rechtliches & Versicherungen");
  addSubHeader("Was Sie wissen müssen");
  addParagraph("Bei Sanierungen gibt es einige rechtliche Aspekte zu beachten. Eine gute Absicherung schützt Sie vor teuren Überraschungen.");
  addSubHeader("Wichtige Versicherungen");
  addBulletPoint("Bauherrenhaftpflicht: Pflicht für jeden Bauherrn (ca. 100-300 €)");
  addBulletPoint("Bauleistungsversicherung: Schützt vor Schäden während der Bauzeit");
  addBulletPoint("Feuerrohbauversicherung: Bei größeren Umbauten wichtig");
  addBulletPoint("Gebäudeversicherung: Anpassen nach Sanierung (Wertsteigerung!)");
  doc.moveDown(0.5);
  addSubHeader("Genehmigungen in München");
  addParagraph("Nicht alles ist genehmigungsfrei. Diese Arbeiten brauchen meist eine Genehmigung:");
  addBulletPoint("Änderung der Gebäudehülle (Fassade, Dach)");
  addBulletPoint("Neue Fenster- oder Türöffnungen");
  addBulletPoint("Tragende Wände entfernen");
  addBulletPoint("Nutzungsänderung von Räumen");
  addBulletPoint("Aufstockungen und Anbauten");
  addBulletPoint("Änderungen an denkmalgeschützten Gebäuden");
  addPageNumber();

  doc.addPage();
  addSubHeader("Gewährleistung und Mängelrechte");
  addParagraph("Nach VOB (Vergabe- und Vertragsordnung für Bauleistungen) gilt:");
  addBulletPoint("4 Jahre Gewährleistung auf Bauleistungen");
  addBulletPoint("Bei BGB-Vertrag: 5 Jahre Gewährleistung");
  addBulletPoint("Versteckte Mängel: Bis zu 10 Jahre verfolgbar");
  addBulletPoint("Mängel schriftlich rügen mit Fristsetzung");
  doc.moveDown(0.5);
  addTip("Abnahme ist entscheidend", "Mit der Abnahme beginnt die Gewährleistungsfrist. Protokollieren Sie alle Mängel VOR der Abnahme, sonst wird die Beweislast umgekehrt.");
  addSubHeader("Eigentümergemeinschaft (WEG)");
  addParagraph("In Eigentumswohnungen gelten besondere Regeln:");
  addBulletPoint("Gemeinschaftseigentum: Zustimmung der WEG nötig");
  addBulletPoint("Sondereigentum: Eigenständig veränderbar");
  addBulletPoint("Außenerscheinung: Oft Zustimmung nötig (Fenster!)");
  addBulletPoint("Leitungen im Gemeinschaftseigentum: WEG-Beschluss");
  addParagraph("\nKlären Sie vor jeder Sanierung mit der Hausverwaltung, welche Genehmigungen Sie benötigen. Das erspart späteren Ärger.");
  addPageNumber();

  // ===== KAPITEL 16: ÜBER UNS (Seite 32) =====
  doc.addPage();
  addHeader("16. Über KSHW München");
  addSubHeader("Ihr Partner für Komplettsanierungen");
  addParagraph("KSHW München – Komplettsanierungen Haus & Wohnung – ist Ihr zuverlässiger Partner für alle Sanierungsarbeiten im Großraum München. Mit über 20 Jahren Erfahrung und mehr als 268 erfolgreich abgeschlossenen Projekten stehen wir für Qualität, Zuverlässigkeit und faire Preise.");
  addSubHeader("Unsere Leistungen");
  addBulletPoint("Komplettsanierung aus einer Hand");
  addBulletPoint("Badsanierung und Küchenbauarbeiten");
  addBulletPoint("Boden-, Elektro- und Heizungssanierung");
  addBulletPoint("Energetische Sanierung mit Förderberatung");
  addBulletPoint("Dachsanierung und Fassadenarbeiten");
  doc.moveDown(0.5);
  addSubHeader("Unser Versprechen");
  addBulletPoint("Festpreisgarantie – keine versteckten Kosten");
  addBulletPoint("Ein Ansprechpartner für alle Gewerke");
  addBulletPoint("Termingarantie mit verbindlichem Endtermin");
  addBulletPoint("5 Jahre Gewährleistung auf alle Arbeiten");
  addBulletPoint("24h Erreichbarkeit während der Bauphase");
  doc.moveDown(1);
  doc.fontSize(14).fillColor(PRIMARY_COLOR).font("Helvetica-Bold");
  doc.text("Kontakt", { align: "center" });
  doc.moveDown(0.5);
  doc.fontSize(12).fillColor(TEXT_COLOR).font("Helvetica");
  doc.text("KSHW München – Komplettsanierungen Haus & Wohnung", { align: "center" });
  doc.text("Zielstattstr. 9, 81379 München", { align: "center" });
  doc.text("Telefon: 0152 122 740 43", { align: "center" });
  doc.text("E-Mail: info@komplettsanierungen-haus-wohnung.de", { align: "center" });
  doc.text("Web: www.komplettsanierungen-haus-wohnung.de", { align: "center" });
  doc.moveDown(1);
  doc.fontSize(11).fillColor(ACCENT_COLOR).font("Helvetica-Bold");
  doc.text("Jetzt kostenlose Erstberatung vereinbaren!", { align: "center" });
  addPageNumber();

  doc.end();

  stream.on("finish", () => {
    console.log(`PDF erfolgreich erstellt: ${outputPath}`);
    console.log(`Gesamtseitenzahl: ${pageNumber}`);
  });
}

createPDF();
