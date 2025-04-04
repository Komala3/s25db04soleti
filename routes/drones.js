var express = require('express');
var router = express.Router();

// Sample data for drones (can be extended or replaced with a database query)
const drones = [
    { id: 1, model: 'DJI Phantom 4', range_km: 5, brand: 'DJI' },
    { id: 2, model: 'Parrot Anafi', range_km: 4, brand: 'Parrot' },
    { id: 3, model: 'Autel Evo II', range_km: 9, brand: 'Autel' }
];

// Define the route to display all drones
router.get('/', function(req, res, next) {
    res.render('drones', { drones: drones }); // Pass drones data to Pug
});

// Define the route to display details of a single drone based on its ID
router.get('/:id', function(req, res, next) {
    const droneId = parseInt(req.params.id);
    const drone = drones.find(d => d.id === droneId);

    if (drone) {
        res.render('droneDetail', { drone: drone }); // Render a detailed view
    } else {
        res.status(404).send('Drone not found');
    }
});

module.exports = router;
