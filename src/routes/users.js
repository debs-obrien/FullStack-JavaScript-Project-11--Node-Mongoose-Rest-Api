"use strict";
const express = require('express');
const router = express.Router();
const auth = require('basic-auth');
const User = require('../models/user');
const Course = require('../models/course');
const Review = require('../models/review');
const mid = require('../middleware');


/* GET home page. */
router.get('/', mid.requireSignIn, function(req, res, next) {
    User.find({})
    .exec(function(err, user){
        if(err) return next(err);
        res.status(200);
        return res.json(user);
    });

});


router.post('/', function(req, res, next) {
    // use schema's `create` method to insert document into Mongo
    User.create(req.body, function (err, user) {
        if (err) return next(err);
        res.status(201);
        res.location('/');
        console.log(user)
    });
});




module.exports = router;