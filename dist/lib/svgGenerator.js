"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const shelljs_1 = __importDefault(require("shelljs"));
const logger_1 = __importDefault(require("../utils/logger"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const spinner_1 = __importDefault(require("../utils/spinner"));
const getter_1 = require("../utils/getter");
function svgGenerator(config, template, destination, source, type) {
    return __awaiter(this, void 0, void 0, function* () {
        //npx @svgr/cli --template resources/SvgrTemplate.js --ext tsx -d resources/svgComponents resources/svgs
        if (shelljs_1.default.which('npx')) {
            yield spinner_1.default(`npx @svgr/cli --svgo-config ${config} --template ${template} --ext ${type} -d ${destination} ${source}`, () => logger_1.default.info(`convert svg to ${type} has successfully done!`));
        }
        else {
            throw "Can't find npx!! please install npm or update!";
        }
        const listOfFiles = fs_1.default.readdirSync(path_1.default.join(destination));
        const listOfFilesByTypes = listOfFiles.filter(e => path_1.default.extname(e).toLowerCase() === `.${type}`);
        let indexString = "";
        listOfFilesByTypes.forEach(e => {
            if (getter_1.getName(e) !== "index") {
                indexString += indexing(getter_1.getName(e));
            }
        });
        fs_1.default.writeFileSync(path_1.default.join(destination, `index.${type}`), indexString);
    });
}
const indexing = (componentName) => `export { default as ${componentName} } from './${componentName}';\n`;
exports.default = svgGenerator;
//# sourceMappingURL=svgGenerator.js.map