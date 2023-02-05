// DEPENDENCIES
const express = require("express");
const cors = require("cors");
const snackController = require("./controllers/snackController");

// CONFIGURATION
const app = express();

// MIDDLEWARE
app.use(express.json({ limit: "2MB" }));
app.use(cors());

// ROUTES
app.get("/", (req, res) => {
  res.send("Welcome to Snack-A-Log");
});

// SNACKS ROUTE
app.use("/snacks", snackController);

// 404 Page
app.get("*", (req, res) => {
  res.status(404).send("Page not found");
});

// EXPORT
module.exports = app;
