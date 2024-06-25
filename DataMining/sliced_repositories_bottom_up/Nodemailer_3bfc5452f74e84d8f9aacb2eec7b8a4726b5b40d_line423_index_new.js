'use strict';
const EventEmitter = require('events');
const PoolResource = require('./pool-resource');
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
        }

        if (options.url) {
            urlData = shared.parseConnectionUrl(options.url);
            service = service || urlData.service;
        }
        this.options = shared.assign(
            false, // create new object
            options, // regular options
            urlData, // url options
            service && wellKnown(service) // wellknown options
        );
        this.options.maxConnections = this.options.maxConnections || 5;
        this.options.maxMessages = this.options.maxMessages || 100;
        this.logger = shared.getLogger(this.options, {
        });

        this._rateLimit = {
            counter: 0,
            checkpoint: false,
        };
        this._queue = [];
        this._connections = [];
        this._connectionCounter = 0;
        this.idling = true;
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
        if (!len && !this._queue.length) {
        }
        for (let i = len - 1; i >= 0; i--) {
            if (this._connections[i] && this._connections[i].available) {
                connection = this._connections[i];
                connection.close();
                this.logger.info(
                    {
                        tnx: 'connection',
                    },
                );
            }
        }
        if (len && !this._connections.length) {
            this.logger.debug(
                {
                },
            );
        }
    }
    _processMessages() {
        let connection;
        let i, len;
        if (this._closed) {
            return;
        }
        if (!this._queue.length) {
            if (!this.idling) {
                this.idling = true;
                this.emit('idle');
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
                try {
                } catch (E) {
                    this.logger.error(
                        {
                            err: E,
                        },
                        E.message
                    );
                }
                connection.queueEntry = false;
            }
        });
    }
    _createConnection() {
        let connection = new PoolResource(this);
        connection.id = ++this._connectionCounter;
        this.logger.info(
            {
                tnx: 'pool',
            },
        );

        connection.on('available', () => {
            this.logger.debug(
            );
        });
        connection.once('error', err => {
            if (connection.queueEntry) {
                } catch (E) {
                    this.logger.error(
                        'Callback error for #%s: %s',
                    );
                }
                connection.queueEntry = false;
            }
        });
        connection.once('close', () => {
            this.logger.info(
                {
                    cid: connection.id,
                },
            );
            if (connection.queueEntry) {
            } else {
            }
        });
    }
    _shouldRequeuOnConnectionClose(queueEntry) {
        if (this.options.maxRequeues === undefined || this.options.maxRequeues < 0) {
            return true;
        }
        return queueEntry.requeueAttempts < this.options.maxRequeues;
    }
}
