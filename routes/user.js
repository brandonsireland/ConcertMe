var express = require('express');
var router = express.Router();
var auth = require('../controllers/auth.controller');

// =====================================
// PROFILE =============================
// =====================================
// router.get('/profile', auth.isLoggedIn, function(req, res, next) {
//   res.render('profile', {user: req.user});
// });

module.exports = router;