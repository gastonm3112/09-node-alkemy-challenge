const { Router } = require("express");
const {
  getAllMovies,
  createMovie,
  updateMovie,
  getMovieById,
  deleteMovie,
} = require("../controllers/movies");
const {
  postRequestValidations,
  putRequestValidations,
  getRequestValidations,
  getAllRequestValidations,
  deleteRequestValidations
} = require("../middlewares/movies");

const router = Router();

// router.get("/", getAllRequestValidations, getAllMovies);
router.post("/", postRequestValidations, createMovie);
router.put("/:id", putRequestValidations, updateMovie);
router.get("/:id", getRequestValidations, getMovieById);
router.delete("/:id", deleteRequestValidations, deleteMovie);

module.exports = router;
