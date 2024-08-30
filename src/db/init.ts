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
    ('ivy_jack', 'ivy@example.com', 'password707'),
    ('kevin_lee', 'kevin@example.com', 'password808'),
    ('laura_miller', 'laura@example.com', 'password909'),
    ('mike_nelson', 'mike@example.com', 'password010'),
    ('nancy_owen', 'nancy@example.com', 'password111'),
    ('oscar_parker', 'oscar@example.com', 'password212'),
    ('patricia_quinn', 'patricia@example.com', 'password313'),
    ('quentin_ross', 'quentin@example.com', 'password414'),
    ('rachel_smith', 'rachel@example.com', 'password515'),
    ('steve_taylor', 'steve@example.com', 'password616'),
    ('tina_underwood', 'tina@example.com', 'password717');
    
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
    ('Health', 'Health and wellness products'),
    ('Musique', 'Instruments et équipements musicaux'),
    ('Informatique', 'Matériel et logiciels informatiques'),
    ('Alimentation', 'Produits alimentaires et boissons'),
    ('Animalerie', 'Produits pour animaux de compagnie'),
    ('Bricolage', 'Outils et matériaux de bricolage');
    
    -- Insert fake data into the products table
    INSERT INTO products (name, description, price, stock, category_id)
    VALUES 
    ('Smartphone', 'Dernier modèle de smartphone', 699.99, 50, 1),
    ('Ordinateur portable', 'Ordinateur portable haute performance', 999.99, 30, 1),
    ('Tablette', 'Tablette tactile portable', 499.99, 40, 1),
    ('Roman', 'Roman best-seller', 19.99, 100, 2),
    ('Manuel scolaire', 'Manuel éducatif', 59.99, 80, 2),
    ('T-shirt', 'T-shirt en coton', 9.99, 200, 3),
    ('Jean', 'Jean en denim', 39.99, 150, 3),
    ('Mixeur', 'Mixeur haute vitesse', 89.99, 60, 4),
    ('Cafetière', 'Cafetière automatique', 79.99, 70, 4),
    ('Ballon de basket', 'Ballon de basket taille officielle', 29.99, 90, 5),
    ('Ballon de football', 'Ballon de football professionnel', 24.99, 110, 5),
    ('Figurine d''action', 'Figurine d''action populaire', 14.99, 120, 6),
    ('Jeu de société', 'Jeu de société familial', 34.99, 50, 6),
    ('Shampoing', 'Shampoing bio', 12.99, 130, 7),
    ('Rouge à lèvres', 'Rouge à lèvres mat', 19.99, 140, 7),
    ('Chargeur de voiture', 'Chargeur de voiture rapide', 15.99, 100, 8),
    ('Housse de siège', 'Housse de siège confortable', 29.99, 60, 8),
    ('Tuyau d''arrosage', 'Tuyau d''arrosage flexible', 25.99, 80, 9),
    ('Tondeuse à gazon', 'Tondeuse à gazon électrique', 199.99, 20, 9),
    ('Vitamines', 'Compléments multivitaminés', 24.99, 90, 10),
    ('Trousse de premiers secours', 'Kit de premiers secours complet', 39.99, 50, 10),
    ('Guitare acoustique', 'Guitare acoustique pour débutants', 149.99, 25, 11),
    ('Casque audio', 'Casque audio sans fil', 89.99, 40, 11),
    ('Clavier MIDI', 'Clavier MIDI 61 touches', 199.99, 15, 11),
    ('Disque dur externe', 'Disque dur externe 1To', 79.99, 55, 12),
    ('Souris sans fil', 'Souris ergonomique sans fil', 29.99, 75, 12),
    ('Imprimante multifonction', 'Imprimante tout-en-un', 129.99, 30, 12),
    ('Café en grains', 'Café en grains bio 1kg', 14.99, 100, 13),
    ('Chocolat noir', 'Tablette de chocolat noir 70%', 3.99, 200, 13),
    ('Thé vert', 'Boîte de thé vert 100 sachets', 9.99, 150, 13),
    ('Croquettes pour chiens', 'Croquettes premium 5kg', 34.99, 60, 14),
    ('Jouet pour chat', 'Jouet interactif pour chat', 12.99, 80, 14),
    ('Aquarium', 'Aquarium 50L tout équipé', 89.99, 20, 14),
    ('Perceuse sans fil', 'Perceuse-visseuse 18V', 79.99, 40, 15),
    ('Boîte à outils', 'Boîte à outils complète 100 pièces', 59.99, 30, 15),
    ('Peinture murale', 'Peinture murale blanche 10L', 39.99, 50, 15),
    ('Écouteurs Bluetooth', 'Écouteurs sans fil avec réduction de bruit', 129.99, 45, 1),
    ('Liseuse électronique', 'Liseuse e-ink avec éclairage intégré', 119.99, 35, 2),
    ('Veste en cuir', 'Veste en cuir véritable', 199.99, 25, 3),
    ('Robot de cuisine', 'Robot multifonction avec accessoires', 249.99, 20, 4),
    ('Raquette de tennis', 'Raquette de tennis professionnelle', 159.99, 30, 5),
    ('Console de jeux', 'Console de jeux dernière génération', 399.99, 15, 6),
    ('Parfum', 'Eau de parfum 100ml', 69.99, 60, 7),
    ('GPS automobile', 'Système de navigation GPS', 149.99, 25, 8),
    ('Serre de jardin', 'Serre de jardin en polycarbonate', 299.99, 10, 9),
    ('Tapis de yoga', 'Tapis de yoga antidérapant', 29.99, 70, 10),
    ('Piano numérique', 'Piano numérique 88 touches', 599.99, 8, 11),
    ('Moniteur PC', 'Moniteur 27 pouces 4K', 349.99, 20, 12),
    ('Machine à pain', 'Machine à pain automatique', 89.99, 25, 13),
    ('Arbre à chat', 'Grand arbre à chat multi-niveaux', 79.99, 15, 14),
    ('Scie circulaire', 'Scie circulaire électrique', 129.99, 20, 15);
    
    -- Insert fake data into the orders table
    INSERT INTO orders (user_id, status, total)
    VALUES 
    (1, 'En attente', 719.98),
    (2, 'Terminé', 1019.98),
    (3, 'Expédié', 29.98),
    (4, 'En attente', 59.98),
    (5, 'Terminé', 89.98),
    (6, 'Expédié', 129.98),
    (7, 'En attente', 199.98),
    (8, 'Terminé', 299.98),
    (9, 'Expédié', 399.98),
    (10, 'En attente', 499.98),
    (11, 'Terminé', 149.97),
    (12, 'Expédié', 79.99),
    (13, 'En attente', 239.98),
    (14, 'Terminé', 89.99),
    (15, 'Expédié', 159.98),
    (1, 'En attente', 54.98),
    (2, 'Terminé', 399.99),
    (3, 'Expédié', 129.99),
    (4, 'En attente', 79.98),
    (5, 'Terminé', 199.99),
    (6, 'Expédié', 69.98),
    (7, 'En attente', 299.98),
    (8, 'Terminé', 149.99),
    (9, 'Expédié', 89.98),
    (10, 'En attente', 249.99),
    (11, 'Terminé', 119.98),
    (12, 'Expédié', 179.99),
    (13, 'En attente', 59.98),
    (14, 'Terminé', 399.98),
    (15, 'Expédié', 99.99),
    (1, 'En attente', 189.98),
    (2, 'Terminé', 79.99),
    (3, 'Expédié', 299.99),
    (4, 'En attente', 139.98),
    (5, 'Terminé', 229.99),
    (6, 'Expédié', 89.98),
    (7, 'En attente', 349.98),
    (8, 'Terminé', 169.99),
    (9, 'Expédié', 99.98),
    (10, 'En attente', 279.99),
    (11, 'Terminé', 129.98),
    (12, 'Expédié', 199.99),
    (13, 'En attente', 69.98),
    (14, 'Terminé', 449.98),
    (15, 'Expédié', 109.99),
    (1, 'En attente', 209.98),
    (2, 'Terminé', 89.99),
    (3, 'Expédié', 319.99),
    (4, 'En attente', 149.98),
    (5, 'Terminé', 249.99);
    
    -- Insert fake data into the order_items table
    INSERT INTO order_items (order_id, product_id, quantity, price)
    VALUES 
    (1, 1, 2, 699.99),
    (1, 4, 1, 19.99),
    (2, 2, 1, 999.99),
    (2, 6, 3, 9.99),
    (3, 3, 1, 499.99),
    (3, 7, 2, 39.99),
    (4, 5, 1, 59.99),
    (4, 8, 1, 89.99),
    (5, 9, 2, 79.99),
    (5, 10, 1, 29.99),
    (6, 11, 3, 24.99),
    (6, 12, 2, 14.99),
    (7, 13, 1, 12.99),
    (7, 14, 2, 19.99),
    (8, 15, 1, 15.99),
    (8, 16, 3, 29.99),
    (9, 17, 2, 25.99),
    (9, 18, 1, 199.99),
    (10, 19, 1, 24.99),
    (10, 20, 2, 39.99),
    (11, 1, 1, 699.99),
    (11, 5, 2, 59.99),
    (12, 3, 1, 499.99),
    (12, 7, 1, 39.99),
    (13, 9, 2, 79.99),
    (13, 11, 1, 24.99),
    (14, 13, 3, 12.99),
    (14, 15, 1, 15.99),
    (15, 17, 2, 25.99),
    (15, 19, 1, 24.99),
    (16, 2, 1, 999.99),
    (16, 4, 2, 19.99),
    (17, 6, 3, 9.99),
    (17, 8, 1, 89.99),
    (18, 10, 2, 29.99),
    (18, 12, 1, 14.99),
    (19, 14, 1, 19.99),
    (19, 16, 2, 29.99),
    (20, 18, 1, 199.99),
    (20, 20, 3, 39.99),
    (21, 1, 2, 699.99),
    (21, 3, 1, 499.99),
    (22, 5, 1, 59.99),
    (22, 7, 2, 39.99),
    (23, 9, 3, 79.99),
    (23, 11, 1, 24.99),
    (24, 13, 2, 12.99),
    (24, 15, 1, 15.99),
    (25, 17, 1, 25.99),
    (25, 19, 2, 24.99),
    (26, 2, 1, 999.99),
    (26, 4, 3, 19.99),
    (27, 6, 2, 9.99),
    (27, 8, 1, 89.99),
    (28, 10, 1, 29.99),
    (28, 12, 2, 14.99),
    (29, 14, 3, 19.99),
    (29, 16, 1, 29.99),
    (30, 18, 2, 199.99),
    (30, 20, 1, 39.99),
    (31, 1, 1, 699.99),
    (31, 5, 2, 59.99),
    (32, 3, 3, 499.99),
    (32, 7, 1, 39.99),
    (33, 9, 2, 79.99),
    (33, 11, 1, 24.99),
    (34, 13, 1, 12.99),
    (34, 15, 2, 15.99),
    (35, 17, 3, 25.99),
    (35, 19, 1, 24.99),
    (36, 2, 2, 999.99),
    (36, 4, 1, 19.99),
    (37, 6, 1, 9.99),
    (37, 8, 2, 89.99),
    (38, 10, 3, 29.99),
    (38, 12, 1, 14.99),
    (39, 14, 2, 19.99),
    (39, 16, 1, 29.99),
    (40, 18, 1, 199.99),
    (40, 20, 2, 39.99),
    (41, 1, 3, 699.99),
    (41, 3, 1, 499.99),
    (42, 5, 2, 59.99),
    (42, 7, 1, 39.99),
    (43, 9, 1, 79.99),
    (43, 11, 2, 24.99),
    (44, 13, 3, 12.99),
    (44, 15, 1, 15.99),
    (45, 17, 2, 25.99),
    (45, 19, 1, 24.99),
    (46, 2, 1, 999.99),
    (46, 4, 2, 19.99),
    (47, 6, 3, 9.99),
    (47, 8, 1, 89.99),
    (48, 10, 2, 29.99),
    (48, 12, 1, 14.99),
    (49, 14, 1, 19.99),
    (49, 16, 2, 29.99),
    (50, 18, 3, 199.99),
    (50, 20, 1, 39.99);
    `);
};
