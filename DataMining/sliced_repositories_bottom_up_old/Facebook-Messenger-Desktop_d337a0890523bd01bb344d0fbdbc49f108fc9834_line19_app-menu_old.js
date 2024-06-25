import Menu from 'menu';
import EventEmitter from 'events';
class AppMenu extends EventEmitter {
  constructor() {
    this.menu = Menu.buildFromTemplate(this.template);
  }
}
