var express = require('express');
var router = express.Router();
const drones_controllers = require('../controllers/drones');

// A little function to check if we have an authorized user and continue on or redirect to login.
const secured = (req, res, next) => {
  if (req.user) {
    return next();
  }
  res.redirect("/login");
};

// GET all drones (main collection view)
router.get('/', drones_controllers.drones_view_all_Page);

// GET one drone detail
router.get('/drones/:id', drones_controllers.drones_detail);

// GET update PUT route for drone
router.get('/drones/update/:id', drones_controllers.drones_update_put);

// GET detail view page
router.get('/detail', drones_controllers.drones_view_one_Page);

// GET create drone page (secured)
router.get('/create', secured, drones_controllers.drones_create_Page);

// GET update drone page (secured)
router.get('/update', secured, drones_controllers.drones_update_Page);

// GET delete drone page (secured)
router.get('/delete', secured, drones_controllers.drones_delete_Page);

module.exports = router;
