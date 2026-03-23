# CodeGlass — Walkthrough Format Reference

Exact templates for each depth level with real examples from the React/TypeScript/Supabase stack.

---

## Table of Contents

1. [Level 1 — Quick Glass](#level-1--quick-glass)
2. [Level 2 — Standard Glass](#level-2--standard-glass)
3. [Level 3 — Deep Glass](#level-3--deep-glass)
4. [Reverse Glass (Explain Mode)](#reverse-glass)
5. [Failure Trace Format](#failure-trace)
6. [Data Journey Format](#data-journey)
7. [Writing Style Notes](#writing-style)

---

## Level 1 — Quick Glass

Use for: single-line changes, config fixes, import corrections, dependency updates.

### Template

```markdown
## 🔍 CodeGlass — Quick

**WHAT:** [one sentence, no jargon]

**WHY:** [why this change, what was wrong before, what breaks without it]
```

### Example

```markdown
## 🔍 CodeGlass — Quick

**WHAT:** Changed the Supabase client import to pull from a shared config file instead
of creating a new client in this component.

**WHY:** Every time you write `createClient(url, key)` in a component, you get a brand
new connection. That means auth state doesn't share between components — you could be
logged in on one page and logged out on another. By importing from `lib/supabase.ts`,
every component uses the same client and shares the same auth session. This is the
**single-client pattern** — you'll want this in every project.
```

---

## Level 2 — Standard Glass

Use for: new components, features, bug fixes, API routes, hooks.

### Template

```markdown
## 🔍 CodeGlass

**WHAT:** [one sentence — what does this code do in plain English]

**HOW — The Data Journey:**
> [trace the flow from user action to result, using → arrows]
> Step 1: [user action or trigger]
> Step 2: [what code fires]
> Step 3: [what that code calls or does]
> Step 4: [what comes back]
> Step 5: [what the user sees change]

**WHERE — File Map:**
- `[filename]` — [what it holds and why it's here]
- `[filename]` — [what it holds and why it's here]

**WHEN — Timing:**
- On page load: [what runs]
- On user action: [what runs]
- On data change: [what re-renders]

**WHY — Design Choices:**
- [chose X because Y]
- [alternative would be Z, but it breaks when...]

**Patterns Used:**
- **[Pattern Name]** — [one-line description of where it appears]

**Danger Zones:**
- ⚠️ [thing most likely to break and why]

📝 Proposed Rule: [if applicable]
```

### Example

```markdown
## 🔍 CodeGlass

**WHAT:** A form component that lets a user add a new hive inspection record
to the SwarmCast database.

**HOW — The Data Journey:**
> 1. User fills in the form fields (date, hive ID, queen spotted, notes)
> 2. User clicks "Save Inspection"
> 3. The `handleSubmit` function fires — it prevents the default form reload,
>    grabs all values from React state, and packages them into an object
> 4. That object gets passed to `supabase.from('inspections').insert(data)`
> 5. Supabase writes the row. We destructure the response into `{ data, error }`
> 6. If error exists → we show a red toast with the error message
> 7. If success → we clear the form, show a green toast, and call `onSuccess()`
>    which tells the parent component to refresh the inspection list
> 8. The parent's `useEffect` fires (because its dependency changed), fetches
>    the updated list from Supabase, and the new inspection appears

**WHERE — File Map:**
- `components/InspectionForm.tsx` — The form itself. Holds local state for form
  fields, the submit handler, and the UI. It's a component (not a page) because
  it gets reused on both the dashboard and the hive detail page.
- `lib/supabase.ts` — The shared Supabase client. One file, one client, imported
  everywhere. Never create a client inside a component.
- `types/database.ts` — TypeScript types generated from the Supabase schema.
  The form data matches the `inspections` table's insert type so TypeScript
  catches field mismatches before runtime.

**WHEN — Timing:**
- On page load: nothing in this component — it's a form, it waits for input
- On user typing: each keystroke updates React state via `onChange` handlers
  (the **controlled input pattern**)
- On submit click: `handleSubmit` fires, the Supabase call happens, side effects run
- On success: parent re-fetches data, list re-renders

**WHY — Design Choices:**
- Used controlled inputs (state for each field) instead of `useRef` or FormData
  because we need to validate fields before submit and clear them after
- Put the Supabase call directly in the component instead of a separate API route
  because this is a client-side app with RLS — no server needed for simple inserts
- Used `onSuccess` callback prop instead of managing the list inside this component
  because the form shouldn't know about the list — **separation of concerns**

**Patterns Used:**
- **Controlled input pattern** — form fields backed by `useState`, updated on every keystroke
- **Optimistic error handling** — try the insert, check for error, show feedback
- **Callback prop pattern** — parent passes `onSuccess` so child can signal completion
  without knowing what happens next
- **Single-client pattern** — importing the shared Supabase instance

**Danger Zones:**
- ⚠️ The Supabase insert will silently return `null` data if RLS policies block it.
  Always check for `error` AND check that `data` is not null.
- ⚠️ If the TypeScript types are stale (generated before a schema change),
  you'll get type errors that look like field name typos. Regenerate types
  after any migration.

📝 Proposed Rule: Always destructure Supabase responses as `{ data, error }` and
check BOTH — an RLS block returns no error but also no data.
```

---

## Level 3 — Deep Glass

Use for: architecture decisions, multi-file features, new systems, auth flows, state management.

### Template

Everything in Level 2, plus:

```markdown
**Connection Map:**
- This change touches: [list of files affected]
- `[file A]` → calls → `[file B]` → reads from → `[file C]`
- If you change [X] in this file, you also need to update [Y] in [other file]

**What Would Break If...:**
- ...you removed [X]? → [consequence]
- ...you renamed [Y]? → [what else references it]
- ...the database schema changed? → [which types/queries break]

**Alternative Approaches:**
| Approach | Pros | Cons | Why we didn't use it |
|----------|------|------|---------------------|
| [alt 1]  | ...  | ...  | ...                 |
| [alt 2]  | ...  | ...  | ...                 |
```

---

## Reverse Glass

Use when explaining existing code the user already has.

### Key Differences from Standard Glass

1. **Read everything first.** Don't explain line by line as you go. Read the full
   file (or files), understand the system, then explain top-down.

2. **Follow execution order, not file order.** Start with what triggers first
   (page load, user action) and trace forward. Don't start with imports.

3. **Acknowledge the messy parts.** If the code has inconsistencies, odd choices,
   or unclear naming, say so: "This variable is called `data2` which isn't
   descriptive — it's actually the user's profile object." This builds trust
   and teaches code quality by example.

4. **Pause for check-in.** After the HOW section, ask: "Does the data journey
   make sense so far? Want me to go deeper on any step?" Don't just dump
   all five sections at once.

### Template

```markdown
## 🔍 CodeGlass — Reverse

**WHAT:** [one sentence — what does this existing code do]

**HOW — The Data Journey:**
[same format as Standard Glass, but traced from the existing code]

*Does this make sense so far? Want me to go deeper on any part?*

**WHERE — File Map:**
[map existing files, note any confusing organization]

**WHEN — Timing:**
[identify all triggers in the existing code]

**WHY — Reconstructed Reasoning:**
[best guess at why the code was written this way, noting uncertainties]
- "This was probably done because..." 
- "I'm not sure why this uses X instead of Y — it might be a leftover from..."

**Health Check:**
- ✅ [things that follow good patterns]
- ⚠️ [things that work but could cause problems later]
- ❌ [things that are actually broken or will break]
```

---

## Failure Trace

When the eval harness fails, add this section to the walkthrough.

### Template

```markdown
## ❌ Failure Trace

**What broke:** [which eval step failed — build, lint, typecheck, etc.]

**The error says:** [paste the actual error, then translate it]

**In plain English:** [what this error actually means — one sentence]

**Why it happened:** [the chain of cause — "I used X, which expects Y, but
the project has Z configured"]

**The fix:** [what needs to change and why that fixes it]

**Rule to prevent this:** [if applicable, propose a rule]
```

---

## Data Journey

The data journey is the most important part of every walkthrough. Here's how
to write one well.

### Rules

1. **Start with a human action or a system trigger.** Never start with code.
   - ✅ "When the user clicks Save..."
   - ✅ "When the page loads..."
   - ❌ "The useEffect hook calls fetchData..."

2. **Use → arrows for the flow.** Each arrow is a boundary crossing —
   component to function, function to API, API to database, database back.

3. **Name the actual functions and files.** Don't abstract. Say `handleSubmit`
   not "the submit handler." The user needs to be able to find it.

4. **End with what the user sees.** The journey isn't complete until something
   visible changes (or explicitly nothing changes, and why).

5. **Call out the invisible steps.** React re-rendering, TypeScript type checking,
   Supabase RLS policy evaluation — these are where things break and they're
   invisible. Name them.

### Example Patterns

**Form submit journey:**
> User clicks Submit → `handleSubmit(e)` prevents page reload → builds
> data object from state → calls `supabase.from('table').insert(data)` →
> Supabase checks RLS policies → writes row → returns `{ data, error }` →
> if error: show toast → if success: clear form, notify parent → parent
> re-fetches list → React re-renders with new data visible

**Page load with data journey:**
> User navigates to `/dashboard` → React Router mounts `DashboardPage` →
> `useEffect([], [])` fires (empty dependency = runs once on mount) →
> calls `supabase.from('hives').select('*')` → Supabase checks RLS,
> runs query → returns rows → `setHives(data)` updates state → React
> re-renders, `.map()` turns each hive into a `<HiveCard>` component

**Auth-protected route journey:**
> User hits `/dashboard` → `ProtectedRoute` component mounts → calls
> `supabase.auth.getUser()` → if no session: redirects to `/login` →
> if session exists: renders the child route → dashboard loads normally

---

## Writing Style Notes

These rules override Claude's default style when writing CodeGlass walkthroughs.

1. **No jargon without a definition on first use.** If you say "destructure,"
   immediately follow with what that means: "destructure (pull out the specific
   fields we need, like unpacking a box)."

2. **Use "you" not "the developer."** This is a conversation, not documentation.

3. **Analogies are encouraged.** If `useEffect` with an empty dependency array
   is "like telling React to do this chore once when you first walk in the door,
   and then never again until you leave and come back" — say that.

4. **Short paragraphs.** Three sentences max per paragraph. The user's attention
   works in bursts — match that rhythm.

5. **Bold the pattern names.** Every named pattern gets **bold** so it stands out
   and becomes searchable across walkthroughs.

6. **Use the user's project names.** Say "in SwarmCast" or "in Triangulate" —
   not "in your project." Specificity builds connection.
