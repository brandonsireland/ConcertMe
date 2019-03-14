const LocalStrategy = require('passport-local').Strategy;
var SpotifyStrategy = require('passport-spotify').Strategy;

const Person = require('../models/person');
const {
    spotifyConf
} = require('../config/spotify');

const SpotifyWebApi = require('spotify-web-api-node');

spotifyApi = new SpotifyWebApi({
    clientId: spotifyConf.client_id,
    clientSecret: spotifyConf.client_secret,
    redirectUri: spotifyConf.redirect_uri
});

module.exports = function (passport) {

    // =====================================
    // SERIALIZATION =======================
    // =====================================

    passport.serializeUser(Person.serializeUser());
    passport.deserializeUser(Person.deserializeUser());

    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (obj, done) {
        done(null, obj);
    });

    // =====================================
    // LOCAL Strategy ======================
    // =====================================

    passport.use(new LocalStrategy(Person.authenticate()));

    // =====================================
    // SPOTIFY Strategy ====================
    // =====================================

    passport.use(
        new SpotifyStrategy({
                clientID: spotifyConf.client_id,
                clientSecret: spotifyConf.client_secret,
                callbackURL: spotifyConf.redirect_uri,
                passReqToCallback: true
            },
            function (req, accessToken, refreshToken, expires_in, profile, done) {

                process.nextTick(function () {

                    // SpotifywebApi
                    spotifyApi.setAccessToken(accessToken);
                    spotifyApi.setRefreshToken(refreshToken);

                    Person.findOne({
                        _id: req.user._id
                    }, function (err, user) {
                        if (err)
                            return done(err);

                        if (user) {

                            if (!user.spotify.access_token) {
                                user.spotify.access_token = accessToken;
                                user.spotify.display_name = profile.displayName;
                                user.spotify.em = profile.emails[0].value;
                                user.spotify.spotify_id = profile.id;
                                user.spotify.refresh_token = refreshToken;
                                user.spotify.profile_pic = profile.photos[0],

                                    user.save(function (err) {
                                        if (err)
                                            throw err;
                                        return done(null, user);
                                    });
                            }

                            return done(null, user);
                        }
                    });
                });
            }
        )
    );

};