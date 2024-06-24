import MenuItem from 'menu-item';
import Menu from 'menu';
function create(opt, browserWindow) {
  const webContents = browserWindow.webContents;
  const menu = new Menu();
  if (opt.isMisspelling) {
    for (let i = 0; i < opt.corrections.length && i < 3; i++) {
      menu.append(new MenuItem({
        label: 'Correct: ' + opt.corrections[i],
        click: () => webContents.send('call-webview-method', 'replaceMisspelling', opt.corrections[i])
      }));
    }
    menu.append(new MenuItem({
      label: 'Add to Dictionary', // TODO: Hunspell doesn't remember these
      click: () => webContents.send('add-selection-to-dictionary')
    }));
  }
}
