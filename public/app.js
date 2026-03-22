const API_URL = 'http://localhost:5000/api/articles';
let currentEditId = null;

// Charger les articles au démarrage
document.addEventListener('DOMContentLoaded', () => {
    loadArticles();
    document.getElementById('articleForm').addEventListener('submit', handleSubmit);
});

// Charger tous les articles
async function loadArticles() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        const container = document.getElementById('articlesContainer');

        if (data.data && data.data.length > 0) {
            container.innerHTML = data.data.map(article => createArticleCard(article)).join('');
        } else {
            container.innerHTML = '<p class="empty">📭 Aucun article trouvé. Créez-en un!</p>';
        }
    } catch (error) {
        console.error('Erreur:', error);
        document.getElementById('articlesContainer').innerHTML = 
            '<p class="empty">❌ Erreur de connexion à l\'API</p>';
    }
}

// Créer une carte d'article
function createArticleCard(article) {
    const date = new Date(article.date).toLocaleDateString('fr-FR');
    const tags = article.tags && article.tags.length > 0 
        ? article.tags.map(tag => `<span class="tag">${tag}</span>`).join('')
        : '';

    return `
        <div class="article-card">
            <h3>${escapeHtml(article.titre)}</h3>
            <div class="meta">
                <span>✍️ ${escapeHtml(article.auteur)}</span>
                ${article.categorie ? `<span>🏷️ ${escapeHtml(article.categorie)}</span>` : ''}
            </div>
            <p class="content">${escapeHtml(article.contenu)}</p>
            <p class="date">📅 ${date}</p>
            ${tags ? `<div class="tags">${tags}</div>` : ''}
            <div class="actions">
                <button class="btn-edit" onclick="editArticle('${article._id}')">✏️ Modifier</button>
                <button class="btn-delete" onclick="deleteArticle('${article._id}')">🗑️ Supprimer</button>
            </div>
        </div>
    `;
}

// Soumettre le formulaire
async function handleSubmit(e) {
    e.preventDefault();

    const titre = document.getElementById('titre').value.trim();
    const contenu = document.getElementById('contenu').value.trim();
    const auteur = document.getElementById('auteur').value.trim();
    const categorie = document.getElementById('categorie').value.trim();
    const tagsInput = document.getElementById('tags').value.trim();
    const tags = tagsInput ? tagsInput.split(',').map(t => t.trim()) : [];

    const articleData = {
        titre,
        contenu,
        auteur,
        ...(categorie && { categorie }),
        ...(tags.length > 0 && { tags })
    };

    try {
        let response;
        if (currentEditId) {
            // Modifier un article existant
            response = await fetch(`${API_URL}/${currentEditId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(articleData)
            });
        } else {
            // Créer un nouvel article
            response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(articleData)
            });
        }

        const data = await response.json();

        if (response.ok) {
            showMessage(
                currentEditId 
                    ? '✅ Article modifié avec succès!' 
                    : '✅ Article créé avec succès!',
                'success'
            );
            document.getElementById('articleForm').reset();
            document.getElementById('submitBtn').textContent = '➕ Créer l\'article';
            currentEditId = null;
            loadArticles();
        } else {
            showMessage(data.error || data.message || 'Erreur lors de l\'envoi', 'error');
        }
    } catch (error) {
        console.error('Erreur:', error);
        showMessage('❌ Erreur de connexion', 'error');
    }
}

// Modifier un article
async function editArticle(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        const data = await response.json();

        if (response.ok && data.data) {
            const article = data.data;
            document.getElementById('titre').value = article.titre;
            document.getElementById('contenu').value = article.contenu;
            document.getElementById('auteur').value = article.auteur;
            document.getElementById('categorie').value = article.categorie || '';
            document.getElementById('tags').value = article.tags ? article.tags.join(', ') : '';

            currentEditId = id;
            document.getElementById('submitBtn').textContent = '💾 Mettre à jour';

            // Scroll au formulaire
            document.querySelector('.form-section').scrollIntoView({ behavior: 'smooth' });
        }
    } catch (error) {
        console.error('Erreur:', error);
        showMessage('❌ Erreur lors du chargement de l\'article', 'error');
    }
}

// Supprimer un article
async function deleteArticle(id) {
    if (!confirm('⚠️ Êtes-vous sûr de vouloir supprimer cet article?')) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            showMessage('✅ Article supprimé avec succès!', 'success');
            loadArticles();
        } else {
            showMessage('❌ Erreur lors de la suppression', 'error');
        }
    } catch (error) {
        console.error('Erreur:', error);
        showMessage('❌ Erreur de connexion', 'error');
    }
}

// Rechercher les articles
async function search() {
    const query = document.getElementById('searchQuery').value.trim();

    if (!query) {
        showMessage('⚠️ Veuillez entrer un terme de recherche', 'error');
        return;
    }

    try {
        const response = await fetch(`${API_URL}/search?query=${encodeURIComponent(query)}`);
        const data = await response.json();

        const container = document.getElementById('articlesContainer');

        if (data.data && data.data.length > 0) {
            container.innerHTML = data.data.map(article => createArticleCard(article)).join('');
            showMessage(`✅ ${data.data.length} article(s) trouvé(s)`, 'success');
        } else {
            container.innerHTML = '<p class="empty">📭 Aucun article ne correspond à votre recherche</p>';
        }
    } catch (error) {
        console.error('Erreur:', error);
        showMessage('❌ Erreur lors de la recherche', 'error');
    }
}

// Afficher un message
function showMessage(text, type) {
    const messageEl = document.getElementById('formMessage');
    messageEl.textContent = text;
    messageEl.className = `message ${type}`;
    setTimeout(() => {
        messageEl.className = 'message';
    }, 5000);
}

// Échapper le HTML
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}
