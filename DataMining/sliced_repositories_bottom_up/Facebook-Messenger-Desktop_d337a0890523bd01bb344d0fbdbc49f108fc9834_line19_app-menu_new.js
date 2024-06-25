import Menu from 'menu';
import EventEmitter from 'events';
class AppMenu extends EventEmitter {
  constructor() {
    super();
    const template = require(`../../menus/${process.platform}.json`);
    this.menu = Menu.buildFromTemplate(template);
  }
}
