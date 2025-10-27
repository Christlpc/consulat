# Site Web du Consulat Général de la République du Congo en Tunisie

Site web officiel du Consulat Général de la République du Congo en Tunisie, développé avec Next.js 14, TypeScript, Tailwind CSS et Prisma.

## 🌟 Fonctionnalités

### Frontend (Site Public)
- ✅ Page d'accueil élégante et gouvernementale
- ✅ Services consulaires en ligne
- ✅ Demande de visa (tourisme, affaires, études, travail, transit)
- ✅ Demande de carte consulaire
- ✅ Demande de laissez-passer
- ✅ Demande d'actes d'état civil
- ✅ Demande d'actes consulaires
- ✅ Section actualités
- ✅ Page de contact avec formulaire
- ✅ Design responsive et moderne

### Backend (Backoffice)
- ✅ Dashboard administrateur
- ✅ Gestion des demandes de visa
- ✅ Gestion des cartes consulaires
- ✅ Gestion des laissez-passer
- ✅ Gestion des actes d'état civil et consulaires
- ✅ Gestion des actualités (CRUD)
- ✅ Gestion des messages de contact
- ✅ Système d'authentification sécurisé
- ✅ Interface administrateur intuitive

## 🚀 Installation

### Prérequis
- Node.js 18+ 
- PostgreSQL
- npm ou yarn

### Étapes d'installation

1. **Cloner le projet**
```bash
cd Consulat
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer les variables d'environnement**
```bash
cp .env.example .env
```

Modifiez le fichier `.env` avec vos configurations :
- `DATABASE_URL` : URL de connexion PostgreSQL
- `NEXTAUTH_SECRET` : Secret pour NextAuth (générez-en un avec `openssl rand -base64 32`)
- `NEXTAUTH_URL` : URL de votre application

4. **Initialiser la base de données**
```bash
npx prisma generate
npx prisma db push
```

5. **Créer un compte administrateur**
```bash
npm run seed
```

6. **Lancer le serveur de développement**
```bash
npm run dev
```

Le site sera accessible sur [http://localhost:3000](http://localhost:3000)

## 📁 Structure du projet

```
Consulat/
├── app/                      # Application Next.js (App Router)
│   ├── (public)/            # Routes publiques
│   │   ├── page.tsx         # Page d'accueil
│   │   ├── contact/         # Page de contact
│   │   ├── services/        # Pages des services
│   │   └── actualites/      # Page des actualités
│   ├── admin/               # Backoffice
│   │   ├── login/           # Page de connexion
│   │   ├── demandes/        # Gestion des demandes
│   │   ├── actualites/      # Gestion des actualités
│   │   └── messages/        # Gestion des messages
│   └── api/                 # API Routes
│       ├── auth/            # Authentification
│       ├── contact/         # API messages de contact
│       └── applications/    # API demandes
├── components/              # Composants réutilisables
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── FormField.tsx
│   └── admin/              # Composants admin
├── lib/                     # Bibliothèques et utilitaires
│   ├── prisma.ts           # Client Prisma
│   └── auth.ts             # Configuration NextAuth
├── prisma/                  # Schéma de base de données
│   └── schema.prisma
├── public/                  # Fichiers statiques
│   └── armoirie-Congo.png  # Armoiries
└── tailwind.config.ts       # Configuration Tailwind
```

## 🎨 Design

Le design s'inspire des codes visuels gouvernementaux congolais :
- **Couleurs principales** : Vert Congo (#00894F) et Or (#F4C300)
- **Police** : Inter (texte) et Montserrat (titres)
- **Style** : Moderne, professionnel et accessible

## 🔐 Authentification

Le backoffice est protégé par NextAuth avec authentification par email/mot de passe.

**Compte par défaut :**
- Email : `admin@consulatcongo.tn`
- Mot de passe : `CongoAdmin2024!`

⚠️ **Changez ces identifiants en production !**

## 📊 Base de données

Le projet utilise PostgreSQL avec Prisma ORM.

**Modèles principaux :**
- `User` : Utilisateurs administrateurs
- `Article` : Actualités et articles
- `VisaApplication` : Demandes de visa
- `ConsularCardApplication` : Demandes de carte consulaire
- `TravelDocumentApplication` : Demandes de laissez-passer
- `CivilStatusDocument` : Actes d'état civil
- `ConsularDocument` : Actes consulaires
- `ContactMessage` : Messages de contact

## 🛠️ Technologies utilisées

- **Framework** : Next.js 14 (App Router)
- **Langage** : TypeScript
- **Styling** : Tailwind CSS
- **Base de données** : PostgreSQL
- **ORM** : Prisma
- **Authentification** : NextAuth.js
- **Validation** : Zod
- **Icônes** : Lucide React
- **Dates** : date-fns

## 📝 Scripts disponibles

```bash
npm run dev          # Démarrer en mode développement
npm run build        # Build pour production
npm run start        # Démarrer en production
npm run lint         # Linter le code
npm run seed         # Peupler la base de données
```

## 🌐 Déploiement

Le site peut être déployé sur :
- **Vercel** (recommandé pour Next.js)
- **Railway**
- **DigitalOcean**
- **AWS**

### Déploiement sur Vercel

1. Créer un compte sur [Vercel](https://vercel.com)
2. Connecter votre repository Git
3. Configurer les variables d'environnement
4. Déployer !

## 📧 Support

Pour toute question ou assistance :
- Email : contact@consulatcongo.tn
- Téléphone : +216 71 860 123

## 📄 Licence

© 2024 Consulat Général de la République du Congo en Tunisie. Tous droits réservés.

---

Développé avec ❤️ pour la communauté congolaise en Tunisie


