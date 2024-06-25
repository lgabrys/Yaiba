    tls     = require('tls'),
var startTLS = function () {
    var plaintext = tls.connect({
        socket: this.socksSocket,
        rejectUnauthorized: this.remote_options.rejectUnauthorized
    });
};
