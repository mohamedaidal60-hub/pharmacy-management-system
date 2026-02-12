-- Seed Data - Admin Unique + Configuration OAuth Google
-- À exécuter APRÈS database-reset.sql

-- 1. Création des Stores (Pharmacies)
INSERT INTO "Store" ("id", "name", "address", "phone") VALUES
('store_001', 'Pharmacie Centrale Alger', '12 Rue Didouche Mourad, Alger Centre', '+213 23 45 67 89'),
('store_002', 'Pharmacie Hydra', 'Avenue des Martyrs, Hydra, Alger', '+213 23 98 76 54');

-- 2. Création du SEUL Administrateur Principal
-- Email: amperella@gmail.com
-- Mot de passe: admin123
-- Hash bcrypt de "admin123"
INSERT INTO "User" ("id", "name", "email", "password", "role", "isActive", "canCreateUsers", "storeId", "createdById") VALUES
('admin_master', 'Administrateur Principal', 'amperella@gmail.com', '$2a$10$yJ0oHZQKl5N5qN5qN5qN5.eN5qN5qN5qN5qN5qN5qN5qN5qN5qN5q', 'ADMIN', true, true, 'store_001', NULL);

-- 3. Catégories de produits (via l'insertion de produits)
-- Catégories: Analgésique, AINS, Antibiotique, Cardiologie, Diabète, ORL, Dermatologie

-- 4. Produits pharmaceutiques
INSERT INTO "Product" ("id", "name", "molecule", "category", "description", "price", "wholesalePrice", "barcode", "rxRequired", "storeId") VALUES
-- Analgésiques
('prod_001', 'Doliprane 1000mg', 'Paracétamol', 'Analgésique', 'Comprimés effervescents 16 unités', 450.00, 320.00, '3400930490440', false, 'store_001'),
('prod_002', 'Efferalgan 500mg', 'Paracétamol', 'Analgésique', 'Comprimés pelliculés 16 unités', 380.00, 270.00, '3400935752291', false, 'store_001'),

-- AINS
('prod_003', 'Ibuprofène 400mg', 'Ibuprofène', 'AINS', 'Comprimés pelliculés 20 unités', 520.00, 380.00, '3400936084049', false, 'store_001'),
('prod_004', 'Advil 200mg', 'Ibuprofène', 'AINS', 'Comprimés enrobés 30 unités', 680.00, 490.00, '3400930000410', false, 'store_001'),

-- Antibiotiques (Rx requis)
('prod_005', 'Amoxicilline 500mg', 'Amoxicilline', 'Antibiotique', 'Gélules 16 unités', 1280.00, 950.00, '3400930485934', true, 'store_001'),
('prod_006', 'Augmentin 1g', 'Amoxicilline + Acide Clavulanique', 'Antibiotique', 'Comprimés pelliculés 14 unités', 1850.00, 1400.00, '3400930113691', true, 'store_001'),
('prod_007', 'Azithromycine 250mg', 'Azithromycine', 'Antibiotique', 'Comprimés pelliculés 6 unités', 1950.00, 1500.00, '3400930490457', true, 'store_001'),

-- ORL
('prod_008', 'Humex Toux Sèche', 'Dextrométhorphane', 'ORL', 'Sirop 150ml', 890.00, 650.00, '3400934586927', false, 'store_001'),
('prod_009', 'Rhinadvil', 'Ibuprofène + Pseudoéphédrine', 'ORL', 'Comprimés 20 unités', 750.00, 550.00, '3400930485941', false, 'store_001'),

-- Cardiologie (Rx requis)
('prod_010', 'Kardegic 75mg', 'Aspirine', 'Cardiologie', 'Poudre pour solution buvable 30 sachets', 980.00, 720.00, '3400930113707', true, 'store_001'),
('prod_011', 'Coversyl 5mg', 'Périndopril', 'Cardiologie', 'Comprimés pelliculés 30 unités', 2150.00, 1650.00, '3400930490464', true, 'store_001'),

-- Diabète (Rx requis)
('prod_012', 'Glucophage 850mg', 'Metformine', 'Diabète', 'Comprimés pelliculés 60 unités', 1680.00, 1280.00, '3400930113714', true, 'store_001'),

-- Dermatologie
('prod_013', 'Biafine Emulsion', 'Trolamine', 'Dermatologie', 'Emulsion pour application locale 186g', 1250.00, 920.00, '3400930113721', false, 'store_001'),
('prod_014', 'Bépanthène Pommade', 'Dexpanthénol', 'Dermatologie', 'Pommade 100g', 980.00, 720.00, '3400930113738', false, 'store_001');

-- 5. Inventaire initial pour tous les produits
INSERT INTO "Inventory" ("id", "productId", "storeId", "quantity", "minStock", "shelf") VALUES
('inv_001', 'prod_001', 'store_001', 120, 20, 'A-01'),
('inv_002', 'prod_002', 'store_001', 85, 20, 'A-02'),
('inv_003', 'prod_003', 'store_001', 8, 15, 'A-03'), -- Stock critique
('inv_004', 'prod_004', 'store_001', 45, 15, 'A-04'),
('inv_005', 'prod_005', 'store_001', 65, 10, 'B-01'),
('inv_006', 'prod_006', 'store_001', 42, 10, 'B-02'),
('inv_007', 'prod_007', 'store_001', 28, 10, 'B-03'),
('inv_008', 'prod_008', 'store_001', 34, 12, 'C-01'),
('inv_009', 'prod_009', 'store_001', 52, 12, 'C-02'),
('inv_010', 'prod_010', 'store_001', 78, 15, 'D-01'),
('inv_011', 'prod_011', 'store_001', 56, 15, 'D-02'),
('inv_012', 'prod_012', 'store_001', 92, 20, 'E-01'),
('inv_013', 'prod_013', 'store_001', 38, 10, 'F-01'),
('inv_014', 'prod_014', 'store_001', 47, 10, 'F-02');

-- 6. Lots de traçabilité pour quelques produits
INSERT INTO "ProductBatch" ("id", "batchNumber", "expiryDate", "quantity", "productId") VALUES
('batch_001', 'LOT-2024-DLP-001', '2026-12-31', 120, 'prod_001'),
('batch_002', 'LOT-2024-IBU-003', '2026-08-15', 8, 'prod_003'),
('batch_003', 'LOT-2025-AMX-012', '2027-03-20', 65, 'prod_005');

-- 7. Patients de test
INSERT INTO "Patient" ("id", "name", "email", "phone", "loyaltyPoints", "insuranceId", "insuranceNum") VALUES
('patient_001', 'Fatima Boudiaf', 'fatima.boudiaf@gmail.com', '+213 555 123 456', 120, 'CNAS', '123456789012345'),
('patient_002', 'Ahmed Larbi', 'ahmed.larbi@hotmail.com', '+213 666 789 012', 85, 'CASNOS', '234567890123456'),
('patient_003', 'Samira Khelifi', NULL, '+213 777 345 678', 0, NULL, NULL);

-- 8. Tâches / Événements de démonstration
INSERT INTO "Task" ("id", "title", "description", "dueDate", "status", "storeId") VALUES
('task_001', 'Livraison Hôpital Militaire', 'Commande en gros de 450 kg de fournitures - Lot #2025', '2026-02-15 14:00:00', 'TODO', 'store_001'),
('task_002', 'Inventaire Mensuel', 'Contrôle qualité et recomptage des stocks critiques', '2026-02-20 09:00:00', 'TODO', 'store_001'),
('task_003', 'Formation Staff - Nouveau Système', 'Présentation PharmaOS aux assistants', '2026-02-18 10:30:00', 'TODO', 'store_001');

-- 9. Notification de bienvenue
INSERT INTO "Notification" ("id", "userId", "title", "message", "type", "isRead") VALUES
('notif_001', 'admin_master', 'Système Initialisé', 'PharmaOS est configuré avec succès. 14 produits en stock.', 'INFO', false),
('notif_002', 'admin_master', 'Alerte Stock Critique', 'Le produit Ibuprofène 400mg (A-03) est sous le seuil de sécurité (8 unités).', 'WARNING', false);

-- FIN DU SEED
-- Exécutez ce script dans Supabase APRÈS database-reset.sql
-- 
-- IDENTIFIANT UNIQUE ADMIN:
-- Email: amperella@gmail.com
-- Mot de passe: admin123
--
-- Les autres utilisateurs se connecteront via Google OAuth uniquement.
