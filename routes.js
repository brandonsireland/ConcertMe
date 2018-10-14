// Routes
var request = require('request');
var querystring = require('querystring');

var {
    generateRandomString
} = require('./utility');

var {
    spotifyConf
} = require('./config');

var spotifyController = ('./controllers/spotify.controller.js')

var accesstoken = [];

module.exports = function (app) {

    // Home route
    app.get('/', function (req, res) {
        res.sendfile('./views/index.html');
    });

    // Spotify API
    app.get('/login', spotifyController.login);

    // Spotify API
    app.get('/callback', spotifyController.callBack);

    // Spotify API
    app.get('/refresh_token', spotifyController.refreshToken);

    app.get('/artists', musicController.listArtists);
};