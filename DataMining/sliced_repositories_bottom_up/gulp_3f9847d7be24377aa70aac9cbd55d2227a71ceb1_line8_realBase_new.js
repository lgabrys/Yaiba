var path = require('path');
module.exports = function(fileBase, filePath) {
  fileBase = path.resolve(fileBase);
  filePath = path.resolve(filePath);

  return filePath.slice(fileBase.length+1, filePath.length);
};
