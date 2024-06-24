const request = require('request');
const autosave = require('json-autosave');
let serverSecrets;
try {
  serverSecrets = require('../private/secret.json');
} catch(e) {}
let githubUserTokens = {data: []};
const githubUserTokensFile = './private/github-user-tokens.json';
autosave(githubUserTokensFile, {data: []}).then(function(f) {
  githubUserTokens = f;
}).catch(function(e) { console.error('Could not create ' + githubUserTokensFile); });
function sendTokenToAllServers(token) {
  const ips = serverSecrets.shieldsIps;
  return Promise.all(ips.map(function(ip) {
    return new Promise(function(resolve, reject) {
      const options = {
        url: 'https://' + ip + '/github-auth/add-token',
        method: 'POST',
        form: {
          shieldsSecret: serverSecrets.shieldsSecret,
          token: token,
        },
        // We target servers by IP, and we use HTTPS. Assuming that
        // 1. Internet routers aren't hacked, and
        // 2. We don't unknowingly lose our IP to someone else,
        // we're not leaking people's and our information.
        // (If we did, it would have no impact, as we only ask for a token,
        // no GitHub scope. The malicious entity would only be able to use
        // our rate limit pool.)
        // FIXME: use letsencrypt.
        strictSSL: false,
      };
      request(options, function(err, res, body) {
        if (err != null) { return reject('Posting the GitHub user token failed: ' + err.stack); }
        resolve();
      });
    });
  }));
}
