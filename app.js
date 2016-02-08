"use strict";

process.on('uncaughtException', console.error);
const contactFile = process.env.npm_package_config_contacts;

const fs = require('fs');

fs.readFile(contactFile, (err, data) => {
    if (err) throw err;
    const contacts = JSON.parse(data);
    contacts.forEach(c => console.log(`${c.lastName.toUpperCase()} ${c.firstName}`));
});