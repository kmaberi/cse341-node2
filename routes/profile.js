const router = require('express').Router();

const authCheck = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Not authorized. Please log in.' });
    }
    next();
};

router.get('/', authCheck, (req, res) => {
    res.status(200).json({ user: req.user });
});

module.exports = router;
