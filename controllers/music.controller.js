const spotifyConf = require('../config/spotify');
const {
    getTopArtists
} = require('../providers/spotify');

const getArtists = function (req, res) {

    console.log(req.session)
    const accessToken = req.user.spotify.access_token;
    const refreshToken = req.user.spotify.refresh_token
    const user = req.user;

    getTopArtists(accessToken, refreshToken, spotifyConf)
        .then(
            function (data) {
                saveArtistData(user, data);
            })
        .then(
            function (data) {
                res.render('home', {
                    data,
                    user: req.user
                });
            })
        .catch(function (err) {
            console.log(err);
            throw err;
        })
};

saveArtistData = (user, data) => {

    // console.log(user)
    console.log(data)
    // Person.findOne({
    // 	_id: user._id
    // }, function (err, user) {
    // 	if (err)
    // 		throw(err);

    // 	user.artists.push(data);

    // 	user.save(function (err) {
    // 		if (err)
    // 			throw err;
    // 		return user;
    // 	});

    // 	return user;
    // });
    return;
}


module.exports = {
    getArtists
};