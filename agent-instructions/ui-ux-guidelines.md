# UI/UX Guidelines

This document outlines the design principles, color palette, typography, and styling instructions for the Nikat project.

## 1. Design Principles
*   **Modern & Vibrant:** Use a dark theme base with vibrant, glowing accents to highlight key actions and branding.
*   **Glassmorphism:** Employ translucent backgrounds (`backdrop-blur`) for floating elements like navigation bars and modals to create depth.
*   **Accessibility First:** Ensure sufficient contrast ratios between text and background colors. Use semantic HTML.
*   **Responsive Layouts:** Utilize Tailwind's container queries and responsive utilities (`md:`, `lg:`) to ensure seamless scaling across devices (Mobile, Tablet, Desktop).

## 2. Color Palette (Tailwind Configuration)
The project uses a heavily customized Tailwind CSS theme defined in the `tailwind.config` script block in the HTML headers.

*   **Backgrounds:**
    *   `background`: `#05092f` (Deep Navy Blue)
    *   `surface`: `#05092f`
    *   `surface-container`: `#0e1442`
    *   `surface-container-high`: `#131a4c`
*   **Primary Accent (Blue/Cyan):**
    *   `primary`: `#5eb4ff`
    *   `primary-container`: `#2aa7ff`
*   **Secondary Accent (Green):**
    *   `secondary`: `#6bfe9c`
    *   `secondary-container`: `#006d37`
*   **Tertiary Accent (Pink/Purple):**
    *   `tertiary`: `#ffb3f9`
*   **Text/On-Surface:**
    *   `on-surface`: `#e2e3ff`
    *   `on-surface-variant`: `#a3a8d5`
*   **Feedback/State:**
    *   `error`: `#ff716c`
    *   `outline`: `#6e739d`

## 3. Typography
The project relies on two primary Google Fonts:

1.  **Headlines / Titles:** `Plus Jakarta Sans`
    *   Weights: 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold), 800 (ExtraBold).
    *   Tailwind Class: `font-headline`
2.  **Body Text / UI Elements:** `Manrope`
    *   Weights: 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold).
    *   Tailwind Class: `font-body` or `font-label`

## 4. Icons
*   **Library:** Google Material Symbols Outlined.
*   **Usage:** Included via standard Google Fonts link. Used consistently throughout the UI (e.g., `<span class="material-symbols-outlined">search</span>`).
*   **Styling:** Icons should inherit text colors or use specific semantic colors (e.g., `text-primary` for active states).

## 5. UI Components & Patterns
*   **Cards/Bento Boxes:** Use rounded corners (`rounded-2xl`, `rounded-3xl`), subtle backgrounds (`bg-surface-container-low`), and hover effects (`hover:scale-105`, `hover:-translate-y-2`) to create engaging interactive elements.
*   **Buttons:**
    *   Primary: Gradients (`bg-gradient-to-br from-primary to-primary-container`), bold text, rounded corners.
    *   Secondary: Translucent backgrounds (`bg-[#e2e3ff]/10`), icon-only variations for actions like search or notifications.
*   **Navigation:**
    *   Desktop: Sticky TopAppBar with glassmorphism (`backdrop-blur-xl`).
    *   Mobile: Fixed BottomNavBar (`rounded-t-3xl`) with distinct active states.
