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
npx prisma generate          # Regenerate Prisma client after schema changes
npx prisma migrate dev       # Create/apply migrations during development
npx prisma db push           # Push schema changes without migration files
```

Tests live next to their source files as `*.test.ts` / `*.test.tsx`. Vitest config is in `vitest.config.ts` with jsdom environment and `@testing-library/jest-dom` matchers.

## Architecture

Next.js 16 App Router project — a public intake form platform that collects questionnaire responses across 12+ business categories, saves them to PostgreSQL, and emails them via Resend.

### Submission Flow

1. User picks a category on `/` (home page)
2. Fills out the form at `/q/{category}` — validated client-side with Zod + React Hook Form
3. Client calls `submitForm()` from `src/lib/submit.ts` → POST `/api/submit`
4. `src/app/api/submit/route.ts` saves to DB via Prisma, sends HTML email via Resend
5. Success screen renders inside `FormShell`

### Key Directories

- `src/app/q/{category}/page.tsx` — one "use client" page per questionnaire type. Each defines its own Zod schema, fields, and section layout. Common fields: contactName, email, phone, businessName.
- `src/components/` — shared form UI: `FormShell` (wrapper + success state), `FormSection` (card grouping), `FormField` (label + error + input variants: TextInput, TextArea, SelectInput, CheckboxGroup, RadioGroup), `SubmitButton` (loading spinner).
- `src/lib/db.ts` — Prisma client singleton using `@prisma/adapter-neon` for serverless Neon PostgreSQL.
- `src/lib/submit.ts` — client-side helper that POSTs form data and returns `{ success, error }`.
- `src/app/api/submit/route.ts` — single API route. Extracts common fields, stores full response as JSON in `submissions.data`, sends formatted HTML email.
- `prisma/schema.prisma` — one `Submission` model: common fields + a `Json` column for the full form payload, indexed on `formType` and `createdAt`.

### Tech Stack

- **Next.js 16** (App Router, no middleware, no auth)
- **React 19** with "use client" on all form pages
- **Tailwind CSS v4** — theme tokens defined in `src/app/globals.css` (brand-50 through brand-900)
- **React Hook Form** + `@hookform/resolvers` + **Zod** for validation (`mode: "onTouched"`)
- **Prisma 7** + **Neon** serverless PostgreSQL adapter
- **Resend** for transactional email (optional — submission succeeds even without API key)
- **Deploys to Vercel** (zero-config Next.js hosting)

### Adding a New Questionnaire

1. Create `src/app/q/{slug}/page.tsx` — copy an existing form as template
2. Define a Zod schema for the category-specific fields
3. Use `FormShell`, `FormSection`, `FormField` components for layout
4. Call `submitForm(formName, data)` on submit — no API changes needed
5. Add the category card to the home page (`src/app/page.tsx`)

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
