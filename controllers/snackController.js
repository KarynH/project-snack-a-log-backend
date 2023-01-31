const express = require("express");
const snacks = express.Router();
const {
  createSnack,
  updateSnack,
  deleteSnack,
  getAllSnacks,
} = require("../queries/snacks");

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
    res.status(200).json(snack);
  } catch (error) {
    res.status(400).json({ error });
  }
});

// UPDATE
snacks.put("/:id", async (req, res) => {
  const { id } = req.params;
  const snack = await updateSnack(id, req.body);
  res.status(200).json(snack);
});

//DELETE
snacks.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedSnack = await deleteSnack(id);
  if (deletedSnack.id) {
    res.status(200).json(deletedSnack);
  } else {
    res.status(404).json({ error: "snack not found" });
  }
});

module.exports = snacks;
