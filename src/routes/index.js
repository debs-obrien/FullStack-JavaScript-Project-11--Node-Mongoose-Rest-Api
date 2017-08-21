const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'test' });


    const userData = {
        fullName: req.body.fullName,
        emailAddress: req.body.emailAddress,
        password: req.body.password,

    };
    const courseData = {
        user: userData.req.body.user,
        title: req.body.title,
        description: req.body.description,
        estimatedTime: req.body.estimatedTime,
        materialsNeeded: req.body.materialsNeeded,
        steps: req.body.steps,


    };

    // use schema's `create` method to insert document into Mongo
    User.create(userData, function (error, user) {
        if (error) {
            return next(error);
        }
    });
});

router.get('/api/users', function(req, res, next) {



});


module.exports = router;