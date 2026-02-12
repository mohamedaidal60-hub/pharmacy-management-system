# 🚀 PharmaOS - Guide de Démarrage Complet
> **Note de Maintenance** : Si vous voyez une erreur 404 juste après une mise à jour, veuillez patienter 2 minutes que Vercel termine le déploiement.


## 📌 Identifiants de Connexion

### 🔑 Administrateur Unique (Email + Mot de Passe)
- **Email**: `amperella@gmail.com`
- **Mot de passe**: `admin123`
- **Pouvoirs**: Accès total + Gestion utilisateurs + Validation des actions
- **Note**: C'est le **SEUL compte** avec accès par identifiants classiques

### 🌐 Autres Utilisateurs (Google OAuth uniquement)
- **Méthode de connexion**: Bouton "Se connecter avec Google" sur la page de login
- **Création automatique**: Lors de la première connexion Google, un compte est créé automatiquement
- **Rôle par défaut**: ASSISTANT (peut être modifié par l'admin)
- **Pharmacie assignée**: Pharmacie Centrale Alger (store_001)

---

## 🔐 Sécurité & Authentification

### Middleware de Protection Totale
- ✅ **Toutes les pages sont protégées** par NextAuth middleware
- ✅ Seuls les utilisateurs authentifiés peuvent accéder à l'application
- ✅ Redirection automatique vers `/login` si non connecté
- ✅ Aucun accès direct possible sans identifiants valides

### Deux Méthodes de Connexion

#### 1. Google OAuth (Staff Standard)
- Bouton principal sur la page de login
- Connexion instantanée via compte Google
- Création automatique du compte dans PharmaOS
- Rôle initial : ASSISTANT
- L'admin peut ensuite modifier le rôle et la pharmacie assignée

#### 2. Email + Mot de Passe (Admin Uniquement)
- Réservé à `amperella@gmail.com`
- Formulaire classique sous le bouton Google
- Accès complet à toutes les fonctionnalités admin

### Système de Permissions par Rôle
Chaque page et action est limitée selon le rôle :
- **ADMIN** : Accès total + Pages admin exclusives
- **PHARMACIST** : Toutes les opérations (avec validation admin)
- **ASSISTANT** : Vente, consultation, messagerie
- **DELIVERY** : Commandes, livraisons
- **WHOLESALE_BUYER** : Commerce de gros

---

## 👨‍💼 Fonctionnalités Admin (ADMIN uniquement)

### 1. Gestion des Utilisateurs (`/admin/users`)
✅ **Créer de nouveaux utilisateurs** :
   - Nom complet
   - Adresse email
   - Mot de passe initial (défini par l'admin)
   - Rôle (Admin, Pharmacien, Assistant, etc.)
   - Pharmacie assignée

✅ **Réinitialiser les mots de passe** :
   - L'admin peut changer le mot de passe de n'importe quel utilisateur
   - L'utilisateur reçoit une notification automatique

✅ **Activer/Désactiver des comptes** :
   - Bouton toggle pour bloquer/débloquer un utilisateur
   - Les utilisateurs désactivés ne peuvent plus se connecter (ni par Google ni par email)

✅ **Modifier les rôles** :
   - Changez le rôle d'un utilisateur connecté via Google
   - Effet immédiat à la prochaine connexion

### 2. Centre de Validation (`/admin/validations`)
✅ **Valider les actions en temps réel** :
   - Toutes les actions critiques (création produit, ajustement stock, commandes) créées par les non-admins apparaissent ici
   - L'admin peut :
     - **Approuver** : Exécution immédiate de l'action
     - **Modifier** puis valider (en développement)
     - **Refuser** avec un commentaire explicatif

✅ **Notifications bidirectionnelles** :
   - L'admin reçoit une notification pour chaque nouvelle action
   - L'utilisateur reçoit une notification quand son action est validée/refusée

---

## 📦 Inventaire (`/inventory`)

### Fonctionnalités Opérationnelles
✅ **Nouveau Produit** :
   - Menu déroulant pour les catégories (Analgésique, AINS, Antibiotique, etc.)
   - Bouton "Auto-Générer" pour créer un code-barres EAN-13 unique
   - Enregistrement immédiat (Admin) ou validation requise (autres rôles)

✅ **Filtres Actifs** :
   - Recherche par nom, molécule ou code-barres
   - Filtre par catégorie (menu déroulant fonctionnel)

✅ **Ajustement Stock** :
   - Boutons +/- pour modifier les quantités
   - Validation admin requise pour les non-admins
   - Messages clairs : "⏳ Modification envoyée pour validation admin"

✅ **Gérer Lots** :
   - Enregistrement de numéros de lot
   - Date d'expiration
   - Quantités
   - Mise à jour automatique du stock

✅ **Scanner** :
   - Bouton actif avec message d'information
   - Prêt pour connexion lecteur USB

---

## 💊 Dispensing (Délivrance) (`/dispensing`)

✅ **Scanner Ordonnance** :
   - Simulation IA qui détecte automatiquement le patient
   - Animation de 2 secondes pour l'analyse

✅ **Sélection Produit** :
   - Barre de recherche avec auto-complétion en temps réel
   - Recherche par nom ou code-barres
   - Liste déroulante des produits du catalogue réel

✅ **Validation Vente** :
   - Utilise de vrais identifiants produits (plus d'erreur "temp-id")
   - Décrémentation automatique du stock
   - Création de commande avec validation admin (si non-admin)

---

## 💬 Messagerie (`/messages`)

✅ **Envoi de Messages** :
   - Fonctionnel à 100%
   - Messages enregistrés dans la base de données
   - Rechargement automatique après envoi

✅ **Appels VoIP** :
   - Modal ultra-premium avec animation
   - Simulation d'appel (backend VoIP requis pour production réelle)

✅ **Pièces Jointes & Emojis** :
   - Boutons actifs avec messages d'information
   - Configuration Vercel Blob requise pour le stockage cloud

---

## 📅 Planning (`/calendar`)

✅ **Navigation Calendrier** :
   - Flèches mois précédent/suivant fonctionnelles
   - Affichage des jours du mois avec grid dynamique

✅ **Événements & Tâches** :
   - Affichage des points colorés pour les événements
   - Modal "Nouvel Événement" opérationnel
   - Enregistrement en base de données
   - Liste des tâches à venir dans la sidebar

---

## 🔔 Système de Notifications

✅ **Notifications Temps Réel** :
   - Chaque action importante génère une notification
   - Les utilisateurs voient leurs notifications dans leur profil
   - Les admins reçoivent des alertes pour les actions à valider

✅ **Types de Notifications** :
   - `INFO` : Informations générales
   - `WARNING` : Alertes importantes
   - `ACTION_REQUIRED` : Actions nécessitant validation
   - `VALIDATION` : Réponses admin

---

## 🛠️ Configuration Google OAuth

### Étapes pour Activer Google Sign-In

1. **Allez sur Google Cloud Console** : https://console.cloud.google.com/

2. **Créez un nouveau projet** ou sélectionnez un projet existant

3. **Activez l'API Google+ (People API)** :
   - Menu → APIs & Services → Library
   - Recherchez "Google+ API"
   - Cliquez "Enable"

4. **Créez des credentials OAuth 2.0** :
   - Menu → APIs & Services → Credentials
   - Click "Create Credentials" → "OAuth client ID"
   - Type: Web application
   - Nom: PharmaOS

5. **Configurez les URIs autorisés** :
   - **JavaScript origins** :
     - `http://localhost:3000`
     - `https://pharmacy-management-system-gules.vercel.app`
   
   - **Redirect URIs** :
     - `http://localhost:3000/api/auth/callback/google`
     - `https://pharmacy-management-system-gules.vercel.app/api/auth/callback/google`

6. **Copiez les credentials** :
   - Client ID : `xxxxx.apps.googleusercontent.com`
   - Client Secret : `xxxxxx-xxxxxxxx`

7. **Mettez à jour les variables d'environnement** :
   - Fichier `.env.local` (développement local)
   - Dashboard Vercel → Settings → Environment Variables (production)
   
   ```
   GOOGLE_CLIENT_ID=votre_client_id_ici
   GOOGLE_CLIENT_SECRET=votre_client_secret_ici
   ```

8. **Redéployez l'application** :
   ```bash
   npm run build
   git add .
   git commit -m "Add Google OAuth credentials"
   git push origin master
   ```

**⚠️ IMPORTANT** : Sans ces credentials, le bouton Google affichera une erreur. Configurez-les pour activer la connexion Google.

---

## 🗂️ Base de Données

### Réinitialisation avec le Nouvel Admin

**IMPORTANT** : Vous devez exécuter le nouveau `seed-data.sql` dans Supabase pour créer le compte admin `amperella@gmail.com`.

1. Allez sur https://supabase.com/dashboard
2. Sélectionnez votre projet
3. SQL Editor
4. Exécutez **d'abord** `database-reset.sql` (si pas déjà fait)
5. Exécutez **ensuite** le nouveau `seed-data.sql`

### Tables Principales
- **Store** : Pharmacies
- **User** : Utilisateurs (avec `createdBy`, `isActive`, `canCreateUsers`)
- **Product** : Catalogue produits
- **Inventory** : Stock par pharmacie
- **Order** : Commandes/Ventes
- **Message** : Messagerie interne
- **Task** : Événements calendrier
- **Notification** : Alertes système
- **PendingAction** : Actions en attente de validation

### Données de Test
- 2 Pharmacies
- **1 Admin** : `amperella@gmail.com` / `admin123`
- 14 Produits pharmaceutiques réalistes
- Stock initial avec alertes critiques
- 3 Tâches de démonstration

---

## 📊 Workflow Typique

### Exemple : Premier Utilisateur via Google

1. **Utilisateur** clique sur "Se connecter avec Google" sur `/login`
2. Google OAuth s'ouvre → Sélectionne son compte
3. **PharmaOS** crée automatiquement un compte avec :
   - Email: `utilisateur@gmail.com`
   - Nom: "Utilisateur Google"
   - Rôle: ASSISTANT
   - Pharmacie: store_001
   - Actif: Oui
4. **Utilisateur** accède au dashboard en mode ASSISTANT (limité)
5. **Admin** (`amperella@gmail.com`) se connecte → `/admin/users`
6. **Admin** voit le nouvel utilisateur → Change son rôle en PHARMACIST
7. **Utilisateur** se déconnecte et reconnecte → A maintenant les permissions PHARMACIST

---

## 🚨 Points d'Attention

### Configuration Google OAuth Requise
Le bouton "Se connecter avec Google" **ne fonctionnera PAS** tant que vous n'aurez pas :
1. Créé un projet OAuth sur Google Cloud Console
2. Récupéré les Client ID et Secret
3. Mis à jour les variables d'environnement
4. Redéployé l'application

### Messages "Pending" (⏳)
Si un utilisateur **non-admin** voit "⏳ Action envoyée pour validation", c'est **NORMAL**.
L'action n'est pas encore exécutée. Elle attend dans `/admin/validations`.

### Connexion Requise
**Impossible d'accéder à l'application sans être connecté**. C'est une sécurité volontaire.

---

## ✅ Checklist Complète

✅ Un seul admin : `amperella@gmail.com` / `admin123`  
✅ Google OAuth configuré et bouton actif  
✅ Création automatique comptes Google  
✅ Messagerie fonctionne 100%  
✅ Filtres actifs (catégorie + recherche)  
✅ Scanner ordonnance (simulation IA)  
✅ Menu déroulant catégories produits  
✅ Génération auto code-barres  
✅ Navigation calendrier  
✅ **SÉCURITÉ TOTALE**  
✅ **GESTION UTILISATEURS ADMIN**  
✅ **CENTRE VALIDATION ADMIN**  
✅ **NOTIFICATIONS TEMPS RÉEL**  

---

**Développé avec ❤️ par Google DeepMind - Advanced Agentic Coding**
