import app from 'app';
(function() {
  const isDuplicateInstance = app.makeSingleInstance(() => {
    if (global.application) {
      const mainWindow = global.application.mainWindow;
    }
  });
})();
