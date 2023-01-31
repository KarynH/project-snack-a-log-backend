const express = require("express");
const snacks = express.Router();
const { createSnack, deleteSnack, getAllSnacks } = require("../queries/snacks");

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

//SHOW
snacks.get("/:id", async (req, res) => {
  const { id } = req.params;
  const snack = await getAllSnack(id);
  if (snack.id) {
    res.status(200).json(snack);
  } else {
    res.status(404).json({ error: "Snack not found" });
  }
});

// // SHOW
// snacks.get("/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const snack = await db.one("SELECT * FROM snacks WHERE id=$1", id);
//     res.status(200).json(snack);
//   } catch (error) {
//     res.status(404).json({ error: "Snack not found" });
//   }
// });

module.exports = snacks;
