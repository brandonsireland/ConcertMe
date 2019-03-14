const googleMapsClient = require('@google/maps');

const googleMapsConf = require('../config/googlemaps');

googleMapsClient.createClient({
    key: googleMapsConf.key
});