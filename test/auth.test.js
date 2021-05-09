let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");
let should = chai.should();
let request = require("supertest");
let session = request.agent(server);
let uuid = require("uuid");

chai.use(chaiHttp);

describe("Users", () => {
  describe("/POST /auth/login", () => {
    it("it should POST failed authorization", (done) => {
      session
        .post("/auth/login")
        .set("content-type", "application/x-www-form-urlencoded")
        .send({ username: "username", password: "password" }) // test user
        .expect("Content-Type", /json/)
        .expect(400)
        .end(function (err, res) {
          res.should.have.status(400);
          done();
        });
    });
  });

  describe("Auth login workflow", () => {
    const currentTimeStamp = new Date().getTime();
    const email = currentTimeStamp + "@test.com";
    const password = currentTimeStamp + "password";
    it("/POST /auth/register - should register the user", (done) => {
      session
        .post("/auth/register")
        .set("content-type", "application/x-www-form-urlencoded")
        .send({
          email: email,
          password: password,
        })
        .expect("Content-Type", /json/)
        .expect(200)
        .end(function (err, res) {
          res.should.have.status(200);
          res.body.email.should.equal(email);
          done();
        });
    });
    let token = "";
    it("/POST /auth/login - should login the user", (done) => {
      session
        .post("/auth/login")
        .set("content-type", "application/x-www-form-urlencoded")
        .send({ email: email, password: password }) // test user
        .expect("Content-Type", /json/)
        .expect(200)
        .end(function (err, res) {
          res.should.have.status(200);
          res.body.status.should.equal("Successful");
          token = res.body.token;
          done();
        });
    });
    it("/GET /auth/status - should GET successful authorization", (done) => {
      session
        .get("/auth/status")
        .set({'Authorization': "Bearer " + token})
        .end((err, res) => {
          res.should.have.status(200);
          res.body.email.should.equal(email);
          done();
        });
    });
  });

  // TODO use a mock API
  describe("/POST /auth/register", () => {
    it("it should register the user", (done) => {
      const random = uuid.v4();
      session
        .post("/auth/register")
        .set("content-type", "application/x-www-form-urlencoded")
        .send({
          email: random + "@user.com",
          password: uuid.v4(),
        })
        .expect("Content-Type", /json/)
        .expect(200)
        .end(function (err, res) {
          res.body.email.should.equal(random + "@user.com");
          done();
        });
    });
  });
});
