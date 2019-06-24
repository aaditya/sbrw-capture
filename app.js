const express = require('express');
const app = express();
const request = require('request');
const morgan = require('morgan');

const base_server = 'http://145.239.5.103:8680'

const middleParser = require('./parser');

app.use(morgan('dev'));

app.use((req, res) => {
    let url = base_server + req.originalUrl;
    delete req.headers['accept-encoding'];
    request({ url: url, method: req.method, headers: req.headers, body: req.body }, (err, response, body) => {
        middleParser(err, req, body, res);
    });
});

module.exports = app;