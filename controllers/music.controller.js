const session = require('express-session');
const spotifyConf = require('../config/spotify');

const {
    getTopArtists
} = require('../providers/spotify');

const saveArtists = function (req, res) {


    var accessToken = req.session.access_token;
    console.log(accessToken)

    getTopArtists(accessToken, spotifyConf)
        .then(
            function (data) {
                res.render('home', {data});
            })
        .catch(function (err) {
            console.log(err);
            throw err;
        })
    
    // res.render('home');
};


module.exports = {
    saveArtists
};