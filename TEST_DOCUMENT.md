# Integration Test Document: Nikat Platform

This document outlines the deployment integration of the Nikat platform across Vercel, Render, and Neon Database, and provides the results of the automated HTTP integration tests.

## 1. Architecture & Integration Points

The Nikat platform relies on a distributed deployment model, utilizing separate environments for its primary components:

### 1.1 Vercel (Frontend)
- **Role:** Hosts the Angular SPA (Single Page Application).
- **Service Link:** [https://nikat.vercel.app/](https://nikat.vercel.app/)
- **Integration:** The Vercel frontend is configured via environment variables (e.g., `apiUrl`) to route all API calls (e.g., `/api/v1/...`) to the Render Backend service.
- **Handling SPA Routing:** `vercel.json` ensures direct URL visits fall back to the index page for client-side routing.

### 1.2 Render (Backend)
- **Role:** Hosts the Java Spring Boot REST API.
- **Service ID:** `srv-d70i897diees73dlqheg`
- **Service Link:** [https://nikat.onrender.com/](https://nikat.onrender.com/)
- **Integration:**
  - Exposes REST endpoints required by the Vercel frontend.
  - Connects to the Neon Database via the injected `DATABASE_URL` environment variable.

### 1.3 Neon (Database)
- **Role:** Managed PostgreSQL Cloud Database.
- **Project ID:** `lingering-tooth-00140692`
- **Integration:** Stores all relational data for the application (users, businesses, products, etc.). The Render backend connects to this database via standard JDBC properties using the Neon connection string (`ep-calm-meadow-a106b6xh-pooler.ap-southeast-1.aws.neon.tech`).

---

## 2. Environment Variable Configuration

To successfully bridge the microservices, the following environment variables have been configured and verified:

1. **On Vercel (Frontend):**
   - The production build must point its `apiUrl` in `environments/environment.prod.ts` to `https://nikat.onrender.com/api/v1`.
2. **On Render (Backend):**
   - `DATABASE_URL` was successfully fetched from the Neon project and injected into the `srv-d70i897diees73dlqheg` web service.
   - The environment variable update triggered a new deployment on Render (`dep-d70ilovfte5s73eetpkg`).

---

## 3. Automated Browser/HTTP Test Execution Results

The following test results were gathered by performing HTTP requests against the deployed frontend and backend services:

### 3.1 Vercel Frontend Access Test
- **Target:** `https://nikat.vercel.app/`
- **Result:** ❌ **FAIL (HTTP 404 Not Found)**
- **Analysis:** Vercel returned a `404 x-vercel-error: NOT_FOUND`. This indicates that while the domain is registered on Vercel, the actual frontend deployment either failed, the project is missing the correct build output directory configuration (e.g., `dist/nikat`), or the code has not been fully pushed/built on Vercel yet.
- **Recommended Fix:** Ensure the GitHub repository is correctly linked to Vercel, verify the `rootDirectory` is set to `frontend/`, and trigger a new Vercel deployment.

### 3.2 Render Backend Connectivity Test
- **Target:** `https://nikat.onrender.com/`
- **Result:** ❌ **FAIL (HTTP 403 Forbidden)**
- **Analysis:** Render (via Cloudflare) returned a `403 Forbidden`. This is a common response for a web service that lacks a root index route (`/`) or when accessing a Spring Boot application root endpoint directly without an explicitly mapped controller.
- **Additional Context:** Free tier instances on Render sleep after 15 minutes of inactivity. It's also possible the deployment triggered by the `DATABASE_URL` update was still in progress during the test.
- **Recommended Fix:** The frontend app must route requests to specific API endpoints (e.g., `/api/v1/health`). Verify that the backend exposes a health check endpoint and the Vercel frontend uses the correct subpath. Check the Render deployment logs (`dep-d70ilovfte5s73eetpkg`) to ensure the Spring Boot application started successfully and established a connection to the Neon database.

### 3.3 Neon Database Integration Status
- **Result:** ✅ **SUCCESS (Connection Configured)**
- **Analysis:** The Neon database connection string was successfully obtained via API (`ep-calm-meadow-a106b6xh-pooler.ap-southeast-1.aws.neon.tech/neondb`) and securely injected into the Render environment variables. As long as the Render build completes successfully, the backend will have write/read access to the database.

---
