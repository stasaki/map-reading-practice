# MAP Reading Practice

Adaptive reading practice app for grades 3–5 and 9–12, modeled after the MAP (Measures of Academic Progress) assessment. Tracks RIT scores and adjusts difficulty to each student's level.


## Features

- **Two grade bands:** Grades 3–5 (RIT 180–220) and Grades 9–12 (RIT 230–260)
- **Four question types:** Literary, Informational, Vocabulary, Foundational
- **Adaptive difficulty:** Questions adjust based on performance
- **Progress tracking:** RIT score trends and session history (stored locally per device)

## Development

```bash
npm install
npm run dev
```

## Tech Stack

Vite, React, TypeScript, Tailwind CSS v4

## Adding Questions

See [ADDING_QUESTIONS.md](ADDING_QUESTIONS.md) for how to add new questions. Validate with `npm run validate-questions`.
