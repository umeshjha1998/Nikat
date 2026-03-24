# Nikat Workflow and Deployment

## Agent Workflow Rules
- **Repository Isolation**:
  - Angular code -> `frontend/`
  - Spring Boot code -> `backend/`
  - Docs/Agents -> `docs/agents/`
- **Safety First**: Never execute destructive operations on production without validation.
- **Documentation**: Keep the `docs/agents/` folder updated as new patterns emerge.

## Tool Usage
- Use specialized skills (e.g., `angular-best-practices`, `java-springboot`) if available.
- Reference `project-knowledge-base.md` as the entry point for all architectural questions.

## Free Tier Infrastructure
- **Frontend (Vercel)**: Deployed from `/frontend`. Use `Vercel` environment variables for backend URL.
- **Backend (Render)**: Deployed from `/backend`. Use environment variables for all secrets.
- **Database (Neon)**: Postgres with SSL mode. Use pooled connections for performance.

## Deployment Checklist
1. Ensure `application-prod.yml` reflects Render environment variable names.
2. In Angular, ensure production `environment.ts` points to the Render service URL.
3. Verify Flyway migrations are included in the PR if schema changed.
