#!/usr/bin/env node

import program from 'commander'
import inquirer from 'inquirer'
import logger from '../utils/logger';
import path from 'path';
import generalGenerator from '../lib/generalGenerator'
import componentGenerator from '../lib/componentGenerator';
import svgGenerator from '../lib/svgGenerator';

program.version('0.0.1')

program
  .command('c')
  .arguments('<componentFullPath>')
  .description('create component')
  .action(async (componentFullPath: string) => {
    try {
      logger.info("Generate the general component into", `'${path.join(process.cwd(), componentFullPath)}'`)
      await componentGenerator(componentFullPath)
    } catch (err) {
      logger.error(err)
    }
  });

program
  .command('g')
  .arguments('<componentFullPath>')
  .description('create general component')
  .action(async (componentFullPath: string) => {
    try {
      const answer: any = await inquirer.prompt({
        type: "list",
        name: "index",
        message: "Do you need to rewire the index file?",
        choices: ["Yes", "No"]
      })
      logger.info("Generate the general component into", `'${path.join(process.cwd(), componentFullPath)}'`, `and index rewiring: '${answer.index}'`)
      await generalGenerator(componentFullPath, answer.index === "Yes" ? true : false)
    } catch (err) {
      logger.error(err)
    }
  });

program
  .command('svg')
  .arguments('<config> [template] [destination] [source] [type]')
  .description('generate file based on file type')
  .action(async (config: string, template: string, destination: string, source: string, type: string) => {
    //  template: string, destination: string, source: string, type: string
    try {
      logger.info("Convert svg file to react component")
      logger.info(`npx @svgr/cli --svgo-config ${config} --template ${template} --ext ${type} -d ${destination} ${source}'`)
      await svgGenerator(config, template, destination, source, type)
    } catch (err) {
      logger.error(err)
    }
  });

program.parse(process.argv);