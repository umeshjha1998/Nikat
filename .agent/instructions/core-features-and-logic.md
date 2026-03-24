# Core Features & Logic

## 1. Flow of Request

Nikat is focused around the discovery and requesting of services/shops. The basic interaction model is:
1. **Discover**: Users open the site, explore categories, see advertisements, use the search bar, or view a list of local service providers and shops.
2. **Review/Examine**: Users view specific Shop profiles, detailing Services, Prices, Contact Info, and existing Reviews.
3. **Appoint/Book**: The User initiates a request to standard "Book Now". A backend transaction opens an `Appointment` item for the chosen service.
4. **Fulfill**: The Service Provider or Shop reviews and completes the Appointment.
5. **Feedback**: The Customer can leave a Rating and Review for the Service outcome.

## 2. Authentication Flow & Roles
The platform employs JWT-based Authentication via Spring Security. Each user gets a Role.

- **Admin Layer**: Unrestricted access via an Admin Dashboard.
  - Can approve/reject Shop creations.
  - Generates Banners & platform Ads.
  - Can suspend or manipulate Users.
  - Access to Platform Analytics.
- **Provider / Shop Layer**: Access to their specific Shop Profile and Services.
  - Cannot alter global platform settings.
  - Receives emails on new bookings (via Resend API).
  - Can Accept/Reject pending bookings.
- **Customer / User Layer**: Standard users who consume services.
  - Access is limited to discovering, booking, and leaving reviews on their *own* interactions.

## 3. Backend Implementation & Logic Validation
- All pricing/scheduling calculations must be verified by the backend API.
- Re-calculating an appointment's total cost must not rely on the `price` submitted by the frontend payload; it must query the database to prevent direct API spoofing.
- **Single Source of Truth**: The Backend (`backend/`) controllers explicitly handle state validations. If an appointment is double-booked, the Backend must throw an error, which the Frontend (`frontend/`) then gracefully communicates to the User.

## 4. Admin Management (Verification Flow)
- When a Shop signs up, they are internally tagged as `Status: Pending Review`.
- They cannot be fully discovered by customers.
- Admins use the **Approvals Tab** on the dashboard to review their legitimacy, set `isApproved = true`, thus instantly making them publicly visible in search.
