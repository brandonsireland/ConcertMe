const express = require('express');
const router = express.Router();
const passport = require('passport');
const country = require('../providers/country-data');

const auth = require('../controllers/auth.controller');
const musicController = require('../controllers/music.controller');

// =====================================
// HOME PAGE ===========================
// =====================================

router.get('/', auth.isLoggedIn, function (req, res) {
    console.log(req.user);
    res.render('home', {user: req.user});
});

// =====================================
// REGISTER ============================
// =====================================

router.get('/register', function (req, res) {
    
    res.render('register', { title: 'Register to Concert Me', country: country.getAllCountries()});
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
    successRedirect: '/profile',
    failureRedirect: '/login'
}));

// =====================================
// PROFILE =============================
// =====================================

// router.get('/profile', auth.isLoggedIn, function(req, res, next) {
//     res.render('profile', {user: req.user});
// });
router.get('/profile', function(req, res, next) {
    res.render('profile', {user: req.user});
});

// =====================================
// LOGOUT ==============================
// =====================================

router.get('/logout', function (req, res) {
    req.logout();
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;