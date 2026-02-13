# KSHW München - Lead Generation Funnel

## Overview

KSHW München (Komplettsanierungen Haus & Wohnung) is a lead generation funnel website for a complete renovation service company based in Munich, Germany. The application provides a multi-step form interface where potential customers can request services for complete renovations, bathroom remodeling, kitchen renovations, flooring, electrical, and heating systems. The funnel guides users through service selection, property type selection, project description, and contact information collection, ultimately storing leads in a database for follow-up.

## User Preferences

Preferred communication style: Simple, everyday language (German).

## System Architecture

### Frontend Architecture

**Framework & Build Tools:**
- React with TypeScript as the primary frontend framework
- Vite for development server and build optimization
- Wouter for lightweight client-side routing
- TanStack Query (React Query) for server state management and API communication

**UI Component System:**
- Shadcn/ui component library with Radix UI primitives
- Tailwind CSS for styling with custom design tokens
- Component architecture follows atomic design principles with reusable UI components in `client/src/components/ui/`

**Design System:**
- Professional renovation services aesthetic with warm earthy tones and blue accents
- Typography: Inter font family via Google Fonts
- Primary color: Deep blue (220 65% 42%) for trust and professionalism
- Accent color: Warm amber (38 85% 55%) for craftsmanship warmth
- Responsive layout using Tailwind's utility classes with mobile-first approach

**Form Management:**
- React Hook Form for form state management and validation
- Zod for runtime type validation and schema definition
- @hookform/resolvers for integrating Zod schemas with React Hook Form

**Key User Flow:**
1. Landing page displays six service options (Komplettsanierung, Badsanierung, Küchensanierung, Bodensanierung, Elektrosanierung, Heizungssanierung)
2. Multi-step form with progress indicator guides users through:
   - Service selection and property type
   - Project description with urgency flag
   - Contact information and location details
3. Confirmation page displays next steps after successful submission

### Backend Architecture

**Server Framework:**
- Express.js for HTTP server and API routing
- Node.js with ESM module system
- TypeScript for type safety across the stack

**API Design:**
- RESTful API endpoints under `/api/*` namespace
- Lead management endpoints:
  - `POST /api/leads` - Create new lead
  - `GET /api/leads` - Retrieve all leads with optional service filtering
  - `GET /api/leads/:id` - Retrieve specific lead by ID
- Input validation using Zod schemas with detailed error messages

**Data Layer:**
- Repository pattern implemented via `IStorage` interface in `server/storage.ts`
- `DatabaseStorage` class provides concrete implementation
- Clean separation between business logic and data access

### Database Architecture

**ORM & Database:**
- Drizzle ORM for type-safe database operations
- PostgreSQL as the relational database (configured via DATABASE_URL environment variable)
- Connection pooling via node-postgres (pg) for efficient connection management

**Schema Design:**
- `leads` table: Customer inquiries with fields for:
  - `id`: UUID primary key
  - `service`: Type of renovation service requested
  - `propertyType`: Type of property (wohnung, einfamilienhaus, mehrfamilienhaus, gewerbe)
  - `description`: Project description
  - `isUrgent`: Urgency flag
  - `name`, `phone`, `email`, `address`, `postalCode`: Contact details
  - `createdAt`: Timestamp

**Service Types:**
- komplettsanierung (Complete renovation)
- badsanierung (Bathroom renovation)
- kuechensanierung (Kitchen renovation)
- bodensanierung (Floor renovation)
- elektrosanierung (Electrical renovation)
- heizungssanierung (Heating system renovation)

**Property Types:**
- wohnung (Apartment)
- einfamilienhaus (Single-family house)
- mehrfamilienhaus (Multi-family house)
- gewerbe (Commercial property)

### Routes

**Main Pages:**
- `/` - Landing page with hero section and service cards
- `/anfrage` - Multi-step funnel form
- `/danke` - Confirmation page after form submission
- `/admin` - Admin dashboard for viewing leads

