import Plist from 'launchd.plist';
import BaseAutoLauncher from 'browser/components/auto-launcher/base';
class DarwinAutoLauncher extends BaseAutoLauncher {
  buildPlist() {
    const plist = new Plist();
    plist.setProgram(app.getPath('exe'));
  }
}
