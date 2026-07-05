---
title: "The loop that let me ship a 40-spec build I couldn't have hand-written"
date: 2026-06-18
draft: false
tags:
  - ai
  - claude-code
  - cmux
  - vibe-coding
description: Shipping full-stack from agents is table stakes now. What made a 40-spec build survivable was loop discipline, and an orchestration skill I wrote to enforce it.
---

# The loop that let me ship a 40-spec build I couldn't have hand-written

_Shipping full-stack from agents is table stakes now. What made a 40-spec build survivable was loop discipline, and an orchestration skill I wrote to enforce it._

I built a Pomodoro app to replace a paid one that got decommissioned. The agents wrote the JavaScript; I never learned it. In 2026 that part is unremarkable. Anyone can point an agent at a spec and get code back.

The hard part is different. The pomo app ended up with 40 spec folders, one per feature, and most of the code passed through my eyes exactly once. What made a build that size survivable was loop discipline: plan, then exec, then verify, with acceptance criteria written before any code, an append-only execution log I couldn't quietly rewrite, and a standing rule that an agent's self-report is a claim, not evidence. When you can't personally vouch for every line, the loop is what you vouch for instead.

The app is just the vehicle here. Quickly, so it's concrete:

![[pomo-app-ui.png]]

A task list you filter by `#tag`, with inline syntax so typing `#` and `*` drops straight into a task's attributes. A daily dashboard that shows my workload and how productive I actually was. The chart is a dopamine hack, and the dopamine is what keeps me opening the app.

![[pomo-stats-dashboard.png]]

Code: https://github.com/tedzhao226/pomotodo

I didn't hand-write the JavaScript. I read it, ran it, and debugged it against the spec, which stayed the ground truth the whole way. That worked because of the toolchain. Three pieces carried it:

