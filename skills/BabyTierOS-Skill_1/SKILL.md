---
name: babytier-os
description: >
  Project scaffolding and development methodology for solo developers building with AI.
  Use this skill when the user wants to: start a new project, scaffold project documentation,
  set up a development workflow, create project templates, organize a codebase for AI-assisted
  development, establish coding conventions, plan a product spec, define user scenarios,
  set up a five-tier LLM routing system, or create any of these files: CLAUDE.md, SPEC.md,
  SCENARIOS.md, ARCHITECTURE.md, AGENTS.md, CODEGUIDE.md, ART.md, CONTEXT.md, SNIFFTEST.md.
  Also trigger when the user mentions "BabyTierOS", "babytier", "project scaffold",
  "AI workflow setup", or "development methodology". Do NOT use for general coding tasks,
  debugging, or questions unrelated to project structure and methodology.
---

# BabyTierOS — AI-Assisted Development Methodology

A structured scaffolding system that makes AI agents dramatically more useful and development dramatically more organized. Built for solo developers who ship real products with AI.

## What This Skill Does

When invoked, this skill helps users:

1. **Scaffold a new project** — Generate all 10 template files customized to a specific project
2. **Populate individual templates** — Fill in any single template file through guided conversation
3. **Set up the five-tier LLM routing system** — Configure which AI tools handle which tasks
4. **Review and improve existing project docs** — Audit a project's documentation against BabyTierOS standards

## The File System

BabyTierOS produces 10 markdown files. Each serves a distinct purpose:

| File | Purpose | When to Update |
|------|---------|---------------|
| CLAUDE.md | Project state, AI agent rules, session handoffs | Every working session |
| SPEC.md | What to build — users, stories, features, acceptance criteria | Every feature change |
| SCENARIOS.md | How users move through the product — step-by-step flows | Every major feature |
| ARCHITECTURE.md | How it's built — tech stack, data model, APIs, deploy | Every architectural change |
| AGENTS.md | Which AI tier handles what — routing, escalation, skills | When scope or tools shift |
| CODEGUIDE.md | How to write code — naming, style, git, patterns | Set once, revisit rarely |
| ART.md | How it looks — colors, type, layout, components | Set once, revisit rarely |
| CONTEXT.md | Why this exists — background, domain, stakeholders, constraints | Set once, update as needed |
| SNIFFTEST.md | Human-only test prompts — never shown to AI agents | When features ship |
| README.md | Public project overview | At milestones |

## Core Workflow

### When the user wants to scaffold a new project:

1. Ask what they're building (one sentence is enough to start)
2. Read `references/templates/` to access the full template set
3. Run `scripts/scaffold.py` to generate all 10 files at the project root
4. Walk them through CONTEXT.md first (brain dump what this is and why)
5. Then SPEC.md (define users and features)
6. Then ARCHITECTURE.md (choose the stack)
7. Then the rest as needed

### When the user wants to populate a specific template:

1. Identify which template they need
2. Read the corresponding file from `references/templates/`
3. Ask guided questions to fill in each section
4. Output the completed file

### When the user asks about the five-tier system:

Read `references/five-tier-system.md` for the complete tier definitions, escalation rules, and delegation protocol.

## The Five-Tier LLM Routing System (Summary)

```
Tier 1 — AUTOCOMPLETE (Continue/Copilot)     → Accept/reject line completions
Tier 2 — LOCAL ASSIST (Ollama/local models)   → Rename, format, boilerplate
Tier 3 — SPECIALIST (DeepSeek/mid-range)      → Single-file focused tasks
Tier 4 — BUILDER (Claude Code/agentic IDE)    → Multi-file features, complex logic
Tier 5 — STRATEGIST (Claude Chat/Opus)        → Planning, specs, architecture, review
```

Escalate UP when stuck. Delegate DOWN when overkill.

## Critical Rules

1. **SNIFFTEST.md is HUMAN-ONLY.** Never read it, reference it, or generate code that targets its contents. If the user asks an AI agent to test something, direct them to write automated tests from SPEC.md acceptance criteria — never from SNIFFTEST.md.

2. **CLAUDE.md is the entry point.** When an AI agent enters a project using BabyTierOS, it reads CLAUDE.md first. Always. That file points to everything else.

3. **Spec before code.** Never start building until SPEC.md defines what you're building.

4. **Decisions get logged.** Every tech choice goes in ARCHITECTURE.md's decision log with rationale.

5. **Session state is sacred.** Always update CLAUDE.md's "Last Session" section at the end of work.

## Examples

**Example 1: Scaffolding a new project**
```
User: "I want to start a new project — a community tool library app"
Action: Run scaffold script, then guide through CONTEXT → SPEC → ARCHITECTURE
```

**Example 2: Filling in a spec**
```
User: "Help me write the SPEC.md for my beekeeping platform"
Action: Read references/templates/SPEC.md, ask guided questions about users, stories, features
```

**Example 3: Setting up tiers**
```
User: "How should I configure my AI tools for this project?"
Action: Read references/five-tier-system.md, recommend tier assignments based on project complexity
```

## Guidelines

- Always ask before generating — confirm what the user wants before producing files
- Use imperative voice in generated templates ("Update this file" not "This file should be updated")
- Keep generated content specific to the user's project — no generic filler
- When populating templates, ask questions section by section, not all at once
- For SNIFFTEST.md, generate the structure but leave test scenarios empty with a note for the human to fill in
- Match the user's technical level — don't use jargon they won't understand
- If the user already has some documentation, help them migrate it into BabyTierOS format rather than starting over
