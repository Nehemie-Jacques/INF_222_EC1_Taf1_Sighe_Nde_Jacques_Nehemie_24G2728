const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
  {
    titre: {
      type: String,
      required: true,
      trim: true,
    },
    contenu: {
      type: String,
      required: true,
    },
    auteur: {
      type: String,
      required: true,
    },
    categorie: {
      type: String,
    },
    tags: [String],
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Article", articleSchema);