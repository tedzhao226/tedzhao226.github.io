# Context: Humanize + refocus the pomodoro post

## Relevant Files

- `content/posts/202606181714-vibe-coding-pomodoro-full-ai-slop-stack.md` — the post to rewrite (published, `draft: false`)
- `/Users/ted/workspace/pomotodo/specs/` — 40 spec folders; evidence base for war stories
- `AGENTS.md` (blog repo) — career wording rules: "AI engineer", "agentic workflows"; never "full-stack developer". Verification: `npm run check` then Quartz build with Node 22.

## Discoveries

- **Skill research (2026-07-05):** no single dominant bilingual humanizer exists.
  - `blader/humanizer` — 27.5k stars, actively pushed (2026-06-29), 29 English AI-tell patterns, plain-Markdown skill. The de facto standard for English.
  - `op7418/Humanizer-zh` — 12.4k stars, the Chinese port by 歸藏. Standard for Chinese.
  - Runners-up rejected: shuorenhua (617★), Aboudjem/humanizer-skill (106★), stop-slop-zh (1★), qu-ai-wei (0★).
  - Decision: install **both** as a pair under the user's skill system; route by language. This post is English → blader/humanizer applies.
- **War story (verified in pomotodo repo):** commit `2f2220e` "fix(sync): discard stale dashboard responses so new tasks never vanish". Root cause: `syncNow()` raced between the 15s periodic poll and the post-create handler; a stale periodic response resolving late clobbered `state.dashboard` and hid the just-created task. Fix: generation token so only the most recent sync's result applies. Regression test `tests/e2e/sync-race.spec.js` (70 lines) landed with the fix. Related spec: `specs/20260617-2004-syncnow-resilience/` — its FINDINGS.md shows the loop catching pre-existing test bugs during broadened verify (144/144 final).
- Ted's grill answers (2026-07-05):
  - Thesis = loop discipline (plan/exec/verify, locked acceptance, append-only log), and the post should position Ted as an AI-native engineer + promote the Conductor skill.
  - War story material: race condition + UI state management; take = cross-examining with different model lineages is good practice.
  - Audience = potential employers evaluating AI-native engineering skill.
  - Honesty constraint Ted volunteered: "true experience can't be replaced by AI management skill; taste is where people spend years." The rewrite should keep this humility — it _strengthens_ the employer pitch rather than undercutting it. The closing "That is the actual skill now" line currently overclaims; temper it.
- Skill install target: Ted's skills live under the agent-system skill tree (`skill-manager` skill governs adding OSS skills + `make sync`). Installation task should follow that skill, not ad-hoc cloning.

## Knowledge Updates

- Worker note (T2): Quartz build fails in subagent env (dyld libsimdjson.30.dylib missing for node@22) — root cause was stale dylib links in the node@22 keg after simdjson/simdutf upgrades; fixed via brew reinstall node@22 (T4).
- .prettierignore now excludes .pi-subagents and .hermes (machine-generated artifacts, not prose).
- Reviewer editorial note (non-blocking): third Cmux bullet is the weakest stretch — billing-avoidance angle could read ToS-gray to a hiring reader; Ted may want to trim it. Also "Three things…" list-framing repeats 3× (cosmetic).
- pomotodo has 40 spec folders (post claim verified).

- Blog verification chain: `npm run check` (tsc + prettier) then `PATH=/opt/homebrew/opt/node@22/bin:$PATH npm_config_cache=/private/tmp/blog-npm-cache npx quartz build`.
- Post filename must stay `202606181714-vibe-coding-pomodoro-full-ai-slop-stack.md` (zettelkasten rule — no renaming).

## Drift

- None. (Post is live; rewrite happens in place on the same file.)

## Rejected

- Recommending a single "bilingual" humanizer skill — none of the candidates credibly covers both languages; the top Chinese option is itself a port of the top English one.
- Splitting the post into two (workflow post + war-story post) — the war story is the evidence for the workflow claim; separated, both get weaker.
- Removing the self-deprecating angle entirely — Ted's "taste takes years" point is true and reads as senior judgment; keep it as the closing counterweight instead of deleting it.

