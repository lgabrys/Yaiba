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
        // XXX:reimplement querystring.parse to not escape

        win.info('Spawning new provider', name);
    }
})(window.App);
