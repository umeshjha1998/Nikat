# UI & UX Guidelines

## 1. Design System Overview
Nikat employs the **"Deep Sea / Glassmorphism"** design system — a premium, dark-mode-first aesthetic with semi-transparent surfaces, subtle backdrop blurs, and neon accent highlights. The UI must feel modern, responsive, and visually striking at every viewport.

---

## 2. Theme System

### Implementation
Themes are managed by `ThemeService` (`core/theme.service.ts`) using Angular Signals:
- **Dark Mode** (default): No class on `<body>`, uses `:root` CSS variables.
- **Light Mode**: `.light-theme` class added to `<body>`, overrides CSS variables.
- **Persistence**: Theme preference stored in `localStorage` under key `nikat-theme`.
- **Initial Load**: Checks localStorage first, falls back to system `prefers-color-scheme`.

### CSS Variables (Defined in `styles.css`)

#### Dark Theme (`:root`)
| Variable | Value | Usage |
|----------|-------|-------|
| `--primary` | `#3b82f6` | Primary buttons, active states |
| `--secondary` | `#6bfe9c` | Success, positive indicators |
| `--tertiary` | `#ffb3f9` | Accent highlights |
| `--accent` | `#5eb4ff` | Links, interactive elements |
| `--accent-glow` | `rgba(94, 180, 255, 0.4)` | Glow effects on hover |
| `--bg` | `#020410` | Root background |
| `--header-bg` | `rgba(14, 20, 66, 0.6)` | Navbar background (semi-transparent) |
| `--glass` | `rgba(255, 255, 255, 0.03)` | Glass panel fill |
| `--glass-border` | `rgba(255, 255, 255, 0.1)` | Glass panel borders |
| `--text-main` | `#ffffff` | Primary text color |
| `--text-muted` | `#94a3b8` | Secondary/muted text |
| `--border-color` | `rgba(64, 69, 108, 0.3)` | General borders |
| `--card-bg` | `rgba(30, 41, 59, 0.5)` | Card backgrounds |
| `--surface-container` | `#0e1442` | Container surfaces |
| `--surface-container-low` | `#080e38` | Lower-emphasis surfaces |
| `--surface-container-high` | `#131a4c` | Higher-emphasis surfaces |
| `--surface-container-highest` | `#182056` | Highest-emphasis surfaces |
| `--on-surface` | `#e2e3ff` | Text on surface backgrounds |
| `--on-surface-variant` | `#a3a8d5` | Muted text on surfaces |
| `--outline-variant` | `#40456c` | Subtle outlines/dividers |

#### Light Theme (`.light-theme`)
| Variable | Value | Notes |
|----------|-------|-------|
| `--bg` | `#f8fafc` | Light background |
| `--header-bg` | `rgba(255, 255, 255, 0.9)` | White navbar |
| `--primary` | `#2563eb` | Darker blue for contrast |
| `--text-main` | `#0f172a` | Dark text |
| `--text-muted` | `#64748b` | Medium gray |
| `--card-bg` | `#ffffff` | White cards |
| `--surface-container` | `#ffffff` | White surfaces |
| All other variables | Light variants | See `styles.css` for complete list |

### Critical Rule
> **Never hardcode color values in component CSS.** Always use `var(--variable-name)`. This ensures theme switching works globally. Components that override theme variables directly will break the theme toggle.

---

## 3. Typography

| Class | Font Family | Weight | Usage |
|-------|------------|--------|-------|
| `.font-headline` | Plus Jakarta Sans | 700–800 | Headings, hero text, section titles |
| `.font-body` | Manrope | 500–600 | Body text, paragraphs, descriptions |
| `.font-label` | Manrope | 700 | Labels, small bold text, badges |

Fonts are loaded via Google Fonts in `styles.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&family=Manrope:wght@500;600;700;800&display=swap');
```

---

## 4. Utility CSS Classes

The following utility classes are pre-defined in `styles.css`:

