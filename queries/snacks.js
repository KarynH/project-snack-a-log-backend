const db = require("../db/dbConfig.js");


//DELETE A SNACK
const deleteSnack = async (id) => {
    try {
        const deletedSnack = await db.one(
            "DELETE FROM snacks WHERE id=$1 *", id
        )
        return deletedSnack;
    }catch(error) {
        return error;
    }
  };

// CREATE NEW SNACK
const createSnack = async (snack) => {
  // id, name, fiber, protein, added_sugar, is_healthy, image
  const { id, name, fiber, protein, added_sugar, is_healthy, image } = snack;
  try {
    const newSnack = await db.one(
      "INSERT INTO snacks (id, name, fiber, protein, added_sugar, is_healthy, image) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [id, name, fiber, protein, added_sugar, is_healthy, image]
    );
    return newSnack;
  } catch (error) {
    throw error;
  }

};

module.exports = { createSnack, deleteSnack };
