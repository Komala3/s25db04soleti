var drones = require('../models/drones');
// List of all Costumes
exports.drones_list = function(req, res) {
res.send('NOT IMPLEMENTED: drones list');
};
// for a specific Costume.
exports.drones_detail = function(req, res) {
res.send('NOT IMPLEMENTED: drones detail: ' + req.params.id);
};
// Handle Costume create on POST.
exports.drones_create_post = function(req, res) {
res.send('NOT IMPLEMENTED: drones create POST');
};
// Handle Costume delete from on DELETE.
exports.drones_delete = function(req, res) {
res.send('NOT IMPLEMENTED: drones delete DELETE ' + req.params.id);
};
// Handle Costume update form on PUT.
exports.drones_update_put = function(req, res) {
res.send('NOT IMPLEMENTED: drones update PUT' + req.params.id);
};
