var spotifyController = require('./controllers/spotify.controller.js');
var musicController = require('./controllers/music.controller');

module.exports = function (app) {

    // Home route
    app.get('/', function (req, res) {
        res.render('index', {title: 'farts'})
        // res.sendfile('./views/index.html');
    });

    // Spotify API
    app.get('/login', spotifyController.login);

    // Spotify API
    app.get('/callback', spotifyController.callBack);

    // Spotify API
    app.get('/refresh_token', spotifyController.refreshToken);

    app.get('/artists', musicController.listArtists);
};