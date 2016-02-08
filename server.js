/**
 * HTTP API module
 */
'use strict';

const Person = require('./person');
const repository = require('./repository');
const express = require('express');
const HttpStatus = require('http-status-codes');

const port = 8081;
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
    start: (cb) => {
        app.listen(port);
        cb(port);
    }
}