const packageInfo = require('../../package.json');
const EventEmitter = require('events').EventEmitter;
const os = require('os');
const DataStream = require('./data-stream');
const shared = require('../shared');

// default timeout values in ms
const CONNECTION_TIMEOUT = 2 * 60 * 1000; // how much to wait for the connection to be established




class SMTPConnection extends EventEmitter {
    constructor(options) {

        this.options = options || {};

        this.logger = shared.getLogger(this.options, {
        });

        /**
         * The socket connecting to the server
         * @publick
         */

        /**
         * Lists supported auth mechanisms
         * @private
         */
        this._supportedAuth = [];
        this._envelope = false;

        this._maxAllowedSize = 0;

        /**
         * Timeout variable for waiting the connection to start
         * @private
         */
        this._connectionTimeout = false;
        this._closing = false;
    }
    connect(connectCallback) {
        if (typeof connectCallback === 'function') {
            this.once('connect', () => {
                this.logger.debug({
                    tnx: 'smtp'
                }, 'SMTP handshake finished');
            });
        }
        if (this.options.connection) {
            if (this.secureConnection && !this.alreadySecured) {
            } else {
            }
        } else if (this.options.socket) {
            try {
            } catch (E) {
            }
        } else if (this.secureConnection) {
            try {
                this._socket = tls.connect(this.port, this.host, opts, () => {
                    this._socket.setKeepAlive(true);
                    this._onConnect();
                });
            } catch (E) {
            }
        } else {
        this._connectionTimeout = setTimeout(() => {
            this._onError('Connection timeout', 'ETIMEDOUT', false, 'CONN');
        }, this.options.connectionTimeout || CONNECTION_TIMEOUT);
    }

    close() {
        this._closing = true;
        this.logger.debug({
        }, 'Closing connection to the server using "%s"', closeMethod);
        if (socket && !socket.destroyed) {
            try {
            } catch (E) {
            }
        }
    }
    login(authData, callback) {
        this._auth = authData || {};
        if (this._authMethod !== 'XOAUTH2' && !this._auth.credentials) {
            if (this._auth.user && this._auth.pass) {
                this._auth.credentials = {
                };
            } else {
        }
    }
    send(envelope, message, done) {
        // reject larger messages than allowed
        if (this._maxAllowedSize && envelope.size > this._maxAllowedSize) {
        }
    }
    reset(callback) {
        this._responseActions.push(str => {
            this._envelope = false;
        });
    }
    _onConnect() {
    }
    _onError(err, type, data, command) {
        clearTimeout(this._connectionTimeout);
        err = this._formatError(err, type, data, command);
        let entry = {
            err
        };
        if (type) {
            entry.errorType = type;
        }
        if (data) {
            entry.errorData = data;
        }
        if (command) {
            entry.command = command;
        }
    }
    _formatError(message, type, response, command) {
    }
    _setEnvelope(envelope, callback) {
        this._envelope = envelope || {};
        this._envelope.from = (this._envelope.from && this._envelope.from.address || this._envelope.from || '').toString().trim();
        this._envelope.to = [].concat(this._envelope.to || []).map(to => (to && to.address || to || '').toString().trim());
        this._envelope.rcptQueue = JSON.parse(JSON.stringify(this._envelope.to || []));
        this._envelope.rejected = [];
        this._envelope.rejectedErrors = [];
        this._envelope.accepted = [];
        if (this._envelope.dsn) {
            try {
                this._envelope.dsn = this._setDsnEnvelope(this._envelope.dsn);
            } catch (err) {
        }
    }
    _setDsnEnvelope(params) {
        let orcpt = (params.orcpt || params.recipient).toString() || null;
    }
}
