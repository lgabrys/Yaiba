var gui = require('nw.gui'),
    appGUI = {},
    appSystem = {};
appGUI.getGUI = gui.Window.get();
appGUI.close = function () {
    var guiWin = this.getGUI;
    guiWin.close(true);
};
appGUI.minimize = function () {
    var guiWin = this.getGUI;
    guiWin.minimize();
};
appGUI.maximize = function () {
    var guiWin = this.getGUI;
    guiWin.maximize();
};
appGUI.openDevTools = function () {
    var guiWin = gui.Window.get();
    guiWin.showDevTools();
};
appSystem.navBarUserUnAuthenticated = function() {
    if (process.platform !== "darwin") {
        return false;
    }

    var nativeMenuBar = new gui.Menu({ type: "menubar" });

    // OS X Menu
    nativeMenuBar = new gui.Menu({ type: "menubar" });

    nativeMenuBar.createMacBuiltin("Soundnode", {
        hideEdit: true,
        hideWindow: false
    });

    appGUI.getGUI.menu = nativeMenuBar;
}
