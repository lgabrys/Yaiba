'use strict';
const EventEmitter = require('events');
const shared = require('../shared');
const DKIM = require('../dkim');
const util = require('util');
const dns = require('dns');




class Mail extends EventEmitter {
    constructor(transporter, options, defaults) {
        this.options = options || {};
        this._defaultPlugins = {
        };
        this._userPlugins = {
        };

        this.transporter = transporter;
        this.transporter.mailer = this;
        this.logger = shared.getLogger(this.options, {
        });
        this.logger.debug(
            {
            },
        );

        if (typeof this.transporter.on === 'function') {
            this.transporter.on('log', log => {
                this.logger.debug(
                );
            });
            this.transporter.on('error', err => {
                this.logger.error(
                );
            });
        }

        ['close', 'isIdle', 'verify'].forEach(method => {
            this[method] = (...args) => {
                if (typeof this.transporter[method] === 'function') {
                    if (method === 'verify' && typeof this.getSocket === 'function') {
                        this.transporter.getSocket = this.getSocket;
                    }
                } else {
                    this.logger.warn(
                        {
                        },
                    );
                }
            };
        });
    }
    use(step, plugin) {
        step = (step || '').toString();
        if (!this._userPlugins.hasOwnProperty(step)) {
            this._userPlugins[step] = [plugin];
        } else {
    }


    sendMail(data, callback) {
        let promise;
    }
}
