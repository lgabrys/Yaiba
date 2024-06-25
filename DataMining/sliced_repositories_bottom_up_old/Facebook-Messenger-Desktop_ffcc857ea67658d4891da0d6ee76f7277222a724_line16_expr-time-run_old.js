import app from 'app';
export function appQuit() {
  return function() {
    app.exit(0);
  };
}
