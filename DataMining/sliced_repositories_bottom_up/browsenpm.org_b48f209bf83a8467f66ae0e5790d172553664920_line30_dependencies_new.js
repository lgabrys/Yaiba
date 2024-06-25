var GitHulk = require('githulk')
  , Dynamis = require('dynamis')
  , Page = require('../base').Page
  , Registry = require('npm-registry')
  , config = require('../config');
var couchdb = config.get('couchdb')
  , redisConf = config.get('redis');
var cradle = new (require('cradle')).Connection(couchdb)
  , redis = require('redis').createClient(
      redisConf.port,
      redisConf.host,
      { pass_auth: redisConf.auth }
    );
var githulk = new GitHulk({
  cache: new Dynamis('cradle', cradle, couchdb),
  tokens: config.get('tokens')
});
