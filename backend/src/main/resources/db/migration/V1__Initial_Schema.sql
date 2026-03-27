-- V1__Initial_Schema.sql

CREATE TABLE users (
    id UUID PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100),
    phone VARCHAR(20) NOT NULL UNIQUE,
    email VARCHAR(150) NOT NULL UNIQUE,
    gender VARCHAR(20),
    address TEXT,
    location_coordinates POINT,
    password_hash VARCHAR(255) NOT NULL,
    photo_url VARCHAR(255),
    aadhar_number VARCHAR(50),
    pan_number VARCHAR(20),
    passport_number VARCHAR(50),
    role VARCHAR(50) DEFAULT 'USER',
    is_shop_owner BOOLEAN DEFAULT FALSE,
    is_service_provider BOOLEAN DEFAULT FALSE,
    status VARCHAR(50) DEFAULT 'PENDING_VERIFICATION',
    email_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categories (
    id UUID PRIMARY KEY,
    name VARCHAR(150) NOT NULL UNIQUE,
    description TEXT,
    is_service_category BOOLEAN DEFAULT FALSE,
    is_shop_category BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE shops (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id),
    name VARCHAR(200) NOT NULL,
    category_id UUID REFERENCES categories(id),
    worker_count INT,
    worker_names TEXT,
    description TEXT,
    address TEXT,
    location_coordinates POINT,
    opening_hours VARCHAR(255),
    opening_time VARCHAR(10),
    closing_time VARCHAR(10),
    status VARCHAR(50) DEFAULT 'PENDING_VERIFICATION',
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE services (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id),
    name VARCHAR(200) NOT NULL,
    category_id UUID REFERENCES categories(id),
    description TEXT,
    service_area TEXT,
    start_time TIME,
    end_time TIME,
    base_charge DECIMAL(10, 2),
    status VARCHAR(50) DEFAULT 'PENDING_VERIFICATION',
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
    id UUID PRIMARY KEY,
    shop_id UUID NOT NULL REFERENCES shops(id),
    name VARCHAR(200) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2),
    is_available BOOLEAN DEFAULT TRUE,
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE reviews (
    id UUID PRIMARY KEY,
    reviewer_id UUID NOT NULL REFERENCES users(id),
    shop_id UUID REFERENCES shops(id),
    service_id UUID REFERENCES services(id),
    rating INT CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    status VARCHAR(50) DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE community_posts (
    id UUID PRIMARY KEY,
    author_id UUID NOT NULL REFERENCES users(id),
    post_type VARCHAR(50) NOT NULL, -- e.g., CAB_POOL, GAMES, MARKETPLACE, ISSUE, HOSTED_ROOM
    title VARCHAR(255) NOT NULL,
    content TEXT,
    location_area VARCHAR(150),
    status VARCHAR(50) DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE advertisements (
    id UUID PRIMARY KEY,
    title VARCHAR(200),
    image_url VARCHAR(255) NOT NULL,
    target_link VARCHAR(255),
    display_order INT,
    status VARCHAR(50) DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE shop_photos (
    id UUID PRIMARY KEY,
    shop_id UUID NOT NULL REFERENCES shops(id),
    photo_data TEXT NOT NULL, 
    is_main BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE inquiries (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id),
    shop_id UUID REFERENCES shops(id),
    message TEXT NOT NULL,
    reply TEXT,
    status VARCHAR(50) DEFAULT 'OPEN', 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE appointments (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id),
    shop_id UUID NOT NULL REFERENCES shops(id),
    appointment_time TIMESTAMP NOT NULL,
    service_type VARCHAR(150),
    status VARCHAR(50) DEFAULT 'PENDING', 
    notes TEXT,
    assigned_worker VARCHAR(200),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
