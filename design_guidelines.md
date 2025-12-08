# Design Guidelines: KSHW München Renovation Funnel

## Design Approach
**Reference-Based**: Drawing from premium renovation services like Sweeten, Houzz Pro, and German Handwerker platforms. Professional craftsmanship aesthetic balancing warmth with technical expertise. Think Airbnb's trust-building + HomeAdvisor's service clarity + German precision.

## Typography System
- **Primary**: Inter via Google Fonts
- **Headings**: Bold (700)
  - H1: text-4xl lg:text-6xl
  - H2: text-3xl lg:text-4xl  
  - H3: text-xl lg:text-2xl
- **Body**: Regular (400), Medium (500) for emphasis
  - Base: text-base lg:text-lg
  - Small: text-sm
- **CTAs**: Semibold (600), text-lg

## Layout & Spacing
**Tailwind Units**: 4, 6, 8, 12, 16, 20, 24
- Container: max-w-7xl mx-auto px-4 lg:px-8
- Section Padding: py-16 lg:py-24
- Card Spacing: p-6 lg:p-8
- Form Elements: gap-6

## Core Components

### 1. Hero Section with Image
**Layout**: Full-width, 75vh height on desktop
**Image**: Professional photo showing a beautifully renovated modern kitchen or bathroom - bright, clean, high-quality craftsmanship visible. Natural lighting, warm wood tones, contemporary fixtures. Image should convey "after" transformation quality.
**Content Overlay**: Centered, dark gradient overlay (bottom 60%) for text legibility
- Headline: "Komplette Renovierung in München"
- Subheadline: "Vom Bad bis zur Heizung - Alles aus Meisterhand"
- Primary CTA Button with blurred background (backdrop-blur-md bg-white/20)
- Trust indicators below: "20+ Jahre Erfahrung | 500+ Projekte | Meisterbetrieb"

### 2. Service Selection Cards (Funnel Step 1)
**Grid**: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6, below hero
**Each Card**:
- Aspect ratio container with service-specific image (bathroom, kitchen, flooring close-ups)
- Dark gradient overlay on image
- Icon overlay (Heroicons: Home, Wrench, Bolt, Fire) - w-12 h-12
- Service name: text-2xl font-bold
- 2-line description
- Hover: Lift effect (shadow-lg, scale-102)
- Selected state: Border highlight

**Services**: Badsanierung | Küchen | Böden | Elektrik | Heizung | Komplettsanierung

### 3. Multi-Step Form Funnel
**Step Indicator**: Horizontal progress bar with 3 steps
- Numbers in circles, connecting lines
- Active/Complete/Inactive states with smooth transitions

**Form Steps**:
- **Step 1**: Service selection (visual cards above)
- **Step 2**: Project scope (Checkboxes for rooms, textarea for details, timeline selector)
- **Step 3**: Contact (Name, Phone, Email, Address/PLZ, preferred contact time)

**Styling**:
- Inputs: h-12, rounded-lg, border
- Checkboxes: Large (w-6 h-6), custom styling
- Textareas: min-h-32
- Buttons: "Zurück" (ghost) + "Weiter" (solid primary)
- Validation: Inline error messages

### 4. Trust Section (Between Funnel Steps)
**2-Column Layout** (lg:grid-cols-2):
- **Left**: Customer testimonial card with star rating, quote, name/project type
- **Right**: Grid of trust badges (2x2)
  - Icons (Heroicons): Shield (Versichert), Star (Meisterbetrieb), Clock (Pünktlich), Users (Erfahrung)
  - Label under each icon

### 5. Process Preview
**Below form, before footer**:
3-column grid showing "Ihr Weg zur Traumrenovierung"
- Step cards numbered 1-3
- Icons + short descriptions
- Timeline: "Beratung → Planung → Umsetzung"

### 6. Confirmation Page
**Center-aligned**:
- Large success icon (CheckCircle) w-20 h-20
- "Anfrage erhalten!" headline
- Numbered next steps list
- Expected response time highlighted
- Contact fallback (phone, email)
- Secondary CTA: "Weitere Projekte ansehen"

## Images
**Hero**: High-quality renovation "after" photo - modern kitchen or bathroom, professional photography, warm natural light
**Service Cards**: 6 specific images showing each service category - close-up detail shots emphasizing craftsmanship quality
**Trust Section**: Single customer testimonial photo (homeowner in renovated space) - authentic, professional but approachable
**All images**: WebP format, lazy loading, proper aspect ratios

## Animations
- Card hover lifts: translate-y-1
- Form step transitions: 200ms fade
- Button states: Standard brightness/scale changes
- No scroll-triggered animations

## Icons
**Heroicons via CDN**: Home, Wrench, Bolt, Fire, CheckCircle, Shield, Star, Clock, Users, ChevronRight

## Responsive Strategy
- Mobile: Single column, stacked form, compact hero (50vh)
- Tablet (md): 2-column service grid
- Desktop (lg): 3-column service grid, side-by-side form sections where logical

## Accessibility
- All form inputs: Labels + aria-required
- Step navigation: Aria-current for active step
- Focus rings: ring-2 on all interactive elements
- Alt text for all images describing renovation quality
- Color contrast: WCAG AA minimum

**Core Philosophy**: Premium craftsmanship aesthetic with German precision. Warm, inviting imagery balanced with clear, efficient funnel mechanics. Every element builds trust while reducing friction to conversion.