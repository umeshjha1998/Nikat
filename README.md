# Nikat Platform

Nikat is a comprehensive local services and shops discovery platform connecting users with nearby shops, service providers, technicians, and community activities. It is built as a split monolith supporting separate deployments for frontend and backend.

## 🚀 Technology Stack

- **Frontend**: Angular 18, Angular Material, SCSS (with Tailwind CSS utilities)
- **Backend**: Spring Boot 3.x, Java 21, Spring Security 6 (JWT), Spring Data JPA
- **Database**: PostgreSQL (Neon)
- **Email Service**: Resend (OTP & verification flows)
- **Deployment Strategy**:
  - **Frontend** -> Vercel (using `vercel.json` for SPA routing)
  - **Backend** -> Render.com (using `render.yaml` and `Dockerfile`)

---

## 💻 Local Development Setup

### Backend (Spring Boot)
1. Navigate to `/backend`.
2. Configure your environment variables for `DATABASE_URL`, `DATABASE_USERNAME`, `DATABASE_PASSWORD`, `JWT_SECRET`, and `RESEND_API_KEY`. These can be added to `application.yml` or exported via CLI.
3. Run the application using Maven:
   `./mvnw spring-boot:run`
4. The backend API is exposed on `http://localhost:8080/api/v1/`.

### Frontend (Angular)
1. Navigate to `/frontend`.
2. Install dependencies:
   `npm install`
3. Update `src/environments/environment.ts` to point to your local or deployed backend API URL.
4. Start the Angular development server:
   `npm start`
5. The frontend is accessible at `http://localhost:4200`.

---

## 🧪 Testing

- **Backend**: Navigate to `backend/` and run `./mvnw test`. JaCoCo handles code coverage reporting (100% logic coverage goal for core domain services and controllers).
- **Frontend**: Navigate to `frontend/` and run `ng test --no-watch --code-coverage`.

---

## 🚀 Production Deployment

Nikat is structured to be automatically deployed using GitHub integrations on Vercel and Render.

### 1. Database (Neon)
1. Create a Neon PostgreSQL instance.
2. Obtain your pooled connection string and set it in your Render environment variables as `DATABASE_URL`. Ensure SSL is enabled.

### 2. Backend (Render.com)
1. Connect your GitHub repository to your Render account.
2. The repository includes a `render.yaml` Blueprint. Render will automatically detect this file and create a Web Service using the `Dockerfile` located in the `backend/` directory.
3. Add your secrets (`JWT_SECRET`, `DATABASE_URL`, `DATABASE_USERNAME`, `DATABASE_PASSWORD`, `RESEND_API_KEY`) into the Render Dashboard environment variables for the service.
4. The backend will be built and deployed on port `8080`.

### 3. Frontend (Vercel)
1. Connect your GitHub repository to your Vercel account.
2. During the project import, set the **Framework Preset** to `Angular`.
3. Set the **Root Directory** to `frontend/`.
4. Ensure your `apiUrl` in `src/environments/environment.prod.ts` points to the Render.com backend URL (e.g., `https://nikat-backend-xyz.onrender.com/api/v1`).
5. Vercel will automatically build the project (`ng build`) and deploy the `dist/` directory. `vercel.json` is included to handle SPA fallback routing.

---

## 📚 Project Architecture

The architecture maintains a strict separation of concerns:
- **Backend Layers**: Controller → Service → Repository → Entity, with DTOs/Mappers for API boundaries.
- **Frontend Modules**: Organized by domain (`auth`, `home`, `search`, `listings`, `community`, `admin`, `user-dashboard`, `shared`, `core`), all lazy-loaded.
- **Data Source**: Admin updates reflect on canonical persisted records to ensure a single source of truth across the platform.

---

## 👥 User Roles

Nikat serves multiple types of users, providing tailored experiences for each:
1. **Consumers/Users:** Discover local shops, book services, purchase products, participate in community discussions, and manage their local experiences.
2. **Business Owners (Shops & Services):** Manage their digital storefronts, handle bookings, sell products, track analytics, and engage with customers.
3. **Platform Administrators:** Oversee platform operations, manage users and businesses, handle approvals, moderate community content, and view platform-wide analytics.

## ✨ Core Features

### For Users
* **Authentication & Profiles:** Secure login, registration flow with OTP, and personalized user dashboards.
* **Discovery & Search:** Refined category search, browse local shops and services, and detailed search results.
* **Shopping & Booking:**
  * Shop products catalog (e.g., "The Golden Crust")
  * Service booking system with time-based rates (e.g., "The Urban Fade")
  * Comprehensive checkout flow: Shopping cart, shipping address management, and payment finalization.
* **Community & Engagement:**
  * Community Hub with interactive features and discussions
  * "Nikat Horizon" - specialized community feature
  * Review and rating hub for shared experiences
* **Support:** Dedicated Help & Support Center

### For Business Owners
* **Unified Business Dashboard:** Manage both shop products and time-based service offerings from a single interface.
* **Shop Owner Dashboard:** Specific tools for managing physical/digital products and orders.
* **Service Provider Dashboard:** Tools for managing time-based bookings, schedules, and service rates.

### For Administrators
* **Comprehensive Admin Portal:** Secure admin login and dashboard.
* **Platform Management:** Manage users, shops, services, and advertisements.
* **Moderation & Support:** Manage approvals, handle support queries, and moderate the Community Hub.
* **Analytics & Security:** View platform stats, manage global settings, and audit security logs.

---

## 📖 Documentation

For detailed technical specifications, refer to the `agent-instructions/` directory:
* `agent-instructions/tech-stack-and-architecture.md` — Technical stack and system architecture.
* `agent-instructions/data-models.md` — Core database schemas and entities.
* `agent-instructions/core-features-and-logic.md` — Business logic and feature implementation details.
* `agent-instructions/ui-ux-guidelines.md` — Design system, colors, and typography.
* `agent-instructions/agent-workflow-rules.md` — Rules for AI agents operating within the codebase.
