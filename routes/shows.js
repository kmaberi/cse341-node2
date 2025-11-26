const express = require('express');
const router = express.Router();
const showsController = require('../controllers/shows');
const { showValidationRules, validate } = require('../middleware/validation');

router.get('/', showsController.getAllShows);
router.get('/:id', showsController.getShowById);
router.post('/', showValidationRules(), validate, showsController.createShow);
router.put('/:id', showValidationRules(), validate, showsController.updateShow);
router.delete('/:id', showsController.deleteShow);

module.exports = router;