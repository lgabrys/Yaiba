import app from 'app';
export function appQuit() {
  return function(menuItem, browserWindow) {
    app.exit();
  };
}
