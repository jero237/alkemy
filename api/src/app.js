//Dependecies
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
//Routes
const auth = require('./routes/auth');
const transaction = require('./routes/transaction');
const passport = require('passport');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(session({
    secret: 'n2nQxznYyPt4jCab',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}));
app.use(cookieParser('n2nQxznYyPt4jCab'));
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', auth)
app.use('/transaction', transaction)

module.exports = app;