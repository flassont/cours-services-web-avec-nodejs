/**
 * Memory-stored structure
 */
'use strict';

let _data = require(process.env.npm_package_config_contacts);

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
    // Array is copied to ensure isolation.
    cb(undefined, _data.slice(0));
}
    
/**
 * Write {@param data} into contact file
 * @param {any}                     data    Data to write
 * @param {Function(err: Error?)?}  cb      Node-style callback
 */
function write(data, cb) {
    _data = data; 
    if (cb) cb(undefined);
}
    
/**
 * Append the given contact to contact file
 * @param {Person}                  contact The contact to add
 * @param {Function(err: Error?)?}  cb      Node-style callback
 */
function append(contact, cb) {
    _data.push(contact);
    if (cb) cb(undefined);
}