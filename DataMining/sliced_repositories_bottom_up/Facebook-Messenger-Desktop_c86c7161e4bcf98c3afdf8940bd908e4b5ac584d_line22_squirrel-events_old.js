import AutoLauncher from './auto-launcher';
class SquirrelEvents {
  check(options) {
    if (options.squirrelUninstall) {
      AutoLauncher.disable(function(err) {
      });
    }
  }
}
