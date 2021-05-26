const { Router } = require("express");
const {
  getAllCharacters,
  createCharacter,
  updateCharacter,
  getCharacterById,
  deleteCharacter,
} = require("../controllers/characters");
const {
  postRequestValidations,
  putRequestValidations,
  getRequestValidations,
  getAllRequestValidations,
  deleteRequestValidations
} = require("../middlewares/characters");

const router = Router();

// router.get("/", getAllRequestValidations, getAllCharacters);
router.post("/", postRequestValidations, createCharacter);
router.put("/:id", putRequestValidations, updateCharacter);
router.get("/:id", getRequestValidations, getCharacterById);
router.delete("/:id", deleteRequestValidations, deleteCharacter);

module.exports = router;
