"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const compression = require("compression"); // compresses requests
const bodyParser = require("body-parser");
const path = require("path");
const expressValidator = require("express-validator");
const errorHandler = require("errorhandler");
const logger_1 = require("./util/logger");
// Controllers (route handlers)
const scannerController = require("./controllers/scanner.ctrl");
const app = express();
// Express configuration
app.set("port", process.env.PORT || 3222);
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");
app.use(compression());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
/**
 * Primary app routes.
 */
app.post("/scanner", scannerController.scan);
/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorHandler());
/**
 * Start Express server.
 */
app.listen(app.get("port"), () => {
    logger_1.logger.info("  App is running at http://localhost:%d in %s mode", app.get("port"), app.get("env"));
    logger_1.logger.info("  Press CTRL-C to stop\n");
});
exports.default = app;
//# sourceMappingURL=app.js.map