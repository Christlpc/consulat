# Guide d'installation - Consulat du Congo

## 📋 Prérequis

Avant de commencer, assurez-vous d'avoir installé :
- **Node.js** version 18 ou supérieure
- **PostgreSQL** version 14 ou supérieure
- **npm** ou **yarn**
- **Git**

## 🚀 Installation étape par étape

### 1. Configuration de la base de données PostgreSQL

#### Sur Windows
1. Téléchargez PostgreSQL depuis https://www.postgresql.org/download/windows/
2. Installez PostgreSQL avec les paramètres par défaut
3. Notez le mot de passe que vous définissez pour l'utilisateur `postgres`
4. Ouvrez pgAdmin ou psql et créez une nouvelle base de données :

```sql
CREATE DATABASE consulat_congo;
```

#### Sur macOS
```bash
brew install postgresql
brew services start postgresql
createdb consulat_congo
```

#### Sur Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo -u postgres createdb consulat_congo
```

### 2. Installation du projet

```bash
# Naviguer vers le dossier du projet
cd "C:\Users\chris\OneDrive\Documents\Christ LANDZI\Projets\Consulat"

# Installer les dépendances
npm install
```

### 3. Configuration de l'environnement

Le fichier `.env` a déjà été créé avec des valeurs par défaut. Modifiez-le selon vos besoins :

```env
# Modifiez cette ligne avec vos identifiants PostgreSQL
DATABASE_URL="postgresql://postgres:VOTRE_MOT_DE_PASSE@localhost:5432/consulat_congo?schema=public"

# Générez un secret sécurisé pour la production
NEXTAUTH_SECRET="consulat-congo-secret-key-change-this-in-production"
NEXTAUTH_URL="http://localhost:3000"
```

Pour générer un secret sécurisé :
```bash
# Sur Linux/macOS
openssl rand -base64 32

# Sur Windows PowerShell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
```

### 4. Initialisation de la base de données

```bash
# Générer le client Prisma
npx prisma generate

# Créer les tables dans la base de données
npx prisma db push

# Peupler la base de données avec des données initiales
npm run seed
```

Après le seed, vous aurez :
- **Compte Administrateur** : admin@consulatcongo.tn / CongoAdmin2024!
- **Compte Agent** : agent@consulatcongo.tn / Agent2024!
- 3 articles d'exemple
- Paramètres du site de base

### 5. Lancement du projet

```bash
# Mode développement
npm run dev

# Le site sera accessible sur http://localhost:3000
# Le backoffice sur http://localhost:3000/admin
```

## 🔧 Commandes utiles

```bash
# Développement
npm run dev                # Lancer le serveur de développement

# Base de données
npx prisma studio          # Interface graphique pour la BDD
npx prisma db push         # Synchroniser le schéma avec la BDD
npx prisma migrate dev     # Créer une nouvelle migration
npx prisma generate        # Générer le client Prisma

# Production
npm run build             # Build pour la production
npm run start             # Démarrer en mode production

# Autres
npm run lint              # Vérifier le code
npm run seed              # Réinitialiser les données
```

## 📱 Accès au site

### Site public
- **URL** : http://localhost:3000
- Pages principales :
  - Accueil : `/`
  - Services : `/services`
  - Contact : `/contact`
  - Actualités : `/actualites`
  - Demande de visa : `/services/visa`
  - Autres services : `/services/carte-consulaire`, etc.

### Backoffice
- **URL** : http://localhost:3000/admin
- **Login** : http://localhost:3000/admin/login
- **Identifiants** : 
  - Email : `admin@consulatcongo.tn`
  - Mot de passe : `CongoAdmin2024!`

## 🐛 Résolution des problèmes courants

### Erreur de connexion PostgreSQL
```
Error: P1001: Can't reach database server
```
**Solution** :
1. Vérifiez que PostgreSQL est en cours d'exécution
2. Vérifiez vos identifiants dans `.env`
3. Vérifiez que la base de données `consulat_congo` existe

### Erreur "Module not found"
```bash
# Supprimez node_modules et réinstallez
rm -rf node_modules
npm install
```

### Erreur Prisma Client
```bash
# Régénérez le client Prisma
npx prisma generate
```

### Port 3000 déjà utilisé
```bash
# Utilisez un autre port
PORT=3001 npm run dev
```

## 📦 Structure des fichiers importants

```
Consulat/
├── .env                     # Variables d'environnement (NE PAS COMMITER)
├── package.json             # Dépendances du projet
├── prisma/
│   ├── schema.prisma       # Schéma de la base de données
│   └── seed.ts             # Données initiales
├── app/
│   ├── (public)/           # Pages publiques
│   ├── admin/              # Pages admin
│   └── api/                # API routes
├── components/             # Composants réutilisables
├── lib/                    # Bibliothèques
└── public/                 # Fichiers statiques
```

## 🔒 Sécurité

### Avant de mettre en production :
1. ✅ Changez le `NEXTAUTH_SECRET` dans `.env`
2. ✅ Changez les mots de passe administrateur par défaut
3. ✅ Configurez une vraie base de données (pas localhost)
4. ✅ Activez HTTPS
5. ✅ Configurez les CORS appropriés
6. ✅ Activez les sauvegardes de la base de données

## 📞 Support

En cas de problème :
1. Vérifiez ce guide d'installation
2. Consultez les logs d'erreur dans la console
3. Vérifiez la documentation Next.js : https://nextjs.org/docs
4. Vérifiez la documentation Prisma : https://www.prisma.io/docs

## ✅ Checklist d'installation

- [ ] PostgreSQL installé et en cours d'exécution
- [ ] Node.js 18+ installé
- [ ] Base de données `consulat_congo` créée
- [ ] Dépendances npm installées
- [ ] Fichier `.env` configuré
- [ ] `npx prisma db push` exécuté
- [ ] `npm run seed` exécuté
- [ ] `npm run dev` fonctionne
- [ ] Accès au site sur http://localhost:3000
- [ ] Connexion au backoffice réussie

---

**Félicitations !** 🎉 Votre site du Consulat est maintenant opérationnel !


