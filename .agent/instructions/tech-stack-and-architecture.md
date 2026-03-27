# Tech Stack & Architecture

## 1. Overview
Nikat follows a strictly decoupled client-server architecture consisting of a standalone Angular 20 frontend and a Spring Boot 3.4 backend. The two systems communicate exclusively via JSON over REST, authenticated with stateless JWT tokens.

---

## 2. Infrastructure & Deployment

| Component | Technology | Region / Notes |
|-----------|-----------|----------------|
| **Frontend Hosting** | Vercel (Static/SPA) | Auto-deploy on push, SPA rewrite via `vercel.json` |
| **Backend Hosting** | Render.com (Docker) | Multi-stage Dockerfile, `eclipse-temurin:25-jre-alpine` |
| **Database** | Neon.tech (PostgreSQL Serverless) | `ap-southeast-1` (AWS Singapore), SSL required |
| **Email Service** | Resend API | Transactional emails (appointment confirmations, etc.) |
| **API Documentation** | SpringDoc OpenAPI 2.7.0 | Swagger UI at `/swagger-ui.html` |

### Docker Configuration
```dockerfile
# Build: maven:3.9.6-eclipse-temurin-25
# Run:   eclipse-temurin:25-jre-alpine
# Heap:  -Xms128m -Xmx256m
# Port:  8080
```

