"use strict";
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Course = require('../models/course');
const Review = require('../models/review');
const mid = require('../middleware');


/* GET courses  */
router.get('/', function(req, res, next) {
    //finds all but only sends back course_id and title
    Course.find({},'course_id title', function(err, courses){
        if(err){
            err.status = 400;
            return next(err);
        }
        res.status(200);
        res.json(courses);
    });

});
/* POST courses  */
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

/* GET course for ID populate with user and reviews */
router.get('/:courseID', function(req, res, next) {
    Course.findById(req.params.courseID)
        .populate('user')
        .populate('reviews')
        .exec(function(err, courses){
        if(err){
            err.status = 400;
            return next(err);
        }
        res.status(200);
        res.json(courses);
    });
});
/* PUT update course for ID  */
router.put('/:courseID', mid.requireSignIn, function(req, res, next) {
    Course.findByIdAndUpdate(req.body._id, req.body, function(err, course){
        if(err){
            err.status = 400;
            return next(err);
        }
        res.status(201).json();
    });
});
/* POST add review for course for ID */
router.post('/:courseID/reviews', mid.requireSignIn, function(req, res, next) {
    Course.findById({_id: req.params.courseID});
    Review.create(req.body, function (err){
        if (err){
            err.status = 400;
            return next(err);
        }
        res.location('/:courseID');
        res.status(201).json();
    })
});



module.exports = router;