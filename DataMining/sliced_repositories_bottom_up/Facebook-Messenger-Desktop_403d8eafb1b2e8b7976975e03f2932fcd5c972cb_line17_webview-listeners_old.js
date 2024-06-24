N
o
 
l
i
n
e
s
import {ipcRenderer as ipcr} from 'electron';
import webView from './webview';
webView.addEventListener('page-title-updated', function(event) {
  const matches = /\((\d)\)/.exec(webView.getTitle());
});
