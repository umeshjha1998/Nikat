# Nikat Frontend Guidelines

## Tech Stack
- **Framework**: Angular 18+ (Standalone Components).
- **Core Principles**: Feature-based modularity, OnPush Change Detection, Facade pattern for state/API abstraction.

## Design System (Premium Aesthetic)
- **Typography**: 
  - Headlines: `Plus Jakarta Sans` (weights: 700, 800).
  - Body: `Manrope` (weights: 500, 600, 700).
- **Color Palette (HSL Curated)**:
  - Primary: `#3b82f6` (HSL: 217, 91%, 60%).
  - Background: `#020410` (HSL: 231, 67%, 4%).
  - Accents: Vibrant Blues and Glassmorphism effects.
- **Glassmorphism**: 
  - Backgrounds: `rgba(255, 255, 255, 0.03)` with `backdrop-filter: blur(20px)`.
  - Borders: `rgba(255, 255, 255, 0.08)`.

## Component Structure
- **Modularity**: Code must live in `frontend/src/app/features/[domain]`.
- **Styling**: Prefer local component styles with global variables from `styles.css`.
- **Premium UX**: Ensure smooth transitions, hover effects (transform/glow), and descriptive material icons.
- **SEO**: Every page must have unique titles and semantic HTML tags.

## Best Practices
- Use `ReactiveFormsModule` for complex flows.
- Ensure all interactive elements have unique IDs for testing.
- Follow the "Clean & Responsive" Mobile-First layout.