| Class | CSS Property |
|-------|-------------|
| `.bg-background` | `background-color: var(--bg)` |
| `.text-on-background` | `color: var(--text-main)` |
| `.bg-primary` | `background-color: var(--primary)` |
| `.text-on-primary` | `color: #ffffff` |
| `.bg-surface-container` | `background-color: var(--surface-container)` |
| `.bg-surface-container-low` | `background-color: var(--surface-container-low)` |
| `.bg-surface-container-high` | `background-color: var(--surface-container-high)` |
| `.bg-surface-container-highest` | `background-color: var(--surface-container-highest)` |
| `.text-on-surface` | `color: var(--text-main)` |
| `.text-on-surface-variant` | `color: var(--text-muted)` |
| `.text-primary` | `color: var(--primary)` |
| `.text-secondary` | `color: var(--secondary)` |
| `.text-tertiary` | `color: var(--tertiary)` |
| `.border-outline-variant` | `border-color: var(--outline-variant)` |
| `.bg-outline-variant` | `background-color: var(--outline-variant)` |
| `.bg-secondary` | `background-color: var(--secondary)` |
| `.text-on-secondary` | `color: #020410` |
| `.bg-tertiary` | `background-color: var(--tertiary)` |

---

## 5. Structural Elements

### Navigation
| Viewport | Element | Style |
|----------|---------|-------|
| **Desktop** | Sticky top navbar | Semi-transparent (`--header-bg`), backdrop-blur, links to Home/Categories/Search/Account |
| **Mobile** | Bottom navigation bar | Fixed to bottom edge, icons for Home/Search/Bookings/Profile |

### Hero Section
- The homepage features a visually striking hero section with:
  - Promotional banners or search bar
  - Background gradients or imagery
  - Call-to-action buttons with glow effects

### Admin Panel Layout
- **Sidebar Navigation**: Left-aligned sidebar with navigation links to all admin sub-pages
- **Top Bar**: Admin header with user info and actions
- **Content Area**: To the right of the sidebar, displays tabular data, analytics cards, and actionable components
- **Shared Styles**: All admin sub-pages share `admin-shared.css` for consistent styling

### Dashboard Layouts
- **User Dashboard**: Sidebar + content area with overview, bookings, settings tabs
- **Shop Owner Dashboard**: Sidebar with shop management, appointments, analytics tabs
- **Service Provider Dashboard**: Sidebar with services, bookings, ratings tabs
- All dashboards support sign-out functionality and navigation between tabs

---

## 6. Component Design Rules

### Buttons
- Clear hover and active states with subtle scaling or glow effects
- Primary buttons use `var(--primary)` background with white text
- Secondary buttons use `var(--secondary)` with dark text
- All buttons have `transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1)`

### Forms & Inputs
- Inputs have borders that highlight on focus using `var(--primary)`
- Global focus style: `2px solid var(--primary)` with `2px offset`
- Never create raw, unstyled HTML forms — always apply the design system

### Cards (Shops/Services/Ads)
- Semi-transparent background (`var(--card-bg)`)
- Contain: image/icon, title, description, action button
- Hover effect: subtle elevation, border intensity increase, or shadow change
- Glass morphism border: `var(--glass-border)`

### Loaders & Skeletons
- Use skeleton UI elements while fetching data (not generic spinners)
- Maintain layout stability during loading

### Scrollbar
- Custom styled: `8px` width, `#1e293b` thumb on `#020410` track
- Rounded thumb (`10px` border-radius)

### Selection
- Custom `::selection`: `rgba(59, 130, 246, 0.3)` background with white text

---

## 7. Responsive Design

- Ensure all components handle viewport breakpoints correctly
- Desktop: Multi-column grids, expanded navigation
- Tablet: Reduced columns, collapsible sidebar
- Mobile: Single-column layout, bottom navigation, touch-friendly tap targets
- Material Icons must use `vertical-align: middle` for proper alignment

---

## 8. Development Expectations for Agents

1. **No Generic Structures**: Never output plain, unstyled HTML. Every template must use the established CSS variables and utility classes.
2. **Theme Compliance**: All new components **must** use `var(--xxx)` CSS variables. Test in both dark and light modes.
3. **Responsive First**: Use proper breakpoints. Hide desktop elements on mobile, expand grids on large screens.
4. **Existing Patterns**: Before creating new styles, check `styles.css` and `admin-shared.css` for existing utility classes.
5. **Transitions**: All interactive elements (links, buttons) must have smooth transitions as defined globally.
6. **Admin Consistency**: Admin sub-pages must import and use `admin-shared.css` for visual parity across the panel.
