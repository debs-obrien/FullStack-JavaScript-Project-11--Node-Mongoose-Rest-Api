'use strict';

// load modules
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const http = require('http');
const jsonParser = require('body-parser').json;
const courses = require('./routes/courses');
const users = require('./routes/users');


// morgan gives us http request logging
app.use(morgan('dev'));

// set up json parser
app.use(jsonParser());

// setup our static route to serve files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

//get the user routes
app.use('/api/users', users);
app.use('/api/courses', courses);


// catch 404 and forward to global error handler
app.use(function(req, res, next) {
    const err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// Express's global error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send(err);
});


module.exports = app;