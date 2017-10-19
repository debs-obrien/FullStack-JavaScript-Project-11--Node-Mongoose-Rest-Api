"use strict";
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Course = require('../models/course');
const Review = require('../models/review');
const mid = require('../middleware');

/*---------------------------------------------------------------------
 GET courses - finds all but only sends back course_id and title
 ----------------------------------------------------------------------*/
router.get('/', function(req, res, next) {
    Course.find({},'course_id title', function(err, courses){
        if(err){
            err.status = 400;
            return next(err);
        }
        res.status(200);
        res.json(courses);
    });

});
/*---------------------------------------------------------------------
POST courses - .json() returns no content
 ----------------------------------------------------------------------*/
router.post('/', mid.requireSignIn, function(req, res, next) {
    Course.create(req.body, function (err) {
        if (err) {
            err.status = 400;
            return next(err);
        }
        res.location('/');
        res.status(201).json();  //returns no content
    });
});
/*---------------------------------------------------------------------
GET course for ID deep populate first populate the reviews
then go deep to get the users and only show the fullName for the review
 ----------------------------------------------------------------------*/
router.get('/:courseID', function(req, res, next) {
    Course.findById(req.params.courseID)
        .populate({path: 'user', select: 'fullName'})
        .populate({path: 'reviews', populate: { path: 'user', model: 'User', select: 'fullName' }})
        .exec(function(err, courses){
        if(err){
            err.status = 400;
            return next(err);
        }
        res.status(200);
        res.json(courses);
    });
});
/*---------------------------------------------------------------------
PUT update course for ID
 ----------------------------------------------------------------------*/
router.put('/:courseID', mid.requireSignIn, function(req, res, next) {
    Course.findByIdAndUpdate(req.body._id, req.body, function(err){
        if(err){
            err.status = 400;
            return next(err);
        }
        res.status(201).json();
    });
});
/*---------------------------------------------------------------------
POST add review for course for ID
.toString() need to convert to string or it will compare two objects
 ----------------------------------------------------------------------*/
router.post('/:courseID/reviews', mid.requireSignIn, function(req, res, next) {
    Course.findById({_id: req.params.courseID})
        .populate('user')
        .populate('reviews')
        .exec(function(err, courses) {
            if (err) {
                err.status = 400;
                return next(err);
            }
            if(req.LoggedInUser._id.toString() === courses.user._id.toString()){
                let err = new Error;
                err.message = "You can't review your own course";
                err.status = 400;
                return next(err);
            }else{
                Review.create(req.body, function (err){
                    if (err){
                        err.status = 400;
                        return next(err);
                    }
                    res.location('/:courseID');
                    res.status(201).json();
                })
            }
        });
});

module.exports = router;