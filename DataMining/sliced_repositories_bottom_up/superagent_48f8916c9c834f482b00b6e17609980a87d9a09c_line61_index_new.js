
  , Part = require('./part')
  , qs = require('qs');
/**
 * Expose the request function.
 */
exports = module.exports = request;
exports.version = '0.1.3';
exports.Part = Part;
exports.protocols = {
};
function isObject(obj) {
  return null != obj && 'object' == typeof obj;
}
