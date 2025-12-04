const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contacts');
const { contactValidationRules, validate } = require('../middleware/validation');
const { ensureAuth } = require('../middleware/check-auth');
const { ensureAdmin } = require('../middleware/check-role');

router.get('/', contactsController.getAllContacts);
router.get('/:id', contactsController.getContactById);
router.post('/', ensureAuth, contactValidationRules(), validate, contactsController.createContact);
/*  #swagger.security = [{ "github": ["user:email"] }] */
router.put('/:id', ensureAuth, contactValidationRules(), validate, contactsController.updateContact);
/*  #swagger.security = [{ "github": ["user:email"] }] */
router.delete('/:id', ensureAuth, ensureAdmin, contactsController.deleteContact);
/*  #swagger.security = [{ "github": ["user:email"] }] */

module.exports = router;
