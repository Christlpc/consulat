# 🇨🇬 Site Web du Consulat Général de la République du Congo en Tunisie

## 📊 Récapitulatif du projet

**Status** : ✅ COMPLET

**Technologies** :
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Prisma ORM
- PostgreSQL
- NextAuth.js

---

## 🎯 Fonctionnalités implémentées

### ✅ FRONTEND (Site Public)

#### Pages principales
- **Page d'accueil** (`/`) - Design élégant avec hero section, services et CTA
- **Services** (`/services`) - Vue d'ensemble des services consulaires
- **Contact** (`/contact`) - Formulaire de contact avec carte et informations
- **Actualités** (`/actualites`) - Liste des articles avec filtres
- **Article détaillé** (`/actualites/[slug]`) - Vue complète d'un article

#### Formulaires de services en ligne
1. **Demande de Visa** (`/services/visa`)
   - Formulaire multi-étapes (4 étapes)
   - Types : Tourisme, Affaires, Études, Travail, Transit
   - Upload de documents (photo, passeport)
   - Numéro de référence généré automatiquement

2. **Carte Consulaire** (`/services/carte-consulaire`)
   - Inscription au registre consulaire
   - Upload de photo, passeport, justificatif de domicile

3. **Laissez-Passer** (`/services/laissez-passer`)
   - Document de voyage temporaire
   - Justification de la demande

4. **Actes d'État Civil** (`/services/etat-civil`)
   - Acte de naissance, mariage, décès
   - Certificat de célibat, certificat de vie
   - Nombre de copies personnalisable

5. **Actes Consulaires** (`/services/actes-consulaires`)
   - Légalisation de documents
   - Attestations, procurations
   - Certificat de coutume

### ✅ BACKEND (API)

#### Routes API créées
- `POST /api/contact` - Enregistrer un message de contact
- `POST /api/applications/visa` - Créer une demande de visa
- `POST /api/applications/consular-card` - Créer une demande de carte consulaire
- `POST /api/applications/travel-document` - Créer une demande de laissez-passer
- `POST /api/applications/civil-status` - Créer une demande d'acte d'état civil
- `POST /api/applications/consular-document` - Créer une demande d'acte consulaire
- `POST /api/seed` - Initialiser la base de données

#### Système d'authentification
- NextAuth.js avec stratégie JWT
- Login par email/mot de passe
- Protection des routes admin avec middleware
- Gestion des rôles (ADMIN, AGENT)

### ✅ BACKOFFICE (Administration)

#### Dashboard
- **Tableau de bord** (`/admin`) 
  - Statistiques en temps réel
  - Demandes récentes
  - Métriques clés (visas, cartes, messages, etc.)

#### Gestion des demandes
- **Visas** (`/admin/demandes/visas`)
  - Liste complète avec filtres
  - Statuts : En attente, En examen, Approuvé, Rejeté, etc.
  - Recherche par nom ou référence

- **Cartes consulaires** (`/admin/demandes/cartes-consulaires`)
- **Laissez-passer** (`/admin/demandes/laissez-passer`)
- **État civil** (`/admin/demandes/etat-civil`)
- **Actes consulaires** (`/admin/demandes/actes-consulaires`)

#### Gestion du contenu
- **Actualités** (`/admin/actualites`)
  - Liste des articles avec filtres
  - Création, modification, suppression
  - Gestion des statuts (Brouillon, Publié, Archivé)
  - Catégories : Diplomatie, Communauté, Culture, Événements, Annonces

- **Messages** (`/admin/messages`)
  - Consultation des messages de contact
  - Marquage lu/non lu
  - Statistiques

#### Authentification
- **Login** (`/admin/login`)
  - Design élégant avec armoiries
  - Validation sécurisée
  - Redirection automatique

### ✅ BASE DE DONNÉES (Prisma)

