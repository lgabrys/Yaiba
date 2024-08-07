/*
 * grunt
 * http://gruntjs.com/
 *
 * Copyright (c) 2012 "Cowboy" Ben Alman
 * Licensed under the MIT license.
 * http://benalman.com/about/license/
 */

module.exports = function(grunt) {

  // External libs.
  var jshint = require('jshint').JSHINT;

  // ==========================================================================
  // TASKS
  // ==========================================================================

  grunt.registerMultiTask('lint', 'Validate files with JSHint.', function() {
    // Get flags and globals, allowing target-specific options and globals to
    // override the default options and globals.
    var options, globals, tmp;

    // Check for a jshintrc file.
    if (tmp = grunt.config(['jshint', this.target, 'jshintrc'])) {
      // If a target-specific jshintrc file was specified, read it.
      grunt.verbose.writeln('Using "' + this.target + '" jshintrc file.');
      options = grunt.file.readJSON(tmp);
    } else if (tmp = grunt.config('jshint.jshintrc')) {
      // If a global jshintrc file was specified, read it.
      grunt.verbose.writeln('Using master jshintrc file.');
      options = grunt.file.readJSON(tmp);
    }

    if (options) {
      // A jshintrc file was read.
      if (options.predef) {
        // Temp kluge for https://github.com/jshint/node-jshint/issues/104
        globals = {};
        options.predef.forEach(function(key) {
          globals[key] = true;
        });
        delete options.predef;
      }

    } else {
      // No jshintrc file was read.
      tmp = grunt.config(['jshint', this.target, 'options']);
      if (typeof tmp === 'object') {
        grunt.verbose.writeln('Using "' + this.target + '" JSHint options.');
        options = tmp;
      } else {
        grunt.verbose.writeln('Using master JSHint options.');
        options = grunt.config('jshint.options');
      }

      tmp = grunt.config(['jshint', this.target, 'globals']);
      if (typeof tmp === 'object') {
        grunt.verbose.writeln('Using "' + this.target + '" JSHint globals.');
        globals = tmp;
      } else {
        grunt.verbose.writeln('Using master JSHint globals.');
        globals = grunt.config('jshint.globals');
      }
    }

    grunt.verbose.writeflags(options, 'JSHint options');
    grunt.verbose.writeflags(globals, 'JSHint globals');

    // Lint specified files.
    grunt.file.expandFiles(this.file.src).forEach(function(filepath) {
      grunt.helper('lint', grunt.file.read(filepath), options, globals, filepath);
    });

    // Fail task if errors were logged.
    if (this.errorCount) { return false; }

    // Otherwise, print a success message.
    grunt.log.writeln('Lint free.');
  });

  // ==========================================================================
  // HELPERS
  // ==========================================================================

  // No idea why JSHint treats tabs as options.indent # characters wide, but it
  // does. See issue: https://github.com/jshint/jshint/issues/430
  function getTabStr(options) {
    // Do something that's going to error.
    jshint('\tx', options || {});
    // If an error occurred, figure out what character JSHint reported and
    // subtract one.
    var character = jshint.errors && jshint.errors[0] && jshint.errors[0].character - 1;
    // If character is actually a number, use it. Otherwise use 1.
    var tabsize = isNaN(character) ? 1 : character;
    // If tabsize > 1, return something that should be safe to use as a
    // placeholder. \uFFFF repeated 2+ times.
    return tabsize > 1 && grunt.utils.repeat(tabsize, '\uFFFF');
  }

  var tabregex = /\t/g;

  // Lint source code with JSHint.
  grunt.registerHelper('lint', function(src, options, globals, extraMsg) {
    // JSHint sometimes modifies objects you pass in, so clone them.
    options = grunt.utils._.clone(options);
    globals = grunt.utils._.clone(globals);
    // Enable/disable debugging if option explicitly set.
    if (grunt.option('debug') !== undefined) {
      options.devel = options.debug = grunt.option('debug');
      // Tweak a few things.
      if (grunt.option('debug')) {
        options.maxerr = Infinity;
      }
    }
    var msg = 'Linting' + (extraMsg ? ' ' + extraMsg : '') + '...';
    grunt.verbose.write(msg);
    // Tab size as reported by JSHint.
    var tabstr = getTabStr(options);
    var placeholderregex = new RegExp(tabstr, 'g');
    // Lint.
    var result = jshint(src, options || {}, globals || {});
    // Attempt to work around JSHint erroneously reporting bugs.
    // if (!result) {
    //   // Filter out errors that shouldn't be reported.
    //   jshint.errors = jshint.errors.filter(function(o) {
    //     return o && o.something === 'something';
    //   });
    //   // If no errors are left, JSHint actually succeeded.
    //   result = jshint.errors.length === 0;
    // }
    if (result) {
      // Success!
      grunt.verbose.ok();
    } else {
      // Something went wrong.
      grunt.verbose.or.write(msg);
      grunt.log.error();
      // Iterate over all errors.
      jshint.errors.forEach(function(e) {
        // Sometimes there's no error object.
        if (!e) { return; }
        var pos;
        var evidence = e.evidence;
        var character = e.character;
        if (evidence) {
          // Manually increment errorcount since we're not using grunt.log.error().
          grunt.fail.errorcount++;
          // Descriptive code error.
          pos = '['.red + ('L' + e.line).yellow + ':'.red + ('C' + character).yellow + ']'.red;
          grunt.log.writeln(pos + ' ' + e.reason.yellow);
          // If necessary, eplace each tab char with something that can be
          // swapped out later.
          if (tabstr) {
            evidence = evidence.replace(tabregex, tabstr);
          }
          if (character > evidence.length) {
            // End of line.
            evidence = evidence + ' '.inverse.red;
          } else {
            // Middle of line.
            evidence = evidence.slice(0, character - 1) + evidence[character - 1].inverse.red +
              evidence.slice(character);
          }
          // Replace tab placeholder (or tabs) but with a 2-space soft tab.
          evidence = evidence.replace(tabstr ? placeholderregex : tabregex, '  ');
          grunt.log.writeln(evidence);
        } else {
          // Generic "Whoops, too many errors" error.
          grunt.log.error(e.reason);
        }
      });
      grunt.log.writeln();
    }
  });

};
