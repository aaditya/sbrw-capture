const fs = require('fs');
const path = require('path');

const stampInitial = new Date().getTime();
const stampDateStr = new Date().toDateString();

const middleParser = (req, body) => {
  if (req.originalUrl === '/favicon.ico') return;

  let fname;
  if (req.originalUrl.indexOf('?') == -1) {
    fname = req.originalUrl.split('/').join('_');
  } else {
    let file = req.originalUrl.split('?')[0];
    fname = file.split('/').join('_');
  }

  let stamp = new Date().getTime();

  let dir = path.join(__dirname, "dataset/", `${stampInitial}_${stampDateStr}`);
  let filename = `${stamp}_${fname}.json`;

  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  let data = {
    "method": req.method,
    "response": body,
    "body-parsed": req.body,
    "body": req.rawBody,
    "query-string": req.query,
    "headers": req.headers,
    "url": req.originalUrl
  }

  fs.writeFileSync(path.join(dir, filename), JSON.stringify(data, null, 4));
}

module.exports = middleParser;