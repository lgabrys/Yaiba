(function (App) {
        Q = require('q'),
        path = require('path'),
    Updater.prototype.check = function () {
        var defer = Q.defer();
        var promise = defer.promise;
        return promise.then(function (data) {
            var updateData = data[App.settings.os];
            if (App.settings.os === 'linux') {
                updateData = updateData[App.settings.arch];
            }
            if (!updateData.version.match(/-\d+$/)) {
                updateData.version += '-0';
            }
            if (!App.settings.version.match(/-\d+$/)) {
                App.settings.version += '-0';
            }
        });
    };
    function installOSX(downloadPath, updateData) {
        var outputDir = path.dirname(downloadPath),
            installDir = path.join(outputDir, 'app.nw');
        var defer = Q.defer();
        deleteFolder(installDir, function (err) {
            if (err) {
                defer.reject(err);
            } else {
        });
    }
})(window.App);
