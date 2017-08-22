"use strict";
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Course = require('../models/course');
const Review = require('../models/review');

/* GET home page. */
router.get('/api/users', function(req, res, next) {
    res.status(200);
    User.find({}, function(err, users){
        if(err) return next(err);
        res.json(users);
        console.log(users)
    });

});

router.post('/api/users', function(req, res, next) {
    // use schema's `create` method to insert document into Mongo
    User.create(req.body, function (err, user) {
        console.log(req.body)
        if (err) {
            return next(err);
        }
        res.status(201);
        res.location('/');
    });
});


module.exports = router;