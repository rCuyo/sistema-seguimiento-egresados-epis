# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev          # Start dev server (Next.js 16, port 3000)
npm run build        # Production build
npm run start        # Start production server (after build)
npm run lint         # ESLint
npm run seed         # Seed the database with test data (runs prisma/seed.ts via tsx)
npx prisma migrate dev   # Run pending migrations
npx prisma studio        # Open Prisma Studio GUI
npx prisma generate      # Regenerate client after schema changes (also runs on postinstall)
```

No test suite is configured. There is no `test` script.

## Environment

Requires a `.env` file with:
- `DATABASE_URL` — PostgreSQL connection string (pooled, e.g. via PgBouncer/Supabase)
- `DIRECT_URL` — direct (non-pooled) PostgreSQL URL; used by Prisma for migrations
- `NEXTAUTH_SECRET` — secret for JWT signing
- `NEXTAUTH_URL` — canonical URL (e.g. `http://localhost:3000`)

## Architecture

**Stack:** Next.js 16 App Router · PostgreSQL · Prisma 5 · NextAuth v4 (Credentials) · Tailwind CSS v4 · shadcn/ui (radix-nova style) · Zod · React Hook Form · Recharts · @react-pdf/renderer · xlsx

`@react-pdf/renderer` is listed in `next.config.ts` under `serverExternalPackages` — this is required for PDF generation to work on the server; do not remove it.

### Route groups

```
src/app/
  (auth)/         # /login, /registro — public, no layout shell
  (public)/       # / (landing), /empleos — public job board
  (dashboard)/    # /admin/*, /egresado/*, /escuela/* — protected
    layout.tsx    # Wraps everything in <DashboardShell>
  api/            # Route handlers
```

Middleware (`middleware.ts`) uses `next-auth/middleware` (`withAuth`) to protect `/admin/*`, `/egresado/*`, and `/escuela/*`. It also enforces role-based access: an ADMIN hitting `/egresado` is redirected to `/admin`, etc.

#### Admin pages (`/admin`)
| Path | Purpose |
|---|---|
| `/admin` | Dashboard with KPI summary |
| `/admin/egresados` | Graduate list; `/admin/egresados/[id]` detail |
| `/admin/bolsa-laboral` | Job offer list; `/nueva` create; `/[id]/editar` edit |
| `/admin/encuestas` | Survey list; `/nueva` create; `/[id]/editar` edit; `/[id]/resultados` responses |
| `/admin/postulaciones` | Job application list + status management |
| `/admin/reportes` | Analytics dashboard with charts + PDF/Excel export |
| `/admin/configuracion` | System settings |

#### Graduate pages (`/egresado`)
| Path | Purpose |
|---|---|
| `/egresado` | Personal dashboard |
| `/egresado/perfil` | View/edit profile and work experience |
| `/egresado/empleos` | Job board; `/egresado/empleos/[id]` detail + apply |
| `/egresado/encuestas` | Pending/completed surveys; `/egresado/encuestas/[id]` take survey |

### Three user roles

| Role | Dashboard prefix | Description |
|---|---|---|
| `ADMIN` | `/admin` | Full system access, manages graduates/jobs/surveys/reports |
| `GRADUATE` | `/egresado` | Views own profile, jobs, surveys |
| `SCHOOL` | `/escuela` | School-level view (partially implemented) |

Session token carries `id`, `role`, and `graduateId` (null for admin). Authentication also checks `user.isActive` — inactive users are rejected even with valid credentials.

### Data layer

**Prisma client** is generated to `src/generated/prisma` (not the default location). Always import from `@/generated/prisma`, never `@prisma/client`.

```ts
import { PrismaClient, Role, EmploymentStatus } from "@/generated/prisma"
import { prisma } from "@/lib/prisma"   // singleton
```

**Auth config** lives in `src/lib/auth.ts` and exports `authOptions`. Import it from there in both API routes and server components — do not define a second `authOptions` elsewhere.

**Service layer** (`src/lib/services/`) contains all Prisma queries. API route handlers call services; they never query Prisma directly. Services export inferred types at the bottom of each file (e.g. `JobListItem`, `GraduateApplication`).

| Service file | Domain |
|---|---|
| `graduate.service.ts` | Graduate profile read/update (used by `/egresado` routes) |
| `admin-graduates.service.ts` | Graduate CRUD + filtering (used by `/admin/egresados`) |
| `jobs.service.ts` | Job offers + applications (public, admin, and graduate views) |
| `surveys.service.ts` | Survey CRUD, responses, and per-graduate state |
| `analytics.service.ts` | KPIs and chart data; accepts `AnalyticsFilters` (`facultyId`, `schoolId`, `year`, `status`) |
| `dashboard.service.ts` | Summary counts for dashboard home cards |
| `public.service.ts` | Public-facing queries (school list for registration, public jobs) |

