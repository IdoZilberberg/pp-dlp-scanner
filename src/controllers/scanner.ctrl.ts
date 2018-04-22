import {NextFunction, Request, Response} from "express";
import {Detection} from "../models/detection";
import {Scanner} from "../services/scanner";

import {logger} from "../util/logger";


// import detectors here

export const scan = (req: Request, res: Response, next: NextFunction) => {
    const input = req.body;
    logger.info(`Input: ${input}`);
    const results: Detection[] = new Scanner().scan(input);

    return res.status(200).json(results);
};

