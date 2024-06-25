var Charsets        = require('./protocol/constants/charsets');
function ConnectionConfig(options) {
  if (typeof options === 'string') {
    options = ConnectionConfig.parseUrl(options);
  }
    : Charsets.UTF8_GENERAL_CI;
}
