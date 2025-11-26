const ensureAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        return next();
    }
    res.status(403).json({ message: 'Forbidden. You do not have the necessary permissions.' });
};

module.exports = { ensureAdmin };