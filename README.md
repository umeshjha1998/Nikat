# Nikat Platform

## 1. Project Overview
Nikat is a localized services and shops discovery platform. It helps users find nearby businesses, technicians, and products through a geography-aware context.

## 2. Technology Stack (Free-Tier Optimized)
- **Frontend**: Angular 18+ (Standalone) [Vercel]
- **Backend**: Spring Boot 3.x (Java 21) [Render.com]
- **Database**: PostgreSQL (SSL) [Neon]
- **Security**: JWT & Spring Security 6
- **Email**: Resend API

## 3. Project Structure
- `frontend/`: The Angular application.
- `backend/`: The Spring Boot REST API.
- `docs/agents/`: Specialized documentation for AI agents.
- `AGENTS.md`: High-level entry point for agent instructions.

## 4. Documentation & Guidelines
For detailed development guidelines, architecture rules, and documentation, refer to:
- **[Main Agent Hub](file:///e:/My%20folder/Education/Git/Nikat/docs/agents/project-knowledge-base.md)**
- **[Frontend Guidelines](file:///e:/My%20folder/Education/Git/Nikat/docs/agents/frontend-guidelines.md)**
- **[Backend Guidelines](file:///e:/My%20folder/Education/Git/Nikat/docs/agents/backend-guidelines.md)**

## 5. Deployment Instructions

### Local Development
- **Frontend**: `cd frontend && npm install && npx ng serve`
- **Backend**: `cd backend && mvn spring-boot:run`

### Production Setup
Follow the production deployment steps in [Workflow and Deployment](file:///e:/My%20folder/Education/Git/Nikat/docs/agents/workflow-and-deployment.md).

---
*Nikat - Connecting Neighborhoods with Premium Service.*