const SpotifyWebApi = require('spotify-web-api-node');

const {
    spotifyConf
} = require('../config/spotify');

spotifyApi = new SpotifyWebApi({
    clientId: spotifyConf.client_id,
    clientSecret: spotifyConf.client_secret,
    redirectUri: spotifyConf.redirect_uri
});

setSpotifyTokens = (access_token, refresh_token) => {
    spotifyApi.setAccessToken(access_token);
    spotifyApi.setRefreshToken(refresh_token);
    
}

var getTopArtists = function (access_token, refresh_token, spotifyApi) {

    setSpotifyTokens(access_token, refresh_token);

    var options = {
        limit: 50,
        offset: 0,
    }

    return spotifyApi.getMyTopArtists(options)
        .then(function (data) {

            const response = data.body.items.map(function (item) {
                console.log(item.name);
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