var Connection = require('./connection').Connection,
  DbCommand = require('../commands/db_command').DbCommand,
  MongoReply = require('../responses/mongo_reply').MongoReply,
  debug = require('util').debug,
  SimpleEmitter = require('./simple_emitter').SimpleEmitter,
  inherits = require('util').inherits,
  inspect = require('util').inspect,
  Server = require('./server').Server,
  PingStrategy = require('./strategies/ping_strategy').PingStrategy,
  StatisticsStrategy = require('./strategies/statistics_strategy').StatisticsStrategy;

const STATE_STARTING_PHASE_1 = 0;
const STATE_PRIMARY = 1;
const STATE_SECONDARY = 2;
const STATE_RECOVERING = 3;
const STATE_FATAL_ERROR = 4;
const STATE_STARTING_PHASE_2 = 5;
const STATE_UNKNOWN = 6;
const STATE_ARBITER = 7;
const STATE_DOWN = 8;
const STATE_ROLLBACK = 9;

/**
* ReplSetServers constructor provides master-slave functionality
*
* @param serverArr{Array of type Server}
* @return constructor of ServerCluster
*
*/
var ReplSetServers = exports.ReplSetServers = function(servers, options) {
  var self = this;
  // Contains the master server entry
  this.options = options == null ? {} : options;
  this.reconnectWait = this.options["reconnectWait"] != null ? this.options["reconnectWait"] : 1000;
  this.retries = this.options["retries"] != null ? this.options["retries"] : 30;
  this.replicaSet = this.options["rs_name"];

  // Are we allowing reads from secondaries ?
  this.readSecondary = this.options["read_secondary"];
  this.slaveOk = true;
  this.closedConnectionCount = 0;
  
  // Tells the driver if we need to restart Replicaset connections due to changes
  this.replicaSetCheckInterval = this.options["replicaSetCheckInterval"] != null ? this.options["replicaSetCheckInterval"] : 1000;
  this.replicaSetChanged = false;

  // Default poolSize for new server instances
  this.poolSize = this.options.poolSize == null ? 1 : this.options.poolSize;

  // Set up ssl connections
  this.ssl = this.options.ssl == null ? false : this.options.ssl;

  // Just keeps list of events we allow
  this.eventHandlers = {error:[], parseError:[], poolReady:[], message:[], close:[], timeout:[]};
  // Internal state of server connection
  this._serverState = 'disconnected';
  // Read preference
  this._readPreference = null;
  // Do we record server stats or not
  this.recordQueryStats = false;
    
  // Get the readPreference
  var readPreference = options['readPreference'];  
  // Read preference setting
  if(readPreference != null) {
    if(readPreference != Server.READ_PRIMARY && readPreference != Server.READ_SECONDARY_ONLY
      && readPreference != Server.READ_SECONDARY) {
        throw new Error("Illegal readPreference mode specified, " + readPreference);
    }
    
    // Set read Preference
    this._readPreference = readPreference;
  } else {
    this._readPreference = null;        
  }
  
  // Strategy for picking a secondary
  this.strategy = this.options['strategy'] == null ? 'statistical' : this.options['strategy'];  
  // Make sure strategy is one of the two allowed
  if(this.strategy != null && (this.strategy != 'ping' && this.strategy != 'statistical')) throw new Error("Only ping or statistical strategies allowed");  
  // Let's set up our strategy object for picking secodaries
  if(this.strategy == 'ping') {
    // Create a new instance
    this.strategyInstance = new PingStrategy(this);
  } else if(this.strategy == 'statistical') {
    // Set strategy as statistical
    this.strategyInstance = new StatisticsStrategy(this);
    // Add enable query information
    this.enableRecordQueryStats(true);
  }  
  
  // Set default connection pool options
  this.socketOptions = this.options.socketOptions != null ? this.options.socketOptions : {};  

  // Set up logger if any set
  this.logger = this.options.logger != null 
    && (typeof this.options.logger.debug == 'function') 
    && (typeof this.options.logger.error == 'function') 
    && (typeof this.options.logger.debug == 'function') 
      ? this.options.logger : {error:function(message, object) {}, log:function(message, object) {}, debug:function(message, object) {}};
  
  // Ensure all the instances are of type server and auto_reconnect is false
  if(!Array.isArray(servers) || servers.length == 0) {
    throw Error("The parameter must be an array of servers and contain at least one server");
  } else if(Array.isArray(servers) || servers.length > 0) {
    var count = 0;
    servers.forEach(function(server) {
      if(server instanceof Server) count = count + 1;
      // Ensure no server has reconnect on
      server.options.auto_reconnect = false;
    });

    if(count < servers.length) {
      throw Error("All server entries must be of type Server");
    } else {
      this.servers = servers;
    }
  }
  
  // Auto Reconnect property
  Object.defineProperty(this, "autoReconnect", { enumerable: true
    , get: function () {
        return true;
      }
  });

  // Get Read Preference method
  Object.defineProperty(this, "readPreference", { enumerable: true
    , get: function () {
        if(this._readPreference == null && this.readSecondary) {
          return Server.READ_SECONDARY;
        } else if(this._readPreference == null && !this.readSecondary) {
          return Server.READ_PRIMARY;
        } else {
          return this._readPreference;
        }
      }
  });  

  // Db Instances
  Object.defineProperty(this, "dbInstances", {enumerable:true
    , get: function() {
      var servers = this.allServerInstances();
      return servers[0].dbInstances;
    }
  })

  // Auto Reconnect property
  Object.defineProperty(this, "host", { enumerable: true
    , get: function () {
        if (this.primary != null) return this.primary.host;
      }
  });

  Object.defineProperty(this, "port", { enumerable: true
    , get: function () {
        if (this.primary != null) return this.primary.port;
      }
  });

  Object.defineProperty(this, "read", { enumerable: true
    , get: function () {
        return this.secondaries.length > 0 ? this.secondaries[0] : null;
      }
  });


  // Get list of secondaries
  Object.defineProperty(this, "secondaries", {enumerable: true
    , get: function() {              
        var keys = Object.keys(this._state.secondaries);
        var array = new Array(keys.length);
        // Convert secondaries to array
        for(var i = 0; i < keys.length; i++) {
          array[i] = this._state.secondaries[keys[i]];
        }
        return array;
      }
  });

  // Get list of all secondaries including passives
  Object.defineProperty(this, "allSecondaries", {enumerable: true
    , get: function() {              
        return this.secondaries.concat(this.passives);
      }
  });
  
  // Get list of arbiters
  Object.defineProperty(this, "arbiters", {enumerable: true
    , get: function() {
        var keys = Object.keys(this._state.arbiters);
        var array = new Array(keys.length);
        // Convert arbiters to array
        for(var i = 0; i < keys.length; i++) {
          array[i] = this._state.arbiters[keys[i]];
        }
        return array;
      }
  });

  // Get list of passives
  Object.defineProperty(this, "passives", {enumerable: true
    , get: function() {
        var keys = Object.keys(this._state.passives);
        var array = new Array(keys.length);
        // Convert arbiters to array
        for(var i = 0; i < keys.length; i++) {
          array[i] = this._state.passives[keys[i]];
        }
        return array;
      }
  });

  // Master connection property
  Object.defineProperty(this, "primary", { enumerable: true
    , get: function () {
        return this._state != null ? this._state.master : null;
      }
  });
};