**SEO Landing Pages (Intent-Based):**
- `/kosten` - Price-focused landing page (targets "Sanierung Kosten")
- `/badsanierung` - Bathroom renovation landing page
- `/wohnungssanierung` - Apartment renovation landing page
- `/haussanierung` - House renovation landing page
- `/kernsanierung` - Core renovation landing page

**District Landing Pages (Local SEO):**
- `/muenchen-schwabing` - Schwabing district page
- `/muenchen-bogenhausen` - Bogenhausen district page
- `/muenchen-maxvorstadt` - Maxvorstadt district page
- `/muenchen-haidhausen` - Haidhausen district page
- `/muenchen-sendling` - Sendling district page
- `/muenchen-neuhausen` - Neuhausen-Nymphenburg district page
- `/muenchen-pasing` - Pasing district page
- `/muenchen-giesing` - Giesing district page
- `/muenchen-lehel` - Lehel district page
- `/muenchen-trudering` - Trudering-Riem district page

**Legal/Info Pages:**
- `/impressum` - Legal notice
- `/datenschutz` - Privacy policy
- `/kontakt` - Contact page

### SEO & SSR Architecture

**Server-Side Meta Tag Injection:**
- `shared/seo-meta.ts` - Central registry for route-specific SEO metadata (title, description, keywords, canonical, OG tags)
- `server/ssr-renderer.ts` - Template renderer that injects meta tags into index.html before serving
- `client/index.html` - Contains placeholder markers (<!--SSR_TITLE-->, <!--SSR_DESCRIPTION-->, etc.) replaced at runtime

**How SSR Works:**
1. Server receives request for any route
2. SSR renderer loads index.html template (cached in production)
3. Route-specific metadata is fetched from seo-meta.ts
4. Placeholder markers are replaced with actual values
5. Complete HTML with correct meta tags is sent to browser/crawler

**Crawler Support (2-Tier):**
- `server/prerender-middleware.ts` - Custom Prerender.io middleware (primary): Detects bot UAs, forwards to Prerender.io service via PRERENDER_TOKEN, returns pre-rendered HTML
- `server/crawler-middleware.ts` - Built-in static HTML fallback (secondary): Serves hand-crafted HTML if Prerender.io is unavailable
- Flow: Bot request → Prerender.io attempt → if fail/timeout → crawler-middleware fallback → response
- Internal linking via footer components for PageRank distribution

**Schema Architecture (CRITICAL):**
- HomeAndConstructionBusiness schema comes from exactly 2 sources that MUST be identical:
  1. `client/src/components/seo-head.tsx` - generateLocalBusinessSchema() for React client
  2. `server/crawler-middleware.ts` - inline JSON-LD for SSR/crawlers
- **Duplicate Prevention**: Client-side SeoHead checks for existing SSR-injected LocalBusiness schema before injecting client schema (prevents Google from seeing duplicate LocalBusiness entities)
- Service schemas reference the main business via @id only (no duplicate LocalBusiness)
- FAQPage schema ONLY on /faq-preise page
- NO LocalBusiness microdata in footer (removed to prevent duplicates)
- Business data: telephone +49-89-444438872, foundingDate 2019, @id https://089-sanierer.de/#organization

**GEO 2026 Optimization (Feb 2026):**
- llms.txt updated to Version 3.0 (February 2026) with consistent pricing and contact data
- llms-full.txt created as comprehensive version with all services, FAQs, and full area coverage
- Schema enhancements: AggregateRating (4.9/5, 268 reviews), inLanguage "de-DE" on LocalBusiness + WebSite
- Freshness meta tags: og:updated_time, article:modified_time, article:published_time on all pages
- Crawler HTML: "Zuletzt aktualisiert: Februar 2026" dates + "Kurzantwort" direct-answer summaries
- Service prices synchronized across llms.txt, crawler-middleware servicePages, serviceSchemaMap
- Price update (Feb 2026): Badsanierung ab 18.500€, Komplettsanierung ab 1.200€/m², Küchensanierung ab 6.500€, Elektrosanierung ab 150€/m²
- Phone number normalized to +49 89 444 438 872 across all SEO surfaces
- Keywords updated from 2024 to 2026 references
- Copyright updated to 2026

