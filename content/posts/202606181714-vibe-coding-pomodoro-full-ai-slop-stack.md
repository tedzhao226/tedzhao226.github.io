---
title: 'Vibe coding a Pomodoro app in "full-(ai slop)-stack"'
date: 2026-06-18
draft: false
tags:
  - ai
  - claude-code
  - cmux
  - vibe-coding
description: I shipped a full-stack app without learning the stack. Here is the toolchain that did it.
---

# Vibe coding a Pomodoro app in "full-(ai slop)-stack"

*I shipped a full-stack app without learning the stack. Here is the toolchain that did it.*

I haven't learned a single line of JS. But the Pomodoro app I just built does everything the paid one I relied on for years did, before they decommissioned it and left me hanging.

![[pomo-app-ui.png]]

It's a small thing and I won't pretend otherwise. A task list you filter by `#tag`. Inline syntax, so typing `#` and `*` in a task drops straight into its attributes. A daily dashboard that shows my workload and how productive I actually was, which is the part I care about most, because the chart is a dopamine hack and the dopamine is what keeps me opening the app.

![[pomo-stats-dashboard.png]]

Code is here if you want to poke at it: https://github.com/tedzhao226/pomotodo

The app isn't the interesting part though. I shipped a full-stack thing without knowing the stack. To be clear, I didn't hand-write the JavaScript; the agents did. I read it, ran it, and debugged it against the spec, which stayed the ground truth the whole way. The reason that worked is the toolchain. Three pieces carried it:

- Claude Code (max)
- Cmux (https://cmux.com/)
- Conductor, a personal orchestration skill I wrote (https://github.com/tedzhao226/claude-skills/tree/master/skills/personal/conductor)
- Plus the Codex plugin, for a second opinion

Here is why the two that matter, Conductor and Cmux, are stronger than they look.

## Why Conductor is powerful

Conductor is an orchestrator. It runs plan, then exec, then verify, over a spec folder that lives in the repo; the pomo app ended up with 28 of those folders, one per feature. Four things make it hold up over a long build.

First, the task list is a graph, not a line. To be fair, Claude Code's native todo list already tracks dependencies, so the graph itself is not the new part. What Conductor changes is where it lives: the graph is a file in your repo. Independent tasks fan out into batches that run at the same time, only the dependent ones wait, and you can read the whole plan instead of trusting ephemeral session state.

Second, it designs before it builds. Before any code, Conductor writes the spec: a product doc with acceptance criteria (each one observable and testable, with a stable id), and a tech doc with the approach, the tests, and the exact verification commands. Only then does it cut the work into tasks, each one pinned to an acceptance id. I lifted the spec-folder idea from Warp's open-source setup: design the product and the tech first, write code second. It ports cleanly into Claude Code, and for someone who doesn't know the language, having correctness defined up front is what makes the build safe to hand off.

Third, the working memory is committed to the repo, not just living in the chat. Claude Code already writes session and subagent logs to disk, so on-disk memory is not the trick by itself. The trick is that Conductor's memory is structured and sits in the repo next to the code. FINDINGS is append-only: every status change gets a line, dispatched, done, failed, replanned, and you can't quietly rewrite it, so the record stays honest about what actually happened. That same log is what the verify pass checks against. The runs/ folder keeps each subagent's output, one folder per task, the summary plus the actual diff. You can open the repo and read the whole reasoning trail, instead of digging through a transcript buried in a temp dir.

So you plan once and the swarm executes, and because the plan, the criteria, the history, and the evidence are all files, you can close the laptop and pick it back up tomorrow, or hand the whole thing to a fresh agent, and nothing is lost.

Here is what one of those spec folders actually looks like:

```text
specs/20260618-1522-block-task-sync/
  PRODUCT.md   what we're building + acceptance criteria (VAL-* ids)
  TECH.md      the approach, the tests, the exact verify commands
  TASKS.md     the dependency graph of tasks, with live status
  FINDINGS.md  append-only working memory + execution log
  runs/        each subagent's raw output and diff, one folder per task
```

And here is each file in that folder, rendered straight from the repo.

PRODUCT.md, what we're building and the acceptance criteria:
![[spec-product.png]]

TECH.md, the approach, the tests, and the exact verify commands:
![[spec-tech.png]]

TASKS.md, the dependency graph of tasks with their live status:
![[spec-tasks.png]]

FINDINGS.md, the append-only working memory and execution log:
![[spec-findings.png]]

The pomo app got built this way. That list of folders is basically a changelog of how the app grew: https://github.com/tedzhao226/pomotodo/tree/master/specs

The Conductor skill itself, if you want to read it or grab it: https://github.com/tedzhao226/claude-skills/tree/master/skills/personal/conductor

## Why Cmux is powerful

Conductor orchestrates agents. Cmux orchestrates the windows those agents live in, and lets them share context with each other through one skill. Three moments from the build made it click.

New to cmux? It uses a tmux-style model of windows, panes, and surfaces, where a surface is a terminal or a browser. The docs are here: https://cmux.com/docs.

![[cmux-multi-agent.png]]

- I stopped copy-pasting between agents. I had a plan and a test open in Claude Code and wanted a second agent in opencode to act on them. Normally that is a clipboard relay: copy, switch window, paste, repeat. With Cmux I just told the opencode agent to go get it, and it reached across to the other surface and pulled the context itself.
- The e2e tests came for free. Cmux drives a real browser, so the test harness is just Cmux: point it at the running app, open the page, click, fill, wait, check what came back. The first e2e suite for pomo got written by having the agent operate the browser through Cmux, not by me writing selectors blind.
- The one I didn't expect: you can orchestrate any agent natively. Cmux and tmux let you drive a terminal panel directly, sending keystrokes straight into it the way tmux send-keys does, so you can run `claude -p` by operating the Claude Code TUI itself. An agent with no CLI, no ACP, no programmatic way in, or even a Claude Code sub-plan that has had its CLI stripped, can still be invoked, because you are talking to the panel, not to an API. If it runs in a window, Cmux can run it.

## The model portfolio

I don't run one model, I route by task. Claude for the plan and for catching itself mid-flow. Codex for cheaper tokens and faster execution, and through the Codex plugin, a second read from a different model lineage; when Claude and Codex disagree, that gap is usually where the bug is. Cursor's Composer and opencode as a harness for open-source models, to push the boring mechanical work onto the cheapest tokens. Match each task to the cheapest model that is still good enough, and the bill drops a lot.

None of this required me to learn JavaScript. It required me to get good at pointing the right model at the right slice of the problem, and keeping an honest record while they worked. That is the actual skill now.

The tools, split into oss, personal, and plugin: https://github.com/tedzhao226/claude-skills
