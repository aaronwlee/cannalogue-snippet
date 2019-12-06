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
const fs_1 = __importDefault(require("fs"));
const getter_1 = require("../utils/getter");
shelljs_1.default.config.silent = true;
function componentGenerator(componentPath) {
    return __awaiter(this, void 0, void 0, function* () {
        const componentType = getter_1.getType(componentPath);
        const componentName = getter_1.getName(componentPath);
        fs_1.default.writeFileSync(componentPath, componentType === "tsx" ? tsx(componentName) : jsx(componentName));
    });
}
const tsx = (name) => `import React from 'react';

interface I${name} {

}

const ${name}: React.FC<I${name}> = ({}) => {
  return (
    <div>

    </div>
  )
}

export default ${name}`;
const jsx = (name) => `import React from 'react';

const ${name} = ({}) => {
  return (
    <div>

    </div>
  )
}

export default ${name}`;
exports.default = componentGenerator;
//# sourceMappingURL=componentGenerator.js.map