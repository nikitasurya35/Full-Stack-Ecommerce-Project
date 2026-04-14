CREATE TABLE orders (
     id UUID PRIMARY KEY,
     product_name VARCHAR(255),
     price DECIMAL,
     created_at TIMESTAMP
);