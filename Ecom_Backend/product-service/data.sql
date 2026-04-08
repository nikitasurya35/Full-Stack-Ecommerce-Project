-- CATEGORY
-- Top level categories
INSERT INTO Category (id, parent_id, category_name, slug, description, image_url, sort_order, is_active, created_at, updated_at)
VALUES
    ('a1b2c3d4-0001-0001-0001-000000000001', NULL, 'Electronics', 'electronics', 'All electronic devices and gadgets', '', 1, true, NOW(), NOW()),
    ('a1b2c3d4-0001-0001-0001-000000000002', NULL, 'Audio', 'audio', 'Headphones, speakers and audio accessories', '', 2, true, NOW(), NOW()),
    ('a1b2c3d4-0001-0001-0001-000000000003', NULL, 'Lighting', 'lighting', 'Desk lamps and LED strips', '', 3, true, NOW(), NOW()),
    ('a1b2c3d4-0001-0001-0001-000000000004', NULL, 'Accessories', 'accessories', 'Laptop stands, phone stands and more', '', 4, true, NOW(), NOW()),
    ('a1b2c3d4-0001-0001-0001-000000000005', NULL, 'Cables', 'cables', 'USB, HDMI and charging cables', '', 5, true, NOW(), NOW()),
    ('a1b2c3d4-0001-0001-0001-000000000006', NULL, 'Peripherals', 'peripherals', 'Keyboards, mice and more', '', 6, true, NOW(), NOW());

-- Child categories
INSERT INTO Category (id, parent_id, category_name, slug, description, image_url, sort_order, is_active, created_at, updated_at)
VALUES
    ('a1b2c3d4-0002-0002-0002-000000000001', 'a1b2c3d4-0001-0001-0001-000000000002', 'Earbuds', 'earbuds', 'Wireless and wired earbuds', '', 1, true, NOW(), NOW()),
    ('a1b2c3d4-0002-0002-0002-000000000002', 'a1b2c3d4-0001-0001-0001-000000000002', 'Headphones', 'headphones', 'Over-ear and on-ear headphones', '', 2, true, NOW(), NOW()),
    ('a1b2c3d4-0002-0002-0002-000000000003', 'a1b2c3d4-0001-0001-0001-000000000003', 'Desk Lamps', 'desk-lamps', 'Smart and adjustable desk lamps', '', 1, true, NOW(), NOW()),
    ('a1b2c3d4-0002-0002-0002-000000000004', 'a1b2c3d4-0001-0001-0001-000000000004', 'Laptop Stands', 'laptop-stands', 'Aluminium and plastic laptop stands', '', 1, true, NOW(), NOW()),
    ('a1b2c3d4-0002-0002-0002-000000000005', 'a1b2c3d4-0001-0001-0001-000000000006', 'Keyboards', 'keyboards', 'Mechanical and membrane keyboards', '', 1, true, NOW(), NOW());


--------------------------------------------------------------------------------------

