# Nikat Backend Guidelines

## Tech Stack
- **Framework**: Spring Boot 3.x (Java 21).
- **Security**: Spring Security 6 + JWT.
- **Database**: PostgreSQL (Neon) with Flyway migrations.
- **Mapping**: MapStruct for Entity-to-DTO conversion.

## Architecture Guidelines
- **Controller-Service-Repository**: 
  - Controllers: Handle request/response, validation, and status codes.
  - Services: Encapsulate business logic and entity orchestration.
  - Repositories: Data access only.
- **Exception Handling**: Centralized via `@ControllerAdvice`.
- **Auth Flow**: Route all authentication through `/api/v1/auth`.

## Database Rules
- **No ddl-auto**: Never use `create` or `update` for `hibernate.ddl-auto`. Use Flyway migrations for all schema changes.
- **SSL Required**: Production connections MUST use `sslmode=require`.

## Deployment Logic
- **Render.com**: Backend builds from the `backend/` directory using Docker or Native Java.
- **Secrets Management**: Inject all tokens, keys, and DB credentials via environment variables. Never hardcode.
