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

**Crawler Support:**
- `server/crawler-middleware.ts` - Serves full static HTML to search engine bots
- Prerender.io integration for production (PRERENDER_TOKEN env var)
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

**Bug Fixes Applied (Jan 2026):**
- Removed javascript:history.back() from 404 page (replaced with button onClick)
- Added schema duplicate detection in seo-head.tsx to prevent SSR + client double injection

**Files for adding new pages with SEO:**
1. Add route metadata to `shared/seo-meta.ts`
2. Add static HTML content to `server/crawler-middleware.ts` (for crawler fallback)
3. Create React component in `client/src/pages/`
4. Register route in `client/src/App.tsx`

### Build & Deployment

**Build Process:**
- Custom build script (`script/build.ts`) orchestrates both client and server builds
- Client build: Vite bundles React application to `dist/public`
- Server build: esbuild bundles Node.js server

**Development Environment:**
- Vite dev server with HMR (Hot Module Replacement)
- Development middleware integrated with Express server
