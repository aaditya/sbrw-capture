const fs = require('fs');
const uuidv1 = require('uuid/v1');

const uuid = uuidv1();

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

            let name = fname.split('_').filter((i, index) => index > 2).join('_');

            let stamp = new Date().getTime();

            let dir = "dataset/" + uuid;

            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
            }

            let fstream = fs.createWriteStream(dir + "/" + stamp + '_' + name + ".json");
            let data = {
                "Protocol": req.method,
                "Output": body,
                "Body": req.body,
                "Raw": req.rawBody,
                "Queries": req.query,
                "Headers": req.headers,
                "URL": req.originalUrl
            }
            fstream.write(JSON.stringify(data, null, 4));
            fstream.end();
        }
        res.type('application/xml').send(body);
    }
}

module.exports = middleParser;