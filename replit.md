# 089Dach - Funnel Landing Page

## Overview

089Dach is a lead generation funnel website for a roofing service company based in Munich, Germany. The application provides a multi-step form interface where potential customers can request services for roof work, storm damage repairs, or emergency services. The funnel guides users through service selection, problem description, and contact information collection, ultimately storing leads in a database for follow-up.

## User Preferences

Preferred communication style: Simple, everyday language.

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
- Custom business components in `client/src/components/` for funnel-specific features

**Design System:**
- Reference-based design approach inspired by service industry funnels (Handy, HomeAdvisor)
- Typography: Inter/Open Sans font family via Google Fonts
- Responsive layout using Tailwind's utility classes with mobile-first approach
- Custom color scheme defined in CSS variables supporting light/dark modes
- Consistent spacing system using Tailwind's standardized units (4, 6, 8, 12, 16, 24)

**Form Management:**
- React Hook Form for form state management and validation
- Zod for runtime type validation and schema definition
- @hookform/resolvers for integrating Zod schemas with React Hook Form

**Key User Flow:**
1. Landing page displays three service options (Dacharbeiten, Sturmschaden, Notdienst)
2. Multi-step form with progress indicator guides users through:
   - Service selection
   - Problem description with urgency flag
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
- Input validation using Zod schemas with detailed error messages via zod-validation-error

**Data Layer:**
- Repository pattern implemented via `IStorage` interface in `server/storage.ts`
- `DatabaseStorage` class provides concrete implementation
- Clean separation between business logic and data access

**Request/Response Flow:**
- Middleware chain includes JSON parsing with raw body preservation
- Request logging with timestamp and duration tracking
- Error handling with appropriate HTTP status codes
- CORS support for development/production environments

### Database Architecture

**ORM & Database:**
- Drizzle ORM for type-safe database operations
- PostgreSQL as the relational database (configured via DATABASE_URL environment variable)
- Connection pooling via node-postgres (pg) for efficient connection management

**Schema Design:**
- Two primary tables defined in `shared/schema.ts`:
  - `users` table: User authentication (id, username, password)
  - `leads` table: Customer inquiries with fields for service type, description, urgency flag, contact details, and location
- UUID primary keys using PostgreSQL's `gen_random_uuid()`
- Timestamp tracking for lead creation
- Zod schemas derived from Drizzle table definitions for validation

**Migration Strategy:**
- Drizzle Kit for schema migrations
- Migration files stored in `/migrations` directory
- Push-based deployment via `db:push` script

### Build & Deployment

**Build Process:**
- Custom build script (`script/build.ts`) orchestrates both client and server builds
- Client build: Vite bundles React application to `dist/public`
- Server build: esbuild bundles Node.js server with selective dependency bundling
- Allowlist approach bundles critical dependencies while externalizing others for reduced cold start times

**Development Environment:**
- Vite dev server with HMR (Hot Module Replacement) via `/vite-hmr` path
- Development middleware integrated with Express server
- Replit-specific plugins for runtime error overlay and developer tools

**Production Configuration:**
- Static file serving from built client assets
- SPA fallback routing to `index.html`
- Environment-based configuration (NODE_ENV)

## External Dependencies

**UI Component Libraries:**
- Radix UI primitives for accessible component foundations (accordion, dialog, dropdown, popover, select, tabs, toast, etc.)
- Lucide React for iconography
- cmdk for command palette functionality
- embla-carousel-react for carousel components
- class-variance-authority and clsx for conditional styling utilities

**Database & ORM:**
- PostgreSQL database (connection via DATABASE_URL environment variable)
- Drizzle ORM for database operations
- node-postgres (pg) for PostgreSQL client
- drizzle-kit for schema management and migrations

**Validation & Type Safety:**
- Zod for runtime type validation
- drizzle-zod for generating Zod schemas from Drizzle tables
- TypeScript for compile-time type checking

**Date Handling:**
- date-fns for date formatting and manipulation

**Development Tools:**
- Replit-specific plugins (@replit/vite-plugin-runtime-error-modal, @replit/vite-plugin-cartographer, @replit/vite-plugin-dev-banner)
- PostCSS with Tailwind CSS and Autoprefixer for CSS processing

**Note:** The application currently uses Drizzle ORM with PostgreSQL. The database must be provisioned with DATABASE_URL environment variable set before the application can run.