# Quick Reference: Adding Questions

## File Locations
```
src/data/questions/
├── literary.json          # Grades 3-5
├── informational.json
├── vocabulary.json
├── foundational.json
└── hs/
    ├── literary.json      # Grades 9-12
    ├── informational.json
    ├── vocabulary.json
    └── foundational.json
```

## Question Structure (minimal)
```json
{
  "id": "unique-q1",
  "type": "literary|informational|vocabulary|foundational",
  "difficulty": "easy|medium|hard",
  "ritLevel": 187,
  "skill": "character-analysis",
  "skillLabel": "Character Analysis",
  "passageId": "passage-id" OR null,
  "questionText": "Your question?",
  "choices": [
    { "label": "A", "text": "Choice 1" },
    { "label": "B", "text": "Choice 2" },
    { "label": "C", "text": "Choice 3" },
    { "label": "D", "text": "Choice 4" }
  ],
  "correctAnswer": "B",
  "explanation": "Why B is correct..."
}
```

## RIT Level Guidelines

| Grade Band | Easy | Medium | Hard |
|------------|------|--------|------|
| Grades 3-5 | 180-190 | 195-205 | 208-220 |
| Grades 9-12 | 230-240 | 240-250 | 250-260 |

## Common Skills (by type)

**Literary**: character-analysis, figurative-language, theme, inference, symbolism, narrative-technique

**Informational**: main-idea, central-idea, text-structure, authors-purpose, cause-effect, compare-contrast

**Vocabulary**: context-clues, synonyms-antonyms, prefixes-suffixes, word-meaning, multiple-meaning, word-roots

**Foundational**: grammar, sentence-structure, punctuation, pronoun-reference, parallel-structure

*See ADDING_QUESTIONS.md for complete list of 39 skills*

## Commands
```bash
npm run validate-questions  # Check your changes
npm run dev                  # Test in the app
npm run build                # Production build
```

## Checklist
- [ ] Unique ID (check ALL files)
- [ ] Correct RIT level for grade band + difficulty
- [ ] 4 choices with labels A-D
- [ ] Clear explanation with evidence
- [ ] Valid JSON syntax
- [ ] Passage exists if passageId is set
- [ ] Ran validation script
- [ ] Tested in app

## Tips
✅ Make wrong answers plausible  
✅ Keep difficulty appropriate to RIT level  
✅ Cite evidence in explanations  
✅ Multiple questions can share one passage  

❌ Don't reuse IDs  
❌ Don't make trick questions  
❌ Don't skip validation  

---

📖 **Full Guide**: [ADDING_QUESTIONS.md](ADDING_QUESTIONS.md)  
📝 **Template**: [QUESTION_TEMPLATE.json](QUESTION_TEMPLATE.json)
