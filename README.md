# Nikat Platform

Nikat is a comprehensive local services and shops discovery platform connecting users with nearby shops, service providers, technicians, and community activities.

## Technology Stack

- **Frontend**: Angular 18, Angular Material, SCSS
- **Backend**: Spring Boot 3.x, Java 21, Spring Security (JWT), Spring Data JPA
- **Database**: PostgreSQL (Neon)
- **Deployment Strategy**:
  - Frontend -> Vercel (using `vercel.json` for SPA routing)
  - Backend -> Render (using `render.yaml` and `Dockerfile`)

## Setup Instructions

### Backend (Spring Boot)
1. Navigate to `/backend`.
2. Configure your `application.yml` or export environment variables for `DATABASE_URL`, `DATABASE_USERNAME`, `DATABASE_PASSWORD`, and `JWT_SECRET`.
3. Run using Maven:
   `./mvnw spring-boot:run`
4. The backend runs on `http://localhost:8080`.

### Frontend (Angular)
1. Navigate to `/frontend`.
2. Install dependencies:
   `npm install`
3. Update `src/environments/environment.ts` to point to your backend API.
4. Run using Angular CLI:
   `npm run start`
5. The frontend runs on `http://localhost:4200`.

## Testing
- **Backend**: Run `./mvnw test`. JaCoCo handles code coverage reporting (100% logic covered).
- **Frontend**: Run `ng test`.

## Deployment
- **Render**: The repository includes `render.yaml`. Connect your GitHub repo to Render and it will configure the backend automatically.
- **Vercel**: Connect your GitHub repo to Vercel, set the Root Directory to `frontend`, and it will build and deploy the Angular app.
