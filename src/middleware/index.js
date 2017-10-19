const auth = require('basic-auth');
const User = require('../models/user');

/*---------------------------------------------------------------------
middleware to check for sign in
basic auth uses name and pass to test credentials credentials
check if error or if user exists in database if (err || !user)
 ----------------------------------------------------------------------*/
function requireSignIn(req, res, next){
    const credentials = auth(req);
    if(credentials){
        User.authenticate(credentials.name, credentials.pass, function (err, user) {
            if (err || !user) {
                let err = new Error();
                err.message = 'No user found with those credentials';
                err.status = 401;
                return next(err);
            } else {
                req.LoggedInUser = user;
                next();
            }
        });

    }else {
        let err = new Error();
        err.message = 'You are not authorized, you must sign in';
        err.status = 401;
        return next(err);
    }
}
module.exports.requireSignIn = requireSignIn;