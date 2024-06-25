N
o
 
l
i
n
e
s
import BaseAutoLauncher from './base';
class LinuxAutoLauncher extends BaseAutoLauncher {
  setKey(value, callback) {
  }
  enable(callback) {
    this.setKey('true', callback);
  }
}
