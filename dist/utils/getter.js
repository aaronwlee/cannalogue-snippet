"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
function getType(componentPath) {
    const splited = componentPath.split('/');
    return path_1.default.extname(splited[splited.length - 1]).toLowerCase();
}
exports.getType = getType;
function getName(componentPath) {
    const splited = componentPath.split('/');
    const name = splited[splited.length - 1].split(".");
    return name[0];
}
exports.getName = getName;
function getFolderPath(componentPath) {
    const splited = componentPath.split("/");
    const rejoinArray = [];
    splited.forEach((e, i) => {
        if (i !== splited.length - 1) {
            rejoinArray.push(e);
        }
    });
    return rejoinArray.length !== 0 ? rejoinArray.join('/') : ".";
}
exports.getFolderPath = getFolderPath;
//# sourceMappingURL=getter.js.map