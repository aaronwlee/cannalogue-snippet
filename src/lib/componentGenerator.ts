
import shell from 'shelljs'
import fs from 'fs';
import { getType, getName } from '../utils/getter';

shell.config.silent = true;

async function componentGenerator(componentPath: string) {
  const componentType: string = getType(componentPath);
  const componentName: string = getName(componentPath);
  fs.writeFileSync(componentPath, componentType === ".tsx" ? tsx(componentName) : jsx(componentName))
}

const tsx = (name: string) =>
  `import React from 'react';

interface I${name} {

}

const ${name}: React.FC<I${name}> = ({}) => {
  return (
    <div>

    </div>
  )
}

export default ${name}`

const jsx = (name: string) =>
  `import React from 'react';

const ${name} = ({}) => {
  return (
    <div>

    </div>
  )
}

export default ${name}`

export default componentGenerator;