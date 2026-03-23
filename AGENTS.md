# Nikat Agent Instructions

## Overview
This file contains instructions for AI agents working on the Nikat platform. Reference this file and the `docs/agents/` folder for understanding the platform's architecture, workflows, and rules.

## Navigation & Documentation
- Always check `docs/agents/tech-stack-and-architecture.md` for understanding the stack (Angular 18 & Spring Boot 3).
- Check `docs/agents/data-models.md` for entity structures.
- Check `docs/agents/core-features-and-logic.md` for business rules.
- Check `docs/agents/ui-ux-guidelines.md` for design system guidance.
- Check `docs/agents/agent-workflow-rules.md` for rules on working safely and preserving architecture.

## Commands for Agent Environment
Agents should ensure the following skills are installed (if supported in their environment):
- `npx skills add https://github.com/alfredoperez/angular-best-practices --skill angular-best-practices`
- `npx skills add https://github.com/github/awesome-copilot --skill java-springboot`
- `npx skills add https://github.com/vercel-labs/agent-browser --skill agent-browser`
- `npx skills add https://github.com/neondatabase/agent-skills --skill neon-postgres`
- `npx skills add https://github.com/vercel-labs/skills --skill find-skills`
- `npx skills add https://github.com/google-labs-code/stitch-skills.git --skill stitch-skills`

## Architecture Purity
- **Single Source of Truth**: All admin updates to entities (users, shops, services, reviews, products) must modify the original canonical data record.
- **Strict Separation**: Angular code belongs strictly in `frontend/`. Spring Boot code belongs strictly in `backend/`.
- Ensure changes follow the outlined patterns in `README.md` and agent instructions.
