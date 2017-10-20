const request = require('supertest');
const expect = require('chai').expect;
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const seeder = require('mongoose-seeder'),
    data = require('../src/data/data.json');
const app = require('../src/');
require('colors');

describe('[ -- Users Route -- ]'.yellow, function(){
    this.timeout(20000);
    before(function (done) {

        const db = mongoose.connect('mongodb://localhost:27017/testDB', {
            useMongoClient: true
        });
        db.on('error', function(err){
            console.error('connection error:', err);
            done();
        });

        db.once('open', function() {
            console.log('test db connected');
            //get seeded data

            seeder.seed(data).then(function(dbData) {
                // The database objects are stored in dbData
                console.log('test data seeded');
                done();
            }).catch(function(err) {
                console.log(err);
                done();
            });
        });
    });

    it('should get all users', function(done){
        this.timeout(20000);
        request(app)
            .get('/api/users')
            .set('Accept', 'application/json')
            .set('Authorization', 'Basic am9lQHNtaXRoLmNvbTpwYXNzd29yZA==')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, resp){
                expect(resp.body._id).to.equal("57029ed4795118be119cc437");
                done();
            })

    });
    it('should return error when not authorized', function(done){
        this.timeout(20000);
        request(app)
            .get('/api/users')
            .set('Accept', 'application/json')
            .set('Authorization', '')
            .expect('Content-Type', /json/)
            .expect(400)
            .end(function(err, resp){
                expect(resp.body.status).to.equal(401);
                expect(resp.body.message).to.equal('You are not authorized, you must sign in');
                done();
            })

    });

});