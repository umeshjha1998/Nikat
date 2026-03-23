# Tech Stack and Architecture Guidelines

## Architecture Separation
- **Frontend Modularity**: The Angular application inside `frontend/` relies on feature-based domain modeling (home, search, listings, admin). Usage of facade patterns and service-driven HTTP integration is strict. Components should heavily utilize `ChangeDetectionStrategy.OnPush`.
- **Backend Modularity**: The Spring Boot application inside `backend/` follows Controller-Service-Repository architecture. Controllers handle only request entry/response formatting. Services handle business logic.

## Security & Database
- Use MapStruct for Entity-to-DTO conversion.
- Do not use `ddl-auto=create/update` for DB schemas; all DB changes must go through Flyway migrations.
- Implement Centralized Error Handling in Spring via `@ControllerAdvice`.
- All environments dictate HTTPS and JWT token implementations for authentication.
