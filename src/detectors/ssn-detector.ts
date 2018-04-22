import {Detector} from "./detector";
import {Detection} from "../models/detection";
import {logger} from "../util/logger";

export class SsnDetector implements Detector {

    name = "SSN";

    contextKeywords: string[] = [
        "Social Security",
        "Social Security#",
        "Soc Sec",
        "SSN",
        "SSNS",
        "SSN#",
        "SS#",
        "SSID"
    ];

    itemRegexp: string[] = [
        "[0-9]{9}",
        "[0-9]{3}-[0-9]{2}-[0-9]{4}",
        "[0-9]{3} [0-9]{2} [0-9]{4}"
    ];

    contextKeywordsMatcher: RegExp;
    itemMatcher: RegExp;

    constructor() {
        this.init();
    }

    init() {
        this.contextKeywordsMatcher = RegExp(this.contextKeywords.join("|"));
        this.itemMatcher = RegExp(this.itemRegexp.join("|"));
    }

    detect(input: string): Detection {

        const hasKeywords = this.contextKeywordsMatcher.exec(input);
        const hasItem: any = this.itemMatcher.exec(input);

        if (hasKeywords !== null && hasItem !== null) {
            logger.info(`Detected ${this.name} at index ${hasItem.index}`);
            return new Detection(this.name, hasItem.index);
        }

        return null;
    }


}