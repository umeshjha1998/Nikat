# UI/UX Guidelines

This document outlines the design principles, styling, and component patterns for the Nikat project.

## 1. Design Principles
* **Modern & Vibrant:** Use a dark theme base with vibrant accents to highlight key actions and branding.
* **Glassmorphism:** Employ translucent backgrounds with backdrop-blur for floating elements like navigation bars and modals.
* **Accessibility First:** Ensure sufficient contrast ratios between text and background. Use semantic HTML and ARIA attributes.
* **Responsive Layouts:** Use Angular Material's responsive breakpoints and CSS media queries to ensure seamless scaling across devices (Mobile, Tablet, Desktop).

## 2. Styling Stack
The project uses a **hybrid approach**:
* **Angular Material** — Primary component library with prebuilt `indigo-pink.css` theme.
* **SCSS** — Global styles and component-level styling. `styles.scss` is the global entry point.
* **Tailwind CSS Utilities** — Available via `@tailwind` directives in `styles.scss` for utility-first spacing, layout helpers, etc.

### Dark Mode
A `.dark-theme` CSS class toggles the dark color scheme globally:
```scss
.dark-theme {
  background-color: #303030;
  color: #fff;
  .mat-card { background-color: #424242; color: #fff; }
  .mat-sidenav { background-color: #424242; color: #fff; }
}
```

## 3. Color Palette
* **Backgrounds:**
  * Default Background: `#303030` (dark mode), `#fafafa` (light mode)
  * Surface / Card: `#424242` (dark), white (light)
* **Primary:** Angular Material Indigo (`#3f51b5`)
* **Accent:** Angular Material Pink (`#ff4081`)
* **Warn:** Angular Material Red
* **Text:** `#fff` (dark mode), `rgba(0,0,0,.87)` (light mode)

> **Note:** The Stitch-generated design mockups used custom deep navy colors (`#05092f`, `#0e1442`). These can be adopted in a future theme customization pass but the current production code uses Angular Material's built-in Indigo-Pink palette.

## 4. Typography
* **Primary Font:** `Roboto`, `"Helvetica Neue"`, sans-serif (set in `styles.scss`).
* **Heading Weight:** 500–700 for section headings.
* **Body Weight:** 400 for paragraph text.

## 5. Icons
* **Library:** Angular Material Icons (`mat-icon`).
* **Usage:** `<mat-icon>search</mat-icon>` for inline icons.
* **Styling:** Icons inherit the parent text color or use `color="primary"` / `color="accent"`.

## 6. UI Components & Patterns
* **Cards:** Use `mat-card` with `mat-card-header` and `mat-card-content`. Add hover effects for interactive cards.
* **Buttons:**
  * Primary CTA: `mat-raised-button color="primary"`
  * Secondary: `mat-stroked-button` or `mat-flat-button color="accent"`
  * Icon-only: `mat-icon-button`
* **Forms:** Use `mat-form-field` with `appearance="outline"` for consistency. All forms should include validation messages.
* **Navigation:**
  * Desktop: `mat-toolbar` as sticky top bar.
  * Mobile: `mat-toolbar` with hamburger menu or `mat-bottom-sheet` for navigation.
  * Sidebar: `mat-sidenav` for admin and dashboard layouts.
* **Dialogs:** Use `MatDialog` for confirmations and modals.
* **Snackbars:** Use `MatSnackBar` for toast notifications.

## 7. Responsive Breakpoints
* **Mobile:** `< 768px` — Single-column layouts, stacked cards.
* **Tablet:** `768px – 1024px` — Two-column grids.
* **Desktop:** `> 1024px` — Full multi-column layouts with sidebars.
