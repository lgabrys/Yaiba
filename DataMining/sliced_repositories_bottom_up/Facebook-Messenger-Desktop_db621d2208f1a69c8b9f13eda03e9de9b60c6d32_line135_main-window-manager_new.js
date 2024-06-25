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
import platform from '../utils/platform';
import prefs from '../utils/prefs';
import EventEmitter from 'events';
class MainWindowManager extends EventEmitter {
  constructor(manifest, options) {
    this.forceClose = false;
  }
  onClose(event) {
    if (platform.isWin && !this.forceClose && prefs.get('show-tray')) {
    }
  }
}
