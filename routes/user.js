const express = require('express');
const router = express.Router();
var passport = require('passport');
var SpotifyStrategy = require('passport-spotify').Strategy;

const auth = require('../controllers/auth.controller');
var { spotifyConf } = require('../config/spotify');
const musicController = require('../controllers/music.controller');

// =====================================
// ARTISTS =============================
// =====================================

router.get('/artists', auth.isLoggedIn, musicController.listArtists);

// =====================================
// SPOTIFY =============================
// =====================================

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

passport.use(
  new SpotifyStrategy({
      clientID: spotifyConf.client_id,
      clientSecret: spotifyConf.client_secret,
      callbackURL: spotifyConf.redirect_uri
    },
    function (accessToken, refreshToken, expires_in, profile, done) {

      process.nextTick(function () {
        return done(null, profile);
      });
    }
  )
);

router.get('/account', auth.isLoggedIn, function (req, res) {
  res.render('account.html', {
    user: req.user
  });
});

router.get('/login', function (req, res) {
  res.render('login.html', {
    user: req.user
  });
});

router.get(
  '/spotify-login',
  passport.authenticate('spotify', {
    scope: spotifyConf.scope,
    showDialog: true
  }),
  function (req, res) {

    // Save Top artists
    console.log(musicController.listArtists())

    // console.log(res)

  }
);

router.get(
  '/callback',
  passport.authenticate('spotify', {
    failureRedirect: '/login'
  }),
  function (req, res) {
    res.redirect('/');
  }
);

module.exports = router;