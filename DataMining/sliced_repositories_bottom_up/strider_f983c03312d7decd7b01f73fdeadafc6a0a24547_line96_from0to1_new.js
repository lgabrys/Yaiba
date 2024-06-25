var models = require('../')
  , User = models.User
function makeTrigger(job, commit) {
  if (!commit) {
    return {
      type: 'manual',
      author: {
      },
      message: job.type === 'TEST_AND_DEPLOY' ? 'Redeploy' : 'Retest',
    }
  }
}