inherits(ReplSetServers, SimpleEmitter);

// Allow setting the read preference at the replicaset level
ReplSetServers.prototype.setReadPreference = function(preference) {
  // Set read preference
  this._readPreference = preference;
  // Ensure slaveOk is correct for secodnaries read preference and tags
  if((this._readPreference == Server.READ_SECONDARY || this._readPreference == Server.READ_SECONDARY_ONLY) 
    || (this._readPreference != null && typeof this._readPreference == 'object')) {
    this.slaveOk = true;
  }
}

ReplSetServers.prototype.setTarget = function(target) {
  this.target = target;
};

ReplSetServers.prototype.isReconnecting = function() {
  // console.log("============================================= isReconnecting :: " + this._serverState)
  return this._serverState == 'connecting';
}

ReplSetServers.prototype.isConnected = function() {
  // console.log("============================================================== ReplSetServers.prototype.isConnected");
  //replSetSelf._state = {'master':null, 'secondaries':{}, 'arbiters':{}, 'passives':{}, 'errors':{}, 'addresses':{}, 'byTags':{}, 'setName':null, 'errorMessages':[], 'members':[]};
  // console.dir(this._state)
  // console.log("this.primary != null :: " + (this.primary != null));
  // console.log("this._state.master != null :: " + (this._state.master != null));
  // console.log("this._state.master.isConnected() :: " + this._state.master != null ? this._state.master.isConnected() : false);
  // console.log("this.replicaSetChanged :: " + this.replicaSetChanged);
  // if(this._state != null) {
  //   console.log("secondaries.length = " + Object.keys(this._state.secondaries).length);    
  //   console.log("arbiters.length = " + Object.keys(this._state.arbiters).length);    
  //   console.log("passives.length = " + Object.keys(this._state.passives).length);    
  // }
  // 
  // console.log("------------------------------------------ replicaset 0")
  // console.dir( this.primary != null && this._state.master != null && this._state.master.isConnected() && !this.replicaSetChanged);
  // console.log("------------------------------------------ replicaset 1")  
  
  // Return the state of the replicaset server
  return this.primary != null && this._state.master != null && this._state.master.isConnected() && !this.replicaSetChanged;
}

