var util = require('../');
describe('date', function() {
  it('should return today\'s date', function(done) {
    var time = new Date();
    var dateutil = util.date('HH:MM:ss');
    dateutil.should.equal(('0' + time.getHours()).slice(-2) + ':' + ('0' + time.getMinutes()).slice(-2) + ':' + ('0' + time.getSeconds()).slice(-2));
  })
});
