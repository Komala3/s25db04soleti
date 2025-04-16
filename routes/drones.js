var express = require('express');
var router = express.Router();

/* GET drones page. */
router.get('/', function(req, res, next) {
  res.render('drones', { title: 'Search Results - drones' });6
});

//var express = require('express');
const drones_controllers= require('../controllers/drones');
var router = express.Router();
/* GET drones */
router.get('/', drones_controllers.drones_view_all_Page );
// GET request for one costume.
router.get('/drones/:id', drones_controllers.drones_detail);
router.get('/drones/:id', drones_controllers.drones_update_put);
/* GET detail costume page */
router.get('/detail', drones_controllers.drones_view_one_Page);
/* GET create costume page */
router.get('/create', drones_controllers.drones_create_Page);

/* GET create update page */
router.get('/update', drones_controllers.drones_update_Page);

/* GET delete costume page */
router.get('/delete', drones_controllers.drones_delete_Page);







module.exports = router;

module.exports = router;