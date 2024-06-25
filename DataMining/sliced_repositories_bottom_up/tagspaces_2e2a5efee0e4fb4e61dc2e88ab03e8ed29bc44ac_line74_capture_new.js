
const { getTabContentWindow, getActiveTab, getTabs, getTabURL } = require('sdk/tabs/utils');
const { getMostRecentBrowserWindow } = require('sdk/window/utils');
var {Cc, Ci, Cr, components: Components} = require("chrome");
exports.captureTab = function(tab=getActiveTab(getMostRecentBrowserWindow())) {
  let contentWindow = getTabContentWindow(tab);
  let { document } = contentWindow;
  let w = contentWindow.innerWidth;
  let h = contentWindow.innerHeight;
  let canvas = document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas');

  canvas.width = w;
  canvas.height = h;
  let dataURL = canvas.toDataURL();
  canvas = null;
  return dataURL;
};
exports.dataURItoBlob = function (dataURI) {
  var win = getMostRecentBrowserWindow();
};
function getSaveLocationDialog (name) {
  var win = getMostRecentBrowserWindow();
}

exports.saveContentToFile = function (name, content) {
  var aFile = getSaveLocationDialog(name);
  var foStream = Cc["@mozilla.org/network/file-output-stream;1"].
  var converter = Cc["@mozilla.org/intl/converter-output-stream;1"].
  converter.init(foStream, "UTF-8", 0, 0xFFFD);
};
