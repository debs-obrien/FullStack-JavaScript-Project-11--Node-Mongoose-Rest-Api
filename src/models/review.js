'use strict';

const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    postedOn: {
        type: Date, default: Date.now()
    },
    rating: {
        type: Number,
        required:  'rating is required',
        min: [1,  'min value is 1'],
        max: [5,  'max value is 5'],
    },
    review: {
        type: String,
    }
});



const Review = mongoose.model('Review', ReviewSchema);
module.exports = Review;