---
name: codeglass
description: >
  A comprehension-first coding skill that ensures every piece of AI-generated code comes with a
  plain-English walkthrough explaining WHAT it does, HOW the pieces connect, WHERE each part lives,
  WHEN each part runs, and WHY that approach was chosen. Use this skill on EVERY coding task — 
  component creation, bug fixes, refactors, new features, schema changes, API routes, scripts,
  anything that produces or modifies code. Trigger on ANY code generation or modification request.
  Also trigger when the user says "explain this", "walk me through this", "how does this work",
  "CodeGlass", "glass this", "I don't understand this code", "break this down for me", or
  any request to understand existing code. This skill is NON-OPTIONAL for this user — every
  code output gets a CodeGlass walkthrough. No exceptions.
---

# CodeGlass — Comprehension-First Coding

## The Rule

**No code ships without understanding. Every code output includes a CodeGlass walkthrough.**

This isn't a documentation tool. It's a learning system. The walkthrough exists so the human
can trace every connection, predict what would break if something changed, and eventually
stop needing the walkthrough at all.

## How It Works

Every time you produce or modify code, you also produce a **CodeGlass Walkthrough** immediately
after the code. The walkthrough follows a fixed format (see `references/walkthrough-format.md`)
built around five questions:

1. **WHAT** — One sentence. What does this code do? No jargon.
2. **HOW** — Trace the flow. User does X → this fires → calls that → returns Y → screen shows Z.
3. **WHERE** — File map. Which file holds what, and why it's there instead of somewhere else.
4. **WHEN** — Timing. What runs on load? On click? On data change? On route change?
5. **WHY** — Design choices. Why this approach? What's the alternative? What would break if you changed it?

## Walkthrough Principles

**Write for pattern recognition, not memorization.** The user's brain finds connections fast.
Use that. Show how this component follows the same pattern as one they've seen before.
Call out when a pattern breaks and why.

**Trace the data journey.** The biggest gap is understanding how pieces interact. Every
walkthrough must include a "data journey" — a plain-English trace of information flowing
from user action to database and back. Example:
> "When you click Submit → the `handleSubmit` function fires → it takes the form values
> and calls `supabase.from('inspections').insert(formData)` → Supabase writes the row
> and returns the new record → we update the local state with that record → React
> re-renders and the new item appears in the list."

**Use the stack they know.** Frame everything in terms of React, TypeScript, Tailwind,
Supabase, and Vite. Don't introduce abstractions they haven't seen. When something new
appears (a hook, a pattern, a library), explain it in terms of something they already know.

**Name the pattern.** Every code block uses patterns — state management, data fetching,
conditional rendering, event handling, type narrowing. Name the pattern explicitly so it
becomes recognizable across projects. "This is the **fetch-on-mount pattern** — you'll
see this in almost every component that loads data."

**Flag the danger zones.** Mark the parts most likely to break and explain why. These become
candidates for the rules file. "This Supabase query will fail silently if RLS policies
block the insert — you won't get an error, you'll just get an empty response."

## Walkthrough Depth Levels

Not every output needs the same depth. Calibrate:

**Level 1 — Quick Glass** (for small changes, single-line fixes, config tweaks)
- WHAT + WHY only
- 2-4 sentences
- Example: "Changed the import path from relative to alias. The old path broke when
  files moved. The `@/` alias always resolves from project root so it survives refactors."

**Level 2 — Standard Glass** (for new components, features, bug fixes)
- All five questions (WHAT, HOW, WHERE, WHEN, WHY)
- Data journey included
- Pattern names called out
- 1-2 paragraphs per section

**Level 3 — Deep Glass** (for architecture decisions, multi-file changes, new systems)
- Everything in Level 2
- Connection map showing how this change affects other files
- "What would break if..." scenarios
- Explicit comparison to alternative approaches

Default to Level 2. Drop to Level 1 for trivial changes. Escalate to Level 3 when
the change touches multiple files or introduces a new pattern.

## Integration with Eval Harness

When an eval harness exists (`scripts/eval.sh`), run it after every code generation.
Report the score alongside the walkthrough:

```
## Eval Result: 4/4 passed
✅ npm install — clean
✅ npm run build — clean  
✅ npm run lint — clean
✅ npx tsc --noEmit — clean
```

If any step fails, the walkthrough MUST include a **Failure Trace** section explaining
what went wrong and why, in the same plain-English style.

## Integration with Rules File

If a `rules.md` exists in the project root or is referenced in CLAUDE.md:
1. Read it before generating code
2. Follow every rule
3. In the walkthrough, note which rules were applied: "Used Rule #7: Always destructure
   Supabase response to check for errors before accessing data."

If the walkthrough reveals a new pattern or gotcha, propose a new rule at the end:
```
📝 Proposed Rule: [short name]
Pattern: [what to do]  
Reason: [why, based on what just happened]
```

The human decides whether to add it to `rules.md`.

## When Applied to Existing Code (Explain Mode)

When the user asks to understand code they already have (not new code), produce a
**Reverse Glass** — same five questions but working backward from the existing code:

1. Read the code completely before explaining anything
2. Start with WHAT (the big picture, one sentence)
3. Trace the HOW by following the execution path, not the file order
4. Map the WHERE by importance, not alphabetically
5. Identify the WHEN by finding all triggers (events, lifecycle, timers, subscriptions)
6. Reconstruct the WHY — explain the likely reasoning behind design choices

For Reverse Glass, always ask: "Does this make sense so far, or should I go deeper
on any part?" before moving on. The goal is comprehension, not coverage.

## File Outputs

When generating code for a project, also save the walkthrough:
- `docs/codeglass/[feature-name].md` — one file per feature or component
- These accumulate into a project-specific knowledge base
- On future tasks in the same project, reference previous walkthroughs:
  "This follows the same fetch-on-mount pattern we used in the inspections list
  (see `docs/codeglass/inspection-list.md`)."

## The Graduation Signal

Over time, the user will start predicting what the walkthrough will say. When they
demonstrate understanding (asking specific questions, suggesting alternatives, catching
issues before the walkthrough mentions them), acknowledge it. That's the system working.

The goal is not to produce walkthroughs forever. The goal is to make them unnecessary.

---

## Reference Files

- `references/walkthrough-format.md` — The exact template for each depth level,
  with filled-in examples from the React/TS/Supabase stack. Read this for the
  format details before writing any walkthrough.

- `references/pattern-library.md` — Named patterns that recur in the user's stack.
  Reference these by name in walkthroughs so the user builds a vocabulary.
  Read this when you encounter a common pattern to use the consistent name.
