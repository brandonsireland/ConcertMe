var {
    getTopArtists
} = require('../providers/spotify');

var listArtists = function (req, res) {
    getTopArtists(accesstoken[0], spotifyConf)
        .then(
            function (data) {
                res.send(data);
                // res.sendfile('./views/artists.html');
            }
        ),
        function (err) {
            throw err;
        }
};

module.exports = {
    listArtists
};