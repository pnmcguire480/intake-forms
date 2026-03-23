# AngleGrinder — Chain Steps Reference

Detailed prompts and instructions for each step of the AngleGrinder chain.
Read this file when executing the chain. Each step includes the internal prompt
template, expected output structure, and decision logic.

---

## Table of Contents

1. [Step 0: Audience Lock](#step-0-audience-lock)
2. [Step 1: Core Extraction](#step-1-core-extraction)
3. [Step 2: Hook + Format Match](#step-2-hook--format-match)
4. [Step 3: Calendar Build](#step-3-calendar-build)
5. [Step 4: Outline Expansion](#step-4-outline-expansion)
6. [Step 5: Skill Deposit](#step-5-skill-deposit)
7. [Adaptation Guide: Non-Content Domains](#adaptation-guide)

---

## Step 0: Audience Lock

### Purpose
Anchor the entire chain to a specific audience so angles, tone, platforms, and
hooks all point in the same direction. Without this, Step 1 produces generic output.

### When to Run
- Always run first, unless audience is already crystal clear from context
- If `ruleset.md` exists and contains an audience profile from a previous run,
  present it and ask: "Still targeting this audience, or has it shifted?"

### Internal Prompt Template

```
Given this idea: {IDEA}

Before expanding angles, define the target audience:

1. WHO — Demographics, role, experience level (e.g., "mid-career marketers at B2B SaaS companies" or "beginner content creators aged 20-35")
2. WHERE — Primary platforms they consume content on (rank by importance)
3. PAIN — Top 3 frustrations or unmet needs this idea could address
4. SOPHISTICATION — How much do they already know about this topic? (beginner / intermediate / advanced / mixed)
5. OUTCOME — What does success look like for them after engaging with this content?

Output a 3-5 sentence audience snapshot that I'll use to anchor all downstream steps.
```

### Expected Output
A tight paragraph like:
> "Targeting solo creators and small-team marketers (25-40) who publish on YouTube
> and LinkedIn primarily. They know the basics of prompting but haven't systematized
> their ideation process. Their main pain is blank-page paralysis — they have ideas
> but can't consistently turn them into a pipeline. Success = never starting a week
> without knowing what to create."

### Pause Logic
- If the user gave a clear idea with obvious audience → generate the snapshot and
  present it briefly: "Here's who I think we're building for — sound right?"
- If the idea is ambiguous or could serve very different audiences → pause and ask
  the user to pick or refine before proceeding

---

## Step 1: Core Extraction

### Purpose
The engine. Take one idea and crack it open into 20+ distinct angles, each one a
viable piece of content or deliverable on its own.

### Internal Prompt Template

```
AUDIENCE: {AUDIENCE_SNAPSHOT}
IDEA: {IDEA}
EXISTING RULES: {RULESET_IF_EXISTS or "None yet"}

Expand this idea into 20+ distinct angles. For each angle, include:
- A number (1-20+)
- A short, punchy angle title (8 words max)
- The angle type tag: [educational] [contrarian] [story] [list] [myth-bust]
  [future-trend] [beginner] [advanced] [case-study] [behind-the-scenes]
  [comparison] [hot-take] [how-to] [framework] [data-driven] [personal]
- One sentence describing what this angle covers and why it's distinct
- Relevance score (1-10) based on audience fit and potential impact

Categories to ensure you hit (don't force — skip if they don't fit naturally):
- At least 2 educational angles
- At least 2 contrarian or myth-busting angles
- At least 1 story-based / personal narrative
- At least 1 beginner-friendly and 1 advanced
- At least 1 future-trend or prediction
- At least 1 comparison or "X vs Y"
- At least 1 framework or system

Rank the full list by relevance score (highest first).
Flag any natural pairings — angles that work well as a series or back-to-back posts.

If existing rules are provided, use them to boost or demote angles accordingly.
```

### Expected Output Format

```markdown
## AngleGrinder: Core Extraction
**Idea:** {idea}
**Audience:** {snapshot}

### Ranked Angles

1. **The Framework Nobody Teaches** [framework] — 9/10
   Why most people skip the system-building step and how it costs them...
   _Pairs with: #4, #12_

2. **Kill Your Best Idea First** [contrarian] — 9/10
   Counterintuitive take on why your "best" angle is often your worst performer...

...etc to 20+
```

### Pause Logic
**Always pause here.** Present the list and say something like:
"Here are your angles, ranked. Circle your top 5-8 and I'll build hooks,
a calendar, and outlines from those. Or tell me to auto-pick the top 8."

Save the full list to `angles.md` regardless of which ones the user picks.

---

## Step 2: Hook + Format Match

### Purpose
Transform selected angles into platform-ready hooks. Each angle becomes multiple
entry points depending on where it'll be published.

### Internal Prompt Template

```
AUDIENCE: {AUDIENCE_SNAPSHOT}
SELECTED ANGLES: {USER_SELECTED_ANGLES}

For each selected angle, generate hooks for these platforms:
{PLATFORMS — default: YouTube, LinkedIn, X/Twitter, Instagram, Newsletter, Blog}

For each platform hook, provide:
- The hook text (written in the platform's native tone and format)
- One visual concept (thumbnail idea, carousel layout, header image, diagram, etc.)

Platform tone calibration:
- YouTube: curiosity gap or strong promise, numbers perform well, 60 chars max
- LinkedIn: conversational opener that sounds like a real person thinking out loud, first line is everything
- X/Twitter: statement designed to provoke reply or retweet, punchy, under 280 chars
- Instagram: carousel headline that makes someone stop scrolling, bold + clear
- Newsletter: subject line that earns the open, specificity beats cleverness
- Blog: SEO-aware title + a subtitle that adds context

Adapt this list if the user specified different platforms.
```

### Expected Output Format

```markdown
## AngleGrinder: Hooks

### Angle 1: {title}

| Platform | Hook | Visual Concept |
|----------|------|----------------|
| YouTube | "..." | ... |
| LinkedIn | "..." | ... |
| X/Twitter | "..." | ... |
| Instagram | "..." | ... |
| Newsletter | "..." | ... |
| Blog | "..." | ... |

### Angle 2: {title}
...
```

Save to `hooks.md`.

### Pause Logic
No pause needed — flow straight into Step 3 unless the user is clearly
in a conversational mode and wants to react to hooks first.

---

## Step 3: Calendar Build

### Purpose
Assign selected angles to specific days with platform, format, repurposing flags,
and CTAs. The output is a usable publishing schedule.

### Internal Prompt Template

```
AUDIENCE: {AUDIENCE_SNAPSHOT}
SELECTED ANGLES + HOOKS: {FROM STEPS 1-2}
CALENDAR LENGTH: {default 30 days, adjust if user specified}
POSTING FREQUENCY: {infer from user or default to 4-5x per week}
START DATE: {today's date or user-specified}

Build a content calendar:

For each scheduled day, include:
- Date (day of week + date)
- Angle number and title
- Primary platform
- Content format (video, carousel, thread, long-form post, article, newsletter, etc.)
- Repurposing flag: if this angle also appeared on another platform this week, flag it
  with ⚠️ and note the overlap
- CTA (specific call-to-action for this post — not generic "like and subscribe")
- Status: [ ] (empty checkbox for tracking)

Rules:
- Don't schedule the same angle on two platforms in the same 5-day window
- Alternate between angle types (don't stack 3 educational posts in a row)
- Put strongest angles on the user's highest-traffic days if known
- Leave 1-2 flex days per week for timely/reactive content
- If fewer angles than days, schedule repurposed versions on secondary platforms
  in later weeks
```

### Expected Output Format

```markdown
## AngleGrinder: 30-Day Calendar
**Start Date:** {date}
**Posting Frequency:** {X}/week

| Day | Date | Angle | Platform | Format | CTA | Repurpose Flag | Status |
|-----|------|-------|----------|--------|-----|----------------|--------|
| Mon | 3/24 | #1 The Framework Nobody Teaches | YouTube | Video (8-10 min) | "Comment your framework below" | — | [ ] |
| Tue | 3/25 | #3 ... | LinkedIn | Text post | "DM me 'framework' for the template" | — | [ ] |
...
```

Save to `calendar.md`. If user requests `.xlsx`, generate a spreadsheet instead
(read the xlsx SKILL.md for formatting guidance).

### Pause Logic
Pause if: user hasn't confirmed posting frequency, platforms, or start date.
Otherwise flow into Step 4.

---

## Step 4: Outline Expansion

### Purpose
Turn the user's top 3-5 angles into actual content outlines they can sit down
and execute. This is the bridge between "I have a plan" and "I can create this today."

### Internal Prompt Template

```
AUDIENCE: {AUDIENCE_SNAPSHOT}
ANGLES TO OUTLINE: {user's top 3-5 from their selected set, or auto-pick the
  3 highest-ranked if user said "you pick"}

For each angle, generate a full content outline:

1. WORKING TITLE — the hook from Step 2 (for the primary platform)
2. FORMAT — what this will be (video script outline, LinkedIn post draft, thread, article, etc.)
3. HOOK — the opening 2-3 sentences that grab attention (write these out fully)
4. KEY POINTS — 3-5 main sections or beats, each with:
   - Section heading / topic sentence
   - 2-3 bullet points of what to cover
   - One example, stat, or story beat to include
5. TRANSITIONS — one sentence bridging each section to the next
6. CTA + CLOSE — specific closing and call to action
7. ESTIMATED LENGTH — word count or duration
8. PRODUCTION NOTES — anything needed to create this (screenshots, data to pull,
   guest to interview, visual to design, etc.)
```

### Expected Output Format

```markdown
## AngleGrinder: Content Outlines

---

### Outline 1: {Angle Title}
**Format:** YouTube video (~10 min)
**Primary Platform:** YouTube

**Hook:**
> "Opening lines here, fully written..."

**Key Points:**
1. **{Section 1 heading}**
   - Point A
   - Point B
   - Example: ...

2. **{Section 2 heading}**
   - ...

**Transitions:**
- Section 1 → 2: "..."
- Section 2 → 3: "..."

**CTA + Close:**
> "Closing lines and call to action..."

**Estimated Length:** ~1,500 words / 10 minutes
**Production Notes:** Need screenshot of X, pull data from Y

---

### Outline 2: ...
```

Save to `outlines.md`.

### Pause Logic
No pause — flow into Step 5.

---

## Step 5: Skill Deposit

### Purpose
Extract reusable patterns from this run and append them to a persistent ruleset
file. This is what makes AngleGrinder compound — each run teaches the system
something about what works for this user and audience.

### Internal Prompt Template

```
Review the full output of this AngleGrinder run:
- Audience: {snapshot}
- Idea: {idea}
- Angles generated: {count}
- Angles selected by user: {which ones and their types}
- Hooks generated: {summary}
- Calendar built: {yes/no}
- Outlines expanded: {which angles}

Extract 3-5 reusable rules or patterns. These should be specific enough to
improve future runs. Good rules look like:

- "For {this audience}, [angle type] outperforms [angle type] on [platform]"
- "Pair [type A] angles with [type B] as same-week follow-ups"
- "[Platform] hooks that use [technique] consistently rank highest"
- "This audience responds to [tone/framing] — avoid [other tone]"
- "Always include at least one [specific element] for this niche"

Bad rules (too generic to be useful):
- "Good content performs well"
- "Know your audience"
- "Be consistent"

Format each rule with:
- The rule text
- Confidence level: [high / medium / emerging]
- Source: the idea and angle that surfaced this pattern
- Date: {today}
```

### Expected Output Format (appended to ruleset.md)

```markdown
---
## Run: {date} — {idea summary}
**Audience:** {snapshot}

### Rules Extracted

1. **Contrarian hooks outperform educational on LinkedIn for solo creators**
   - Confidence: high
   - Source: "Kill Your Best Idea First" selected over 3 educational angles
   - Date: 2026-03-20

2. **Story-based angles work best as long-form (YouTube/blog), not threads**
   - Confidence: medium
   - Source: "The Day I Deleted My Content Calendar" mapped to YouTube, not X
   - Date: 2026-03-20

3. ...
```

### Pause Logic
**Always pause.** Show the proposed rules and ask:
"Here's what this run taught us. Want me to add all of these to your ruleset,
edit any, or skip some?"

Only append to `ruleset.md` after confirmation.

### Ruleset File Behavior
- If `ruleset.md` doesn't exist, create it with a header
- If it exists, append the new run's rules below existing ones
- Never overwrite or delete previous entries
- On future runs, load `ruleset.md` at the start of Step 1 and reference
  accumulated rules when ranking angles

---

## Adaptation Guide

### Non-Content Domains

The chain works identically for non-content use cases. Here's how terminology maps:

| Content Term | Product Launch | Campaign | Consulting |
|-------------|---------------|----------|------------|
| Angle | Messaging angle | Campaign angle | Framework angle |
| Hook | Headline / tagline | Ad hook / email subject | Pitch opener |
| Platform | Channel (email, deck, PR) | Medium (digital, print, event) | Deliverable (deck, memo, workshop) |
| Calendar | Launch timeline | Campaign calendar | Engagement timeline |
| Outline | Brief / one-pager | Ad/email draft | Deliverable outline |
| CTA | Desired action | Conversion goal | Next step / ask |
| Ruleset | Messaging playbook | Campaign playbook | Client engagement patterns |

When the user's idea is clearly non-content (e.g., "we're launching a new pricing tier"),
automatically swap terminology in all outputs. Don't ask — just do it. The structure
stays the same.

### Example: Product Launch

**Step 0 output:** "Targeting existing customers on Growth plan ($49/mo) who've hit
usage limits. They're cost-sensitive, technical, and skeptical of 'enterprise' pricing.
Primary channels: in-app notification, email, sales deck for account managers."

**Step 1 angles include:** objection-handling frameworks, competitive comparison,
ROI calculator approach, "what changes and what doesn't" reassurance angle,
power-user testimonial angle, migration-ease angle, etc.

**Step 2 hooks become:** email subject lines, in-app banner copy, sales deck slide
titles, FAQ page headers, social announcement posts.

**Step 3 becomes:** a 14-day launch timeline instead of a 30-day content calendar.

**Step 4 outlines:** the actual email draft, the sales deck flow, the FAQ page structure.

**Step 5 rules:** "For pricing tier launches, lead with 'what stays the same' before
'what's new' — reduces churn anxiety."
