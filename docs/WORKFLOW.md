# Working schedule and model handoff

Target: all artifacts prepared by 30 November 2026, IST. Official internship: 21 November–21 December. Estimate: 34 focused hours, including learning and review. Implementation generated in one Codex session does not replace your learning schedule or sincere participation.

| Date | Hours | Your focus |
| --- | --- | --- |
| 22 Nov | 4 | Verify offer/portal and AI rules; clarify L3 conflict; run Level 1 |
| 23 Nov | 3.5 | Modify and explain form/counter; test Level 1 |
| 24 Nov | 4 | Learn React fundamentals and routing; run SPA |
| 25 Nov | 4 | Explain API state transitions and Bootstrap overrides; review Level 2 |
| 26 Nov | 4 | Understand components, props, accessibility, and Storybook |
| 27 Nov | 3.5 | Own npm scope, package installation, publication, animation exercise |
| 28 Nov | 4 | Reproduce performance results; explain Level 3 |
| 29 Nov | 3.5 | Final browser review; record personal narrated demonstrations; edit résumé |
| 30 Nov | 3.5 | Contingency, deployment access check, backups, portal preparation |

## Model routing

Use the cheapest capable model available in your picker: Luna for focused implementation; Terra for small edits/explanations/visual inspection; Sol for harder React/API/packaging issues; Astra for the three level reviews and final review. Actual account availability changes. No model is hallucination-free. Do not pay for API access just to follow this workflow.

Keep changes bounded. After two failed fixes for the same issue, hand off the exact error, relevant files, expected behavior, and attempted fixes to Sol. Keep sufficient allowance for the final review. Use medium reasoning for coding, low for ordinary text, high selectively for review. These are workload choices, not guaranteed quota savings.

Builder prompt:
"Implement only task [ID] against docs/TASK-MATRIX.md. Read existing code. Keep changes small, preserve native accessibility, verify unfamiliar APIs against official documentation, run relevant checks, and report actual outcomes and unverified assumptions. Explain the data flow so I can reproduce it."

Reviewer prompt:
"Review these task IDs against their requirements. Inspect code and run checks. Give a separate verdict per task with reproducible defects and file locations. Distinguish verified behavior from assumptions and external actions. Prioritize correctness, accessibility, responsiveness, and maintainability."

Daily handoff: task IDs completed, personal learning/change, exact checks run, remaining defects, external dependencies, next action. Never state a check passed without its evidence.
