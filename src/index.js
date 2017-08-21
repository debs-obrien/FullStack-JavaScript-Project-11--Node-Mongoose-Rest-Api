'use strict';

// load modules
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const http = require('http');
const mongoose = require('mongoose');
const routes = require('./routes');
const jsonParser = require('body-parser').json;

//set up database
const db = mongoose.connect('mongodb://localhost:27017/daemon', {
    useMongoClient: true
});

db.on('error', function(err){
    console.error('connection error:', err)
});

db.once('open', function() {
    console.log('db connected');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// set our port
app.set('port', process.env.PORT || 5000);

// morgan gives us http request logging
app.use(morgan('dev'));

// set up json parser
app.use(jsonParser());

// setup our static route to serve files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', routes);


// catch 404 and forward to global error handler
app.use(function(req, res, next) {
    const err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// Express's global error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// start listening on our port
const server = app.listen(app.get('port'), function() {
  console.log('Express server is listening on port ' + server.address().port);
});
