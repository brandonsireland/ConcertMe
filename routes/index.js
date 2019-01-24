module.exports = function (app, express, passport) {
    const router = express.Router();
    
    const country = require('../providers/country-data');
    const getIp = require('../providers/geoip-lite');
    const ticketMaster = require('../providers/ticketmaster');

    const auth = require('../controllers/auth.controller');
    const musicController = require('../controllers/music.controller');

    // =====================================
    // HOME PAGE ===========================
    // =====================================

    router.get('/', auth.isLoggedIn, function (req, res) {
        res.render('home', {
            user: req.user,
            ip: getIp.getGEOLocation(req),
            demo: ticketMaster.getAttractionIds(req),
        });
    });

    // =====================================
    // REGISTER ============================
    // =====================================

    router.get('/register', function (req, res) {

        res.render('register', {
            title: 'Register to Concert Me',
            country: country.getAllCountries()
        });
    });

    router.post('/register', function (req, res) {
        auth.registerPerson(req, res);
    });

    // =====================================
    // LOGIN ===============================
    // =====================================

    router.get('/login', function (req, res) {
        res.render('login', {
            title: 'Login to Concert Me',
            user: req.user
        });
    });

    router.post('/login', passport.authenticate('local', {
        successRedirect: '/user/profile',
        failureRedirect: '/login'
    }));

    return router;
};