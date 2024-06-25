var util = require('../');
describe('date', function() {
  it('should return today\'s date', function(done) {
    var time = new Date();
    var dateutil = util.date('HH:MM:ss');
    dateutil.should.equal(time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds());
  })
});
