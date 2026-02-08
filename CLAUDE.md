# MAP Reading Practice

## Tech Stack
- Vite 7 + React 19 + TypeScript 5.9
- Tailwind CSS v4 (`@tailwindcss/vite` plugin, CSS-based `@theme` config in `index.css`, no `tailwind.config.js`)
- react-router-dom v7 (BrowserRouter with Layout wrapper)
- Vitest 4 for testing
- localStorage for persistence
- Deployed on Vercel (Hobby plan)

## Architecture
- **Question data**: JSON files in `src/data/questions/` (grades 3-5) and `src/data/questions/hs/` (grades 9-12)
- **Data loader**: `src/data/loader.ts` — `getQuestionsForGradeBand()`/`getPassagesForGradeBand()` for grade-specific pools, `allQuestions`/`allPassages` for backward compat
- **Grade bands**: `src/types/gradeBand.ts` — `GRADE_BANDS` config record centralizes RIT ranges, difficulty RIT values, labels. Adding a new band (e.g. 6-8) means adding one entry + JSON files
- **Quiz state**: `useQuiz` hook uses `useReducer` with phases: idle → active → feedback → complete
- **Scoring**: RIT-based adaptive scoring in `src/utils/scoring.ts`, all functions take `GradeBandConfig` param
- **Routing**: Pages get state via `useLocation().state`

## Commands
- `npm run dev` — dev server
- `npx tsc -b` — type check
- `npx vitest run` — run tests
- `npm run build` — production build
- `npx vercel --prod` — deploy to Vercel
