(function(App) {
    var request = require('request'),
        URI = require('URIjs'),
    var API_ENDPOINT = URI('https://api.trakt.tv/'),
        API_KEY = '515a27ba95fbd83f20690e5c22bceaff0dfbde7c',
    function TraktTv() {
    }
    TraktTv.prototype.call = function(endpoint, getVariables) {
        getVariables = getVariables || {};
        if(Array.isArray(endpoint)) {
            endpoint = endpoint.map(function(val) {
                if(val === '{KEY}') {
                }
            });
        } else {
            endpoint = endpoint.replace('{KEY}', API_KEY);
        }
        var requestUri = API_ENDPOINT.clone()

        request(requestUri.toString(), {json: true}, function(err, res, body) {
            if(err || !body) {
            } else {
        });
    };
    TraktTv.prototype.post = function(endpoint, postVariables) {
        postVariables = postVariables || {};
        if(Array.isArray(endpoint)) {
            endpoint = endpoint.map(function(val) {
            });
        } else {
            endpoint = endpoint.replace('{KEY}', API_KEY);
        }
        if(postVariables.username === undefined) {
            if(this.authenticated && this._credentials.username !== '') {
                postVariables.username = this._credentials.username;
            }
        }
        if(postVariables.password === undefined) {
            if(this.authenticated && this._credentials.password !== '') {
                postVariables.password = this._credentials.password;
            }
        }
    };
    TraktTv.prototype.authenticate = function(username, password) {
    };
    TraktTv.prototype.movie = {
        watching: function(imdb, progress) {
        },
        library: function(movie) {
            if(!this.authenticated) {
            }
            if(Array.isArray(movie)) {
                movie = movie.map(function(val) {
                });
            } else {
        },
    };
    TraktTv.prototype.show = {
    };
    TraktTv.resizeImage = function(imageUrl, width) {
        var uri = URI(imageUrl),
            ext = uri.suffix(),
            file = uri.filename().split('.' + ext)[0];
        var existingIndex = 0;
        if((existingIndex = file.search('-\d\d\d$')) !== -1) {
        }
    };
})(window.App);
