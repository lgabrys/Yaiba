var pagelet = require('registry-status-pagelet');
module.exports = pagelet.extend({

  get status() {
    var results = {}
      , pagelet = this
      , data = this.pipe['npm-probe'].data;
    for (var type in data) {
      results[type] = data[type] || {};
      for (var registry in data[type]) {
        results[type][registry] = data[type][registry].slice(
          data[type][registry].length - pagelet.options[type].n - 1
        );
      }
    }
  },
});
