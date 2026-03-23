# Nikat Agent Instructions

## Overview
This file contains instructions for AI agents working on the Nikat platform. Reference this file and the `docs/agents/` folder for understanding the platform's architecture, workflows, and rules.

## Navigation & Documentation
- Always check `docs/agents/project-knowledge-base.md` for understanding the stack, architectures, entity structures, business rules, design system guidance, and agent workflow rules.

## Commands for Agent Environment
Agents should ensure the following skills are installed (if supported in their environment):
- `npx skills add https://github.com/alfredoperez/angular-best-practices --skill angular-best-practices`
- `npx skills add https://github.com/github/awesome-copilot --skill java-springboot`
- `npx skills add https://github.com/vercel-labs/agent-browser --skill agent-browser`
- `npx skills add https://github.com/neondatabase/agent-skills --skill neon-postgres`
- `npx skills add https://github.com/vercel-labs/skills --skill find-skills`
- `npx skills add https://github.com/google-labs-code/stitch-skills.git --skill design-md`
- `npx skills add https://github.com/google-labs-code/stitch-skills.git --skill enhance-prompt`
- `npx skills add https://github.com/google-labs-code/stitch-skills.git --skill react-components`
- `npx skills add https://github.com/google-labs-code/stitch-skills.git --skill remotion`
- `npx skills add https://github.com/google-labs-code/stitch-skills.git --skill shadcn-ui`
- `npx skills add https://github.com/google-labs-code/stitch-skills.git --skill stitch-design`
- `npx skills add https://github.com/google-labs-code/stitch-skills.git --skill stitch-loop`

## Architecture Purity
- **Single Source of Truth**: All admin updates to entities (users, shops, services, reviews, products) must modify the original canonical data record.
- **Strict Separation**: Angular code belongs strictly in `frontend/`. Spring Boot code belongs strictly in `backend/`.
- Ensure changes follow the outlined patterns in `README.md` and agent instructions.

## Deployment & Free Tier Infrastructure
Agents must ensure the codebase remains compatible with the required free-tier stack:
- **Frontend**: Deployed on **Vercel** (Hobby Tier). Ensure environment configurations point dynamically to the deployed backend URL.
- **Backend**: Deployed on **Render.com** (Free Web Service). Ensure all secrets (Neon DB, JWT, Resend API key) are injected via platform environment variables, never hardcoded.
- **Database**: Hosted on **Neon** Postgres (Free Tier). Must connect with `sslmode=require` and use standard pooled connections.
- Please refer to `docs/agents/project-knowledge-base.md` and `README.md` for comprehensive local/production instructions.
