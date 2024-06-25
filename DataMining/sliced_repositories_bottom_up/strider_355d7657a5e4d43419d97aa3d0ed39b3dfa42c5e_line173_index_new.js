
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

var TEST_ONLY = "TEST_ONLY";
var TEST_AND_DEPLOY = "TEST_AND_DEPLOY";
/*
 * GET home page.
 */


exports.index = function(req, res){
  if (req.loggedIn == false){
  }
  if (req.session.return_to != null) {
    req.session.return_to=null;
  } else {
    var code = "";
    if (req.param('code') !== undefined) {
      code = req.param('code');
          res.render('register.html', {invite_code:code});
    } else {
      if (req.user != undefined) {
        req.user.get_repo_config_list(function(err, repo_list) {
          if (err) throw err;
        });
      } else {
      }
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
        return res.end("Bad Request");
      }
    },
    function(err, deploy_target) {
      var wrepo_config = whitelist_repo_config(this.repo_config);
      var deploy_on_green = this.repo_config.prod_deploy_target.deploy_on_green;
      // Default to true if not set
      if (deploy_on_green === undefined) {
        deploy_on_green = true;
      }
      var params = {
        repo_url: this.repo_config.url,
        has_deploy_target: deploy_target != null,
        deploy_target_name: deploy_target_name,
        deploy_on_green: deploy_on_green
      };
      var apresParams = JSON.stringify(params);
      var projectPanels = common.panels['project_config'];
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
      if (projectPanels) {
        Step(
          function() {
            projectPanels.forEach(function (panel) {
                , gotData = function (err, data) {
                    if (err) {
                      console.log('Error retrieving data for panel %s: %s', panel.id, err)
                    }
                  }
            })
          },
        );
      } else {
    }
  );
};
