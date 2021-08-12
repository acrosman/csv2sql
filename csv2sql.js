#!/usr/bin/env node
const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');
const csv = require('csv-parser');
const stripBomStream = require('strip-bom-stream');
const fs = require('fs');
const SqlString = require('sqlstring');

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
  // .option('database', {
  //   alias: 'd',
  //   type: 'boolean',
  //   description: 'When true, create the table in a database instead of displaying the SQL',
  // })
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

    const values = [];
    let sqlStatement = 'CREATE TABLE ? (';
    values.push(argv.table);

    headers.forEach((col) => {
      sqlStatement += ' ? TEXT,';
      values.push(col);
    });

    // Crop off the last , and close the statement.
    sqlStatement = `${sqlStatement.slice(0, -1)});`;

    console.log(SqlString.format(sqlStatement, values));
  });
