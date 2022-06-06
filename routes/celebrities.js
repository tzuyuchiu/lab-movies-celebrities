const router = require('express').Router();
const Celebrity = require('../models/Celebrity.model.js');

router.post('/celebrities/create', async (req, res) => {
  try {
    const addOnecelebrity = await Celebrity.create(req.body);
  } catch (e) {
    console.error(e);
  }
  const celebrity = req.body;
  if (!celebrity.name) {
    res.status(400).json({
      message: 'celebrity name not provided',
    });
    return;
  }

  res.status(201).json({
    message: 'received',
  });
});

router.get('/celebrities', async (req, res, next) => {
  try {
    const findListOfCelebrities = await Celebrity.find();
    res.status(200).json(findListOfCelebrities);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
