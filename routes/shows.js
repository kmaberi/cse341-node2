const express = require('express');
const router = express.Router();
const showsController = require('../controllers/shows');
const { showValidationRules, validate } = require('../middleware/validation');
const { ensureAuth } = require('../middleware/check-auth');
const { ensureAdmin } = require('../middleware/check-role');

router.get('/', showsController.getAllShows);
router.get('/:id', showsController.getShowById);
router.post('/', ensureAuth, showValidationRules(), validate, showsController.createShow);
/*  #swagger.security = [{ "github": ["user:email"] }] */
router.put('/:id', ensureAuth, showValidationRules(), validate, showsController.updateShow);
/*  #swagger.security = [{ "github": ["user:email"] }] */
router.delete('/:id', ensureAuth, ensureAdmin, showsController.deleteShow);
/*  #swagger.security = [{ "github": ["user:email"] }] */

module.exports = router;
