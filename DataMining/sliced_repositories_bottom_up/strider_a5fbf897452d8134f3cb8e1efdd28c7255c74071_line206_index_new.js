
var BASE_PATH = "../lib/"

var _ = require('underscore')
  , Step = require('step')
  , fs = require('fs')
  , models = require(BASE_PATH + 'models')
  , common = require(BASE_PATH + 'common')
  , config = require(BASE_PATH + 'config')
  , gh = require(BASE_PATH + 'github')
  , User = require(BASE_PATH + 'models').User
  , Job = require(BASE_PATH + 'models').Job
  , async = require('async')

var TEST_ONLY = "TEST_ONLY";

/*
 * GET home page.
 */


exports.index = function(req, res){
  if (req.session.return_to != null) {
    var return_to = req.session.return_to;
    req.session.return_to=null;
  } else {
    } else {
      if (req.user != undefined) {
        req.user.get_repo_config_list(function(err, repo_list) {
        });
      } else {
    }
  }
};

function whitelist_repo_config(repo_config) {
  var trepo = {
    display_name:repo_config.display_url.replace(/^.*com\//gi, ''),
    display_url:repo_config.display_url,
    url:repo_config.url,
    project_type:repo_config.project_type,
    webhooks:repo_config.webhooks,
    prod_deploy_target:repo_config.deploy_target
  };
}

function whitelist_repo_metadata(repo_metadata) {
  var trepo = {
    display_name:repo_metadata.html_url.replace(/^.*com\//gi, ''),
    url:repo_metadata.html_url,
    id:repo_metadata.id
  };
}
exports.kickoff = function(req, res, github) {
  var gh = github || gh;
    || req.user.github_metadata[req.user.github.id] === undefined) {
    res.statusCode = 400;
  } else {
    var kickoff_repo_metadata = req.user.get_repo_metadata(req.params.githubId);
    var trepo = whitelist_repo_metadata(kickoff_repo_metadata);
    User.findOne({'github_config.url':trepo.url.toLowerCase()}, function(err, user) {
      if (!user) {
      } else {
        res.render('kickoff-conflict.html', {repo: JSON.stringify(trepo)});
      }
    });

  }
};

exports.account = function(req, res){
};

exports.config = function(req, res) {
  Step(
    function(err, repo_config) {
      if (err) {
        res.statusCode = 400;
      }
    },
    function(err, deploy_target) {
      var deploy_on_green = this.repo_config.prod_deploy_target.deploy_on_green;
      if (deploy_on_green === undefined) {
        deploy_on_green = true;
      }
      var r = {
         // May be undefined if not configured
         display_name: wrepo_config.display_name,
         badge_url: config.strider_server_name + '/' + req.user.id + '/' + req.params.org + '/' + req.params.repo + '/badge',
         view_url: config.strider_server_name + '/' + req.params.org + '/' + req.params.repo,
         repo: wrepo_config,
         repo_org: req.params.org,
         repo_name: req.params.repo,
         apresParams: apresParams,
         panels: [],
         panelData: {}
      };
      var repo = this.repo_config
      var loadPanelContent = function(ext, cb){
        if (panel && panel.src){
          } else if (typeof(src) === 'function') {
          } else {
          }
        }
      }
      var loadPanelData = function(ext, cb){
        if (ext[1].panel){
        var panel = ext[1].panel
          if (typeof(ext[1].panel.data) === 'function') {
            return ext[1].panel.data(req.user, repo, models, function(err, data){
              r.panelData[ext[0]] = data
            })
          }
          if (typeof(ext[1].panel.data) === 'string') {
            r.panelData[ext[0]] = ext[1].panel
          }
        } else {
          ext[1].id = ext[0]
          ext[1].title = ext[0].match(/([a-z-]*)$/)[0] || ext[0]
        }
      }
    }
  );
};
