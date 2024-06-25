(function (App) {
	var request = require('request'),
		URI = require('URIjs'),
		Q = require('q'),
	var API_ENDPOINT = URI('https://api.trakt.tv/'),
		API_KEY = '515a27ba95fbd83f20690e5c22bceaff0dfbde7c',
	function TraktTv() {
		}
	TraktTv.prototype.isAuthenticating = function () {
	};
	TraktTv.prototype.cache = function (key, ids, func) {
	};
	TraktTv.prototype.call = function (endpoint, getVariables) {
		getVariables = getVariables || {};
		if (Array.isArray(endpoint)) {
			endpoint = endpoint.map(function (val) {
			});
		} else {
			endpoint = endpoint.replace('{KEY}', API_KEY);
		}
	};
	TraktTv.prototype.post = function (endpoint, postVariables) {
		postVariables = postVariables || {};
		if (Array.isArray(endpoint)) {
			endpoint = endpoint.map(function (val) {
			});
		} else {
			endpoint = endpoint.replace('{KEY}', API_KEY);
		}
		var requestUri = API_ENDPOINT.clone()
		if (postVariables.username === undefined) {
			if (this.authenticated && this._credentials.username !== '') {
				postVariables.username = this._credentials.username;
			}
		}
		if (postVariables.password === undefined) {
			if (this.authenticated && this._credentials.password !== '') {
				postVariables.password = this._credentials.password;
			}
		}
		request(requestUri.toString(), {
		});
	};
	TraktTv.prototype.authenticate = function (username, password, preHashed) {
		preHashed = preHashed || false;
	};
	TraktTv.prototype.sync = function () {
	};
	TraktTv.prototype.movie = {
		seen: function (movie) {
			if (Array.isArray(movie)) {
				if (movie.length === 0) {
					return Q(true);
				}
			} else {
		},
	};
})(window.App);
