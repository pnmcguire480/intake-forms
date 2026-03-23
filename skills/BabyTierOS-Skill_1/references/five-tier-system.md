# The Five-Tier LLM Routing System

## Principle

Use the minimum tier that can handle the task correctly. Don't call in an architect to hammer a nail. Don't ask autocomplete to design a database.

## Tier 1 — Autocomplete

**Tools:** Continue, GitHub Copilot, built-in IDE autocomplete
**Mode:** Passive — suggestions appear, accept or reject

**Handles:** Single-line completions, import statements, closing brackets, obvious pattern continuation.

**Boundaries:** No multi-line generation. No conversation. Accept/reject only.

**Escalate to Tier 2 when:** Rejecting more suggestions than accepting, or completion requires understanding beyond the current line.

---

## Tier 2 — Local Assistant

**Tools:** Ollama running locally, small language models (7B-13B parameter range)
**Mode:** Active — ask a question, get an answer. Fast, private, free.

**Handles:** Variable/function renaming, code reformatting, boilerplate generation (interfaces, types, basic components), syntax conversion, quick lookups, comment generation.

**Boundaries:** No logic changes. No new file creation. No state management changes. Single-file scope only.

**Escalate to Tier 3 when:** Task requires business logic, non-trivial functions, or data transformations.

---

## Tier 3 — Specialist

**Tools:** DeepSeek, or equivalent mid-range cloud LLM
**Mode:** Active — focused single-file tasks with clear scope

**Handles:** Individual component creation, data transformation logic, utility functions with defined inputs/outputs, algorithm implementation, individual test files, research and code examples.

**Boundaries:** Single-file scope only. No architectural decisions. No dependency management. No database schema changes.

**Escalate to Tier 4 when:** Task requires awareness of multiple files, touches the database, involves auth/permissions, or requires full codebase understanding.

---

## Tier 4 — Builder

**Tools:** Claude Code (VS Code terminal mode), or equivalent agentic coding tool
**Mode:** Agentic — reads full codebase, makes multi-file changes, runs commands

**Handles:** Multi-file feature implementation, complex business logic, API route creation, database schema changes (with human approval), approved refactoring, git operations, debugging complex cross-file issues.

**Boundaries:** Must follow CLAUDE.md and CODEGUIDE.md patterns. No refactoring without approval. No new dependencies without approval. No modifying CLAUDE.md rules, AGENTS.md, or SNIFFTEST.md. No architectural decisions (escalate to Tier 5).

**Escalate to Tier 5 when:** Task involves tradeoff decisions, multi-session feature planning, code review, or spec writing/revision.

---

## Tier 5 — Strategist

**Tools:** Claude Chat (Opus), or equivalent frontier model in conversation mode
**Mode:** Conversational — planning, reasoning, reviewing. Does not write production code.

**Handles:** Project planning, spec writing, architectural decisions, code review, complex debugging (root cause analysis), tradeoff evaluation, documentation strategy.

**Boundaries:** Does not write production code. Presents options — human decides.

**Escalate to human when:** Decisions affect budget, timeline, user commitments, external stakeholders, or anything the AI isn't confident about.

---

## Escalation Protocol

```
Stuck at Tier 1 → Tier 2 (need context beyond current line)
Stuck at Tier 2 → Tier 3 (need real logic, not formatting)
Stuck at Tier 3 → Tier 4 (need multi-file awareness)
Stuck at Tier 4 → Tier 5 (need architectural guidance)
Stuck at Tier 5 → Human makes the call
```

**Signs to escalate:** Guessing instead of knowing. Can't see needed files. Multiple valid approaches. Touches auth/payments/user data. Same fix attempted twice.

## Delegation Protocol

```
Tier 5 overkill → Tier 4 (just needs implementation)
Tier 4 overkill → Tier 3 (single file, clear scope)
Tier 3 overkill → Tier 2 (rename/format/boilerplate)
Tier 2 overkill → Tier 1 (line completion)
```

## Human-in-the-Loop Checkpoints

These always require explicit human approval regardless of tier:

- Installing a new dependency
- Creating or modifying database schema
- Changing auth/authorization logic
- Modifying deployment config
- Deleting any file
- Refactoring 3+ files simultaneously
- Changing environment variables
- Modifying CLAUDE.md rules, AGENTS.md, or SNIFFTEST.md
- Any action affecting production data or external exposure
