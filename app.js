"use strict";

process.on('uncaughtException', console.error);

const Person = require('./person');
const server = require('./server');
const fs = require('fs');
const program = require('commander');
const shortid = require('shortid');

const repository = require('./repository');

program.version('TP4');

program.command('list')
    .description('List contacts')
    .action(() => {
        repository.read((err, data) => {
            if (err) throw err;
            data.forEach(contact => console.log(`${contact.lastName.toUpperCase()} ${contact.firstName}`));
        });
    });
    
program.command('add [firstName] [lastName]')
    .description('Add a new person with this identity')
    .action((firstName, lastName) => {
        repository.append(new Person(firstName, lastName));
    });

program.command('remove [id]')
    .description('Remove the contact having this id')
    .action((id) => {
        repository.read((err, data) => {
            if (err) throw err;
            data = data.filter(contact => contact.id !== id);
            repository.write(data, (err) => { if (err) throw err; });
        });
    });

program.command('serve')
    .description('Expose an HTTP API')
    .action(() => {
        server.start((port) => { 
            console.log(`port: ${port}`);
        });
    });

program.command('', {isDefault: true})
    .action(() => {
        program.help();
    });
    
program.parse(process.argv);