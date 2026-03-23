# Nikat Website

## 1. Project Overview
Nikat is a local services and shops discovery platform designed to help users find nearby shops, service providers, technicians, products, and community activities through a localized, searchable, and role-based application.

## 2. Technology Stack
- **Frontend**: Angular 18 deployed on Vercel
- **Backend**: Spring Boot 3.x (Java 21) deployed on Render.com
- **Database**: Neon PostgreSQL (SSL required, pooled connection)
- **Email Service**: Resend 
- **Security**: Spring Security 6 with JWT
- **Migration & API Docs**: Flyway, SpringDoc OpenAPI

## 3. Project Structure
- `frontend/`: Contains the complete Angular 18 application.
- `backend/`: Contains the Spring Boot 3 application with Dockerfile.
- `docs/agents/`: Specific agent-readable instructions for maintaining architecture and workflows.

## 4. Key Features
- **Diverse Registration Flows**: Users can register as basic users, shop owners, service providers, or dual (shop & service).
- **Location-Aware Context**: New user registrations fetch GPS coordinates initially, populating base location before manual entry.
- **Admin Dashboard**: Comprehensive dashboard for overall management with a fully functional navigation panel (Dashboard, Users, Shops, Services, Categories, Reviews, Reports, Settings) ensuring immediately-synced single sources of truth.
- **Community Hub**: Localities-based features for games, pools, reviews, group shopping, and local discussions.
- **Images & Media**: Automated normalization of uploaded media files to required dimensions and sizes.
- **Theming & Localization**: Full Dark Mode support and i18n website translation toggle.
- **Interactive Maps**: Homepage footer integrates an accurate open-source map plugin for structural location awareness.
- **Certificates**: Dynamic certificates with multi-color grade functionality based on marks obtained and high visibility.

## 5. Deployment Instructions

### Local Environment Setup
**Frontend (Angular 18)**
1. Navigate to the `frontend/` directory.
2. Run `npm install` to install dependencies.
3. Start the local server using `npx ng serve`. The application will be available at `http://localhost:4200`.

**Backend (Spring Boot 3)**
1. Navigate to the `backend/` directory.
2. Ensure you have Java 21 and Maven installed.
3. Configure your local `application-dev.yml` with your local PostgreSQL credentials (or your Neon database connection string).
4. Run the application using `mvn spring-boot:run`. The backend will be available at `http://localhost:8080`.

### Production Deployment (Free Tier)
We utilize a completely free-tier stack for production deployment.

1. **Database: Neon**
   - Create a free tier Postgres project on [Neon](https://neon.tech/).
   - Obtain the SSL-secured connection string.
   - Configure your backend environment variables (`SPRING_DATASOURCE_URL`, `SPRING_DATASOURCE_USERNAME`, `SPRING_DATASOURCE_PASSWORD`) to point to Neon.

2. **Backend: Render.com**
   - Create a new Web Service on [Render](https://render.com/) linked to your GitHub repository.
   - Set the Root Directory to `backend/`.
   - Use the environment `Docker` (since a Dockerfile is provided) or native `Java`.
   - Add all necessary environment variables (Neon DB credentials, JWT Secret, Resend API key).
   - Render's free tier will automatically build and deploy the Spring Boot application.

3. **Frontend: Vercel**
   - Import your GitHub repository into [Vercel](https://vercel.com/).
   - Set the Framework Preset to `Angular`.
   - Set the Root Directory to `frontend/`.
   - Add the production backend API URL to your environment variables (e.g., `NG_APP_API_URL`) so the frontend communicates securely with the Render instance.

## 6. Setup and Environment Variables
- Ensure configuration is split between development and production for backend. Secrets like JWT secrets, Resend API key, and Neon DB paths should reside in platform environmental variables.