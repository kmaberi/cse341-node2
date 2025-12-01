const mongoose = require('mongoose');

const templeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    dedicated: { type: String, required: true },
    area: { type: Number, required: true },
    description: { type: String, required: true }
});

module.exports = mongoose.model('Temple', templeSchema);