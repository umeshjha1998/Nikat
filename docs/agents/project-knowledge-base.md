# Nikat Project: Single Source of Truth

## 1. Tech Stack and Architecture Guidelines
- **Frontend Modularity**: The Angular application inside `frontend/` relies on feature-based domain modeling (home, search, listings, admin). Usage of facade patterns and service-driven HTTP integration is strict. Components should heavily utilize `ChangeDetectionStrategy.OnPush`.
- **Backend Modularity**: The Spring Boot application inside `backend/` follows Controller-Service-Repository architecture. Controllers handle only request entry/response formatting. Services handle business logic.
- **Security & Database**:
  - Use MapStruct for Entity-to-DTO conversion.
  - Do not use `ddl-auto=create/update` for DB schemas; all DB changes must go through Flyway migrations.
  - Implement Centralized Error Handling in Spring via `@ControllerAdvice`.
  - All environments dictate HTTPS and JWT token implementations for authentication.

## 2. Data Models and Domain Rules
### Core Entities
1. **User**: A registered account. Can have normal user rights, act as a `ShopOwner`, `ServiceProvider`, or Admin. Contains common fields (name, phone, email, address, coordinates).
2. **Shop**: Represents a business listing mapped to a verified map location. Multiple products/rentals can be sold here.
3. **ServiceProvider**: A technician or service provider (electrician, barber) linked to operational hours and charges per service.

### Purity Rule
All entities maintain a strict **Single Source of Truth** structure. A user's profile information modified by an admin directly overwrites the base User row. The UI must always pull this latest source without mapping to duplicate profile copies.

### Verification & Status
Entities must possess a status enum (`ACTIVE`, `INACTIVE`, `PENDING_VERIFICATION`, `BLOCKED`). Administrators manage these states inside the Admin Dashboard.

## 3. Core Features and Logic
### Search and Discovery
- Global Search Bar accessible from the Homepage grouping all users, services, technicians, shops, and products.
- Incorporates location-based discovery prompting nearest shops and available services based on real-time permissions.

### Authentication
- OTP-based Email verification necessary during signup.
- Admin credentials are hardcoded (`admin`/`admin`).
- Multi-user and multi-device safe session implementations with robust security routing.

### Dashboards
- **Admin**: Review analytics, update user attributes (affecting global scope immediately), manage approvals/advertisements/community posts. Has a real-time event-driven bell icon. Fully functional side navigation panel encompassing Dashboard, Users, Shops, Services, Categories, Reviews, Reports, and Settings.
- **Shop/ServiceProvider/User**: Self-contained hub reflecting their active listings, incoming service requests, submitted reviews, and notifications.

### Community Hub & Additions
- Locality-centric modules containing local peer reviews, games, cab pools, marketplace trading, issue raising, and active rooms.
- **Interactive Maps**: Accurate open-source map plugin integrated into the homepage footer.
- **Certificates**: Restored multi-color grade functionality with high visibility for user certificates.

## 4. UI/UX & Formatting Guidelines
### Core Aesthetics
- Clean, responsive Mobile-First layouts globally.
- Enforce visual hierarchy utilizing Material Icons.
- Always include an intuitive Internationalization (i18n) translation toggle and Dark Mode toggle from the onset.

### Media Processing
- Use automated resizing and normalization workflows for images uploaded across the application (User photos, shop banners, profile images) to preserve optimization and constraints (1MB for user avatars).

### Experience Enhancements
- Confirmation dialogs for destructive actions.
- Real-time notification validations.
- Explicit visual cues (loading states, success banners, readable fonts) guiding users clearly.
- Footer copyright displays must dynamically fetch and display the current ongoing year.

## 5. Agent Workflow Rules
### Repository Safety
- Code belonging strictly to the Angular UI must live in `/frontend/`.
- Code belonging strictly to the Spring Boot REST API must live in `/backend/`.
- Never execute irreversible destructive operations to production configurations without explicit confirmation.
- Adhere to the Single Source of Truth architecture when addressing database or state mapping.

### Standard Flows
If dealing with authentication logic, route it through `/api/v1/auth`. If handling product data, isolate the code within `listings` or `products` submodules in Angular, and parallel domains in Spring services.
Wait for manual test validations whenever interacting with core Auth components.

## 6. Deployment & Infrastructure Guidelines

### Local Development
- **Frontend (`frontend/`)**: Standard Angular CLI commands (`npx ng serve`).
- **Backend (`backend/`)**: Spring Boot Maven plugin (`mvn spring-boot:run`). Ensure `application-dev.yml` is configured for local testing.

### Production Deployment (Free Tier Stack)
Agents must ensure that configurations and architectures remain compatible with the following free-tier constraints and platforms:
1. **Database**: Hosted on **Neon** PostgreSQL (Free Tier).
   - Utilize standard pooled connections.
   - SSL is required for remote database access; connections must configure `sslmode=require`.
2. **Backend**: Deployed on **Render.com** (Free Web Service tier).
   - The root directory for the build context is `backend/`.
   - Strict separation of secrets: Environment variables (JWT secrets, Resend API key, DB secrets) must NOT be hardcoded.
3. **Frontend**: Deployed on **Vercel** (Free Hobby tier).
   - Ensure environment variables dynamically point to the Render backend API URL.
   - Vercel's zero-config GitHub integration directly builds from the `/frontend` directory.
