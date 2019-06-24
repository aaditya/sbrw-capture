const express = require('express');
const app = express();
const request = require('request');
const morgan = require('morgan');

const base_server = 'http://200.98.139.241:8680'

const middleParser = require('./parser');

app.use(morgan('dev'));

app.use((req, res) => {
    let url = base_server + req.originalUrl;
    if (req.method == 'GET') {
        request.get(url, { headers: req.headers }, (err, resp, body) => {
            middleParser(err, req, body, res);
        });
    }
    else if (req.method == 'POST') {
        request.post(url, { headers: req.headers }, (err, resp, body) => {
            middleParser(err, req, body, res);
        });
    }
});

module.exports = app;