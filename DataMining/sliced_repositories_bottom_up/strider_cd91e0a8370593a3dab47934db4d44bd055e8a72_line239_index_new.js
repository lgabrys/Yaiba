var BASE_PATH = "../lib/"

var _ = require('underscore')
  , Step = require('step')
  , path = require('path')

  , utils = require(BASE_PATH + 'utils')
  , models = require(BASE_PATH + 'models')
  , common = require(BASE_PATH + 'common')
  , jobs = require(BASE_PATH + 'jobs')
  , models = require(BASE_PATH + 'models')
  , Project = models.Project
  , User = models.User
  , Job = models.Job

exports.index = function(req, res){
  if (req.session.return_to) {
    req.session.return_to=null
  }
  var code = ""
  if (req.param('code') !== undefined) {
    code = req.param('code')
  }
  jobs.latestJobs(req.user, true, function (err, jobs) {
  })
};






exports.account = function(req, res){
  var hosted = {}
    , providers = common.userConfigs.provider
  for (var id in providers) {
    if (common.extensions.provider[id].hosted) {
      hosted[id] = providers[id]
    }
  }
};
exports.setConfig = function (req, res) {
  var attrs = 'public'.split(' ')
  for (var i=0; i<attrs.length; i++) {
    if ('undefined' !== typeof req.body[attrs[i]]) {
      req.project[attrs[i]] = req.body[attrs[i]]
    }
  }
  req.project.save(function (err) {
  })
}
exports.getRunnerConfig = function (req, res) {
  var branch = req.project.branch(req.params.branch)
}
exports.setRunnerConfig = function (req, res) {
  var branch = req.project.branch(req.params.branch)
  branch.runner.config = req.body
  req.project.save(function (err, project) {
  })
}
exports.getPluginConfig = function (req, res) {
}
exports.setPluginConfig = function (req, res) {
  req.pluginConfig(req.body, function (err, config) {
  })
}
exports.configureBranch = function (req, res) {
  var branch = req.project.branch(req.params.branch)
  var attrs = 'active privkey pubkey mirror_master deploy_on_green runner plugins'.split(' ')
  for (var i=0; i<attrs.length; i++) {
    if ('undefined' !== typeof req.body[attrs[i]]) {
      branch[attrs[i]] = req.body[attrs[i]]
    }
  }
}
function setPluginOrder(req, res, branch) {
  var plugins = req.body.plugin_order
    , old = branch.plugins || []
    , map = {}
    , i
  for (i=0; i<old.length; i++) {
    map[old[i].id] = old[i]
  }
  for (i=0; i<plugins.length; i++) {
    if (map[plugins[i].id]) {
      plugins[i].config = map[plugins[i].id].config
    } else {
      plugins[i].config = {}
    }
  }
  branch.plugins = plugins
}
exports.reloadConfig = function (req, res, next) {
  common.loader.initConfig(
    function (err, configs) {
      common.pluginConfigs = configs
      common.loader.initUserConfig(
        function (err, configs) {
          common.userConfigs = configs
        })
    })
}

exports.getProviderConfig = function (req, res) {
}
exports.setProviderConfig = function (req, res) {
  var config = utils.validateAgainstSchema(req.body, common.extensions.provider[req.project.provider.id].config)
  req.project.save(function (err, project) {
  })
}
exports.config = function(req, res) {
  User.collaborators(req.project.name, 0, function (err, users) {
    var provider = common.extensions.provider[req.project.provider.id]
    if (false && typeof provider.getBranches === 'function') {
    } else {
  })
}
