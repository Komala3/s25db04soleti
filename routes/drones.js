const express = require('express');
const router = express.Router();
const drones_controlers = require('../controllers/drones');

// Sample drone data (optional if not using a controller or database yet)
const drones = [
    { id: 1, model: 'DJI Phantom 4', range_km: 5, brand: 'DJI' },
    { id: 2, model: 'Parrot Anafi', range_km: 4, brand: 'Parrot' },
    { id: 3, model: 'Autel Evo II', range_km: 9, brand: 'Autel' }
];

// Route to display all drones with hardcoded data
router.get('/', (req, res) => {
    res.render('drones', { drones: drones });
});

// Route to display details of a single drone based on ID using hardcoded data
router.get('/:id', (req, res) => {
    const droneId = parseInt(req.params.id);
    const drone = drones.find(d => d.id === droneId);

    if (drone) {
        res.render('droneDetail', { drone: drone });
    } else {
        res.status(404).send('Drone not found');
    }
});

// Route to display all drones (using the controller to fetch data from the DB)
router.get('/db', drones_controlers.drones_view_all_Page); // Use controller for DB-driven data

module.exports = router;
