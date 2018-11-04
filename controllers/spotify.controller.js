const request = require('request');
const querystring = require('querystring');
const session = require('express-session');

const util = require('../utility');

const {
    spotifyConf
} = require('../config');

var login = function (req, res) {

    var state = util.generateRandomString(16);
    res.cookie(spotifyConf.stateKey, state);

    // your application requests authorization
    var query = querystring.stringify({
        response_type: 'code',
        client_id: spotifyConf.client_id,
        scope: spotifyConf.scope,
        redirect_uri: spotifyConf.redirect_uri,
        state: state
    });
    res.redirect('https://accounts.spotify.com/authorize?' + query);
};

var callBack = function (req, res) {

    // your application requests refresh and access tokens
    // after checking the state parameter

    var code = req.query.code || null;
    var state = req.query.state || null;
    var storedState = req.cookies ? req.cookies[spotifyConf.stateKey] : null;

    if (state === null || state !== storedState) {
        res.redirect('/#' +
            querystring.stringify({
                error: 'state_mismatch'
            }));
    } else {
        res.clearCookie(spotifyConf.stateKey);
        
        var authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
                code: code,
                redirect_uri: spotifyConf.redirect_uri,
                grant_type: 'authorization_code'
            },
            headers: {
                'Authorization': 'Basic ' + (new Buffer(spotifyConf.client_id + ':' + spotifyConf.client_secret).toString('base64'))
            },
            json: true
        };

        request.post(authOptions, function (error, response, body) {
            if (!error && response.statusCode === 200) {

                var access_token = body.access_token,
                    refresh_token = body.refresh_token;

                var options = {
                    url: 'https://api.spotify.com/v1/me',
                    headers: {
                        'Authorization': 'Bearer ' + access_token
                    },
                    json: true
                };

                // Storing Session Data into Cookie using Express Session
                var sessData = req.session;
                sessData.access_token = body.access_token;
                sessData.refresh_token = body.refresh_token;
                sessData.display_name = body.display_name;

                // use the access token to access the Spotify Web API
                request.get(options, function (error, response, body) {
                    // Should I put this here?
                    // console.log(body);
                    // util.checkSpotifyDocumentExists(body.id, body.display_name, access_token);
                });
                // we can also pass the token to the browser to make requests from there
                res.redirect('home');
                // res.redirect('/#' +
                //     querystring.stringify({
                //         access_token: access_token,
                //         refresh_token: refresh_token
                //     }));
            } else {
                res.redirect('/#' +
                    querystring.stringify({
                        error: 'invalid_token'
                    }));
            }
        });
    }
};

var refreshToken = function (req, res) {

    // requesting access token from refresh token
    var refresh_token = req.query.refresh_token;
    var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: {
            'Authorization': 'Basic ' + (new Buffer(spotifyConf.client_id + ':' + spotifyConf.client_secret).toString('base64'))
        },
        form: {
            grant_type: 'refresh_token',
            refresh_token: refresh_token
        },
        json: true
    };

    request.post(authOptions, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var access_token = body.access_token;

            // Refresh Token Data in Session
            var sessData = req.session;
            sessData.access_token = body.access_token;

            res.send({
                'access_token': access_token
            });
        }
    });
};

module.exports = {
    login,
    callBack,
    refreshToken
}