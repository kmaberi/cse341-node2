const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/user');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then((user) => done(null, user))
        .catch((err) => done(err));
});

passport.use(
    new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: '/auth/github/callback'
    }, (accessToken, refreshToken, profile, done) => {
        User.findOne({ githubId: profile.id })
            .then((currentUser) => {
                if (currentUser) {
                    return done(null, currentUser);
                }
                const user = new User({
                    githubId: profile.id,
                    displayName: profile.displayName || profile.username,
                    username: profile.username,
                    image: Array.isArray(profile.photos) && profile.photos[0] ? profile.photos[0].value : ''
                });
                return user.save().then((newUser) => done(null, newUser));
            })
            .catch((err) => done(err));
    })
);
