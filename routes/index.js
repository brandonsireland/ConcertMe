const express = require('express');
var router = express.Router();

// Get Home Page

router.get('/', function(req, res, next){
    res.render('index', {title: 'Login to Concert Me'});
});

router.post('/register', function(req, res, next){
    res.render('index', {title: 'Register to Concert Me'});
});

router.post('/registered', function(req, res, next){
    res.render('index', {title: 'Registration Complete'});
});

module.exports = router;