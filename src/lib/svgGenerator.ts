import shell from 'shelljs'
import logger from '../utils/logger';
import path from 'path';
import fs from 'fs';
import waitCommand from '../utils/spinner';
import { getName } from '../utils/getter';

shell.config.silent = true;

async function svgGenerator(template: string, destination: string, source: string, type: string) {
  //npx @svgr/cli --template resources/SvgrTemplate.js --ext tsx -d resources/svgComponents resources/svgs
  if (shell.which('npx')) {
    await waitCommand(`npx @svgr/cli --template ${template} --ext ${type} -d ${destination} ${source}`, () => logger.info(`convert svg to ${type} has successfully done!`))
  }
  else {
    throw "Can't find npx!! please install npm or update!"
  }

  const listOfFiles = fs.readdirSync(path.join(destination))
  const listOfFilesByTypes = listOfFiles.filter(e => path.extname(e).toLowerCase() === `.${type}`)
  let indexString = ""
  listOfFilesByTypes.forEach(e => {
    indexString += indexing(getName(e), e)
  })
  fs.writeFileSync(path.join(destination, `index.${type}`), indexString)
}

const indexing = (componentName: string, componentPath: string) => `export { default as ${componentName} } from '${componentPath}';\n`

export default svgGenerator;