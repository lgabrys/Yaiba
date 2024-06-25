    configManager   = require('./appConfigManager.js'),
    storage         = require('./storage.js'),
    jadeManager     = require('./jadeManager.js'),
    fileWatcher     = require('./fileWatcher.js'),
    projectManager  = require('./projectManager.js'),
    projectSettings = require('./projectSettings.js'),
    notifier        = require('./notifier.js'),
    il8n            = require('./il8n.js'),
    util            = require('./util.js'),
    historyDb       = storage.getHistoryDb(),
    $               = global.jQuery,
    mainWindow      = global.mainWindow;

/**
 * render projects view
 */


function renderProjects() {
    projectManager.checkStatus(); //filter invalid forder
    var projectsDb = storage.getProjects() || {},
        projectsList = [],
        activeProjectId,
        historyActiveProjectId = historyDb.activeProject,
        activeProject,

    for (var k in projectsDb) {
        activeProjectId = k;
    }
    //load prev active project files
    if (historyActiveProjectId && projectsDb[historyActiveProjectId]) {
        activeProject = projectsDb[historyActiveProjectId];
        activeProjectId = historyActiveProjectId;
    } else {
        activeProject = projectsDb[activeProjectId];
    }
    for (k in activeProject.files) {
    }
    global.activeProject = activeProjectId;
}
function resumeWindow () {
    var x = historyDb.window.x,
        y = historyDb.window.y,

    if (historyDb.window.x >= availWidth || historyDb.window.x <= (-availWidth - mainWindow.width) || historyDb.window.y >= availHeight || historyDb.window.y < 0) {
        x = null;
        y = null;
    }
    if (historyDb.window) {
        if (x) mainWindow.x = x;
        if (y) mainWindow.y = y;
    }
}
function showMainWindow () {
    if (!global.startup) {

        if (configManager.getAppConfig().minimizeOnStartup && process.platform !== 'linux') {
            mainWindow.minimize()
        } else {
            mainWindow.show();
        }
    }
}
