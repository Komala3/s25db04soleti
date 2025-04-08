const mongoose = require('mongoose');

const droneSchema = new mongoose.Schema({
  model: String,
  brand: String,
  range: Number
});

module.exports = mongoose.model('Drone', droneSchema);