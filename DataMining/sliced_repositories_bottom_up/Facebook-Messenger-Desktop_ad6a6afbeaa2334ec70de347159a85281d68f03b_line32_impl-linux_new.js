import manifest from '../../../../package.json';
import EventEmitter from 'events';
class AutoUpdater extends EventEmitter {
  setFeedURL(latestReleaseUrl) {
    this.latestReleaseUrl = latestReleaseUrl;
  }
  checkForUpdates() {
    const packageType = manifest.distrib.split(':')[1];
    let arch = null;
    if (packageType == 'deb') {
      arch = process.arch == 'ia32' ? 'i386' : 'amd64';
    } else {
      arch = process.arch == 'ia32' ? 'i386' : 'x86_64';
    }
    const options = {
      url: this.latestReleaseUrl,
      qs: {
        pkg: packageType,
        arch: arch
      },
      json: true
    };
  }
}
