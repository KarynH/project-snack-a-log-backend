const db = require("../db/dbConfig.js");

// SHOW ALL SNACKS
const getAllSnacks = async () => {
  try {
    const allSnacks = await db.any("SELECT * FROM snacks");
    return allSnacks;
  } catch (error) {
    return error;
  }
};

// CREATE NEW SNACK
const createSnack = async (snack) => {
  // id, name, fiber, protein, added_sugar, is_healthy, image
  const { id, name, fiber, protein, added_sugar, is_healthy, image } = snack;
  try {
    const newSnack = await db.one(
      "INSERT INTO snacks (name, fiber, protein, added_sugar, is_healthy, image) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [name, fiber, protein, added_sugar, is_healthy, image]
    );
    return newSnack;
  } catch (error) {
    throw error;
  }
};

module.exports = { createSnack, getAllSnacks };
