var fs = require('fs');
var MODULE_WRAP_REGEX = new RegExp(
);
function ScriptFileStorage(config) {
  config = config || {};
}
var $class = ScriptFileStorage.prototype;
$class.save = function(path, content, callback) {
  var match = MODULE_WRAP_REGEX.exec(content);
};
$class.load = function(path, callback) {
  fs.readFile(
    { encoding: 'utf-8' },
  );
};
