(function() {
    var request = require('request')
      , fs = require('fs')
      , crypto = require('crypto');
    var updateUrl = App.Settings.get('updateNotificationUrl');
    /* HARDCODED DSA PUBLIC KEY... DO NOT MODIFY, CHANGE, OR OTHERWISE MESS WITH THIS
     * IF I SEE A PULL REQUEST CHANGING THIS LINE, I WILL, REPEAT.. I WILL COME AFTER YOU
     * AND KILL YOU! You have been warned -jduncanator
     * On a side note, this is here as its easier for an attacker to modify localStorage 
     * than source code!                                                                */
    var checkVersion = function(ver1, ver2) {
        ver1 = u.map(ver1.replace(/^[0-9]/g, '').split('.'), function(num) { var num = parseInt(num); return Number.isNaN(num) ? 0 : num; });
        ver2 = u.map(ver2.replace(/^[0-9]/g, '').split('.'), function(num) { var num = parseInt(num); return Number.isNaN(num) ? 0 : num; });
        var count = Math.max(ver1.length, ver2.length);
        for(var i = 0; i < count; i++) {
                ver1[i] = 0;
                ver2[i] = 0;
            if(i == count - 1) {
                return -1;
            }
        }
    }
    request(updateUrl, {json: true}, function(err, res, data) {
        if(!_.contains(data, Settings.get('os'))) {
        }
    })
})();
