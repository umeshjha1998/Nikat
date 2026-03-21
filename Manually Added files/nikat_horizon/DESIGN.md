# Design System Strategy: The Luminous Navigator

## 1. Overview & Creative North Star
The "Creative North Star" for this design system is **"The Luminous Navigator."** 

In a world of flat, uninspired utility apps, this system rejects the "template" aesthetic in favor of a high-end editorial experience. It treats local discovery not as a directory, but as a curated journey. We move beyond standard Material Design by utilizing **Atmospheric Depth**—a technique where the interface feels like layered sheets of digital glass floating over a deep, midnight ether (`#05092f`). 

By combining the structural logic of Angular Material with intentional asymmetry and high-contrast typography, we create an environment that feels both authoritative and approachable. The goal is "Effortless Sophistication": the app should feel as premium as a high-end travel magazine while maintaining the lightning-fast efficiency of a modern mobile-first platform.

---

## 2. Color & Tonal Architecture
Our palette is rooted in a "Deep Sea" dark mode that uses vibrant, bioluminescent accents to guide the user's eye.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders for sectioning or containment. 
*   **How to define boundaries:** Use background color shifts. A `surface-container-low` (`#080e38`) section should sit directly on a `surface` (`#05092f`) background.
*   **The Transition:** Use the Spacing Scale (specifically `8` or `10`) to create "breathing room" between tonal shifts rather than a hard line.

### Surface Hierarchy & Nesting
Treat the UI as a physical stack. The deeper the content, the darker the surface. 
1.  **Base Layer:** `surface` (`#05092f`) - The foundation.
2.  **Sectioning:** `surface-container-low` (`#080e38`) - For large logical groupings.
3.  **Component Level:** `surface-container` (`#0e1442`) - For cards and interactive modules.
4.  **Prominence:** `surface-container-high` (`#131a4c`) - For active states or high-priority modals.

### The "Glass & Gradient" Rule
To escape the "standard" feel, use **Glassmorphism** for floating elements (Top App Bars, Bottom Navigation). 
*   **Recipe:** Apply `surface_variant` (`#182056`) at 60% opacity with a `20px` backdrop-blur. 
*   **Signature Gradients:** For primary CTAs, do not use flat hex codes. Use a linear gradient from `primary` (`#5eb4ff`) to `primary_container` (`#2aa7ff`) at a 135-degree angle. This adds "visual soul" and a tactile, glowing quality.

---

## 3. Typography: Editorial Authority
We utilize a dual-typeface system to balance character with readability.

*   **Display & Headlines (Plus Jakarta Sans):** Chosen for its modern, geometric clarity. Use `display-lg` (3.5rem) with tighter letter-spacing (-0.02em) for hero discovery moments. This creates an "Editorial" look that commands attention.
*   **Body & Labels (Manrope):** A highly legible sans-serif that excels in mobile contexts. `body-md` (0.875rem) is our workhorse for shop descriptions and service details.
*   **Hierarchy as Identity:** Use extreme contrast between `headline-lg` and `label-sm`. The juxtaposition of large, bold headers against tiny, all-caps `label-md` tracking (+0.05em) mimics the layout of premium fashion and architecture journals.

---

## 4. Elevation & Depth: Tonal Layering
Traditional drop shadows are often a "crutch" for poor layout. In this system, we prioritize **Tonal Layering**.

*   **The Layering Principle:** Place a `surface-container-lowest` (`#000000`) card on a `surface-container-low` (`#080e38`) section. The subtle 2% difference in luminosity creates a sophisticated "lift" that feels integrated into the OS.
*   **Ambient Shadows:** If a card must float (e.g., a map marker or a floating action button), use an extra-diffused shadow: `box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);`. The shadow color is never grey; it is a darkened version of our `surface` tone.
*   **The "Ghost Border" Fallback:** If accessibility requires a container edge, use `outline-variant` (`#40456c`) at **15% opacity**. It should be felt, not seen.

---

## 5. Component Signatures

### Buttons: The Kinetic Glow
*   **Primary:** Gradient (`primary` to `primary_container`), `xl` (1.5rem) roundedness. No border.
*   **Secondary:** `surface-container-high` background with `on-surface` text.
*   **Tertiary:** Transparent background, `primary` text, no box.

### Cards & Discovery Lists
*   **The Rule:** Forbid divider lines. 
*   **Execution:** Separate shop listings using `16` (4rem) vertical spacing or by alternating backgrounds between `surface` and `surface-container-low`.
*   **Image Treatment:** All shop/service imagery must use `lg` (1rem) corner radius to match the system's approachable yet professional feel.

### Input Fields: The Subtle Inset
*   Use `surface-container-highest` (`#182056`) for the input track. 
*   Instead of a bottom line, use a subtle 2px glow on the `primary` color only during the `focus` state.

### Contextual Discovery Components
*   **The "Vibe" Chip:** Selection chips using `tertiary_container` (`#fc9df7`) with `on_tertiary_container` text to highlight specific shop atmospheres (e.g., "Cozy," "Bustling").
*   **Location Awareness Bar:** A glassmorphic top bar that dynamically shifts transparency as the user scrolls, keeping the "community-centric" location always visible but never obtrusive.

---

## 6. Do's and Don'ts

### Do
*   **Do** use asymmetrical layouts. Let a headline hang over the edge of a card to break the "grid" feel.
*   **Do** use the `secondary` (`#6bfe9c`) green exclusively for "Open Now" or "Success" states to build community trust.
*   **Do** lean into white space. If you think there’s enough room, add one more step on the Spacing Scale.

### Don't
*   **Don't** use 100% white text on the dark background. Always use `on_surface` (`#e2e3ff`) to reduce eye strain.
*   **Don't** use standard Material "Ripple" effects in high-saturation colors. Use a subtle `on-surface` overlay at 8% opacity for touch feedback.
*   **Don't** use sharp corners. Everything follows the Roundedness Scale, favoring `md` (0.75rem) for UI elements and `xl` (1.5rem) for primary interactions.