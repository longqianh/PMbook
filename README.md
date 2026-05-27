# PM Job Copilot

PM Job Copilot is a v0 browser app for running a product manager job search from one place. It is intentionally static for the first test: open `index.html`, use it locally, and export/import JSON when you want a backup.

## V0 Feature Set

- Dashboard with active roles, applications, interview rate, follow-ups, daily focus, stage mix, and pipeline risk queue.
- Opportunity pipeline with PM-specific fields, stage movement, priority, follow-up dates, contacts, notes, tags, fit scoring, and shortcuts into downstream workflows.
- Targeting workspace for a PM search thesis and target role fit scoring.
- Fit Lab for job-description keyword coverage, missing-signal analysis, resume bullet prompts, and story matching.
- Networking tracker for referral paths and contact follow-ups.
- Outreach generator for warm intros, referral asks, recruiter notes, and follow-ups.
- PM story bank with competency mapping, situation/action/impact, and metrics.
- Interview practice with prompt categories, timer, prep notes, and action-plan handoff.
- Decision matrix for comparing offers or late-stage opportunities across PM-relevant factors.
- Weekly plan with application, warm intro, drill, and story goals.
- Application brief generator that combines thesis, opportunity data, keywords, stories, and next steps.
- Local JSON import/export for backup and migration.

## Run

Open `index.html` in a browser.

No dependencies are required for the v0. Data is stored in browser `localStorage`.

## Project Structure

```text
pm-job-copilot/
  index.html   Static app shell
  styles.css   Responsive product UI
  app.js       State, scoring, rendering, and interactions
```

## Next Build Priorities

1. Add authenticated accounts and cloud sync.
2. Replace localStorage with a small database.
3. Add resume parsing and structured job-description import.
4. Add calendar reminders for interviews and follow-ups.
5. Add AI-assisted story matching, resume rewriting, and interview answer critique.
