var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Import the necessary routers
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dronesRouter = require('./routes/drones');
var pickRouter = require('./routes/pick'); // Import the pickRouter for random item functionality

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // This serves static files from the public folder

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/drones', dronesRouter);

app.use('/pick', pickRouter); // Use the pickRouter for '/pick' route

// Route for displaying drones
app.get('/drones', function(req, res) {
  const drones = [
    { model: 'DJI Phantom 4', range: 5, brand: 'DJI' },
    { model: 'Parrot Anafi', range: 4, brand: 'Parrot' },
    { model: 'Autel Evo II', range: 9, brand: 'Autel' }
  ];
  res.render('drones', { title: 'Drones', drones: drones });
});

// Route for selector (random item selection)
app.get('/selector', function(req, res) {
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

// Route for displaying grid based on query parameters
app.get('/grid', function(req, res) {
  let rows = req.query.rows ? parseInt(req.query.rows) : 1;
  let cols = req.query.cols ? parseInt(req.query.cols) : 1;

  // Convert rows and cols to numbers
  rows = Number(rows);
  cols = Number(cols);

  // Step 5: Check if the rows and cols are valid integers
  if (!Number.isInteger(rows) || !Number.isInteger(cols)) {
    return res.status(400).send('Invalid number of rows or columns.');
  }

  // Step 6: Check if rows and cols are within the allowed range (3 to 13)
  if (rows < 3 || rows > 13) {
    return res.status(400).send('Rows must be between 3 and 13.');
  }
  if (cols < 3 || cols > 13) {
    return res.status(400).send('Columns must be between 3 and 13.');
  }

  // Helper function to create a range of numbers
  function range(n) {
    return Array.from({ length: n }, (v, k) => k);
  }

  const rowRange = range(rows);
  const colRange = range(cols);

  // Step 10: Safely rendering the grid if inputs are valid
  res.render('grid', {
    title: 'Grid Page',
    query: { rows: rows, cols: cols },
    rowRange: rowRange,
    colRange: colRange
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