## Durable Candidates

- Humanizer skill pair (blader + op7418) as the house writing-polish standard, routed by language.

## Execution Log

Append-only — status history; never overwrite or delete entries.

### [2026-07-05 18:24] plan — written

- status: planned
- evidence: grill answers captured; war story verified against pomotodo commit 2f2220e and spec 20260617-2004; skill landscape researched with star counts.

### [2026-07-05] T1 — in_progress

- status: in_progress
- backend: pi worker anthropic/claude-sonnet-5
- contract_refs: VAL-SKILL-001
- run_path: runs/T1/

### [2026-07-05] T2 — in_progress

- status: in_progress
- backend: pi worker anthropic/claude-opus-4-8
- contract_refs: VAL-POST-001, VAL-POST-002, VAL-POST-003, VAL-POST-005
- run_path: runs/T2/

### [2026-07-05] T1 — done

- status: done
- backend: pi worker anthropic/claude-sonnet-5
- contract_refs: VAL-SKILL-001
- tests_run: ls ~/.pi/agent/skills/agent-system/ | grep -i human → humanizer/, humanizer-zh/ (orchestrator-run)
- evidence: installed via make install-oss; skills-cli security scan clean; make verify 14/14; exposed to pi target only
- run_path: runs/T1/

### [2026-07-05] T2 — done

- status: done
- backend: pi worker anthropic/claude-opus-4-8
- contract_refs: VAL-POST-001, VAL-POST-002, VAL-POST-003, VAL-POST-005
- tests_run: orchestrator read of final post; grep for banned wording clean; 7 embeds intact; war-story facts match 2f2220e --stat; 40 spec folders confirmed in pomotodo
- evidence: diff.patch touches only the post; new title/description; war-story section added; close tempered
- run_path: runs/T2/

### [2026-07-05] T3 — in_progress

- status: in_progress
- backend: pi worker anthropic/claude-opus-4-8
- contract_refs: VAL-POST-004
- run_path: runs/T3/

### [2026-07-05] T3 — done

- status: done
- backend: pi worker anthropic/claude-opus-4-8
- contract_refs: VAL-POST-004
- tests_run: orchestrator diff scan — single line-102 edit, scope clean; 33-category audit in runs/T3/summary.txt
- evidence: 1 tailing-negation tell fixed; 32 categories clean; facts unchanged
- run_path: runs/T3/

### [2026-07-05] T4 — done

- status: done
- backend: host-direct (orchestrator)
- contract_refs: VAL-BUILD-001
- tests_run: npm run check → exit 0; PATH=node@22 npx quartz build → exit 0 (runs/T4/check.log, build.log)
- evidence: prettier initially failed on machine-generated artifacts — added .pi-subagents/.hermes to .prettierignore, formatted spec files; quartz build initially aborted on stale node@22 dylib links (libsimdjson.30, libsimdutf.32 upgraded from under it) — root-cause fix: brew reinstall node@22
- run_path: runs/T4/

### [2026-07-05] T5 — in_progress

- status: in_progress
- backend: pi reviewer anthropic/claude-fable-5
- contract_refs: VAL-POST-001..005
- run_path: runs/T5/

### [2026-07-05] T5 — done

- status: done
- backend: pi reviewer anthropic/claude-fable-5 (fresh session, distinct model line)
- contract_refs: VAL-POST-001, VAL-POST-002, VAL-POST-003, VAL-POST-004, VAL-POST-005
- tests_run: reviewer verified war story against 2f2220e diff + FINDINGS.md, 40-folder count, embeds, links (all 200), grep for banned wording — all PASS
- evidence: overall PASS with one caveat — "a Codex read surfaced it" stated as historical fact without repo evidence; orchestrator softened to a practice claim ("the standing practice is a second read…"), then re-ran check + quartz build (both exit 0)
- run_path: runs/T5/
