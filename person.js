/**
 * Person model
 */
'use strict';

const shortid = require('shortid');

module.exports = class Person {
    /**
     * Constructor
     * @param {string}  firstName   The first name
     * @param {string}  lastName    The last name
     * @param {string?} id          (Optionnal) The id
     */
    constructor(firstName, lastName, id) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.id = id || shortid.generate();
    }
} 