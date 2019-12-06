#!/usr/bin/env node
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
const commander_1 = __importDefault(require("commander"));
const inquirer_1 = __importDefault(require("inquirer"));
const logger_1 = __importDefault(require("../utils/logger"));
const path_1 = __importDefault(require("path"));
const generalGenerator_1 = __importDefault(require("../lib/generalGenerator"));
const componentGenerator_1 = __importDefault(require("../lib/componentGenerator"));
const svgGenerator_1 = __importDefault(require("../lib/svgGenerator"));
commander_1.default.version('0.0.1');
commander_1.default
    .command('c')
    .arguments('<componentFullPath>')
    .description('create component')
    .action((componentFullPath) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info("Generate the general component into", `'${path_1.default.join(process.cwd(), componentFullPath)}'`);
        yield componentGenerator_1.default(componentFullPath);
    }
    catch (err) {
        logger_1.default.error(err);
    }
}));
commander_1.default
    .command('g')
    .arguments('<componentFullPath>')
    .description('create general component')
    .action((componentFullPath) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const answer = yield inquirer_1.default.prompt({
            type: "list",
            name: "index",
            message: "Do you need to rewire the index file?",
            choices: ["Yes", "No"]
        });
        logger_1.default.info("Generate the general component into", `'${path_1.default.join(process.cwd(), componentFullPath)}'`, `and index rewiring: '${answer.index}'`);
        yield generalGenerator_1.default(componentFullPath, answer.index === "Yes" ? true : false);
    }
    catch (err) {
        logger_1.default.error(err);
    }
}));
commander_1.default
    .command('svg')
    .arguments('<config> [template] [destination] [source] [type]')
    .description('generate file based on file type')
    .action((config, template, destination, source, type) => __awaiter(void 0, void 0, void 0, function* () {
    //  template: string, destination: string, source: string, type: string
    try {
        logger_1.default.info("Convert svg file to react component");
        logger_1.default.info(`npx @svgr/cli --svgo-config ${config} --template ${template} --ext ${type} -d ${destination} ${source}'`);
        yield svgGenerator_1.default(config, template, destination, source, type);
    }
    catch (err) {
        logger_1.default.error(err);
    }
}));
commander_1.default.parse(process.argv);
//# sourceMappingURL=index.js.map