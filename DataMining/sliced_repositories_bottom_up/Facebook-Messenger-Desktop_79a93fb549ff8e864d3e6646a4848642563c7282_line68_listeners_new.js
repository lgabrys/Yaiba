import {ipcRenderer as ipcr} from 'electron';
import webView from 'renderer/webview';
function createBadgeDataUrl(text) {
  const canvas = document.createElement('canvas');
  canvas.height = 140;
  canvas.width = 140;
  const context = canvas.getContext('2d');
  context.fillStyle = 'red';
  context.textAlign = 'center';
  context.fillStyle = 'white';
  if (text.length > 2) {
    context.font = 'bold 65px "Segoe UI", sans-serif';
  } else if (text.length > 1) {
    context.font = 'bold 85px "Segoe UI", sans-serif';
  } else {
    context.font = 'bold 100px "Segoe UI", sans-serif';
  }
}
webView.addEventListener('console-message', function(event) {
  const msg = event.message.replace(/%c/g, '');
  const fwNormal = 'font-weight: normal;';
  const fwBold = 'font-weight: bold;';
});
webView.addEventListener('page-title-updated', function() {
  const matches = /\(([\d]+)\)/.exec(webView.getTitle());
  const parsed = parseInt(matches && matches[1], 10);
  const count = isNaN(parsed) || !parsed ? '' : '' + parsed;
  let badgeDataUrl = null;
  if (process.platform == 'win32' && count) {
    badgeDataUrl = createBadgeDataUrl(count);
  }
});
webView.addEventListener('dom-ready', function() {
  if (window.localStorage.autoLaunchDevTools) {
  }
});
