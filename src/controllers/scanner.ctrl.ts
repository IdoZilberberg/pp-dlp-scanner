import {NextFunction, Request, Response} from "express";
import {SsnDetector} from "../detectors/ssn-detector";
import {Detector} from "../detectors/detector";
import {Detection} from "../models/detection";

const detectors: Detector[] = [new SsnDetector()];
// import detectors here

export const scan = (req: Request, res: Response, next: NextFunction) => {
    const input = req.body;
    const results: Detection[] = [];

    detectors.map((detector: Detector) => {
        results.push(detector.detect(input));
    });

    return res.status(200).json(results);
};

