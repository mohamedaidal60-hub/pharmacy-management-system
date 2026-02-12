-- CRÉATION DES MAGASINS PAR DÉFAUT
INSERT INTO "Store" ("id", "name", "address", "phone") VALUES 
('store_main', 'Pharmacie Centrale - PharmaOS', '12 Avenue de la Liberté, Alger', '+213 21 00 00 01'),
('store_nord', 'Pharmacie du Nord - Hospital Ops', 'Zone Nord, Paris', '+33 1 44 55 66 77');

-- CRÉATION DE L'ADMINISTRATEUR (Password: admin123)
-- Hash bcrypt pour 'admin123'
INSERT INTO "User" ("id", "email", "password", "name", "role", "storeId") VALUES 
('admin_user', 'admin@pharma.com', '$2b$10$I61066.A1BfG3OByb0g5Kee/8E.1UHe0Xm5CnyrG8f6pS9e9z4Vlq', 'Anis Admin', 'ADMIN', 'store_main');

-- CRÉATION DES PRODUITS INITIAUX
INSERT INTO "Product" ("id", "name", "molecule", "category", "price", "wholesalePrice", "barcode", "rxRequired", "storeId") VALUES 
('prod_01', 'Doliprane 1g', 'Paracétamol', 'Analgésique', 3.50, 2.10, '34009300', false, 'store_main'),
('prod_02', 'Amoxicilline 500mg', 'Amoxicilline', 'Antibiotique', 12.80, 8.50, '34009400', true, 'store_main'),
('prod_03', 'Ibuprofène 400', 'Ibuprofène', 'AINS', 4.20, 2.50, '34009500', false, 'store_main');

-- INITIALISATION DES STOCKS
INSERT INTO "Inventory" ("id", "productId", "storeId", "quantity", "minStock", "shelf") VALUES 
('inv_01', 'prod_01', 'store_main', 200, 20, 'Rayon A-01'),
('inv_02', 'prod_02', 'store_main', 45, 10, 'Rayon B-03'),
('inv_03', 'prod_03', 'store_main', 8, 15, 'Rayon A-02');
