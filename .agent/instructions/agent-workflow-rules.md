# Agent Workflow Rules

## 1. Operating Principles
When working on the Nikat Platform, autonomous agents must adhere strictly to the following constraints to ensure architectural stability. These rules apply universally across code generation, refactoring, debugging, and project structuring.

---

## 2. Reading Before Modifying

Before proposing or implementing any change:

### Step 1: Read Relevant Instruction Files
Check the `.agent/instructions/` documents relevant to your task:
- `tech-stack-and-architecture.md` — for framework, version, and deployment questions
- `data-models.md` — for entity structure, relationships, and schema changes
- `core-features-and-logic.md` — for feature flows, auth, roles, and business logic
- `ui-ux-guidelines.md` — for styling, theme system, and component design rules

### Step 2: Understand Context
- Read the surrounding code context. If editing a component, understand how its parent and children interact.
- If modifying a service, check which components inject and consume it.

### Step 3: Check for Existing Implementations
| Check For | Where To Look |
|-----------|--------------|
| Existing API endpoint | `backend/src/main/java/com/nikat/api/controller/` |
| Existing Angular service | `frontend/src/app/core/` |
| Existing shared component | `frontend/src/app/features/` subdirectories |
| Existing CSS utility | `frontend/src/styles.css` and `frontend/src/app/features/admin/admin-shared.css` |
| Existing DTO | `backend/src/main/java/com/nikat/api/dto/` |
| Existing entity | `backend/src/main/java/com/nikat/api/domain/` |

### Step 4: Verify Route Existence
All routes are defined in `frontend/src/app/app.routes.ts`. Always check here before creating new pages to avoid duplicate routes.

---

## 3. Modifying the Single Source of Truth

### Backend Entity Changes
If a new field or entity is needed:
1. **Create a new Flyway migration** (e.g., `V2__Add_field.sql`) — never modify `V1__Initial_Schema.sql`
2. **Update the JPA Entity** in `backend/src/main/java/com/nikat/api/domain/`
3. **Update the DTO** in `backend/src/main/java/com/nikat/api/dto/`
4. **Update the Service layer** if business logic is affected
5. **Update the frontend interface** in `core/auth.service.ts` or `core/api.service.ts`

### Frontend DTO/Interface Changes
- Do NOT create frontend interfaces that differ structurally from the backend DTOs.
- If a field needs to exist on the frontend, it must first exist in the backend Entity → DTO pipeline.

### Security & Authorization
- Do NOT implement security limits purely on the frontend (e.g., hiding a button via `*ngIf` without backend enforcement).
- Security must be enforced via Spring Security and backend Service layer validations.
- The frontend consumes error codes or permission flags from the API.

---

## 4. Writing & Structuring Code

### Dependency Rules
| Action | Rule |
|--------|------|
| `npm install <package>` | **Ask the user first** — no unauthorized npm packages |
| Maven `<dependency>` | **Ask the user first** — no unauthorized Java dependencies |
| Using existing dep differently | Allowed without asking |

### Naming Conventions

#### Frontend (Angular/TypeScript)
| Type | Convention | Example |
|------|-----------|---------|
| Component | `kebab-case.component.ts` | `shop-detail.component.ts` |
| Service | `kebab-case.service.ts` | `auth.service.ts` |
| Guard | `kebab-case.guard.ts` | `role.guard.ts` |
| Interceptor | `kebab-case.interceptor.ts` | `api.interceptor.ts` |
| Interface/Model | `PascalCase` | `UserDto`, `ShopDto` |
| CSS variables | `--kebab-case` | `--surface-container` |

#### Backend (Java/Spring)
| Type | Convention | Example |
|------|-----------|---------|
| Class | `PascalCase` | `ShopService`, `AuthController` |
| Field | `camelCase` | `firstName`, `isShopOwner` |
| DB Column | `snake_case` | `first_name`, `is_shop_owner` |
| Package | `lowercase` | `com.nikat.api.service` |
| REST endpoint | `/api/v1/kebab-or-plural` | `/api/v1/public/shops` |
| Entity | Singular PascalCase | `User`, `Shop`, `Service` |
| Table | Plural snake_case | `users`, `shops`, `services` |

### Code Organization
- **Backend**: Organized by layer — `controller/`, `service/`, `repository/`, `domain/`, `dto/`, `security/`, `config/`
- **Frontend**: Organized by feature — each feature in `features/<feature-name>/` as standalone components
- **Core Frontend**: Singleton services, guards, interceptors in `core/`
- **Admin**: All admin sub-pages under `features/admin/`, sharing `admin-shared.css`

---

## 5. Avoiding Regressions

### Endpoint Safety
- When renaming or deleting a backend controller endpoint, **globally search** the `frontend/` codebase (`api.service.ts`, component files) to ensure no dependent components break.
- Use your IDE or `grep` to find all references before making changes.

### Data Safety
- Never write destructive queries or `DELETE` endpoint mappings unless explicitly required.
- Prefer soft-deletes for critical entities:
  - Users: `status = 'INACTIVE'` instead of deletion
  - Shops: `status = 'SUSPENDED'` instead of deletion
  - Products: `isAvailable = false` instead of deletion
  - Reviews: `status = 'HIDDEN'` instead of deletion

### Theme Safety
- Never hardcode color values in component CSS. Always use CSS variables.
- Test new components in **both dark and light modes**.
- Don't add `:root` or `.light-theme` overrides in individual component CSS — all theme variables are centralized in `styles.css`.

### Route Safety
- All routes are defined in `app.routes.ts`. Don't create route definitions elsewhere.
- Check guard requirements before adding new protected routes.
- Ensure wildcard route (`**`) stays at the bottom of the route list.

### Flyway Migration Safety
- Migrations are immutable once deployed. Never modify existing migration files.
- New schema changes require new versioned files: `V2__`, `V3__`, etc.
- JPA `validate` mode will cause startup failure if entities don't match the schema.

---

## 6. Testing Expectations

### Backend
- Unit tests with Spring Boot Test
- Integration tests with Testcontainers (PostgreSQL)
- Security tests with Spring Security Test
- If modifying business logic, update or verify existing tests

### Frontend
- Jasmine + Karma test framework
- Test spec files co-located with components (`*.spec.ts`)
- If breaking test expectations, either fix the test accurately or reconsider the logic change

---

## 7. Communication Protocol

1. **Ambiguity**: If a task is ambiguous or risks breaking established patterns, **pause and ask the user** for clarification before proceeding.
2. **Complex Refactors**: After completing a complex change, provide a concise summary:
   - What was changed
   - Which files were modified
   - Which rules/constraints were respected
   - Which dependencies or endpoints were affected
3. **Destructive Operations**: Always warn the user before any operation that deletes data, removes files, or changes security configurations.
4. **Multiple Options**: When multiple valid approaches exist, present them to the user with trade-offs before implementing.

---

## 8. Common Pitfalls to Avoid

| Pitfall | Correct Approach |
|---------|-----------------|
| Hardcoding colors in component CSS | Use `var(--variable-name)` from `styles.css` |
| Creating `AppModule` or `NgModule` | Use standalone components with `loadComponent()` |
| Modifying `V1__Initial_Schema.sql` | Create new `V2__` migration file |
| Storing business logic in frontend | Implement in backend Service layer |
| Creating duplicate services | Check `core/` directory first |
| Frontend-only authorization | Always enforce via Spring Security backend |
| Installing packages without asking | Ask user permission first |
| Using `any` type in TypeScript | Define proper interfaces matching backend DTOs |
| Ignoring mobile responsiveness | Test all viewports |
| Skipping both theme modes | Verify dark and light theme |
