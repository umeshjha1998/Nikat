# Nikat Project: Knowledge Base Hub

Welcome to the Nikat Project Knowledge Base. This repository contains the documentation for maintaining the Nikat platform's architecture, design system, and business logic.

## 1. Core Guidelines (Modular)
To maintain project purity and ensure high-quality contributions, please follow these specialized guideline modules:

- **[Frontend Guidelines](file:///e:/My%20folder/Education/Git/Nikat/docs/agents/frontend-guidelines.md)**: Angular 18+, Design System (HSL/Glassmorphism), UI/UX rules.
- **[Backend Guidelines](file:///e:/My%20folder/Education/Git/Nikat/docs/agents/backend-guidelines.md)**: Spring Boot 3.x, Security (JWT/Resend), Flyway migrations.
- **[Database and Logic Rules](file:///e:/My%20folder/Education/Git/Nikat/docs/agents/database-and-logic-rules.md)**: Single Source of Truth, Entity structures, Status enums.
- **[Workflow and Deployment](file:///e:/My%20folder/Education/Git/Nikat/docs/agents/workflow-and-deployment.md)**: Repository safety, tool usage, Free-tier infrastructure (Vercel/Render/Neon).

## 2. Infrastructure Summary (Free Tier Stack)
The Nikat platform is designed to operate entirely within free-tier environments:
- **Frontend**: Vercel (Hobby Tier).
- **Backend**: Render.com (Free Web Service).
- **Database**: Neon (Postgres Free Tier).

## 3. Architecture Purity: Single Source of Truth
The most critical rule for Nikat is the **Single Source of Truth**. All system updates to entities must modify the original canonical data record directly. Avoid mapping to duplicate profile copies. UI components must always pull from the latest canonical source.

## 4. Feature Roadmap & Core Modules
1. **Search & Discovery**: Location-aware search for shops and services.
2. **Community Hub**: Locality-centric peer interactions, marketplace, and pools.
3. **Dashboards**: Specialized portals for Admins, Shop Owners, and Service Providers.
4. **Checkout & Booking**: Seamless multi-step cart and appointment flows.
