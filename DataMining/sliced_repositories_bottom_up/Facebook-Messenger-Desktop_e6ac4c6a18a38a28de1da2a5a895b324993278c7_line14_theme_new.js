import electron from 'electron';
(function() {
  const ipcr = electron.ipcRenderer;
  ipcr.on('apply-theme', function(event, name) {
    if (!name) {
    }
  });
})();
