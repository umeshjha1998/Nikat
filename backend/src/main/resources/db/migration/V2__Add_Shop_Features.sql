-- V2__Add_Shop_Features.sql

CREATE TABLE shop_photos (
    id UUID PRIMARY KEY,
    shop_id UUID NOT NULL REFERENCES shops(id),
    photo_data TEXT NOT NULL, -- Storing base64 text as requested
    is_main BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE inquiries (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id),
    shop_id UUID REFERENCES shops(id),
    message TEXT NOT NULL,
    reply TEXT,
    status VARCHAR(50) DEFAULT 'OPEN', -- e.g., OPEN, REPLIED, CLOSED
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE appointments (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id),
    shop_id UUID NOT NULL REFERENCES shops(id),
    appointment_time TIMESTAMP NOT NULL,
    service_type VARCHAR(150),
    status VARCHAR(50) DEFAULT 'PENDING', -- e.g., PENDING, CONFIRMED, CANCELLED, COMPLETED
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
