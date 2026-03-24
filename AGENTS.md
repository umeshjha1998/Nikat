# Nikat Agent Instructions

## Overview
This document serves as the entry point for AI agents working on the Nikat platform. To ensure architectural integrity and design consistency, agents **MUST** reference the specialized modules in `docs/agents/`.

## 🧭 Navigation & Core Guidelines
For detailed instructions, refer to the following:
- **[Central Hub](file:///e:/My%20folder/Education/Git/Nikat/docs/agents/project-knowledge-base.md)**: The starting point for all project knowledge.
- **[Frontend](file:///e:/My%20folder/Education/Git/Nikat/docs/agents/frontend-guidelines.md)**: Angular & Design System rules.
- **[Backend](file:///e:/My%20folder/Education/Git/Nikat/docs/agents/backend-guidelines.md)**: Spring Boot & Security rules.
- **[Business Logic](file:///e:/My%20folder/Education/Git/Nikat/docs/agents/database-and-logic-rules.md)**: Single Source of Truth (SSOT) & Domain rules.
- **[Workflow](file:///e:/My%20folder/Education/Git/Nikat/docs/agents/workflow-and-deployment.md)**: Tool usage & Infrastructure details.

## 🛠️ Mandatory Agent Environment
Ensure the following skills are available:
- `angular-best-practices`, `java-springboot`, `agent-browser`, `neon-postgres`, `design-md`.

## 📜 Architecture Purity (CRITICAL)
- **Single Source of Truth**: All updates to entities MUST modify the original canonical data record.
- **Strict Separation**: Frontend in `frontend/`, Backend in `backend/`.
- **Infrastructure**: Maintain compatibility with the free-tier stack (Vercel, Render, Neon).

Please refer to `README.md` for local and production deployment instructions.
