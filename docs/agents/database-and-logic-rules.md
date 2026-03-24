# Nikat Database and Logic Rules

## Core Pillars
### Single Source of Truth (SSOT)
- All admin updates to entities (users, shops, services) must modify the original canonical data record.
- Avoid mapping to duplicate profile copies.
- If a user's address is updated by an admin, the base `User` row must be updated directly.

## Domain Entities
1. **User**: Common fields (name, phone, email, address, coordinates). Can have roles: `USER`, `SHOP_OWNER`, `SERVICE_PROVIDER`, `ADMIN`.
2. **Shop**: Business listing with verified coordinates. Holds products and rentals.
3. **ServiceProvider**: Technician or service entity (electrician, barber) linked to hours and charges.

## Status Enums
All core entities must utilize a status enum for lifecycle management:
- `ACTIVE`: Fully functional and visible.
- `INACTIVE`: Hidden from discovery.
- `PENDING_VERIFICATION`: Initial state after registration.
- `BLOCKED`: Restricted by Administrator.

## Business Logic Patterns
- **Location-Aware Context**: Registrations should attempt to fetch GPS coordinates to populate base location initially.
- **Validation**: Strict server-side validation for all state transitions.
- **Search Logic**: Global search must aggregate across shops, services, and products.
