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

// for a specific Costume.
exports.drones_detail = async function(req, res) {
    console.log("detail" + req.params.id)
    try {
    result = await drones.findById( req.params.id)
    res.send(result)
    } catch (error) {
    res.status(500)
    res.send(`{"error": document for id ${req.params.id} not found`);
    }
   };
   //Handle Costume update form on PUT.
exports.drones_update_put = async function(req, res) {
 console.log(`update on id ${req.params.id} with body
${JSON.stringify(req.body)}`)
 try {
 let toUpdate = await drones.findById( req.params.id)
 // Do updates of properties
 if(req.body.model)toUpdate.model = req.body.model;
 if(req.body.brand) toUpdate.brand = req.body.brand;
 if(req.body.range) toUpdate.range = req.body.range;
 if(req.body.checkboxsale) toUpdate.sale = true;
else toUpdate.same = false;
 let result = await toUpdate.save();
 console.log("Sucess " + result)
 res.send(result)
 } catch (err) {
 res.status(500)
 res.send(`{"error": ${err}: Update for id ${req.params.id}
failed`);
 }
};
// Handle Costume update form on PUT.
//exports.drones_update_put = function(req, res) {
//res.send('NOT IMPLEMENTED: drones update PUT' + req.params.id);
//};
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


    // Handle a show one view with id specified by query
exports.drones_view_one_Page = async function(req, res) {
 console.log("single view for id " + req.query.id)
 try{
 result = await drones.findById( req.query.id)
 res.render('dronesdetail', 
{ title: 'drones Detail', toShow: result });
 }
 catch(err){
 res.status(500)
 res.send(`{'error': '${err}'}`);
 }
};
    
 // for a specific Costume.
exports.drones_delete = async function(req, res) {
    console.log("delete " + req.params.id)
    try {
    result = await drones.findByIdAndDelete( req.params.id)
    res.send(result)
    } catch (error) {
    res.status(500)
    res.send(`{"error": document for id ${req.params.id} not found`);
    }
   };

   // Handle building the view for creating a costume.
// No body, no in path parameter, no query.
// Does not need to be async
exports.drones_create_Page = function(req, res) {
    console.log("create view")
    try{
    res.render('dronescreate', { title: 'drones Create'});
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
   };

   // Handle building the view for updating a costume.
// query provides the id
exports.drones_update_Page = async function(req, res) {
    console.log("update view for item "+req.query.id)
    try{
    let result = await drones.findById(req.query.id)
    res.render('dronesupdate', { title: 'drones Update', toShow: result });
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
   };
   
   // Handle a delete one view with id from query
exports.drones_delete_Page = async function(req, res) {
    console.log("Delete view for id " + req.query.id)
    try{
    result = await drones.findById(req.query.id)
    res.render('dronesdelete', { title: 'drones Delete', toShow: 
   result });
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
   };

  

   