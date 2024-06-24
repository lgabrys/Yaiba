/* global define, requirejs, _  */

var PRODUCTION = "@@PRODUCTION";
var PRO = "@@PROVERSION";
if (PRODUCTION == "true") {
  console = console || {};
  console.log = function(){};
  console.error = function(){};
}
var isFirefox = document.URL.indexOf( 'resource://' ) === 0;
var isChrome =  document.URL.indexOf( 'chrome-extension://' ) === 0;
var isNode;
var isCordovaAndroid = document.URL.indexOf( 'file:///android_asset' ) === 0;
var isCordovaiOS= navigator.isCordovaApp == true;
var isCordova = isCordovaAndroid  == true || isCordovaiOS == true;
var isWeb = document.URL.indexOf( 'http' ) === 0;
var isWin = navigator.appVersion.indexOf("Win")!==-1;
try {
  var pathUtils = require('path');
  isNode = true;
} catch(e) {
  isNode = false;
}
var PRO_JS = "js/pro";
if(PRO === "@@PROVERSION") {
  PRO_JS = 'pro/js/pro.api';
}
