const Order = require('../../models/Order');
const Item = require('../../models/Item');
const User = require('../../models/User');
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let server;
chai.use(chaiHttp);

describe('Orders', () => {

    beforeEach((done) => { //Before each test we empty the database
        server = require('../server');
        const promises = [
            Order.remove().exec(),
            User.remove().exec(),
            Item.remove().exec()
        ];

        Promise.all(promises)
            .then(function () {
                done();
            });
    });

    afterEach((done) => {
        server.close(() => {
            delete require.cache[require.resolve('../server')];
            done()
        })
    });

    describe('/GET all orders', function () {
        it('get all orders', (done) => {
            chai.request(server)
                .get('/orders/')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                })
        });
        it('orders not found', (done) => {
            chai.request(server)
                .get('/orders/not_found')
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                })
        });

    });

    describe('/POST order', () => {
        it('it should create an order', (done) => {
            let item = new Item({
                "name": "cake",
                "price": "30"
            });
            item.save((err, item) => {
                chai.request(server)
                    .get(`/items/${item.id}`);
            });
            let order = {
                "user_id": "5c94dec23cff774e3b319f58",
                "items": [{
                    "item_id": item.id,
                    "quantity": "1"
                }
                ]
            };
            chai.request(server)
                .post('/orders')
                .send(order)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

        it('it should not create order without user_id', (done) => {
            let order = {
                "items": [{
                    "item_id": "test_id",
                    "quantity": "1"
                }
                ]
            };
            chai.request(server)
                .post('/orders')
                .send(order)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
    });

    describe('/GET/:id order', () => {
        it('it should GET a order by the given id', (done) => {
            let item = new Item({
                "name": "cake",
                "price": "30"
            });
            item.save((err, item) => {
                chai.request(server)
                    .get(`/items/${item.id}`);
            });
            let order = new Order({
                "status": "Served",
                "user_id": "5c94dec23cff774e3b319f58",
                "items": [
                    {
                        "item": {
                            "item_id": item.id,
                        },
                        "quantity": 5
                    }
                ]
            });
            order.save((err, order) => {
                chai.request(server)
                    .get(`/orders/${order.id}`)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('user_id');
                        res.body.should.have.property('items');
                        res.body.should.have.property('_id').eql(order.id);
                        done();
                    });
            });

        });
    });

    describe('/PUT/:id order', () => {
        it('it should UPDATE an order given the id', (done) => {
            let item = new Item({
                "name": "cake",
                "price": "30"
            });
            item.save((err, item) => {
                chai.request(server)
                    .get(`/items/${item.id}`);
            });
            let order = new Order({
                "grand_total": "30",
                "status": "Served",
                "user_id": "5c94dec23cff774e3b319f58",
                "items": [
                    {
                        "item": {
                            "item_id": item.id,
                            "item_name": "cake",
                            "price": "30"
                        },
                        "quantity": 5
                    }
                ]
            });
            order.save((err, order) => {
                chai.request(server)
                    .put(`/orders/${order.id}`)
                    .send(order)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('user_id');
                        res.body.should.have.property('items');
                        res.body.should.have.property('_id').eql(order.id);
                        done();
                    });
            });

        });
    });

    describe('/DELETE/:id order', () => {
        it('it should DELETE an order given the id', (done) => {
            let item = new Item({
                "name": "cake",
                "price": "30"
            });
            item.save((err, item) => {
                chai.request(server)
                    .get(`/items/${item.id}`);
            });
            let order = new Order({
                "status": "Served",
                "user_id": "5c94dec23cff774e3b319f58",
                "items": [
                    {
                        "item": {
                            "item_id": item.id,
                        },
                        "quantity": 5
                    }
                ]
            });
            order.save((err, order) => {
                chai.request(server)
                    .delete(`/orders/${order.id}`)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('Order deleted successfully!');
                        done();
                    });
            });
        });
    });

    describe('/PUT/:id/items order', () => {
        it('it should add an item to given order', (done) => {
            let item = new Item({
                "name": "cake",
                "price": "30"
            });
            item.save((err, item) => {
                chai.request(server)
                    .get(`/items/${item.id}`);
            });
            let order = new Order({
                "grand_total": "30",
                "status": "Served",
                "user_id": "5c94dec23cff774e3b319f58",
                "items": [
                    {
                        "item": {
                            "item_id": item.id,
                            "item_name": "cake",
                            "price": "30"
                        },
                        "quantity": 5
                    }
                ]
            });
            let newItem =
                {
                    "item_id": item.id
                }
            ;
            order.save((err, order) => {
                chai.request(server)
                    .put(`/orders/${order.id}/items`)
                    .send(newItem)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('_id').eql(order.id);
                        done();
                    });
            });

        });
    });

    describe('/GET/user/:id order', () => {
        it('it should GET an order by user id', (done) => {
            let item = new Item({
                "name": "cake",
                "price": "30"
            });
            item.save((err, item) => {
                chai.request(server)
                    .get(`/items/${item.id}`);
            });
            let user = new User({
                "name": "new user",
                "email": "newuser@test.com",
                "password": "password"
            });
            user.save((err, user) => {
                chai.request(server)
                    .get(`/users/${user.id}`);
            });
            let order = new Order({
                "status": "Served",
                "user_id": user.id,
                "items": [
                    {
                        "item": {
                            "item_id": item.id,
                            "item_name": "cake",
                            "price": "30"
                        },
                        "quantity": 5
                    }
                ]
            });
            order.save((err, order) => {
                chai.request(server)
                    .get(`/orders/user/${user.id}`)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body[0].should.have.property('user_id');
                        res.body[0].should.have.property('items');
                        res.body[0].should.have.property('_id').eql(order.id);
                        done();
                    });
            });

        });
    });

});
