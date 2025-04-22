var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
require('dotenv').config();


var indexRouter = require('./routes/index');  
var usersRouter = require('./routes/users');
var dronesRouter = require('./routes/drones');
var pickRouter = require('./routes/pick');
var resourceRouter = require('./routes/resource');
var drones = require("./models/drones");

//passport code
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection setup
const connectionString = process.env.MONGO_CON;
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Confirm DB connection
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once("open", function () {
  console.log("Connection to DB succeeded");
});

//passport code
var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(
  function(username, password, done) {
    Account.findOne({ username: username })
      .then(function(user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      })
      .catch(function(err) {
        return done(err);
      });
  }
));



app.use(require('express-session')({
  secret: 'keyboard cat',  // Secret to encrypt session cookie
  resave: false,           // Don't save session if not modified
  saveUninitialized: false // Don't create a session until something is stored
}));
app.use(passport.initialize());   // Initializes Passport
app.use(passport.session());      // Handles the session for authentication

// passport config
// Use the existing connection
// The Account model
var Account =require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());



async function recreateDB(){
  // Delete everything
  await drones.deleteMany();
  let instance1 = new drones({ model: "Phantom 4", brand: "DJI", range: 6000 });
  instance1.save().then(doc=>{
  console.log("First object saved")}).catch(err=>{
  console.error(err)});
  
  let instance2 = new drones({ model: "Anafi", brand: "Parrot", range: 4000 });
  instance2.save().then(doc=>{
  console.log("Second object saved")}).catch(err=>{
  console.error(err)});
  
  let instance3 = new drones({ model: "Evo II", brand: "Autel", range: 9000 });
  instance3.save().then(doc=>{
  console.log("third object saved")}).catch(err=>{
  console.error(err)});
  
  }
  
  let reseed = true;
  if (reseed) {recreateDB();}

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/drones', dronesRouter); // This uses the router, not the controller directly
app.use('/pick', pickRouter);
app.use('/resource', resourceRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;


