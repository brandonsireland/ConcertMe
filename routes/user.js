const express = require('express');
const router = express.Router();
var passport = require('passport');
var SpotifyStrategy = require('passport-spotify').Strategy;

const auth = require('../controllers/auth.controller');
var {
	spotifyConf
} = require('../config/spotify');
const musicController = require('../controllers/music.controller');

var Person = require('../models/person');
var Spotify = require('../models/spotify');

// =====================================
// ARTISTS =============================
// =====================================

router.get('/artists', auth.isLoggedIn, musicController.saveArtists);

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

				Person.findOne({ spotify_id: profile.id }, function (err, user) {
					console.log(user)
					
					if (!user) {
						user = new Spotify({
							Spotify_id: profile.id,
							display_name: profile.displayName,
							access_token: profile.accessToken,
							refresh_token: profile.refreshToken,
							profile_pic: profile.photos[0],
							// person: profile._id
						});

						user.save(function (err) {
							if (err) console.log(err);
							return done(err, user);
						});

					}

				});
				
			});
		}
	)
);

router.get(
	'/spotify-login',
	passport.authenticate('spotify', {
		scope: spotifyConf.scope,
		showDialog: true
	}),
	function (req, res) {}
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