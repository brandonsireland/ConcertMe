const geoip = require('geoip-lite');

var getGEOLocation = (req) => {

    // let ip = req.ip;

    // Demo purposes
    var ip = "47.158.164.28";
    
    ip = ip.toString();
    // console.log(ip)

    // ipv6
    if (ip.substr(0, 7) === "::ffff:") {
        let ip = ip.substr(7);
    }

    var geoIpLat = geoip.lookup(ip).ll[0];
    var geoIpLong = geoip.lookup(ip).ll[1];

    // console.log('The Latitude: ' + JSON.stringify(geoIpLat));
    // console.log('The Longitude: ' + JSON.stringify(geoIpLong));

    return {
        geoIpLat,
        geoIpLong
    }

}

module.exports = {
    getGEOLocation
}

//Get a list of all events for Adele in Canada
// https://app.ticketmaster.com/discovery/v2/events.json?attractionId=K8vZ917Gku7&countryCode=CA&apikey=jHavF5nkVq4S3sqGKZQEkU1olOqnidMD