import {Detector} from "./detector";
import {Detection} from "../models/detection";
import * as ibanTools from "ibantools";

export class IbanDetector implements Detector {
    contextKeywords: string[];
    name: string = "IBAN";

    countryCodes = "AD|AE|AL|AT|AZ|BA|BE|BG|BH|CH|CR|CY|CZ|DE|DK|DO|EE|ES|FI|FO|FR|GB|GE|GI|GL|GR|HR|HU|IE|IL|IS|IT|KW|KZ|LB|LI|LT|LU|LV|MC|MD|ME|MK|MR|MT|MU|NL|NO|PL|PT|RO|RS|SA|SE|SI|SK|SM|TN|TR|VG";
    ibanPrefixRegex = `(${this.countryCodes})[0-9][0-9]`;
    ibanCountrySpecs = ibanTools.getCountrySpecifications();

    detect(input: string): Detection {

        const inputUpperCase = input.toLocaleUpperCase();
        const ibanPrefixMatch = inputUpperCase.match(this.ibanPrefixRegex);
        if (!ibanPrefixMatch) {
            return null;
        }

        const ibanPrefix = ibanPrefixMatch[0];
        const countryCode = ibanPrefixMatch[1];
        const ibanIndex = ibanPrefixMatch.index;

        const inputUpperCaseNoSpaces = inputUpperCase.replace(/ /g, "");
        const ibanPrefixNoSpacesMatch = inputUpperCaseNoSpaces.match(ibanPrefix);
        if (!ibanPrefixNoSpacesMatch) {
            return null;
        }

        const ibanLength = this.ibanCountrySpecs[countryCode].chars;
        const iban = inputUpperCaseNoSpaces.substring(ibanPrefixNoSpacesMatch.index, ibanPrefixNoSpacesMatch.index+ibanLength);
        const res = ibanTools.isValidIBAN(iban);

        if(res) {
            return new Detection(this.name, ibanIndex);
        }
        return null;
    }

}