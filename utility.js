const Person = require('./models/person');
const Spotify = require('./models/spotify');
const expressValidator = require('express-validator');

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

var registerPerson = (req, res) => {

	// Express Validators
	req.checkBody('username', 'Username field cannot be empty.').notEmpty();
	req.checkBody('username', 'Username must be between 4-15 characters long.').len(4, 15);
	req.checkBody('username', 'Username can only contain letters, numbers, or underscores.').matches(/^[A-Za-z0-9_-]+$/, 'i');
	req.checkBody('email', 'The email you entered is invalid, please try again.').isEmail();
	req.checkBody('email', 'Email address must be between 4-100 characters long, please try again.').len(4, 100);
	req.checkBody('password', 'Password must be between 8-100 characters long.').len(8, 100);
	req.checkBody("password", "Password must include one lowercase character, one uppercase character, a number, and a special character.").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, "i");
	req.checkBody('passwordMatch', 'Passwords do not match, please try again.').equals(req.body.password);

	const errors = req.validationErrors();

	// Checks validation errors
	if (errors) {

		console.log(`errors: ${JSON.stringify(errors)}`);

		res.render('register', {
			title: 'Registration Error',
			errors: errors
		});

	} else {

		const username = req.body.username;
		const email = req.body.email;
		const password = req.body.password;

		let newPerson = new Person({
			username: username,
			email: email,
			password: password,
		});

		// Save data into db
		newPerson.save(function (errors) {
			if (errors) {
				if (errors.name === 'MongoError' && errors.code === 11000) {
					return res.render('register', {
						title: 'Registration Error',
						message: 'Username or Email already exists'
					});
				}
				// Some other error
				return res.status(500).send(errors);
			}

			res.render('register', {
				title: 'Registation complete'
			});

		});
	}

};

module.exports = {
	generateRandomString,
	checkSpotifyDocumentExists,
	registerPerson
}