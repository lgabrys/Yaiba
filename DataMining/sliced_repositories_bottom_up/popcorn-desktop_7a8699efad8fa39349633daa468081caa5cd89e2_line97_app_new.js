    gui = require('nw.gui'),
    isDebug = gui.App.argv.indexOf('--debug') > -1,
String.prototype.capitalize = function() {
};
String.prototype.capitalizeEach = function() {
    return this.replace(/\w*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};
