var spotifyController = require('../controllers/spotify.controller.js');
var musicController = require('../controllers/music.controller');

module.exports = function (app) {

    // Home route
    app.get('/', function (req, res) {
        res.render('index', {title: 'Register for Concert Me'});
        // res.sendfile('./views/index.html');
    });

    // Spotify API
    app.get('/login', spotifyController.login);

    // Spotify API
    app.get('/callback', spotifyController.callBack);

    // Spotify API
    app.get('/refresh_token', spotifyController.refreshToken);

    
    // Artists Page
    app.get('/artists', musicController.listArtists);
};