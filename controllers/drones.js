var drones = require('../models/drones');
// List of all Costumes
//exports.drones_list = function(req, res) {
//res.send('NOT IMPLEMENTED: drones list');
//};

exports.drones_list = async function(req, res) {
    try{
    thedrones = await drones.find();
    res.send(thedrones);
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
    };
// for a specific Costume.
exports.drones_detail = function(req, res) {
res.send('NOT IMPLEMENTED: drones detail: ' + req.params.id);
};
// Handle Costume create on POST.
exports.drones_create_post = async function(req, res) {
    console.log(req.body)
    let document = new drones();
    // We are looking for a body, since POST does not have query parameters.
    // Even though bodies can be in many different formats, we will be picky
    // and require that it be a json object
    // {"costume_type":"goat", "cost":12, "size":"large"}
    document.model= req.body.model;
    document.brand = req.body.brand;
    document.range = req.body.range;
    try{
    let result = await document.save();
    res.send(result);
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
    };
//exports.drones_create_post = function(req, res) {
//res.send('NOT IMPLEMENTED: drones create POST');
//};
// Handle Costume delete from on DELETE.
exports.drones_delete = function(req, res) {
res.send('NOT IMPLEMENTED: drones delete DELETE ' + req.params.id);
};
// Handle Costume update form on PUT.
exports.drones_update_put = function(req, res) {
res.send('NOT IMPLEMENTED: drones update PUT' + req.params.id);
};
//VIEWS
// Handle a show all view
exports.drones_view_all_Page = async function(req, res) {
    try{
    thedrones = await drones.find();
    res.render('drones', { title: 'drones Search Results', results: thedrones });
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
    };