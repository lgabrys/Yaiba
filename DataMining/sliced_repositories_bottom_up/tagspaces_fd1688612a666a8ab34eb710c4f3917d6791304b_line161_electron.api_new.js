
const pathUtils = require('path'); // jshint ignore:line
const electron = require('electron'); // jshint ignore:line
const remote = electron.remote; // jshint ignore:line
define(function(require, exports, module) {

  var TSCORE = require("tscore");
  function initMainMenu() {

    var Menu = remote.Menu;
    var template = [
      {
        label: $.i18n.t("ns.common:edit"),
        submenu: [
          {
            label: $.i18n.t("ns.common:undo") ,
            accelerator: 'CmdOrCtrl+Z',
            role: 'undo'
          },
          {
            label: $.i18n.t("ns.common:redo") ,
            accelerator: 'Shift+CmdOrCtrl+Z',
            role: 'redo'
          },
          {
            type: 'separator'
          },
          {
            label: $.i18n.t("ns.common:cut") ,
            accelerator: 'CmdOrCtrl+X',
            role: 'cut'
          },
          {
            label: $.i18n.t("ns.common:copy") ,
            accelerator: 'CmdOrCtrl+C',
            role: 'copy'
          },
          {
            label: $.i18n.t("ns.common:paste") ,
            accelerator: 'CmdOrCtrl+V',
            role: 'paste'
          },
          {
            label: $.i18n.t("ns.common:selectAll") ,
            accelerator: 'CmdOrCtrl+A',
            role: 'selectall'
          },
        ]
      },
      {
        label:  $.i18n.t("ns.common:view"),
        submenu: [
          {
            label: $.i18n.t("ns.common:reloadApplication"),
            accelerator: 'CmdOrCtrl+R',
            click: function(item, focusedWindow) {
              if (focusedWindow) {
                focusedWindow.reload();
              }
            }
          },
        ]
      },
    ];
    if (process.platform == 'darwin') {
      template.unshift({
        label: $.i18n.t("ns.common:name"),
        submenu: [
          {
            label: $.i18n.t("ns.common:aboutTagSpaces"),
            role: 'about'
          },
          {
            type: 'separator'
          },
          {
            label: $.i18n.t("ns.common:services"),
            role: 'services',
            submenu: []
          },
          {
            type: 'separator'
          },
          {
            label: $.i18n.t("ns.common:hideTagSpaces"),
            accelerator: 'Command+H',
            role: 'hide'
          },
          {
            label: $.i18n.t("ns.common:hideOthers"),
            accelerator: 'Command+Alt+H',
            role: 'hideothers'
          },
          {
            label: $.i18n.t("ns.common:showAll"),
            role: 'unhide'
          },
          {
            type: 'separator'
          },
          {
            label: $.i18n.t("ns.common:quit"),
            accelerator: 'Command+Q',
            click: function() { app.quit(); }
          },
        ]
      });
    }
  }
});