ReplSetServers.prototype.isPrimary = function(config) {
  return this.readSecondary && this.secondaries.length > 0 ? false : true;
}

ReplSetServers.prototype.isReadPrimary = ReplSetServers.prototype.isPrimary;

// Clean up dead connections
var cleanupConnections = ReplSetServers.cleanupConnections = function(connections, addresses, byTags) {
  // Ensure we don't have entries in our set with dead connections
  var keys = Object.keys(connections);
  for(var i = 0; i < keys.length; i++) {
    var server = connections[keys[i]];
    // If it's not connected remove it from the list
    if(!server.isConnected()) {
      // Remove from connections and addresses
      delete connections[keys[i]];
      delete addresses[keys[i]];
      // Clean up tags if needed
      if(server.tags != null && typeof server.tags === 'object') {
        cleanupTags(server, byTags);
      }
    }
  }  
}

var cleanupTags = ReplSetServers._cleanupTags = function(server, byTags) {
  var serverTagKeys = Object.keys(server.tags);
  // Iterate over all server tags and remove any instances for that tag that matches the current
  // server
  for(var i = 0; i < serverTagKeys.length; i++) {
    // Fetch the value for the tag key
    var value = server.tags[serverTagKeys[i]];

    // If we got an instance of the server
    if(byTags[serverTagKeys[i]] != null 
      && byTags[serverTagKeys[i]][value] != null  
      && Array.isArray(byTags[serverTagKeys[i]][value])) {
      // List of clean servers
      var cleanInstances = [];
      // We got instances for the particular tag set
      var instances = byTags[serverTagKeys[i]][value];
      for(var j = 0; j < instances.length; j++) {
        var serverInstance = instances[j];              
        // If we did not find an instance add it to the clean instances
        if((serverInstance.host + ":" + serverInstance.port) !== (server.host + ":" + server.port)) {
          cleanInstances.push(serverInstance);
        }
      }
      
      // Update the byTags list
      byTags[serverTagKeys[i]][value] = cleanInstances;
    }
  }
}

ReplSetServers.prototype.allServerInstances = function() {
  var self = this;
  // Close all the servers (concatenate entire list of servers first for ease)
  var allServers = self._state.master != null ? [self._state.master] : [];

  // Secondary keys
  var keys = Object.keys(self._state.secondaries);
  // Add all secondaries
  for(var i = 0; i < keys.length; i++) {
    allServers.push(self._state.secondaries[keys[i]]);
  }

  // Arbiter keys
  var keys = Object.keys(self._state.arbiters);
  // Add all arbiters
  for(var i = 0; i < keys.length; i++) {
    allServers.push(self._state.arbiters[keys[i]]);
  }

  // Passive keys
  var keys = Object.keys(self._state.passives);
  // Add all arbiters
  for(var i = 0; i < keys.length; i++) {
    allServers.push(self._state.passives[keys[i]]);
  }

  // Return complete list of all servers
  return allServers;
}

// Ensure no callback is left hanging when we have an error
var __executeAllCallbacksWithError = function(dbInstance, error) {
  // console.log("====================================================================")
  // console.dir(dbInstance._mongodbHandlers)
  var keys = Object.keys(dbInstance._callBackStore._notReplied);
  // Iterate over all callbacks
  for(var i = 0; i < keys.length; i++) {
    // Delete info object
    delete dbInstance._callBackStore._notReplied[keys[i]];
    // Emit the error
    dbInstance._callBackStore.emit(keys[i], error);
    
    
    // var info = dbInstance._callBackStore._notReplied[keys[i]];
    // // Get callback
    // var _callback = dbInstance._callBackStore._mongodbCallbacks[keys[i]];
    // // Cleanup
    // delete dbInstance._callBackStore._notReplied[keys[i]];
    // delete dbInstance._callBackStore._mongodbCallbacks[keys[i]];
    // Perform callback in next Tick
    // _callback(error, null);                        
  }
}

