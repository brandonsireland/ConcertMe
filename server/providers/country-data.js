const countries = require('country-data').countries;
const lookup = require('country-data').lookup;

var getAllCountries = () => {
    return countries.all;
};

// Converts Users Country code to Alpha
var convertCountrytoAlpha = (country) => {
    return lookup.countries({name: country})[0].alpha2;
};

module.exports = {
    getAllCountries,
    convertCountrytoAlpha
};