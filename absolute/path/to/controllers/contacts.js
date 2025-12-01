const Contact = require('../models/contacts');

// POST
exports.createContact = async (req, res) => {
    try {
        const newContact = new Contact(req.body);
        const savedContact = await newContact.save();
        // Fix line 36 by completing the string literal
        res.status(201).json({ message: "Contact created successfully" });
        res.json(savedContact);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// PUT
exports.updateContact = async (req, res) => {
    try {
        const updatedContact = await Contact.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedContact);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// DELETE
exports.deleteContact = async (req, res) => {
    try {
        await Contact.findByIdAndDelete(req.params.id);
        res.json({ message: 'Contact deleted successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};