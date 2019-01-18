const request = require('request');

const {
    ticketMasterConf
} = require('../config/ticketmaster');

var ticketMasterKey = ticketMasterConf.consumer_key;

// Get the ids of the Artists for Ticketmaster
var getAttractionIds = () => {

    // Artist ID
    var artist = 'Elton John';

    request.get("https://app.ticketmaster.com/discovery/v2/attractions.json?apikey=" + ticketMasterKey + "&keyword=" + artist, { json: true }, (error, response, body)=> {    
    if(error) {
            return error;
        }

        // Returns First result from Ticketmaster, may contain more results such as other related events to the artist.
        console.log(JSON.stringify(body._embedded.attractions[0].name));
        console.log(JSON.stringify(body._embedded.attractions[0].id));
    });
};

// Gets the event information of the attractions
var ticketMasterExample =  () => {

    var latitude = "33.6685";
    var longitude = "-116.3081";
    var latlon = latitude + "," + longitude;
    var radius = 25;

    request.get("https://app.ticketmaster.com/discovery/v2/events.json?apikey=" + ticketMasterKey + "&latlong=" + latlon, { json: true}, (error, response, body) => {
        if(error) {
            return error;
        }
        console.log(body)
    });
};


module.exports = {
    getAttractionIds,
    ticketMasterExample,
}