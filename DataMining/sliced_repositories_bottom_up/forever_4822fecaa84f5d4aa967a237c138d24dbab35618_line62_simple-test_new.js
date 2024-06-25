    vows = require('vows'),
    nssocket = require('nssocket'),
    macros = require('../helpers/macros'),

vows.describe('forever/worker/simple').addBatch({
  'When using forever worker': {
    'and starting it and pinging it': macros.assertWorkerConnected({
    }, {
      'and respond to pings': {
        topic: function (reader) {
          reader.send(['ping']);
        },
        'with `pong`': function () {}
      },
      'and when quickly sending data and disconnecting': {
        topic: function(reader) {
          var self = this;
          var reader2 = new nssocket.NsSocket();
          reader2.connect(reader.host, function() {
            self.callback();
          });
        },
      }
    })
  }
}).export(module);
