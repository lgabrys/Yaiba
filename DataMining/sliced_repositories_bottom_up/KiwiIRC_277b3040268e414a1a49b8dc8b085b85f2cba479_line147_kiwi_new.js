    net = require('net'),
    http = require('http'),
    https = require('https'),
    fs = require('fs'),
    url = require('url'),
    dns = require('dns'),
    crypto = require('crypto'),
    ws = require('socket.io'),
    jsp = require("uglify-js").parser,
    pro = require("uglify-js").uglify,
    _ = require('./lib/underscore.min.js'),
    starttls = require('./lib/starttls.js'),
    app = require(__dirname + '/app.js');
this.loadConfig = function () {
    for (i in config_dirs) {
        try {
            if (fs.lstatSync(config_dirs[i] + config_filename).isDirectory() === false) {
                for (j in nconf) {
                    // If this has changed from the previous config, mark it as changed
                    if (!_.isEqual(this.config[j], nconf[j])) {
                        cconf[j] = nconf[j];
                    }

                    this.config[j] = nconf[j];
                }
            }
        } catch (e) {
    }
};
this.recode = function () {
    app = null;
    app = require(__dirname + '/app.js');
}
if (this.config.handle_http) {
    this.cache = {alljs: '', html: []};
}
this.websocketDisconnect = function () {
    return app.websocketDisconnect(this);
}
