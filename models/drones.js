const mongoose = require("mongoose");

const droneSchema = mongoose.Schema({
  model: {
    type: String,
    required: [true, "Drone model is required"],
    minlength: [4, "Model must be at least 3 character"]
  },
  brand: {
    type: String,
    required: [true, "Drone brand is required"],
    minlength: [3, "Brand must be at least 3 character"]
  },
  range: {
    type: Number,
    required: [true, "Drone range is required"],
    min: [1000, "Range must be at least 1000 km"]
  }
});

module.exports = mongoose.model("drones", droneSchema);
