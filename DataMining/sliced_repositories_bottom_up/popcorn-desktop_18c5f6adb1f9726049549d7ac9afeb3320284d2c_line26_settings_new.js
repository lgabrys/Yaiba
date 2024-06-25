
Settings = {
    "_defaultSettings": {
        // Default to the first beta
        "version": "0.1.0",
        "dbVersion": "1.0",
        // Used to check for the latest version
        "updateNotificationUrl": "http://getpopcornti.me/update.json",
        // Used to check if there's an internet connection
        "connectionCheckUrl": "http://www.google.com",
        // YIFY Endpoint
        "yifyApiEndpoint": "http://yify-torrents.com/api/",
        // A mirror for YIFY (for users in the UK -Yify is blocked there-)
        "yifyApiEndpointMirror": "http://yify.unlocktorrent.com/api/"
    },


    "setup": function(forceReset) {

        for( var key in Settings._defaultSettings ) {
            // Create new settings if necessary
            if( typeof Settings.get(key) == 'undefined' || (forceReset === true) ) {
                Settings.set(key, Settings._defaultSettings[key]);
            }
        }
    },
};
