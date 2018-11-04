const Person = require('./models/person');
const Spotify = require('./models/spotify');
const expressValidator = require('express-validator');
const bcrypt = require('bcrypt');
const saltRounds = 10;

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function (length) {
	var text = '';
	var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	for (var i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
};

var checkPersonDocumentExists = (displayname) => {

	Person.findOne({
		name: displayname
	}, function (err, doc) {
		if (err) {
			console.error(err);
		} else {
			console.log(doc);
		};
	});

};

var checkSpotifyDocumentExists = (id, name, token) => {

	Spotify.findOne({
		id: id
	}, function (err, doc) {
		if (err) {
			console.error(err);
		} else if (doc === null) {
			createDoc(id, name, token);
		} else {
			console.log(doc);
		};
	});

};

var createDoc = (id, name, token) => {

	var person = new Person({
		name: name,
	})

	var spotify = new Spotify({
		id: id,
		display_name: name,
		access_token: token,
		person: person._id
	});

	person.save(function (err) {
		if (err) {
			console.error(err);
		}
	});

	spotify.save(function (err) {
		if (err) {
			console.error(err);
		}
	});
}

module.exports = {
	generateRandomString,
	checkSpotifyDocumentExists,
}