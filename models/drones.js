const mongoose = require("mongoose");

const droneSchema = mongoose.Schema({
  name: String,
  mileage_mpg: Number,
  type: String
});

module.exports = mongoose.model("Drones", droneSchema);





