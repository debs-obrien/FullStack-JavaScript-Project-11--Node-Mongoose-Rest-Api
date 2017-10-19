const app = require('./src/');

const server = app.listen(app.get('port'), function() {
    console.log('Express server is listening on port ' + server.address().port);
});