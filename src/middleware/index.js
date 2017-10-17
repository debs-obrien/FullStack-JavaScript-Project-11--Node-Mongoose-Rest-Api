const auth = require('basic-auth');
const User = require('../models/user');

function requireSignIn(req, res, next){
    let credentials = auth(req);
    if(credentials){
        User.authenticate(credentials.name, credentials.pass, function(err, user) {
            if (err || !user) {
                let err = new Error();
                err.message = 'You must sign in';
                err.status = 401;
                return next(err);
            }else{
                res.locals.currentUser = user;
                console.log(user);
                return next();
            }

        });
    }else{
        let err = new Error('couldn\'t authenticate');
        next(err);
    }
}
module.exports.requireSignIn = requireSignIn;
