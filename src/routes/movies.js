const { Router } = require("express");
const {
  getAllMovies,
  createMovie,
  updateMovie,
  getMovieById,
  deleteMovie,
  associateCharacter
} = require("../controllers/movies");
const {
  postRequestValidations,
  putRequestValidations,
  getRequestValidations,
  getAllRequestValidations,
  deleteRequestValidations,
  associationRequestValidations
} = require("../middlewares/movies");

const router = Router();

router.get("/", getAllRequestValidations, getAllMovies);
router.post("/", postRequestValidations, createMovie);
router.put("/:id", putRequestValidations, updateMovie);
router.get("/:id", getRequestValidations, getMovieById);
router.delete("/:id", deleteRequestValidations, deleteMovie);
router.put("/:idMovie/characters/:idCharacter", associationRequestValidations, associateCharacter);

module.exports = router;
