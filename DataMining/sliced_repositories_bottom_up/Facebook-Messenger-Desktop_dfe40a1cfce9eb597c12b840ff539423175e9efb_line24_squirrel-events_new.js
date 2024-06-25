import AutoLauncher from './auto-launcher';
class SquirrelEvents {
  check(options) {
    if (options.squirrelUninstall) {
      new AutoLauncher().disable((err) => {
      });
    }
  }
}
