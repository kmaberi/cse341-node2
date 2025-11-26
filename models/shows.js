const mongoose = require('mongoose');

const showSchema = new mongoose.Schema({
    title: { type: String, required: true },
    director: { type: String, required: true },
    year: { type: Number, required: true },
    genre: { type: String, required: true },
    rating: { type: String, required: true },
    seasons: { type: Number, required: true },
    episodes: { type: Number, required: true },
    platform: { type: String, required: true }
});

module.exports = mongoose.model('Show', showSchema);