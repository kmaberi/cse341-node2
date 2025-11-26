const Show = require('../models/shows');

const getAllShows = async (req, res) => {
    try {
        const shows = await Show.find();
        res.status(200).json(shows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getShowById = async (req, res) => {
    try {
        const show = await Show.findById(req.params.id);
        if (show == null) {
            return res.status(404).json({ message: 'Cannot find show' });
        }
        res.status(200).json(show);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const createShow = async (req, res) => {
    const show = new Show({
        title: req.body.title,
        director: req.body.director,
        year: req.body.year,
        genre: req.body.genre,
        rating: req.body.rating,
        seasons: req.body.seasons,
        episodes: req.body.episodes,
        platform: req.body.platform
    });

    try {
        const newShow = await show.save();
        res.status(201).json(newShow);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateShow = async (req, res) => {
    try {
        const updatedShow = await Show.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (updatedShow == null) {
            return res.status(404).json({ message: 'Cannot find show' });
        }
        res.status(200).json(updatedShow);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteShow = async (req, res) => {
    try {
        const show = await Show.findByIdAndDelete(req.params.id);
        if (show == null) {
            return res.status(404).json({ message: 'Cannot find show' });
        }
        res.status(200).json({ message: 'Deleted Show' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllShows,
    getShowById,
    createShow,
    updateShow,
    deleteShow
};