### Vercel Configuration
```json
{
  "outputDirectory": "dist/frontend/browser",
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

---

## 3. Frontend Architecture (`frontend/`)

### Core Versions
| Package | Version |
|---------|---------|
| `@angular/core` | `^20.3.0` |
| `typescript` | `~5.9.2` |
| `rxjs` | `~7.8.0` |
| `zone.js` | `~0.15.0` |

### Architecture Decisions
- **Paradigm**: Standalone Components — no `AppModule`, no `NgModule` overhead.
- **Routing**: All routes defined in `app.routes.ts` using `loadComponent()` for lazy loading.
- **Styling**: Vanilla CSS with CSS Custom Properties (no TailwindCSS). Global design tokens in `styles.css`.
- **Fonts**: Plus Jakarta Sans (headings via `.font-headline`), Manrope (body via `.font-body`) from Google Fonts.
- **State Management**: Angular Signals for local component state, RxJS `BehaviorSubject` for cross-component reactive data (e.g., `AuthService.currentUser$`).
- **HTTP Interceptor**: `apiInterceptor` (functional `HttpInterceptorFn`) auto-attaches `Authorization: Bearer <token>` header from `localStorage`.
- **Theme System**: `ThemeService` uses Angular `signal<boolean>` for dark/light mode. Dark mode is default. Light mode is toggled via `.light-theme` CSS class on `<body>`.

### Route Guards
| Guard | File | Purpose |
|-------|------|---------|
| `authGuard` | `core/auth.guard.ts` | Requires any valid JWT token |
| `adminGuard` | `core/admin.guard.ts` | Requires `role === 'ADMIN'` |
| `roleGuard` | `core/role.guard.ts` | Flexible — checks `expectedRole` or `expectedCondition` from route `data` |

### Core Services
| Service | File | Responsibilities |
|---------|------|-----------------|
| `AuthService` | `core/auth.service.ts` | Login, register, logout, session management, `currentUser$` observable |
| `ApiService` | `core/api.service.ts` | Public API calls — shops, services, categories, community, reviews |
| `ThemeService` | `core/theme.service.ts` | Dark/Light theme toggle, persists to localStorage |

### Feature Modules (Lazy-loaded)
| Module | Path(s) | Guard |
|--------|---------|-------|
| Home | `/` | None |
| Browse Shops | `/browse` | None |
| Shop Detail | `/shop/:id` | None |
| Services | `/services` | None |
| Book Service | `/book-service`, `/book-service/:id` | None |
| Community | `/community` | None |
| Reviews | `/reviews` | None |
| Search | `/search` | None |
| Auth | `/login`, `/register`, `/forgot-password`, `/reset-password`, `/verify-otp`, `/admin-login` | None |
| Dashboard (User) | `/dashboard` | `roleGuard` (`expectedRole: 'USER'`) |
| Dashboard (Shop Owner) | `/shop-dashboard` | `roleGuard` (`expectedCondition: 'isShopOwner'`) |
| Dashboard (Provider) | `/provider-dashboard` | `roleGuard` (`expectedCondition: 'isServiceProvider'`) |
| Checkout | `/checkout/cart`, `/checkout/shipping`, `/checkout/payment` | `authGuard` (shipping & payment) |
| Admin Panel | `/admin/**` (12 child routes) | `adminGuard` |
| Help | `/help` | None |

---

## 4. Backend Architecture (`backend/`)

### Core Versions
| Dependency | Version |
|------------|---------|
| Spring Boot | `4.0.4` |
| Java | `25` |
| Lombok | `1.18.34` |
| MapStruct | `1.5.5.Final` |
| JJWT | `0.11.5` |
| SpringDoc OpenAPI | `2.7.0` |
| Flyway | (managed by Spring Boot BOM) |
| PostgreSQL Driver | (managed by Spring Boot BOM) |

### Package Structure (`com.nikat.api`)
```
com.nikat.api/
├── NikatApplication.java          # @SpringBootApplication entry point
├── config/
│   ├── SecurityConfig.java        # SecurityFilterChain, CORS, BCrypt, AuthManager
│   ├── GlobalExceptionHandler.java # @ControllerAdvice for centralized error handling
│   └── OpenApiConfig.java         # Swagger/OpenAPI configuration
├── controller/                    # REST endpoint definitions (@RestController)
│   ├── AuthController.java        # POST /api/v1/auth/register, /api/v1/auth/login
│   ├── ShopController.java        # /api/v1/public/shops + protected CRUD
│   ├── ServiceController.java     # /api/v1/public/services + protected CRUD
│   ├── CategoryController.java    # /api/v1/public/categories
│   ├── ReviewController.java      # /api/v1/public/reviews
│   ├── CommunityController.java   # /api/v1/public/community
│   └── UserController.java        # User management (admin/protected)
├── domain/                        # JPA @Entity classes (8 entities)
│   ├── User.java, Shop.java, Service.java, Product.java
│   ├── Category.java, Review.java, CommunityPost.java, Advertisement.java
├── dto/                           # Data Transfer Objects (9 DTOs)
│   ├── AuthRequest.java, AuthResponse.java, RegisterRequest.java
│   ├── ShopDto.java, ServiceDto.java, CategoryDto.java
│   ├── ReviewDto.java, ProductDto.java, CommunityPostDto.java, UserDto.java
├── repository/                    # Spring Data JPA repositories (8 interfaces)
├── security/                      # JWT infrastructure
│   ├── JwtUtils.java              # Token generation, validation, claim extraction
│   ├── JwtAuthenticationFilter.java # OncePerRequestFilter for JWT validation
│   ├── CustomUserDetails.java     # UserDetails implementation
│   └── CustomUserDetailsService.java # UserDetailsService loading from DB
└── service/                       # Business logic (Single Source of Truth)
    ├── AuthService.java           # Registration, login, JWT issuance
    ├── ShopService.java           # Shop CRUD, approval workflows
    ├── ServiceProviderService.java # Service provider management
    ├── CategoryService.java       # Category management
    ├── ReviewService.java         # Review CRUD, moderation
    ├── CommunityService.java      # Community post management
    ├── UserService.java           # User CRUD, role management
    └── EmailService.java          # Resend API integration
```

### Security Configuration
- **CSRF**: Disabled (stateless API)
- **Session**: `STATELESS` — no server-side session storage
- **Password Encoding**: BCrypt
- **Public Endpoints**: `/api/v1/auth/**`, `/api/v1/public/**`, Swagger UI, actuator health
- **CORS Origins**: `http://localhost:4200`, `https://nikat.vercel.app`
- **Allowed Methods**: GET, POST, PUT, DELETE, OPTIONS, PATCH
- **Allowed Headers**: Authorization, Content-Type, Accept

---

## 5. Architectural Non-Negotiables

1. **No Direct DB Access from Frontend**: All database operations go through the Spring Boot REST API.
2. **Stateless Authentication**: The backend does NOT store session state. Authentication relies entirely on validating the JWT signature.
3. **Data Integrity**: Frontend validations are for UX only. The backend Service layer enforces all real constraints.
4. **Flyway-Only Schema Changes**: Schema is managed by Flyway migrations. JPA runs in `validate` mode and will fail startup if schema doesn't match entities.
5. **DTO/Entity Separation**: Entities are never exposed directly to the API. MapStruct handles Entity ↔ DTO conversion.
6. **No Frontend Business Logic**: The frontend must never perform pricing calculations, availability checks, or security enforcement — only the backend does this.
