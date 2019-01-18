const countries = require('country-data').countries;

var getAllCountries = () => {
    return countries.all;
};

module.exports = {
    getAllCountries
};