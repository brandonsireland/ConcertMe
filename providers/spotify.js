var SpotifyWebApi = require('spotify-web-api-node');

var {
    spotifyConf
} = require('../config');

var getTopArtists = function (access_token, spotifyApi) {

    var spotifyApi = new SpotifyWebApi({
        clientId: spotifyConf.client_id,
        clientSecret: spotifyConf.client_secret,
        redirectUri: spotifyConf.redirect_uri
    });

    var options = {
        limit: 5,
        offset: 0,
    }

    spotifyApi.setAccessToken(access_token);
    return spotifyApi.getMyTopArtists(options)
        .then(
            function (data) {

                const response = data.body.items.map(function (item, index, array) {
                    return {
                        images: item.images[0],
                        name: item.name
                    }
                });

                return response;
            },
            function (err) {
                throw err;
            }
        )
}

module.exports = {
    getTopArtists
}