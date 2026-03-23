# Tech Stack & Architecture

This document outlines the technical stack and system architecture for the Nikat project.

## Core Stack
Based on the existing codebase artifacts (like `code.html` in the mockups), the frontend utilizes:
* **HTML/CSS Framework:** Tailwind CSS (via CDN in mockups, likely configured via npm/postcss in production).
* **UI Plugins:** Tailwind CSS `forms` and `container-queries` plugins.
* **Typography:** Google Fonts ("Plus Jakarta Sans" for headlines, "Manrope" for body).
* **Icons:** Google Material Symbols Outlined.

*(Note: The full backend stack, database, and frontend framework (e.g., React, Next.js, Vue) should be documented here once the project transitions from HTML mockups to a functional web framework. Currently, the source exists as static HTML files representing different application states).*

## Architecture Overview
The application is designed around a multi-tenant marketplace model serving three distinct roles:
1. **Consumers (Users):** Browsing, searching, booking, and purchasing.
2. **Business Owners (Providers):** Managing shop products and time-based services.
3. **Administrators:** Platform oversight, moderation, and analytics.

### Conceptual Modules
* **Authentication Module:** Handles User, Business, and Admin login, registration, and OTP verification.
* **Discovery Module:** Search engine, category browsing, and recommendation system ("Near You").
* **Commerce Module:** Handles shopping carts, checkout flow, shipping, and payment processing.
* **Booking Module:** Handles time-based service scheduling and rate calculation.
* **Community Module:** Manages the Community Hub, Nikat Horizon, and the review/rating system.
* **Admin Module:** Dashboard for platform analytics, user management, and security logs.

## Directory Structure (Current Mockups)
The initial designs are organized into specific feature folders within `Manually Added files/`:
* `admin_*/`: Admin dashboard features (login, support, settings).
* `checkout_*/`: Commerce checkout flow.
* `manage_*/`: Administrative management screens.
* `nikat_*/`: Core platform screens (homepage, horizon).
* `user_*/`: User-specific flows (login, dashboard).
* `*_admin/`: Admin control panels.
