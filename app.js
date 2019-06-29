const express = require('express');
const bodyParser = require('body-parser');
require('./xmlParser')(bodyParser);
const app = express();
const requestHTTP = require('request');
const morgan = require('morgan');

const config = require('./system/config.json');

const base_server = config.url;

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