#### Modèles créés
1. `User` - Utilisateurs administrateurs
2. `Article` - Articles et actualités
3. `VisaApplication` - Demandes de visa
4. `ConsularCardApplication` - Cartes consulaires
5. `TravelDocumentApplication` - Laissez-passer
6. `CivilStatusDocument` - Actes d'état civil
7. `ConsularDocument` - Actes consulaires
8. `ContactMessage` - Messages de contact
9. `SiteSetting` - Paramètres du site

#### Énumérations
- `UserRole` : ADMIN, AGENT
- `ArticleCategory` : DIPLOMATIE, COMMUNAUTE, CULTURE, EVENEMENTS, ANNONCES_OFFICIELLES
- `ArticleStatus` : DRAFT, PUBLISHED, ARCHIVED
- `VisaType` : TOURISME, AFFAIRES, ETUDES, TRAVAIL, TRANSIT
- `ApplicationStatus` : PENDING, IN_REVIEW, APPROVED, READY, REJECTED, COMPLETED
- `CivilDocumentType` : ACTE_NAISSANCE, ACTE_MARIAGE, ACTE_DECES, CERTIFICAT_CELIBAT, CERTIFICAT_VIE
- `ConsularDocumentType` : LEGALISATION, ATTESTATION, PROCURATION, CERTIFICAT_COUTUME, AUTRE

### ✅ COMPOSANTS UI

#### Composants publics
- `Header` - En-tête avec navigation et menu mobile
- `Footer` - Pied de page complet avec liens et contact
- `ServiceCard` - Carte de service avec icône et description
- `FormField` - Champ de formulaire avec validation
- `SelectField` - Champ de sélection
- `TextAreaField` - Zone de texte
- `FileUpload` - Upload de fichiers avec drag & drop
- `FormStepper` - Indicateur d'étapes pour formulaires
- `LoadingSpinner` - Indicateur de chargement
- `StatusBadge` - Badge de statut coloré

#### Composants admin
- `Sidebar` - Barre latérale de navigation admin
- Tables admin avec styles prédéfinis

### ✅ STYLES

