'use strict';

var _ = require('lodash'),
    async = require('async'),
    fs = require('fs-extra'),
    glob = require('glob'),
    Module = require('module'),
    path = require('path');

var mapping = require('../../fp/_mapping');

var templatePath = path.join(__dirname, 'template');

var aliasToReal = _.transform(mapping.realToAlias, function(result, aliases, realName) {
  _.each(aliases, function(alias) {
    result[alias] = realName;
  });
});

var template = _.transform(glob.sync(path.join(templatePath, '*.jst')), function(result, filePath) {
  result[path.basename(filePath, '.jst')] = _.template(fs.readFileSync(filePath));
}, {});

var aryMethods = _.union(
  mapping.aryMethod[1],
  mapping.aryMethod[2],
  mapping.aryMethod[3],
  mapping.aryMethod[4]
);

var categories = [
  'array',
  'collection',
  'date',
  'function',
  'lang',
  'math',
  'number',
  'object',
  'seq',
  'string',
  'util'
];

function isAlias(funcName) {
  return _.has(aliasToReal, funcName);
}

function isCategory(funcName) {
  return _.includes(categories, funcName);
}

function isThru(funcName) {
  return !_.includes(aryMethods, funcName);
}

function getTemplate(moduleName) {
  var data = {
    'key': mapping.key,
    'name': _.result(aliasToReal, moduleName, moduleName)
  };

  if (isAlias(moduleName)) {
    return template.alias(data);
  }
  if (isCategory(moduleName)) {
    return template.category(data);
  }
  if (isThru(moduleName)) {
    return template.thru(data);
  }
  return template.module(data);
}

/*----------------------------------------------------------------------------*/

function onComplete(error) {
  if (error) {
    throw error;
  }
}

function build(target) {
  var fpPath = path.join(target, 'fp');

  // Glob existing lodash module paths.
  var modulePaths = glob.sync(path.join(target, '*.js'), {
    'nodir': true,
    'ignore': path.join(target, '_*.js')
  });

  // Add FP alias module paths.
  _.forOwn(aliasToReal, function(realName, alias) {
    modulePaths.push(path.join(target, alias + '.js'));
  });

  modulePaths = _.uniq(modulePaths);

  var actions = modulePaths.map(function(modulePath) {
    var moduleName = path.basename(modulePath, '.js');
    return _.partial(fs.writeFile, path.join(fpPath, moduleName + '.js'), getTemplate(moduleName));
  })

  actions.unshift(_.partial(fs.copy, path.join(__dirname, '../../fp'), fpPath));
  actions.push(_.partial(fs.writeFile, path.join(target, 'fp.js'), template.fp()));
  actions.push(_.partial(fs.writeFile, path.join(fpPath, 'convert.js'), template.convert()));
  actions.push(_.partial(fs.writeFile, path.join(fpPath, '_util.js'), template._util()));

  async.series(actions, onComplete);
}

build(_.last(process.argv));
