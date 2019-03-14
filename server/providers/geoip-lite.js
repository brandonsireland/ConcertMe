const geoip = require('geoip-lite');
const geohash = require('ngeohash');

var getGEOLocation = (req) => {

    // Demo purposes
    let ip = "47.158.164.28";
    // let ip = req.ip;
    // ip = ip.toString();
    
    // ipv6
    if (ip.substr(0, 7) === "::ffff:") {
        let ip = ip.substr(7);
    }

    const geoIpLat = geoip.lookup(ip).ll[0];
    const geoIpLong = geoip.lookup(ip).ll[1];

    console.log(geoIpLat , geoIpLong)
    // Ticket Master geo Lat and Long are depricated, need geo hash.

    const geoHashLatLong = geohash.encode(geoIpLat, geoIpLong);
    console.log(geoHashLatLong);

    return geoHashLatLong;
};

module.exports = {
    getGEOLocation
}