const express = require("express");
const compression = require("compression");  // compresses requests
const bodyParser = require("body-parser");
const path = require("path");
const expressValidator = require("express-validator");
const errorHandler = require("errorhandler");
import {logger} from "./util/logger";

// Controllers (route handlers)
const scannerController = require("./controllers/scanner");

const app = express();

// Express configuration
app.set("port", process.env.PORT || 3111);
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidator());
app.use(
  express.static(path.join(__dirname, "public"), {maxAge: 31557600000})
);

/**
 * Primary app routes.
 */
app.post("/scanner/string", scannerController.scanString);
app.get("/scanner/file", scannerController.scanFile);

/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorHandler());

/**
 * Start Express server.
 */
app.listen(app.get("port"), () => {
  logger.info(
    "  App is running at http://localhost:%d in %s mode",
    app.get("port"),
    app.get("env")
  );
  logger.info("  Press CTRL-C to stop\n");
});


