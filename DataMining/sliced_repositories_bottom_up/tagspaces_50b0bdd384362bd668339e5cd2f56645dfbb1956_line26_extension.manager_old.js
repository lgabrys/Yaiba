define(function(require, exports, module) {
  function getExtFolderPath() {
    var extPath = "ext";
    if (isWin) {
      var extRealPath = location.href.replace(/file:\/\/\//gi, "").replace(/index.html/gi, extPath);
      return extRealPath;
    }
  }
});
