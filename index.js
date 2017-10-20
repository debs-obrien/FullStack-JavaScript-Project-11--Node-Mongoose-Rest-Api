const app = require('./src/');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const seeder = require('mongoose-seeder'),
    data = require('./src/data/data.json');


//set up database
const db = mongoose.connect('mongodb://localhost:27017/courseRating', {
    useMongoClient: true
});

db.on('error', function(err){
    console.error('connection error:', err)
});

db.once('open', function() {
    console.log('db connected');
    //get seeded data


    seeder.seed(data, {}, () => {
        console.log('data seeded')
    }).then(function(dbData) {
        // The database objects are stored in dbData
    }).catch(function(err) {
        console.log(err);
    });
});

// view engine setup we don't have views so not needed for now
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'pug');

// set our port
app.set('port', process.env.PORT || 5000);

const server = app.listen(app.get('port'), function() {
    console.log('Express server is listening on port ' + server.address().port);
});