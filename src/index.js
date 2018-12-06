#!/usr/bin/env node

const yargs = require('yargs')
const commands = require('./comands')

module.exports = yargs
  .command(
    'new [type] [name]',
    'create a new koop project',
    commands.new.options,
    commands.new.handler
  )
  .demandCommand()
  .showHelpOnFail(true)
  .help('help').argv