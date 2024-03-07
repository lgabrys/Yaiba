import app from 'app';
import shell from 'shell';

import BaseMenu from './base';

class AppMenu extends BaseMenu {

  constructor() {
    const template = require(`../../../menus/${process.platform}.json`);
    super(template);
  }

  /**
   * Set event listeners for menu commands.
   */
  setEventListeners() {
    this.setAppEventListeners();
    this.setWindowEventListeners();
  }

  setAppEventListeners() {
    this.on('application:quit', ::app.quit);

    this.on('application:show-settings', function() {

    });

    this.on('application:open-url', function(menuItem) {
      shell.openExternal(menuItem.url);
    });

    this.on('application:check-for-update', () => {
      // Updater.checkAndPrompt(this.manifest, true)
      //   .then(function(willUpdate) {
      //     if (willUpdate) {
      //       app.quit();
      //     }
      //   })
      //   .catch(::console.error);
    });
  }

  setWindowEventListeners() {
    this.on('window:reload', function() {
      BrowserWindow.getFocusedWindow().reload();
    });

    this.on('window:toggle-dev-tools', function() {
      BrowserWindow.getFocusedWindow().toggleDevTools();
    });
  }

}

export default AppMenu;
