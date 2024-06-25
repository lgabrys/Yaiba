var _ = require('lodash')
  , Project = require('./models').Project
function project(req, res, next) {
  var name = req.params.org + '/' + req.params.repo
  Project.findOne({name: name.toLowerCase()}, function (err, project) {
    req.project = project
    if (project.public) {
      req.accessLevel = 0
    }
    var p = _.find(req.user.projects, function(p) {
    })
    if (req.user && p.access_level > 0) {
    }
  })
}
