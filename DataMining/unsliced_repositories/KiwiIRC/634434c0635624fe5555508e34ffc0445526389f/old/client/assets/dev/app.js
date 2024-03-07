// Holds anything kiwi client specific (ie. front, gateway, _kiwi.plugs..)
/**
*   @namespace
*/
var _kiwi = {};

_kiwi.model = {};
_kiwi.view = {};
_kiwi.applets = {};


/**
 * A global container for third party access
 * Will be used to access a limited subset of kiwi functionality
 * and data (think: plugins)
 */
_kiwi.global = {
	settings: undefined,
	plugins: undefined,
	utils: undefined, // TODO: Re-usable methods
	user: undefined, // TODO: Limited user methods
	server: undefined, // TODO: Limited server methods

	// TODO: think of a better term for this as it will also refer to queries
	channels: undefined, // TODO: Limited access to panels list

	// Event managers for plugins
	components: {
	    EventComponent: function(event_source) {
	        function proxyEvent(event_name, event_data) {
	            this.trigger(event_name, event_data);
	        }

	        _.extend(this, Backbone.Events);

	        // Proxy the events to this dispatcher
	        event_source.on('all', proxyEvent, this);

	        // Clean up this object
	        this.dispose = function () {
	            event_source.off('all', proxyEvent);
	            this.off();
	        };
	    },

	    Network: function() {
	        var obj = new this.EventComponent(_kiwi.gateway);
	        var funcs = {
	        	kiwi: 'kiwi', raw: 'raw', kick: 'kick', topic: 'topic',
	        	part: 'part', join: 'join', action: 'action', ctcp: 'ctcp',
	        	notice: 'notice', msg: 'privmsg'
	        };

	        _.each(funcs, function(gateway_fn, func_name) {
	        	obj[func_name] = function() {
	        		var fn_name = gateway_fn;
	        		_kiwi.gateway[fn_name].apply(_kiwi.gateway, arguments);
	        	};
	        });

	        return obj;
	    },

	    ControlInput: function() {
	        var obj = new this.EventComponent(_kiwi.app.controlbox);
	        var funcs = {
	        	processInput: 'run'
	        };

	        _.each(funcs, function(controlbox_fn, func_name) {
	        	obj[func_name] = _kiwi.app.controlbox[controlbox_fn];
	        });

	        return obj;
	    }
	},

	// Entry point to start the kiwi application
	start: function (opts) {
		opts = opts || {};

        // Load the plugin manager
        _kiwi.global.plugins = new _kiwi.model.PluginManager();

        // Set up the settings datastore
        _kiwi.global.settings = _kiwi.model.DataStore.instance('kiwi.settings');
        _kiwi.global.settings.load();

		_kiwi.app = new _kiwi.model.Application(opts);

		if (opts.kiwi_server) {
			_kiwi.app.kiwi_server = opts.kiwi_server;
		}

		// Start the client up
		_kiwi.app.start();

		return true;
	}
};



// If within a closure, expose the kiwi globals
if (typeof global !== 'undefined') {
	global.kiwi = _kiwi.global;
} else {
	// Not within a closure so set a var in the current scope
	var kiwi = _kiwi.global;
}