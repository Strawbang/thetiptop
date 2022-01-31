const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
// const httpServer = process.env.API || "../../server";
const httpServer = require('../../server');
chai.use(chaiHttp);

const path = require('path');
const db = require('../../config/models/modelAssociation');
require('dotenv').config({ path: path.join(__dirname, '../../../.env') });
const Seed = require('../../config/seeders');

before(async () => {
    await db.sequelize.sync({ force: true })
    .then(() => Seed())
    .catch((e) => {
        console.log(e);
    });
});

beforeEach(() => {

});

afterEach(() => {

});

describe("#signup()", () => {
    context('Without arguments', () => {
        it("Should return an error (500 | Internal Server Error).", (done) => {
            // Trying to sign up
            chai.request(httpServer)
            .post('/api/auth/signup-local')
            .end((err, res) => {
                expect(res.status).to.equal(500);
                done();
            });
        });
    })
    context('With an email used in database.', () => {
        it("Should return an error (400 | Bad Request).", (done) => {
            const body = {
                user: {
                    firstname: "Client",
                    lastname: "Client",
                    newsletter: false,
                    birthdate: "2002-12-11",
                    email: "bm.mhoma@gmail.com",
                    password: "benbenben",
                },
            };

            // Trying to sign up
            chai.request(httpServer)
            .post('/api/auth/signup-local')
            .set('content-type', 'application/json')
            .send(body)
            .end((err, res) => {
                expect(res.body).to.be.a('object');
                expect(res.body.successful).to.equal(false);
                expect(res.body.status).to.equal("email_already_used");
                expect(res.status).to.equal(400);
                done();
            });
        });
    });
    context('With a too short password.', () => {
        it("Should return an error. (400 | Bad Request)", (done) => {
            const body = {
                user: {
                    firstname: "Jean-Charles",
                    lastname: "Sabatier",
                    newsletter: false,
                    birthdate: "2002-12-11",
                    email: "tooshort@gmail.com",
                    password: "benb",
                },
            };

            // Trying to sign up
            chai.request(httpServer)
            .post('/api/auth/signup-local')
            .set('content-type', 'application/json')
            .send(body)
            .end((err, res) => {
                expect(res.body).to.be.a("object");
                expect(res.body.error).to.be.a("object");
                expect(res.body.error.status).to.equal("password_too_short");
                expect(res.body.successful).to.equal(false);
                expect(res.status).to.equal(400);
                done();
            });
        });
    });
    context('With a too recent birthdate (underage).', () => {
        it("Should return an error (400 | Bad Request).", (done) => {
            const recentBirthdate = new Date().getFullYear();
            const body = {
                user: {
                    firstname: "Kevin",
                    lastname: "Mineur",
                    newsletter: false,
                    birthdate: recentBirthdate + "-12-11",
                    email: "underage@gmail.com",
                    password: "benbenben",
                },
            };

            // Trying to sign up
            chai.request(httpServer)
            .post('/api/auth/signup-local')
            .set('content-type', 'application/json')
            .send(body)
            .end((err, res) => {
                expect(res.body).to.be.a('object');
                expect(res.body.error).to.be.a('object');
                expect(res.body.error.status).to.equal('user_not_adult');
                expect(res.body.successful).to.equal(false);
                expect(res.status).to.equal(400);
                done();
            });
        });
    });
    context('With valid data.', () => {
        it("Should return a successful response (200)", (done) => {
            const body = {
                user: {
                    firstname: "The",
                    lastname: "TipTop",
                    newsletter: false,
                    birthdate: "2000-12-11",
                    email: "thetiptop.obdn@gmail.com",
                    password: "benbenben",
                },
            };

            // Trying to sign up
            chai.request(httpServer)
            .post('/api/auth/signup-local')
            .set('content-type', 'application/json')
            .send(body)
            .end((err, res) => {
                expect(res.body).to.be.a('object');
                expect(res.body.successful).to.equal(true);
                expect(res.body).to.have.property('userId');
                expect(res.status).to.equal(200);
                done();
            });
        });
    }); 
});

describe("#signin()", () => {
    context('Without arguments', () => {
        it("Should return an error (500 | Internal Server Error).", (done) => {
            
            // Trying to sign in
            chai.request(httpServer)
            .post('/api/auth/signin-local')
            .end((err, res) => {
                expect(res.status).to.equal(500);
                done();
            });
        });
    });
    context('With nonexistent credentials', () => {
        it("Should return an error (404 | Not Found).", (done) => {
            const body = {
                user: {
                    email: 'aragorn@mordor.com',
                    password: 'filsde',
                },
            };

            // Trying to sign in
            chai.request(httpServer)
            .post('/api/auth/signin-local')
            .set('content-type', 'application/json')
            .send(body)
            .end((err, res) => {
                expect(res.body).to.be.a("object");
                expect(res.body.successful).to.equal(false);
                expect(res.body.error).to.equal("user_not_found");
                expect(res.status).to.equal(404);
                done();
            });
        });
    });
    context('With wrong credentials', () => {
        it("Should return an error (401 | Unauthorized).", (done) => {
            const body = {
                user: {
                    email: 'bm.mhoma@gmail.com',
                    password: 'ban',
                },
            };

            // Trying to signin
            chai.request(httpServer)
            .post('/api/auth/signin-local')
            .set('content-type', 'application/json')
            .send(body)
            .end((err, res) => {
                expect(res.body).to.be.a("object");
                expect(res.body.successful).to.equal(false);
                expect(res.body.error).to.equal("invalid_credentials");
                expect(res.status).to.equal(401);
                done();
            });
        });
    });
    context('With an inactive account', () => {
        it("Should return an error (401 | Unauthorized).", (done) => {
            const body = {
                user: {
                    email: 'inactive@gmail.com',
                    password: 'benbenben',
                },
            };

            // Trying to sign in
            chai.request(httpServer)
            .post('/api/auth/signin-local')
            .set('content-type', 'application/json')
            .send(body)
            .end((err, res) => {
                expect(res.body).to.be.a("object");
                expect(res.body.successful).to.equal(false);
                expect(res.body.error).to.equal("inactive_user");
                expect(res.status).to.equal(401);
                done();
            });
        });
    });
    context('With valid credentials and active account', () => {
        it("Should return a successful response (200), an access token, and an user object.", (done) => {
            const user = {
                user: {
                    email: 'bm.mhoma@gmail.com',
                    password: 'benbenben',
                },
            };

            // Trying to sign in
            chai.request(httpServer)
            .post('/api/auth/signin-local')
            .set('content-type', 'application/json')
            .send(user)
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
                expect(res.status).to.equal(200)
                done();
            });
        });
    });
});
