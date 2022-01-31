const chai = require('chai');
const chaiHttp = require('chai-http');
// const httpServer = process.env.API || "http://localhost:8080/";
const httpServer = require('../../server');
const expect = chai.expect;

chai.use(chaiHttp);

beforeEach(() => {

});

afterEach(() => {

});

describe("#updateTicket()", () => {
    context('Without arguments and when user is not logged in', () => {
        it("Should return an error (403 | Forbidden)", (done) => {
            // Trying to update ticket
            chai.request(httpServer)
            .post('/api/ticket')
            .end((err, res) => {
                expect(res.status).to.equal(403);
                done();
            });
        });
    });
    context('Without arguments and user is logged in', () => {
        it("Should return an error (400 | Bad Request)", (done) => {
            let response;
            const credentials = {
                user: {
                    email: 'bm.mhoma@gmail.com',
                    password: 'benbenben',
                },
            };

            // Signing in
            chai.request(httpServer)
            .post('/api/auth/signin-local')
            .set('content-type', 'application/json')
            .send(credentials)
            .end((err, res) => {
                expect(res.body).to.be.a("object");
                expect(res.body).to.have.property('accessToken');
                expect(res.body).to.have.property('user');
                expect(res.body.user).to.be.a('object');
                expect(res.body.user).to.have.property('id').to.be.a('number');
                expect(res.body.user).to.have.property('firstname').to.be.a('string');
                expect(res.body.user).to.have.property('lastname').to.be.a('string');
                expect(res.body.user).to.have.property('birthdate').with.lengthOf(10);
                expect(res.body.user).to.have.property('email').to.be.a('string');
                expect(res.body.user).to.have.property('address');
                expect(res.body.user).to.have.property('postcode');
                expect(res.body.user).to.have.property('city');
                expect(res.status).to.equal(200);

                response = res.body;

                // Trying to update ticket
                chai.request(httpServer)
                .post('/api/ticket')
                .set('x-access-token', response.accessToken)
                .end((err, res) => {
                    expect(res.body).to.have.property('successful');
                    expect(res.body.successful).to.equal(false);
                    expect(res.status).to.equal(400);
                    done();
                });
            });
        });
    });
    context('With a nonexistent ticket and user is logged in', () => {
        it("Should return an error (404 | Not Found)", (done) => {
            let response;
            const credentials = {
                user: {
                    email: 'bm.mhoma@gmail.com',
                    password: 'benbenben',
                },
            };

            // Signing in
            chai.request(httpServer)
            .post('/api/auth/signin-local')
            .set('content-type', 'application/json')
            .send(credentials)
            .end((err, res) => {
                expect(res.body).to.be.a("object");
                expect(res.body).to.have.property('accessToken');
                expect(res.body).to.have.property('user');
                expect(res.body.user).to.be.a('object');
                expect(res.body.user).to.have.property('id').to.be.a('number');
                expect(res.body.user).to.have.property('firstname').to.be.a('string');
                expect(res.body.user).to.have.property('lastname').to.be.a('string');
                expect(res.body.user).to.have.property('birthdate').with.lengthOf(10);
                expect(res.body.user).to.have.property('email').to.be.a('string');
                expect(res.body.user).to.have.property('address');
                expect(res.body.user).to.have.property('postcode');
                expect(res.body.user).to.have.property('city');
                expect(res.status).to.equal(200);

                response = res.body;
                
                // Trying to update ticket
                chai.request(httpServer)
                .put('/api/ticket')
                .set('x-access-token', response.accessToken)
                .send({ number: "xxx" })
                .end((err, res) => {
                    expect(res.status).to.equal(404);
                    expect(res.body.message).to.equal('nonexistent_ticket');
                    done();
                });
            });
        });
    });
    context('With an already used ticket and user is logged in', () => {
        it("Should return an error (403 | Unauthorized)", (done) => {
            let response;
            let accessToken;
            const credentials = {
                user: {
                    email: 'bm.mhoma@gmail.com',
                    password: 'benbenben',
                },
            };

            // Signing in
            chai.request(httpServer)
            .post('/api/auth/signin-local')
            .set('content-type', 'application/json')
            .send(credentials)
            .end((err, res) => {
                expect(res.body).to.be.a("object");
                expect(res.body).to.have.property('accessToken');
                expect(res.body).to.have.property('user');
                expect(res.body.user).to.be.a('object');
                expect(res.body.user).to.have.property('id').to.be.a('number');
                expect(res.body.user).to.have.property('firstname').to.be.a('string');
                expect(res.body.user).to.have.property('lastname').to.be.a('string');
                expect(res.body.user).to.have.property('birthdate').with.lengthOf(10);
                expect(res.body.user).to.have.property('email').to.be.a('string');
                expect(res.body.user).to.have.property('address');
                expect(res.body.user).to.have.property('postcode');
                expect(res.body.user).to.have.property('city');
                expect(res.status).to.equal(200);

                response = res.body;
                accessToken = response.accessToken;

                // Getting a random used ticket
                chai.request(httpServer)
                .get('/api/ticket?rand=1&userid=1&id=0')
                .set('x-access-token', accessToken)
                .end((err, res) => {
                    expect(res.body).to.have.property('ticket');
                    expect(res.body.ticket).to.be.a('object');
                    expect(res.body.ticket).to.have.property('id');
                    expect(res.body.ticket.id).to.be.a('number');
                    expect(res.body.ticket).to.have.property('number');
                    expect(res.body.ticket.number).to.be.a('string');
                    expect(res.body.ticket).to.have.property('prize');
                    expect(res.body.ticket.prize).to.be.a('string');
                    expect(res.body.ticket).to.have.property('printed');
                    expect(res.body.ticket.printed).to.be.true;
                    
                    expect(res.body.ticket).to.have.property('user');
                    expect(res.body.ticket.user).to.be.a('object');
                    expect(res.body.ticket.user).to.have.property('id').to.be.a('number');
                    expect(res.body.ticket.user).to.have.property('firstname').to.be.a('string');
                    expect(res.body.ticket.user).to.have.property('lastname').to.be.a('string');
                    expect(res.body.ticket.user).to.have.property('birthdate').to.be.a('string').with.lengthOf(10);
                    expect(res.body.ticket.user).to.have.property('email').to.be.a('string');
                    expect(res.body.ticket.user).to.have.property('address');
                    expect(res.body.ticket.user).to.have.property('postcode');
                    expect(res.body.ticket.user).to.have.property('city');

                    expect(res.body).to.have.property('successful');
                    expect(res.body.successful).to.be.true;
                    expect(res.status).to.equal(200);

                    response = res.body;

                    // Trying to update a ticket
                    chai.request(httpServer)
                    .put('/api/ticket')
                    .set('x-access-token', accessToken)
                    .send({ number: response.ticket.number })
                    .end((err, res) => {
                        expect(res.status).to.equal(403);
                        expect(res.body).to.be.a('object');
                        expect(res.body.message).to.equal('ticket_already_used');
                        done();
                    });
                });
            });
        });
    });
    context('With a non-printed ticket and user is logged in', () => {
        it("Should return an error (403 | Unauthorized)", (done) => {
            let response;
            let accessToken;
            const credentials = {
                user: {
                    email: 'bm.mhoma@gmail.com',
                    password: 'benbenben',
                },
            };

            // Signing in
            chai.request(httpServer)
            .post('/api/auth/signin-local')
            .set('content-type', 'application/json')
            .send(credentials)
            .end((err, res) => {
                expect(res.body).to.be.a("object");
                expect(res.body).to.have.property('accessToken');
                expect(res.body).to.have.property('user');
                expect(res.body.user).to.be.a('object');
                expect(res.body.user).to.have.property('id').to.be.a('number');
                expect(res.body.user).to.have.property('firstname').to.be.a('string');
                expect(res.body.user).to.have.property('lastname').to.be.a('string');
                expect(res.body.user).to.have.property('birthdate').to.be.a('string').with.lengthOf(10);
                expect(res.body.user).to.have.property('email').to.be.a('string');
                expect(res.body.user).to.have.property('address');
                expect(res.body.user).to.have.property('postcode');
                expect(res.body.user).to.have.property('city');
                expect(res.status).to.equal(200);

                response = res.body;
                accessToken = response.accessToken;

                // Getting a random non printed ticket
                chai.request(httpServer)
                .get('/api/ticket?rand=1&userid=0&id=0&printed=0')
                .set('x-access-token', accessToken)
                .end((err, res) => {
                    expect(res.body).to.have.property('ticket');
                    expect(res.body.ticket).to.be.a('object');
                    expect(res.body.ticket).to.have.property('id');
                    expect(res.body.ticket.id).to.be.a('number');
                    expect(res.body.ticket).to.have.property('number');
                    expect(res.body.ticket.number).to.be.a('string');
                    expect(res.body.ticket).to.have.property('prize');
                    expect(res.body.ticket.prize).to.be.a('string');
                    expect(res.body.ticket).to.have.property('printed');
                    expect(res.body.ticket.printed).to.be.false;

                    expect(res.body).to.have.property('successful');
                    expect(res.body.successful).to.be.true;
                    expect(res.status).to.equal(200);
                    
                    response = res.body;

                    // Trying to update a non-printed ticket
                    chai.request(httpServer)
                    .put('/api/ticket')
                    .set('x-access-token', accessToken)
                    .send({ number: response.ticket.number })
                    .end((err, res) => {
                        expect(res.status).to.equal(403);
                        expect(res.body).to.be.a('object');
                        expect(res.body.message).to.equal('ticket_not_printed');
                        done();
                    });
                });
            });
        });
    });

    context('With a valid ticket, printed, not used, and user is logged in', () => {
        it("Should return a successful response (200)", (done) => {
            let response;
            let accessToken;
            const credentials = {
                user: {
                    email: 'bm.mhoma@gmail.com',
                    password: 'benbenben',
                },
            };

            // Signing in
            chai.request(httpServer)
            .post('/api/auth/signin-local')
            .set('content-type', 'application/json')
            .send(credentials)
            .end((err, res) => {
                expect(res.body).to.be.a("object");
                expect(res.body).to.have.property('accessToken');
                expect(res.body).to.have.property('user');
                expect(res.body.user).to.be.a('object');
                expect(res.body.user).to.have.property('id').to.be.a('number');
                expect(res.body.user).to.have.property('firstname').to.be.a('string');
                expect(res.body.user).to.have.property('lastname').to.be.a('string');
                expect(res.body.user).to.have.property('birthdate').with.lengthOf(10);
                expect(res.body.user).to.have.property('email').to.be.a('string');
                expect(res.body.user).to.have.property('address');
                expect(res.body.user).to.have.property('postcode');
                expect(res.body.user).to.have.property('city');
                expect(res.status).to.equal(200);

                response = res.body;
                accessToken = response.accessToken;

                // Getting a random valid printed ticket
                chai.request(httpServer)
                .get('/api/ticket?rand=1&userid=0&id=0&printed=1')
                .set('x-access-token', accessToken)
                .end((err, res) => {
                    expect(res.body).to.have.property('ticket');
                    expect(res.body.ticket).to.be.a('object');
                    expect(res.body.ticket).to.have.property('id');
                    expect(res.body.ticket.id).to.be.a('number');
                    expect(res.body.ticket).to.have.property('number');
                    expect(res.body.ticket.number).to.be.a('string');
                    expect(res.body.ticket).to.have.property('prize');
                    expect(res.body.ticket.prize).to.be.a('string');
                    expect(res.body.ticket).to.have.property('printed');
                    expect(res.body.ticket.printed).to.be.true;

                    expect(res.body).to.have.property('successful');
                    expect(res.body.successful).to.be.true;
                    expect(res.status).to.equal(200);

                    response = res.body;

                    // Trying to update valid printed ticket
                    chai.request(httpServer)
                    .put('/api/ticket')
                    .set('x-access-token', accessToken)
                    .send({ number: response.ticket.number })
                    .end((err, res) => {
                        expect(res.body).to.have.property('successful');
                        expect(res.body.successful).to.be.true;
                        expect(res.status).to.equal(200);
                        done();
                    });
                });
            });
        });
    });
});

