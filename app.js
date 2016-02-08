"use strict";

process.on('uncaughtException', console.error);
const contactFile = process.env.npm_package_config_contacts;

const fs = require('fs');
const program = require('commander');
const shortid = require('shortid');

const repository = require('./repository');

program.version('TP3');

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
        let person = {
            id: shortid.generate(),
            firstName: firstName,
            lastName: lastName
        };
        repository.read((err, data) => {
            if (err) throw err;
            data.push(person);
            repository.write(data, (err) => { if(err) throw err; });
        });
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

program.command('', {isDefault: true})
    .action(() => {
        program.help();
    });
    
program.parse(process.argv);