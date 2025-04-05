var express = require('express');
var router = express.Router();

// Route for the pick functionality
router.get('/', function(req, res) {
  const image_names = [
    'DJI_Phantom_4.png',
    'parrotANAFI.jpg',
    'Autel.png',
    'parrotswing.png',
    'drone105.jpg'
  ];

  // Generate 3 random images from the image_names array
  const randomImages = [];
  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * image_names.length);
    randomImages.push(image_names[randomIndex]);
  }

  // Pass randomImages to the Pug template for rendering
  res.render('randomitem', { images: randomImages });
});

module.exports = router;
