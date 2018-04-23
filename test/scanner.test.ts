import request from "supertest";
import app from "../src/app";
import {scan} from "../src/controllers/scanner.ctrl";
import {Detection} from "../src/models/detection";
import {Scanner} from "../src/services/scanner";

const chai = require("chai");
const assert = chai.assert;

const SSN_WITHOUT_KEYWORDS = "Hello 123-45-6789 this is a nice num";
const SSN_WITH_KEYWORDS = "The number 123-45-6789 represents an SSN in this string";
const SSN_WITH_KEYWORDS_NO_SSN = "My Soc Sec is private so not printing it here";
const IBAN_INVALID = "The IBAN IL12 0000 9999 8888 7777 is invalid!";
const IBAN_VALID1 = "The IBAN DE44 5001 0517 5407 3249 31 is ok";
const CC_WITHOUT_KEYWORDS = "The number 4580 2837 4885 0202 is just a number, we don't know what it represents";
const CC_WITH_KEYWORDS = "The number 4012 8888 8888 1881 is my very own secret credit card.";
const CC_WITH_KEYWORDS_BR = "O número 4012 8888 8888 1881 é meu cartão de crédito secreto";
const CC_WITH_KEYWORDS_NO_CC = "My secret credit card number is really secret, not printing it here";
const CC_WITH_KEYWORDS_INVALID_CC = "The number 1234 5678 9000 0000 is an invalid credit card number.";


// const SSN_MATCHER = patterns['SSN'];


describe("scan() tests", () => {
    it("should return no results from scanner - no SSN keywords", (done) => {
        const results: Detection[] = new Scanner().scan(SSN_WITHOUT_KEYWORDS);
        assert(results.length === 0);
        done();
    });

    it("should return some results from scanner - has SSN keywords", (done) => {
        const results: Detection[] = new Scanner().scan(SSN_WITH_KEYWORDS);
        assert(results.length > 0 && results[0].name === "SSN");
        done();
    });

    it("should return no results from scanner - has SSN keywords but no SSN", (done) => {
        const results: Detection[] = new Scanner().scan(SSN_WITH_KEYWORDS_NO_SSN);
        assert(results.length === 0);
        done();
    });

    it("should return no results from scanner - invalid IBAN", (done) => {
        const results: Detection[] = new Scanner().scan(IBAN_INVALID);
        assert(results.length === 0);
        done();
    });

    it("should return no results from scanner - valid IBAN1", (done) => {
        const results: Detection[] = new Scanner().scan(IBAN_VALID1);
        assert(results.length > 0 && results[0].name === "IBAN");
        done();
    });

    it("should return no results from scanner - no CC keywords", (done) => {
        const results: Detection[] = new Scanner().scan(CC_WITHOUT_KEYWORDS);
        assert(results.length === 0);
        done();
    });

    it("should return some results from scanner - has CC keywords", (done) => {
        const results: Detection[] = new Scanner().scan(CC_WITH_KEYWORDS);
        assert(results.length > 0 && results[0].name === "CC");
        done();
    });

    it("should return some results from scanner - has CC keywords (Português)", (done) => {
        const results: Detection[] = new Scanner().scan(CC_WITH_KEYWORDS_BR);
        assert(results.length > 0 && results[0].name === "CC");
        done();
    });

    it("should return some results from scanner - has CC keywords but no CC", (done) => {
        const results: Detection[] = new Scanner().scan(CC_WITH_KEYWORDS_NO_CC);
        assert(results.length === 0);
        done();
    });

    it("should return some results from scanner - has CC keywords but invalid CC", (done) => {
        const results: Detection[] = new Scanner().scan(CC_WITH_KEYWORDS_INVALID_CC);
        assert(results.length === 0);
        done();
    });

});