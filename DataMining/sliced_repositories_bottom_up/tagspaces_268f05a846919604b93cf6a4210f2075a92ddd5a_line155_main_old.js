const electron = require('electron');
const app = electron.app;  // Module to control application life.
const ipcMain = require('electron').ipcMain;
//handling start parameter
app.on('ready', function(event) {
  var ctrlName = "Ctrl";
  if (process.platform == 'darwin') {
    ctrlName = "Cmd"
  }
});
