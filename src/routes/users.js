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
    //all errors are being handles by middleware so we don't need to add them here
    //we just need to return the logged in user which we got from middleware
    res.json(req.LoggedInUser);
    res.status(200);
});

//for testing to see if you get all users back
/*router.get('/', mid.requireSignIn, function(req, res, next) {
    User.find({}, function(err, users){
        if(err) return next(err);
        res.json(users);
        console.log(users)
    });
});*/

router.post('/', function(req, res, next) {
//check to see if that user exists
    User.findOne({emailAddress:req.body.emailAddress})
        .exec(function(err, user){
            if(user){
                err = new Error();
                err.message = 'That email already exists';
                err.status = 400;
                return next(err);
            }else{
                // use schema's `create` method to insert document into Mongo
                User.create(req.body, function (err, user) {
                    //if user doesnt add a full name or email we cant create a user
                    if(!user.emailAddress || !user.fullName || !user.password){
                        err = new Error();
                        err.message = 'we need an email address and fullname and a password';
                        err.status = 400;
                        return next(err);
                    }
                    if (err) return next(err);
                    res.location('/');
                    console.log(user);
                    res.status(201).json();
                });
            }
        });
});




module.exports = router;