ReplSetServers.prototype.connect = function(parent, options, callback) {
  // console.log("########################################################## connect :: 0")
  var self = this;
  var dateStamp = new Date().getTime();
  if('function' === typeof options) callback = options, options = {};  
  if(options == null) options = {};
  if(!('function' === typeof callback)) callback = null;
  
  // Keep reference to parent
  this.db = parent;
  // Set server state to connecting
  this._serverState = 'connecting';
  // No change of the replicaset
  this.replicaSetChanged = false;
  // console.log("########################################################## connect :: 1")

  // // Replicaset check state frequency
  // var replicasetCheckFrequencey = this.replicaSetCheckInterval;
  // // Just set up timer checking the state of the replicaset
  // var checkStateOfReplicasetFunction = function() {
  //   console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% checkStateOfReplicasetFunction :: 0")
  //   if(self._serverState == 'disconnected') return;
  //   // If we have a valid master connection let's attempt to perform a query to get the status of
  //   // The replicaset server
  //   var connection = self.checkoutWriter();
  //   
  //   console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% checkStateOfReplicasetFunction :: 1")
  //   // If we have a connection
  //   if(connection != null) {
  //     console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% checkStateOfReplicasetFunction :: 2")
  //     self.db.admin().command({replSetGetStatus:1}, {connection:connection}, function(err, result) {
  //       console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% checkStateOfReplicasetFunction :: 3")
  //       // If no error let's look at the members
  //       if(err == null) {
  //         // For all members check if we have the same ones in the current set
  //         var members = result.documents[0].members;
  //         // Peform a set of check to see if the replicaset has changed
  //         if(self._state.addresses != null && Object.keys(self._state.addresses).length != members.length) {
  //           // We have changed update replicaset object to restart connections
  //           self.replicaSetChanged = true;
  //         } else {
  //           // We need to dig a bit deeper and check if the roles of different servers have changed            
  //           // Located members must have the same setup (being secondary etc) for it to be equivalent
  //           var numberOfFoundMembersWithSameSetup = 0;
  // 
  //           // Check for the member to see if it's anywhere
  //           for(var i = 0; i < members.length; i++) {              
  //             // Get member
  //             var member = members[i];
  //             // If it's a primary check that is a primary in the current set aswell
  //             if(member.state == STATE_PRIMARY && self._state.master != null && (self._state.master.host + ":" + self._state.master.port) == member.name) {
  //               numberOfFoundMembersWithSameSetup = numberOfFoundMembersWithSameSetup + 1;
  //             } else if(member.state == STATE_SECONDARY && (self._state.secondaries[member.name] != null || self._state.passives[member.name] != null)) {
  //               numberOfFoundMembersWithSameSetup = numberOfFoundMembersWithSameSetup + 1;                
  //             } else if(member.state == STATE_ARBITER && self._state.arbiters[member.name] != null) {
  //               numberOfFoundMembersWithSameSetup = numberOfFoundMembersWithSameSetup + 1;                
  //             }              
  //           }
  //                       
  //           if(numberOfFoundMembersWithSameSetup != members.length) {
  //             // We have changed update replicaset object to restart connections
  //             self.replicaSetChanged = true;
  //           } else {
  //             setTimeout(checkStateOfReplicasetFunction, replicasetCheckFrequencey);
  //           }
  //         }                    
  //       } else {
  //         setTimeout(checkStateOfReplicasetFunction, replicasetCheckFrequencey);
  //       }
  //     })
  //   } else {
  //     setTimeout(checkStateOfReplicasetFunction, replicasetCheckFrequencey);
  //   }
  // }
  // 
  // console.log("########################################################## connect :: 2")
  // // Start timeout
  // setTimeout(checkStateOfReplicasetFunction, replicasetCheckFrequencey);
  // console.log("########################################################## connect :: 3")

  // Reference to the instance
  var replSetSelf = this;
  var serverConnections = this.servers;
  // Ensure parent can do a slave query if it's set
  parent.slaveOk = this.slaveOk ? this.slaveOk : parent.slaveOk;
  // Number of total servers that need to initialized (known servers)
  var numberOfServersLeftToInitialize = serverConnections.length;

  // Clean up state
  replSetSelf._state = {'master':null, 'secondaries':{}, 'arbiters':{}, 'passives':{}, 'errors':{}, 'addresses':{}, 'byTags':{}, 'setName':null, 'errorMessages':[], 'members':[]};
  // console.log("########################################################## connect :: 4")

  // Create a connection handler
  var connectionHandler = function(instanceServer) {
    return function(err, result) {
      // console.log("########################################################## connect handler :: 0")
      // Don't attempt to connect if we are done
      // if(replSetSelf._serverState === 'disconnected') return;
      // Remove a server from the list of intialized servers we need to perform
      numberOfServersLeftToInitialize = numberOfServersLeftToInitialize - 1;
      // Add enable query information
      instanceServer.enableRecordQueryStats(replSetSelf.recordQueryStats);
      
      if(err == null && result.documents[0].hosts != null) {
        // Fetch the isMaster command result
        var document = result.documents[0];
        // Break out the results
        var setName = document.setName;
        var isMaster = document.ismaster;
        var secondary = document.secondary;
        var passive = document.passive;
        var arbiterOnly = document.arbiterOnly;
        var hosts = Array.isArray(document.hosts) ? document.hosts : [];
        var arbiters = Array.isArray(document.arbiters) ? document.arbiters : [];
        var passives = Array.isArray(document.passives) ? document.passives : [];
        var tags = document.tags ? document.tags : {};
        var primary = document.primary;
        var me = document.me;
                
        // Only add server to our internal list if it's a master, secondary or arbiter
        if(isMaster == true || secondary == true || arbiterOnly == true) {
          // console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ CLOSE")
          // console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ CLOSE")
          // console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ CLOSE")
          // Handle a closed connection
          var closeHandler = function(err, server) {
            // console.log("=============================================================== CLOSE handler")
            parent._state = 'disconnected';
            // console.dir(server);
            if(replSetSelf._serverState == 'connected') {
              // Shut down the replicaset for now and Fire off all the callbacks sitting with no reply
              replSetSelf.close(function() {
                __executeAllCallbacksWithError(parent, new Error("connection closed"));        
                // Emit error
                parent.emit("close", new Error("connection closed"));
              });              
            }
          }

          // Handle a connection timeout
          var timeoutHandler = function(err, server) {
            // console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ TIMEOUT")
            // console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ TIMEOUT")
            // console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ TIMEOUT")
            parent._state = 'disconnected';
            // Shut down the replicaset for now and Fire off all the callbacks sitting with no reply
            if(replSetSelf._serverState == 'connected') {
              replSetSelf.close(function() {
                __executeAllCallbacksWithError(parent, new Error("connection timed out"));
                // Emit error
                parent.emit("timeout", new Error("connection timed out"));
              });          
            }
          }

          // Handle an error
          var errorHandler = function(err, server) {
            // console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ERROR")
            // console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ERROR")
            // console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ERROR")
            parent._state = 'disconnected';
            // Shut down the replicaset for now and Fire off all the callbacks sitting with no reply
            if(replSetSelf._serverState == 'connected') {
              replSetSelf.close(function() {
                __executeAllCallbacksWithError(parent, err);
                // Emit error
                parent.emit("error", err);
              });
            }
          }
          
          // Ensure we don't have duplicate handlers
          instanceServer.removeAllListeners("close");
          instanceServer.removeAllListeners("error");
          instanceServer.removeAllListeners("timeout");

          // Add error handler to the instance of the server
          instanceServer.on("close", closeHandler);
          // Add error handler to the instance of the server
          instanceServer.on("error", errorHandler);
          // instanceServer.on("timeout", errorHandler);
          instanceServer.on("timeout", timeoutHandler);
          // Add tag info
          instanceServer.tags = tags;

          // For each tag in tags let's add the instance Server to the list for that tag
          if(tags != null && typeof tags === 'object') {
            var tagKeys = Object.keys(tags);
            // For each tag file in the server add it to byTags
            for(var i = 0; i < tagKeys.length; i++) {
              var value = tags[tagKeys[i]];
              // Check if we have a top level tag object
              if(replSetSelf._state.byTags[tagKeys[i]] == null) replSetSelf._state.byTags[tagKeys[i]] = {};
              // For the value check if we have an array of server instances
              if(!Array.isArray(replSetSelf._state.byTags[tagKeys[i]][value])) replSetSelf._state.byTags[tagKeys[i]][value] = [];
              // Check that the instance is not already registered there
              var valueArray = replSetSelf._state.byTags[tagKeys[i]][value];            
              var found = false;

              // Iterate over all values
              for(var j = 0; j < valueArray.length; j++) {
                if(valueArray[j].host == instanceServer.host && valueArray[j].port == instanceServer.port) {
                  found = true;
                  break;
                }
              }

              // If it was not found push the instance server to the list
              if(!found) valueArray.push(instanceServer);
            }
          }

          // Remove from error list
          delete replSetSelf._state.errors[me];

          // Add our server to the list of finished servers
          replSetSelf._state.addresses[me] = instanceServer;

          // Assign the set name
          if(replSetSelf.replicaSet == null) {
            replSetSelf._state.setName = setName;          
          } else if(replSetSelf.replicaSet != setName && replSetSelf._serverState != 'disconnected') {
            replSetSelf._state.errorMessages.push(new Error("configured mongodb replicaset does not match provided replicaset [" + setName + "] != [" + replSetSelf.replicaSet + "]"));
            // Set done
            replSetSelf._serverState = 'disconnected';
            // ensure no callbacks get called twice
            var internalCallback = callback;
            callback = null;
            // Return error message ignoring rest of calls
            return internalCallback(replSetSelf._state.errorMessages[0], parent);
          }

          // Let's add the server to our list of server types
          if(secondary == true && (passive == false || passive == null)) {
            replSetSelf._state.secondaries[me] = instanceServer;
          } else if(arbiterOnly == true) {
            replSetSelf._state.arbiters[me] = instanceServer;
          } else if(secondary == true && passive == true) {
            replSetSelf._state.passives[me] = instanceServer;
          } else if(isMaster == true) {
            replSetSelf._state.master = instanceServer;
          } else if(isMaster == false && primary != null && replSetSelf._state.addresses[primary]) {
            replSetSelf._state.master = replSetSelf._state.addresses[primary];
          }

          // Let's go throught all the "possible" servers in the replicaset
          var candidateServers = hosts.concat(arbiters).concat(passives);        

          // If we have new servers let's add them
          for(var i = 0; i < candidateServers.length; i++) {
            // Fetch the server string
            var candidateServerString = candidateServers[i];        
            // Add the server if it's not defined
            if(replSetSelf._state.addresses[candidateServerString] == null) {            
              // Split the server string
              var parts = candidateServerString.split(/:/);
              if(parts.length == 1) {
                parts = [parts[0], Connection.DEFAULT_PORT];
              }

              // Default empty socket options object
              var socketOptions = {};
              // If a socket option object exists clone it
              if(replSetSelf.socketOptions != null) {
                var keys = Object.keys(replSetSelf.socketOptions);
                for(var i = 0; i < keys.length;i++) socketOptions[keys[i]] = replSetSelf.socketOptions[keys[i]];
              }

              // Add host information to socket options
              socketOptions['host'] = parts[0];
              socketOptions['port'] = parseInt(parts[1]);

              // Create a new server instance
              var newServer = new Server(parts[0], parseInt(parts[1]), {auto_reconnect:false, 'socketOptions':socketOptions
                              , logger:replSetSelf.logger, ssl:replSetSelf.ssl, poolSize:replSetSelf.poolSize});
              // Set the replicaset instance
              newServer.replicasetInstance = replSetSelf;              

              // Add handlers
              newServer.on("close", closeHandler);
              newServer.on("timeout", timeoutHandler);
              newServer.on("error", errorHandler);

              // Add server to list, ensuring we don't get a cascade of request to the same server
              replSetSelf._state.addresses[candidateServerString] = newServer;

              // Add a new server to the total number of servers that need to initialized before we are done
              numberOfServersLeftToInitialize = numberOfServersLeftToInitialize + 1;

              // Let's set up a new server instance
              newServer.connect(parent, {returnIsMasterResults: true, eventReceiver:newServer}, connectionHandler(newServer));
            }
          }          
        } else {
          // Remove the instance from out list of servers
          delete replSetSelf._state.addresses[me];
        }
      } else {
        // console.log("======================================================= CONNECTION ERROR");
        // console.dir(err);
        // Remove a server from the list of intialized servers we need to perform
        numberOfServersLeftToInitialize = numberOfServersLeftToInitialize - 1;        
      }
      
      // If done finish up
      if((numberOfServersLeftToInitialize == 0) && replSetSelf._serverState === 'connecting' && replSetSelf._state.errorMessages.length == 0) {
        // console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ 0")
        // Set db as connected
        replSetSelf._serverState = 'connected';
        // If we don't expect a master let's call back, otherwise we need a master before
        // the connection is successful
        if(replSetSelf.masterNotNeeded || replSetSelf._state.master != null) {
          // console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% 0")
          // If we have a read strategy boot it
          if(replSetSelf.strategyInstance != null) {
            // console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% 0:1")
            // Ensure we have a proper replicaset defined
            replSetSelf.strategyInstance.replicaset = replSetSelf;
            // Start strategy
            replSetSelf.strategyInstance.start(function(err) {
              // ensure no callbacks get called twice
              var internalCallback = callback;
              callback = null;
              // Perform callback
              internalCallback(null, parent);
            })
          } else {
            // console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% 0:2")
            // ensure no callbacks get called twice
            var internalCallback = callback;
            callback = null;
            // Perform callback
            internalCallback(null, parent);
          }
        } else if(replSetSelf.readSecondary == true && Object.keys(replSetSelf._state.secondaries).length > 0) {
          // console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% 1")
          // If we have a read strategy boot it
          if(replSetSelf.strategyInstance != null) {
            // console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% 1:1")
            // Ensure we have a proper replicaset defined
            replSetSelf.strategyInstance.replicaset = replSetSelf;
            // Start strategy
            replSetSelf.strategyInstance.start(function(err) {
              // ensure no callbacks get called twice
              var internalCallback = callback;
              callback = null;
              // Perform callback
              internalCallback(null, parent);
            })
          } else {
            // console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% 1:2")
            // ensure no callbacks get called twice
            var internalCallback = callback;
            callback = null;
            // Perform callback
            internalCallback(null, parent);
          }
        } else if(replSetSelf.readSecondary == true && Object.keys(replSetSelf._state.secondaries).length == 0) {          
          // console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% 2")
          replSetSelf._serverState = 'disconnected';
          // ensure no callbacks get called twice
          var internalCallback = callback;
          callback = null;
          // Force close all server instances
          replSetSelf.close();
          // Perform callback
          internalCallback(new Error("no secondary server found"), null);
        } else if(typeof callback === 'function'){
          // require('util').debug("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% 3");
          // require('util').debug(require('util').inspect(replSetSelf._state))
          // require('util').debug(require('util').inspect(callback))
          replSetSelf._serverState = 'disconnected';
          // ensure no callbacks get called twice
          var internalCallback = callback;
          callback = null;
          // Force close all server instances
          replSetSelf.close();
          // Perform callback
          internalCallback(new Error("no primary server found"), null);            
        }          
      } else if((numberOfServersLeftToInitialize == 0) && replSetSelf._state.errorMessages.length > 0 && replSetSelf._serverState != 'disconnected') {
        // console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ 1")
        // Set done
        replSetSelf._serverState = 'disconnected';
        // ensure no callbacks get called twice
        var internalCallback = callback;
        callback = null;
        // Force close all server instances
        replSetSelf.close();
        // Callback to signal we are done
        internalCallback(replSetSelf._state.errorMessages[0], null);          
      }
    }
  }
  
  // console.log("########################################################## connect :: 5")
  // Ensure we have all registered servers in our set
  for(var i = 0; i < serverConnections.length; i++) {    
    replSetSelf._state.addresses[serverConnections[i].host + ':' + serverConnections[i].port] = serverConnections[i];
  }

  // console.log("########################################################## connect :: 6")
  // Initialize all the connections
  for(var i = 0; i < serverConnections.length; i++) {    
    // Set up the logger for the server connection
    serverConnections[i].logger = replSetSelf.logger;
    // Default empty socket options object
    var socketOptions = {};
    // If a socket option object exists clone it
    if(this.socketOptions != null && typeof this.socketOptions === 'object') {
      var keys = Object.keys(this.socketOptions);
      for(var j = 0; j < keys.length;j++) socketOptions[keys[j]] = this.socketOptions[keys[j]];
    }
    
    // If ssl is specified
    if(replSetSelf.ssl) serverConnections[i].ssl = true;

    // Add host information to socket options
    socketOptions['host'] = serverConnections[i].host;
    socketOptions['port'] = serverConnections[i].port;
    
    // Set the socket options
    serverConnections[i].socketOptions = socketOptions;
    // Set the replicaset instance
    serverConnections[i].replicasetInstance = replSetSelf;
    // Connect to server
    serverConnections[i].connect(parent, {returnIsMasterResults: true, eventReceiver:serverConnections[i]}, connectionHandler(serverConnections[i]));
  }  
  
  // console.log("########################################################## connect :: 7")
  // Check if we have an error in the inital set of servers and callback with error
  if(replSetSelf._state.errorMessages.length > 0 && typeof callback === 'function') {
    // ensure no callbacks get called twice
    var internalCallback = callback;
    callback = null;
    // Perform callback
    internalCallback(replSetSelf._state.errorMessages[0], null);
  }
  // console.log("########################################################## connect :: 8")
}

