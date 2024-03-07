#!/usr/bin/env node

var cli = require('../lib/cli'),
    nodemon = require('../lib/');
    // updateNotifier = require('update-notifier'),
    // checks for available update and returns an instance
    // notifier = updateNotifier({
    //   packagePath: '../'
    // });

// if (notifier.update) {
//   // notify using the built-in convenience method
//   notifier.notify();
// }

var options = cli.parse(process.argv);
options.restartable = 'rs';

nodemon(options);

if (options.restartable) {
  // allow nodemon to restart when the use types 'rs\n'
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', function (data) {
    data = (data + '').trim().toLowerCase();
    if (data === options.restartable) {
      nodemon.restart();
    }
  });
}