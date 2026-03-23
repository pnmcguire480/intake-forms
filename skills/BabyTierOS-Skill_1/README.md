# BabyTierOS

**A structured development methodology for solo developers building with AI.**

An Agent Skill for Claude that scaffolds, organizes, and guides AI-assisted project development using 10 template files and a five-tier LLM routing system.

---

## What Is This

BabyTierOS is a Claude Agent Skill that gives you a repeatable process for building software with AI. It produces 10 markdown files that:

- Give AI agents persistent context across sessions (no more re-explaining your project)
- Route tasks to the right level of AI (don't use Opus to rename a variable)
- Keep test scenarios hidden from AI (so agents can't cheat)
- Document everything from brand colors to deployment pipelines

## Install

### Claude Code (Recommended)

```bash
# Register the marketplace
/plugin marketplace add [your-username]/babytier-os

# Install the skill
/plugin install babytier-os
```

Then use it:
```
> /babytier-os scaffold my new project
> Help me write SPEC.md for a community tool library
```

### Claude.ai

Upload the skill as a .zip via **Settings > Features > Custom Skills**.

### Manual

Clone this repo and copy the files into your project's `.claude/skills/` directory:

```bash
git clone https://github.com/[your-username]/babytier-os.git
cp -r babytier-os ~/.claude/skills/
```

## The File System

| File | Purpose | Update Frequency |
|------|---------|-----------------|
| **CLAUDE.md** | Project state, AI rules, session handoffs | 🔄 Every session |
| **SPEC.md** | Users, stories, features, acceptance criteria | 🔄 Every feature change |
| **SCENARIOS.md** | User flows with happy/sad paths | 🔃 Every major feature |
| **ARCHITECTURE.md** | Tech stack, data model, APIs, deploy | 🔄 Every arch change |
| **AGENTS.md** | Five-tier LLM routing and escalation | 🔃 When scope shifts |
| **CODEGUIDE.md** | Naming, style, git, patterns | 📌 Set once |
| **ART.md** | Colors, type, layout, components | 📌 Set once |
| **CONTEXT.md** | Why this exists, domain, stakeholders | 📌 Set once |
| **SNIFFTEST.md** | Human-only test prompts | ⛔ Human only |
| **README.md** | Public project overview | 🔃 At milestones |

## The Five-Tier System

```
Tier 5 — STRATEGIST  → Planning, specs, architecture (Claude Opus)
Tier 4 — BUILDER     → Multi-file features, complex logic (Claude Code)
Tier 3 — SPECIALIST  → Single-file focused tasks (DeepSeek)
Tier 2 — ASSISTANT   → Rename, format, boilerplate (Ollama local)
Tier 1 — AUTOCOMPLETE → Line completions (Continue/Copilot)
```

## Evals

BabyTierOS ships with evals for the skill-creator. Test and refine:

```bash
# In Claude Code with skill-creator plugin
/skill-creator eval babytier-os
/skill-creator benchmark babytier-os
```

## Structure

```
babytier-os/
├── SKILL.md                    ← Skill entry point (required)
├── references/
│   ├── five-tier-system.md     ← Tier definitions (loaded on demand)
│   └── templates/              ← All 10 template files
│       ├── CLAUDE.md
│       ├── SPEC.md
│       ├── SCENARIOS.md
│       ├── ARCHITECTURE.md
│       ├── AGENTS.md
│       ├── CODEGUIDE.md
│       ├── ART.md
│       ├── CONTEXT.md
│       ├── SNIFFTEST.md
│       └── README.md
├── scripts/
│   └── scaffold.py             ← Generates files at project root
├── evals/
│   └── eval-set.json           ← Trigger precision tests
├── .claude-plugin/
│   └── manifest.json           ← Plugin metadata
├── LICENSE
└── README.md                   ← You're reading this
```

## Philosophy

- **AI agents are tools, not teammates.** They need structure.
- **Documentation is infrastructure.** Every minute planning saves ten debugging.
- **The right task goes to the right tool.** Five tiers, not one.
- **Testing is a human job.** SNIFFTEST.md is never shown to AI.
- **Access over ownership.** This skill is free. Fork it. Use it for anything.

## License

MIT

## Author

Patrick McGuire — solo developer building web applications, community tools, and open-source software with AI-assisted workflows.
