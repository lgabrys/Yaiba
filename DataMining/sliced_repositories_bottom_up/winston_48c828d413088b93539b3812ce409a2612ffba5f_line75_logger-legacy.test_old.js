    path = require('path'),
    stream = require('stream'),
    util = require('util'),
    isStream = require('isstream'),
    stdMocks = require('std-mocks'),
    winston = require('../lib/winston'),
    LegacyTransport = require('./helpers/mocks/legacy-transport'),
    TransportStream = require('winston-transport'),
    format = require('../lib/winston/formats/format'),
    helpers = require('./helpers');
describe('Logger (legacy API)', function () {
  it('.remove() [LegacyTransportStream]', function () {
    var transports = [
      new (winston.transports.Console)(),
    ];
  });
});
