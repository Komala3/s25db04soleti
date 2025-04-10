const express = require('express');
const router = express.Router();
const drones_controllers = require('../controllers/drones');

// Route to display all drones
router.get('/', drones_controllers.drones_view_all_Page);

module.exports = router;

