const session = require('express-session');
const spotifyConf = require('../config');

const {
    getTopArtists
} = require('../providers/spotify');

const listArtists = function (req, res) {


    var accessToken = req.session.access_token;

    getTopArtists(accessToken, spotifyConf)
        .then(
            function (data) {
                console.log(typeof data)
                res.render('home', {data});
            })
        .catch(function (err) {
            console.log(err);
            throw err;
        })
    
    // res.render('home');
};


module.exports = {
    listArtists
};