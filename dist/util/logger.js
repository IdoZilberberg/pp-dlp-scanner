"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const winston_2 = require("winston");
exports.logger = new (winston_2.Logger)({
    transports: [
        new (winston_1.default.transports.Console)({ level: process.env.NODE_ENV === "production" ? "error" : "debug" }),
        new (winston_1.default.transports.File)({ filename: "debug.log", level: "debug" })
    ]
});
if (process.env.NODE_ENV !== "production") {
    exports.logger.debug("Logging initialized at debug level");
}
//# sourceMappingURL=logger.js.map