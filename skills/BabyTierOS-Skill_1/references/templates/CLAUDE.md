# CLAUDE.md — Project Intelligence

> 🔄 **UPDATE FREQUENCY: EVERY SESSION**
> This is the first file any AI agent reads when entering this project. Update it at the start and end of every working session. Stale information here cascades into bad decisions everywhere.
>
> **Related files:** All other docs reference this file as the entry point. See the file index at the bottom.

---

## Project Identity

- **Name:**
- **One-Liner:** <!-- One sentence. What does it do? -->
- **Repo:**
- **Live URL:**
- **Owner:**
- **Stage:** [ ] Concept [ ] Planning [ ] Scaffolding [ ] Building [ ] Testing [ ] Deployed [ ] Iterating [ ] Maintained

---

## What This Is

<!-- 2-4 sentences. Plain language. What does it do, who is it for, and why does it matter? Write this like you're explaining it to a smart friend who knows nothing about the project. -->

---

## What This Is NOT

<!-- Guardrails that prevent scope creep. List things this project should never try to do or become. Be specific. These are as important as the features list. -->

-
-
-

---

## Current State

<!-- This section is the most frequently updated part of the entire system. Treat it as a living journal. -->

### Last Session

- **Date:**
- **Duration:**
- **Tier(s) Used:**
- **What was accomplished:**
- **What broke or stalled:**
- **Decisions made:**
- **Next session should start with:**

### What Works Right Now

<!-- List features/systems that are functional and stable -->

-

### What's Broken Right Now

<!-- List bugs, regressions, incomplete implementations -->

-

### What's Blocked

<!-- Things that can't proceed until something else happens -->

| Blocked Item | Waiting On | Since |
|-------------|-----------|-------|
|             |           |       |

### Active Branch

- **Branch name:**
- **Purpose:**
- **Merge target:**

---

## AI Agent Rules

These rules apply to ALL AI agents at ALL tiers working on this project.

### Must Do

1. **Read this file first.** Every session. No exceptions.
2. **Match existing patterns.** Look at the codebase before writing new code. Follow what's already there.
3. **Small changes, frequent commits.** Don't rewrite the world in one pass.
4. **Update this file** at the end of every session — at minimum, the "Last Session" section.
5. **Check CODEGUIDE.md** before writing code for naming conventions, file structure, and style rules.
6. **Respect tier boundaries.** See AGENTS.md. If the task is above your tier, escalate.

### Must Not

1. **Never read SNIFFTEST.md.** That file is for human testing only. Coding to the test defeats the purpose.
2. **Never hallucinate dependencies.** If a package isn't in package.json (or equivalent), don't assume it's installed.
3. **Never refactor without permission.** Ask before restructuring files, renaming things, or changing patterns.
4. **Never remove comments or TODOs** unless explicitly instructed.
5. **Never install new dependencies** without the human's approval.
6. **Never delete files** without the human's approval.
7. **Never modify CLAUDE.md's rules section, AGENTS.md, or SNIFFTEST.md** without the human's approval.

### When Uncertain

- **Stop and ask.** A question is always better than a wrong assumption.
- **Present options.** Don't make unilateral decisions on things with tradeoffs.
- **Escalate to the next tier** if the task exceeds your capability or scope.

---

## Context Window Management

<!-- Tell AI agents what to load and what to skip. Prevents wasting tokens on irrelevant files. -->

### Always Load (Every Session)

- CLAUDE.md (this file)
- SPEC.md (know what you're building)
- CODEGUIDE.md (know how to write code here)

### Load When Relevant

- ARCHITECTURE.md (when making tech decisions or touching infrastructure)
- AGENTS.md (when unclear about role boundaries)
- ART.md (when building UI components)
- SCENARIOS.md (when implementing user-facing flows)
- CONTEXT.md (when you need background on why something exists)

### Never Load

- SNIFFTEST.md (human eyes only — always)
- node_modules/, .next/, build/, dist/ (generated directories)
- .env files (sensitive data)

---

## Session Handoff Protocol

When ending a session (regardless of tier):

1. Update "Last Session" above with what happened
2. Note any open questions or unresolved decisions
3. If mid-feature, describe exact stopping point and next steps
4. If a bug was introduced, describe it in "What's Broken"
5. Commit changes with a descriptive message

When starting a session (regardless of tier):

1. Read this file completely
2. Check the "Last Session" section for continuity
3. Read any files listed in "Always Load"
4. Confirm understanding before writing code
5. If anything is unclear, ask before proceeding

---

## File Index

| File | What It Covers | When to Reference |
|------|---------------|-------------------|
| **CLAUDE.md** | Project state, AI rules, session handoffs | Every session (you're here) |
| **SPEC.md** | User stories, features, acceptance criteria | Before building any feature |
| **SCENARIOS.md** | User flows, journeys, edge cases | When implementing UX flows |
| **ARCHITECTURE.md** | Tech stack, data model, APIs, deploy pipeline | Technical decisions |
| **AGENTS.md** | Tier assignments, escalation, handoff rules | Role clarity |
| **CODEGUIDE.md** | Naming, style, file structure, git workflow | Before writing any code |
| **ART.md** | Colors, typography, layout, component styles | Building any UI |
| **CONTEXT.md** | Why this exists, domain knowledge, stakeholders | Background and motivation |
| **SNIFFTEST.md** | Human-only test scenarios | ⛔ NEVER (AI agents) |
| **README.md** | Public project overview | External communication |
