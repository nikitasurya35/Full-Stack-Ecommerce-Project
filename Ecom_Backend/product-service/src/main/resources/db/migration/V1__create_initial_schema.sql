CREATE TABLE IF NOT EXISTS public.category
(
    id uuid NOT NULL,
    category_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    created_at timestamp(6) without time zone,
    description text COLLATE pg_catalog."default",
    image_url character varying(255) COLLATE pg_catalog."default",
    is_active boolean NOT NULL,
    slug character varying(255) COLLATE pg_catalog."default" NOT NULL,
    sort_order integer,
    updated_at timestamp(6) without time zone,
    parent_id uuid,
    CONSTRAINT category_pkey PRIMARY KEY (id),
    CONSTRAINT ukhqknmjh5423vchi4xkyhxlhg2 UNIQUE (slug),
    CONSTRAINT fk2y94svpmqttx80mshyny85wqr FOREIGN KEY (parent_id)
    REFERENCES public.category (id) MATCH SIMPLE
                            ON UPDATE NO ACTION
                            ON DELETE NO ACTION
    )

CREATE TABLE IF NOT EXISTS public.product
(
    id uuid NOT NULL,
    category_id uuid NOT NULL,
    compare_price numeric(10,2),
    created_at timestamp(6) without time zone,
    description text COLLATE pg_catalog."default",
    image_url character varying(255) COLLATE pg_catalog."default",
    images_json text COLLATE pg_catalog."default",
    is_featured boolean NOT NULL,
    price numeric(10,2) NOT NULL,
    product_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    sku character varying(255) COLLATE pg_catalog."default" NOT NULL,
    slug character varying(255) COLLATE pg_catalog."default" NOT NULL,
    status character varying(255) COLLATE pg_catalog."default" NOT NULL,
    updated_at timestamp(6) without time zone,
    CONSTRAINT product_pkey PRIMARY KEY (id),
    CONSTRAINT uk88yb4l9100epddqsrdvxerhq9 UNIQUE (slug),
    CONSTRAINT ukq1mafxn973ldq80m1irp3mpvq UNIQUE (sku),
    CONSTRAINT fk1mtsbur82frn64de7balymq9s FOREIGN KEY (category_id)
    REFERENCES public.category (id) MATCH SIMPLE
                            ON UPDATE NO ACTION
                            ON DELETE NO ACTION
    )

CREATE TABLE IF NOT EXISTS public.inventory
(
    id uuid NOT NULL,
    last_updated timestamp(6) without time zone,
    quantity integer NOT NULL,
    reorder_point integer NOT NULL,
    reorder_quantity integer NOT NULL,
    reserved_quantity integer NOT NULL,
    warehouse_location character varying(255) COLLATE pg_catalog."default",
    product_id uuid NOT NULL,
    CONSTRAINT inventory_pkey PRIMARY KEY (id),
    CONSTRAINT ukce3rbi3bfstbvvyne34c1dvyv UNIQUE (product_id),
    CONSTRAINT fkp7gj4l80fx8v0uap3b2crjwp5 FOREIGN KEY (product_id)
    REFERENCES public.product (id) MATCH SIMPLE
                              ON UPDATE NO ACTION
                              ON DELETE NO ACTION
    )



