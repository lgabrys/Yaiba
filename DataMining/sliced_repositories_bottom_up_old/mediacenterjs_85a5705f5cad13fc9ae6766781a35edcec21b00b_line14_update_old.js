, npm = require('npm');
npm.load([], function (err, npm) {
    npm.commands.search(["mediacenterjs"], function(err, data){
        } else{
            var currentInfo = checkCurrentVersion();
            for (var key in data) {
                var obj = data[key];
                if(obj.name === 'mediacenterjs' && obj.version > currentInfo.version){
                    npm.commands.update([obj.name], function(err, data){
                    });
                }
            }
        }
    });
});
