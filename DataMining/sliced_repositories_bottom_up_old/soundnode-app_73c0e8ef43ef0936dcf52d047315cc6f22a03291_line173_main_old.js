const fs = require('fs-extra');
const {
    app,
    BrowserWindow,
    ipcMain,
    globalShortcut,
    Menu
} = require('electron');
const windowStateKeeper = require('electron-window-state');
const clientId = '342b8a7af638944906dcdb46f9d56d98';
const redirectUri = 'http://sc-redirect.herokuapp.com/callback.html';
const SCconnect = `https://soundcloud.com/connect?&client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token`;
const userConfigPath = `${__dirname}/app/public/js/system/userConfig.json`;
let mainWindow;
let authenticationWindow;
function checkUserConfig() {
    const userConfigExists = fs.existsSync(userConfigPath);
}
function authenticateUser() {
    authenticationWindow = new BrowserWindow({
    });
}
    mainWindow = new BrowserWindow({
    });
ipcMain.on('destroyApp', () => {
    mainWindow.destroy();
});
