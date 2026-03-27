-- V4__Add_Worker_Assignment.sql
ALTER TABLE appointments ADD COLUMN assigned_worker VARCHAR(200);
ALTER TABLE shops ADD COLUMN worker_names TEXT;
