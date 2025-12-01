const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./db/connect');
const passport = require('passport');
const session = require('express-session');
require('./config/passport-setup');

const app = express();

app.use(bodyParser.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

// Routes
app.use('/', require('./routes'));
app.use('/auth', require('./routes/auth'));
app.use('/profile', require('./routes/profile'));

app.listen(process.env.PORT || 3000);