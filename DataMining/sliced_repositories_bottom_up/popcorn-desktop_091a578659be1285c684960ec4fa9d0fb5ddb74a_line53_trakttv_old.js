(function(App) {
    var request = require('request');
    var Q = require('q');
    var URI = require('URIjs');
    var API_ENDPOINT = URI('http://api.trakt.tv/');
    function Trakttv() {
    }
    Trakttv.prototype = Object.create(App.Providers.CacheProvider.prototype);
    Trakttv.prototype.constructor = Trakttv;
    var querySummaries = function(ids) {
        var deferred = Q.defer();
        var uri = API_ENDPOINT.clone()
        request({url: uri.toString(), json: true}, function(error, response, data) {
            if(error || !data) {
                deferred.reject(error);
            } else {
        });
    };
    Trakttv.resizeImage = function(imageUrl, width) {
        var uri = URI(imageUrl),
            ext = uri.suffix(),
            file = uri.filename().split('.' + ext)[0];
        if(uri.filename() == 'poster-dark.jpg') {
        }else{
    };
})(window.App);
