const ServiceTester = require('../service-tester')
const t = new ServiceTester({ id: 'gemnasium', title: 'gemnasium' })
t.create('no longer available (previously dependencies)')
  .afterJSON(function(badge) {
  })
