"use strict";

process.on('uncaughtException', console.error);

const Person = require('./person');
const server = require('./server');
const program = require('commander');
const request = require('request')
    .defaults({
        baseUrl: `http://localhost:${process.env.npm_package_config_port}`
    });
    
program.version('TP5');

program.command('list')
    .description('List contacts')
    .action(() => {
        request(`/contacts/`, (err, res, body) => {
             if (err) throw err;
             JSON.parse(body)
                .forEach(c => { 
                    console.log(`${c.lastName.toUpperCase()} ${c.firstName}`); 
                });
        });
    });
    
program.command('add [firstName] [lastName]')
    .description('Add a new person with this identity')
    .action((firstName, lastName) => {
        request({
            url: `/contacts/`,
            method: 'POST',
            json: {
                firstName,
                lastName
            }
        });
    });

program.command('remove [id]')
    .description('Remove the contact having this id')
    .action((id) => {
        request({
            url: `/contacts/${id}`,
            method: 'DELETE'
        });
    });

program.command('serve')
    .description('Expose an HTTP API')
    .option('--memory', 'Use in-memory storage')
    .action((options) => {
        const storeType = options.memory
            ? server.StoreType.MEMORY
            : server.StoreType.DATABASE;
        server.start((port) => { 
            console.log(`port: ${port}`);
        }, storeType);
    });

program.command('', {isDefault: true})
    .action(() => {
        program.help();
    });
    
program.parse(process.argv);