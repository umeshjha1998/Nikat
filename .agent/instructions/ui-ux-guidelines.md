# UI & UX Guidelines

## 1. Design System Overview
Nikat employs the "Deep Sea" / "Glassmorphism" theme, heavily referencing the standardized Stitch design system templates used on the platform. The UI must feel premium, modern, and highly responsive.

## 2. Global Styling & Themes
- **Primary Colors**: Deep Sea Blue, Midnight Navy (dark mode variants).
- **Accents**: Neon accents (e.g., cyan, purple) for active states, primary buttons, or specific highlights.
- **Glassmorphism**: Components such as cards, navigation bars, and modals should use semi-transparent backgrounds with backdrop blurs (e.g., `backdrop-blur-md`, `bg-white/10` or `bg-black/30`).
- **Typography**: Clean, sans-serif fonts (e.g., Inter or Roboto). High contrast for readability.
- **Dark Mode First**: The application defaults to Dark Mode. A Light Mode toggle may be present but the "Deep Sea" base must always be maintained structurally.

## 3. Structural Elements
- **Navigation (Desktop)**: A clean, sticky top navbar with transparent/blurred background. Includes links to Home, Categories, Search, and Account.
- **Navigation (Mobile)**: A Bottom Navigation Bar is required for mobile viewports, sticking to the bottom edge. Includes icons for Home, Search, Bookings, and Profile.
- **Hero Section**: The homepage should have a visually striking hero section with promotional banners or a search bar, featuring gradients or a relevant background image.
- **Administrative Panel**: Uses a Sidebar Navigation approach. Main content area sits to the right, displaying tabular data, analytics, and actionable cards.

## 4. Components Rules
- **Buttons**: Should have clear hover/active states with subtle scaling or glow effects.
- **Forms**: Inputs should have borders that highlight on focus. Never create "raw" unprotected HTML forms without applying the design system classes.
- **Cards (Shops/Services/Ads)**: Should contain a relevant image/icon, clear title, concise description, and actionable button. Hovering over a card should slightly elevate it or intensify the border.
- **Loaders & Skeletons**: Use skeleton UI elements while fetching data instead of generic spinners when possible, maintaining layout stability.

## 5. Development Expectations for Agents
- **No generic structures**: When writing new Angular templates, never output plain basic HTML. If you are adding a missing feature, adapt existing CSS utility classes or global component styles already established in the codebase.
- **Responsive Design**: Ensure utility classes handle breakpoints correctly (e.g., hiding desktop elements on mobile, expanding grids from 1 column to 3 columns on large screens).
