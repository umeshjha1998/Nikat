# Tech Stack & Architecture

## 1. Overview
Nikat follows a strictly decoupled client-server architecture consisting of a standalone Angular 18+ frontend and a Spring Boot 3.x backend. The two systems communicate exclusively via JSON over REST.

## 2. Infrastructure
- **Frontend Hosting**: Vercel (Static/SPA build)
- **Backend Hosting**: Render.com (Docker container)
- **Database**: Neon.tech (PostgreSQL Serverless)

## 3. Frontend Architecture (`frontend/`)
- **Technology**: Angular 18+
- **Paradigm**: Standalone Components (no `AppModule` overhead).
- **Styling**: TailwindCSS or Vanilla CSS aligned with the "Deep Sea / Glassmorphism" Stitch Design System.
- **State Management**: Angular Signals & RxJS for reactive data flow.
- **Routing**: Lazy-loaded feature modules.
- **Interceptors**: HTTP interceptors attach JWT tokens to API requests.

## 4. Backend Architecture (`backend/`)
- **Technology**: Spring Boot 3.x (Java 21)
- **Security**: Spring Security 6 with stateless JWT authentication.
- **Data Access**: Spring Data JPA & Hibernate connected to PostgreSQL.
- **Layers**:
  1. **Controllers**: REST endpoint definitions and request mapping.
  2. **Services**: Core business logic and validations. This is the **Single Source of Truth**.
  3. **Repositories**: Database interactions.
  4. **Models/Entities**: JPA data representations.
- **Mail Service**: Integrates with the Resend API to send transactional emails (e.g., appointment confirmations).

## 5. Architectural Non-Negotiables
- **No Direct DB Access from Frontend**: All database operations must go securely through the Spring Boot API.
- **Stateless Authentication**: The backend does NOT store session state. Authentication relies completely on validating the JWT signature.
- **Data Integrity**: Validations defined on the frontend are strictly for user experience (UX) to prevent early round-trips. The true validation that secures the data must happen at the `backend/` Service layer.