### API route conventions

- Auth check: `getServerSession(authOptions)` → 401 if no session, 403 if wrong role
- Pagination uses `page` + `pageSize` query params; services return `{ data, total, page, pageSize, totalPages }`
- Admin routes live under `src/app/api/admin/`; graduate/public routes are one level up

#### API route inventory

```
/api/auth/[...nextauth]           # NextAuth handler
/api/public/schools               # School list (used by registration)
/api/jobs                         # Public job listing
/api/jobs/[id]                    # Public job detail
/api/jobs/[id]/apply              # Graduate applies to job
/api/graduates/me                 # Authenticated graduate profile
/api/dashboard/graduate           # Graduate dashboard stats
/api/surveys/[id]                 # Survey detail (graduate view)
/api/surveys/[id]/respond         # Submit survey response
/api/admin/graduates              # Graduate list + create
/api/admin/graduates/[id]         # Graduate detail + update + delete
/api/admin/jobs                   # Job offer list + create
/api/admin/jobs/[id]              # Job detail + update + delete
/api/admin/jobs/[id]/toggle       # Activate/deactivate job offer
/api/admin/applications           # Application list
/api/admin/applications/[id]/status  # Update application status
/api/admin/surveys                # Survey list + create
/api/admin/surveys/[id]           # Survey detail + update + delete
/api/admin/surveys/[id]/toggle    # Activate/deactivate survey
/api/admin/surveys/[id]/results   # Survey response results
/api/admin/analytics              # Analytics data (supports AnalyticsFilters query params)
/api/admin/analytics/export       # Excel export of analytics data
/api/admin/reports/pdf            # PDF report generation via @react-pdf/renderer
```

### Key data models

`Faculty → School → Graduate ← User` (one-to-one via `userId`)
`Graduate → WorkExperience[]` (employment history; `isCurrent` marks the active role)
`Survey → SurveyQuestion → SurveyAnswer ← SurveyResponse ← Graduate`
`Company → JobOffer ← JobApplication ← Graduate`

`SurveyAnswer.value` and `SurveyQuestion.options` are `Json` columns. Question types: `"text" | "textarea" | "single" | "multiple" | "rating" | "yesno"`.

`JobApplication.status` is a plain string (not an enum): `"PENDING" | "REVIEWED" | "INTERVIEW" | "ACCEPTED" | "REJECTED"`.

### Seed credentials

```
Admin:    admin@unap.edu.pe    / admin123
Graduate: juan.mamani@gmail.com / password123
```

### Server Actions vs API routes

The app uses both patterns:

- **Server Actions** (`src/lib/actions/`) — form mutations wired with `useActionState`. Currently used for registration (`auth.actions.ts` exports `registerGraduate` for the `/registro` page and `registerGraduateModal` for the public landing modal).
- **API routes** (`src/app/api/`) — all other data fetching and mutations from client components.

### Validation schemas

`src/lib/validations/` contains Zod schemas **and** human-readable label maps (e.g., `JOB_TYPE_LABELS`, `APP_STATUS_LABELS`). Import from there instead of redefining them in components.

### Component organization

`src/components/` mirrors the domain hierarchy:

```
src/components/
  admin/{analytics,graduates,jobs,surveys,applications,pdf}/
  dashboard/graduate/
  jobs/
  profile/
  public/
  surveys/
  auth/
  layout/       # DashboardShell, Sidebar, Navbar
  ui/           # shadcn primitives only
```

### TypeScript type augmentation

`src/types/next-auth.d.ts` already extends `Session`, `User`, and `JWT` with `id`, `role`, and `graduateId`. Do not re-declare them elsewhere.

### Unimplemented stubs

- `Event` model exists in `prisma/schema.prisma` but has no service or API route.
- `/escuela` dashboard is a single placeholder page with no real functionality.

### UI conventions

- shadcn/ui components live in `src/components/ui/`; add new ones with `npx shadcn add <component>`
- Tailwind v4 — no `tailwind.config.ts`; theme tokens are in `src/app/globals.css` using OKLch color space
- Institutional brand colors (defined in `globals.css`): `--color-una-primary: #1E3A5F` (dark navy), `--color-una-secondary: #2563EB` (bright blue), `--color-una-accent: #38BDF8` (sky blue)
- Loading states use co-located `loading.tsx` files (React Suspense boundaries) and `*-skeleton.tsx` components
- Toast notifications use `sonner`
- `src/components/providers.tsx` wraps `SessionProvider`; use `useSession()` in client components and `getServerSession(authOptions)` in server components / API routes
