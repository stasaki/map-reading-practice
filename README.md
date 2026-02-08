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

## Contributing Questions

Want to add new questions to the practice bank? We've made it easy!

📚 **[Read the complete guide: ADDING_QUESTIONS.md](ADDING_QUESTIONS.md)**

### Quick Start

1. Choose the appropriate JSON file in `src/data/questions/` (grades 3-5) or `src/data/questions/hs/` (grades 9-12)
2. Use the template in `QUESTION_TEMPLATE.json` as a starting point
3. Add your question following the documented structure
4. Validate your changes: `npm run validate-questions`
5. Test in the app: `npm run dev`

The validation script checks for:
- Valid JSON syntax
- Unique IDs across all files
- Correct RIT levels for grade band and difficulty
- All required fields present
- Valid passage references

Current question bank: **64 questions** across 8 files (8 questions per file)
