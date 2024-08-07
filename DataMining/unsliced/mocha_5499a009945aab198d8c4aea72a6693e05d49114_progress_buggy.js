
/**
 * Module dependencies.
 */

var Base = require('./base')
  , color = Base.color;

/**
 * Expose `Progress`.
 */

exports = module.exports = Progress;

/**
 * General progress bar color.
 */

Base.colors.progress = 90;

/**
 * Initialize a new `Progress` matrix test reporter.
 *
 * @param {Runner} runner
 * @param {Object} options
 * @api public
 */

function Progress(runner, options) {
  Base.call(this, runner);

  var self = this
    , options = options || {}
    , stats = this.stats
    , width = Base.window.width * .50 | 0
    , total = runner.total
    , complete = 0
    , max = Math.max;

  // default chars
  options.open = options.open || '[';
  options.complete = options.complete || '=';
  options.incomplete = options.incomplete || '⋅';
  options.close = options.close || ']';
  options.verbose = true;

  // tests started
  runner.on('start', function(){
    console.log();
    Base.cursor.hide();
  });

  // tests complete
  runner.on('test end', function(){
    var incomplete = total - complete
      , percent = complete++ / total
      , n = width * percent | 0
      , i = width - n;

    process.stdout.write('\r');
    process.stdout.write(color('progress', '  ' + options.open));
    process.stdout.write(Array(n).join(options.complete));
    process.stdout.write(Array(i).join(options.incomplete));
    process.stdout.write(color('progress', options.close));
    if (options.verbose) {
      process.stdout.write(color('progress', ' ' + complete + ' of ' + total));
    }
  });

  // tests are complete, output some stats
  // and the failures if any
  runner.on('end', function(){
    Base.cursor.show();
    console.log('\n');
    if (stats.failures) {
      console.log(color('fail message', '  ✖ %d of %d tests failed'), stats.failures, stats.tests);
      Base.list(self.failures);
    } else {
      console.log(color('pass message', '  ✔ %d tests completed in %dms'), stats.tests, stats.duration);
    }
    console.log();
    process.exit(stats.failures);
  });
}