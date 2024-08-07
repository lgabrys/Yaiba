'use strict';

const retrieveBSON = require('./connection/utils').retrieveBSON,
  ReadPreference = require('./topologies/read_preference'),
  BSON = retrieveBSON(),
  Binary = BSON.Binary,
  uuidV4 = require('./utils').uuidV4;

/**
 *
 */
class ClientSession {
  constructor(topology, sessionPool, options) {
    if (topology == null) {
      throw new Error('ClientSession requires a topology');
    }

    if (sessionPool == null || !(sessionPool instanceof ServerSessionPool)) {
      throw new Error('ClientSession requires a ServerSessionPool');
    }

    this.topology = topology;
    this.sessionPool = sessionPool;
    this.hasEnded = false;
    this.serverSession = sessionPool.acquire();

    options = options || {};
    if (typeof options.initialClusterTime !== 'undefined') {
      this.clusterTime = options.initialClusterTime;
    }
  }

  /**
   *
   */
  endSession(callback) {
    if (this.hasEnded) {
      if (typeof callback === 'function') callback(null, null);
      return;
    }

    // TODO:
    //   When connected to a sharded cluster the endSessions command
    //   can be sent to any mongos. When connected to a replica set the
    //   endSessions command MUST be sent to the primary if the primary
    //   is available, otherwise it MUST be sent to any available secondary.
    //   Is it enough to use: ReadPreference.primaryPreferred ?
    if (this.topology.isConnected()) {
      this.topology.command(
        'admin.$cmd',
        { endSessions: 1, ids: [this.id] },
        { readPreference: ReadPreference.primaryPreferred },
        () => {
          // intentionally ignored, per spec
        }
      );
    }

    this.hasEnded = true;

    // release the server session back to the pool
    this.sessionPool.release(this.serverSession);

    // spec indicates that we should ignore all errors for `endSessions`
    if (typeof callback === 'function') callback(null, null);
  }
}

Object.defineProperty(ClientSession.prototype, 'id', {
  get: function() {
    return this.serverSession.id;
  }
});

/**
 *
 */
class ServerSession {
  constructor() {
    this.id = { id: new Binary(uuidV4(), Binary.SUBTYPE_UUID) };
    this.lastUse = Date.now();
  }

  /**
   *
   * @param {*} sessionTimeoutMinutes
   */
  hasTimedOut(sessionTimeoutMinutes) {
    // Take the difference of the lastUse timestamp and now, which will result in a value in
    // milliseconds, and then convert milliseconds to minutes to compare to `sessionTimeoutMinutes`
    const idleTimeMinutes = Math.round(
      (((Date.now() - this.lastUse) % 86400000) % 3600000) / 60000
    );

    return idleTimeMinutes > sessionTimeoutMinutes - 1;
  }
}

/**
 *
 */
class ServerSessionPool {
  constructor(topology) {
    if (topology == null) {
      throw new Error('ServerSessionPool requires a topology');
    }

    this.topology = topology;
    this.sessions = [];
  }

  /**
   * @returns {ServerSession}
   */
  acquire() {
    const sessionTimeoutMinutes = this.topology.logicalSessionTimeoutMinutes;
    while (this.sessions.length) {
      const session = this.sessions.shift();
      if (!session.hasTimedOut(sessionTimeoutMinutes)) {
        return session;
      }
    }

    return new ServerSession();
  }

  /**
   *
   * @param {*} session
   */
  release(session) {
    const sessionTimeoutMinutes = this.topology.logicalSessionTimeoutMinutes;
    while (this.sessions.length) {
      const session = this.sessions[this.sessions.length - 1];
      if (session.hasTimedOut(sessionTimeoutMinutes)) {
        this.sessions.pop();
      } else {
        break;
      }
    }

    if (!session.hasTimedOut(sessionTimeoutMinutes)) {
      this.sessions.unshift(session);
    }
  }
}

module.exports = {
  ClientSession: ClientSession,
  ServerSession: ServerSession,
  ServerSessionPool: ServerSessionPool
};
