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
  onClose(event) {
    if (platform.isWin && prefs.get('show-tray')) {
    }
  }
}
