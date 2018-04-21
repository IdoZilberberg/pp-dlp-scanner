import {constants} from "./constants";

const rp = require("request-promise");

export const runScanner = (input: string) => {
  switch (constants.scannerStrategy) {
    case "node":
      return runNodeScanner(input);
    // case "elastic":
    //   return runElasticScanner(input);
    default:
      throw new Error(`Unrecognized scanner strategy: ${constants.scannerStrategy}`);
  }
};

function runNodeScanner(input: string) {
  const options = {
    method: "POST",
    uri: `${constants.NODE_SCANNER_URL}`,
    body: input,
    headers: {
      "content-type": "text/plain"
    },
    json: true
  };

  console.log("Calling scanner");
  return rp(options);
}

