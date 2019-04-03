const User = require('../../models/User');
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let server;
chai.use(chaiHttp);

describe('Users', () => {

    beforeEach((done) => { //Before each test we empty the database
        server = require('../server');
        User.remove({}, (err) => {
            done();
        });
    });

    afterEach((done) => {
        server.close(() => {
            delete require.cache[require.resolve('../server')];
            done()
        })
    });

    describe('/GET all users', function () {

        it('get all users', (done) => {
            chai.request(server)
                .get('/users/')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                })
        });

        it('users not found', (done) => {
            chai.request(server)
                .get('/users/not/found')
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                })
        });

    });

    describe('/POST user', () => {
        it('it should create a user', (done) => {
            let user = {
                "name": "test user",
                "email": "testuser@test.com",
                "password": "password"
            };
            chai.request(server)
                .post('/users')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

        it('it should not create user without email', (done) => {
            let user = {
                "name": "new user"
            };
            chai.request(server)
                .post('/users')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
    });

    describe('/GET/:id user', () => {
        it('it should GET a user by the given id', (done) => {
            let user = new User({
                "name": "test user",
                "email": "testuser@test.com",
                "password": "password",
            });
            user.save((err, user) => {
                chai.request(server)
                    .get(`/users/${user.id}`)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('name');
                        res.body.should.have.property('email');
                        res.body.should.have.property('_id').eql(user.id);
                        done();
                    });
            });
        });
    });

    describe('/DELETE/:id user', () => {
        it('it should DELETE a user given the id', (done) => {
            let user = new User({
                "name": "test user",
                "email": "testuser@test.com",
                "password": "password",
            });
            user.save((err, user) => {
                chai.request(server)
                    .delete(`/users/${user.id}`)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('User deleted successfully!');
                        done();
                    });
            });
        });
    });
});
