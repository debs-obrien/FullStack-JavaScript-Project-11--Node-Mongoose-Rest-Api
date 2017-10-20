# Build a Course Rating API With Express
## Team Tree House FullStack Project 11
### Node, Express, Middleware, Mongo, Mongoose, Basic Auth, Mocha, Chai, JavaScript,


* Set up a database connection using Mongoose
* Create your Mongoose schema and models. 
* Seed your database with data. Use Mongoose seeder
* Create the user routes, GET, POST
* Create the course routes, GET, POST, PUT
* Update any POST and PUT routes to return Mongoose validation errors.
* Update the User model to store the user's password as a hashed value.
* Create an authentication method on the user model to return the user document based on their credentials
* Set up permissions to require users to be signed in
* Validation added to prevent a user from reviewing their own course
* Tests have been written for GET /api/users with and without credentials
* Use Mongoose deep population to return only the fullName of the related user on the course model and each review returned with the course model
* notified if any of the required fields in any given form have any missing data
* Include pagination for the loans and books listing pages
* Include search fields on at least one of the books or patrons listing pages

#### By Debbie O'Brien
20 October 2017


### To run the application
```npm
npm install
mongod
npm start
use Postman to test routes
the app is served on port 3000

For testing create db testDB
npm test
```

### Example Code
```javascript
/*---------------------------------------------------------------------
POST user - creates a new user
check to see if that user exists by checking email in form against database
use schema's `create` method to insert document into Mongo
if user doesnt add a full name or email we cant create a user
 ----------------------------------------------------------------------*/
router.post('/', function(req, res, next) {
    User.findOne({emailAddress:req.body.emailAddress})
        .exec(function(err, user){
            if(user){
                err = new Error();
                err.message = 'That email already exists';
                err.status = 400;
                return next(err);
            }else{
                User.create(req.body, function (err, user) {
                    if(!user.emailAddress || !user.fullName || !user.password){
                        err.status = 400;
                        return next(err);
                    }
                    if (err){
                        return next(err);
                    } else{
                        res.location('/');
                        res.status(201).json();
                    }

                });
            }
        });
});
```