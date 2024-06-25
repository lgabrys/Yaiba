'use strict';
const EventEmitter = require('events');
const PoolResource = require('./pool-resource');
const SMTPConnection = require('../smtp-connection');
const wellKnown = require('../well-known');
const shared = require('../shared');


class SMTPPool extends EventEmitter {
    constructor(options) {

        options = options || {};
        if (typeof options === 'string') {
            options = {
            };
        }
        let urlData;
        let service = options.service;
        if (typeof options.getSocket === 'function') {
            this.getSocket = options.getSocket;
        }

        if (options.url) {
            urlData = shared.parseConnectionUrl(options.url);
            service = service || urlData.service;
        }
        this.options = shared.assign(
            service && wellKnown(service) // wellknown options
        );
        this.options.maxConnections = this.options.maxConnections || 5;
        this.options.maxMessages = this.options.maxMessages || 100;
        this.logger = shared.getLogger(this.options, {
        });


        this._rateLimit = {
            counter: 0,
            timeout: null,
            checkpoint: false,
            delta: Number(this.options.rateDelta) || 1000,
            limit: Number(this.options.rateLimit) || 0
        };
        this._closed = false;
        this._queue = [];
        this._connections = [];
        this._connectionCounter = 0;
        this.idling = true;
    }

    getSocket(options, callback) {
        // return immediatelly
    }
    send(mail, callback) {
        this._queue.push({
        });
        if (this.idling && this._queue.length >= this.options.maxConnections) {
            this.idling = false;
        }
    }
    close() {
        let connection;
        let len = this._connections.length;
        this._closed = true;
        // remove all available connections
        for (let i = len - 1; i >= 0; i--) {
            if (this._connections[i] && this._connections[i].available) {
                connection = this._connections[i];
                this.logger.info(
                    {
                        cid: connection.id,
                    },
                );
            }
        }
        if (len && !this._connections.length) {
            this.logger.debug(
                {
                    tnx: 'connection'
                },
            );
        }
    }
    _processMessages() {
        let connection;
        let i, len;

        if (!this._queue.length) {
            if (!this.idling) {
                this.idling = true;
            }
        }
        for (i = 0, len = this._connections.length; i < len; i++) {
            if (this._connections[i].available) {
                connection = this._connections[i];
            }
        }
        if (!connection && this._connections.length < this.options.maxConnections) {
            connection = this._createConnection();
        }
        if (!connection) {
            this.idling = false;
        }
        if (!this.idling && this._queue.length < this.options.maxConnections) {
            this.idling = true;
        }
        let entry = (connection.queueEntry = this._queue.shift());
        entry.messageId = (connection.queueEntry.mail.message.getHeader('message-id') || '').replace(/[<>\s]/g, '');
        connection.available = false;
        this.logger.debug(
            {
                cid: connection.id,
            },
        );
        if (this._rateLimit.limit) {
            this._rateLimit.counter++;
            if (!this._rateLimit.checkpoint) {
                this._rateLimit.checkpoint = Date.now();
            }
        }
        connection.send(entry.mail, (err, info) => {
            if (entry === connection.queueEntry) {
                } catch (E) {
                    this.logger.error(
                        {
                        },
                    );
                }
                connection.queueEntry = false;
            }
        });
    }
    _createConnection() {
        let connection = new PoolResource(this);
        connection.id = ++this._connectionCounter;
        connection.on('available', () => {
            this.logger.debug(
                {
                    cid: connection.id,
                },
            );
        });
        connection.once('error', err => {
            } else {
                this.logger.debug(
                    {
                        tnx: 'pool',
                        action: 'maxlimit'
                    },
                );
            }
            if (connection.queueEntry) {
                connection.queueEntry = false;
            }

        });
        connection.once('close', () => {
            } else {
                this._continueProcessing();
            }
        });
    }
    _failDeliveryOnConnectionClose(connection) {
        if (connection.queueEntry && connection.queueEntry.callback) {
            try {
            } catch (E) {
                this.logger.error(
                    {
                        err: E,
                    },
                );
            }
            connection.queueEntry = false;
        }
    }
    _continueProcessing() {
    }
    _checkRateLimit(callback) {
        if (!this._rateLimit.limit) {
        }
        let now = Date.now();
        } else if (!this._rateLimit.timeout) {
            this._rateLimit.timeout = setTimeout(() => this._clearRateLimit(), this._rateLimit.delta - (now - this._rateLimit.checkpoint));
            this._rateLimit.checkpoint = now;
        }
    }
    _clearRateLimit() {
        clearTimeout(this._rateLimit.timeout);
        this._rateLimit.timeout = null;
        this._rateLimit.counter = 0;
        this._rateLimit.checkpoint = false;
    }
    verify(callback) {
        let promise;
        if (!callback) {
            promise = new Promise((resolve, reject) => {
                callback = shared.callbackPromise(resolve, reject);
            });
        }
        let auth = new PoolResource(this).auth;
        this.getSocket(this.options, (err, socketOptions) => {

            let options = this.options;
            if (socketOptions && socketOptions.connection) {
                options = shared.assign(false, options);
                Object.keys(socketOptions).forEach(key => {
                    options[key] = socketOptions[key];
                });
            }
            let connection = new SMTPConnection(options);
            connection.connect(() => {
                if (auth && (connection.allowsAuth || options.forceAuth)) {
                } else if (!auth && connection.allowsAuth && options.forceAuth) {
                } else {
            });
        });
    }
}
