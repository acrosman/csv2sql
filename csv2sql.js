#!/usr/bin/env node
const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');
const csv = require('csv-parser');
const stripBomStream = require('strip-bom-stream');
const fs = require('fs');

// Setup yargs interface commands.
const { argv } = yargs(hideBin(process.argv))
  .usage('$0', 'Create a new table table from a CSV file header')
  .option('file', {
    alias: 'f',
    type: 'string',
    description: 'Path to the target file',
  })
  .option('table', {
    alias: 't',
    type: 'string',
    description: 'Name of the table to create',
  })
  .demandOption('file')
  .demandOption('table')
  .help()
  .alias('help', 'h');

fs.createReadStream(argv.file)
  .pipe(stripBomStream())
  .pipe(csv())
  .on('headers', (headers) => {
    console.log(`File Headers: ${headers}`);
    console.log('Generating SQL');

    let sqlStatement = `CREATE TABLE \`${argv.table}\` (`;

    headers.forEach((col) => {
      sqlStatement += ` \`${col}\` TEXT,`;
    });

    // Crop off the last , and close the statement.
    sqlStatement = `${sqlStatement.slice(0, -1)});`;

    console.log(sqlStatement);
  });
