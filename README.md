# ProofPoint DLP Exercise - Scanner service

# General

This service is called by the API service.

# Running
- Clone the repo: `git clone https://github.com/IdoZilberberg/pp-dlp-scanner.git`
- Install TypeScript (tsc) globally by running `npm install -g typescript`
- Run `cd pp-dlp-scanner`
- Run `npm install`
- Run Typescript compiler: `tsc`. This generates the `dist` folder with vanilla .js files.
- Run the Node.js server: `node dist/app.js`. <p>Make sure you don't run app.ts by mistake!

The service will start listening on port 3222 by default. 

## Responsibility
Accept a string and run all Detectors on it.


## Algorithms
###SSN
Implemented myself as it is fairly simple

###IBAN
Used package `ibantools` as this calculation is complex.
Before testing for valid IBAN, normalized input string by converting to uppercase and stripping all whitespace.

###CREDIT CARD
Copied Luhn algorithm for validation credit cards from [here](https://gist.github.com/DiegoSalazar/4075533).
Before testing for valid credit card, normalized input string by converting to uppercase and stripping all whitespace.


# Detector configuration

Users can configure and extend detectors by implementing the `Detector` interface.
Current examples are:
- `src/detectors/ssn-detector.ts`
- `src/detectors/iban-detector.ts`
- `src/detectors/cc-detector.ts`

# Testing
Multiple tests using `mocha` and `chai` give some degree of assurance to algo correctness. These are not exhaustive tests of course.

# Dev notes
- I decided to write it in Node.js + Typescript. Node.js is for rapid development as this is the server side technology I've been using lately.
Typescript is to show some Object Oriented approach especially on the Scanner service side - users can implement the Detector interface to detect new types of data. 