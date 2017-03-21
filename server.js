// modules =================================================
var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var hash = require('bcrypt-nodejs');
var path = require('path');
var passport = require('passport');
var localStrategy = require('passport-local' ).Strategy;

var User = require('./app/models/user.js');

var routes = require('./app/api.js');
var movies = require('./app/movie-crud');
var theatres = require('./app/theatre-crud');
var citys = require('./app/city-crud');
var showtimings = require('./app/showtime-crud');
var assignshowtimes = require('./app/assignshowtime-crud');
var assignmovies = require('./app/assignmovie-crud');
var bookings = require('./app/booking-crud');

// configuration ===========================================

app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// configure passport
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/movie', movies);
app.use('/theatre', theatres);
app.use('/city', citys);
app.use('/showtiming', showtimings);
app.use('/assignshowtime', assignshowtimes);
app.use('/assignmovie', assignmovies);
app.use('/booking', bookings);
app.use('/user/', routes);

// routes ==================================================

require('./app/routes')(app); // pass our application into our routes

var db = require('./config/db');
db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connected to DB");
});


var port = process.env.PORT || 8080; // set our port

// start app ===============================================
app.listen(port);	
console.log('Magic happens on port ' + port); 			// shoutout to the user

// error hndlers
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.end(JSON.stringify({
    message: err.message,
    error: {}
  }));
});

exports = module.exports = app; 						// expose app