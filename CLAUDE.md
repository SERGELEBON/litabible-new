# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is **Litabible** — a Catholic liturgical readings and Bible application, originally inspired by AELF.org. It's a Next.js 16 + React 19 + TypeScript + Tailwind 4 + shadcn/ui single-page application that provides daily Mass readings, Liturgy of the Hours, full Bible access, liturgical calendar, videos/podcasts, and contact features.

**Key architectural decision:** Single-route application (`/` only) with client-side navigation managed via Zustand store. All page transitions happen without URL changes — the `useLitabibleStore` controls which page component renders.

## Essential Commands

```bash
# Development
bun run dev              # Start dev server on port 3000 (logs to dev.log)

# Build & Production
bun run build            # Next.js production build (standalone output)
bun run start            # Run production server from .next/standalone/

# Database (Prisma + SQLite)
bun run db:push          # Push schema changes (accepts data loss)
bun run db:generate      # Generate Prisma client
bun run db:migrate       # Create migration
bun run db:reset         # Reset database

# Code Quality
bun run lint             # ESLint check
bunx tsc --noEmit        # TypeScript type checking
```

## Architecture

### State Management (Zustand)
- **`src/lib/store.ts`** — Central client-side state:
  - `page: LitabiblePage` — which page is active (messe, heures, bible, apropos, rdv-dimanche, lecture-quotidienne, videos, calendrier, contact)
  - `selectedDate: string` — ISO date (YYYY-MM-DD) for liturgical content
  - `officeHour: OfficeHour` — which Liturgy of the Hours (lectures, laudes, tierce, sexe, none, vepres, complies)
  - `aproposSub: AproposSubPage` — sub-section within the "À propos" page
  - `bibleTab: 'at' | 'nt' | 'psaumes'` — Bible Testament tab
  - `locale: Locale` — UI language (en/fr/es)
  - `calendarZone: CalendarZone` — liturgical calendar region
- **No URL routing** — `page.tsx` uses `<PageSwitch />` to conditionally render page components based on store state.

### Data Layer
**Two-tier system: API routes + static fallbacks**

#### API Routes (`src/app/api/`)
- **`/api/messe/[date]`** — Fetches AELF daily Mass readings from https://api.aelf.fr/v1/messes/{date}. Returns `{source: "aelf-api" | "local-fallback", data}` envelope (always HTTP 200; fallback when upstream fails).
- **`/api/office/[hour]/[date]`** — Fetches AELF Liturgy of the Hours. Same fallback pattern.
- **`/api/bible/chapter?version=LSG&book=John&chapter=3`** — Multi-source Bible text (bolls.life primary, bible-api.com fallback). Returns full `ChapterResult` with verses.
- **`/api/bible/search?q=agape&version=LSG&limit=30`** — Bible search via bolls.life.
- **`/api/bible/versions`** — Static list of available Bible translations (long-cached).
- **`POST /api/contact`** — Zod-validated contact form submission (currently logs to console only).

#### Static Data Files (`src/data/`)
- **`types.ts`** — Shared TypeScript interfaces (LiturgicalColor, DayInfo, ReadingType, MassData, OfficeData, etc.).
- **`liturgical-calendar.ts`** — Computus algorithm for Easter calculation, feast day lookup, liturgical season determination (Advent, Christmas, Ordinary Time, Lent, Triduum, Easter), liturgical year cycle (A/B/C), color assignment. **Used when API fails or for calendar view**.
- **`mass-readings.ts`** — Sample daily Mass readings (5 days fully written in Louis Segond 1910 style). `getMassData(date)` falls back gracefully.
- **`office-hours.ts`** — Sample Liturgy of the Hours data (all 7 hours × 2 days). Includes hymns, psalms, readings, intercessions, canticles.
- **`bible-books.ts`** — Full Catholic canon (46 OT + 27 NT + 150 individual psalms). Exports `bibleBooks`, `oldTestamentBooks`, `newTestamentBooks`, `psalmsBooks` with realistic chapter counts and Bolls.life book ID mappings.
- **`aelf-content.ts`** — Static institutional content (missions, organization, FAQs, terms, privacy).
- **`litabible-content.ts`** — Additional static content specific to Litabible.
- **`videos-podcasts.ts`** — YouTube video placeholders + podcast audio URLs.
- **`contact.ts`** — Contact info and dropdown subject options.
- **`bible-text-fallback.ts`** — Emergency fallback Bible text samples.
- **`reading-plan.ts`** — Daily Bible reading plan data.

