'use strict';
const packageInfo = require('../../package.json');
const EventEmitter = require('events').EventEmitter;
const net = require('net');
const tls = require('tls');
const os = require('os');
const crypto = require('crypto');
const DataStream = require('./data-stream');
const shared = require('../shared');
// default timeout values in ms
const SOCKET_TIMEOUT = 10 * 60 * 1000; // how much to wait for socket inactivity before disconnecting the client





class SMTPConnection extends EventEmitter {
    constructor(options) {
        this.id = crypto.randomBytes(8).toString('base64').replace(/\W/g, '');
        this.options = options || {};


        this.logger = shared.getLogger(this.options, {
        });


        this._socket = false;

        this._supportedAuth = [];
        /**
         * Set to true, if EHLO response includes "AUTH".
         * If false then authentication is not tried
         */
        this.allowsAuth = false;


        /**
         * Function queue to run if a data chunk comes from the server
         * @private
         */
    }
    connect(connectCallback) {
        if (typeof connectCallback === 'function') {
            this.once('connect', () => {
            });
            if (isDestroyedMessage) {
            }
        }
        let opts = {
            port: this.port,
            host: this.host
        };
        if (this.options.localAddress) {
            opts.localAddress = this.options.localAddress;
        }
        let setupConnectionHandlers = () => {
        };
        if (this.options.connection) {
            this._socket = this.options.connection;
            return;
        } else if (this.options.socket) {
            // socket object is set up but not yet connected
            this._socket = this.options.socket;
            return shared.resolveHostname(opts, (err, resolved) => {
                if (err) {
                    return setImmediate(() => this._onError(err, 'EDNS', false, 'CONN'));
                }
                this.logger.debug(
                    {
                        tnx: 'dns',
                        source: opts.host,
                        resolved: resolved.host,
                        cached: !!resolved.cached
                    },
                    'Resolved %s as %s [cache %s]',
                    opts.host,
                    resolved.host,
                    resolved.cached ? 'hit' : 'miss'
                );
                Object.keys(resolved).forEach(key => {
                    if (key.charAt(0) !== '_' && resolved[key]) {
                        opts[key] = resolved[key];
                    }
                });
                try {
                    this._socket.connect(this.port, this.host, () => {
                        this._socket.setKeepAlive(true);
                        this._onConnect();
                    });
                    setupConnectionHandlers();
                } catch (E) {
                    return setImmediate(() => this._onError(E, 'ECONNECTION', false, 'CONN'));
                }
            });
        } else if (this.secureConnection) {
            if (this.options.tls) {
                Object.keys(this.options.tls).forEach(key => {
                    opts[key] = this.options.tls[key];
                });
            }
            return shared.resolveHostname(opts, (err, resolved) => {
                if (err) {
                    return setImmediate(() => this._onError(err, 'EDNS', false, 'CONN'));
                }
                this.logger.debug(
                    {
                        tnx: 'dns',
                        source: opts.host,
                        resolved: resolved.host,
                        cached: !!resolved.cached
                    },
                    'Resolved %s as %s [cache %s]',
                    opts.host,
                    resolved.host,
                    resolved.cached ? 'hit' : 'miss'
                );
                Object.keys(resolved).forEach(key => {
                    if (key.charAt(0) !== '_' && resolved[key]) {
                        opts[key] = resolved[key];
                    }
                });
                try {
                    this._socket = tls.connect(opts, () => {
                        this._socket.setKeepAlive(true);
                        this._onConnect();
                    });
                    setupConnectionHandlers();
                } catch (E) {
                    return setImmediate(() => this._onError(E, 'ECONNECTION', false, 'CONN'));
                }
            });
        } else {
            return shared.resolveHostname(opts, (err, resolved) => {
                if (err) {
                    return setImmediate(() => this._onError(err, 'EDNS', false, 'CONN'));
                }
                this.logger.debug(
                    {
                        tnx: 'dns',
                        source: opts.host,
                        resolved: resolved.host,
                        cached: !!resolved.cached
                    },
                    'Resolved %s as %s [cache %s]',
                    opts.host,
                    resolved.host,
                    resolved.cached ? 'hit' : 'miss'
                );
                Object.keys(resolved).forEach(key => {
                    if (key.charAt(0) !== '_' && resolved[key]) {
                        opts[key] = resolved[key];
                    }
                });
                try {
                    this._socket = net.connect(opts, () => {
                        this._socket.setKeepAlive(true);
                        this._onConnect();
                    });
                    setupConnectionHandlers();
                } catch (E) {
                    return setImmediate(() => this._onError(E, 'ECONNECTION', false, 'CONN'));
                }
            });
        }
    }
    close() {
        // allow to run this function only once
        if (socket && !socket.destroyed) {
            try {
            } catch (E) {
        }
    }
    login(authData, callback) {
        this._auth = authData || {};
        this._authMethod = (this._auth.method || '').toString().trim().toUpperCase() || false;
        if (!this._authMethod && this._auth.oauth2 && !this._auth.credentials) {
            this._authMethod = 'XOAUTH2';
        } else if (!this._authMethod || (this._authMethod === 'XOAUTH2' && !this._auth.oauth2)) {
            this._authMethod = (this._supportedAuth[0] || 'PLAIN').toUpperCase().trim();
        }
        if (this._authMethod !== 'XOAUTH2' && (!this._auth.credentials || !this._auth.credentials.user || !this._auth.credentials.pass)) {
            if (this._auth.user && this._auth.pass) {
                this._auth.credentials = {
                };
            } else {
        }
        if (this.customAuth.has(this._authMethod)) {
            let resolve = () => {
                this.authenticated = true;
            };
            let handlerResponse = handler({
                sendCommand: (cmd, done) => {
                    let promise;
                    if (!done) {
                        promise = new Promise((resolve, reject) => {
                        });
                    }
                },
            });
        }
        switch (this._authMethod) {
                this._sendCommand(
                        Buffer.from(
                                '\u0000' +
                        ).toString('base64')
                );
        }
    }
    /**
     * Resets connection state
     *
     * @param {Function} callback Callback to return once connection is reset
     */
    _upgradeConnection(callback) {
        let opts = {
            socket: this._socket,
            host: this.host
        };
        Object.keys(this.options.tls || {}).forEach(key => {
            opts[key] = this.options.tls[key];
        });
        try {
            this._socket = tls.connect(opts, () => {
                this.secure = true;
                this.upgrading = false;
                this._socket.on('data', this._onSocketData);

                socketPlain.removeListener('close', this._onSocketClose);
                socketPlain.removeListener('end', this._onSocketEnd);

                return callback(null, true);
            });
        } catch (err) {
    }
    _setDsnEnvelope(params) {
        let orcpt = (params.recipient || params.orcpt || '').toString() || null;
    }
}
