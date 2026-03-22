const validateArticle = (req, res, next) => {
  const { titre, contenu, auteur } = req.body;

  if (!titre || typeof titre !== "string" || titre.trim().length === 0) {
    return res.status(400).json({
      error: "Le titre est obligatoire et doit être une chaîne non vide",
    });
  }

  if (!contenu || typeof contenu !== "string" || contenu.trim().length === 0) {
    return res.status(400).json({
      error: "Le contenu est obligatoire et doit être une chaîne non vide",
    });
  }

  if (!auteur || typeof auteur !== "string" || auteur.trim().length === 0) {
    return res.status(400).json({
      error: "L'auteur est obligatoire et doit être une chaîne non vide",
    });
  }

  next();
};

module.exports = { validateArticle };
