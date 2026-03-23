# Data Models and Domain Rules

## Core Entities
1. **User**: A registered account. Can have normal user rights, act as a `ShopOwner`, `ServiceProvider`, or Admin. Contains common fields (name, phone, email, address, coordinates).
2. **Shop**: Represents a business listing mapped to a verified map location. Multiple products/rentals can be sold here.
3. **ServiceProvider**: A technician or service provider (electrician, barber) linked to operational hours and charges per service.

## Purity Rule
All entities maintain a strict **Single Source of Truth** structure. A user's profile information modified by an admin directly overwrites the base User row. The UI must always pull this latest source without mapping to duplicate profile copies.

## Verification & Status
Entities must possess a status enum (`ACTIVE`, `INACTIVE`, `PENDING_VERIFICATION`, `BLOCKED`). Administrators manage these states inside the Admin Dashboard.
