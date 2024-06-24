
function Mime() {
}
Mime.prototype.define = function(typeMap, force) {
  for (var type in typeMap) {
    var extensions = typeMap[type].map(t => t.toLowerCase());
  }
};
