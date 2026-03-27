# Nikat — Agentic Workflow Instructions

## 1. Overview
This document serves as the foundational, root-level instruction file for AI agents interacting with the **Nikat** platform — a localized services and shops discovery platform connecting neighborhoods with premium services, shops, and technicians.

This repository adheres to an **agentic workflow standard**, requiring autonomous agents to safely navigate, comprehend, and iterate on the project without breaking existing architecture.

### Quick Project Facts
| Aspect | Detail |
|--------|--------|
| **Frontend** | Angular 20, Standalone Components, Vanilla CSS (Deep Sea / Glassmorphism), deployed on Vercel |
| **Backend** | Spring Boot 4.0, Java 25, Spring Security 6 (JWT), Spring Data JPA, deployed on Render.com (Docker) |
| **Database** | PostgreSQL (Neon.tech, AWS Singapore), Flyway migrations, JPA `validate` mode |
| **API Pattern** | RESTful JSON over `/api/v1/`, stateless JWT authentication |
| **Roles** | Customer (USER), Shop Owner, Service Provider, Admin |

---

## 2. Navigating the Repository
You **must always** read the `.agent/instructions/` files for domain-specific instructions before attempting to restructure or modify any code:

| File | Purpose |
|------|---------|
| [Tech Stack and Architecture](.agent/instructions/tech-stack-and-architecture.md) | Exact versions, framework choices, deployment targets, layered architecture |
| [Data Models](.agent/instructions/data-models.md) | All 8 JPA entities, their fields, relationships, constraints, and Flyway schema |
| [Core Features and Logic](.agent/instructions/core-features-and-logic.md) | User flows, authentication, role-based access, admin verification pipeline |
| [UI and UX Guidelines](.agent/instructions/ui-ux-guidelines.md) | Design system, CSS variables, theme system, component standards |
| [Agent Workflow Rules](.agent/instructions/agent-workflow-rules.md) | Safety constraints, naming conventions, regression avoidance, communication protocol |

---

## 3. How Agents Should Understand the Project

### Before Any Modification
1. **Read the instruction files** listed above relevant to your task.
2. **Understand the role architecture**: Features span across 4 roles (Admin, User, Shop Owner, Service Provider) — consult `core-features-and-logic.md`.
3. **Check existing code first**: Before creating any new component or endpoint, verify one doesn't already exist.

### Key Architectural Principles
- **Standalone Components**: Angular uses standalone components (`loadComponent()` lazy loading). There is no `AppModule`.
- **CSS Custom Properties**: All theming is done via CSS variables in `styles.css`. Components must use `var(--variable-name)` for colors, never hardcode.
- **Layered Backend**: Controller → Service → Repository → Entity. Business logic lives **only** in the Service layer.
- **MapStruct + Lombok**: DTOs are mapped via MapStruct. Entities use Lombok for boilerplate generation.

---

## 4. Repository Structure

```
Nikat/
├── AGENTS.md                    # This file — root agent instructions
├── README.md                    # Full project documentation
├── .agent/instructions/         # Detailed agent guidance files (5 docs)
├── frontend/                    # Angular 20 SPA
│   ├── src/app/
│   │   ├── core/                # Services, guards, interceptors, theme
│   │   └── features/            # 11 feature modules (lazy-loaded)
│   │       ├── home/            # Landing page
│   │       ├── auth/            # Login, Register, OTP, Reset, Admin Login
│   │       ├── shops/           # Browse & detail
│   │       ├── services/        # Listing & booking
│   │       ├── search/          # Search results
│   │       ├── reviews/         # Public reviews
│   │       ├── community/       # Community board
│   │       ├── checkout/        # Cart → Shipping → Payment
│   │       ├── dashboard/       # User, Shop Owner, Service Provider dashboards
│   │       ├── admin/           # Admin panel (layout + 12 sub-pages)
│   │       └── help/            # FAQ / Help
│   └── vercel.json              # Vercel SPA config
├── backend/                     # Spring Boot 3.4 API
│   ├── src/main/java/com/nikat/api/
│   │   ├── config/              # SecurityConfig, CORS, OpenAPI, Exception Handler
│   │   ├── controller/          # 7 REST controllers
│   │   ├── domain/              # 8 JPA entities
│   │   ├── dto/                 # 9 DTOs
│   │   ├── repository/          # 8 JPA repositories
│   │   ├── security/            # JWT filter, utils, UserDetails
│   │   └── service/             # 8 service classes (business logic)
│   ├── src/main/resources/
│   │   ├── application.properties
│   │   └── db/migration/V1__Initial_Schema.sql
│   ├── Dockerfile               # Multi-stage Maven + JRE Alpine
│   └── pom.xml
└── docs/
```

---

## 5. Single Source of Truth
- The backend (`backend/`) database schema, JPA entities, and Service layer are the canonical **Single Source of Truth** for all entities, constraints, relationships, validations, and security boundaries.
- The frontend (`frontend/`) is purely a display and action-dispatching layer. Do not duplicate backend business logic validations on the frontend (beyond basic form validation for UX).
- Frontend TypeScript interfaces (`UserDto`, `ShopDto`, `ServiceDto`, `CategoryDto`) in `core/auth.service.ts` and `core/api.service.ts` must exactly mirror the backend DTOs.

---

## 6. Working Safely & Preserving Architecture

### Strict Rules
- **No Rogue Libraries**: Do not install unverified npm packages or Maven dependencies without explicit user permission.
- **Strict Separation**: Frontend code stays in `frontend/`, backend in `backend/`. Do not mix scripts or configs across this boundary.
- **Rule Verification**: Before executing modifications, cross-reference your plan against constraints in `agent-workflow-rules.md`.
- **Backwards Compatibility**: When adding data models or API endpoints, ensure existing endpoints used by other features remain unaffected.
- **Flyway Migrations**: Never modify `V1__Initial_Schema.sql`. Create new versioned migration files (`V2__`, `V3__`, etc.) for schema changes.
- **Theme Compliance**: All new UI must use global CSS variables from `styles.css`. Never hardcode colors or duplicate theme overrides in component styles.

### Before You Code
1. Read relevant `.agent/instructions/` files
2. Search the codebase for existing implementations
3. Verify API endpoints exist before creating new ones
4. Check `frontend/src/app/core/` for existing services before duplicating logic

---

## 7. Quick Reference

### Frontend Commands
```bash
cd frontend
npm install          # Install dependencies
npm start            # Dev server at http://localhost:4200
npm run build        # Production build
npm test             # Run Jasmine/Karma tests
```

### Backend Commands
```bash
cd backend
mvn clean install -DskipTests   # Build
mvn spring-boot:run             # Dev server at http://localhost:8080
```

### API Endpoints
| Prefix | Auth | Purpose |
|--------|------|---------|
| `/api/v1/auth/**` | Public | Register, Login |
| `/api/v1/public/**` | Public | Browse shops, services, categories, reviews, community |
| `/api/v1/**` (other) | JWT | Protected operations |
| `/swagger-ui.html` | Public | Interactive API docs |

Refer to `README.md` for full project documentation, deployment guides, and environment variable reference.
