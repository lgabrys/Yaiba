
var PRODUCTION = "@@PRODUCTION";
if (PRODUCTION == "true") {
    console = console || {};
    console.log = function(){};
    console.error = function(){};
}
var isFirefox = document.URL.indexOf( 'resource://' ) === 0;
var isFirefoxOS = document.URL.indexOf( 'app://' ) === 0;
var isChrome =  document.URL.indexOf( 'chrome-extension://' ) === 0;
var isNode;
var isCordova = document.URL.indexOf( 'file:///android_asset' ) === 0;
var isWeb = document.URL.indexOf( 'http' ) === 0;
var isOSX = navigator.appVersion.indexOf("Mac")!==-1;
var isWin = navigator.appVersion.indexOf("Win")!==-1;
try {
    var fs = require('fs');
    var pathUtils = require('path');
    var gui = require('nw.gui');
    isNode = true;
} catch(e) {
    isNode = false;
}
var IO_JS;
if( isFirefox ) {
    IO_JS = "mozilla/mozilla.api";
} else if ( isFirefoxOS ) {
    IO_JS = "mozilla/firefoxos.api";
} else if ( isChrome ) {
    IO_JS = "chrome/chrome.api";
} else if (isNode){
    IO_JS = "node-webkit/node-webkit.api";
} else if (isCordova){
    IO_JS = "cordova/cordova.api";
} else if (isWeb){
    IO_JS = "web/web.api";
} else {
    IO_JS = "web/web.api";
}
console.log("Loading Loader - Firefox: "+isFirefox+" | ChromeExt: "+isChrome+" | Node: "+isNode+" | Cordova: "+isCordova);
