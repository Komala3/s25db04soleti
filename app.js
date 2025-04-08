require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const Drone = require('./models/drones');

// MongoDB Connection Setup
const connectionString = process.env.MONGO_CONNECTION_STRING;
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('connecting', () => console.log('Connecting to MongoDB...'));
db.on('connected', () => console.log('MongoDB connected!'));
db.once('open', async () => {
  console.log('Connection to DB succeeded');
  if (process.env.RESEED === 'true') {
    await seedDatabase();
  }
});

// Import routers
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const dronesRouter = require('./routes/drones');
const pickRouter = require('./routes/pick');
const resourceRouter = require('./routes/resource');

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

module.exports = app;