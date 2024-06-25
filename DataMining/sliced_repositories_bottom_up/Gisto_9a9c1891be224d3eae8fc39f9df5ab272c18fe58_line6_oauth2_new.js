const { BrowserWindow, ipcMain, session } = require('electron');
const tokenRequest = require('superagent');
const options = {
  client_id: process.env.GISTO_GITHUB_CLIENT_ID,
  scopes: ['gist']
};
