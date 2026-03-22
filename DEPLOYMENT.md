# 🚀 Guide Complet - Déploiement sur Render

## ✅ Modifications Effectuées

Votre code est maintenant prêt pour le déploiement:

### 1. ✅ `server.js` - Support du PORT dynamique
```javascript
const PORT = process.env.PORT || 5000;  // ✅ Modifié
```

### 2. ✅ `public/app.js` - URL API dynamique
```javascript
const API_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:5000/api/articles'
    : '/api/articles';  // ✅ URL relative pour production
```

### 3. ✅ `.gitignore` - Fichiers à ignorer
- `node_modules/`
- `.env` (variables d'environnement)
- Fichiers système

### 4. ✅ `render.yaml` - Configuration Render
- Buildpack Node
- Commandes build/start

---

## 🎯 Étapes de Déploiement

### **Étape 1: Vérifier votre projet localement**

```bash
cd /home/nehemie/S2.L2/TP-INF222

# Vérifier que tout fonctionne
npm install
npm run dev
# Test: http://localhost:5000
```

Arrêtez avec `Ctrl+C` quand vous êtes prêt.

---

### **Étape 2: Commit et push sur GitHub**

```bash
# Vérifier les modifications
git status

# Ajouter tous les fichiers
git add .

# Commit avec message descriptif
git commit -m "🚀 Modifications pour déploiement Render"

# Pousser sur GitHub
git push origin main
```

**Vérifiez** que les modifications sont visibles sur GitHub.com.

---

### **Étape 3: Créer un compte Render (si pas déjà fait)**

1. Allez sur https://render.com
2. Cliquez **"Sign Up"**
3. Connectez-vous avec **GitHub** (plus facile!)
4. Autorisez l'accès à vos repos

---

### **Étape 4: Déployer sur Render**

#### 4.1 - Créer un Web Service

1. Sur https://dashboard.render.com
2. Cliquez **"+ New"** → **"Web Service"**
3. Sélectionnez votre repo: `INF_222_EC1_Taf1_Sighe_Nde_Jacques_Nehemie_24G2728`
4. Remplissez le formulaire:

| Champ | Valeur |
|-------|--------|
| **Name** | `blog-api` |
| **Root Directory** | *(laisser vide)* |
| **Environment** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Instance Type** | `Free` |

5. Cliquez **"Create Web Service"**

#### 4.2 - Render va construire votre app

- Attendez ~3-5 minutes
- Vous verrez dans les logs:
  ```
  Building...
  Installing dependencies...
  ✓ Building
  ✓ Deploying
  ✓ Your service is live on...
  ```

#### 4.3 - Ajouter les variables d'environnement

1. Cliquez sur votre service `blog-api`
2. Allez dans l'onglet **"Environment"**
3. Cliquez **"Add Environment Variable"**
4. Ajoutez ces variables:

```
MONGO_URI = mongodb+srv://INF222:29Z1UxXhQL2S0lae@attendance.ou02qea.mongodb.net/blog_api?retryWrites=true&w=majority

NODE_ENV = production
```

5. Cliquez **"Save"**
6. Render va redéployer automatiquement

---

### **Étape 5: Tester votre app en ligne**

Une fois le déploiement fini:

1. Vous verrez une URL comme:
   ```
   https://blog-api-xxxx.onrender.com
   ```

2. **Testez l'interface web:**
   ```
   https://blog-api-xxxx.onrender.com/
   ```

3. **Testez l'API:**
   ```
   https://blog-api-xxxx.onrender.com/api/articles
   ```

4. **Testez Swagger:**
   ```
   https://blog-api-xxxx.onrender.com/api/docs
   ```

---

## 🔄 Mise à jour après modifications

Chaque fois que vous modifiez le code:

```bash
git add .
git commit -m "Description de votre changement"
git push origin main
```

**Render redéploiera automatiquement!** ✨

---

## ⚠️ Limitations du Plan Gratuit Render

| Limitation | Détails |
|-----------|---------|
| **Uptime** | 750 heures/mois (gratuit) |
| **Redémarrage** | Auto-redémarrage après 15 min d'inactivité |
| **Stockage** | Pas de disque persistant (les données sont perdues) |
| **CPU/RAM** | Limité mais suffisant pour un blog |

---

## 💾 Important: Données MongoDB

Votre **MongoDB Atlas** est dans le cloud, donc:
- ✅ Les données **persistent** entre les redémarrages
- ✅ Accessible de n'importe où
- ✅ Sauvegardes automatiques

---

## 🎨 Domaine personnalisé (optionnel)

Pour un domaine personnalisé (ex: `monblog.com`):

1. Sur Render dashboard
2. Cliquez **"Settings"** → **"Custom Domain"**
3. Ajoutez votre domaine
4. Modifiez les DNS de votre registrar
5. Render fournira les instructions

---

## 🔍 Déboguer les problèmes

### **Logs Render**

1. Dans le dashboard Render
2. Cliquez sur votre service
3. Allez dans **"Logs"**
4. Recherchez les erreurs

### **Erreurs courantes:**

| Erreur | Solution |
|--------|----------|
| `Cannot find module 'express'` | `npm install` nécessaire |
| `MONGO_URI undefined` | Ajouter la variable d'env |
| `Cannot GET /` | Vérifier `src/app.js` |
| `502 Bad Gateway` | Attendre le redéploiement |

---

## ✅ Checklist Final

Avant de déployer:

- [ ] Modifications locales testées (`npm run dev`)
- [ ] Code committé sur GitHub
- [ ] Repo visible sur github.com
- [ ] Compte Render créé
- [ ] Web Service créé
- [ ] Variables d'env ajoutées
- [ ] Déploiement terminé (logs verts ✓)
- [ ] Interface web accessible
- [ ] API répond

---

## 📊 Résumé

```
Votre Blog API
├─ Frontend: HTML/CSS/JS (servie par Express)
├─ Backend: Node.js + Express + MongoDB
├─ Déployé: https://blog-api-xxxx.onrender.com
├─ Base de données: MongoDB Atlas (cloud)
└─ Gratuit et prêt à l'emploi! ✨
```

---

## 🚀 Prochaines étapes après déploiement

1. Partager l'URL avec vos amis
2. Créer des articles via l'interface web
3. Ajouter l'authentification (JWT)
4. Ajouter un domaine personnalisé
5. Améliorer le design avec React/Vue

---

**Besoin d'aide?** Consultez les logs Render ou contactez le support! 🎯

