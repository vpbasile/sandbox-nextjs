-- Create the products table
CREATE TABLE product (
    product_id INTEGER PRIMARY KEY,
    product_name TEXT,
    unit_name TEXT
);

-- Insert data into the products table
INSERT INTO product (product_name, unit_name) VALUES ('Frozen Pizza (Big)', 'Pizza');
INSERT INTO product (product_name, unit_name) VALUES ('Party Pizza', 'Pizza');
INSERT INTO product (product_name, unit_name) VALUES ('Grapes', 'Pound');
INSERT INTO product (product_name, unit_name) VALUES ('Seltzer', 'Can');
INSERT INTO product (product_name, unit_name) VALUES ('Tortilla Chips', 'Bag');
INSERT INTO product (product_name, unit_name) VALUES ('Greek Yogurt (Whole)', 'oz');
INSERT INTO product (product_name, unit_name) VALUES ('Chicken thighs B/S', 'Pound');
INSERT INTO product (product_name, unit_name) VALUES ('Seltzer', 'Can');

-- Create the venues table
CREATE TABLE venue (
    venue_id INTEGER PRIMARY KEY,
    venue_name TEXT
);

-- Insert data into the venues table
INSERT INTO venue (venue_name) VALUES ('Aldi');
INSERT INTO venue (venue_name) VALUES ('Giant Eagle');
INSERT INTO venue (venue_name) VALUES ('Costco');

-- Create the category table
CREATE TABLE category (
    category_id INTEGER PRIMARY KEY,
    category_name TEXT
);

-- Insert data into the category table
INSERT INTO category (category_name) VALUES ('Frozen');
INSERT INTO category (category_name) VALUES ('Refrigerated');
INSERT INTO category (category_name) VALUES ('Produce');
INSERT INTO category (category_name) VALUES ('Shelf');

-- Create the purchase table
CREATE TABLE purchase (
    purchase_id INTEGER PRIMARY KEY,
    product_id INTEGER, 
    total_purchase_price REAL,
    unit_count REAL,
    venue_id INTEGER, 
    purchase_date TEXT,
    category_id INTEGER, 
    FOREIGN KEY (product_id) REFERENCES product(product_id),
    FOREIGN KEY (venue_id) REFERENCES venue(venue_id),
    FOREIGN KEY (category_id) REFERENCES category(category_id)
);

-- Insert the purchase data
INSERT INTO purchase (product_id, total_purchase_price, unit_count, venue_id, purchase_date, category_id)
VALUES (1, 5.39, 1, 1, '2023-08-23', 1);

INSERT INTO purchase (product_id, total_purchase_price, unit_count, venue_id, purchase_date, category_id)
VALUES (2, 1.67, 1, 2, '2023-08-23', 1);

INSERT INTO purchase (product_id, total_purchase_price, unit_count, venue_id, purchase_date, category_id)
VALUES (3, 2.42, 2.44, 1, '2023-08-23', 3);

INSERT INTO purchase (product_id, total_purchase_price, unit_count, venue_id, purchase_date, category_id)
VALUES (4, 3.45, 12, 1, '2023-08-23', 4);

INSERT INTO purchase (product_id, total_purchase_price, unit_count, venue_id, purchase_date, category_id)
VALUES (5, 1.85, 1, 1, '2023-08-23', 4);

INSERT INTO purchase (product_id, total_purchase_price, unit_count, venue_id, purchase_date, category_id)
VALUES (6, 3.49, 32, 1, '2023-08-23', 2);

INSERT INTO purchase (product_id, total_purchase_price, unit_count, venue_id, purchase_date, category_id)
VALUES (7, 6.07, 6, 1, '2023-08-23', 2);

-- For the last entry, please provide the correct product_id, venue_id, and category_id
INSERT INTO purchase (product_id, total_purchase_price, unit_count, venue_id, purchase_date, category_id)
VALUES (8, 3.33, 8, 2, '2023-08-23', 4);
