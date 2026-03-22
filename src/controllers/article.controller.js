const Article = require("../models/article.model");
const mongoose = require("mongoose");

// CREATE ARTICLE
exports.createArticle = async (req, res) => {
  try {
    const article = await Article.create(req.body);

    res.status(201).json({
      message: "Article créé avec succès",
      data: article,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// GET ALL ARTICLES + FILTER
exports.getArticles = async (req, res) => {
  try {
    const { categorie, auteur, date } = req.query;

    let filter = {};

    if (categorie) filter.categorie = categorie;
    if (auteur) filter.auteur = auteur;
    if (date) filter.date = new Date(date);

    const articles = await Article.find(filter);

    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// GET ONE ARTICLE
exports.getArticleById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "ID invalide" });
    }

    const article = await Article.findById(req.params.id);

    if (!article)
      return res.status(404).json({ message: "Article non trouvé" });

    res.json(article);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// UPDATE
exports.updateArticle = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "ID invalide" });
    }

    const article = await Article.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!article)
      return res.status(404).json({ message: "Article non trouvé" });

    res.json({
      message: "Article modifié avec succès",
      data: article,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// DELETE
exports.deleteArticle = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "ID invalide" });
    }

    const article = await Article.findByIdAndDelete(req.params.id);

    if (!article)
      return res.status(404).json({ message: "Article non trouvé" });

    res.json({ message: "Article supprimé avec succès", data: article });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// SEARCH
exports.searchArticles = async (req, res) => {
  try {
    const query = req.query.query;

    if (!query) {
      return res.status(400).json({ error: "Le paramètre 'query' est requis" });
    }

    const articles = await Article.find({
      $or: [
        { titre: { $regex: query, $options: "i" } },
        { contenu: { $regex: query, $options: "i" } },
      ],
    });

    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};