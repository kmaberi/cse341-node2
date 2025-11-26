const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contacts');
const { contactValidationRules, validate } = require('../middleware/validation');

router.get('/', contactsController.getAllContacts);
router.get('/:id', contactsController.getContactById);
router.post('/', contactValidationRules(), validate, contactsController.createContact);
router.put('/:id', contactValidationRules(), validate, contactsController.updateContact);
router.delete('/:id', contactsController.deleteContact);

module.exports = router;