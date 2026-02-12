-- Script de réparation du mot de passe administrateur
-- À exécuter dans Supabase SQL Editor

-- 1. Vérifier si l'utilisateur existe
SELECT id, email, role, "isActive" FROM "User" WHERE email = 'amperella@gmail.com';

-- 2. Si l'utilisateur existe, mettre à jour son mot de passe
UPDATE "User" 
SET password = '$2b$10$M4gQT4d79pxDMQC9X4fJh.CL7UhN9Z8ebvE5nLz32AfY8/pzuAYBu',
    "isActive" = true,
    role = 'ADMIN'
WHERE email = 'amperella@gmail.com';

-- 3. Si l'utilisateur n'existe pas, le créer
INSERT INTO "User" (id, name, email, password, role, "isActive", "canCreateUsers", "storeId")
SELECT 'admin_master', 'Administrateur Principal', 'amperella@gmail.com', 
       '$2b$10$M4gQT4d79pxDMQC9X4fJh.CL7UhN9Z8ebvE5nLz32AfY8/pzuAYBu', 
       'ADMIN', true, true, 'store_001'
WHERE NOT EXISTS (SELECT 1 FROM "User" WHERE email = 'amperella@gmail.com');

-- 4. Vérification finale
SELECT id, email, name, role, "isActive", "storeId" FROM "User" WHERE email = 'amperella@gmail.com';
