N
o
 
l
i
n
e
s
import app from 'app';
import BaseAutoLauncher from './base';
class Win32AutoLauncher extends BaseAutoLauncher {
  enable(callback) {
    const cmd = '"' + app.getPath('exe') + '" --os-startup';
  }
}
