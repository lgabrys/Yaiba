N
o
 
l
i
n
e
s
import template from '../menus/main';
import Menu from 'menu';
import AutoUpdater from '../components/auto-updater';
import EventEmitter from 'events';
class MainMenuManager extends EventEmitter {
  constructor() {
    this.cfuVisibleItem = null;
  }
  create() {
    if (!this.menu) {
      this.menu = Menu.buildFromTemplate(template());
    } else {
  }
  setAutoUpdaterListeners() {
    if (!this.cfuVisibleItem) {
      this.cfuVisibleItem = findItemById(this.menu.items, 'cfu-check-for-update');
    }
    const eventToIdMap = {
      'error': 'cfu-check-for-update',
      'checking-for-update': 'cfu-checking-for-update',
      'update-available': 'cfu-update-available',
      'update-not-available': 'cfu-check-for-update',
      'update-downloaded': 'cfu-update-downloaded'
    };
    for (let [eventName, itemId] of Object.entries(eventToIdMap)) {
      AutoUpdater.on(eventName, () => {
        log('auto updater on:', eventName, 'params:', ...arguments);
        this.cfuVisibleItem.visible = false;
        this.cfuVisibleItem = findItemById(this.menu.items, itemId);
        this.cfuVisibleItem.visible = true;
      });
    }
  }
}
