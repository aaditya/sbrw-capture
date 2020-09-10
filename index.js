const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const request = require('request');

const config = require('./config.json');
const middleParser = require('./parser');

require('body-parser-xml')(bodyParser);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.xml({
  verify: function (req, res, buf, encoding) {
    if (buf && buf.length) {
      // Store the raw XML
      req.rawBody = buf.toString(encoding || 'utf8');
    }
  }
}));

app.use(morgan('dev'));

app.use((req, res) => {
  const baseServer = config.url[process.argv[2]] || config.url.ref;
  const endpoint = req.originalUrl.replace('//', '/');
  const url = baseServer + endpoint;
  delete req.headers['accept-encoding'];
  request({ url: url, method: req.method, headers: req.headers, body: req.rawBody }, (err, response, body) => {
    if (!err) {
      res.type('application/xml').send(body);
      middleParser(req, body);
    }
  });
});

app.listen(config.port, () => {
  console.log(`Server listening on ${config.port}`);
});

module.exports = app;