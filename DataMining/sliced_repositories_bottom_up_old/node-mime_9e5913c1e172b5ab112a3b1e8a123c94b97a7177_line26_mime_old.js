function Mime() {
}
Mime.prototype.define = function (map) {
  for (var type in map) {
    var exts = map[type];
    for (var i = 0; i < exts.length; i++) {
      if (process.env.DEBUG && this.types[exts]) {
      }
    }
  }
};
