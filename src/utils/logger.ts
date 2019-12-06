import chalk = require("chalk")

const info = chalk.cyan
const warn = chalk.red
const error = chalk.bgRed
const logger = {
    info: (...log: any) => console.log(info("info: "), ...log),
    warn: (...log: any) => console.log(warn("warn: "), ...log),
    error: (...log: any) => console.error(error("error: "), ...log),
}

export default logger