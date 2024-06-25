N
o
 
l
i
n
e
s
import manifest from '../../../../package.json';
import platform from '../../utils/platform';
export default {
  submenu: [{
    label: 'Version ' + manifest.version,
    allow: platform.isNonDarwin,
    enabled: false
  }, {
    id: 'check-for-update',
    label: 'Check for &Update',
    allow: platform.isNonDarwin && global.application.autoUpdateManager.enabled,
  }, {
  }]
};
