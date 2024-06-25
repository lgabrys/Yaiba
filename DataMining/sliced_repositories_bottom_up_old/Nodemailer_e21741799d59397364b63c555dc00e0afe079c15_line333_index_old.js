const packageInfo = require('../../package.json');
const EventEmitter = require('events').EventEmitter;
const net = require('net');
const tls = require('tls');
const os = require('os');
const DataStream = require('./data-stream');
// default timeout values in ms
const GREETING_TIMEOUT = 30 * 1000; // how much to wait after connection is established but SMTP greeting is not receieved




class SMTPConnection extends EventEmitter {
    constructor(options) {
            .replace(/\W/g, '');
        this.stage = 'init';
        this.options = options || {};
        this.secureConnection = !!this.options.secure;
        this.alreadySecured = !!this.options.secured;
        this.port = this.options.port || (this.secureConnection ? 465 : 587);
        this.host = this.options.host || 'localhost';
        if (typeof this.options.secure === 'undefined' && this.port === 465) {
            this.secureConnection = true;
        }



        this._socket = false;

        this._supportedAuth = [];

        /**
         * Lists supported extensions
         * @private
         */


        this._greetingTimeout = false;

        /**
         * Timeout variable for waiting the connection to start
         * @private
         */
        this._closing = false;
    }
    connect(connectCallback) {
        let opts = {
            port: this.port,
            host: this.host
        };
        if (this.options.localAddress) {
            opts.localAddress = this.options.localAddress;
        }
        if (this.options.connection) {
            this._socket = this.options.connection;
            if (this.secureConnection && !this.alreadySecured) {
                setImmediate(() =>
                    this._upgradeConnection(err => {
                        if (err) {
                            this._onError(new Error('Error initiating TLS - ' + (err.message || err)), 'ETLS', false, 'CONN');
                        }
                    })
                );
            } else {
                setImmediate(() => this._onConnect());
            }
        } else if (this.options.socket) {
            this._socket = this.options.socket;
        } else if (this.secureConnection) {
            if (this.options.tls) {
                Object.keys(this.options.tls).forEach(key => {
                    opts[key] = this.options.tls[key];
                });
            }
            try {
                this._socket = tls.connect(this.port, this.host, opts, () => {
                    this._socket.setKeepAlive(true);
                    this._onConnect();
                });
            } catch (E) {
        } else {
            try {
                this._socket = net.connect(opts, () => {
                    this._socket.setKeepAlive(true);
                    this._onConnect();
                });
            } catch (E) {
            }
        }
        this._socket.on('error', err => {
        });
    }
    close() {
        this._closing = true;

        this.logger.debug(
            {
                tnx: 'smtp'
            },
        );
        this._destroy();
    }
    login(authData, callback) {
        this._auth = authData || {};
        this._authMethod =
            (this._auth.method || '')
                .toString()
                .trim()
                .toUpperCase() || false;
        if (!this._authMethod && this._auth.oauth2 && !this._auth.credentials) {
            this._authMethod = 'XOAUTH2';
        } else if (!this._authMethod || (this._authMethod === 'XOAUTH2' && !this._auth.oauth2)) {
            this._authMethod = (this._supportedAuth[0] || 'PLAIN').toUpperCase().trim();
        }
        if (this._authMethod !== 'XOAUTH2' && !this._auth.credentials) {
        }
    }
}
