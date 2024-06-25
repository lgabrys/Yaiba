var BASE_PATH = "../../lib/"
   , models = require(BASE_PATH + 'models')
   , Job = models.Job
function getJob(req, res, next) {
}
function data(req, res) {
  getJob(req, res, function (job) {
    req.setHeader('Content-type', 'application/json')
  })
}
