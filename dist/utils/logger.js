"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk = require("chalk");
const info = chalk.cyan;
const warn = chalk.red;
const error = chalk.bgRed;
const logger = {
    info: (...log) => console.log(info("info: "), ...log),
    warn: (...log) => console.log(warn("warn: "), ...log),
    error: (...log) => console.error(error("error: "), ...log),
};
exports.default = logger;
//# sourceMappingURL=logger.js.map