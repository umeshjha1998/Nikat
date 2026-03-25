-- V3__Add_Shop_Times.sql
-- Add opening and closing time columns to the shops table for more granular control

ALTER TABLE shops
ADD COLUMN IF NOT EXISTS opening_time VARCHAR(10),
ADD COLUMN IF NOT EXISTS closing_time VARCHAR(10);
