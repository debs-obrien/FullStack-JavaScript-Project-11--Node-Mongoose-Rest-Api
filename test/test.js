const request = require('supertest');
const expect = require('chai').expect;
const mongoose = require('mongoose');
const seeder = require('mongoose-seeder'),
    data = require('../src/data/data.json');
const users = require('../src/routes/users');
const app = require('../src/index');
require('colors');

describe('[ -- Users Route -- ]'.yellow, function(){
    before(function (done) {

        const db = mongoose.connect('mongodb://localhost:27017/testDB', {
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
        done();

    });

    it('should get all users', function(done){
        request(app)
            .get('api/users')
            .set('Accept', 'application/json')
            .set('Authorization', 'Basic am9lQHNtaXRoLmNvbTpwYXNzd29yZA==')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res){
                console.log(res)
                expect(res._id).to.be("57029ed4795118be119cc437");
                done();
            })

    });
    it('should return error when not authorized', function(done){
        request(app)
            .get('api/users')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .end(function(err, res){
                expect(err.status).to.be(401);
                expect(err.message).to.be('You are not authorized, you must sign in');
                done();
            })

    });
    it('should create a user', function(done){
        request(app)
            .post('api/users')
            .send({
                "fullName": "John Smith",
                "emailAddress": "john@smith.com",
                "password": "password",
                "confirmPassword": "password"
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end(function(err, resp){
                let user = resp.body;
                expect(user.fullName).to.be('John Smith');
                expect(user.emailAddress).to.be('john@smith.com');
                expect(user.password).to.be('password');
                expect(user.confirmPassword).to.be('confirmPassword');
                done();
            })
    });
    it('should check if passwords are matching', function(done){
        request(app)
            .post('api/users')
            .send({
                "fullName": "John Smith",
                "emailAddress": "john@smith.com",
                "password": "password",
                "confirmPassword": "password"
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end(function(err, resp){
                let user = resp.body;
                expect(user.password).to.be(user.confirmPassword);
                done();
            })
    });
    it('should update a user', function(done){
        request(app)
            .post('api/users')
            .send({
                "fullName": "John Smith",
                "emailAddress": "john@smith.com",
                "password": "password",
                "confirmPassword": "password"
            })
            .set('Accept', 'application/json')
            .end(function(err, resp){
                let user = resp.body;
                request(app)
                    .put('/api/users/' + user._id)
                    .send({
                        fullName : 'New Name'
                    })
                    .end(function(err, resp){
                        console.log(resp.body.fullName)
                        expect(resp.body.fullName).to.equal('New Name');
                        done();
                    });
            })
    });
});