require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const articleRoutes = require("./routes/article.routes");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger");

const app = express();

app.use(cors());
app.use(express.json());

// Servir les fichiers statiques (public folder)
app.use(express.static(path.join(__dirname, "../public")));

// Routes API
app.use("/api/articles", articleRoutes);

// Documentation Swagger
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Servir index.html pour la racine
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = app;