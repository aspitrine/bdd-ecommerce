import { db } from "./client";

export const init = async () => {
  await db.exec(`
    -- Drop the order_items table
    DROP TABLE IF EXISTS order_items;
    -- Drop the orders table
    DROP TABLE IF EXISTS orders;
    -- Drop the products table
    DROP TABLE IF EXISTS products;
    -- Drop the categories table
    DROP TABLE IF EXISTS categories;
    -- Drop the users table
    DROP TABLE IF EXISTS users;
  
    -- Create the users table
    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    
    -- Create the categories table
    CREATE TABLE categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL UNIQUE,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    
    -- Create the products table
    CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        stock INT NOT NULL,
        category_id INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (category_id) REFERENCES categories(id)
    );
    
    
    -- Create the orders table
    CREATE TABLE orders (
        id SERIAL PRIMARY KEY,
        user_id INT NOT NULL,
        order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status VARCHAR(50) NOT NULL,
        total DECIMAL(10, 2) NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id)
    );
    
    
    -- Create the order_items table
    CREATE TABLE order_items (
        id SERIAL PRIMARY KEY,
        order_id INT NOT NULL,
        product_id INT NOT NULL,
        quantity INT NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        FOREIGN KEY (order_id) REFERENCES orders(id),
        FOREIGN KEY (product_id) REFERENCES products(id)
    );
    `);

  await db.exec(`
    -- Insert fake data into the users table
    INSERT INTO users (username, email, password)
    VALUES 
    ('john_doe', 'john@example.com', 'password123'),
    ('jane_smith', 'jane@example.com', 'password456'),
    ('alice_jones', 'alice@example.com', 'password789'),
    ('bob_brown', 'bob@example.com', 'password101'),
    ('charlie_davis', 'charlie@example.com', 'password202'),
    ('diana_evans', 'diana@example.com', 'password303'),
    ('frank_green', 'frank@example.com', 'password404'),
    ('grace_hill', 'grace@example.com', 'password505'),
    ('henry_ivan', 'henry@example.com', 'password606'),
    ('ivy_jack', 'ivy@example.com', 'password707');
    
    -- Insert fake data into the categories table
    INSERT INTO categories (name, description)
    VALUES 
    ('Electronics', 'Devices and gadgets'),
    ('Books', 'Various kinds of books'),
    ('Clothing', 'Apparel and accessories'),
    ('Home & Kitchen', 'Household items and kitchenware'),
    ('Sports', 'Sporting goods and equipment'),
    ('Toys', 'Toys and games for children'),
    ('Beauty', 'Beauty and personal care products'),
    ('Automotive', 'Car accessories and parts'),
    ('Garden', 'Gardening tools and supplies'),
    ('Health', 'Health and wellness products');
    
    -- Insert fake data into the products table
    INSERT INTO products (name, description, price, stock, category_id)
    VALUES 
    ('Smartphone', 'Latest model smartphone', 699.99, 50, 1),
    ('Laptop', 'High performance laptop', 999.99, 30, 1),
    ('Tablet', 'Portable touchscreen tablet', 499.99, 40, 1),
    ('Novel', 'Bestselling novel', 19.99, 100, 2),
    ('Textbook', 'Educational textbook', 59.99, 80, 2),
    ('T-shirt', 'Cotton t-shirt', 9.99, 200, 3),
    ('Jeans', 'Denim jeans', 39.99, 150, 3),
    ('Blender', 'High-speed blender', 89.99, 60, 4),
    ('Coffee Maker', 'Automatic coffee maker', 79.99, 70, 4),
    ('Basketball', 'Official size basketball', 29.99, 90, 5),
    ('Soccer Ball', 'Professional soccer ball', 24.99, 110, 5),
    ('Action Figure', 'Popular action figure', 14.99, 120, 6),
    ('Board Game', 'Family board game', 34.99, 50, 6),
    ('Shampoo', 'Organic shampoo', 12.99, 130, 7),
    ('Lipstick', 'Matte lipstick', 19.99, 140, 7),
    ('Car Charger', 'Fast car charger', 15.99, 100, 8),
    ('Seat Cover', 'Comfortable seat cover', 29.99, 60, 8),
    ('Garden Hose', 'Flexible garden hose', 25.99, 80, 9),
    ('Lawn Mower', 'Electric lawn mower', 199.99, 20, 9),
    ('Vitamins', 'Multivitamin supplements', 24.99, 90, 10),
    ('First Aid Kit', 'Comprehensive first aid kit', 39.99, 50, 10);
    
    -- Insert fake data into the orders table
    INSERT INTO orders (user_id, status, total)
    VALUES 
    (1, 'Pending', 719.98),
    (2, 'Completed', 1019.98),
    (3, 'Shipped', 29.98),
    (4, 'Pending', 59.98),
    (5, 'Completed', 89.98),
    (6, 'Shipped', 129.98),
    (7, 'Pending', 199.98),
    (8, 'Completed', 299.98),
    (9, 'Shipped', 399.98),
    (10, 'Pending', 499.98);
    
    -- Insert fake data into the order_items table
    INSERT INTO order_items (order_id, product_id, quantity, price)
    VALUES 
    (1, 1, 1, 699.99),
    (1, 4, 1, 19.99),
    (2, 2, 1, 999.99),
    (2, 6, 1, 9.99),
    (3, 3, 1, 499.99),
    (3, 7, 1, 39.99),
    (4, 5, 1, 59.99),
    (4, 8, 1, 89.99),
    (5, 9, 1, 79.99),
    (5, 10, 1, 29.99),
    (6, 11, 1, 24.99),
    (6, 12, 1, 14.99),
    (7, 13, 1, 12.99),
    (7, 14, 1, 19.99),
    (8, 15, 1, 15.99),
    (8, 16, 1, 29.99),
    (9, 17, 1, 25.99),
    (9, 18, 1, 199.99),
    (10, 19, 1, 24.99),
    (10, 20, 1, 39.99);  
    `);
};
