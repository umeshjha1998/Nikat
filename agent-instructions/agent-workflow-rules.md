# Agent Workflow Rules

This document outlines the standard operating procedures and rules for AI agents modifying the Nikat codebase.

## 1. Information Gathering (Read First)
* **Mandatory Context:** Before generating code, you must read the relevant architectural, data model, and UI/UX guidelines in this `agent-instructions/` directory.
* **Code Discovery:** Search the existing codebase for reusable components, services, and patterns before writing new ones. Avoid duplicating logic.
* **Artifacts:** Do not edit build artifacts (e.g., files in `dist/`, `build/`, `target/`, `.angular/`). Only modify source files.

## 2. Planning and Execution
* **Explicit Plans:** Always create a numbered execution plan before modifying files.
* **Atomic Changes:** Make focused, incremental changes. If a task requires changes across the frontend, backend, and database, break it down logically.
* **Verification:** After creating, editing, or deleting a file, immediately verify the change was applied correctly and the syntax is valid.
* **Pre-Commit:** Every plan must end with a step to run tests/linting before submitting.

## 3. Coding Standards

### Frontend (Angular)
* **Module Strategy:** Use `NgModule` for feature modules (not Standalone components) for legacy consistency.
* **Styling:** Use Angular Material components (`mat-card`, `mat-button`, etc.) and SCSS for custom styles. Tailwind utility classes are also available for layout helpers.
* **Responsive Design:** Ensure all new UI components are responsive. Test across mobile (`< 768px`) and desktop breakpoints.
* **Accessibility:** Use semantic HTML tags (`<nav>`, `<main>`, `<article>`). Ensure buttons have descriptive text or `aria-labels`.
* **Error Handling:** Implement robust error handling for `Observable` streams and API calls (use `catchError`, `MatSnackBar` for user feedback).

### Backend (Java / Spring Boot)
* **Java Version:** Java 21. Use modern Java features where appropriate.
* **Layer Pattern:** Controller → Service → Repository. Use DTOs for request/response, never expose entities directly.
* **Testing:** Write JUnit 5 tests with Mockito for all new service and controller logic. Maintain JaCoCo coverage.
* **Security:** New endpoints must be properly configured in the Spring Security filter chain.

## 4. Documentation Maintenance
* If your task involves creating a new core entity, you MUST update `data-models.md`.
* If you introduce a new major architectural pattern or library, you MUST update `tech-stack-and-architecture.md`.
* If you change UI component patterns, update `ui-ux-guidelines.md`.

## 5. Common Commands
* **Run Frontend:** `cd frontend && npm start` (dev server on `http://localhost:4200`)
* **Run Backend:** `cd backend && ./mvnw spring-boot:run` (API on `http://localhost:8080`)
* **Test Frontend:** `cd frontend && npm run test`
* **Test Backend:** `cd backend && ./mvnw clean test`
* **Build Frontend:** `cd frontend && npm run build`
* **Build Backend:** `cd backend && ./mvnw clean package -DskipTests`

## 6. Handling Ambiguity
* If a user request contradicts the established guidelines in this folder, prioritize the user's explicit request but note the deviation in your response.
* If a request is fundamentally unclear or requires a major architectural decision not covered in these docs, clarify with the user before proceeding.
