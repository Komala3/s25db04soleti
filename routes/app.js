require('dotenv').config();
const mongoose = require('mongoose');

// Database connection
const connectionString = process.env.MONGO_CON;
mongoose.connect(connectionString);

// Connection events
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  console.log("Connection to DB succeeded");
});