-- ============================================================================
-- INSERT STATEMENTS FOR STOCKFLOW ECOMMERCE DATABASE
-- ============================================================================

-- ── CATEGORY TABLE ──────────────────────────────────────────────────────────
-- 6 main categories matching the dashboard

INSERT INTO Category (id, parent_id, category_name, slug, description, image_url, sort_order, is_active, created_at, updated_at)
VALUES
    ('550e8400-e29b-41d4-a716-446655440001', NULL, 'Electronics', 'electronics', 'Laptops, tablets, and electronic devices', 'https://img.stockflow.in/cat/electronics.jpg', 1, true, NOW(), NOW()),
    ('550e8400-e29b-41d4-a716-446655440002', NULL, 'Audio', 'audio', 'Headphones, earbuds, speakers, and audio equipment', 'https://img.stockflow.in/cat/audio.jpg', 2, true, NOW(), NOW()),
    ('550e8400-e29b-41d4-a716-446655440003', NULL, 'Accessories', 'accessories', 'Tech accessories and peripherals', 'https://img.stockflow.in/cat/accessories.jpg', 3, true, NOW(), NOW()),
    ('550e8400-e29b-41d4-a716-446655440004', NULL, 'Lighting', 'lighting', 'LED lights, desk lamps, and smart lighting', 'https://img.stockflow.in/cat/lighting.jpg', 4, true, NOW(), NOW()),
    ('550e8400-e29b-41d4-a716-446655440005', NULL, 'Cables', 'cables', 'USB cables, HDMI, charging cables', 'https://img.stockflow.in/cat/cables.jpg', 5, true, NOW(), NOW()),
    ('550e8400-e29b-41d4-a716-446655440006', NULL, 'Peripherals', 'peripherals', 'Keyboards, mice, webcams, and input devices', 'https://img.stockflow.in/cat/peripherals.jpg', 6, true, NOW(), NOW());


-- ── PRODUCT TABLE ───────────────────────────────────────────────────────────
-- 20 products across all categories with varied pricing

