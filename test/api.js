process.env.NODE_ENV = 'test';
process.env.PORT = 8888;

var db = require("../app/models");

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('API', () => {
    before((done) => { //Before each test we empty the database
        db.comments.truncate();
        db.comments.create({City: "Irvine", Comment: "Pre-test comment"})
        done();        
    });

    describe('Search city', () => {
        it('should GET details on the existing city and covered ZIP codes', (done) => {
            chai.request(server)
                .get('/api/city?city=Irvine')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    res.body.should.have.property('city').that.include.keys('City', 'Population', 'violent_crimes', 'property_crimes');
                    res.body.should.have.property('zips').that.is.an('array').that.is.not.empty;
                    done();
                });
        });

        it('should GET no details on non-existing city', (done) => {
            chai.request(server)
                .get('/api/city?city=Not+Irvine')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    res.body.should.have.property('city', null);
                    res.body.should.have.property('zips').that.is.empty;
                    done();
                });
        });
    });

    describe('Read comments', () => {
        it('should GET comments for the existing city', (done) => {
            chai.request(server)
                .get('/api/comments?city=Irvine')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    res.body.should.have.property('comments').that.is.an('array').that.has.lengthOf(1);
                    res.body.should.have.nested.property('comments[0]').that.include.keys('City', 'Comment', 'createdAt');
                    done();
                });
        });

        it('should GET no comments for non-existing city', (done) => {
            chai.request(server)
                .get('/api/comments?city=Not+Irvine')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    res.body.should.have.property('comments').that.is.an('array').that.is.empty;
                    done();
                });
        });
    });

    describe('Add comments', () => {
        it('should POST comment for the existing city, then GET it on top', (done) => {
            var testServer = chai.request(server);
            testServer
                .post('/api/comments')
                .send({city: "Irvine", comment: "Test comment"})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('object').that.has.property('message', 'OK');

                    testServer
                    .get('/api/comments?city=Irvine')
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.an('object');
                        res.body.should.have.property('comments').that.is.an('array').that.has.lengthOf(2);
                        res.body.should.have.nested.property('comments[0]').that.include({City: "Irvine", Comment: "Test comment"});
                        done();
                    });
    
                });
        });
    });
});
