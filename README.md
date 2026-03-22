# 📝 Blog API - Documentation Essentielle

Une API REST pour gérer des articles de blog avec Node.js, Express et MongoDB.

## ⚡ Installation rapide

```bash
# 1. Installer les dépendances
npm install

# 2. Vérifier le fichier .env
cat .env
# Doit contenir: MONGO_URI=mongodb://localhost:27017/blog_api

# 3. Lancer MongoDB (terminal séparé)
mongod

# 4. Démarrer le serveur
npm run dev
```

Le serveur démarre sur `http://localhost:5000`

## ⚙️ Configuration

### Variables d'environnement (.env)

| Variable | Description | Exemple |
|----------|-------------|---------|
| `MONGO_URI` | URL de connexion MongoDB | `mongodb://localhost:27017/blog_api` |
| `PORT` | Port du serveur | `5000` |
| `NODE_ENV` | Environnement | `development` ou `production` |

### Connexion MongoDB

L'application se connecte automatiquement à MongoDB au démarrage. Vous verrez les messages :
- ✅ MongoDB connecté (succès)
- ❌ Erreur si la connexion échoue

## 📡 Endpoints (6)

### 1. **POST /api/articles** - Créer
```bash
curl -X POST http://localhost:5000/api/articles \
  -H "Content-Type: application/json" \
  -d '{"titre":"Mon article","contenu":"Contenu...","auteur":"Jean","categorie":"Tech","tags":["nodejs"]}'
```
**Réponse:** `201 Created` avec l'article créé

---

### 2. **GET /api/articles** - Lister tous
```bash
curl http://localhost:5000/api/articles
```
Filtres: `?categorie=Tech&auteur=Jean&date=2024-03-22`

---

### 3. **GET /api/articles/search** - Rechercher
```bash
curl "http://localhost:5000/api/articles/search?query=nodejs"
```

---

### 4. **GET /api/articles/:id** - Obtenir un
```bash
curl http://localhost:5000/api/articles/507f1f77bcf86cd799439011
```

---

### 5. **PUT /api/articles/:id** - Modifier
```bash
curl -X PUT http://localhost:5000/api/articles/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{"titre":"Nouveau titre","contenu":"Contenu...","auteur":"Jean"}'
```

---

### 6. **DELETE /api/articles/:id** - Supprimer
```bash
curl -X DELETE http://localhost:5000/api/articles/507f1f77bcf86cd799439011
```

---

## 🧪 Tests

- **Postman:** Importer `postman_collection.json`
- **Swagger UI:** http://localhost:5000/api/docs
- **cURL:** Exemples ci-dessus

---

## 💻 JavaScript/Fetch

```javascript
// Créer
fetch('http://localhost:5000/api/articles', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({titre:'Article',contenu:'Contenu',auteur:'Jean'})
}).then(r => r.json()).then(d => console.log(d));

// Lister
fetch('http://localhost:5000/api/articles').then(r => r.json()).then(d => console.log(d));

// Rechercher
fetch('http://localhost:5000/api/articles/search?query=nodejs').then(r => r.json()).then(d => console.log(d));
```

---

## ⚙️ Configuration (.env)

```env
MONGO_URI=mongodb://localhost:27017/blog_api
PORT=5000
NODE_ENV=development
```

---

## 📊 Modèle Article

```javascript
{
  _id: ObjectId,
  titre: String (requis),
  contenu: String (requis),
  auteur: String (requis),
  categorie: String,
  tags: [String],
  date: Date,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

---

## ✅ Validation

- **titre, contenu, auteur:** Requis et non-vides
- **ID:** Format ObjectId MongoDB valide (24 chars hex)

---

## � Erreurs courantes

| Erreur | Solution |
|--------|----------|
| `MONGO_URI undefined` | Vérifier `.env` et relancer le serveur |
| `ECONNREFUSED :5000` | Lancer: `npm run dev` |
| `ID invalide` | Utiliser un ObjectId valide |
| `Article non trouvé` | Vérifier l'ID existe |

---

## 📁 Structure

```
src/
├── app.js                 # Express
├── config/db.js           # MongoDB
├── models/article.model.js # Schema
├── controllers/article.controller.js # Logique
├── routes/article.routes.js # Routes
├── middlewares/validate.middleware.js # Validation
└── docs/swagger.js # OpenAPI
```

---

## � Scripts

```bash
npm install  # Installer
npm run dev  # Développement (nodemon)
npm start    # Production
```

---
