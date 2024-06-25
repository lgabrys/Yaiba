    path        = require('path'),
    FileManager = global.getFileManager(),
    notifier    = require(FileManager.appScriptsDir + '/notifier.js'),
    appConfig   = require(FileManager.appScriptsDir + '/appConfigManager.js').getAppConfig();
function DustCompiler() {
}
DustCompiler.prototype.compile = function (file, success, fail) {
    //compile file by use system command
    if (appConfig.useSystemCommand.dustc) {
        this.compileBySystemCommand(file, success, fail);
    }
};
