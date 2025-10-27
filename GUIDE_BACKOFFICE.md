# Guide du Backoffice - Consulat Général du Congo

## 🎯 Fonctionnalités Complètes du Système

### 1. **Gestion des Demandes**

Le système permet de gérer 5 types de demandes consulaires :

#### Types de Demandes
- ✅ **Demandes de Visa** (`/admin/demandes/visas`)
- ✅ **Cartes Consulaires** (`/admin/demandes/cartes-consulaires`)
- ✅ **Laissez-Passer** (`/admin/demandes/laissez-passer`)
- ✅ **Actes d'État Civil** (`/admin/demandes/etat-civil`)
- ✅ **Actes Consulaires** (`/admin/demandes/actes-consulaires`)

### 2. **Workflow de Traitement des Demandes**

#### Statuts Disponibles
1. **PENDING** (En attente) - Nouvelle demande
2. **IN_REVIEW** (En examen) - Demande en cours d'analyse
3. **APPROVED** (Approuvée) - Demande acceptée
4. **READY** (Prête pour retrait) - Document prêt à être retiré
5. **REJECTED** (Rejetée) - Demande refusée
6. **COMPLETED** (Complétée) - Processus terminé

#### Actions Disponibles par Statut

**Pour les demandes PENDING :**
- ✅ **Approuver** - Valider la demande
- ✅ **Mettre en examen** - Marquer comme en cours d'analyse
- ✅ **Rejeter** - Refuser avec motif obligatoire

**Pour les demandes APPROVED :**
- ✅ **Marquer comme prêt** - Indiquer que le document est prêt pour retrait
- ✅ **Imprimer le document** - Générer le document officiel

**Pour les demandes READY :**
- ✅ **Imprimer le document** - Réimprimer si nécessaire

### 3. **Système de Notification Automatique**

#### Notifications par Email
Lorsqu'un statut change, un email est automatiquement envoyé au demandeur :

**Email pour APPROBATION :**
```
Sujet: Mise à jour de votre Demande de [Type]

Bonjour [Prénom] [Nom],

Votre demande (Référence: [REF]) a été Approuvée.

[Note du consul si ajoutée]

Cordialement,
Le Consulat Général de la République du Congo en Tunisie
```

**Email pour REJET :**
```
Sujet: Mise à jour de votre Demande de [Type]

Bonjour [Prénom] [Nom],

Votre demande (Référence: [REF]) a été Rejetée.

Motif: [Motif du rejet obligatoire]

Pour plus d'informations, veuillez nous contacter.

Cordialement,
Le Consulat Général de la République du Congo en Tunisie
```

**Email pour PRÊT :**
```
Sujet: Mise à jour de votre Demande de [Type]

Bonjour [Prénom] [Nom],

Votre demande (Référence: [REF]) est Prête pour retrait.

Vous pouvez venir retirer votre document au consulat aux heures d'ouverture.

Horaires: Lundi - Vendredi, 9h00 - 16h00
Adresse: Rue du Lac Léman, Immeuble Lac 2000, Les Berges du Lac 1053, Tunis

Cordialement,
Le Consulat Général de la République du Congo en Tunisie
```

### 4. **Système d'Impression des Documents**

#### Documents Imprimables
Tous les documents approuvés peuvent être imprimés avec :

**En-tête Officiel :**
- Mention "RÉPUBLIQUE DU CONGO"
- "CONSULAT GÉNÉRAL EN TUNISIE"
- Type de document en titre

**Contenu du Document :**
- Toutes les informations du demandeur
- Détails de la demande
- Informations administratives
- Note du consul si présente

**Pied de Document :**
- Date de délivrance
- Espace pour signature du Consul Général
- Emplacement pour cachet du Consulat
- Mentions légales spécifiques au type de document

#### Comment Imprimer
1. Ouvrir le détail de la demande approuvée
2. Cliquer sur "Imprimer le document"
3. Le navigateur ouvre la fenêtre d'impression
4. Le document est formaté en A4 avec marges de 2cm
5. Seul le contenu pertinent est imprimé (sans navigation, sidebar, boutons)

### 5. **Pages de Détails**

Chaque demande dispose d'une page de détail complète accessible depuis la liste :

**Structure des Pages de Détail :**
```
/admin/demandes/[type]/[id]

Exemple:
/admin/demandes/visas/cm123abc
/admin/demandes/cartes-consulaires/cm456def
/admin/demandes/etat-civil/cm789ghi
```

**Informations Affichées :**
- ✅ Informations personnelles du demandeur
- ✅ Coordonnées (email, téléphone, adresse)
- ✅ Détails spécifiques à la demande
- ✅ Documents joints avec liens de téléchargement
- ✅ Historique des statuts
- ✅ Notes du consul
- ✅ Boutons d'action selon le statut

