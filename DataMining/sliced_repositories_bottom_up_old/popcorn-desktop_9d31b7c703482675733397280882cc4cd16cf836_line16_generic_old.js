(function(App) {
    var memoize = require ('memoizee');
    var Provider = function() {
        var memopts = {
            maxAge: 10*60*1000, /* 10 minutes */
            preFetch: 0.5, /* recache every 5 minutes */
            primitive: true
        };
        this.detail = memoize(this.detail.bind(this), _.extend(memopts, {async: true}));;
    };
})(window.App);
