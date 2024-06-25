    MIN_SIZE_LOADED = 10 * 1024 * 1024,

    // Load native UI library
    gui = require('nw.gui'),

    // Debug flag
    isDebug = gui.App.argv.indexOf('--debug') > -1,

    // browser window object
    win = gui.Window.get(),

    // os object
    os = require('os'),

    // path object
    path = require('path'),

    // fs object
    fs = require('fs'),

    // url object
    url = require('url'),

    // TMP Folder
    tmpFolder = path.join(os.tmpDir(), 'Popcorn-Time'),

    // i18n module (translations)
    i18n = require("i18n");
if (isDebug) {
    console.logger = {};
    console.logger.log = console.log.bind(console);
    console.logger.debug = function() {
    }
    console.logger.info = function() {
    }
    console.logger.warn = function() {
    }
    console.logger.error = function() {
    }
}
{
    console.log = function() {};
    console.time = console.timeEnd = function() {};
    console.logger = {};
    console.logger.log = function() {};
    console.logger.debug = console.logger.log;
    console.logger.info = console.logger.log;
    console.logger.warn = console.logger.log;
    console.logger.error = console.logger.log;
}
window.ondragover = function(e) { e.preventDefault(); return false };
window.ondrop = function(e) { e.preventDefault(); return false };
var last_arg = gui.App.argv.pop();
if(last_arg && last_arg.substring(0,8) == "magnet:?") {
        setTimeout(function() {
                console.log ('running');
        }, 2000); // XXX(xaiki): hackish, we need to prevent loading instead
}
