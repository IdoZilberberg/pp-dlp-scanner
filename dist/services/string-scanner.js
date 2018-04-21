"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const rp = require("request-promise");
exports.runScanner = (input) => {
    switch (constants_1.constants.scannerStrategy) {
        case "node":
            return runNodeScanner(input);
        // case "elastic":
        //   return runElasticScanner(input);
        default:
            throw new Error(`Unrecognized scanner strategy: ${constants_1.constants.scannerStrategy}`);
    }
};
function runNodeScanner(input) {
    const options = {
        method: "POST",
        uri: `${constants_1.constants.NODE_SCANNER_URL}`,
        body: input,
        headers: {
            "content-type": "text/plain"
        },
        json: true
    };
    console.log("Calling scanner");
    return rp(options);
}
//# sourceMappingURL=string-scanner.js.map