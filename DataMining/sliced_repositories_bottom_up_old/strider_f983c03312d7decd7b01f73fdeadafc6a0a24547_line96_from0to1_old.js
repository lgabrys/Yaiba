var models = require('../')
  , User = models.User
function makeTrigger(job, commit) {
  if (!commit) {
    return {
      type: 'manual',
      author: {
      },
      message: 'Manual trigger',
    }
  }
}
