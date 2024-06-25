N
o
 
l
i
n
e
s
import manifest from '../../../../package.json';
import Winreg from 'winreg';
import BaseAutoLauncher from './base';
class Win32AutoLauncher extends BaseAutoLauncher {
  static REG_KEY = new Winreg({
  });
  disable(callback) {
    Win32AutoLauncher.REG_KEY.remove(manifest.productName, (err) => {
      const notFoundMsg = 'The system was unable to find the specified registry key or value.';
      const notFound = err && err.message && err.message.indexOf(notFoundMsg) > -1;
    });
  }
}
