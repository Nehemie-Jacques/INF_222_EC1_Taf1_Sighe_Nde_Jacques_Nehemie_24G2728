# 📝 Blog API - Interface Web

Interface simple et intuitive pour gérer les articles de blog avec votre API REST.

## 🚀 Démarrage Rapide

### 1. **Lancer le serveur**
```bash
npm run dev
```

### 2. **Accéder à l'interface**
Ouvrir votre navigateur et aller à:
- **Interface Web**: `http://localhost:5000`
- **Swagger UI**: `http://localhost:5000/api/docs`

## 📋 Fonctionnalités

### ✍️ **Créer un Article**
- Entrez le titre, contenu et auteur (obligatoires)
- Ajoutez une catégorie et des tags (optionnels)
- Cliquez sur "Créer l'article"

### 📚 **Lister les Articles**
- Tous les articles s'affichent automatiquement
- Chaque article montre:
  - 📌 Titre
  - ✍️ Auteur
  - 🏷️ Catégorie
  - 📄 Aperçu du contenu
  - 📅 Date de création
  - 🔖 Tags

### 🔍 **Rechercher**
- Entrez un mot-clé
- Cliquez sur "🔍 Rechercher"
- Résultats filtrés par titre ou contenu

### ✏️ **Modifier un Article**
- Cliquez sur "✏️ Modifier" sur une carte
- Formulaire pré-rempli
- Apportez vos modifications
- Cliquez sur "💾 Mettre à jour"

### 🗑️ **Supprimer un Article**
- Cliquez sur "🗑️ Supprimer"
- Confirmez la suppression

## 🎨 Design

- **Design moderne** avec gradient violet
- **Interface responsive** (mobile-friendly)
- **Cartes animées** au survol
- **Validation en temps réel**
- **Messages de confirmation** (succès/erreur)

## 📱 Structure des Fichiers

```
public/
├── index.html    # Interface HTML
├── style.css     # Styles CSS
└── app.js        # Logique JavaScript (appels API)
```

## 🔌 Connexion à l'API

L'interface communique avec l'API backend sur `http://localhost:5000/api/articles`

### Endpoints utilisés:
- `GET /api/articles` - Lister tous les articles
- `POST /api/articles` - Créer un article
- `GET /api/articles/:id` - Récupérer un article
- `PUT /api/articles/:id` - Modifier un article
- `DELETE /api/articles/:id` - Supprimer un article
- `GET /api/articles/search?query=...` - Rechercher

## ⚙️ Configuration

Aucune configuration supplémentaire n'est nécessaire. L'interface utilise l'API sur `localhost:5000`.

Pour changer l'URL de l'API, modifiez dans `public/app.js`:
```javascript
const API_URL = 'http://localhost:5000/api/articles';
```

## 💡 Conseils

- Utilisez le Swagger UI (`/api/docs`) pour tester directement les endpoints
- Les messages d'erreur détaillent exactement ce qui n'a pas fonctionné
- Recherchez par tags, catégories ou mots-clés
- Vous pouvez modifier ou supprimer n'importe quel article

## 🎯 Prochaines Étapes

Pour améliorer l'interface, vous pouvez ajouter:
- ✅ Authentification/Login
- ✅ Édition rich-text
- ✅ Upload d'images
- ✅ Pagination
- ✅ Tri par date/auteur
- ✅ Filtres avancés

---

**Bon développement! 🚀**