- Claude Code (max)
- Cmux (https://cmux.com/)
- Conductor, an orchestration skill I wrote (https://github.com/tedzhao226/claude-skills/tree/master/skills/personal/conductor)

Plus the Codex plugin, for a second read from a different model lineage. The two that matter most are Conductor and Cmux.

## Conductor: the loop, made into files

Conductor is an orchestrator. It runs plan, then exec, then verify, over a spec folder that lives in the repo. Three things make it hold up over a long build.

It designs before it builds. Before any code, Conductor writes the spec: a product doc with acceptance criteria, each one observable and testable with a stable id, and a tech doc with the approach, the tests, and the exact verification commands. Only then does it cut the work into tasks, each pinned to an acceptance id. For someone who doesn't know the language, having correctness defined up front is what makes the build safe to hand off.

The plan is a graph, not a line. Independent tasks fan out into batches that run at once; only the dependent ones wait. Because the graph is a file in the repo, you read the whole plan instead of trusting ephemeral session state.

The working memory is committed to the repo. FINDINGS is append-only: every status change gets a line, dispatched, done, failed, replanned, and you can't rewrite it, so the record stays honest about what happened. The verify pass checks against that same log. The `runs/` folder keeps each subagent's output, one folder per task, the summary plus the actual diff. You open the repo and read the whole reasoning trail instead of digging through a transcript in a temp dir.

So you plan once and the swarm executes. Because the plan, the criteria, the history, and the evidence are all files, you can close the laptop, pick it up tomorrow, or hand the whole thing to a fresh agent, and nothing is lost.

One of those spec folders:

```text
specs/20260618-1522-block-task-sync/
  PRODUCT.md   what we're building + acceptance criteria (VAL-* ids)
  TECH.md      the approach, the tests, the exact verify commands
  TASKS.md     the dependency graph of tasks, with live status
  FINDINGS.md  append-only working memory + execution log
  runs/        each subagent's raw output and diff, one folder per task
```

Rendered straight from the repo:

PRODUCT.md, what we're building and the acceptance criteria:
![[spec-product.png]]

TECH.md, the approach, the tests, and the exact verify commands:
![[spec-tech.png]]

TASKS.md, the dependency graph of tasks with their live status:
![[spec-tasks.png]]

FINDINGS.md, the append-only working memory and execution log:
![[spec-findings.png]]

The list of folders is basically a changelog of how the app grew: https://github.com/tedzhao226/pomotodo/tree/master/specs

The Conductor skill, if you want to read it or grab it: https://github.com/tedzhao226/claude-skills/tree/master/skills/personal/conductor

## The bug the loop caught

Here is where "never trust the self-report" earned its keep.

New tasks were vanishing from the dashboard until the next refresh. The agent that wrote the sync code reported it working. It looked working. The bug was a race.

`syncNow()` ran concurrently from two places with no ordering guard: the 15s periodic poll and the post-create handler. A periodic sync issued just before a task-create always reflects pre-create state. When that stale request resolved late, after the fresh post-create sync, it clobbered `state.dashboard` and hid the task you'd just made. Commit `2f2220e` fixed it with a generation token, so only the most recently started sync's result gets applied. A 70-line regression e2e, `tests/e2e/sync-race.spec.js`, landed with the fix.

This is the class of bug cross-examination exists for. Claude wrote the sync path; the standing practice is a second read from a different model lineage, Codex in my setup. Disagreement between two lineages is a bug detector. When they agree, you learn little; when they diverge, the divergence points almost exactly at the state-management mistake one of them made. Concurrency and shared mutable state are precisely where a single agent's confident self-report is worth the least.

The same instinct paid off elsewhere. On the syncNow-resilience spec (`specs/20260617-2004-syncnow-resilience/`), broadening the verify pass to the full e2e suite turned up two pre-existing test bugs that had nothing to do with the change in flight. Fixing them as test-debt got the final suite to 144/144. A narrow verify would have shipped green and left them buried.

## Cmux: orchestrating the windows

Conductor orchestrates agents. Cmux orchestrates the windows those agents live in, and lets them share context through one skill. It uses a tmux-style model of windows, panes, and surfaces, where a surface is a terminal or a browser. Docs: https://cmux.com/docs.

![[cmux-multi-agent.png]]

Three things it changed:

- No more copy-pasting between agents. I had a plan and a test open in Claude Code and wanted a second agent in opencode to act on them. Normally that's a clipboard relay. With Cmux I told the opencode agent to go get it, and it reached across to the other surface and pulled the context itself.
- The e2e tests came for free. Cmux drives a real browser, so the harness is just Cmux: point it at the running app, open the page, click, fill, wait, check what came back. The first e2e suite got written by having the agent operate the browser, not by me writing selectors blind. The `sync-race.spec.js` regression above lives in that harness.
- The one I didn't expect: Cmux drives your live, interactive Claude Code session by sending keystrokes into its terminal panel, the way tmux send-keys does. The usual way to automate Claude Code is `claude -p` or the SDK, which runs as metered API usage billed separately from the subscription you already pay for. Cmux skips that. You automate the same subscription session you're already in, without paying for extra tokens. And because it's only driving a panel, the same trick invokes any agent that lives in a terminal. If it runs in a window, Cmux can run it.

## The model portfolio

I don't run one model, I route by task. Claude for the plan and for catching itself mid-flow. Codex for cheaper tokens and faster execution, and a second read from a different lineage. Cursor's Composer and opencode as a harness for open-source models, to push the boring mechanical work onto the cheapest tokens. Match each task to the cheapest model that's still good enough, and the bill drops a lot.

None of this required me to learn JavaScript. It required getting good at pointing the right model at the right slice of the problem, and keeping an honest, checkable record while they worked.

I want to be straight about what that skill is and isn't. Orchestration is real and it's employable. It's also not a substitute for engineering taste, the kind people spend years earning, the judgment that tells you a race condition is lurking before any test does. I don't have all of that yet. The loop is how someone still building that taste ships safely anyway: acceptance criteria before code, an append-only log, and a second lineage cross-examining the first. It doesn't replace judgment. It's the scaffolding that lets you deliver correct work while yours is still coming in.

The tools, split into oss, personal, and plugin: https://github.com/tedzhao226/claude-skills