ReplSetServers.prototype.checkoutWriter = function() {
  return this._state.master != null ? this._state.master.checkoutWriter() : null;
}

ReplSetServers.prototype.checkoutReader = function() {
  // If we have specified to read from a secondary server grab a random one and read
  // from it, otherwise just pass the primary connection
  if((this.readSecondary == true || this._readPreference == Server.READ_SECONDARY || this._readPreference == Server.READ_SECONDARY_ONLY) && Object.keys(this._state.secondaries).length > 0) {
    // Checkout a secondary server from the passed in set of servers
    if(this.strategyInstance != null) {
      return this.strategyInstance.checkoutSecondary();
    } else {
      // Pick a random key
      var keys = Object.keys(this._state.secondaries);
      var key = keys[Math.floor(Math.random() * keys.length)];
      return this._state.secondaries[key].checkoutReader();      
    }    
  } else if(this._readPreference == Server.READ_SECONDARY_ONLY && Object.keys(this._state.secondaries).length == 0) {
    return null;
  } else if(this._readPreference != null && typeof this._readPreference === 'object') {
    // Get all tag keys (used to try to find a server that is valid)
    var keys = Object.keys(this._readPreference);
    // final instance server
    var instanceServer = null;
    // for each key look for an avilable instance
    for(var i = 0; i < keys.length; i++) {
      // Grab subkey value      
      var value = this._readPreference[keys[i]];

      // Check if we have any servers for the tag, if we do pick a random one
      if(this._state.byTags[keys[i]] != null 
        && this._state.byTags[keys[i]][value] != null
        && Array.isArray(this._state.byTags[keys[i]][value])
        && this._state.byTags[keys[i]][value].length > 0) {
        // Let's grab an available server from the list using a random pick
        var serverInstances = this._state.byTags[keys[i]][value];
        // Set instance to return
        instanceServer = serverInstances[Math.floor(Math.random() * serverInstances.length)];
        break;
      }
    }
    
    // Return the instance of the server
    return instanceServer != null ? instanceServer.checkoutReader() : this.checkoutWriter();
  } else {
    return this.checkoutWriter();
  }
}

