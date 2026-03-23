# Core Features & Business Logic

This document details the core logic and features of the Nikat platform based on the identified components.

## 1. Authentication & User Management
*   **Flows:**
    *   **User/Business/Admin Login:** Dedicated login screens (`user_login/`, `admin_login/`).
    *   **Registration Flow:** Smart category descriptions during registration to guide business owners or users effectively (`registration_flow_smart_category_descriptions/`).
    *   **Verification:** OTP Verification process (`otp_verification/`).
    *   **Password Management:** Forgot password and Reset Password functionalities (`forgot_password/`, `reset_password/`).
*   **Dashboards:** Personalized dashboards for users (`user_dashboard/`), shop owners (`shop_owner_dashboard/`), and service providers (`service_provider_dashboard_time_based_rates/`).

## 2. Discovery & Search
*   **Search Engine:** Refined category search and detailed search results pages (`refined_category_search/`, `search_results/`).
*   **Browsing:** Browse local shops and services (`browse_shops/`, `nikat_homepage/`).

## 3. Commerce & Booking
*   **Shop Products:** Browse and purchase physical or digital products (e.g., "The Golden Crust" feature `shop_product_the_golden_crust/`).
*   **Time-Based Services:** Book services based on time blocks and specific rates (e.g., "The Urban Fade" feature `service_booking_the_urban_fade/`).
*   **Checkout Flow:** A comprehensive process including:
    *   Shopping Cart (`checkout_shopping_cart/`)
    *   Shipping Address Selection (`checkout_shipping_address/`)
    *   Payment Finalization (`checkout_payment_finalize/`)

## 4. Community Engagement
*   **Community Hub:** Interactive features for local discussions and events (`community_hub_interactive_features/`).
*   **Nikat Horizon:** A specialized community feature for deeper engagement (`nikat_horizon/`).
*   **Review & Rating Hub:** A centralized hub for users to share experiences and rate businesses (`review_rating_hub/`).

## 5. Administrative Control Panels
*   **Platform Management:** Dashboards to manage users, shops, services, advertisements, and the community hub (`manage_users_admin/`, `manage_shops_admin/`, `manage_services_admin/`, `manage_advertisements_admin/`, `manage_community_hub_admin/`).
*   **Approvals:** Workflow for managing business approvals (`manage_approvals_admin/`).
*   **Support & Analytics:** Manage support queries, view platform stats, configure global settings, and audit security logs (`manage_support_queries_admin/`, `platform_stats_admin/`, `global_settings_admin_updated_nav/`, `security_logs_admin/`).
*   **Help Center:** Dedicated support center for users and businesses (`help_support_center/`).

## 6. Unified Business Dashboard
*   **Time-Based Rates Management:** A unified dashboard allowing business owners to manage their time-based rates and product catalogs simultaneously (`unified_business_dashboard_time_based_rates/`).
