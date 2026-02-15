# 📋 VARIABLES D'ENVIRONNEMENT POUR VERCEL

## Instructions :
1. Allez sur https://vercel.com/dashboard
2. Sélectionnez votre projet "pharmacy-management-system"
3. Allez dans Settings > Environment Variables
4. Ajoutez/Modifiez ces 6 variables (cochez Production, Preview, Development pour chacune)

---

## Variable 1 : DATABASE_URL
```
postgresql://postgres:76965dad-c24c-4b50-be8d-792a20ec6dc3@db.qypexsmydrohioahjdgd.supabase.co:5432/postgres
```

## Variable 2 : NEXTAUTH_SECRET
```
76965dad-c24c-4b50-be8d-792a20ec6dc3
```

## Variable 3 : NEXTAUTH_URL
```
https://pharmacy-management-system-gules.vercel.app
```

## Variable 4 : NEXT_PUBLIC_SUPABASE_URL
```
https://qypexsmydrohioahjdgd.supabase.co
```

## Variable 5 : NEXT_PUBLIC_SUPABASE_ANON_KEY
```
[COPIEZ_LA_CLE_ANON_DEPUIS_SUPABASE_SETTINGS_API]
```

## Variable 6 : SUPABASE_SERVICE_ROLE_KEY
```
[COPIEZ_LA_CLE_SERVICE_ROLE_DEPUIS_SUPABASE_SETTINGS_API]
```

---

## Après avoir ajouté toutes les variables :
1. Allez dans l'onglet "Deployments"
2. Cliquez sur les 3 points (...) du dernier déploiement
3. Cliquez sur "Redeploy"
4. Attendez 2-3 minutes que le build se termine
5. Testez la connexion sur l'URL de production
   - Email: amperella@gmail.com
   - Mot de passe: admin123
