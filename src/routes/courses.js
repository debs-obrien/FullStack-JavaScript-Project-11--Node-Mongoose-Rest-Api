"use strict";
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Course = require('../models/course');
const Review = require('../models/review');


/* GET courses  */
router.get('/', function(req, res, next) {
    res.status(200);
    Course.find({},'course_id title', function(err, courses){
        if(err) return next(err);
        res.json(courses);
        console.log(courses)
    });

});
/* POST courses  */
router.post('/', function(req, res, next) {
    Course.create(req.body, function (err, course) {
        console.log(req.body);
        if (err) {
            return next(err);
        }
        res.status(201);
        res.location('/');
    });

});

/* GET course for ID populate with user and reviews */
router.get('/:courseID', function(req, res, next) {
    res.status(200);
    Course.findById(req.params.courseID)
        .populate('user')
        .populate('reviews')
        .exec(function(err, courses){
        if(err) return next(err);
        res.json(courses);
    });
});
/* PUT update course for ID  */
router.put('/:courseID', function(req, res, next) {
    res.status(204);
    Course.update({_id: req.params.courseID})
        .exec(function(err, courses){
            if(err) return next(err);
            //res.json(courses);
            res.location('/:courseID');
        });
});
/* POST add review for course for ID */
router.post('/:courseID/reviews', function(req, res, next) {
    Course.findOne({_id: req.params.courseID});
    Review.create(req.body, function (err, course){
        if (err) return next(err);
        res.status(201);
        res.location('/:courseID');
    })
});



module.exports = router;