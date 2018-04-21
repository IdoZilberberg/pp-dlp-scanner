import {Detection} from "../models/detection";

export interface Detector {

    name: string;
    contextKeywords: string[];

    detect(input: string): Detection;
}