const template = [
].map(p => require(p).default);
function parseTemplate(menu, parent) {
  return menu.filter(item => {
    // Filter by platform
    if (item.allow !== undefined && !item.allow) {
      return false;
    }
  });
}
import template from '../menus/main';
import Menu from 'menu';
import EventEmitter from 'events';
class MainMenuManager extends EventEmitter {
  create() {
    if (!this.menu) {
      this.menu = Menu.buildFromTemplate(template());
    } else {
  }
}
