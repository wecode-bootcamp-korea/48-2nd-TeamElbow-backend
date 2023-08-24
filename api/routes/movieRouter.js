const movieController = require("../controllers/movieController");
const express = require("express");
const movieRouter = express.Router();

movieRouter.get("/list", movieController.getAllMoviesInformation);
movieRouter.get("/detail", movieController.getSpecificMovieInformation);

module.exports = { movieRouter };
