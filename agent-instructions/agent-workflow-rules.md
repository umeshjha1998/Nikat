# Agent Workflow Rules

This document outlines the standard operating procedures and rules for AI agents modifying the Nikat codebase.

## 1. Information Gathering (Read First)
*   **Mandatory Context:** Before generating code, you must read the relevant architectural, data model, and UI/UX guidelines in this `agent-instructions/` directory.
*   **Code Discovery:** Use tools like `list_files`, `grep`, and `read_file` to locate existing components (e.g., buttons, forms, layouts) before writing new ones from scratch. Avoid duplicating logic.
*   **Artifacts:** Do not edit build artifacts (e.g., files in `dist/`, `build/`). Only modify source files.

## 2. Planning and Execution
*   **Explicit Plans:** Always create a numbered execution plan (`set_plan`) before modifying files.
*   **Atomic Changes:** Make focused, incremental changes. If a task requires changes across the frontend, backend, and database, break it down logically.
*   **Verification:** After creating, editing, or deleting a file, immediately use a read-only tool (e.g., `read_file`, `cat`) to verify the change was applied correctly and the syntax is valid.
*   **Pre-Commit:** Every plan must end with a step to run tests/linting (`pre_commit_instructions`) before submitting.

## 3. Coding Standards
*   **Styling (Tailwind):** Follow the guidelines in `ui-ux-guidelines.md`. Use the predefined semantic colors (e.g., `bg-primary`, `text-on-surface`) instead of hardcoding hex values whenever possible.
*   **Responsive Design:** Ensure all new UI components are responsive. Test logic conceptually across mobile (`< 768px`) and desktop breakpoints.
*   **Accessibility:** Use semantic HTML tags (`<nav>`, `<main>`, `<article>`). Ensure buttons have descriptive text or `aria-labels` if icon-only.
*   **Error Handling:** Implement robust error handling for asynchronous operations (e.g., API calls, form submissions).

## 4. Documentation Maintenance
*   If your task involves creating a new core entity (e.g., adding "Subscriptions"), you MUST update `data-models.md`.
*   If you introduce a new major architectural pattern or library, you MUST update `tech-stack-and-architecture.md`.

## 5. Handling Ambiguity
*   If a user request contradicts the established guidelines in this folder, prioritize the user's explicit request but note the deviation in your response.
*   If a request is fundamentally unclear or requires a major architectural decision not covered in these docs, use `request_user_input` to clarify before proceeding.
