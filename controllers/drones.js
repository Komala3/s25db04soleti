const Drone = require('../models/drones');

// List of all Drones
exports.drone_list = async function(req, res) {
  try {
    const drones = await Drone.find();
    res.send(drones);
  } catch (err) {
    res.status(500);
    res.send(`{"error": ${err}}`);
  }
};

// Handle Drone create on POST.
exports.drone_create_post = async function(req, res) {
  const document = new Drone();
  document.model = req.body.model;
  document.brand = req.body.brand;
  document.range = req.body.range;
  
  try {
    const result = await document.save();
    res.send(result);
  } catch(err) {
    res.status(500);
    res.send(`{"error": ${err}}`);
  }
};

// VIEWS
// Handle a show all view
exports.drone_view_all_Page = async function(req, res) {
  try {
    const drones = await Drone.find();
    res.render('drones', { title: 'Drone Search Results', results: drones });
  } catch(err) {
    res.status(500);
    res.send(`{"error": ${err}}`);
  }
};