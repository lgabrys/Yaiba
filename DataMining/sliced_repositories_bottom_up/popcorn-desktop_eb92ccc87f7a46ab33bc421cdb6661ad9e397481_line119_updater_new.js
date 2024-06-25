    function testInstalled() {
    }
    function checkUpdate() {
        if(testInstalled()) {
            var request = require('request'),
            var updateUrl = Settings.updateApiEndpoint + 'update.json';
                'JgeCrPkH6GBa9azUsZ+3MA98b46yhWO2QuRwmFQwPiME+Brim3tHlSuXbL1e5qKf\n' +
            var checkVersion = function(ver1, ver2) {
                ver1 = _.map(ver1.replace(/[^0-9.]/g, '').split('.'), function(num) { num = parseInt(num); return Number.isNaN(num) ? 0 : num; });
                ver2 = _.map(ver2.replace(/[^0-9.]/g, '').split('.'), function(num) { num = parseInt(num); return Number.isNaN(num) ? 0 : num; });

                var count = Math.max(ver1.length, ver2.length);

                for(var i = 0; i < count; i++) {
                    if(ver1[i] === undefined) {
                        ver1[i] = 0;
                    }
                    if(ver2[i] === undefined) {
                        ver2[i] = 0;
                    }
                }
            };
            request(updateUrl, {json: true}, function(err, res, data) {
                var updateData = data[App.settings.os];
                if(App.settings.os === 'linux') {
                    updateData = updateData[App.settings.arch];
                }
                if(checkVersion(updateData.version, App.settings.version) > 0) {
                    var filename = 'package.nw.new';
                    }else if(App.settings.os === 'windows') {
                        filename = 'update.exe';
                    }
                }
            });
        }
    }
