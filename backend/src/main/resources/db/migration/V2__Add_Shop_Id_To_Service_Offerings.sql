-- V2__Add_Shop_Id_To_Service_Offerings.sql

-- Add `shop_id` column to service_offerings
ALTER TABLE service_offerings 
ADD COLUMN shop_id VARCHAR(50);

-- Make `service_id` nullable 
ALTER TABLE service_offerings 
ALTER COLUMN service_id DROP NOT NULL;

-- Optional: Since appointments can now be for Services exclusively, make shop_id nullable in appointments
ALTER TABLE appointments 
ALTER COLUMN shop_id DROP NOT NULL;
