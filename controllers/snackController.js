const express = require("express");
const snacks = express.Router();
const {
  createSnack,
  updateSnack,
  deleteSnack,
  getAllSnacks,
  getOneSnack,
} = require("../queries/snacks");

const Jimp = require("jimp");

// MIDDLEWARE
async function imgResize(req, res, next) {
  // const buffer = Buffer.from(req.body.image, "base64");
  const result = await Jimp.read(req.body.image);
  console.log(
    `Original image size: ${result.getWidth()} x ${result.getHeight()}`
  );

  if (result.getWidth() > 300 || result.getWidth() > 300) {
    await result.resize(300, 300);
    // result.scaleToFit(300, 300);
    console.log(
      `Resized image size: ${result.getWidth()} x ${result.getHeight()}`
    );
  }
  req.body.image_b64 = await result.getBase64Async(Jimp.AUTO);
  next();
}

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
snacks.post("/", imgResize, async (req, res) => {
  try {
    const snack = await createSnack(req.body);
    res.status(201).json(snack);
  } catch (error) {
    res.status(400).json({ error: "Bad Request" });
  }
});

// UPDATE
snacks.put("/:id", imgResize, async (req, res) => {
  const { id } = req.params;
  try {
    const snack = await updateSnack(id, req.body);
    res.status(201).json(snack);
  } catch (error) {
    res.status(400).json({ error: "Bad Request" });
  }
});

// SHOW
snacks.get("/:id", async (req, res) => {
  const { id } = req.params;
  const snack = await getOneSnack(id);
  if (snack) {
    res.status(200).json(snack);
  } else {
    res.status(404).json({ error: "Snack not found" });
  }
});

// DELETE
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
