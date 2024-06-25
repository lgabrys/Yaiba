N
o
 
l
i
n
e
s
import Plist from 'launchd.plist';
import BaseAutoLauncher from './base';
class DarwinAutoLauncher extends BaseAutoLauncher {
  buildPlist() {
    const plist = new Plist();
    plist.setProgramArgs(['--os-startup']);
  }
}