#### API Client Libraries (`src/lib/`)
- **`aelf-api.ts`** — Typed AELF client: `fetchMesse(date)`, `fetchOffice(hour, date)`. Returns `null` on failure. 12s timeout.
- **`bible-api.ts`** — Typed multi-source Bible client:
  - `bibleVersions[]` — List of 13 Bible translations (French: LSG/BDS/TOB/AELF/NEG/MAR; English: KJV/ESV/NIV/WEB/NLT; Spanish: RVR1960/NTV/RVA).
  - `resolveBookId(book)` — Accepts numeric IDs, English/French names, abbreviations → returns canonical 1..66 book ID.
  - `getChapter(version, bookName, chapter)` — Fetches from bolls.life (primary) or bible-api.com (fallback).
  - `searchBible(version, query, limit)` — Full-text search via bolls.life.
  - 10s timeout, graceful degradation (returns `[]` on failure).

### Component Organization
- **`src/components/lt/`** — Litabible-specific components (pages, navigation, header, footer, custom UI).
  - `pages/` — Page components: `bible-page.tsx`, `mass-page.tsx`, `hours-page.tsx`, `calendar-page.tsx`, `contact-page.tsx`, `videos-podcasts-page.tsx`, `apropos-page.tsx`, `rdv-dimanche-page.tsx`, `lecture-quotidienne-page.tsx`, `reseau-page.tsx`.
  - `site-header.tsx` — Top header with logo, social links, newsletter signup modal.
  - `main-nav.tsx` — Tab navigation (uses `ChevronTab` + `RedRibbon` for active tab styling).
  - `site-footer.tsx` — Footer component.
  - `black-button.tsx` — Custom black button component.
  - `chevron-tab.tsx` — Chevron/pointed tab motif.
  - `red-ribbon.tsx` — Decorative red bookmark ribbon.
  - `whatsapp-button.tsx` — Fixed WhatsApp contact button.
- **`src/components/aelf/`** — Original AELF-style components (legacy, mostly replaced by `lt/` versions).
- **`src/components/ui/`** — shadcn/ui components (50+ components: accordion, alert-dialog, button, calendar, card, carousel, chart, checkbox, command, dialog, dropdown-menu, form, input, label, popover, scroll-area, select, separator, slider, switch, tabs, toast, etc.).

### Internationalization
- **`src/lib/i18n.ts`** — Custom i18n system (no external library):
  - `LOCALES` constant: `['en', 'fr', 'es']`.
  - `useT()` hook — Returns translation function `t(key: string)`.
  - Translations stored as nested objects in `i18n.ts` (3000+ lines covering all UI strings).
  - Bible book names, liturgical terms, navigation labels, form labels, error messages all translated.

### Styling & Theming
- **Tailwind 4** with custom configuration (`tailwind.config.ts`).
- **Brand colors** (from worklog):
  - Primary red: `#bf2329`
  - Black buttons: `#000000`
  - Inactive tab: `#dadad9`
  - Body text: `#333333`
- **Font:** Open Sans only (weights 300/400/600/700) — configured in `src/app/layout.tsx`.
- **Background:** Stained-glass rosette image (amber/orange/yellow tones), fixed/cover.
- **Custom components:** Chevron-pointed active tab motif, decorative red ribbon with bookmark tail.

### Database (Prisma + SQLite)
- **Schema:** `prisma/schema.prisma` — Currently defines `User` and `Post` models (minimal, likely placeholder).
- **Location:** Database file path set via `DATABASE_URL` in `.env` (currently points to `/home/z/my-project/db/custom.db`).
- **Client:** Generated via `prisma generate` (runs on `postinstall`).
- **Note:** Most data is currently static files or API-fetched. Database may be for future features (user accounts, saved highlights, reading plans).

## Important Patterns

### Client-Only Rendering
Many components use a **client-only mounting guard** (see `src/app/page.tsx`):
```typescript
useSyncExternalStore(
  () => () => {},
  () => true,
  () => false
)
```
This prevents hydration mismatches for date-aware liturgical content (which relies on `new Date()` reflecting user timezone).