**On-Page SEO Keyword Integration (Feb 2026):**
- All 12 primary keywords integrated into visible H2/H3 headings and body text across all pages
- Primary keywords: Sanierungsarbeiten, Sanierungen München, Renovierungen München, Renovierungsarbeiten, Handwerkerservice München, Sanierung aus einer Hand, Renovierung aus einer Hand, Handwerker München, Innenausbau Firma München, Renovierungsfirma München, Sanierungsfirma München, Generalunternehmer Sanierung
- Pages optimized: home, badsanierung, wohnungssanierung, haussanierung, kernsanierung, kosten, ratgeber, kontakt
- Crawler-middleware HTML blocks also updated with keywords for: home, badsanierung, wohnungssanierung, haussanierung, kernsanierung, kosten, kontakt, ratgeber, küchensanierung, bodensanierung, elektrosanierung, heizungssanierung, faq-preise
- Each page has 6-10+ different primary keywords naturally integrated
- Keywords placed in H2/H3 section headings and supporting paragraph text
- SEO meta tags (seo-meta.ts) also contain all primary keywords plus 8+ longtail keywords per page

**Bug Fixes Applied (Jan 2026):**
- Removed javascript:history.back() from 404 page (replaced with button onClick)
- Added schema duplicate detection in seo-head.tsx to prevent SSR + client double injection

**Content Strategy (Jan 2026) - High-End/Concierge Positioning:**
- All pages optimized with "Projekt-Kurator" and "Concierge-Versprechen" language
- Target audience: "anspruchsvolle Immobilienbesitzer" (demanding property owners)
- Key messaging across all Hero sections:
  - "Ihr exklusiver Projekt-Kurator" / "Wir kuratieren Ihr Projekt"
  - "Ihr persönlicher Bauleiter" / "Zertifizierte Meisterbetriebe"
  - "Volle Festpreisgarantie ohne Nachforderungen"
  - "Detaillierte Leistungsverzeichnisse"
- Trust metrics: "150+ Projekte", "98% Weiterempfehlung", "5 Jahre Gewährleistung"
- CTA standardized: "Jetzt exklusives Festpreis-Konzept anfordern"
- Checkmarks standardized: ["98% Weiterempfehlung", "Meisterbetriebe", "Festpreisgarantie"]
- Pages updated: home, badsanierung, wohnungssanierung, haussanierung, kernsanierung, kosten, kontakt, funnel (8 services), gewerke-funnel, ratgeber, rechner, stadtteil (32 districts), confirmation, termin, faq-preise, impressum, datenschutz, agb, cookies, 404

**Files for adding new pages with SEO:**
1. Add route metadata to `shared/seo-meta.ts`
2. Add static HTML content to `server/crawler-middleware.ts` (for crawler fallback)
3. Create React component in `client/src/pages/`
4. Register route in `client/src/App.tsx`

**Image Performance Optimization (Feb 2026):**
- All hero images served as static files from `client/public/images/` (NOT via Vite @assets imports)
- Hero image mapping centralized in `server/hero-images.ts`
- HTTP `Link: rel=preload` header sent for hero images on every page request (dev + production)
- SSR renderer also injects `<link rel="preload">` tag into HTML (production)
- All below-fold images use `loading="lazy"`, hero images use `loading="eager"` + `fetchpriority="high"`
- Below-fold images resized to 800px wide (quality 75), hero images kept at 1200px (quality 78)
- Logo served as static file from `/images/089-sanierer-logo.webp` (NOT via Vite @assets)
- Favicon is 2.5K ICO file at `client/public/favicon.ico`
- IMPORTANT: When adding new pages with hero images, update `server/hero-images.ts`

### Build & Deployment

**Build Process:**
- Custom build script (`script/build.ts`) orchestrates both client and server builds
- Client build: Vite bundles React application to `dist/public`
- Server build: esbuild bundles Node.js server

**Development Environment:**
- Vite dev server with HMR (Hot Module Replacement)
- Development middleware integrated with Express server
