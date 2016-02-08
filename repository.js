/**
 * @file Contact file access module
 */
'use strict';

const fs = require('fs');
const contactFile = process.env.npm_package_config_contacts;

module.exports = {
    /**
     * Read the contact file then call the {@code cb}
     * @param {Function(err: Error?, data: Array<Person>)} cb Node-style callback
     */
    read: (cb) => {
        fs.readFile(contactFile, (err, data) => {
            if (err) {
               cb(err, undefined);
            } else {
                cb(err, JSON.parse(data));
            }
        })
    },
    /**
     * Write {@param data} into contact file
     * @param {any} data Data to write
     * @param {Function(err: Error?)?} cb Node-style callback
     */
    write: (data, cb) => {
        fs.writeFile(contactFile, JSON.stringify(data, null, '\t'), cb);
    }
}