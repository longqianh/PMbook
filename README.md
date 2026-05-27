# California PM Intel Portal

A static information portal for product manager job search research focused on 100 major California companies.

## Panels

- **PM Positions**: top-100 California company list with direct official career/job-board links, PM-filtered role links where supported, official newsroom/blog links, official hiring-process/careers information links, and shared interview-question/experience links.
- **How To Prepare**: curated PM preparation resources.
- **Questions & Exams**: curated PM question banks and interview-practice resources.

## Why Links Instead Of Scraping

The app is intentionally static. LinkedIn, Google Jobs, company career systems, and interview banks often block direct browser scraping through login requirements, CORS, and bot protection. The portal therefore uses direct official company pages instead of scraping or generic search pages.

## Run

Open `index.html` in a browser.

No dependencies are required.

## Project Structure

```text
pm-intel-portal/
  index.html   Portal shell
  styles.css   Responsive panel UI
  app.js       Company list, source links, filters, and resource rendering
```
