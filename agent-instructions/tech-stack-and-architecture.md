# Tech Stack & Architecture

This document outlines the technical stack and system architecture for the Nikat project.

## Core Stack

### Frontend (Angular 18)
* **Framework:** Angular 18 with NgModule-based component strategy (not Standalone).
* **UI Library:** Angular Material (prebuilt `indigo-pink.css` theme).
* **Styling:** SCSS with global dark mode toggle (`.dark-theme`). Tailwind CSS utilities are also available via `@tailwind` directives in `styles.scss`.
* **Typography:** Google Fonts - Roboto (default), Helvetica Neue (fallback).
* **Icons:** Angular Material icons (`mat-icon`).
* **State & APIs:** Shared logic in `core/services/` (`ApiService`, `AuthService`). Auth token stored in `localStorage`.
* **Routing:** Lazy-loaded feature modules via `app-routing.module.ts`.
* **Deployment:** Vercel (SPA routing via `vercel.json`).

### Backend (Spring Boot 3)
* **Framework:** Spring Boot 3.x with Java 21.
* **Security:** Spring Security 6 with JWT filter chain. `ApplicationConfig` provides `DaoAuthenticationProvider` with `BCryptPasswordEncoder`.
* **Database:** PostgreSQL (Neon Database) via Spring Data JPA with Hibernate.
* **Entity Inheritance:** `Listing` -> `Shop` / `Service` using `InheritanceType.JOINED`.
* **Email:** Resend API for OTP & verification flows.
* **Testing:** JUnit 5 + Mockito. JaCoCo for code coverage.
* **Deployment:** Render.com via `Dockerfile` and `render.yaml`.

## Architecture Overview

The application is a **split monolith** with separate frontend and backend deployments, serving three distinct roles:
1. **Consumers (Users):** Browsing, searching, booking, and purchasing.
2. **Business Owners (Providers):** Managing shop products and time-based services.
3. **Administrators:** Platform oversight, moderation, and analytics.

### Backend Layers
* **Controller** → **Service** → **Repository** → **Entity**
* **DTOs & Mappers** for request/response transformation.
* **Config** package for security, CORS, and application settings.
* **Security** package for JWT filter and authentication.

### Frontend Modules
Feature modules organized by domain and lazy-loaded:
* `auth/` - Login, registration, OTP verification, password management.
* `home/` - Homepage, browsing, discovery.
* `search/` - Category search, search results.
* `listings/` - Shop and service detail views.
* `community/` - Community Hub, Nikat Horizon, reviews.
* `admin/` - Admin portal and management screens.
* `user-dashboard/` - User, shop owner, and service provider dashboards.
* `shared/` - Reusable components (header, footer, cards, etc.).
* `core/` - Singleton services (API, Auth, Guards), interceptors.

## Directory Structure

```
Nikat/
├── frontend/               # Angular 18 SPA
│   ├── src/app/
│   │   ├── admin/          # Admin feature module
│   │   ├── auth/           # Auth feature module
│   │   ├── community/      # Community feature module
│   │   ├── core/           # Core services & guards
│   │   ├── home/           # Home feature module
│   │   ├── listings/       # Listings feature module
│   │   ├── search/         # Search feature module
│   │   ├── shared/         # Shared components & pipes
│   │   └── user-dashboard/ # User dashboard module
│   ├── vercel.json         # Vercel SPA routing config
│   └── .gitignore
├── backend/                # Spring Boot 3 API
│   ├── src/main/java/com/nikat/nikat_backend/
│   │   ├── config/         # App & security configuration
│   │   ├── controllers/    # REST controllers
│   │   ├── dtos/           # Data transfer objects
│   │   ├── entities/       # JPA entities
│   │   ├── repositories/   # Spring Data repositories
│   │   ├── security/       # JWT filter & auth
│   │   └── services/       # Business logic
│   ├── Dockerfile          # Production Docker build
│   └── .gitignore
├── render.yaml             # Render.com deployment blueprint
├── agent-instructions/     # AI agent documentation
├── AGENTS.md               # AI agent root instructions
└── README.md               # Project overview
```
