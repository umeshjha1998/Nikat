# Integration Test Document: Nikat Platform

> **Last Updated:** 2026-03-23T18:05 IST  
> **Test Method:** MCP Integrations (Neon MCP) + Browser Automation + HTTP Verification  
> **Tested By:** Automated Agent

This document outlines the deployment integration of the Nikat platform across Vercel, Render, and Neon Database, and provides the results of the automated integration tests.

---

## 1. Architecture & Integration Points

The Nikat platform relies on a distributed deployment model:

### 1.1 Vercel (Frontend)
- **Role:** Hosts the Angular SPA (Single Page Application).
- **Service Link:** [https://nikat.vercel.app/](https://nikat.vercel.app/)
- **Integration:** The Vercel frontend is configured via environment variables (`apiUrl`) to route all API calls to the Render Backend at `https://nikat.onrender.com/api/v1`.
- **SPA Routing:** `vercel.json` ensures direct URL visits fall back to `index.html` for client-side routing.

### 1.2 Render (Backend)
- **Role:** Hosts the Java 21 Spring Boot 3 REST API.
- **Service ID:** `srv-d70i897diees73dlqheg`
- **Service Link:** [https://nikat.onrender.com/](https://nikat.onrender.com/)
- **Integration:**
  - Exposes REST endpoints consumed by the Vercel frontend.
  - Connects to the Neon Database via `DATABASE_URL` environment variable.
  - Public endpoints: `/api/v1/auth/**`, `/api/v1/public/**`, `/swagger-ui/**`, `/actuator/**`
  - Protected endpoints: `/api/v1/admin/**` (ADMIN role), all others (authenticated).

### 1.3 Neon (Database)
- **Role:** Managed PostgreSQL Cloud Database (PostgreSQL 17.8).
- **Project ID:** `lingering-tooth-00140692`
- **Branch:** `production` (ID: `br-damp-salad-a1xumndi`)
- **Host:** `ep-calm-meadow-a106b6xh-pooler.ap-southeast-1.aws.neon.tech`
- **Database:** `neondb`
- **Integration:** Stores all relational data for the application. The Render backend connects via JDBC using the Neon pooler connection string.

---

## 2. Environment Variable Configuration

| Environment | Variable | Value / Status |
|---|---|---|
| **Vercel** (Frontend) | `apiUrl` (in `environment.prod.ts`) | `https://nikat.onrender.com/api/v1` ✅ |
| **Render** (Backend) | `DATABASE_URL` | Injected from Neon connection string ✅ |
| **Render** (Backend) | `ALLOWED_ORIGINS` | `https://nikat.vercel.app` ✅ |
| **Render** (Backend) | `JWT_SECRET` | Auto-generated ✅ |

---

## 3. MCP Integration Test Results

### 3.1 Neon Database (via `mcp-server-neon`)

| Test | Result | Details |
|---|---|---|
| **Project Discovery** | ✅ PASS | Project `Nikat` found, owner: `Umesh` |
| **Branch Details** | ✅ PASS | `production` branch, state: `ready`, created: 2026-03-23 |
| **SQL Query Execution** | ✅ PASS | `SELECT version()` → PostgreSQL 17.8 (aarch64-linux-gnu) |
| **Connection String** | ✅ PASS | URI retrieved with pooler endpoint in `ap-southeast-1` |
| **Schema Discovery** | ✅ PASS | 27 tables across 2 schemas found |

#### Database Schema Summary

**`public` schema (18 tables):**

| Table | Columns | Row Count |
|---|---|---|
| `users` | 23 | 1 |
| `listings` | 16 | 0 |
| `community_posts` | 10 | 0 |
| `bookings` | 10 | 0 |
| `orders` | 9 | 0 |
| `reviews` | 8 | 0 |
| `products` | 7 | 0 |
| `banners` | 6 | 0 |
| `categories` | 6 | 0 |
| `otps` | 5 | 0 |
| `services` | 5 | 0 |
| `shops` | 4 | 0 |
| `order_items` | 4 | 0 |
| `service_charges` | 3 | 0 |
| `listing_image_urls` | 2 | 0 |
| `community_post_image_urls` | 2 | 0 |
| `product_image_urls` | 2 | 0 |
| `shop_products_or_services_sold` | 2 | 0 |

**`neon_auth` schema (9 tables):** `account`, `invitation`, `jwks`, `member`, `organization`, `project_config`, `session`, `user`, `verification`

#### Seed Data

| Entity | Count | Details |
|---|---|---|
| Users | 1 | `Super Admin` (role: `ADMIN`, email: `admin`, created: 2026-03-23) |
| Listings | 0 | — |
| Categories | 0 | — |
| Shops | 0 | — |

---

### 3.2 Render Backend (via HTTP + Browser)

> **Note:** Render free tier instances sleep after 15 minutes of inactivity. The backend took ~100 seconds to wake up during testing.

| Test | Endpoint | Result | Response |
|---|---|---|---|
| **Root URL** | `GET /` | ⚠️ 403 Forbidden | Expected — no root controller mapped |
| **Public Categories** | `GET /api/v1/public/categories` | ✅ PASS | `[]` (empty array — valid JSON response) |
| **Public Listings** | `GET /api/v1/public/listings` | ✅ PASS | `[]` (empty array — valid JSON response) |
| **Swagger UI** | `GET /swagger-ui.html` | ✅ PASS | Swagger UI page rendered |
| **Auth Register** | `GET /api/v1/auth/register` | ⚠️ 403 | Expected — auth endpoints require POST |
| **Protected Endpoints** | `GET /api/v1/categories` | ❌ 403 | Expected — requires JWT authentication |

**Assessment:** The backend is **fully operational**. Spring Security is correctly configured — public endpoints return data, protected endpoints require authentication, and Swagger UI is accessible. The backend is successfully connected to the Neon database (confirmed by public endpoints returning valid JSON from database queries).

---

### 3.3 Vercel Frontend (via Browser + HTTP)

| Test | Result | Response |
|---|---|---|
| **Homepage Load** | ❌ FAIL | HTTP 404 — `x-vercel-error: NOT_FOUND` |
| **Angular App Render** | ❌ FAIL | Vercel default 404 error page displayed |
| **SPA Navigation** | ❌ FAIL | No app content rendered |

**Assessment:** The Vercel deployment is **not active**. The domain `nikat.vercel.app` is registered but no build output is deployed.

**Root Cause:** The Angular frontend has not been built and deployed to Vercel. This requires:
1. Push the code to a GitHub repository linked to Vercel
2. Verify the `rootDirectory` is set to `frontend/`
3. Ensure the build command is `npm run build` and output directory is `dist/nikat`
4. Trigger a deployment

---

## 4. Integration Test Summary

| Service | Status | Notes |
|---|---|---|
| **Neon Database** | ✅ **PASS** | Full MCP connectivity, 27 tables, PostgreSQL 17.8, SQL queries execute successfully |
| **Render Backend** | ✅ **PASS** | API running, public endpoints serve data, connected to Neon DB, Swagger UI accessible |
| **Vercel Frontend** | ❌ **FAIL** | 404 — frontend not deployed, needs GitHub push + Vercel build |
| **Render ↔ Neon** | ✅ **PASS** | Backend successfully queries Neon DB (confirmed via `/api/v1/public/*` responses) |
| **Vercel ↔ Render** | ❌ **BLOCKED** | Cannot test — frontend not deployed |

### Overall Status: ⚠️ PARTIAL PASS (2/3 services operational)

---

## 5. MCP Server Availability

| MCP Server | Available | Used For |
|---|---|---|
| `mcp-server-neon` | ✅ Yes | Database schema inspection, SQL queries, connection string, project/branch management |
| Vercel MCP | ❌ Not available | No Vercel MCP server configured — tested via browser and HTTP instead |
| Render MCP | ❌ Not available | No Render MCP server configured — tested via browser and HTTP instead |

---

## 6. Recommended Next Steps

1. **Deploy Frontend to Vercel:** Push code to GitHub, link the repo to Vercel with `frontend/` as root directory, and trigger a build.
2. **Add Seed Data:** The database has 0 listings, categories, shops, etc. Add seed data for a complete test.
3. **Add MCP Servers:** Consider adding Vercel and Render MCP servers for full programmatic integration testing.
4. **End-to-End Test:** Once the frontend is deployed, test the full user flow (registration, login, listing creation) through the browser.