### Bible Book Resolution
When working with Bible references:
1. Use `resolveBookId()` from `bible-api.ts` — it accepts:
   - Numeric IDs (1-66)
   - English names ("Genesis", "1 Corinthians", "Revelation")
   - French names ("Genèse", "1 Corinthiens", "Apocalypse")
   - Common abbreviations ("Gen", "Ps", "Mt", "Jn")
2. Returns canonical 1-66 book ID.
3. Use `bookIdToName(id)` for inverse mapping.

### Liturgical Date Handling
- Store uses ISO dates (YYYY-MM-DD strings) for `selectedDate`.
- `liturgical-calendar.ts` contains Computus algorithm for Easter calculation.
- Liturgical colors determined by season/feast: violet (Advent/Lent), white (Christmas/Easter), green (Ordinary Time), red (Pentecost/martyrs), rose (Gaudete/Laetare Sundays).
- Precedence rules: Solemnities > Sundays > Feasts > Memorials.

### API Fallback Strategy
All external API calls follow this pattern:
1. Try upstream API (AELF, bolls.life, bible-api.com) with timeout (10-12s).
2. On failure, return graceful fallback:
   - Mass/Office: Use static sample data from `src/data/` with `(modèle)` suffix.
   - Bible: Try secondary source, then return empty `[]`.
3. Always return HTTP 200 with success/fallback envelope (frontend decides how to handle).

## Development Notes

- **Next.js config:** `output: "standalone"` for containerized deployment, `typescript.ignoreBuildErrors: true` (fix before production), `reactStrictMode: false`.
- **No Git submodules or monorepo** — single package.json, all code in `src/`.
- **Many screenshot files in root** — these are design references/mockups, not bundled in production.
- **`.idea/` directory exists** — JetBrains IDE config (should be in `.gitignore`).
- **`worklog.md`** — Detailed development history (3000+ lines). Read this for context on past decisions, but don't modify it.
- **`examples/`, `mini-services/`, `tests/`, `tool-results/`, `upload/`, `.zscripts/`, `download/`** — Various auxiliary directories (check contents before assuming purpose).

## Common Pitfalls

1. **Don't break single-route constraint** — Never add Next.js routes beyond `/`. All navigation is client-side via Zustand.
2. **Don't rely on URL state** — No query params, no route params. State lives in Zustand store only.
3. **Respect liturgical precedence** — When displaying calendar/feast days, follow Roman liturgical hierarchy (see `liturgical-calendar.ts`).
4. **Bible book names are multilingual** — Always use `resolveBookId()` rather than hardcoding book IDs.
5. **Date handling is timezone-sensitive** — Use ISO strings, not locale-formatted dates. Client-only components for liturgical content.
6. **API timeouts are strict** — Don't increase beyond 12s without redesigning UX (users expect fast fallback to local data).
7. **Typographic apostrophes** — French text uses U+2019 (') not ASCII apostrophe (') — regex pass was done on data files.

## Tech Stack Summary
- **Runtime:** Bun (package manager + production server)
- **Framework:** Next.js 16 (App Router, standalone output)
- **UI Library:** React 19
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4
- **Components:** shadcn/ui (Radix UI primitives)
- **State:** Zustand 5
- **Forms:** react-hook-form + Zod
- **Database:** Prisma + SQLite
- **Icons:** Lucide React
- **Animations:** Framer Motion
- **Markdown:** react-markdown + @mdxeditor/editor
- **Drag & Drop:** @dnd-kit
- **Date Utilities:** date-fns
- **API Clients:** Custom typed fetch wrappers (no Axios/SWR)

## External APIs Used
- **AELF API:** `https://api.aelf.fr/v1/` (Mass readings, Liturgy of the Hours)
- **Bolls.life Bible API:** `https://bible-api.bolls.life/v2/` (primary Bible text source)
- **Bible API:** `https://bible-api.com/` (fallback Bible source)

## Future Considerations
- Contact form currently only logs to console — implement email backend or database storage.
- User/Post Prisma models are placeholders — implement authentication and user-generated content if needed.
- Consider URL routing for deep links (would require major refactor of Zustand-based navigation).
- Add proper error boundaries for API failures.
- Implement caching strategy for frequently accessed Bible chapters.