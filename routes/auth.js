const router = require('express').Router();
const passport = require('passport');

// auth login
router.get('/login', (req, res) => {
    res.render('login', { user: req.user });
});

// auth logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

// auth with google
router.get('/auth/github', passport.authenticate('github', {
    scope: ['user:email']
}));

// callback route for google to redirect to
router.get('/auth/github/callback', passport.authenticate('github'), (req, res) => {
    res.redirect('/profile/');
});

module.exports = router;