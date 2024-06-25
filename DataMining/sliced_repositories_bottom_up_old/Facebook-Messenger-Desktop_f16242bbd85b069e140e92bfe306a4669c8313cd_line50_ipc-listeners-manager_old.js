import EventEmitter from 'events';
class IpcListenersManager extends EventEmitter {
  constructor (notifManager, trayManager, mainWindowManager) {
    super();
    this.mainWindowManager = mainWindowManager;
  }
  /**
   * Bind events to local methods.
   */
  onNotifCount (event, count, badgeDataUrl) {
    log('on renderer notif-count', count, !!badgeDataUrl || null);
    this.mainWindowManager.suffixWindowTitle(count ? ' (' + count + ')' : '');
  }
}
