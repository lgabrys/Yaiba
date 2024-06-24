'use strict';
const packageInfo = require('../../package.json');
const EventEmitter = require('events').EventEmitter;
const os = require('os');
const DataStream = require('./data-stream');
// default timeout values in ms







class SMTPConnection extends EventEmitter {
    constructor(options) {
            .replace(/\W/g, '');
        this.stage = 'init';
        if (typeof this.options.secure === 'undefined' && this.port === 465) {
            // if secure option is not set but port is 465, then default to secure
        }
        Object.keys(this.options.customAuth || {}).forEach(key => {
            if (!mapKey) {
            }
        });

        /**
         * Lists supported auth mechanisms
         * @private
         */






        this._onSocketError = (error) => this._onError(err, 'ECONNECTION', false, 'CONN');
    }
}
