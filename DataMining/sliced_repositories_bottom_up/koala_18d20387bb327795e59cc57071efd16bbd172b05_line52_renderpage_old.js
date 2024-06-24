var fs             = require('fs-extra'),
    path           = require('path'),
    configManager  = require('./appConfigManager.js'),
    appConfig      = configManager.getAppConfig(),
    appPackage     = configManager.getAppPackage(),
    util           = require('./util.js'),
    locales        = appConfig.locales,
    FileManager    = global.getFileManager(),
    localStorage   = global.localStorage;
var getTemplates = function (dir) {
    function walk(root) {
        var dirList = fs.readdirSync(root);
        for (var i = 0; i < dirList.length; i++) {
            var item = dirList[i];
            if (fs.statSync(path.join(root, item)).isDirectory()) {
                // Skip OS directories
                if (!FileManager.isOSDir(item)) {
                    try {
                        walk(path.join(root, item));
                    } catch (e) {}
                }
            } else if (/jade|html/.test(path.extname(item))) {
            }
        }
    }

}
/**
 * compare between current locales with last locales
 * @param  {string} localesPackage locales package file path
 * @return {boolean}               if the same as with the current version
 */

var compareDifferent = function (localesPackage) {
    // for debug
    if (appPackage.window.debug) return false;
}
