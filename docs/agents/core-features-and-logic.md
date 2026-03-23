# Core Features and Logic

## Search and Discovery
- Global Search Bar accessible from the Homepage grouping all users, services, technicians, shops, and products.
- Incorporates location-based discovery prompting nearest shops and available services based on real-time permissions.

## Authentication
- OTP-based Email verification necessary during signup.
- Admin credentials are hardcoded (`admin`/`admin`).
- Multi-user and multi-device safe session implementations with robust security routing.

## Dashboards
- **Admin**: Review analytics, update user attributes (affecting global scope immediately), manage approvals/advertisements/community posts. Has a real-time event-driven bell icon.
- **Shop/ServiceProvider/User**: Self-contained hub reflecting their active listings, incoming service requests, submitted reviews, and notifications.

## Community Hub
- Locality-centric modules containing local peer reviews, games, cab pools, marketplace trading, issue raising, and active rooms.
