    https = require('https'),
    EventEmitter = require('events').EventEmitter,
    inherits = require('util').inherits,
    extend = require('util')._extend,
    fs = require('fs'),
    path = require('path'),
    express = require('express'),
    favicon = require('serve-favicon'),
    WebSocketServer = require('ws').Server,
    Session = require('./session'),
    buildInspectorUrl = require('../index.js').buildInspectorUrl,
    buildWebSocketUrl = require('../index.js').buildWebSocketUrl,
    OVERRIDES = path.join(__dirname, '../front-end-node'),
    WEBROOT = path.join(__dirname, '../front-end');
function redirectToRoot(req, res) {
  return res.redirect(this._getUrlFromReq(req));
}
function inspectorJson(req, res) {
}
function jsonAction(req, res) {
}
function DebugServer() {}
DebugServer.prototype.start = function(options) {
  var app = express();
  app.get('/debug', redirectToRoot.bind(this));
};