ReplSetServers.prototype.allRawConnections = function() {
  // Neeed to build a complete list of all raw connections, start with master server
  var allConnections = [];
  // Get connection object
  var allMasterConnections = this._state.master.connectionPool.getAllConnections();
  // Add all connections to list
  allConnections = allConnections.concat(allMasterConnections);
  
  // If we have read secondary let's add all secondary servers
  if(this.readSecondary && Object.keys(this._state.secondaries).length > 0) {
    // Get all the keys
    var keys = Object.keys(this._state.secondaries);
    // For each of the secondaries grab the connections
    for(var i = 0; i < keys.length; i++) {
      // Get connection object
      var secondaryPoolConnections = this._state.secondaries[keys[i]].connectionPool.getAllConnections();
      // Add all connections to list
      allConnections = allConnections.concat(secondaryPoolConnections);
    }
  }
  
  // Return all the conections
  return allConnections;
}

ReplSetServers.prototype.enableRecordQueryStats = function(enable) {
  // Set the global enable record query stats
  this.recordQueryStats = enable;
  // Ensure all existing servers already have the flag set, even if the 
  // connections are up already or we have not connected yet
  if(this._state != null && this._state.addresses != null) {
    var keys = Object.keys(this._state.addresses);
    // Iterate over all server instances and set the  enableRecordQueryStats flag
    for(var i = 0; i < keys.length; i++) {
      this._state.addresses[keys[i]].enableRecordQueryStats(enable);
    }
  } else if(Array.isArray(this.servers)) {
    for(var i = 0; i < this.servers.length; i++) {
      this.servers[i].enableRecordQueryStats(enable);
    }
  }
}

