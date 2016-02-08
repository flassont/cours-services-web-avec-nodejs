"use strict";

process.on('uncaughtException', console.error);
const contactFile = process.env.npm_package_config_contacts;

const fs = require('fs');
const program = require('commander');

program.version('TP2');

program.command('list')
    .description('List contacts')
    .action(() => {
       fs.readFile(contactFile, (err, data) => {
           if (err) throw err;
           JSON.parse(data)
            .forEach(contact => console.log(`${contact.lastName.toUpperCase()} ${contact.firstName}`));
       });
    });
    
program.command('', {isDefault: true})
    .action(() => {
        program.help();
    });
    
program.parse(process.argv);