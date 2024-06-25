import app from 'app';
class SquirrelEvents {
  teardownLeftoverUserData(cb) {
    log('removing user data folder', app.getPath('userData'));
  }
}