INSERT INTO Product (id, category_id, product_name, slug, description, sku, price, compare_price, image_url, images_json, status, is_featured, created_at, updated_at)
VALUES
    -- AUDIO (5 products)
    ('660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', 'Wireless Earbuds Pro', 'wireless-earbuds-pro', 'Premium wireless earbuds with active noise cancellation, 24-hour battery life, and premium sound quality', 'SKU-1021', 849.00, 1299.00, 'https://img.stockflow.in/prod/earbuds-pro.jpg', '["https://img.stockflow.in/prod/earbuds-pro-1.jpg","https://img.stockflow.in/prod/earbuds-pro-2.jpg"]', 'ACTIVE', true, NOW() - INTERVAL '10 days', NOW()),

    ('660e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440002', 'Noise-Cancel Headphones', 'noise-cancel-headphones', 'Over-ear headphones with industry-leading noise cancellation and 40-hour battery', 'SKU-1112', 3499.00, 4999.00, 'https://img.stockflow.in/prod/headphones.jpg', NULL, 'ACTIVE', true, NOW() - INTERVAL '5 days', NOW()),

    ('660e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440002', 'Bluetooth Speaker Mini', 'bluetooth-speaker-mini', 'Compact portable speaker with 360-degree sound and waterproof design', 'SKU-1101', 1299.00, NULL, 'https://img.stockflow.in/prod/speaker-mini.jpg', NULL, 'ACTIVE', false, NOW() - INTERVAL '20 days', NOW()),

    ('660e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440002', 'Studio Monitor Speakers', 'studio-monitor-speakers', 'Professional-grade studio monitors for music production and audiophiles', 'SKU-1118', 12500.00, NULL, 'https://img.stockflow.in/prod/studio-monitors.jpg', NULL, 'ACTIVE', false, NOW() - INTERVAL '30 days', NOW()),

    ('660e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440002', 'Wired Gaming Headset', 'wired-gaming-headset', '7.1 surround sound gaming headset with RGB lighting and noise-cancelling mic', 'SKU-1125', 2199.00, 2999.00, 'https://img.stockflow.in/prod/gaming-headset.jpg', NULL, 'OUT_OF_STOCK', false, NOW() - INTERVAL '15 days', NOW()),

    -- PERIPHERALS (4 products)
    ('660e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440006', 'Mechanical Keyboard TKL', 'mechanical-keyboard-tkl', 'Tenkeyless mechanical keyboard with hot-swappable switches and RGB backlighting', 'SKU-1033', 8500.00, NULL, 'https://img.stockflow.in/prod/keyboard-tkl.jpg', NULL, 'ACTIVE', true, NOW() - INTERVAL '3 days', NOW()),

    ('660e8400-e29b-41d4-a716-446655440007', '550e8400-e29b-41d4-a716-446655440006', 'Webcam 4K Pro', 'webcam-4k-pro', '4K webcam with auto-focus, HDR, and built-in dual microphones for streaming', 'SKU-1078', 7000.00, NULL, 'https://img.stockflow.in/prod/webcam-4k.jpg', NULL, 'ACTIVE', false, NOW() - INTERVAL '12 days', NOW()),

    ('660e8400-e29b-41d4-a716-446655440008', '550e8400-e29b-41d4-a716-446655440006', 'Wireless Gaming Mouse', 'wireless-gaming-mouse', 'Ultra-lightweight wireless mouse with 20,000 DPI sensor and 70-hour battery', 'SKU-1082', 4299.00, NULL, 'https://img.stockflow.in/prod/gaming-mouse.jpg', NULL, 'ACTIVE', false, NOW() - INTERVAL '18 days', NOW()),

    ('660e8400-e29b-41d4-a716-446655440009', '550e8400-e29b-41d4-a716-446655440006', 'Ergonomic Trackball', 'ergonomic-trackball', 'Wireless trackball with ergonomic design to reduce wrist strain', 'SKU-1090', 3599.00, NULL, 'https://img.stockflow.in/prod/trackball.jpg', NULL, 'DISCONTINUED', false, NOW() - INTERVAL '45 days', NOW()),

    -- ACCESSORIES (5 products)
    ('660e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440003', 'USB-C Hub 7-in-1', 'usb-c-hub-7-in-1', '7-port USB-C hub with HDMI, SD card reader, and 100W power delivery', 'SKU-1044', 799.00, 999.00, 'https://img.stockflow.in/prod/usb-hub.jpg', NULL, 'ACTIVE', true, NOW() - INTERVAL '8 days', NOW()),

    ('660e8400-e29b-41d4-a716-446655440011', '550e8400-e29b-41d4-a716-446655440003', 'Laptop Stand Aluminium', 'laptop-stand-aluminium', 'Adjustable aluminum laptop stand with ventilation for improved ergonomics', 'SKU-1067', 699.00, NULL, 'https://img.stockflow.in/prod/laptop-stand.jpg', NULL, 'ACTIVE', false, NOW() - INTERVAL '22 days', NOW()),

    ('660e8400-e29b-41d4-a716-446655440012', '550e8400-e29b-41d4-a716-446655440003', 'Phone Stand Adjustable', 'phone-stand-adjustable', 'Multi-angle adjustable phone stand compatible with all devices', 'SKU-1060', 299.00, NULL, 'https://img.stockflow.in/prod/phone-stand.jpg', NULL, 'ACTIVE', false, NOW() - INTERVAL '25 days', NOW()),

    ('660e8400-e29b-41d4-a716-446655440013', '550e8400-e29b-41d4-a716-446655440003', 'Laptop Sleeve 15-inch', 'laptop-sleeve-15-inch', 'Waterproof laptop sleeve with extra compartments for accessories', 'SKU-1097', 899.00, NULL, 'https://img.stockflow.in/prod/laptop-sleeve.jpg', NULL, 'ACTIVE', false, NOW() - INTERVAL '35 days', NOW()),

    ('660e8400-e29b-41d4-a716-446655440014', '550e8400-e29b-41d4-a716-446655440003', 'Cable Organizer Kit', 'cable-organizer-kit', 'Premium cable management kit with velcro ties and adhesive clips', 'SKU-1104', 249.00, NULL, 'https://img.stockflow.in/prod/cable-organizer.jpg', NULL, 'ACTIVE', false, NOW() - INTERVAL '40 days', NOW()),

    -- LIGHTING (3 products)
    ('660e8400-e29b-41d4-a716-446655440015', '550e8400-e29b-41d4-a716-446655440004', 'Smart LED Desk Lamp', 'smart-led-desk-lamp', 'App-controlled desk lamp with adjustable brightness and color temperature', 'SKU-1055', 600.00, 850.00, 'https://img.stockflow.in/prod/desk-lamp.jpg', NULL, 'ACTIVE', true, NOW() - INTERVAL '6 days', NOW()),

    ('660e8400-e29b-41d4-a716-446655440016', '550e8400-e29b-41d4-a716-446655440004', 'LED Strip RGB 5m', 'led-strip-rgb-5m', '5-meter RGB LED strip with remote control and 16 million colors', 'SKU-1120', 1299.00, NULL, 'https://img.stockflow.in/prod/led-strip.jpg', NULL, 'ACTIVE', false, NOW() - INTERVAL '28 days', NOW()),

    ('660e8400-e29b-41d4-a716-446655440017', '550e8400-e29b-41d4-a716-446655440004', 'Monitor Light Bar', 'monitor-light-bar', 'Space-saving monitor-mounted light bar with auto-dimming', 'SKU-1128', 2499.00, NULL, 'https://img.stockflow.in/prod/monitor-light.jpg', NULL, 'ACTIVE', false, NOW() - INTERVAL '14 days', NOW()),

    -- CABLES (3 products)
    ('660e8400-e29b-41d4-a716-446655440018', '550e8400-e29b-41d4-a716-446655440005', 'USB-A to USB-C Cable', 'usb-a-to-usb-c-cable', 'Braided 2-meter USB-A to USB-C fast charging cable', 'SKU-1095', 199.00, NULL, 'https://img.stockflow.in/prod/usb-c-cable.jpg', NULL, 'ACTIVE', false, NOW() - INTERVAL '50 days', NOW()),

    ('660e8400-e29b-41d4-a716-446655440019', '550e8400-e29b-41d4-a716-446655440005', 'HDMI 2.1 Cable 2m', 'hdmi-2-1-cable-2m', '8K HDMI 2.1 cable with dynamic HDR and 48Gbps bandwidth', 'SKU-1089', 599.00, NULL, 'https://img.stockflow.in/prod/hdmi-cable.jpg', NULL, 'ACTIVE', false, NOW() - INTERVAL '32 days', NOW()),

    ('660e8400-e29b-41d4-a716-446655440020', '550e8400-e29b-41d4-a716-446655440005', 'Lightning to USB-C Cable', 'lightning-to-usb-c-cable', 'MFi-certified 1-meter lightning to USB-C cable for fast charging', 'SKU-1102', 799.00, 999.00, 'https://img.stockflow.in/prod/lightning-cable.jpg', NULL, 'ACTIVE', false, NOW() - INTERVAL '16 days', NOW());


