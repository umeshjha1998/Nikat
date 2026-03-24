# Data Models & Structure

## 1. Relational Database Overview
Nikat utilizes PostgreSQL, managed via Spring Data JPA. The database is hosted on the Neon.tech platform. All relational mapping and foreign key constraints are handled exclusively on the backend via JPA annotations (`@Entity`, `@ManyToOne`, `@OneToMany`).

## 2. Core Entities
The system uses the following primary entities:

### Users (`User`)
- Represents all individuals logging into the system. Needs distinctions via a `ROLE` column or separate associations.
- **Fields**: ID, Name, Email, Password (hashed), Role (USER, SHOP, PROVIDER, ADMIN), CreatedAt, UpdatedAt.

### Shops (`Shop`)
- Represents a registered physical or digital business.
- **Fields**: ID, Owner_ID (FK to User), Name, Description, Location/Address, Ratings, IsApproved (Admin flag), CreatedAt, UpdatedAt.

### Services (`Service`)
- Represents distinct offerings provided by Shops or general Service Providers.
- **Fields**: ID, Provider_ID (FK to User/Shop), Category, Name, Price, EstimatedDuration.

### Appointments (`Appointment`)
- Tracks booking data matching a User with a Service/Shop.
- **Fields**: ID, User_ID (FK), Service_ID (FK), PreferredDate, Status (PENDING, CONFIRMED, COMPLETED, CANCELLED), Notes.

### Reviews & Ratings (`Review`)
- Captures customer feedback.
- **Fields**: ID, User_ID (FK to author), Target_ID (FK to Shop or Provider), Rating (1-5), Comment, CreatedAt.

### Advertisements & Banners (`Advertisement`)
- Content injected into the main feed for visibility.
- **Fields**: ID, Shop_ID, ImageUrl, LinkUrl, StartDate, EndDate, IsActive.

## 3. Data Integrity & Triggers
- **Single Source of Truth**: The schema represented by the JPA configuration and automatic Flyway/Hibernate generation holds the true integrity constraints. The frontend `models/` folder consists of plain TypeScript Interfaces (e.g. `user.model.ts`) which MUST exactly mirror the DTOs exposed by the API.
- **Validation**:
  - Nullability, Length limits, and Cascading Deletions are defined in Java.
  - Foreign keys ensure no orphaned Appointments or Reviews if a User or Shop is deleted.
