let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");
let should = chai.should();
let request = require("supertest");
let session_post = request.agent(server);

chai.use(chaiHttp);

describe("Images", () => {
  describe("/GET images", () => {
    it("it should return all images in an array format", (done) => {
      session_post
        .get("/images")
        .set("content-type", "application/x-www-form-urlencoded")
        .expect("Content-Type", /json/)
        .expect(200)
        .end(function (err, res) {
          res.body.should.be.a("array");
          done();
        });
    });
  });

  describe("/POST images/create", () => {
    it("it should return unauthorized if the user doesn't provide JWT", (done) => {
      session_post
        .get("/images/create")
        .set("content-type", "application/x-www-form-urlencoded")
        .expect("Content-Type", /json/)
        .expect(200)
        .end(function (err, res) {
          done();
        });
    });
  });

  describe("/POST images/create authorized", () => {
    // login a user
    // use bearer token to upload an image
    // see if image get updates
  });

});
