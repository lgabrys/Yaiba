(function (App) {
    'use strict';
    var fs=require('fs');
    var cache = App.Providers._cache = {};
    var registry = App.Providers._registry = {};
    App.Providers.Generic = require('butter-provider');

    App.ProviderTypes = {
        'indie': 'Indie'
    };
    function getProvider(name) {
        if (!name) {
            /* XXX(xaiki): this is for debug purposes, will it bite us later ? */
            /* XXX(vankasteelj): it did. */
            win.error('asked for an empty provider, this should never happen, dumping provider cache and registry', cache, registry);
        }
        var tokenize = name.split('?');
        // XXX:reimplement querystring.parse to not escape
        var args = {}
        tokenize[1] && tokenize[1].split('&').map(function (v){
            var m = v.split('=')
            args[m[0]]= m[1]
        })

        var config = {
            name: tokenize[0],
            args: args
        }

        if (cache[name]) {
            win.info('Returning cached provider', name);
        }

        win.info('Spawning new provider', name, config);
    }
})(window.App);
