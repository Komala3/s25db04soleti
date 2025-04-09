const mongoose = require("mongoose");

const droneSchema = mongoose.Schema({
  model: String,
  brand: String,
  Range: Number
});

module.exports = mongoose.model("Drones", droneSchema);





