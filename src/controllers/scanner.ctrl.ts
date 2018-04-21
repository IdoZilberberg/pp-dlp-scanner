import {NextFunction, Request, Response} from "express";
import {SsnDetector} from "../detectors/ssn-detector";
import {Detector} from "../detectors/detector";
import {Detection} from "../models/detection";

import {logger} from "../util/logger";

const detectors: Detector[] = [new SsnDetector()];
// import detectors here

export const scan = (req: Request, res: Response, next: NextFunction) => {
    const input = req.body;
    const results: Detection[] = [];

    logger.info(`Input: ${input}`);

    detectors.map((detector: Detector) => {
        const result = detector.detect(input);
        if (result) {
            results.push(result);
        }
    });

    return res.status(200).json(results);
};

