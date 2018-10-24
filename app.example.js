const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const routes  = require('./routes');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const port = process.env.PORT || 8888;

const util = require('./utility');

const mongoDB  = 'mongodb://<username>:<password>.mlab.com:29422/concertme';
mongoose.connect(mongoDB, { useNewUrlParser: true });

const app = express()
    .use(express.static(__dirname + '/public'))
    .use(cors())
    .use(cookieParser())
    .use(session({
        resave: false,
        saveUninitialized: true,
        secret:util.generateRandomString(8),
        store: new MongoStore({
            url: mongoDB
        }),
    }))

routes(app);


app.listen(port);
