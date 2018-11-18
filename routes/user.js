module.exports = function (app, express, passport) {

	const router = express.Router();

	const auth = require('../controllers/auth.controller');
	const {
		spotifyConf
	} = require('../config/spotify');
	const musicController = require('../controllers/music.controller');

	// =====================================
	// PROFILE =============================
	// =====================================

	router.get('/profile', auth.isLoggedIn, function (req, res, next) {
		res.render('profile', {
			user: req.user
		});
	});

	// =====================================
	// ARTISTS =============================
	// =====================================

	// router.get('/artists', auth.isLoggedIn, musicController.saveArtists);

	// =====================================
	// SPOTIFY =============================
	// =====================================

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

			// musicController.getArtists(req, res);
			res.redirect('/');
		}
	);

	router.get('/spotify-unlink', function(req, res) {
		var user = req.user;

		user.spotify.spotify_id = undefined;
		user.spotify.access_token = undefined;
		user.spotify.refresh_token = undefined;
		user.spotify.display_name = undefined;
		user.spotify.profile_pic = undefined;
		user.save(function(err){
			if(err){
				throw err;
			}
		res.redirect('/user/profile');
		})
	})

	// =====================================
	// LOGOUT ==============================
	// =====================================

	router.get('/logout', function (req, res) {
		req.logout();
		req.session.destroy();
		res.redirect('/');
	});

	return router;
};