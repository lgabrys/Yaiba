(function(context){
    "use strict";

    var _ = require('underscore');
    var request = require('request');
    var Q = require('q');
    var baseUrl = 'http://api.ysubs.com/subs/';
    var prefix = 'http://www.ysubs.com';
    var YSubs = function(){
    };
    YSubs.prototype = Object.create(App.Providers.CacheProvider.prototype);
    YSubs.prototype.constructor = YSubs;
    var querySubtitles = function(imdbIds) {
        var url = baseUrl + _.map(imdbIds.sort(), function(id){return 'tt'+id;}).join('-');

        var deferred = Q.defer();

        request({url:url, json: true}, function(error, response, data){
            if(error) {
            } else if (!data.success) {
            } else {
            }
        });
    };
    var formatForPopcorn = function(data) {
        _.each(data.subs, function(langs, imdbId) {
            var movieSubs = {};
            _.each(langs, function(subs, lang) {
                var langCode = App.Localization.languageMapping[lang];
                movieSubs[langCode] = prefix + _.max(subs, function(s){return s.rating;}).url;
            });
            var filteredSubtitle = App.Localization.filterSubtitle(movieSubs);
        });
    };
    YSubs.prototype.query = function(ids) {
        return Q.when(querySubtitles(ids))
    };
})(window);
