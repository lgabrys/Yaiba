const { dialog } = require('electron');
const { autoUpdater } = require('electron-updater');
let updater;
autoUpdater.autoDownload = false;
autoUpdater.on('error', (error) => {
  dialog.showErrorBox('Error: ', error == null ? 'unknown' : (error.stack || error).toString());
});
autoUpdater.on('update-available', () => {
  dialog.showMessageBox({
  }, (buttonIndex) => {
    } else {
      updater.enabled = true;
      updater = null;
    }
  });
});
autoUpdater.on('update-not-available', () => {
  updater.enabled = true;
  updater = null;
});
function checkForUpdates(menuItem, focusedWindow) {
  updater = menuItem;
}
