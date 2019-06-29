# SBRW MiddleParser

[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/aadityachakravarty/sbrw-server/graphs/commit-activity) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/racesphere/sbrw-middleparser/blob/master/LICENSE)

Basically, what this does is that it accepts all incoming requests and all parameters and the corresponding outputs and then stores them in a JSON file to check on. The files are marked with a timestamp to notify about the hit time, and stores unparsed text too.

You can consider this as a man-in-the-middle attack specifically targetted at NFSW (or now known as SBRW) servers to enable analysis of inputs and outputs in order to reverse engineer the logic building process.

Basically, if you are like me and didn't understand the SBRW server code and want to create your own server, you'll need this.

Also, this server basically sends over all data and headers etc to a functioning server.

## Requirements

* NodeJS. That's basically it.

## Installation and Running

* git clone

* cd sbrw-middleparser

* open config.json, modify the "ip" field if you really need to change the defaults.

* npm i

* npm start

* Open SBRW launcher

* Click on Add server

* In the dialog, Add "http://127.0.0.1:8680" (without quotes)

* Restart launcher

* Select the added server

* Play as normal.

## Credits

* [Body-Parser-XML](https://www.npmjs.com/package/body-parser-xml) for making the code to parse and capture XML requests.