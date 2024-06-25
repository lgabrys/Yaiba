module.exports = function starttls(socket, options, cb) {
    var sslcontext = require('crypto').createCredentials(options),
        pair = require('tls').createSecurePair(sslcontext, false),
        cleartext = pipe(pair, socket);
    pair.on('secure', function() {
        var verifyError = !pair._ssl || pair._ssl.verifyError();
    });
};