-- ── INVENTORY TABLE ─────────────────────────────────────────────────────────
-- Inventory records with OUT_OF_STOCK and IN_STOCK scenarios

INSERT INTO Inventory (id, product_id, quantity, reserved_quantity, reorder_point, reorder_quantity, warehouse_location, last_updated)
VALUES
    -- CRITICAL LOW STOCK (matching dashboard alerts)
    ('770e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440001', 8, 0, 50, 100, 'Rack A-12', NOW()),     -- Wireless Earbuds Pro - CRITICAL
    ('770e8400-e29b-41d4-a716-446655440006', '660e8400-e29b-41d4-a716-446655440006', 4, 0, 20, 50, 'Rack C-08', NOW()),      -- Mechanical Keyboard - CRITICAL
    ('770e8400-e29b-41d4-a716-446655440015', '660e8400-e29b-41d4-a716-446655440015', 2, 0, 15, 30, 'Rack D-22', NOW()),     -- Smart LED Desk Lamp - CRITICAL

    -- LOW STOCK (approaching reorder)
    ('770e8400-e29b-41d4-a716-446655440010', '660e8400-e29b-41d4-a716-446655440010', 23, 0, 30, 60, 'Rack B-05', NOW()),    -- USB-C Hub - LOW
    ('770e8400-e29b-41d4-a716-446655440012', '660e8400-e29b-41d4-a716-446655440012', 18, 0, 25, 50, 'Rack B-14', NOW()),    -- Phone Stand - LOW

    -- OUT OF STOCK
    ('770e8400-e29b-41d4-a716-446655440005', '660e8400-e29b-41d4-a716-446655440005', 0, 0, 20, 50, 'Rack A-18', NOW()),     -- Gaming Headset - OUT OF STOCK
    ('770e8400-e29b-41d4-a716-446655440009', '660e8400-e29b-41d4-a716-446655440009', 0, 0, 15, 30, 'Rack C-22', NOW()),     -- Ergonomic Trackball - OUT OF STOCK (discontinued)

    -- HEALTHY STOCK LEVELS
    ('770e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440002', 34, 0, 20, 40, 'Rack A-15', NOW()),    -- Noise-Cancel Headphones
    ('770e8400-e29b-41d4-a716-446655440003', '660e8400-e29b-41d4-a716-446655440003', 56, 0, 25, 50, 'Rack A-20', NOW()),    -- Bluetooth Speaker Mini
    ('770e8400-e29b-41d4-a716-446655440004', '660e8400-e29b-41d4-a716-446655440004', 12, 0, 8, 15, 'Rack A-25', NOW()),     -- Studio Monitor Speakers
    ('770e8400-e29b-41d4-a716-446655440007', '660e8400-e29b-41d4-a716-446655440007', 88, 0, 20, 40, 'Rack C-12', NOW()),    -- Webcam 4K Pro
    ('770e8400-e29b-41d4-a716-446655440008', '660e8400-e29b-41d4-a716-446655440008', 45, 5, 25, 50, 'Rack C-15', NOW()),    -- Wireless Gaming Mouse (5 reserved)
    ('770e8400-e29b-41d4-a716-446655440011', '660e8400-e29b-41d4-a716-446655440011', 142, 10, 30, 60, 'Rack B-10', NOW()),  -- Laptop Stand (10 reserved)
    ('770e8400-e29b-41d4-a716-446655440013', '660e8400-e29b-41d4-a716-446655440013', 67, 2, 35, 70, 'Rack B-18', NOW()),    -- Laptop Sleeve
    ('770e8400-e29b-41d4-a716-446655440014', '660e8400-e29b-41d4-a716-446655440014', 120, 0, 50, 100, 'Rack B-22', NOW()),  -- Cable Organizer Kit
    ('770e8400-e29b-41d4-a716-446655440016', '660e8400-e29b-41d4-a716-446655440016', 72, 0, 20, 40, 'Rack D-18', NOW()),    -- LED Strip RGB
    ('770e8400-e29b-41d4-a716-446655440017', '660e8400-e29b-41d4-a716-446655440017', 38, 3, 15, 30, 'Rack D-25', NOW()),    -- Monitor Light Bar
    ('770e8400-e29b-41d4-a716-446655440018', '660e8400-e29b-41d4-a716-446655440018', 310, 15, 60, 120, 'Rack E-05', NOW()),  -- USB-C Cable (high volume)
    ('770e8400-e29b-41d4-a716-446655440019', '660e8400-e29b-41d4-a716-446655440019', 215, 10, 40, 80, 'Rack E-12', NOW()),   -- HDMI Cable (high volume)
    ('770e8400-e29b-41d4-a716-446655440020', '660e8400-e29b-41d4-a716-446655440020', 95, 5, 30, 60, 'Rack E-18', NOW());    -- Lightning Cable


