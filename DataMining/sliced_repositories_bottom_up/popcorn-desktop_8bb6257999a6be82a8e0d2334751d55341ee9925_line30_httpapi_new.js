(function(App) {
	var rpc = require('json-rpc2');
	var HttpApi = function() {
		var server = rpc.Server.create({
		});
		server.expose('togglemute', function(args, opt, callback){
			App.Player.muted(!App.Player.muted());
		});
	};
})(window.App);
