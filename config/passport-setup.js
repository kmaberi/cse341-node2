const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

passport.use(
    new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: '/auth/github/callback'
    }, (accessToken, refreshToken, profile, done) => {
        User.findOne({ githubId: profile.id }).then((currentUser) => {
            if (currentUser) {
                done(null, currentUser);
            } else {
                new User({
                    githubId: profile.id,
                    displayName: profile.displayName,
                    username: profile.username,
                    image: profile.photos[0].value
                }).save().then((newUser) => {
                    done(null, newUser);
                });
            }
        });
    })
);