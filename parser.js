const fs = require('fs');

const middleParser = (err, req, body, res) => {
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
            let fstream = fs.createWriteStream("dataset/" + fname + ".json");
            let data = {
                "Protocol": req.method,
                "Body": body,
                "Queries": req.query,
                "Headers": req.headers,
                "URL": req.originalUrl
            }
            fstream.write(JSON.stringify(data));
            fstream.end();
        }
        res.type('application/xml').send(body);
    }
}

module.exports = middleParser;