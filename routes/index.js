const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth.controller');

// Get Register Page
router.get('/register', function(req, res, next){
    res.render('register', {title: 'Login to Concert Me'});
});

// Post Register Page
router.post('/register', function(req, res, next){

    auth.registerPerson(req, res);

});

// router.post('/registered', function(req, res, next){
//     res.render('index', {title: 'Registration Complete'});
// });

module.exports = router;