import request from "supertest";
import app from "../src/app";

const chai = require("chai");
const expect = chai.expect;

const SSN_WITHOUT_KEYWORDS = "Hello 123-45-6789 this is a nice num";
const SSN_WITH_KEYWORDS = "The number 123-45-6789 represents an SSN in this string";
// const SSN_MATCHER = patterns['SSN'];


describe("POST /scanner", () => {
    it("should return false from scanner - no SSN keywords", (done) => {
        request(app).post("/scanner")
            .send(SSN_WITHOUT_KEYWORDS)
            .end((err, res) => {
                expect(res.error).to.be.false;
                done();
            })
            .expect(302);

    });

    it("SSN with keywords so should match", (done) => {
        request(app).post("/scanner")
            .send(SSN_WITH_KEYWORDS)
            .end((err, res) => {
                expect(res.error).to.be.false;
                done();
            })
            .expect(302);
    });

});