ReplSetServers.prototype.disconnect = function(callback) {
  this.close(callback);
}

ReplSetServers.prototype.close = function(callback) {
  var self = this;  
  // Set server status as disconnected
  this._serverState = 'disconnected';  
  // Get all the server instances and close them
  var allServers = [];
  // Make sure we have servers
  if(this._state['addresses'] != null) {
    var keys = Object.keys(this._state.addresses);
    for(var i = 0; i < keys.length; i++) {
      allServers.push(this._state.addresses[keys[i]]);
    }    
  }
  
  // Let's process all the closing
  var numberOfServersToClose = allServers.length;

  // Remove all the listeners
  self.removeAllListeners();

  // TODO TODO TODO
  // NEED TO CHECK THIS DAMN CODE
  // TODO TODO TODO
  // console.log("========================================= CLOSE SERVER")
  // console.log("allServers.length = " + allServers.length)
  
  // Special case where there are no servers
  if(allServers.length == 0 && typeof callback === 'function') return callback(null, null);

  // Close the servers
  for(var i = 0; i < allServers.length; i++) {
    var server = allServers[i];
    if(server.isConnected()) {
      // Close each server
      server.close(function() {
        numberOfServersToClose = numberOfServersToClose - 1;
        // console.log("numberOfServersToClose = " + numberOfServersToClose)
        // Clear out state if we are done
        if(numberOfServersToClose == 0) {
          // Clear out state
          self._state = {'master':null, 'secondaries':{}, 'arbiters':{}, 'passives':{}, 'errors':{}, 'addresses':{}, 'byTags':{}, 'setName':null, 'errorMessages':[], 'members':[]};
        }

        // If we are finished perform the call back
        if(numberOfServersToClose == 0 && typeof callback === 'function') {
          callback(null);          
        }
      })      
    } else {
      numberOfServersToClose = numberOfServersToClose - 1;      
      // console.log("numberOfServersToClose = " + numberOfServersToClose)
      // If we have no more servers perform the callback
      if(numberOfServersToClose == 0 && typeof callback === 'function') {
        callback(null);          
      }
    }
  }
}