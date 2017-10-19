'use strict';
const isEmail = require('validator').isEmail;
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: 'FullName is required',
    },
    emailAddress: {
        type: String,
        required: 'Email address is required',
        unique: 'Email address must be unique',
        validate: { validator: isEmail , message: '{VALUE} is not a valid email' }
    },
    password: {
        type: String,
        required: 'Password is required',
    }
});

//validate user
UserSchema.statics.authenticate = function(email, password, callback) {
    User.findOne({emailAddress: email})
        .exec(function (err, user) {
            if (err){
                return callback(err);
            }
            //make sure user exists
            else if (!user){
                let err = new Error();
                err.message = 'No user found with that email';
                err.status = 401;
                return callback(err);
            }
            bcrypt.compare(password, user.password, function (err, result) {
                if (result === true){
                    return callback(null, user)
                } else{
                    return callback();
                }
            });
        });

};

// hash password before saving to database
UserSchema.pre('save', function(next) {
    let user = this;
    bcrypt.hash(user.password, 10, function(err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
    })
});



const User = mongoose.model('User', UserSchema);
module.exports = User;