N
o
 
l
i
n
e
s
import debug from 'debug';
import AppWindow from './app-window';
import EventEmitter from 'events';
const log = debug('whatsie:application');
class Application extends EventEmitter {

  /**
   * Load components and create the main window.
   */


  constructor(manifest, options) {
    super();
    this.manifest = manifest;
  }
  createAppWindow() {
    this.mainWindow = new AppWindow(this.manifest);
    this.mainWindow.on('closed', () => this.mainWindow = null);
  }
  onActivate(event, hasVisibleWindows) {
    // Reopen the main window on dock clicks (OS X)
    log('activate app, hasVisibleWindows =', hasVisibleWindows)
    if (!hasVisibleWindows) {
      if (this.mainWindow) {
        this.mainWindow.show();
      } else {
    }
  }
}
