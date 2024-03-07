// Holds anything kiwi client specific (ie. front, gateway, kiwi.plugs..)
/**
*   @namespace
*/
var kiwi = {};

kiwi.model = {};
kiwi.view = {};
kiwi.applets = {};


/**
 * A global container for third party access
 * Will be used to access a limited subset of kiwi functionality
 * and data (think: plugins)
 */
kiwi.global = {
	utils: undefined, // Re-usable methods
	gateway: undefined,
	user: undefined,
	server: undefined,
	command: undefined,  // The control box

	// TODO: think of a better term for this as it will also refer to queries
	channels: undefined,

	// Entry point to start the kiwi application
	start: function (opts) {
		opts = opts || {};

		kiwi.app = new kiwi.model.Application(opts);

		if (opts.kiwi_server) {
			kiwi.app.kiwi_server = opts.kiwi_server;
		}

		kiwi.app.start();

		return true;
	}
};



// If within a closure, expose the kiwi globals
if (typeof global !== 'undefined') {
	global.kiwi = kiwi.global;
}