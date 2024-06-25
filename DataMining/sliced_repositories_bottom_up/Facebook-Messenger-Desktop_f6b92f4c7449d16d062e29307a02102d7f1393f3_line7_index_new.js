N
o
 
l
i
n
e
s
import platform from '../../utils/platform';
let impl = null;
if (platform.isLinux) {
  impl = require('./impl-linux').default;
} else if (platform.isWin && global.options.portable) {
  impl = require('./impl-win32-portable').default;
}
