N
o
 
l
i
n
e
s
import EventEmitter from 'events';
import AutoUpdateManager from './managers/auto-update-manager';
class Application extends EventEmitter {
  init() {
    this.autoUpdateManager = new AutoUpdateManager();
  }
}
