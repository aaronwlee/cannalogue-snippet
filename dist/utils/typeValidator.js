"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FileTypes = {
    Service: "service",
    Mutation: "mutation",
    Model: "model",
    Controller: "controller"
};
function compare(type) {
    return Object.keys(FileTypes).filter((ft) => {
        if (type.toLowerCase() == FileTypes[ft].substring(0, 2)) {
            return FileTypes[ft];
        }
        else if (type.toLowerCase() == FileTypes[ft]) {
            return FileTypes[ft];
        }
    })[0];
}
exports.default = compare;
//# sourceMappingURL=typeValidator.js.map