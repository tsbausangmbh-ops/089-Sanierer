# Design Guidelines: 089Dach.de Funnel-Landingpage

## Design Approach
**Reference-Based with Service Industry Focus**: Drawing from high-converting service funnels like Handy, HomeAdvisor, and German Handwerker platforms. Professional, trust-building aesthetic that balances urgency (for Notdienst) with reliability.

## Typography System
- **Primary Font**: Inter or Open Sans via Google Fonts
- **Headings**: Bold (700), größere Größen für Dringlichkeit
  - H1: text-4xl lg:text-5xl
  - H2: text-3xl lg:text-4xl
  - H3: text-xl lg:text-2xl
- **Body**: Regular (400), Medium (500) für Betonung
  - Base: text-base lg:text-lg
  - Small: text-sm
- **CTA Buttons**: Semibold (600), text-lg

## Layout & Spacing System
**Tailwind Units**: Primär 4, 6, 8, 12, 16, 24 für konsistente Abstände
- Container: max-w-6xl mx-auto px-4
- Section Padding: py-12 md:py-16
- Card Spacing: p-6 md:p-8
- Form Elements: gap-6

## Core Components

### 1. Hero Section mit Vertrauenselementen
- Kein großes Hero-Bild - fokussiert auf sofortigen Funnel-Einstieg
- Kompakte Höhe (60vh max), prominente Service-Überschrift
- Trust Badges: "24h Notdienst", "München & Umgebung", "15+ Jahre Erfahrung"
- Sofortige Sichtbarkeit der drei Service-Kategorien

### 2. Service-Auswahl Cards (Funnel Schritt 1)
- Grid: grid-cols-1 md:grid-cols-3 gap-6
- Große, klickbare Karten mit Icons (z.B. Heroicons: Wrench, ExclamationTriangle, Phone)
- **Karten-Design**:
  - Border mit Hover-Elevation
  - Icon-Container oben: w-16 h-16
  - Service-Name: text-2xl font-bold
  - Kurze Beschreibung: 2-3 Zeilen
  - Subtiler Pfeil/Chevron als visueller CTA
- Aktiv-Status: Border-Highlight für gewählten Service

### 3. Progressiver Formular-Funnel
**Schritt-Indikator** (oben):
- Horizontale Schrittanzeige: flex items-center justify-between
- Nummerierte Kreise mit Verbindungslinien
- Aktiv/Abgeschlossen/Inaktiv States deutlich unterscheidbar

**Formular-Struktur** (mehrstufig):
- **Schritt 1**: Service-Auswahl (visual cards)
- **Schritt 2**: Projekt-Details (Textarea, optional Checkboxes für Dringlichkeit)
- **Schritt 3**: Kontaktdaten (Name, Telefon, E-Mail, PLZ/Adresse)

**Form Styling**:
- Input Fields: Großzügige Höhe (h-12), rounded-lg, klarer Border
- Labels: text-sm font-medium, mb-2
- Required Indicator: Roter Asterisk
- Error States: Rote Border + Fehlermeldung unter Input
- Button Navigation: "Zurück" (secondary) + "Weiter/Absenden" (primary)

### 4. Notdienst-Badge
- Fixed Position: top-4 right-4 (Desktop) oder full-width Banner (Mobile)
- Pulsierender Indikator für 24h-Verfügbarkeit
- Telefonnummer prominent mit Click-to-Call Link

### 5. Trust-Elemente
Unterhalb Formular:
- Kleine Icon-Grid: "Versichert", "Lokaler Meisterbetrieb", "Schnelle Reaktion"
- Icons: w-8 h-8, text unter Icons
- Layout: flex items-center gap-4, zentriert

### 6. Bestätigungsseite
Nach Absenden:
- Großes Bestätigungs-Icon (Checkmark Circle)
- "Vielen Dank"-Headline
- Nächste Schritte: nummerierte Liste
- Erwartete Reaktionszeit
- Kontaktinformationen als Fallback

## Animations & Interactions
**Minimal, zweckorientiert**:
- Card Hover: Leichter Shadow-Lift (shadow-md → shadow-lg)
- Form Step Transitions: Sanftes Fade (100ms)
- Button States: Standard Hover-Aufhellung
- **Keine** ablenkenden Scroll-Animationen

## Images
**Kein großes Hero-Image** - Funnel-Fokus über visuelle Dramaturgie
**Service-Icons**: Heroicons (Tool, ExclamationCircle, Phone) - CDN integration
**Trust Badges**: Simple Icon-Grafiken, keine Fotos nötig für maximale Conversion-Fokussierung

## Responsive Breakpoints
- Mobile First: Stack alles vertikal
- md (768px): 2-Spalten für Service-Cards wenn platzsparend
- lg (1024px): 3-Spalten Service-Grid, horizontale Form-Layouts

## Accessibility
- Aria-Labels für Formular-Schritte
- Keyboard-Navigation zwischen Schritten
- Focus States: Ring-2 für alle interaktiven Elemente
- Error-Announcements für Screen Reader

**Kernprinzip**: Reibungslose Conversion durch klare Hierarchie, minimale Ablenkung, und vertrauensbildende Elemente. Deutsche Direktheit mit professioneller Handwerker-Ästhetik.