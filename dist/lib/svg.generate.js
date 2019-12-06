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
const spinner_1 = __importDefault(require("../utils/spinner"));
const fs_1 = __importDefault(require("fs"));
shelljs_1.default.config.silent = true;
function initializer(projectName) {
    return __awaiter(this, void 0, void 0, function* () {
        shelljs_1.default.mkdir(`${process.cwd()}/${projectName}`);
        shelljs_1.default.cd(`${projectName}`);
        fs_1.default.writeFileSync(`./package.json`, packagejsString(projectName));
        logger_1.default.info("packge.json has created");
        fs_1.default.writeFileSync(`./tsconfig.json`, tsconfigString);
        fs_1.default.writeFileSync(`./.eslintrc`, eslintrcString);
        logger_1.default.info("tsconfig.json has created");
        if (shelljs_1.default.which('yarn')) {
            logger_1.default.info("Install package started! with yarn");
            yield spinner_1.default("yarn", () => logger_1.default.info(`node modules installed!`));
            shelljs_1.default.exec("yarn");
        }
        else {
            logger_1.default.warn("Yarn not found...");
            logger_1.default.info("Install package started! with npm");
            yield spinner_1.default("npm install", () => logger_1.default.info(`node modules installed!`));
        }
        fs_1.default.writeFileSync('./.gitignore', gitignore);
        shelljs_1.default.exec('git init');
        shelljs_1.default.exec("git add .");
        shelljs_1.default.exec('git commit -m "initialized by ts-express-cli"');
        logger_1.default.info(`done! cd ./${projectName} `);
    });
}
const packagejsString = (projectName) => `{
  "name": "${projectName}",
  "version": "1.0.0",
  "description": "A starting point for Node.js express apps with TypeScript",
  "license": "MIT",
  "scripts": {
    "build": "tsc",
    "start": "tsc -w | nodemon dist/server.js"
  },
  "devDependencies": {
    "@types/inquirer": "^6.5.0",
    "@types/shelljs": "^0.8.6",
    "@types/node": "^12.12.8",
    "@types/express": "^4.17.2",
    "@types/mongoose": "^5.5.32",
    "@types/compression": "^0.0.36",
    "@types/helmet": "^0.0.43",
    "@types/dotenv": "^6.1.1",
    "@types/cors": "^2.8.5",
    "ts-node": "^8.5.0",
    "tsc": "^1.20150623.0",
    "typescript": "^3.7.2"
  },
  "dependencies": {
    "mongo-to-gql": "^2.0.2",
    "mongoose": "^5.7.11",
    "express": "^4.17.1",
    "cors": "^2.8.5",
    "dotenv": "^8.0.0",
    "compression": "^1.7.4",
    "helmet": "^3.20.0"
  }
}
`;
const tsconfigString = `{
  "compilerOptions": {
      "module": "commonjs",
      "esModuleInterop": true,
      "allowSyntheticDefaultImports": true,
      "declaration": true,
      "target": "es6",
      "noImplicitAny": true,
      "moduleResolution": "node",
      "sourceMap": true,
      "outDir": "dist",
      "baseUrl": ".",
      "paths": {
          "*": [
              "node_modules/*"
          ]
      }
  },
  "include": [
      "src/**/*"
  ]
}
`;
const gitignore = `
node_modules

yarn-error.log
.eslintrc
`;
const eslintrcString = `{
  "parser": "@typescript-eslint/parser",
  "extends": ["plugin:@typescript-eslint/recommended"],
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "rules": {
    "semi": ["error", "always"],
    "quotes": ["error", "double"],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-explicit-any": "off"
  }
}
`;
exports.default = initializer;
//# sourceMappingURL=svg.generate.js.map