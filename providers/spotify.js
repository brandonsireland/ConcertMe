const SpotifyWebApi = require('spotify-web-api-node');

const {
    spotifyConf
} = require('../config');

var getTopArtists = function (access_token, refresh_token, spotifyApi) {

    var spotifyApi = new SpotifyWebApi({
        clientId: spotifyConf.client_id,
        clientSecret: spotifyConf.client_secret,
        redirectUri: spotifyConf.redirect_uri
    });

    var options = {
        limit: 50,
        offset: 0,
    }

    spotifyApi.setAccessToken(access_token);
    spotifyApi.setRefreshToken(refresh_token);

    return spotifyApi.getMyTopArtists(options)
        .then(function (data) {

            const response = data.body.items.map(function (item) {
                return {
                    genres: item.genres,
                    href: item.href,
                    imageUrl: item.images[0].url,
                    artist: item.name,
                }
            });

            return response;
        })
        .catch(function (err) {
            console.log(err);
            throw err;
        })
}

module.exports = {
    getTopArtists
}