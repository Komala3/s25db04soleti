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

// Recreate DB with sample data
async function recreateDB() {
  try {
    await drones.deleteMany();
    console.log("Old drones removed");

    let instance1 = new drones({ model: "Phantom 4", brand: "DJI", range: 6000 });
    await instance1.save();

    let instance2 = new drones({ model: "Anafi", brand: "Parrot", range: 4000 });
    await instance2.save();

    let instance3 = new drones({ model: "Evo II", brand: "Autel", range: 9000 });
    await instance3.save();

    console.log("Database seeded successfully.");
  } catch (err) {
    console.error("Seeding error:", err);
  }
}

let reseed = true;
if (reseed) {
  console.log("Seeding database...");
  recreateDB();
}

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
