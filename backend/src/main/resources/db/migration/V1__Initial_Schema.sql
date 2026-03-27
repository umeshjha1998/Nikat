-- V1__Initial_Schema.sql

CREATE TABLE users (
    id UUID PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100),
    phone VARCHAR(20) NOT NULL UNIQUE,
    email VARCHAR(150) NOT NULL UNIQUE,
    gender VARCHAR(20),
    address TEXT,
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
    opening_hours VARCHAR(255),
    opening_time VARCHAR(10),
    closing_time VARCHAR(10),
    phone_number VARCHAR(20),
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    our_story TEXT,
    amenities TEXT,
    daily_hours TEXT,
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
    post_type VARCHAR(50) NOT NULL,
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

INSERT INTO categories (id, name, description, is_service_category, is_shop_category) VALUES
(gen_random_uuid(), 'AC/Fridge/Geyser Repair', 'Repair for AC, fridge, and geysers', TRUE, FALSE),
(gen_random_uuid(), 'Appliance Repair', 'Repair for AC, fridge, and geysers', TRUE, FALSE),
(gen_random_uuid(), 'At-Home Beautician', 'Professional beauty services at home', TRUE, FALSE),
(gen_random_uuid(), 'Ayurvedic Store', 'Ayurvedic products and medicines', FALSE, TRUE),
(gen_random_uuid(), 'Bakery', 'Pastries, cakes, donuts, and sandwiches', FALSE, TRUE),
(gen_random_uuid(), 'Barber Shop', 'Haircuts, shaving, and grooming services', TRUE, TRUE),
(gen_random_uuid(), 'Beauty Parlour', 'Facials, threading, hand/leg mehndi, etc.', TRUE, TRUE),
(gen_random_uuid(), 'Carpenter Service', 'Furniture repair services at home/office', TRUE, FALSE),
(gen_random_uuid(), 'Carpenter Shop', 'Wooden furniture sales and repairs', TRUE, TRUE),
(gen_random_uuid(), 'Chemist/Pharmacy', 'Various medicines and health supplies', FALSE, TRUE),
(gen_random_uuid(), 'Computer/Laptop Repair', 'Sales and repair for computers/laptops', TRUE, TRUE),
(gen_random_uuid(), 'Cook', 'Home cooking services for various cuisines', TRUE, FALSE),
(gen_random_uuid(), 'Cyber Cafe', 'Form filling, digital services, and browsing', TRUE, TRUE),
(gen_random_uuid(), 'Dairy Shop', 'Milk, paneer, curd, ghee, and delivery', TRUE, TRUE),
(gen_random_uuid(), 'Dentist Clinic', 'Dental healthcare and surgery', TRUE, TRUE),
(gen_random_uuid(), 'Diagnostic Lab', 'X-ray, ultrasound, and blood tests', TRUE, TRUE),
(gen_random_uuid(), 'Doctor Clinic', 'Medical consultation and treatment', TRUE, TRUE),
(gen_random_uuid(), 'Dairy & Milk Delivery', 'Milk delivery and dairy products shop', TRUE, TRUE),
(gen_random_uuid(), 'Electrical Repair Shop', 'Repair for fans, coolers, motors, etc.', TRUE, TRUE),
(gen_random_uuid(), 'Electrician', 'Wiring, power sockets, and appliance repair', TRUE, TRUE),
(gen_random_uuid(), 'Electronic Repairs', 'Mobile, laptop, and appliance repair services', TRUE, TRUE),
(gen_random_uuid(), 'Event Decoration/Rental', 'Tent, chair, and utensil rentals for events', TRUE, TRUE),
(gen_random_uuid(), 'Flower Delivery', 'Fresh flowers for daily or event use', TRUE, FALSE),
(gen_random_uuid(), 'Footwear & Repair', 'Sales and repair for shoes/slippers', TRUE, TRUE),
(gen_random_uuid(), 'Game Console Repair', 'Console repair and online game sales', TRUE, TRUE),
(gen_random_uuid(), 'Garbage Collection', 'Waste management and disposal services', TRUE, FALSE),
(gen_random_uuid(), 'Gardener', 'Plant sales and installation services', TRUE, TRUE),
(gen_random_uuid(), 'Gas Stove Repair', 'Repair for stoves, cookers, and pans', TRUE, FALSE),
(gen_random_uuid(), 'Gents Tailor', 'Sewing for men’s apparel and fitting', TRUE, FALSE),
(gen_random_uuid(), 'Gents Wear', 'Daily wear garments for men', FALSE, TRUE),
(gen_random_uuid(), 'Glass & Mirror Shop', 'Sales and installation of mirrors/glass', TRUE, TRUE),
(gen_random_uuid(), 'Grocery Store', 'Daily-use items and cooking essentials', FALSE, TRUE),
(gen_random_uuid(), 'Gym', 'Fitness and strength training center', TRUE, FALSE),
(gen_random_uuid(), 'Hardware Shop', 'Construction materials and household tools', FALSE, TRUE),
(gen_random_uuid(), 'Home Appliances Shop', 'Sales of ACs, coolers, and home gadgets', FALSE, TRUE),
(gen_random_uuid(), 'House Help/Maid', 'Cleaning, utensils, mopping, and sweeping', TRUE, FALSE),
(gen_random_uuid(), 'Ice Cream Shop', 'Bars, cones, tubs, and buckets', FALSE, TRUE),
(gen_random_uuid(), 'Iron Welding Shop', 'Creation and repair of iron structures', TRUE, TRUE),
(gen_random_uuid(), 'Ironsmith', 'Repair and welding for iron structures', TRUE, FALSE),
(gen_random_uuid(), 'Jewellery Shop', 'Gold/silver jewellery and repair services', TRUE, TRUE),
(gen_random_uuid(), 'Juice Center', 'Sugarcane, pomegranate, and seasonal juices', FALSE, TRUE),
(gen_random_uuid(), 'Kids Wear', 'Daily wear garments for children', FALSE, TRUE),
(gen_random_uuid(), 'Ladies Tailor', 'Sewing for blouses, suits, and sarees', TRUE, TRUE),
(gen_random_uuid(), 'Ladies Wear', 'Suits, salwar, and daily wear garments', FALSE, TRUE),
(gen_random_uuid(), 'Mason', 'Construction and masonry services', TRUE, FALSE),
(gen_random_uuid(), 'Meat & Poultry Shop', 'Fresh chicken, meat, and fish cuts', FALSE, TRUE),
(gen_random_uuid(), 'Milk Delivery', 'Fresh milk delivered to your doorstep', TRUE, FALSE),
(gen_random_uuid(), 'Mobile & Accessories', 'New mobile phones and accessories', FALSE, TRUE),
(gen_random_uuid(), 'Mobile Repair', 'Software and hardware repair for mobiles', TRUE, TRUE),
(gen_random_uuid(), 'Nanny', 'Childcare and babysitting services', TRUE, FALSE),
(gen_random_uuid(), 'Newspaper Delivery', 'Daily newspaper subscription and delivery', TRUE, FALSE),
(gen_random_uuid(), 'Nursing Service', 'Professional nursing care at home', TRUE, FALSE),
(gen_random_uuid(), 'Optician', 'Vision care and stylish eyewear', TRUE, TRUE),
(gen_random_uuid(), 'Paan Shop', 'Betel leaves, mouth fresheners, and tobacco', FALSE, TRUE),
(gen_random_uuid(), 'Packers & Movers', 'Relocation and packaging services', TRUE, FALSE),
(gen_random_uuid(), 'Painter', 'Home painting and contract jobs', TRUE, FALSE),
(gen_random_uuid(), 'Photography Studio', 'Portraits and event photography services', TRUE, TRUE),
(gen_random_uuid(), 'Physiotherapy', 'Rehabilitation and physical therapy', TRUE, FALSE),
(gen_random_uuid(), 'Plumber', 'Plumbing fittings, faucets, and motor issues', TRUE, TRUE),
(gen_random_uuid(), 'Print & Photocopy', 'Printing, lamination, and photocopying', TRUE, TRUE),
(gen_random_uuid(), 'Property Dealer/Real Estate', 'Property dealing, renting, and buying', TRUE, FALSE),
(gen_random_uuid(), 'Raw Cloth Shop', 'Sales of raw fabric and cloth materials', FALSE, TRUE),
(gen_random_uuid(), 'Religious Store', 'Idols, incense sticks, and worship items', FALSE, TRUE),
(gen_random_uuid(), 'RO & Water Purifier', 'Filters, parts, and maintenance services', TRUE, TRUE),
(gen_random_uuid(), 'Saree Shop', 'Sarees, blouses, and innerwear', FALSE, TRUE),
(gen_random_uuid(), 'School', 'Educational institutions up to 12th standard', TRUE, FALSE),
(gen_random_uuid(), 'Sewing Machine Repair', 'Repair services for sewing machines', TRUE, FALSE),
(gen_random_uuid(), 'Sewage & Drainage', 'Repair for gutters and drainage systems', TRUE, FALSE),
(gen_random_uuid(), 'Snacks & Fast Food', 'Momo, samosa, tikki, chowmein, etc.', FALSE, TRUE),
(gen_random_uuid(), 'Sports Store', 'Bats, balls, and equipment repairs', TRUE, TRUE),
(gen_random_uuid(), 'Stationery Shop', 'Paper, pens, notebooks, and book binding', TRUE, TRUE),
(gen_random_uuid(), 'Sweets & Snacks', 'Indian sweets and fried snacks like samosa', FALSE, TRUE),
(gen_random_uuid(), 'TV Repair', 'Repair services for televisions', TRUE, TRUE),
(gen_random_uuid(), 'Tuition & Coaching', 'Private tutelage for various subjects', TRUE, FALSE),
(gen_random_uuid(), 'Watch/Clock Repair', 'Repair for watches and clocks', TRUE, TRUE),
(gen_random_uuid(), 'Wi-Fi & Internet', 'Broadband plans, routers, and OTT services', TRUE, FALSE),
(gen_random_uuid(), 'Yoga Classes', 'Fitness and meditation training', TRUE, FALSE),
(gen_random_uuid(), 'Zipper/Chain Repair', 'Repair for jackets, pants, bags, etc.', TRUE, FALSE);
