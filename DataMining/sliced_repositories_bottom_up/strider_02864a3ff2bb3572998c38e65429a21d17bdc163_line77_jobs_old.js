  , Job = require('./models').Job
function latestJob(project, small, done) {
  var query = Job.find({project: project.name.toLowerCase()})
}
