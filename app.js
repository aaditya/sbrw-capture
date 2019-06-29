const express = require('express');
const bodyParser = require('body-parser');
require('./xmlParser')(bodyParser);
const app = express();
const requestHTTP = require('request');
const morgan = require('morgan');

const base_server = 'http://145.239.5.103:8680'

const middleParser = require('./parser');

app.use(bodyParser.json());
app.use(bodyParser.xml());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan('dev'));

app.use((req, res) => {
    let url = base_server + req.originalUrl;
    delete req.headers['accept-encoding'];
    requestHTTP({ url: url, method: req.method, headers: req.headers, body: req.rawBody }, (err, response, body) => {
        middleParser(err, req, body, res);
    });
});

module.exports = app;