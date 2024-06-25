N
o
 
l
i
n
e
s
N
o
 
l
i
n
e
s
import EventEmitter from 'events';
import MainWindowManager from './managers/main-window-manager';
import AutoUpdateManager from './managers/auto-update-manager';
class Application extends EventEmitter {
  constructor(manifest, options) {
    super();
    this.manifest = manifest;
    this.options = options;
  }
  init() {
    // Create the main app window
    this.mainWindowManager = new MainWindowManager(this.manifest, this.options);
    this.autoUpdateManager = new AutoUpdateManager(this.manifest, this.options, this.mainWindowManager);
  }
}