describe('#printTicket()', () => {
    context('Print randomly a ticket', () => {
        it("Should return a successful response (200)", (done) => {
            let response;
            let accessToken;
            const credentials = {
                user: {
                    email: 'bm.mhoma@gmail.com',
                    password: 'benbenben',
                },
            };

            // Signing in
            chai.request(httpServer)
            .post('/api/auth/signin-local')
            .set('content-type', 'application/json')
            .send(credentials)
            .end((err, res) => {
                expect(res.body).to.be.a("object");
                expect(res.body).to.have.property('accessToken');
                expect(res.body).to.have.property('user');
                expect(res.body.user).to.be.a('object');
                expect(res.body.user).to.have.property('id').to.be.a('number');
                expect(res.body.user).to.have.property('firstname').to.be.a('string');
                expect(res.body.user).to.have.property('lastname').to.be.a('string');
                expect(res.body.user).to.have.property('birthdate').with.lengthOf(10);
                expect(res.body.user).to.have.property('email').to.be.a('string');
                expect(res.body.user).to.have.property('address');
                expect(res.body.user).to.have.property('postcode');
                expect(res.body.user).to.have.property('city');
                expect(res.status).to.equal(200);

                response = res.body;
                accessToken = response.accessToken;

                // Trying to print ticket
                chai.request(httpServer)
                .post('/api/ticket/print')
                .set('x-access-token', accessToken)
                .end((err, res) => {
                    expect(res.body).to.have.property('ticket');
                    expect(res.body.ticket).to.have.property('id');
                    expect(res.body.ticket.id).to.be.a('number');
                    expect(res.body.ticket).to.have.property('number');
                    expect(res.body.ticket.number).to.be.a('string');
                    expect(res.body.ticket).to.have.property('prize');
                    expect(res.body.ticket.prize).to.be.a('string');
                    expect(res.body.ticket).to.have.property('printed');
                    expect(res.body.ticket.printed).to.be.true;
                    expect(res.body.ticket).to.have.property('userId');
                    expect(res.body.ticket.userId).to.be.null;

                    expect(res.body).to.have.property('successful');
                    expect(res.body.successful).to.be.true;

                    expect(res.status).to.equal(200);
                    done();
                });
            });
        });
    });
});