const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth.controller');

const passport = require('passport');

// =====================================
// HOME PAGE ===========================
// =====================================

router.get('/', function (req, res) {
    console.log(req.user);
    console.log(req.isAuthenticated())
    res.render('home');
});

// =====================================
// REGISTER ============================
// =====================================

router.get('/register', function (req, res) {
    res.render('register', { title: 'Login to Concert Me' });
});

router.post('/register', function (req, res) {
    auth.registerPerson(req, res);
});

// =====================================
// LOGIN ===============================
// =====================================

router.get('/login', function (req, res) {
    res.render('login', { title: 'Login to Concert Me', user: req.user });
});

router.post('/login', passport.authenticate('local',{
    successRedirect: 'profile',
    failureRedirect: '/login'
}), function (req, res) {
    res.render('home');
})

// =====================================
// LOGOUT ==============================
// =====================================

router.get('/logout', function (req, res) {
    req.logout();
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;