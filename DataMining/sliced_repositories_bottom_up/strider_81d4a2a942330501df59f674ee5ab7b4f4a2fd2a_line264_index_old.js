
var BASE_PATH = "../lib/"

var _ = require('underscore')
  , Step = require('step')
  , common = require(BASE_PATH + 'common')
  , gh = require(BASE_PATH + 'github')
  , jobs = require(BASE_PATH + 'jobs')
  , logging = require(BASE_PATH + 'logging')
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
    var return_to = req.session.return_to;
    req.session.return_to=null;
  } else {
    var code = "";
    if (req.param('code') !== undefined) {
      code = req.param('code');
    } else {
      if (req.user != undefined) {
        req.user.get_repo_config_list(function(err, repo_list) {
          if (err) throw err;
        });
      } else {
        res.render('index.html');
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
  return trepo;
}


exports.kickoff = function(req, res, github) {
    || req.user.github_metadata[req.user.github.id] === undefined) {
    res.statusCode = 400;
  } else {

  }
};




exports.account = function(req, res){
  res.render('account.html');
};
exports.config = function(req, res)
{
  Step(
    function(err, repo_config) {
      if (err) {
        res.statusCode = 400;
      }
      req.user.get_prod_deploy_target(repo_config.url, this);
    },
    function(err, deploy_target) {
      var deploy_on_green = this.repo_config.prod_deploy_target.deploy_on_green;
      if (deploy_on_green === undefined) {
        deploy_on_green = true;
      }
      var deploy_target_name = null;
      if (deploy_target) {
        deploy_target_name = deploy_target.app;
      }
      var params = {
        repo_url: this.repo_config.url,
        has_deploy_target: deploy_target != null,
        deploy_target_name: deploy_target_name,
        deploy_on_green: deploy_on_green
      };
      var r = {
         // May be undefined if not configured
         display_name: wrepo_config.display_name,
         repo_org: req.params.org,
         repo_name: req.params.repo,
         apresController: "/javascripts/apres/controller/project_config.js",
         apresParams: apresParams,
         panels: [],
      };
      // TODO: factor out this logic so other resource handlers can use it later
      if (projectPanels) {
        Step(
          function() {
            projectPanels.forEach(function(p) {
              var f = function(err, res) {
              };
            });
          },
          function(err, panels) {
            if (err) {
              res.statusCode = 500;
            }
            r.panels = panels;
          }
        );
      } else {
        return res.render('project_config.html', r);
      }
    }
  );
};
exports.webhook_signature = function(req, res)
{
  gh.verify_webhook_req_signature(req, function(isOk, repo, user, payload) {
    if (active && isOk && gh.webhook_commit_is_to_master(payload)) {
      if (repo.has_prod_deploy_target) {
        var deploy_config = _.find(user[repo.prod_deploy_target.provider], function(item) {
        });
      } else {
    } else {
      console.log("received an incorrecly signed webhook or is not to master branch.");
      res.end("webhook bad or irrelevant");
    }
 });
};
exports.webhook_secret = function(req, res)
{
  gh.verify_webhook_req_secret(req, function(isOk, repo, user, payload) {
    var active = repo.active;
      active = true;
    if (active && isOk && gh.webhook_commit_is_to_master(payload)) {
      var github_commit_id = payload.after;
      var github_commit_info = gh.webhook_extract_latest_commit_info(payload);
      var repo_mdatadata;
    } else {
 });
};
