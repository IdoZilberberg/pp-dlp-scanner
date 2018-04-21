// const Request = express.Request;
const path = require("path");
import {Request, Response, NextFunction} from "express";

// const express = require("express");
const processTxtFile = require("../services/txt-file-processor");
const stringScanner = require( "../services/string-scanner");

const scanFile = (req: Request, res: Response) => {
  const localPath = req.query["localpath"];
  const gdrivePath = req.query["gdrivepath"];

  const extension = path.extname(localPath);
  let func;
  switch (extension) {
    case ".txt":
      func = processTxtFile.bind(null, localPath);
      break;
    case ".xls": // TODO: Parse it to text, then run txtFileProcessor as in .txt case
    default:
      throw new Error(`Extension ${extension} is not supported yet, open a Github issue to the developer!`);
  }

  return func()
    .then((response: Response) => {
      return res.status(200).json(response);
    })
    .catch((err: Error) => res.status(500).send(err.message));
};

/**
 * POST /login
 * Sign in using email and password.
 */
const scanString = (req: Request, res: Response, next: NextFunction) => {
  const input = req.body;

  return stringScanner.runScanner(input)
    .then((parsedBody: any) => {
      // const parsedScannerResponse = scannerResponseParser.parseScannerResponse(parsedBody);
      return res.status(200).json(parsedBody);
    })
    .catch((err: Error) => res.status(500).send(err.message));
};

module.exports = {
  scanFile: scanFile,
  scanString: scanString
};