### 6. **Modals de Validation**

#### Modal d'Approbation
- Confirmation de l'action
- Champ optionnel pour ajouter une note
- Message informatif pour le demandeur

#### Modal de Rejet
- Champ **obligatoire** pour le motif du rejet
- Validation avant envoi
- Le motif est envoyé au demandeur par email

### 7. **API Routes Créées**

#### Route de Mise à Jour de Statut
```
PATCH /api/admin/applications/[type]/[id]/status

Body:
{
  "status": "APPROVED" | "REJECTED" | "IN_REVIEW" | "READY",
  "statusNote": "Note optionnelle ou motif obligatoire pour rejet"
}

Response:
{
  "id": "...",
  "status": "...",
  "statusNote": "...",
  "updatedAt": "..."
}
```

#### Route de Notification Email
```
POST /api/notifications/email

Body:
{
  "to": "email@example.com",
  "type": "status_update",
  "applicationData": {
    "type": "visa",
    "referenceNumber": "REF-123",
    "status": "APPROVED",
    "statusNote": "Document prêt",
    "firstName": "Jean",
    "lastName": "Dupont"
  }
}

Response:
{
  "success": true,
  "message": "Email envoyé (simulé)"
}
```

### 8. **Sécurité et Autorisations**

#### Protection des Routes
- ✅ Toutes les pages admin nécessitent une authentification
- ✅ Seuls les utilisateurs ADMIN peuvent changer les statuts
- ✅ Redirection automatique vers login si non connecté
- ✅ Sessions sécurisées avec NextAuth

#### Logs et Traçabilité
- Date de soumission enregistrée
- Date de dernière mise à jour enregistrée
- Historique des notes du consul
- Référence unique pour chaque demande

## 📋 Guide d'Utilisation

### Pour Traiter une Demande

1. **Accéder à la Liste**
   - Aller dans le menu "Demandes" dans la sidebar
   - Choisir le type de demande

2. **Consulter le Détail**
   - Cliquer sur "Voir détails" pour la demande concernée
   - Examiner toutes les informations et documents

3. **Télécharger les Documents**
   - Cliquer sur les liens "Voir le fichier" pour chaque document joint
   - Vérifier l'authenticité et la validité des documents

4. **Prendre une Décision**
   - **Pour Approuver :**
     - Cliquer sur "Approuver"
     - Ajouter une note optionnelle
     - Confirmer l'approbation
     - Email automatique envoyé au demandeur
   
   - **Pour Rejeter :**
     - Cliquer sur "Rejeter"
     - **Saisir obligatoirement le motif** du rejet
     - Confirmer le rejet
     - Email automatique avec motif envoyé au demandeur

5. **Imprimer le Document**
   - Une fois approuvé, cliquer sur "Imprimer le document"
   - Vérifier le document dans l'aperçu avant impression
   - Imprimer sur papier officiel du consulat
   - **Faire signer par le Consul Général**
   - **Apposer le cachet officiel du Consulat**

6. **Marquer comme Prêt**
   - Une fois le document signé et tamponné
   - Cliquer sur "Marquer comme prêt"
   - Email automatique envoyé pour informer le demandeur
   - Le demandeur peut venir retirer son document

## 🔧 Configuration SMTP (Production)

**Actuellement**, les emails sont simulés (affichés dans les logs du serveur).

**Pour activer les emails réels en production :**

1. Configurer les variables d'environnement dans `.env` :
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=votre-email@consulatcongo.tn
SMTP_PASSWORD=votre-mot-de-passe-app
SMTP_FROM=noreply@consulatcongo.tn
```

2. Installer un package de gestion d'emails :
```bash
npm install nodemailer
```

3. Modifier `/app/api/notifications/email/route.ts` pour utiliser Nodemailer

## 🎨 Personnalisation

### Modifier les Templates d'Impression
Les templates sont dans les pages de détails :
- `/app/admin/(dashboard)/demandes/visas/[id]/page.tsx`
- `/app/admin/(dashboard)/demandes/cartes-consulaires/[id]/page.tsx`
- etc.

Section à modifier : `{(application.status === 'APPROVED' || application.status === 'READY') && ...}`

### Modifier les Emails
Template des emails : `/app/api/notifications/email/route.ts`

## 📞 Support

Pour toute question ou problème :
- **Email**: admin@consulatcongo.tn
- **Documentation**: Ce fichier
- **Logs**: Console du serveur Next.js

---

**Version**: 1.0.0  
**Date**: Octobre 2024  
**Développé pour**: Consulat Général de la République du Congo en Tunisie

