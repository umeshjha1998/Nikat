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
- **Admin Dashboard**: Comprehensive dashboard for overall management (users, shops, services, approvals, ads) ensuring immediately-synced single sources of truth.
- **Community Hub**: Localities-based features for games, pools, reviews, group shopping, and local discussions.
- **Images & Media**: Automated normalization of uploaded media files to required dimensions and sizes.
- **Theming & Localization**: Full Dark Mode support and i18n website translation toggle.

## 5. Deployment Flow
- **Frontend** pushes to Vercel native integration.
- **Backend** pushes to Render.com native integration.
- CI/CD relies on zero-config GitHub integrations without relying on explicit GitHub Action workflow files.

## 6. Setup and Environment Variables
- Ensure configuration is split between development and production for backend. Secrets like JWT secrets, Resend API key, and Neon DB paths should reside in platform environmental variables.