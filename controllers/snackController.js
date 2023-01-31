const express = require("express");
const snacks = express.Router();
const { createSnack, deleteSnack } = require("../queries/snacks");

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

//DELETE
snacks.delete("/:id", async (req, res) => {
  const {id} = req.params;
  const deletedSnack = await deleteSnack(id)
    if(deletedSnack.id) {
      res.status(200).json(deletedSnack)
    }else {
      res.status(404).json({error: "snack not found"})
    }
  
})
module.exports = snacks;
