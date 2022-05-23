const express = require('express');
const router = express.Router();
const LocalStrategy = require('passport-local');
const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/index').sequelize.models.user;

passport.use(new LocalStrategy((email, password, done) => {
    User.findOne({
        where: {
            email
        }
    }).then(user => {
        if (!user) return done(null, false, { message: 'Incorrect email or password' })
        bcrypt.compare(password, user.password, (err, res) => {
            if (res) return done(null, user)
            return done(null, false, { message: 'Incorrect email or password' })
        });
    });
}))

passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser((id, done) => {
    User.findByPk(id).then(user => done(null, user))
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err)
        if (!user) return res.status(401).json(info)
        req.logIn(user, (err) => {
            if (err) return next(err)
            return res.send(user)
        });
    })(req, res, next)
})

router.post('/register', (req, res, next) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if (user) return res.status(401).json({ message: 'Username already exists' })
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
                return next(err)
            }
            User.create({
                email: req.body.email,
                password: hash,
                name: req.body.name
            }).then(user => {
                return res.send(user)
            });
        });
    });
})

router.post('/logout', (req, res, next) => {
    req.logout(err => {
        if (err) return next(err)
        res.send({ message: 'Logged out' })
    });
})

router.get('/test', (req, res) => {
    res.send({ message: req.user })
})

module.exports = router;