# SBRW Capture

[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/aaditya/sbrw-capture/graphs/commit-activity) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/aaditya/sbrw-capture/blob/master/LICENSE)

What this does is that it accepts all incoming requests and all parameters and the corresponding outputs and then stores them in a JSON file. The files are marked with a timestamp to notify about the hit time, and saves unparsed text too.

Right now, the server is configured to hit the WorldUnited.gg game server as referece.

## Requirements

* NodeJS

## Installation and Running

* Clone this repository.

* `cd sbrw-capture`

* open `config.json`, modify the `url` field if you really need to change the defaults.

* `npm i`

* `npm start`

* Open SBRW launcher

* Click on Add server

* In the dialog, Add `http://127.0.0.1:8080`

* Restart launcher

* Select the added server

* Play as normal.

## Credits

* [Body-Parser-XML](https://www.npmjs.com/package/body-parser-xml)