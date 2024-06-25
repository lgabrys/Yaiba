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
import filePaths from '../utils/file-paths';
import platform from '../utils/platform';
import Tray from 'tray';
import EventEmitter from 'events';
class TrayManager extends EventEmitter {
  constructor(mainWindowManager, notifManager) {
    this.notifManager = notifManager;
  }
  create() {
    if (platform.isDarwin) {
      this.tray = new Tray(filePaths.getImagePath('trayBlackTemplate.png'));
    } else {
      if (this.notifManager.unreadCount) {
        this.tray = new Tray(filePaths.getImagePath('trayAlert.png'));
      } else {
        this.tray = new Tray(filePaths.getImagePath('tray.png'));
      }
    }
  }
  setEventListeners() {
    if (this.tray) {
      this.tray.on('click', ::this.onClick);
    }
  }
}
