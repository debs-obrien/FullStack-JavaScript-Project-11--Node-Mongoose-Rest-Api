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
    res.json(req.LoggedInUser)
  /*  .exec(function(err, user){
        if(err) return next(err);
        res.status(200);
        return res.json(user);
    });*/

});


router.post('/', function(req, res, next) {
    // use schema's `create` method to insert document into Mongo
    User.create(req.body, function (err, user) {
        if(!req.body.emailAddress || !req.body.fullName){
            err.status = 400;
        }
        if (err)
            if (err.name === "MongoError" && err.code === 11000) {
            err = new Error();
            err.message = 'That email already exists';
            err.status = 400;
            return next(err);
        } else {
            return next(err);
        }
        res.location('/');
        res.status(201).json();
        console.log(user)
    });
});




module.exports = router;