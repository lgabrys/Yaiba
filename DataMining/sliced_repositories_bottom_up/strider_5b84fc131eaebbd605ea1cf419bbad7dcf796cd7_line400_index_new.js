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
  , pjson = require('../package.json')


exports.index = function(req, res){
  if (req.session.return_to) {
    var return_to = req.session.return_to
    req.session.return_to=null
    return res.redirect(return_to)
  }
  var code = ""
  if (req.param('code') !== undefined) {
    code = req.param('code')
  }
  jobs.latestJobs(req.user, true, function (err, jobs) {
  })
};

/* TODO: This is currently disabled. Do we need a kickoff at all?
 *
 * GET /kickoff  - start configuration wizard for a job
exports.kickoff = function(req, res, github) {
  var gh = github || gh;
  // Assert cached github metadata
  if (req.user.github_metadata === undefined
    || req.user.github_metadata[req.user.github.id] === undefined) {
    res.statusCode = 400;
    res.end("please call /api/github/metadata before this");
  } else {
    // Find the metadata for the repo we are kicking off on
    var kickoff_repo_metadata = req.user.get_repo_metadata(req.params.githubId);
    var trepo = whitelist_repo_metadata(kickoff_repo_metadata);
    // Check whether someone else has already configured this repository
    User.findOne({'github_config.url':trepo.url.toLowerCase()}, function(err, user) {
      if (!user) {
        res.render('kickoff.html', {repo: JSON.stringify(trepo)})
      } else {
        res.render('kickoff-conflict.html', {repo: JSON.stringify(trepo)});
      }
    });

  }
};
 */





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
      provider.getBranches(req.user.account(req.project.provider).config,
        req.project.provider.config, req.project, function(err, branches) {
          if (err) {
          }
          var have = {}
            , newBranches = false
            , i
          for (i=0; i<req.project.branches.length; i++) {
            have[req.project.branches[i].name] = true
          }
          for (i=0; i<branches.length; i++) {
            newBranches = true
            req.project.branches.push({
            })
          }
          Project.update({_id: req.project._id}, {$set: {branches: req.project.branches}}, function (err, project) {
            if (err || !project) console.error('failed to save branches')
          })
      })
    } else {
  })
}

exports.status = function(req, res) {
  function error(message) {
    res.statusCode = 500;
    var resp = {
      status: "error",
      version: "StriderCD (http://stridercd.com) " + pjson.version,
      results: [],
      errors: [{message:message}]
    }
   return res.jsonp(resp)
  }
  function ok() {
    res.statusCode = 200;
  }
};
function getDeep(obj) {
  return [].slice.call(arguments, 1).reduce(function (obj, name) {
  }, obj)
}
function deepObj(obj) {
  var names = [].slice.call(arguments, 1)
  return names.reduce(function (obj, name) {
    return obj[name] || (obj[name] = {})
  }, obj)
}
function groupRepos(account, repomap, tree, repos) {
  var groups = deepObj(repomap, account.provider, account.id)
    , projectmap = getDeep(tree, account.provider, account.id) || {}
  for (var i=0; i<repos.length; i++) {
    if (!groups[repos[i].group]) {
      groups[repos[i].group] = {
      }
    }
    repos[i].project = projectmap[repos[i].id]
    if (repos[i].project) {
      groups[repos[i].group].configured += 1
    }
  }
}
exports.projects = function(req, res) {
  Project.find({creator: req.user._id}).lean().exec(function (err, projects) {
    req.user.accounts.forEach(function (account) {
      var useCache = req.query.refresh !== account.provider && req.query.aid != account.id
    })
  })
}
