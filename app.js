
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dronesRouter = require('./routes/drones');
var pickRouter = require('./routes/pick');
var resourceRouter = require('./routes/resource');
const drones = require("./models/drones");


const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

require('dotenv').config();
// MongoDB Connection Setup
const connectionString = process.env.MONGO_CON;
mongoose = require('mongoose');
mongoose.connect(connectionString);






// We can seed the collection if needed on server start
async function recreateDB(){
 // Delete everything
 await drones.deleteMany();
 let instance1 = new drones({model:"Phantom 4", brand: "DJI", range:6000});
 instance1.save().then(doc=>{
 console.log("First object saved")}).catch(err=>{
console.error(err)});

 let instance2 = new drones({model:"Anafi", brand: "Parrot", range:4000});
 instance2.save().then(doc=>{
 console.log("Second object saved")}).catch(err=>{
 console.error(err)});

 let instance3 = new drones({model:"Evo II", brand:"Autel", model:9000});
 instance3.save().then(doc=>{
 console.log("Third object saved")}).catch(err=>{
 console.error(err)});

}
let reseed = true;
if (reseed) recreateDB();

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/drones', dronesRouter);
app.use('/pick', pickRouter);
app.use('/resource', resourceRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//Get the default connection
var db = mongoose.connection;
//Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once("open", function(){
console.log("Connection to DB succeeded")});

module.exports = app;








db.once("open", function(){
  console.log("Connection to DB succeeded")});
  // Import routers

  app.get('/drones', require('./controllers/drones').drones_list);