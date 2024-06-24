
const template = [
  './templates/main-app-darwin',
  './templates/main-app-nondarwin',
  './templates/main-edit',
  './templates/main-view',
  './templates/main-theme',
  './templates/main-window',
  './templates/main-help'
].map(p => require(p).default);
export default parseTemplate(template, null);
import template from '../menus/main';
import Menu from 'menu';
import EventEmitter from 'events';
class MainMenuManager extends EventEmitter {
  create() {
    if (!this.menu) {
      this.menu = Menu.buildFromTemplate(template);
    } else {
  }
}
