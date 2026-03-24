# Agent Workflow Rules

## 1. Operating Rules for Agents
When working on the Nikat Platform, autonomous systems must adhere strictly to the following constraints to ensure architectural stability. This applies universally across code generation, refactoring, and project structuring.

## 2. Reading Before Modifying
Before proposing a change to an existing feature, or creating a new feature:
1. Check the `.md` documents inside `docs/agents/` for domain boundaries, naming conventions, and UI styles.
2. Read the surrounding context. If editing a component, see how the parent interacts with it.
3. Verify if an existing API endpoint already fulfills the requested feature before creating a new one in the Spring Boot backend.
4. Verify whether a UI component already exists in `frontend/src/app/shared/` or `frontend/src/app/components/` before creating a duplicate.

## 3. Modifying the Single Source of Truth
- **Database & Domain Entities**: Do NOT create a frontend DTO / Model that differs structurally from what the backend controller `return`s. If a field is needed, add it to the backend `Entity`, update the backend `DTO`, and then reflect that change strictly in the frontend interface.
- **Validations**: Do NOT implement "security" limits entirely on the frontend (e.g., hiding a button via `*ngIf`). Instead, enforce the logic via Spring Security and simply let the frontend consume error codes or permissions.

## 4. Writing & Structuring Code
- **Dependency Addition**: Stop and ask the human `USER` before running `npm install` or adding a Maven `<dependency>`. Do not install unfamiliar heavy libraries unless explicitly commanded.
- **Naming Conventions**:
  - Components, Services, Models should follow the standard Angular convention (`name.component.ts`, `name.service.ts`).
  - Java Classes should follow standard Java conventions (PascalCase classes, camelCase fields). File paths should reflect package paths exactly.
- **Backend Cleanliness**: Organize files by logical feature/domain rather than grouping *all* services together unless the structure demands it. The default structure handles logic in the Service layer, not the Controller.

## 5. Avoiding Regressions
- **Endpoints**: When renaming or deleting a backend controller endpoint, globally search the `frontend/` codebase to ensure no dependent components are broken.
- **Data Deletion**: Never author destructive queries or endpoint mappings (`DELETE`) unless the scope and requirement demands irreversible deletion. Usually, prefer soft-deletes (`isActive = false`) for critical entities like Users or Shops.
- **Test Integrity**: If existing tests break due to modifying business logic, either adapt the tests accurately or rethink the logic break.

## 6. Communication
- If a task is ambiguous or risks breaking the established design patterns, pause execution and ask the `USER` for clarification.
- Once a complex refactor is completed, provide a concise summary outlining exactly what rules were respected and what dependencies were touched.
