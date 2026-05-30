# UniSearch

UniSearch is a personalized admissions planning MVP for students applying to universities abroad. It collects a real student profile, recommends universities from a local structured database, shows program-level guidance, compares universities, and can generate an AI-powered fit summary through a secure backend endpoint.

## Problem Solved

International admissions research is fragmented across university pages, country-specific qualification rules, English requirements, exam policies, program pages, and scholarship notes. UniSearch gives students a structured first pass: profile collection, cautious requirements guidance, explainable recommendations, official links, comparison, and practical next steps.

UniSearch is not an official admissions source. Requirements change every year. Always verify exact details on the official university website.

## Features

- Multi-step student profile quiz
- Multi-select majors and target regions
- Completed exams only, with score inputs shown only for selected exams
- LocalStorage persistence for profile, comparison list, and latest result list
- Deterministic university matching using local structured data
- 108 universities across the UK, US, Canada, Europe, Asia, and Turkey
- Results grouped by region and competitiveness category
- Profile-aware academic requirements and exam recommendations
- University detail pages with matched program data
- University intelligence fields for rankings, subject strength, city convenience, tuition affordability, program length, alumni/review signal, company ecosystem, and selectivity/acceptance transparency
- Back to Results, Previous university, and Next university navigation
- Compare table with matched program and university intelligence fields
- Sticky compare bar with a four-university limit
- AI Fit Summary via backend `/api/ai-fit-summary`
- No Gemini API key in frontend code

## Tech Stack

- React
- Vite
- JavaScript
- React Router DOM
- lucide-react
- Plain CSS
- Local university database
- localStorage
- Node / Express backend
- Gemini API via `@google/generative-ai`

## Project Structure

```text
src/
  data/universities.js
  components/
  pages/
  utils/
  App.jsx
  main.jsx
  index.css
server/
  index.js
```

## Environment Variables

Create a local `.env` file in the project root:

```bash
GEMINI_API_KEY=your_key_here
GEMINI_MODEL=gemini-3-flash-preview
```

`.env` and `.env.local` are ignored by Git. Never put API keys in frontend code.

For Vercel, add the same variables in:

```text
Project Settings -> Environment Variables
```

Add `GEMINI_API_KEY` for Production, Preview, and Development, then redeploy. Optional: add `GEMINI_MODEL=gemini-3-flash-preview`; otherwise the backend uses that model by default.

## Frontend Setup

```bash
npm install
npm run dev
```

The frontend runs through Vite, usually at:

```text
http://127.0.0.1:5173/
```

## Backend/API Setup

In a second terminal:

```bash
npm run dev:api
```

The Express API runs at:

```text
http://127.0.0.1:5050/
```

Vite proxies `/api` requests to the backend during development.

## AI Fit Summary

The University Details page includes a "Generate AI Fit Summary" button. The frontend sends:

- student profile
- selected university
- matched program

to:

```text
POST /api/ai-fit-summary
```

The backend reads `GEMINI_API_KEY` from environment variables and asks Gemini to produce a cautious, practical summary. The prompt instructs the model to use only provided data, avoid inventing exact requirements, avoid guaranteed admission claims, and remind users to verify official requirements.

Cost-safety behavior:

- AI is never called on page load.
- The University Details page calls AI only after the user clicks "Generate AI Fit Summary".
- Generated summaries are cached in `localStorage` with `aiSummary_${university.id}_${matchedProgram.programId}`.
- Cached summaries render immediately without another API call.
- "Regenerate summary" manually bypasses the cache and overwrites it.
- The backend uses `gemini-3-flash-preview` by default.

## University Intelligence Data

The local university database includes an `insights` object for every university. These fields are designed for fast compare/detail pages without repeatedly calling AI:

- ranking signal and subject strength
- city convenience score
- tuition affordability score
- program length clarity score
- student reviews/alumni outcomes signal
- company/recruiting ecosystem signal
- acceptance/selectivity transparency note

Some fields use bands and cautious notes rather than exact numbers because global ranking systems, tuition, program length, and admissions data are not published in one consistent format across the UK, US, Canada, Europe, and Asia. US admit rates should be verified through official admissions pages or Common Data Set where available. Non-US acceptance rates are often not directly comparable.

## How To Run Locally

Terminal 1:

```bash
npm run dev:api
```

Terminal 2:

```bash
npm run dev
```

Then open:

```text
http://127.0.0.1:5173/
```

## Production Build

```bash
npm run build
```

## Future Improvements

- Verified official requirement database
- Scholarship matching
- Deadline tracker
- User accounts
- Saved shortlists
- PDF export
- Application timeline planner
- Admin tools for manually verified program data
