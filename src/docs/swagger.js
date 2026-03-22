const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Blog API",
      version: "1.0.0",
      description:
        "Une API REST pour gérer des articles de blog avec MongoDB",
      contact: {
        name: "Support API",
        email: "support@blogapi.com",
      },
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Serveur de développement",
      },
    ],
    components: {
      schemas: {
        Article: {
          type: "object",
          required: ["titre", "contenu", "auteur"],
          properties: {
            _id: {
              type: "string",
              format: "ObjectId",
              description: "ID unique de l'article",
            },
            titre: {
              type: "string",
              description: "Titre de l'article",
              example: "Mon premier article",
            },
            contenu: {
              type: "string",
              description: "Contenu de l'article",
              example: "Ceci est le contenu de l'article...",
            },
            auteur: {
              type: "string",
              description: "Auteur de l'article",
              example: "Jean Dupont",
            },
            categorie: {
              type: "string",
              description: "Catégorie de l'article",
              example: "Technologie",
            },
            tags: {
              type: "array",
              items: {
                type: "string",
              },
              description: "Tags de l'article",
              example: ["nodejs", "express", "api"],
            },
            date: {
              type: "string",
              format: "date-time",
              description: "Date de création",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Timestamp de création",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Timestamp de dernière modification",
            },
          },
        },
        Error: {
          type: "object",
          properties: {
            error: {
              type: "string",
              description: "Message d'erreur",
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.js"],
};

module.exports = swaggerJsdoc(options);