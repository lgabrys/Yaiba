'use strict';

const mock = require('mongodb-mock-server');
const { ObjectId, Timestamp, Binary } = require('bson');
const { Buffer } = require('safe-buffer');

class ReplSetFixture {
  constructor() {
    this.electionIds = [new ObjectId(), new ObjectId()];
  }

  setup(options) {
    options = options || {};
    const ismaster = options.ismaster ? options.ismaster : mock.DEFAULT_ISMASTER_36;

    return Promise.all([mock.createServer(), mock.createServer(), mock.createServer()]).then(
      servers => {
        this.servers = servers;
        this.primaryServer = servers[0];
        this.firstSecondaryServer = servers[1];
        this.arbiterServer = servers[2];

        this.defaultFields = Object.assign({}, ismaster, {
          __nodejs_mock_server__: true,
          setName: 'rs',
          setVersion: 1,
          electionId: this.electionIds[0],
          hosts: this.servers.map(server => server.uri()),
          arbiters: [this.arbiterServer.uri()]
        });

        this.defineReplSetStates();
        this.configureMessageHandlers();
      }
    );
  }

  defineReplSetStates() {
    this.primaryStates = [
      Object.assign({}, this.defaultFields, {
        ismaster: true,
        secondary: false,
        me: this.primaryServer.uri(),
        primary: this.primaryServer.uri(),
        tags: { loc: 'ny' }
      })
    ];

    this.firstSecondaryStates = [
      Object.assign({}, this.defaultFields, {
        ismaster: false,
        secondary: true,
        me: this.firstSecondaryServer.uri(),
        primary: this.primaryServer.uri(),
        tags: { loc: 'sf' }
      })
    ];

    this.arbiterStates = [
      Object.assign({}, this.defaultFields, {
        ismaster: false,
        secondary: false,
        arbiterOnly: true,
        me: this.arbiterServer.uri(),
        primary: this.primaryServer.uri()
      })
    ];
  }

  configureMessageHandlers() {
    this.primaryServer.setMessageHandler(request => {
      var doc = request.document;
      if (doc.ismaster) {
        request.reply(this.primaryStates[0]);
      }
    });

    this.firstSecondaryServer.setMessageHandler(request => {
      var doc = request.document;
      if (doc.ismaster) {
        request.reply(this.firstSecondaryStates[0]);
      }
    });

    this.arbiterServer.setMessageHandler(request => {
      var doc = request.document;
      if (doc.ismaster) {
        request.reply(this.arbiterStates[0]);
      }
    });
  }
}

class MongosFixture {
  setup(options) {
    options = options || {};
    const ismaster = options.ismaster ? options.ismaster : mock.DEFAULT_ISMASTER;
    return Promise.all([mock.createServer(), mock.createServer()]).then(servers => {
      this.servers = servers;
      this.defaultFields = Object.assign({}, ismaster, {
        msg: 'isdbgrid'
      });
    });
  }
}

/**
 * Creates a cluster time for use in unit testing cluster time gossiping and
 * causal consistency.
 *
 * @param {Number} time the logical time
 * @returns a cluster time according to the driver sessions specification
 */
function genClusterTime(time) {
  return {
    clusterTime: new Timestamp(time),
    signature: {
      hash: new Binary(Buffer.from('testing')),
      keyId: 42
    }
  };
}

function sessionCleanupHandler(session, sessionPool, done) {
  return err => {
    if (session == null) {
      sessionPool.endAllPooledSessions();
      done();
      return;
    }

    if (session.hasEnded) {
      sessionPool.endAllPooledSessions();
      done(err);
      return;
    }

    session.endSession(() => {
      sessionPool.endAllPooledSessions();
      done(err);
    });
  };
}

module.exports = {
  ReplSetFixture: ReplSetFixture,
  MongosFixture: MongosFixture,
  genClusterTime: genClusterTime,
  sessionCleanupHandler
};