--PRODUCT
INSERT INTO Product (id, category_id, product_name, slug, description, sku, price, compare_price, image_url, images_json, status, is_featured, created_at, updated_at)
VALUES
    (
        'b2c3d4e5-0001-0001-0001-000000000001',
        'a1b2c3d4-0002-0002-0002-000000000001', -- Earbuds category
        'Wireless Earbuds Pro',
        'wireless-earbuds-pro',
        'Premium wireless earbuds with active noise cancellation',
        'SKU-1021',
        849.00,
        1299.00,
        'https://example.com/products/earbuds-pro.jpg',
        '["https://example.com/products/earbuds-pro-1.jpg","https://example.com/products/earbuds-pro-2.jpg"]',
        'ACTIVE',
        true,
        NOW(), NOW()
    ),
    (
        'b2c3d4e5-0001-0001-0001-000000000002',
        'a1b2c3d4-0002-0002-0002-000000000005', -- Keyboards category
        'Mechanical Keyboard TKL',
        'mechanical-keyboard-tkl',
        'Tenkeyless mechanical keyboard with RGB backlight',
        'SKU-1033',
        8500.00,
        NULL,
        'https://example.com/products/keyboard-tkl.jpg',
        '["https://example.com/products/keyboard-tkl-1.jpg","https://example.com/products/keyboard-tkl-2.jpg"]',
        'ACTIVE',
        false,
        NOW(), NOW()
    ),
    (
        'b2c3d4e5-0001-0001-0001-000000000003',
        'a1b2c3d4-0001-0001-0001-000000000004', -- Accessories category
        'USB-C Hub 7-in-1',
        'usb-c-hub-7-in-1',
        '7 port USB-C hub with HDMI, USB 3.0 and SD card reader',
        'SKU-1044',
        799.00,
        999.00,
        'https://example.com/products/usb-c-hub.jpg',
        '["https://example.com/products/usb-c-hub-1.jpg"]',
        'ACTIVE',
        false,
        NOW(), NOW()
    ),
    (
        'b2c3d4e5-0001-0001-0001-000000000004',
        'a1b2c3d4-0002-0002-0002-000000000003', -- Desk Lamps category
        'Smart LED Desk Lamp',
        'smart-led-desk-lamp',
        'Touch control LED desk lamp with USB charging port',
        'SKU-1055',
        600.00,
        850.00,
        'https://example.com/products/desk-lamp.jpg',
        '["https://example.com/products/desk-lamp-1.jpg","https://example.com/products/desk-lamp-2.jpg"]',
        'ACTIVE',
        true,
        NOW(), NOW()
    ),
    (
        'b2c3d4e5-0001-0001-0001-000000000005',
        'a1b2c3d4-0002-0002-0002-000000000004', -- Laptop Stands category
        'Laptop Stand Aluminium',
        'laptop-stand-aluminium',
        'Adjustable aluminium laptop stand with anti-slip base',
        'SKU-1067',
        699.00,
        NULL,
        'https://example.com/products/laptop-stand.jpg',
        '["https://example.com/products/laptop-stand-1.jpg"]',
        'ACTIVE',
        false,
        NOW(), NOW()
    ),
    (
        'b2c3d4e5-0001-0001-0001-000000000006',
        'a1b2c3d4-0001-0001-0001-000000000001', -- Electronics category
        'Webcam 4K Pro',
        'webcam-4k-pro',
        'Ultra HD 4K webcam with built-in microphone',
        'SKU-1078',
        7000.00,
        NULL,
        'https://example.com/products/webcam-4k.jpg',
        '["https://example.com/products/webcam-4k-1.jpg","https://example.com/products/webcam-4k-2.jpg"]',
        'ACTIVE',
        true,
        NOW(), NOW()
    );



------------------------------------------------------------------------------------------


--INVENTORY

INSERT INTO Inventory (id, product_id, quantity, reserved_quantity, reorder_point, reorder_quantity, warehouse_location, last_updated)
VALUES
    (
        'c3d4e5f6-0001-0001-0001-000000000001',
        'b2c3d4e5-0001-0001-0001-000000000001', -- Wireless Earbuds Pro
        8,   -- quantity
        2,   -- reserved_quantity
        50,  -- reorder_point
        100, -- reorder_quantity
        'Rack A-01',
        NOW()
    ),
    (
        'c3d4e5f6-0001-0001-0001-000000000002',
        'b2c3d4e5-0001-0001-0001-000000000002', -- Mechanical Keyboard
        4,
        0,
        20,
        50,
        'Rack B-03',
        NOW()
    ),
    (
        'c3d4e5f6-0001-0001-0001-000000000003',
        'b2c3d4e5-0001-0001-0001-000000000003', -- USB-C Hub
        23,
        3,
        30,
        60,
        'Rack A-05',
        NOW()
    ),
    (
        'c3d4e5f6-0001-0001-0001-000000000004',
        'b2c3d4e5-0001-0001-0001-000000000004', -- Smart LED Desk Lamp
        2,
        0,
        15,
        40,
        'Rack C-02',
        NOW()
    ),
    (
        'c3d4e5f6-0001-0001-0001-000000000005',
        'b2c3d4e5-0001-0001-0001-000000000005', -- Laptop Stand
        142,
        5,
        30,
        80,
        'Rack B-07',
        NOW()
    ),
    (
        'c3d4e5f6-0001-0001-0001-000000000006',
        'b2c3d4e5-0001-0001-0001-000000000006', -- Webcam 4K Pro
        88,
        10,
        20,
        50,
        'Rack A-09',
        NOW()
    );