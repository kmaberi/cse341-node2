const express = require('express');
const router = express.Router();

const movies = [
    {
        id: 1,
        title: 'The Matrix',
        year: 1999,
        genre: 'Sci-Fi',
        rating: 'PG-13',
        description: 'A computer programmer discovers a mysterious world of digital reality.'
    }
];

router.get('/', (req, res) => {
    res.json(movies);
});

module.exports = router;