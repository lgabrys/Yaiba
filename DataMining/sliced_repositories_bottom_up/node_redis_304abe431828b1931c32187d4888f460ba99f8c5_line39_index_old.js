var util = require('util');
var events = require('events');
function RedisClient(stream, options) {
    options = JSON.parse(JSON.stringify(options));
}
