# Nikat - Agentic Workflow Instructions

## 1. Overview
This document serves as the foundational, root-level instruction file for AI agents interacting with the Nikat platform. This repository adheres to an **agentic workflow standard**, requiring autonomous agents to safely navigate, comprehend, and iterate on the project without breaking existing architecture.

## 2. Navigating the Repository
You must always default to checking `.agent/` for domain-specific instructions before attempting to restructure any code:
- **[Tech Stack and Architecture](.agent/tech-stack-and-architecture.md)**
- **[Data Models](.agent/data-models.md)**
- **[Core Features and Logic](.agent/core-features-and-logic.md)**
- **[UI and UX Guidelines](.agent/ui-ux-guidelines.md)**
- **[Agent Workflow Rules](.agent/agent-workflow-rules.md)**

## 3. How Agents Should Understand the Project
- **Holistic Review**: Always review the above documents to grasp the big picture before diving directly into a deeply nested component or controller.
- **Roles and Features**: Understand how features branch across different roles (Admin, User, Shop, Service Provider) by consulting `core-features-and-logic.md`.
- **UI/UX Match**: Never create basic or raw templates unless experimenting. Use the exact styles and components specified in `ui-ux-guidelines.md`.

## 4. Single Source of Truth
- The backend (`backend/`) database and business layer are the canonical **Single Source of Truth** for all entities, constraints, relationships, validations, and security boundaries.
- The frontend (`frontend/`) is purely a display and action-dispatching layer. Do not duplicate backend business logic validations on the frontend (beyond basic form validation).

## 5. Working Safely & Preserving Architecture
- **No Rogue Libraries**: Do not install unverified npm packages or Maven dependencies without user permission.
- **Strict Separation**: Frontend code stays in `frontend/`, backend in `backend/`. Do not mix scripts or configs across this boundary.
- **Rule Verification**: Before executing modifications, cross-reference your plan against constraints listed in `agent-workflow-rules.md`.
- **Backwards Compatibility**: When adding to data models or creating API endpoints, ensure endpoints used by legacy features or other agents remain unaffected.

Refer to `README.md` for project background, roles overview, environment variables, and deployment instructions.
