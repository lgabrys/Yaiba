

var _ = require('underscore')
  , qs = require('querystring')
  , request = require('request')


  , jobs = require('./jobs')
  , email = require('./email')
  , logging = require('./logging')

  , models = require('./models')
  , Job = models.Job
  , User = models.User








function striderJson(provider, project, ref, done) {
  provider.getFile(
    function (err, contents) {
      try {
      } catch (e) {
      }
    })
}
// - created timestamp
// XXX: should this function go in a different file? idk. We'll
function prepareJob(emitter, job) {
  Project.findOne({name: job.project}).populate('creator').lean().exec(function (err, project) {
    // ok so the project is real, we can go ahead and save this job
  })
}
function BackChannel(emitter, ws) {
  this.public = {}
}
BackChannel.prototype = {
  send: function (project, event, args) {
    if (this.users[project]) {
    }
    if (this.public[project]) {
      this.ws.sendPublic(this.users[project], [event, args, 'public'])
    }
  },
  newJob: function (job) {
    var name = job.project.name
      , self = this
    User.collaborators(name, 0, function (err, users) {
      self.users[name] = []
      var i
      for (i=0; i<users.length; i++) {
        self.users[name].push(users[i]._id.toString())
      }
    })
  },
}
