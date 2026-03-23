# Nikat Agents Instructions

## Introduction
You are working on Nikat, a local services and shops discovery platform. The repository is a split monolith consisting of an Angular 18 frontend and a Spring Boot 3 Java 21 backend.

## Architectural Guidelines

### Frontend (Angular)
- The frontend is located in the `frontend/` directory.
- It is deployed automatically via Vercel using `vercel.json` for SPA routing.
- **Component Strategy**: It uses Angular Modules (`NgModule`) instead of Standalone components for legacy consistency. All features are wrapped in feature modules (e.g., `auth`, `admin`, `community`) and lazy loaded.
- **Styling**: `styles.scss` uses Angular Material prebuilt themes (`indigo-pink.css`) and global dark mode toggles `.dark-theme`.
- **State & APIs**: Shared logic lives in `core/services/` (`ApiService`, `AuthService`). Auth token is stored in localStorage.

### Backend (Spring Boot)
- The backend is located in the `backend/` directory.
- It is deployed to Render.com using the provided `Dockerfile` and `render.yaml`.
- **Java Version**: Uses Java 21.
- **Security**: Spring Security 6 with JWT filter chain. The `ApplicationConfig` handles DaoAuthenticationProvider with `BCryptPasswordEncoder`.
- **Database**: PostgreSQL (Neon Database). Uses Spring Data JPA with `Hibernate`. Base inheritance is used for `Listing` -> `Shop` / `Service` with `InheritanceType.JOINED`.
- **Testing**: JUnit 5 + Mockito. 100% logic line coverage mapped via JaCoCo maven plugin. Use `./mvnw test` to execute.

## Deployment Details
- **Render Setup**: Web service points to `backend/Dockerfile` and exposes port `8080`. Requires `.env` keys for Database connection and JWT secrets.
- **Vercel Setup**: Standard Angular project settings. Framework preset should be `Angular` and root directory `frontend/`.

## Common Commands
- Run Frontend Tests: `cd frontend && npm run test`
- Run Backend Tests: `cd backend && ./mvnw clean test`
- Build Frontend: `cd frontend && npm run build`
- Build Backend: `cd backend && ./mvnw clean package -DskipTests`

*Note for AI Agents:* Because the codebase is located in an isolated MCP sandbox without a GitHub repository mapped, programmatic Vercel/Render deployments via direct MCP API requests that require a `repo` attribute will fail. The structural design and configuration files (`render.yaml`, `vercel.json`, `Dockerfile`) are fully built to handle it natively once pushed to GitHub.
# AI Agent Instructions (Agentic Flow Standard)

This file contains instructions for AI coding assistants (like Cursor, Copilot, or Claude) working on the Nikat project.

## Core Directives

1. **Follow the Agentic Flow:** Always refer to the specialized documentation in the `agent-instructions/` directory before making architectural, data modeling, or design decisions.
2. **Read Before Writing:** When starting a new task, ensure you have read the relevant documentation:
   * **Stack/Architecture:** Read `agent-instructions/tech-stack-and-architecture.md`
   * **Data Models:** Read `agent-instructions/data-models.md`
   * **Business Logic:** Read `agent-instructions/core-features-and-logic.md`
   * **UI/UX & Styling:** Read `agent-instructions/ui-ux-guidelines.md`
   * **Workflow Rules:** Read `agent-instructions/agent-workflow-rules.md`
3. **Verify Existing Code:** Before implementing a new feature, search the codebase for existing reusable components, utilities, and patterns.
4. **Maintain Consistency:** Adhere strictly to the established UI/UX guidelines and coding standards defined in the `agent-instructions/` folder.
5. **Update Documentation:** If you make a significant architectural change or introduce a new data model, you must update the corresponding file in the `agent-instructions/` directory.

## Project Context
The Nikat project is a comprehensive local discovery and community platform. For a full overview of features and user roles, refer to the `README.md`.
