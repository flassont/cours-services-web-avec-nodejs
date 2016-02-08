/**
 * @file Contact file access module
 */
'use strict';

const fs = require('fs');
const contactFile = process.env.npm_package_config_contacts;

module.exports = {
    read,
    write,
    append
}

/**
 * Read the contact file then call the {@code cb}
 * @param {Function(err: Error?, data: Array<Person>)} cb Node-style callback
 */
function read(cb) {
    fs.readFile(contactFile, (err, data) => {
        if (err) {
            cb(err, undefined);
        } else {
            cb(err, JSON.parse(data));
        }
    });
}
    
/**
 * Write {@param data} into contact file
 * @param {any}                     data    Data to write
 * @param {Function(err: Error?)?}  cb      Node-style callback
 */
function write(data, cb) {
    fs.writeFile(contactFile, JSON.stringify(data, null, '\t'), cb);
}
    
/**
 * Append the given contact to contact file
 * @param {Person}                  contact The contact to add
 * @param {Function(err: Error?)?}  cb      Node-style callback
 */
function append(contact, cb) {
    read((err, data) => {
        if (err) {
            if (cb) cb(err)
            else throw err;
        } else {
            data.push(contact);
            write(data, cb);
        }
    });
}