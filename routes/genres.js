const router = require('express').Router();
const Genre = require('../models/genre');

router.route('/').get((req, res) => {
    Genre.find()
    .then(genres => res.json(genres))
    .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/').post((req, res) => {
    const genre = req.body.genre;

    const newGenre = new Genre({genre});

    newGenre.save()
    .then(() => res.json('GENRE ADDED'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;