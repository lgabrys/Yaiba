_kiwi.model.Gateway = function () {

    // Set to a reference to this object within initialize()

    this.initialize = function () {

    };
    /**
    *   Connects to the server
    *   @param  {Function}  callback    A callback function to be invoked once Kiwi's server has connected to the IRC server
    */


    this.connect = function (callback) {

        // Work out the resource URL for socket.io
    };
    this.action = function (connection_id, target, msg, callback) {
        this.ctcp(true, 'ACTION', target, msg, callback);
    };
};
