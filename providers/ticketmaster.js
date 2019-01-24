const request = require('request');
const bluebird = require('bluebird');
const rp = require('request-promise');

const Person = require('../models/person');

const {
    ticketMasterConf
} = require('../config/ticketmaster');

var ticketMasterKey = ticketMasterConf.consumer_key;

// Pushes the Current Logged In Users artists into an Array
var mapUserArtists = (req, artists) => {

    var userArtists = req.user.artists;

    userArtists.map(function (artist) {
        return artists.push(artist);
    });

    return artists;
};

// Saves user artists attractions
var saveUsersArtistAttractionIds = (req, body) => {

    const user = req.user;
    const userArtists = user.artists;

    // Grabs current user data from DB.
    Person.findOne({
        _id: user._id
    }, function (err, user) {
        if (err)
            throw (err);

        // Maps our DB's artist data.
        userArtists.map(function (item, index) {
            
            // Saves user artists ID if they don't exist to user's artist array.
            if (user.artists[index].name === body._embedded.attractions[0].name && !user.artists[index].attraction_id ) {

                user.artists[index].attraction_id = body._embedded.attractions[0].id

            };
        });

        // Saves users artist attraction id from TicketMaster to our users DB document.
        user.save(function (err) {
            if (err)
                throw err;
            return user;
        });

        return;
    });
}

// Get the ids of the Artists for Ticketmaster
var getAttractionIds = (req) => {

    const artists = [];

    mapUserArtists(req, artists);

    /** Makes a request for each artist to the Ticket Master API with a delay to overcome the TicketMaster API rate limit. */
    bluebird.mapSeries(artists, function (artist) {

        const artist_name = artist.name;

        const options = {
            uri: `https://app.ticketmaster.com/discovery/v2/attractions.json?apikey=${ticketMasterKey}&keyword=${artist_name}`,
            json: true,
            simple: false
        };

        return send(options);
    });

    // Sends a request for every artist in current users list to Ticket Master Event Api
    send = (options) => {
        return rp(options)
            .then((body) => {

                if (body._embedded) {

                    /** If there are attractions for the artist, log the first attraction, 
                     * typically being the more important or correct one and save the id of the attraction to
                     * Persons Artist array  */
                    saveUsersArtistAttractionIds(req, body);
                    

                } else if (!body._embedded) {
                    // Either no attractions or artists exists. 
                    console.log('artist doesn\'t exist on TicketMaster');
                }
            })
            .delay(200)
            .catch((error) => {
                if (error) {
                    throw error;
                };
            });
    }
};

// Gets the event information of the attractions
var ticketMasterExample = () => {

    var latitude = "33.6685";
    var longitude = "-116.3081";
    var latlon = latitude + "," + longitude;
    var radius = 25;

    request.get("https://app.ticketmaster.com/discovery/v2/events.json?apikey=" + ticketMasterKey + "&latlong=" + latlon, {
        json: true
    }, (error, response, body) => {
        if (error) {
            return error;
        }
        console.log(body)
    });
};


module.exports = {
    getAttractionIds,
    ticketMasterExample,
}