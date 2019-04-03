const Item = require('../../models/Item');
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let server;
chai.use(chaiHttp);

describe('Items', () => {

    beforeEach((done) => { //Before each test we empty the database
        server = require('../server');
        Item.remove({}, (err) => {
            done();
        });
    });

    afterEach((done) => {
        // delete require.cache[require.resolve('../server')];
        // done();

        server.close(() => {
            delete require.cache[require.resolve('../server')];
            done()
        })
    });

    describe('/GET all items', function () {

        it('get all items', (done) => {
            chai.request(server)
                .get('/items/')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                })
        });

        it('items not found', (done) => {
            chai.request(server)
                .get('/items/not_found')
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                })
        });

    });

    describe('/POST item', () => {
        it('it should create an item', (done) => {
            let item = {
                "name": "apple",
                "price": "30"
            };

            chai.request(server)
                .post('/items')
                .send(item)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

        it('it should not create item without price', (done) => {
            let item = {
                "name": "apple"
            };

            chai.request(server)
                .post('/items')
                .send(item)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
    });

    describe('/GET/:id item', () => {
        it('it should GET a item by the given id', (done) => {
            let item = new Item({
                "name": "cake",
                "price": "30"
            });
            item.save((err, item) => {
                chai.request(server)
                    .get(`/items/${item.id}`)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('name');
                        res.body.should.have.property('price');
                        res.body.should.have.property('_id').eql(item.id);
                        done();
                    });
            });

        });
    });

    describe('/PUT/:id item', () => {
        it('it should UPDATE an item given the id', (done) => {
            let item = new Item({
                "name": "cake",
                "price": "50"
            });
            item.save((err, item) => {
                chai.request(server)
                    .put(`/items/${item.id}`)
                    .send(item)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('name');
                        res.body.should.have.property('price');
                        res.body.should.have.property('_id').eql(item.id);
                        done();
                    });
            });
        });
    });

    describe('/DELETE/:id item', () => {
        it('it should DELETE an item given the id', (done) => {
            let item = new Item({
                "name": "cake",
                "price": "50"
            });
            item.save((err, book) => {
                chai.request(server)
                    .delete(`/items/${item.id}`)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('Item deleted successfully!');
                        done();
                    });
            });
        });
    });
});
