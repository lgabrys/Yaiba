var app = require('express')()
    , server = require('http').createServer(app)
    , io = require('socket.io').listen(server);
var clients = [];
io.sockets.on('connection', function (client) {
    client.on('sendNotification', function(data) {
        var recipient = getAllClientSockets(clients,data.recipient);
        console.log('clients', recipient);
    });
});
