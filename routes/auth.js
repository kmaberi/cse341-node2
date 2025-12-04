const router = require('express').Router();
const passport = require('passport');

// auth login
router.get('/login', (req, res) => {
    res.render('login', { user: req.user });
});

// auth logout
router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ message: 'Logout error' });
        }
        res.redirect('/');
    });
});

// auth with github
router.get('/github', passport.authenticate('github', {
    scope: ['user:email']
}));

// callback route for github to redirect to
router.get('/github/callback', passport.authenticate('github'), (req, res) => {
    res.redirect('/profile/');
});

module.exports = router;
