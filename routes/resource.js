const express = require('express');
const router = express.Router();
const drone_controller = require('../controllers/drone');

// API description
router.get('/', (req, res) => {
  res.json({
    resource: 'drones',
    endpoints: {
      list: { method: 'GET', path: '/drones' },
      create: { method: 'POST', path: '/drones' },
      detail: { method: 'GET', path: '/drones/:id' }
    }
  });
});

// Drone API routes
router.get('/drones', drone_controller.drone_list);
router.post('/drones', drone_controller.drone_create_post);

module.exports = router;

