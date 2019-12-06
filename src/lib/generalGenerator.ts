import shell from 'shelljs'
import logger from '../utils/logger';
import path from 'path';
import fs from 'fs';
import { getName, getFolderPath, getType } from '../utils/getter';

shell.config.silent = true;

async function generalGenerator(componentPath: string, index: boolean) {

  const componentType: string = getType(componentPath);
  const componentName: string = getName(componentPath);
  const folderPath: string = getFolderPath(componentPath);

  fs.writeFileSync(componentPath, componentType === "tsx" ? tsx(componentName) : jsx(componentName))
  if (index) {
    const listOfFiles = fs.readdirSync(path.join(folderPath))
    const listOfFilesByTypes = listOfFiles.filter(e => path.extname(e).toLowerCase() === `${componentType}`)
    let indexString = ""
    listOfFilesByTypes.forEach(e => {
      indexString += indexing(getName(e), e)
    })
    fs.writeFileSync(path.join(folderPath, `index${componentType}`), indexString)
  }
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

const indexing = (componentName: string, componentPath: string) => `export { default as ${componentName} } from './${componentName}';\n`

export default generalGenerator;