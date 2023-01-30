const express = require("express");
const snacks = express.Router();

snacks.get("/", (req, res) => {
  res.json("All snacks");
});

module.exports = snacks;
