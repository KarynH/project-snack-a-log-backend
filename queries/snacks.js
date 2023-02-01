const db = require("../db/dbConfig.js");

// FORMAT SNACK NAME
function formatString(string) {
  return string
    .toLowerCase()
    .replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());
}

function isHealthy(sugar, protein, fiber) {
  return sugar < 5 && (protein > 5 || fiber > 5);
}

// SHOW ALL SNACKS
const getAllSnacks = async () => {
  try {
    const allSnacks = await db.any("SELECT * FROM snacks");
    return allSnacks;
  } catch (error) {
    return error;
  }
};

// SHOW ONE SNACK
const getOneSnack = async (id) => {
  try {
    const oneSnack = await db.oneOrNone("SELECT * FROM snacks WHERE id=$1", id);
    return oneSnack;
  } catch (error) {
    return error;
  }
};

// CREATE NEW SNACK
const createSnack = async (snack) => {
  // id, name, fiber, protein, added_sugar, is_healthy, image
  const { name, fiber, protein, added_sugar, image } = snack;
  try {
    const newSnack = await db.one(
      "INSERT INTO snacks (name, fiber, protein, added_sugar, image, is_healthy) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [
        formatString(name),
        fiber,
        protein,
        added_sugar ? added_sugar : 0,
        image
          ? image
          : "https://dummyimage.com/400x400/6e6c6e/e9e9f5.png&text=No+Image",
        isHealthy(added_sugar, protein, fiber),
      ]
    );
    return newSnack;
  } catch (error) {
    throw error;
  }
};

// UPDATE A SNACK
const updateSnack = async (id, snack) => {
  const { name, fiber, protein, added_sugar, image } = snack;
  try {
    const updatedSnack = await db.one(
      "UPDATE snacks SET name=$1, fiber=$2, protein=$3, added_sugar=$4, is_healthy=$5, image=$6 WHERE id=$7 RETURNING *",
      [
        formatString(name),
        fiber,
        protein,
        added_sugar ? added_sugar : 0,
        isHealthy(added_sugar, protein, fiber),
        image
          ? image
          : "https://dummyimage.com/400x400/6e6c6e/e9e9f5.png&text=No+Image",
        id,
      ]
    );
    return updatedSnack;
  } catch (error) {
    return error;
  }
};

//DELETE A SNACK
const deleteSnack = async (id) => {
  try {
    const deletedSnack = await db.one(
      "DELETE FROM snacks WHERE id=$1 RETURNING *",
      id
    );
    return deletedSnack;
  } catch (error) {
    return error;
  }
};

module.exports = {
  createSnack,
  updateSnack,
  deleteSnack,
  getAllSnacks,
  getOneSnack,
};
