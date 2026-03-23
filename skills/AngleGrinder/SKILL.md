---
name: anglegrinder
description: >
  A prompt chain skill that takes a single idea and grinds it into dozens of ranked angles,
  platform-specific hooks, a full content calendar, content outlines, and a compounding ruleset.
  Use this skill whenever the user wants to brainstorm, expand, or multiply an idea — whether
  for content creation, product launches, campaign strategy, pitches, proposals, presentations,
  or any scenario where one concept needs to become many usable directions. Trigger on phrases
  like "AngleGrinder", "grind this idea", "expand this idea", "give me angles", "what can I do
  with this idea", "turn this into content", "multiply this", "brainstorm angles", "content
  calendar from this", "how many ways can I use this", or any request to take a single concept
  and systematically extract multiple directions from it. Also trigger when the user pastes an
  idea and asks for help figuring out what to do with it, or when they say they're stuck on how
  to approach/present/pitch something from multiple angles.
---

# AngleGrinder — Idea Multiplier Chain

## What This Does

Takes one raw idea and runs it through a 6-step chain that produces:
1. An audience/niche profile to anchor everything
2. 20+ ranked angles extracted from the idea
3. Platform-specific hooks for the best angles
4. A 30-day calendar (exported as .md or .xlsx)
5. Full content outlines for the user's top picks
6. A persistent ruleset that compounds across runs

The chain is domain-agnostic. Content creation, product launches, campaign strategy,
consulting frameworks, internal comms, sales decks — same chain, different input.

## How It Works

### Execution Mode: Smart Default

Run all steps automatically unless a step requires a decision. Pause points:
- **After Step 0** if niche/audience is ambiguous — confirm before continuing
- **After Step 1** — always pause. Let the user circle their favorite angles before generating hooks
- **After Step 3** — pause if the user might want to adjust the calendar before outlines
- **Step 6** — always show the ruleset and ask before appending to `ruleset.md`

If the user says "full auto" or "just run it" — skip all pauses except Step 1 (angle selection
is the one decision that can't be automated well).

### File Outputs

All outputs go to a working directory. Default: `/home/claude/anglegrinder-output/`
If presenting to the user, copy final files to `/mnt/user-data/outputs/`.

Generated files:
- `angles.md` — ranked angle list from Step 1
- `hooks.md` — platform-specific hooks from Step 2
- `calendar.md` — 30-day calendar from Step 3 (or `.xlsx` if requested)
- `outlines.md` — content outlines from Step 4
- `ruleset.md` — persistent, append-only ruleset from Step 5

---

## The Chain

Read `references/chain-steps.md` for the full prompt templates and detailed instructions
for each step. Below is the summary of what each step does and when to pause.

### Step 0 — Audience Lock

Profile the target audience/niche before doing anything else. Ask the user or infer from
context. Output: a 3-5 sentence audience snapshot that anchors tone, complexity, and
platform choices for everything downstream.

Skip if: the user has already clearly defined their audience in the conversation or in
a previous AngleGrinder run (check `ruleset.md` if it exists).

### Step 1 — Core Extraction

The engine of the chain. Take the raw idea + audience snapshot and expand into 20+
distinct angles. Categories to hit: educational, contrarian, story-based, listicle,
myth-busting, future-trend, beginner vs advanced, case study, behind-the-scenes,
comparison, hot take, how-to, framework, data-driven, personal narrative.

Rank by relevance to the audience profile and potential impact.

**Always pause here.** Present the ranked list and ask the user to circle/select their
top picks (suggest 5-8). These selections drive Steps 2-4.

### Step 2 — Hook + Format Match

For each selected angle, generate platform-specific hooks. Default platforms:
YouTube title, LinkedIn opener, X/Twitter thread starter, Instagram carousel headline,
newsletter subject line, blog post title.

Adapt platforms to what the user actually uses. If they only care about LinkedIn and
YouTube, don't waste space on IG carousels.

Also generate one visual concept per angle (thumbnail idea, carousel layout, diagram type).

### Step 3 — Calendar Build

Assign the selected angles to a 30-day calendar with:
- Specific dates and days of the week
- Primary platform per post
- Repurposing flags (which posts overlap and shouldn't run same week)
- One CTA per post
- Content type tag (video, carousel, thread, article, newsletter, etc.)

Export as `calendar.md` by default. If the user requests a spreadsheet, generate `.xlsx`.

**Pause if** the user might want to adjust posting frequency or platforms before outlines.

### Step 4 — Outline Expansion (New — Not in Original Chain)

This is the step Craig's chain was missing. For the user's top 3-5 angles, generate
actual content outlines — not just titles, but the skeleton of what they'd write or record.

Each outline includes:
- Working title
- Hook / opening line
- 3-5 key points or sections
- Transition notes between sections
- CTA and closing
- Estimated length/duration

This is what turns "I have a calendar" into "I can actually sit down and create this today."

### Step 5 — Skill Deposit

Extract 3-5 reusable patterns from this run. These are rules like:
- "Contrarian hooks outperform educational ones on LinkedIn for this niche"
- "Story-based angles work best as YouTube videos, not threads"
- "Always pair a myth-busting angle with a how-to follow-up in the same week"

Append to `ruleset.md` (never overwrite — this file grows over time). Each entry
gets a timestamp and source idea tag so patterns can be traced back.

**Always show the proposed rules and ask before appending.**

On future runs, read `ruleset.md` at the start of Step 1 and use accumulated rules
to improve angle ranking and format matching.

---

## Edge Cases

- **User gives a vague idea**: Don't refuse. Run Step 0 deeper and use the audience
  lock to sharpen the idea. Then run Step 1 with a note: "I interpreted your idea as
  [X]. If that's off, redirect me."

- **User wants fewer than 20 angles**: Fine. Generate 20 internally, but only present
  the number they asked for (ranked, so the best float up).

- **User wants a different calendar length**: Adjust Step 3. 7-day, 14-day, 90-day —
  whatever they need. 30 is the default.

- **User wants to re-run with a different idea**: Start fresh from Step 0, but carry
  `ruleset.md` forward — that's the whole point of the compounding system.

- **Non-content use case** (product launch, campaign, pitch): Same chain. Step 2
  becomes "format match" for the relevant deliverables (sales deck, email, press
  release, internal memo) instead of social platforms. Step 3 becomes a launch
  timeline instead of a content calendar. Adapt terminology but keep the structure.

---

## Quick Start

If the user just says "AngleGrinder" or "grind this" followed by an idea:

1. Check if `ruleset.md` exists — if so, load it
2. Run Step 0 (audience lock) — pause if ambiguous
3. Run Step 1 (core extraction) — always pause for selection
4. Run Steps 2-4 based on selections
5. Run Step 5 (skill deposit) — pause for approval
6. Export all files and present to user
