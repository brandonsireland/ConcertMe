const path = require('path');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8888;
const cors = require('cors');
const cookieParser = require('cookie-parser');
const express = require('express');
const hbs = require('express-handlebars');
const expressValidator = require('express-validator');
const mongoose = require('mongoose');

// Authentication Packages 
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

// Custom
const utilities = require('./utility');
const configDatabase = require('./config/database');
const handlebarsHelpers = require('./helpers/handlebars');

// Routes 
const indexRoutes = require('./routes/index');
const userRoutes = require('./routes/user');

const app = express();

//View Engine setup
app.engine('hbs', hbs({
    extname: 'hbs', 
    defaultLayout: 'layout', 
    layoutsDir: __dirname + '/views/layouts/', 
    helpers: handlebarsHelpers
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Database
mongoose.connect(configDatabase.url, { useNewUrlParser: true });

app.use(express.static(path.join(__dirname, 'public')))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: false }))
    .use(expressValidator())
    .use(cors())
    .use(cookieParser())
    .use(session({
        resave: false,
        saveUninitialized: false,
        secret:utilities.generateRandomString(8),
        store: new MongoStore({
            mongooseConnection: mongoose.connection,
        }),
    }))
    .use(passport.initialize())
    .use(passport.session())
    .use(function(req,res, next) {
        res.locals.isAuthenticated = req.isAuthenticated();
        next();
    })
    // Running passport through our passport configuration
require('./config/passport')(passport); // Don't know if Im using this right
    app.use('/', indexRoutes);
    app.use('/user', userRoutes);       


app.listen(port);

