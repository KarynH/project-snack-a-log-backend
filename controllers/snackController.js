const express = require("express");
const snacks = express.Router();
const { createSnack, getAllSnacks } = require("../queries/snacks");

// INDEX
snacks.get("/", async (req, res) => {
  const allSnacks = await getAllSnacks();
  if (allSnacks[0]) {
    res.status(200).json(allSnacks);
  } else {
    res.status(500).json({ error: "Server error" });
  }
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
