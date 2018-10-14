var express = require('express');
var mongoose = require('mongoose');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var routes  = require('./routes');

var port = process.env.PORT || 8888;
var mongoDB  = 'mongodb://<username>:<password>.mlab.com:29422/concertme';

var app = express();

app.use(express.static(__dirname + '/public'));
app.use(cors())
   .use(cookieParser());

routes(app);

mongoose.connect(mongoDB, { useNewUrlParser: true });

app.listen(port);

