const express = require("express");
const snacks = express.Router();
const { createSnack } = require("../queries/snacks");

snacks.get("/", (req, res) => {
  res.json("All snacks");
});

// CREATE
snacks.post("/", async (req, res) => {
  try {
    const snack = await createSnack(req.body);
    res.json(snack);
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = snacks;
