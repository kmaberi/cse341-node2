const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./db/connect');
const passport = require('passport');
const session = require('express-session');
require('./config/passport-setup');

const app = express();

app.use(bodyParser.json());
app.use(session({
    secret: 'your secret key',
    resave: false,
    saveUninitialized: false
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

const port = process.env.PORT || 8080;

connection().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});