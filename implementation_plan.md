# Phase 3: Shop & Provider Dashboards Redesign

The objective is to overhaul the existing dashboard UIs in Nikat to match the high-fidelity designs from Stitch project `15052022444642787712`. This includes updating the structure, sections, and aesthetic details to ensure a premium, modern feel.

## User Review Required

> [!IMPORTANT]
> - These changes are purely visual and structural in the frontend. Data is currently mocked/static within the components.
> - No functional changes to backend APIs or data persistence are included in this phase.
> - The design uses the "Deep Sea" dark mode theme consistently across all dashboards.

## Proposed Changes

### [Dashboard Feature]

#### [MODIFY] [shop-owner-dashboard.component.ts](file:///e:/My%20folder/Education/Git/Nikat/frontend/src/app/features/dashboard/shop-owner/shop-owner-dashboard.component.ts)
- Update stats to include Total Views, Inquiries, and Rating.
- Implement "Engagement Trends" (simulated graph area).
- Implement "Shop Identity" and "Showcase Photos" sections.
- Update "Recent Inquiries" to match Stitch layout.
- Refine sidebar with "Business Studio" branding and updated navigation icons.

#### [MODIFY] [service-provider-dashboard.component.ts](file:///e:/My%20folder/Education/Git/Nikat/frontend/src/app/features/dashboard/service-provider/service-provider-dashboard.component.ts)
- Align with "Service Provider Dashboard - Time-Based Rates" design.
- Update schedule list visual (Time-based rates display).
- Implement active services grid with premium cards.
- Refine stats and sidebar components.

#### [MODIFY] [dashboard.component.ts](file:///e:/My%20folder/Education/Git/Nikat/frontend/src/app/features/dashboard/dashboard.component.ts)
- Update "User Dashboard" to match Stitch design.
- Refine Upcoming Appointments cards and stats.
- Improve sidebar styling for consistency.

## Verification Plan

### Manual Verification
1. Run `npx ng serve` (already running).
2. Navigate to `/shop-dashboard` and verify:
    - Background gradients and glassmorphism cards.
    - Updated stats (Views, Inquiries, Rating).
    - New engagement sections and showcase/inquiry layouts.
3. Navigate to `/provider-dashboard` and verify:
    - Time-based schedule visuals.
    - Active services card grid.
4. Navigate to `/dashboard` and verify:
    - User-centric appointment list and favorites.
5. Check responsiveness for tablet and mobile views.
