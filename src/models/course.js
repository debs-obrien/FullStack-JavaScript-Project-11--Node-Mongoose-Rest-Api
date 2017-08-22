'use strict';

const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    estimatedTime: {
        type: String,
    },
    materialsNeeded: {
        type: String,
    },
    steps: [{
        stepNumber: {
            type: Number
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
    }],
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reviews'
    }]
});



const Course = mongoose.model('Course', CourseSchema);
module.exports = Course;