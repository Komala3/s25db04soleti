require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');


// MongoDB Connection Setup
const connectionString = process.env.MONGO_CON;
mongoose = require('mongoose');
mongoose.connect(connectionString);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('connecting', () => console.log('Connecting to MongoDB...'));
db.on('connected', () => console.log('MongoDB connected!'))

db.once("open", function(){
console.log("Connection to DB succeeded")});
// Import routers
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dronesRouter = require('./routes/drones');
var pickRouter = require('./routes/pick');
var resourceRouter = require('./routes/resource');
const drones = require("./models/drones");
const constants = require('constants');

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

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/drones', dronesRouter);
app.use('/pick', pickRouter);
app.use('/resource', resourceRouter);
app.get('/drones', require('./controllers/drones').drones_list);


// Database seeding function
async function seedDatabase() {
  try {
    await Drone.deleteMany();
    await Drone.create([
      { model: "Phantom 4", brand: "DJI", range: 6000 },
      { model: "Anafi", brand: "Parrot", range: 4000 },
      { model: "Evo II", brand: "Autel", range: 9000 }
    ]);
    console.log('Database seeded successfully');
  } catch (err) {
    console.error('Error seeding database:', err);
  }
}

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

module.exports = app;