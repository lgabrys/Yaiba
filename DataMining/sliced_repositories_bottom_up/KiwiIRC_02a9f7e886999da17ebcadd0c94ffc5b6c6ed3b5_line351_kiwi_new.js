var tls = require('tls'),
    net = require('net'),
    http = require('http'),
    fs = require('fs'),
    ws = require('socket.io'),
    _ = require('./lib/underscore.min.js'),
    starttls = require('./lib/starttls.js');
var config = JSON.parse(fs.readFileSync(__dirname+'/config.json', 'ascii'));
if (config.listen_ssl) {
    var io = ws.listen(config.port, {secure: true, key: fs.readFileSync(__dirname+'/'+config.ssl_key), cert: fs.readFileSync(__dirname+'/'+config.ssl_cert)});
} else {
    var io = ws.listen(config.port, {secure: false}
}
io.sockets.on('connection', function (websocket) {
    websocket.on('irc connect', function (nick, host, port, ssl, callback) {
        var ircSocket;
        if (!ssl) {
            ircSocket = net.createConnection(port, host);
        } else {
            ircSocket = tls.connect(port, host);
        }
        ircSocket.IRC = {options: {}, CAP: {negotiating: true, requested: [], enabled: []}};
        websocket.ircSocket = ircSocket;
        ircSocket.holdLast = false;
        ircSocket.held = '';
        ircSocket.IRC.nick = nick;
    });
    websocket.on('message', function (msg, callback) {
        try {
            msg.data = JSON.parse(msg.data);
            switch (msg.data.method) {
                websocket.sentQUIT = true;
            }
        } catch (e) {
    });
    websocket.on('disconnect', function () {
        if ((!websocket.sentQUIT) && (websocket.ircSocket)) {
            websocket.ircSocket.end('QUIT :' + config.quit_message + '\r\n');
        }
    });
});
