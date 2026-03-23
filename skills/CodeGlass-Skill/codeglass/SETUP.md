# CodeGlass — Setup Guide

Step-by-step instructions for getting CodeGlass running in your workflow.
Each step is small. Do them in order. Don't skip ahead.

---

## What You're Building

A system where every time Claude writes code for you, it also:
1. Checks if the code actually works (eval harness)
2. Explains exactly how every piece connects (CodeGlass walkthrough)
3. Captures what it learned so the same mistake never happens twice (rules file)

You don't have to understand all of this right now. The system teaches you as you use it.

---

## Step 1: Install the Skill

Copy the `codeglass/` folder into your Claude skills directory.

If you're using Claude Code with local skills:
```bash
cp -r codeglass/ /path/to/your/skills/user/codeglass/
```

If you're using Claude.ai with uploaded skills, zip it and upload:
```bash
cd codeglass && zip -r ../codeglass.skill SKILL.md references/ scripts/ templates/
```

**Done when:** The skill exists in your skills directory or is uploaded.

---

## Step 2: Pick ONE Project to Start With

Don't try to set this up on all 20 projects. Pick one. Ideally:
- One that's actively being worked on (not archived)
- One that's small enough to understand but real enough to matter
- SwarmCast or Triangulate are good candidates

**Done when:** You've picked a project and you're in its directory.

---

## Step 3: Add the Eval Harness

Copy the eval script into your project:
```bash
mkdir -p scripts
cp /path/to/codeglass/scripts/eval.sh ./scripts/eval.sh
chmod +x scripts/eval.sh
```

Run it:
```bash
./scripts/eval.sh
```

It will tell you your score. Maybe it's 1/4. Maybe 0/4. That's fine.
That number is your starting point — your baseline.

**Write down the score.** This is your "before" number.

**Done when:** You've run the eval once and you know your score.

---

## Step 4: Seed the Rules File

Copy the rules template into your project:
```bash
cp /path/to/codeglass/templates/rules.md ./rules.md
```

Now: think about the last time Claude Code gave you broken code.
What was wrong? Write it as a rule. Even if it's rough.

Some starters to consider (add any that apply to your experience):
- Import paths that are always wrong
- Supabase patterns that break
- Vite config issues that keep coming back
- TypeScript errors that you see repeatedly
- Tailwind classes that don't work as expected

Add at least 2-3 rules from your own experience. They don't have to be
perfect — they just have to be real things that have bitten you.

**Done when:** `rules.md` has at least 2-3 rules from your own experience.

---

## Step 5: Update Your CLAUDE.md

Open the project's CLAUDE.md (or create one if it doesn't exist) and add
these lines at the top:

```markdown
## Code Generation Rules

Before generating any code:
1. Read `rules.md` in the project root and follow every rule
2. After generating code, run `./scripts/eval.sh` and report the score
3. Include a CodeGlass walkthrough with every code output (see CodeGlass skill)
4. If anything fails, include a Failure Trace explaining what went wrong

The CodeGlass walkthrough must cover:
- WHAT: one sentence, no jargon
- HOW: trace the data journey from user action to result
- WHERE: which file holds what
- WHEN: what runs on load, on click, on data change
- WHY: why this approach, what's the alternative
```

**Done when:** Your CLAUDE.md references the rules file, the eval harness,
and requires CodeGlass walkthroughs.

---

## Step 6: Test It

Ask Claude Code to do something small in your project. A new component,
a bug fix, a small feature. Whatever's next on your list.

Watch for:
- [ ] Did it read `rules.md` first?
- [ ] Did it run the eval after generating code?
- [ ] Did it include a CodeGlass walkthrough?
- [ ] Does the walkthrough make sense to you?

If the walkthrough doesn't make sense, **ask questions.** That's not
a failure — that's the system working. The conversation where you ask
"wait, what does that mean?" is where learning happens.

**Done when:** You've completed one coding task with CodeGlass active
and you understood the walkthrough (or asked until you did).

---

## Step 7: Extract Your First Rule from the Run

After the task is done, look at what happened:
- Did anything break? → Write a rule to prevent it
- Did something work surprisingly well? → Write a rule to repeat it
- Did the walkthrough reveal something you didn't know? → Note it

Add the rule to `rules.md`. Now your next run starts smarter than this one.

**Done when:** You've added at least one new rule from this run.

---

## Step 8: Repeat

That's it. The loop is:
1. Ask Claude to do a coding task
2. Eval runs → score reported
3. CodeGlass walkthrough explains what happened
4. You read, ask questions, understand
5. Extract rules from what you learned
6. Rules improve the next run

Every iteration, you understand more. Every iteration, Claude gets
better instructions. This is the Karpathy loop applied to your
learning, not just your code.

---

## What to Do When You're Stuck

**"The eval is failing and I don't know why"**
→ Ask Claude: "The eval failed on [step]. CodeGlass this failure for me —
   explain what broke, why, and how to fix it."

**"The walkthrough doesn't make sense"**
→ Point at the specific part: "In the HOW section, I don't understand
   what happens between step 3 and step 4. Can you explain that differently?"

**"I'm not sure what rule to write"**
→ Ask Claude: "Based on what just happened, what rule would prevent this
   problem next time?" It'll propose one. You decide if it's right.

**"I want to understand a file I already have"**
→ Say: "CodeGlass this file for me — [paste path]". Claude will do a
   Reverse Glass walkthrough of existing code.

---

## The Big Picture

```
You (research director)
  ↓ asks for a coding task
Claude Code (agent)
  ↓ reads rules.md first
  ↓ generates code
  ↓ runs eval.sh → score
  ↓ writes CodeGlass walkthrough
You (learner)
  ↓ reads walkthrough
  ↓ asks questions until it clicks
  ↓ extracts new rules
rules.md (institutional memory)
  ↓ feeds into next run
  ↓ loop gets smarter
```

This is Angle #20 — the human-in-the-loop ratchet.
You're not the debugger. You're the research director.
And you're learning the whole time.
