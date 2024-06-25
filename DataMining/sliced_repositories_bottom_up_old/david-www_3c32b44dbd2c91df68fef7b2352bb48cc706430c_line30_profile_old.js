  , github = require("./github")
function getRepos (user, authToken, options, cb) {
  if (!cb) {
    cb = options
    options = {page: 0, repos: [], pageSize: 100}
  } else {
    options = options || {page: 0, repos: [], pageSize: 100}
  }
  setImmediate(function () {
    var gh = github.getInstance(authToken)
      , repoMethod = authToken ? "getAll" : "getFromUser"
    gh.repos[repoMethod]({type: "all", user: user, page: options.page, per_page: options.pageSize}, function (er, data) {
    })
  })
}
