"use strict";
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const mid = require('../middleware');

/*---------------------------------------------------------------------
GET logged in user
all errors are being handles by middleware so we don't need to add them here
we just need to return the logged in user which we got from middleware
 ----------------------------------------------------------------------*/
router.get('/', mid.requireSignIn, function(req, res) {
    res.json(req.LoggedInUser);
    res.status(200);
});
/*---------------------------------------------------------------------
POST user - creates a new user
check to see if that user exists by checking email in form against database
use schema's `create` method to insert document into Mongo
if user doesnt add a full name or email we cant create a user
 ----------------------------------------------------------------------*/
router.post('/', function(req, res, next) {
    User.findOne({emailAddress:req.body.emailAddress})
        .exec(function(err, user){
            if(user){
                err = new Error();
                err.message = 'That email already exists';
                err.status = 400;
                return next(err);
            }else{
                User.create(req.body, function (err, user) {
                    if(!user.emailAddress || !user.fullName || !user.password){
                        err.status = 400;
                        return next(err);
                    }
                    if (err){
                        return next(err);
                    } else{
                        res.location('/');
                        res.status(201).json();
                    }

                });
            }
        });
});


module.exports = router;