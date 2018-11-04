const express = require('express');
const router = express.Router();
const utilities = require('../utility');

// Get Register Page
router.get('/register', function(req, res, next){
    res.render('register', {title: 'Login to Concert Me'});
});

// Post Register Page
router.post('/register', function(req, res, next){

    utilities.registerPerson(req, res);

});

// router.post('/registered', function(req, res, next){
//     res.render('index', {title: 'Registration Complete'});
// });

module.exports = router;