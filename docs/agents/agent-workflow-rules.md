# Agent Workflow Rules

## Repository Safety
- Code belonging strictly to the Angular UI must live in `/frontend/`.
- Code belonging strictly to the Spring Boot REST API must live in `/backend/`.
- Never execute irreversible destructive operations to production configurations without explicit confirmation.
- Adhere to the Single Source of Truth architecture when addressing database or state mapping.

## Standard Flows
If dealing with authentication logic, route it through `/api/v1/auth`. If handling product data, isolate the code within `listings` or `products` submodules in Angular, and parallel domains in Spring services.
Wait for manual test validations whenever interacting with core Auth components.
