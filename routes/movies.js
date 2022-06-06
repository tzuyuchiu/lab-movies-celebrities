const router = require('express').Router();
const Movie = require('../models/Movie.model.js');

router.post('/movies/create', async (req, res) => {
  try {
    const addOneMovie = await Movie.create(req.body);
  } catch (e) {
    console.error(e);
  }
  const movie = req.body;
  if (!movie.title) {
    res.status(400).json({
      message: 'movie name not provided',
    });
    return;
  }

  res.status(201).json({
    message: 'received',
  });
});

router.get('/movies', async (req, res, next) => {
  try {
    const findListOfMovies = await Movie.find();
    res.status(200).json(findListOfMovies);
  } catch (error) {
    next(error);
  }
});

router.get('/movies/:id', async (req, res, next) => {
  try {
    const movieId = req.params.id;
    const populateMovieId = await Movie.findById(req.params.id).populate(
      'cast'
    );
    res.json(populateMovieId);
  } catch (err) {
    next(err);
  }
});

router.delete('/movies/:id', async (req, res, next) => {
  try {
    const movieId = req.params.id;

    const deleteMovieId = await Movie.findByIdAndRemove(movieId);
    res.status(204).send(deleteMovieId);
  } catch (err) {
    next(err);
  }
});

router.post('/movies/:id', async (req, res, next) => {
  try {
    const movieId = req.params.id;

    const updatedMovieId = await Movie.findByIdAndUpdate(movieId, req.body, {
      new: true,
    });
    res.status(200).json(updatedMovieId);
  } catch (err) {
    next(err);
  }
});
module.exports = router;