-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================

-- Check category distribution
-- SELECT c.category_name, COUNT(p.id) as product_count
-- FROM Category c
--          LEFT JOIN Product p ON p.category_id = c.id
-- GROUP BY c.category_name
-- ORDER BY c.sort_order;
--
-- -- Check stock health
-- SELECT
--     p.product_name,
--     i.quantity,
--     i.reserved_quantity,
--     (i.quantity - i.reserved_quantity) as available,
--     i.reorder_point,
--     CASE
--         WHEN (i.quantity - i.reserved_quantity) <= 0 THEN 'OUT_OF_STOCK'
--         WHEN i.quantity <= i.reorder_point THEN 'CRITICAL'
--         WHEN i.quantity <= (i.reorder_point * 1.5) THEN 'LOW'
--         ELSE 'HEALTHY'
--         END as stock_status
-- FROM Product p
--          JOIN Inventory i ON i.product_id = p.id
-- ORDER BY (i.quantity - i.reserved_quantity) ASC;
--
-- -- Low stock alert (matches dashboard)
-- SELECT
--     p.product_name,
--     p.sku,
--     i.quantity as in_stock,
--     i.reorder_point,
--     p.status
-- FROM Product p
--          JOIN Inventory i ON i.product_id = p.id
-- WHERE i.quantity <= i.reorder_point
-- ORDER BY i.quantity ASC;