#### Palette de couleurs
- **Congo** : Vert (#00894F) - Couleur principale
- **Gold** : Or (#F4C300) - Couleur secondaire
- **Dégradés** personnalisés

#### Classes utilitaires
- Boutons : `.btn`, `.btn-primary`, `.btn-secondary`
- Inputs : `.input`, `.label`
- Cards : `.card`, `.card-bordered`
- Badges : `.badge`, `.badge-success`, `.badge-warning`, `.badge-error`
- Tables : `.table-admin`
- Animations : `fadeIn`, `fadeInUp`

---

## 📁 Structure des fichiers

```
Consulat/
├── app/
│   ├── (public)/              # Routes publiques
│   │   ├── page.tsx           # Accueil
│   │   ├── layout.tsx         # Layout public
│   │   ├── contact/           
│   │   ├── services/          
│   │   │   ├── page.tsx
│   │   │   ├── visa/
│   │   │   ├── carte-consulaire/
│   │   │   ├── laissez-passer/
│   │   │   ├── etat-civil/
│   │   │   └── actes-consulaires/
│   │   └── actualites/
│   │       ├── page.tsx
│   │       └── [slug]/
│   ├── admin/                 # Backoffice
│   │   ├── page.tsx           # Dashboard
│   │   ├── layout.tsx         # Layout admin
│   │   ├── login/
│   │   ├── demandes/
│   │   │   ├── visas/
│   │   │   ├── cartes-consulaires/
│   │   │   ├── laissez-passer/
│   │   │   ├── etat-civil/
│   │   │   └── actes-consulaires/
│   │   ├── actualites/
│   │   └── messages/
│   ├── api/                   # API Routes
│   │   ├── auth/
│   │   ├── contact/
│   │   ├── applications/
│   │   └── seed/
│   ├── layout.tsx             # Root layout
│   ├── globals.css            # Styles globaux
│   └── not-found.tsx          # Page 404
├── components/                # Composants
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── ServiceCard.tsx
│   ├── FormField.tsx
│   ├── SelectField.tsx
│   ├── TextAreaField.tsx
│   ├── FileUpload.tsx
│   ├── FormStepper.tsx
│   ├── LoadingSpinner.tsx
│   ├── StatusBadge.tsx
│   ├── SessionProvider.tsx
│   └── admin/
│       └── Sidebar.tsx
├── lib/                       # Bibliothèques
│   ├── prisma.ts
│   ├── auth.ts
│   └── utils.ts
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── public/
│   ├── armoirie-Congo.png
│   └── uploads/
├── types/
│   └── next-auth.d.ts
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.mjs
├── middleware.ts
├── README.md
└── INSTALLATION.md
```

---

## 🚀 Pour démarrer

### Installation rapide

```bash
# 1. Installer les dépendances
npm install

# 2. Configurer .env (déjà fait)
# Vérifiez DATABASE_URL avec vos identifiants PostgreSQL

# 3. Initialiser la base de données
npx prisma generate
npx prisma db push

# 4. Peupler avec des données initiales
npm run seed

# 5. Lancer le serveur
npm run dev
```

### Accès

- **Site public** : http://localhost:3000
- **Backoffice** : http://localhost:3000/admin
- **Login** : admin@consulatcongo.tn / CongoAdmin2024!

---

## 📝 Données de test créées

Le script `npm run seed` crée :

### Utilisateurs
- **Admin** : admin@consulatcongo.tn / CongoAdmin2024!
- **Agent** : agent@consulatcongo.tn / Agent2024!

### Articles
- "Bienvenue sur le nouveau site du Consulat"
- "Célébration de la Fête Nationale"
- "Nouvelles procédures de visa"

### Paramètres
- Nom du site
- Email de contact
- Téléphone
- Adresse

---

## 🎨 Design

### Inspirations respectées
- ✅ Couleurs gouvernementales (vert Congo et or)
- ✅ Design élégant et professionnel
- ✅ Armoiries de la République du Congo intégrées
- ✅ Interface moderne et premium
- ✅ Responsive sur tous les écrans

### Écrans de référence utilisés
- `screen.png` - Page de formulaires avec stepper
- `screen-2.png` - Page de contact
- `screen-3.png` - Backoffice de gestion des actualités

---

## ✨ Points forts du projet

1. **Architecture complète** : Frontend + Backend + Backoffice
2. **Sécurité** : Authentification, validation, protection des routes
3. **UX optimale** : Formulaires multi-étapes, feedback utilisateur
4. **Design premium** : Animations, transitions, couleurs gouvernementales
5. **Code propre** : TypeScript, composants réutilisables, structure claire
6. **Base de données robuste** : Prisma ORM, relations, énumérations
7. **Documentation** : README complet, guide d'installation

---

## 🔐 Sécurité implémentée

- ✅ Hachage des mots de passe avec bcryptjs
- ✅ JWT pour les sessions
- ✅ Middleware de protection des routes admin
- ✅ Validation des données côté serveur
- ✅ Protection CSRF via NextAuth
- ✅ Variables d'environnement pour les secrets

---

## 📊 Prochaines améliorations possibles

1. Upload réel de fichiers (actuellement des placeholders)
2. Système d'emails pour les notifications
3. Export PDF des demandes
4. Système de paiement en ligne
5. Suivi en temps réel du statut
6. Chat en direct avec le consulat
7. Multi-langue (français, anglais)
8. Système de rendez-vous en ligne

---

## 📞 Support

Pour toute question sur le code :
- Consultez `README.md` pour la documentation générale
- Consultez `INSTALLATION.md` pour l'installation détaillée
- Vérifiez les commentaires dans le code

---

**Projet développé avec ❤️ pour le Consulat Général de la République du Congo en Tunisie**

🇨🇬 **Unité • Travail • Progrès** 🇹🇳


