"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cli_spinner_1 = require("cli-spinner");
const child_process_1 = require("child_process");
const spinner = new cli_spinner_1.Spinner({
    text: `%s  Processing...    `,
    stream: process.stderr,
    onTick: function (msg) {
        this.clearLine(this.stream);
        this.stream.write(msg);
    }
});
spinner.setSpinnerString(19);
spinner.setSpinnerDelay(500);
const waitCommand = (command, onSuccess) => {
    return new Promise((resolve, reject) => {
        var process = child_process_1.spawn(command, { shell: true });
        spinner.start();
        process.on('exit', () => {
            spinner.stop();
            onSuccess();
            resolve();
        });
    });
};
exports.default = waitCommand;
//# sourceMappingURL=spinner.js.map