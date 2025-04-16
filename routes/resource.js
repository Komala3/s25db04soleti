var express = require('express');
var router = express.Router();
// Require controller modules.
var api_controller = require('../controllers/api');
var drones_controller = require('../controllers/drones');
/// API ROUTE ///
// GET resources base.
router.get('/', api_controller.api);
/// COSTUME ROUTES ///
// POST request for creating a Costume. 
router.post('/drones', drones_controller.drones_create_post);
// DELETE request to delete Costume.
router.delete('/drones/:id', drones_controller.drones_delete);
// PUT request to update Costume.
router.put('/drones/:id', drones_controller.drones_update_put);
// GET request for one Costume.
router.get('/drones/:id', drones_controller.drones_detail);
// GET request for list of all Costume items.
router.get('/drones', drones_controller.drones_list);
module.exports = router;
