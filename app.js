const express = require('express');
const app = express();
const request = require('request');
const fs = require('fs');
const morgan = require('morgan');

const base_server = 'http://185.125.231.50:8680'

app.use(morgan('dev'));

app.use((req, res) => {
    let url = base_server + req.originalUrl;
    request({
        url: url,
        method: req.method,
        headers: req.headers
    }, (err, response, body) => {
        if (err) {
            res.json({
                success: false,
                msg: err.message
            });
        }
        else {
            if (req.originalUrl != '/favicon.ico') {
                let fname;
                if (req.originalUrl.indexOf('?') == -1) {
                    fname = req.originalUrl.split('/').join('_');
                }
                else {
                    let file = req.originalUrl.split('?')[0];
                    fname = file.split('/').join('_');
                }
                let fstream = fs.createWriteStream("dataset/" + fname + ".txt");
                fstream.write('Protocol : \n');
                fstream.write('--------- \n');
                fstream.write(req.method);
                fstream.write('\n --------- \n');
                fstream.write('Body Output : \n');
                fstream.write('--------- \n');
                fstream.write(body);
                fstream.write('\n --------- \n');
                fstream.write('Query String : \n');
                fstream.write('--------- \n');
                fstream.write(JSON.stringify(req.query));
                fstream.write('\n --------- \n');
                fstream.write('Headers : \n');
                fstream.write('--------- \n');
                fstream.write(JSON.stringify(req.headers));
                fstream.write('\n --------- \n');
                fstream.write('Full URL : \n');
                fstream.write(req.originalUrl);
                fstream.write('\n --------- \n');
                fstream.end();
            }
            res.set('Content-Type', 'text/xml');
            res.send(body);
        }
    });
});

module.exports = app;