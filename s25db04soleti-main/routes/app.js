require('dotenv').config();
mongoose.connect(process.env.MONGO_CON, { useNewUrlParser: true, useUnifiedTopology: true });
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

module.exports = app;
