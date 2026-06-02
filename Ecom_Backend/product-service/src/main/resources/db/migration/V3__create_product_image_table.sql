CREATE TABLE product_image (
   image_id UUID PRIMARY KEY,
   product_id UUID NOT NULL,
   file_name VARCHAR(255) NOT NULL,
   file_path VARCHAR(500) NOT NULL,
   image_url VARCHAR(500) NOT NULL,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

   CONSTRAINT fk_product_image_product
       FOREIGN KEY(product_id)
           REFERENCES product(id)
           ON DELETE CASCADE
);

