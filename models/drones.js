const mongoose = require('mongoose');

const dronesSchema = new mongoose.Schema({
  model: String,
  brand: String,
  range: Number
});

module.exports = mongoose.model("drones", dronesSchema);


