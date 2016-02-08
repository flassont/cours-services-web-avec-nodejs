/**
 * HTTP API module
 */
'use strict';

const Person = require('./person');
const express = require('express');
const HttpStatus = require('http-status-codes');

let repository;
const StoreType = {
    MEMORY: 'MEMORY',
    DATABASE: 'DATABASE'
};
const port = process.env.npm_package_config_port;
const app = express();

// Middlewares
app.use(require('body-parser').json());

// API
app.get('/health', (req, res) => { res.sendStatus(200); });
app.route('/contacts')
    .get((req, res) => { 
        repository.read((err, data) => {
            if (err) throw err;
            res.send(data);
        });
    }).post((req, res) => {
        const person = new Person(req.body.firstName, req.body.lastName);
        const url = `/contacts/${person.id}`;
        console.info(url);
        repository.append(person);
        res.location(url)
            .status(HttpStatus.CREATED)
            .send(url);
    });
app.route('/contacts/:id')
    .get((req, res) => {
        repository.read((err, data) => {
            if (err) throw err;
            
            let withId = data.filter(c => c.id === req.params.id);
            if (withId.length) {
                res.json(withId[0]);
            } else {
                res.sendStatus(HttpStatus.NOT_FOUND);
            }
        });
    }).delete((req, res) => {
        repository.read((err, data) => {
            if (err) throw err;
            
            let filtered = data.filter(c => c.id !== req.params.id);
            if(filtered.length !== data.length) {
                repository.write(filtered, () => {
                    res.sendStatus(HttpStatus.NO_CONTENT);
                });
            } else {
                res.sendStatus(HttpStatus.NOT_FOUND);
            }
        })
    });
    
module.exports = {
    /**
     * Run the server
     * @param {Function(Number)?}   cb  Node-style callback
     */
    start: (cb, storeType) => {
        storeType = storeType || StoreType.DATABASE;
        switch (storeType) {
            case StoreType.DATABASE:
                repository = require('./repository');
                break;
            case StoreType.MEMORY:
                repository = require('./memRepository');
                break;
            default:
                throw new Error('storeType is not a valid constant');
        }
        
        app.listen(port);
        cb(port);
    },
    StoreType
}