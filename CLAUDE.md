# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (localhost:3000)
npm run build     # Production build
npm start         # Start production server
npm run lint      # ESLint (typescript-eslint, flat config)
npm test          # Vitest (unit tests, single run)
npm run test:watch # Vitest in watch mode
npx vitest run src/lib/rule-engine.test.ts          # Run a single test file
npx vitest run -t "flattens a simple nested object"  # Run a single test by name
npx prisma generate          # Regenerate Prisma client after schema changes
npx prisma migrate dev       # Create/apply migrations during development
npx prisma db push           # Push schema changes without migration files
```

Tests live next to their source files as `*.test.ts` / `*.test.tsx`. Vitest config is in `vitest.config.ts` with jsdom environment and `@testing-library/jest-dom` matchers. Test files are excluded from `tsconfig.json` compilation but included by Vitest.

## Architecture

Next.js 16 App Router project — a public intake form platform that collects questionnaire responses across 12+ business categories, saves them to PostgreSQL, and emails them via Resend.

### Submission Flow

1. User picks a category on `/` (home page) → all categories now route to `/q/wizard?type={slug}`
2. Wizard renders a 3-step form driven by the field library and rule engine
3. Client calls `submitForm()` from `src/lib/submit.ts` → POST `/api/submit`
4. `src/app/api/submit/route.ts` checks rate limit + honeypot, saves to DB via Prisma, sends HTML email via Resend
5. Success screen renders inside `WizardShell`

### Universal Wizard (primary path)

The wizard at `/q/wizard` replaces the per-category static forms. It is data-driven: field definitions live in `src/lib/field-library/`, not in page components.

**3-step lifecycle:**
- **Step 1** — Universal groups: contact info, project type, business needs (keyNeeds checkboxes)
- **Step 2** — Conditional groups: the rule engine (`src/lib/rule-engine.ts`) maps keyNeeds selections to domain-specific field groups (ecommerce, scheduling, healthcare, etc.). If no conditional groups apply, Step 2 is skipped entirely.
- **Step 3** — Universal groups: design preferences and closing questions

**Key pieces:**
- `src/lib/field-library/types.ts` — `FieldDef`, `FieldGroup`, `FieldGroupId` type definitions
- `src/lib/field-library/groups/*.ts` — one file per group with field definitions (contact, ecommerce, scheduling, etc.)
- `src/lib/field-library/index.ts` — `ALL_GROUPS` registry, `getGroupsByStep()`, `getGroupById()`
- `src/lib/rule-engine.ts` — `NEED_TO_GROUP` mapping + `resolveStep2Groups()` + `CATEGORY_TO_NEEDS` (pre-selects keyNeeds from `?type=` query param)
- `src/lib/wizard/schema-builder.ts` — `buildSchema()` converts `FieldDef[]` to a Zod object schema at runtime
- `src/lib/wizard/use-wizard.ts` — `useWizard()` hook managing step state, per-step validation, sessionStorage persistence, and `flattenValues()` for RHF dot-path → flat key conversion
- `src/components/wizard/` — `WizardShell`, `WizardStep`, `DynamicSection`, `DynamicField`, `StepIndicator`, `StepNavigation`, `Honeypot`

**Adding a new field group to the wizard:**
1. Create `src/lib/field-library/groups/{name}.ts` — export a `FieldGroup` with `step: 2`
2. Add the group to `ALL_GROUPS` in `src/lib/field-library/index.ts`
3. Add the `FieldGroupId` to the union in `types.ts`
4. Map a keyNeeds value → group id in `NEED_TO_GROUP` in `src/lib/rule-engine.ts`

### Legacy Per-Category Forms

Static form pages still exist at `src/app/q/{category}/page.tsx` (restaurant, small-business, etc.) but the home page no longer links to them. They use `FormShell`, `FormSection`, `FormField` components with hand-written Zod schemas.

### Other Key Files

- `src/lib/db.ts` — Prisma client singleton using `@prisma/adapter-neon` for serverless Neon PostgreSQL.
- `src/lib/submit.ts` — client-side helper that POSTs form data and returns `{ success, error }`.
- `src/app/api/submit/route.ts` — single API route. Extracts common fields, stores full response as JSON in `submissions.data`, sends formatted HTML email.
- `src/lib/rate-limit.ts` — in-memory sliding window rate limiter (5 requests per IP per 15 min). Resets on cold starts.
- `src/components/wizard/Honeypot.tsx` — hidden field checked server-side; if filled, submission is silently accepted but discarded.
- `prisma/schema.prisma` — one `Submission` model: common fields + a `Json` column for the full form payload, indexed on `formType` and `createdAt`.

### Tech Stack

- **Next.js 16** (App Router, no middleware, no auth)
- **React 19** with "use client" on all form pages
- **Tailwind CSS v4** — theme tokens in `src/app/globals.css`: `brand-*` (teal), `accent-*` (amber), `success`, `error`, `warning`
- **React Hook Form** + `@hookform/resolvers` + **Zod** for validation (`mode: "onTouched"`)
- **Prisma 7** + **Neon** serverless PostgreSQL adapter
- **Resend** for transactional email (optional — submission succeeds even without API key)
- **Deploys to Vercel** (zero-config Next.js hosting)

### Adding a New Category

Add a category card to the `categories` array in `src/app/page.tsx`. It routes to `/q/wizard?type={slug}`. Map the slug to pre-selected keyNeeds in `CATEGORY_TO_NEEDS` in `src/lib/rule-engine.ts`. No new page file needed — the wizard handles all categories.

### Environment Variables

Defined in `.env` (see `.env.example`): `DATABASE_URL`, `RESEND_API_KEY`, `NOTIFY_EMAIL`, `RESEND_FROM_EMAIL`.

### Path Alias

`@/*` maps to `./src/*` (configured in tsconfig.json).

## CodeGlass Integration

Before coding: read all rules from `c:\Dev\Anthropicer\rules\`
After coding: write a walkthrough to `c:\Dev\Anthropicer\walkthroughs\IntakeForms\`
Reference: `c:\Dev\Anthropicer\CLAUDE.md` for full instructions

### Before Every Coding Task

1. **Read the rules.** Scan `c:\Dev\Anthropicer\rules\` for all rule files. Follow every rule. If a rule conflicts with what you are about to do, mention it.
2. **Check project context.** Read `c:\Dev\Anthropicer\projects\IntakeForms.md` for architecture notes.
3. **Check prior walkthroughs.** Search `c:\Dev\Anthropicer\walkthroughs\` for notes tagged with this project.

### After Every Coding Task

1. **Run the eval harness** if available. Execute `./scripts/eval.sh` and capture the score.
2. **Write a walkthrough** to `c:\Dev\Anthropicer\walkthroughs\IntakeForms\{date}-{task-slug}.md`

Use this frontmatter:
```yaml
---
project: "IntakeForms"
task: "{short task description}"
date: YYYY-MM-DD
eval-score: {score}/{total}
patterns:
  - "{Pattern Name}"
level: quick|standard|deep
status: pending-review
---
```

3. **Include wiki-links.** Every pattern gets a `[[Pattern Name]]` link. Every rule gets a `[[Rule: Name]]` link.
4. **Propose rules** if something broke or revealed a new pattern:
```
Proposed Rule: {short name}
Stack: {relevant technology}
Pattern: {what to do}
Reason: {why}
```

### Walkthrough Format

Five questions: **WHAT** (one sentence) | **HOW** (data journey with arrows) | **WHERE** (file map) | **WHEN** (timing) | **WHY** (design choices, alternatives, what breaks if changed)

Depth: Quick (config tweaks) = WHAT + WHY only. Standard (default) = all five. Deep (multi-file) = all five + connection map + what-if scenarios.

### Writing Style

- No jargon without a plain-English definition
- Use "you" not "the developer"
- Short paragraphs (3 sentences max)
- Bold all pattern names
- Trace data from human action to screen result, naming actual functions

### Pattern Library

Known patterns (link with `[[Pattern Name]]`): Fetch-on-Mount, Fetch-on-Change, Optimistic Update, Callback Prop, Controlled Input, Conditional Render, List Render, Layout Wrapper, Loading-Error-Data Triad, Single Client, RLS-Aware Insert, Auth Guard.

If you use a pattern not in the library, name it and mark it for creation.
