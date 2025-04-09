const express = require('express');
const router = express.Router();


// Sample drone data (optional if not using a controller or database yet)
const drones = [
    { id: 1, model: 'DJI Phantom 4', range: 6000, brand: 'DJI' },
    { id: 2, model: 'Parrot Anafi', range: 4000, brand: 'Parrot' },
    { id: 3, model: 'Autel Evo II', range: 9000, brand: 'Autel' }
];

// Route to display all drones with hardcoded data
router.get('/', function(req, res, next)  {
    res.render('drones', { title: 'Search results - drones' });
});

// Route to display details of a single drone based on ID using hardcoded data


module.exports = router;

