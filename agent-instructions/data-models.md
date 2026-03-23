# Data Models

This document outlines the conceptual data models and core entities for the Nikat platform based on the identified features.

## 1. Users (Consumers)
*   **Attributes:** ID, Name, Email, Phone Number, Password Hash, Role (User), Profile Picture URL, Default Shipping Address, Saved Payment Methods.
*   **Relationships:** Has many Bookings, Orders, Community Posts, Reviews, and Saved Shops/Services.

## 2. Business Owners (Providers)
*   **Attributes:** ID, Name, Email, Phone Number, Password Hash, Role (Business), Verification Status, Subscription Plan.
*   **Relationships:** Has one or more Shops or Services.

## 3. Administrators
*   **Attributes:** ID, Name, Email, Password Hash, Role (Admin), Permissions Level.
*   **Relationships:** Action logs (Security Logs).

## 4. Shops (Physical/Digital Products)
*   **Attributes:** ID, Owner ID, Name, Description, Category, Location Coordinates, Address, Operating Hours, Average Rating, Featured Status.
*   **Relationships:** Belongs to Business Owner, has many Products, Reviews, and Orders.

## 5. Services (Time-Based Offerings)
*   **Attributes:** ID, Owner ID, Name, Description, Category, Location Coordinates, Address, Operating Hours, Average Rating, Base Rate.
*   **Relationships:** Belongs to Business Owner, has many Service Items (Time-Based Rates), Reviews, and Bookings.

## 6. Products
*   **Attributes:** ID, Shop ID, Name, Description, Price, Image URL, Stock Quantity, SKU.
*   **Relationships:** Belongs to Shop, included in Orders/Order Items.

## 7. Service Items (Time-Based Rates)
*   **Attributes:** ID, Service ID, Name, Description, Duration (Minutes), Price.
*   **Relationships:** Belongs to Service, included in Bookings.

## 8. Orders (Products)
*   **Attributes:** ID, User ID, Shop ID, Total Amount, Status (Pending, Paid, Shipped, Delivered), Shipping Address ID, Payment Details ID, Timestamps (Created, Updated).
*   **Relationships:** Belongs to User and Shop, has many Order Items (Product ID, Quantity, Price).

## 9. Bookings (Services)
*   **Attributes:** ID, User ID, Service ID, Service Item ID, Scheduled Start Time, Scheduled End Time, Total Amount, Status (Pending, Confirmed, Completed, Cancelled), Timestamps.
*   **Relationships:** Belongs to User, Service, and Service Item.

## 10. Community Content
*   **Entities:**
    *   **Posts:** ID, Author ID (User/Business), Content, Image URL, Timestamps.
    *   **Comments:** ID, Post ID, Author ID, Content, Timestamps.
    *   **Likes/Reactions:** ID, Post/Comment ID, User ID, Reaction Type.

## 11. Reviews & Ratings
*   **Attributes:** ID, User ID, Target ID (Shop/Service), Rating (1-5), Comment, Timestamps.
*   **Relationships:** Belongs to User, associated with a Shop or Service.
