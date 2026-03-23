# CodeGlass — Rules File

This file grows over time. Every rule represents a lesson learned from broken code,
a successful fix, or a pattern that prevents repeated failures.

Claude reads this file before generating any code. Every rule here is a constraint
that prevents known mistakes from happening again.

Rules are added by the human after CodeGlass walkthroughs surface them.
Never delete rules — the value is in the accumulation.

---

## How Rules Work

1. Claude generates code → the eval harness runs → the CodeGlass walkthrough explains the result
2. If something broke (or almost broke), a rule gets proposed
3. Patrick reviews the proposed rule and decides whether to add it here
4. On every future code generation, Claude reads this file first and follows every rule

---

## Format

Each rule follows this structure:
- **Rule name** (short, searchable)
- **Do this:** the correct pattern
- **Don't do this:** the incorrect pattern
- **Why:** what breaks if you ignore this
- **Stack:** which part of the stack this applies to
- **Source:** which project/task surfaced this
- **Date added**

---

## Rules

<!-- 
Add rules below this line. Example:

### Rule: Single Supabase Client
- **Do this:** Import the Supabase client from `lib/supabase.ts` 
- **Don't do this:** Call `createClient()` inside a component
- **Why:** Multiple clients break shared auth state — you can be logged in on one page and logged out on another
- **Stack:** Supabase
- **Source:** SwarmCast — inspection form
- **Date:** 2026-03-21
-->
