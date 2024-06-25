import {ipcRenderer as ipcr} from 'electron';
import piwik from 'renderer/services/piwik';
import webView from 'renderer/webview';
ipcr.on('fwd-webview', function(event, channel, ...args) {
  if (webView.isLoading && (typeof webView.isLoading == 'function') && !webView.isLoading()) {
    webView.send(channel, ...args);
  } else {
});
