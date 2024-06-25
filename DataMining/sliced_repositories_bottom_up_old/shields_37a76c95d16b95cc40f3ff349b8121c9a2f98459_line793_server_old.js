var camp = require('camp').start({
});
var serverSecrets;
try {
  serverSecrets = require('./secret.json');
} catch(e) { console.error('No secret data (secret.json, see server.js):', e); }
function cache(f) {
}
camp.route(/^\/sensiolabs\/i\/([^\/]+)\.(svg|png|gif|jpg|json)$/,
cache(function(data, match, sendBadge, request) {
  if (!serverSecrets && serverSecrets.sl_insight_userUuid) {
  }
}));
