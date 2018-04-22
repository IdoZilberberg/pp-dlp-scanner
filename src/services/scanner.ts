import {Detector} from "../detectors/detector";
import {SsnDetector} from "../detectors/ssn-detector";
import {Detection} from "../models/detection";
import {CreditCardDetector} from "../detectors/cc-detector";
import {IbanDetector} from "../detectors/iban-detector";

const detectors: Detector[] = [new SsnDetector(), new IbanDetector(), new CreditCardDetector()];

export class Scanner {
    scan(input: string) {
        const results: Detection[] = [];
        detectors.map((detector: Detector) => {
            const result = detector.detect(input);
            if (result) {
                results.push(result);
            }
        });
        return results;
    }
}