'use strict';

const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: 'title is required',
    },
    description: {
        type: String,
        required: 'description is required',
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
            required: 'steps title is required',
        },
        description: {
            type: String,
            required: 'steps description is required',
        },
    }],
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }]
});



const Course = mongoose.model('Course', CourseSchema);
module.exports = Course;