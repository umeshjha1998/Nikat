# Nikat Platform

Nikat is a comprehensive local services and shops discovery platform connecting users with nearby shops, service providers, technicians, and community activities. It is built as a split monolith supporting separate deployments for frontend and backend.

## 🚀 Technology Stack

- **Frontend**: Angular 18, Angular Material, SCSS
- **Backend**: Spring Boot 3.x, Java 21, Spring Security (JWT), Spring Data JPA
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
- **Backend Layers**: Controller, Service, Repository, DTO/Mapper, Entity, Config.
- **Frontend Modules**: Organized by domain (`auth`, `home`, `search`, `listings`, `community`, `admin`, `shared`, `core`).
- **Data Source**: Admin updates reflect on canonical persisted records to ensure a single source of truth across the platform.
