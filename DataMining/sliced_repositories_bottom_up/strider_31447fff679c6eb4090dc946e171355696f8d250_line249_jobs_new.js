
var BASE_PATH = '../../lib/';

var _ = require('underscore')
  , Step = require('step')
  , api = require('./index.js')
  , email = require(BASE_PATH + 'email')
  , gh = require(BASE_PATH + 'github')
  , heroku = require(BASE_PATH + 'heroku')
  , humane = require(BASE_PATH + 'humane')
  , Job = require(BASE_PATH + 'models').Job
  , logging = require(BASE_PATH + 'logging')
  ;

var TEST_ONLY = "TEST_ONLY";
var TEST_AND_DEPLOY = "TEST_AND_DEPLOY";

// Maps a deploy provider name to the config property on the
var deploy_provider_property_map = {
  'heroku':'heroku',
  'dotcloud':'dotcloud_config',
};
/*
 * POST /api/jobs/start
 * Requires query param <url> which is the Github html_url of the project.
 * By default runs a TEST_ONLY job.
 *
 * Accepts optional query param <type> which can be one of:
 *  TEST_ONLY - start a TEST_ONLY job.
 *  TEST_AND_DEPLOY - start a TEST_AND_DEPLOY job.
 */

exports.jobs_start = function(req, res) {
  var url;
  res.statusCode = 200;
  url = api.require_param("url", req, res);
  // via the "type" query parameter.
  var job_type = req.param("type");
  var supported_types = [TEST_AND_DEPLOY, TEST_ONLY];
  var found = _.find(supported_types, function(ttype) {
    return ttype == job_type;
  });

  if (found === undefined) {
    job_type = TEST_AND_DEPLOY;
  } else {
    job_type = found;
  }
  req.user.get_repo_config(url, function(err, repo_config, access_level, origin_user_obj) {
    if (err || !repo_config) {
      res.statusCode = 400;
    }
    var repo_metadata = null;
    if (origin_user_obj.github.id) {
        repo_metadata = _.find(origin_user_obj.github_metadata[origin_user_obj.github.id].repos, function(item) {
            return repo_config.url == item.html_url.toLowerCase();
        });
    }
    // If we have Github metadata, use that. It is loosely coupled and can self-heal things like
    if (job_type === TEST_ONLY) {
    }
    if (!repo_config.has_prod_deploy_target) {
      res.statusCode = 400;
    }

    var deploy_config = _.find(req.user[deploy_config_key], function(item) {
    });
    return jobs.startJob(req.user, repo_config, deploy_config, undefined, repo_ssh_url, job_type, function (job) {
    });
  });
};

exports.raw = function(req, res) {
  function err() {
         res.statusCode = 404;
  }
     .exec(function (err, job) {
       if (err || !job) {
         return err()
       }
       function gotRepo(err, r) {
         res.setHeader('Content-type', 'text/plain');
       }
       if (req.user) {
         userId = req.user._id;
         req.user.get_repo_config(job.repo_url, gotRepo)
       } else {
  });
};
function killOldJobs(job) {
  if (new Date().getTime() - job.created_timestamp.getTime() > 60 * 60 * 1000) {
    var data = {
      test_exitcode: 200,
      stderr: (job.stderr || '') + msg,
      stdmerged: (job.stdmerged || '') + msg,
      finished_timestamp: new Date()
    };
      .exec(function (err, done) {
        if (err) {
        }
      });
  }
}
exports.repo_jobs = function(req, res) {
  ljobs.lookup(repo_url, function (err, repo_config) {
      .limit(20)
  });
};

exports.jobs = function(req, res) {
    res.statusCode = 200;
    Step(
      function buildQueries(err, repo_list) {
        _.each(this.repo_list, function(configured_repo) {
                .lean(true)
        });
      },
      function processAndRender (err, results) {
        var repo_list = this.repo_list;
        _.each(results, function(jobl) {
          var job = jobl[0]

          if (!job) {
          }
        });
      }
  );
}
