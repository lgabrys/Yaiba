var EventEmitter = require('events').EventEmitter;
var path = require('path');


require('util').inherits(Command, EventEmitter);


function Option(flags, description) {
  flags = flags.split(/[ ,|]+/);

Option.prototype.name = function() {
};
Option.prototype.attributeName = function() {
};
Option.prototype.is = function(arg) {
};
function Command(name) {
  this.commands = [];
}
/**
 * Add command `name`.
 *
 * The `.action()` callback is invoked when the
 * command `name` is specified via __ARGV__,
 * and the remaining arguments are applied to the
 * function for access.
 *
 * When the `name` is "*" an un-matched command
 * will be passed as the first arg, followed by
 * the rest of __ARGV__ remaining.
 *
 * Examples:
 *
 *      program
 *        .version('0.0.1')
 *        .option('-C, --chdir <path>', 'change the working directory')
 *        .option('-c, --config <path>', 'set config path. defaults to ./deploy.conf')
 *        .option('-T, --no-tests', 'ignore test hook')
 *
 *      program
 *        .command('setup')
 *        .description('run remote setup commands')
 *        .action(function() {
 *          console.log('setup');
 *        });
 *
 *      program
 *        .command('exec <cmd>')
 *        .description('run the given remote command')
 *        .action(function(cmd) {
 *          console.log('exec "%s"', cmd);
 *        });
 *
 *      program
 *        .command('teardown <dir> [otherDirs...]')
 *        .description('run teardown commands')
 *        .action(function(dir, otherDirs) {
 *          console.log('dir "%s"', dir);
 *          if (otherDirs) {
 *            otherDirs.forEach(function (oDir) {
 *              console.log('dir "%s"', oDir);
 *            });
 *          }
 *        });
 *
 *      program
 *        .command('*')
 *        .description('deploy the given env')
 *        .action(function(env) {
 *          console.log('deploying "%s"', env);
 *        });
 *
 *      program.parse(process.argv);
  *
 * @param {String} name
 * @param {String} [desc] for git-style sub-commands
 * @return {Command} the new command
 * @api public
 */


Command.prototype.command = function(name, desc, opts) {
  if (typeof desc === 'object' && desc !== null) {
    opts = desc;
    desc = null;
  }
  opts = opts || {};
};
Command.prototype.arguments = function(desc) {
};
Command.prototype.addImplicitHelpCommand = function() {
};
Command.prototype.parseExpectedArgs = function(args) {
};
Command.prototype.action = function(fn) {
};
Command.prototype.option = function(flags, description, fn, defaultValue) {
    option = new Option(flags, description),
  if (typeof fn !== 'function') {
    if (fn instanceof RegExp) {
      fn = function(val, def) {
      };
    } else {
      defaultValue = fn;
      fn = null;
    }
  }
  if (!option.bool || option.optional || option.required) {
    if (!option.bool) defaultValue = true;
    if (defaultValue !== undefined) {
      option.defaultValue = defaultValue;
    }
  }
};
Command.prototype.allowUnknownOption = function(arg) {
};
Command.prototype.parse = function(argv) {
};
Command.prototype.executeSubCommand = function(argv, args, unknown) {
  args = args.concat(unknown);
  if (args[0] === 'help') {
    args[0] = args[1];
    args[1] = '--help';
  }
  args = args.slice(1);
  if (process.platform !== 'win32') {
    if (isExplicitJS) {
      args = (process.execArgv || []).concat(args);
    } else {
  } else {
};
Command.prototype.normalize = function(args) {
};
Command.prototype.parseArgs = function(args, unknown) {
};
Command.prototype.optionFor = function(arg) {
};
Command.prototype.parseOptions = function(argv) {
};
Command.prototype.opts = function() {
};
Command.prototype.missingArgument = function(name) {
};
Command.prototype.optionMissingArgument = function(option, flag) {
};
Command.prototype.unknownOption = function(flag) {
};
Command.prototype.variadicArgNotLast = function(name) {
};
Command.prototype.version = function(str, flags) {
  flags = flags || '-V, --version';
};
Command.prototype.description = function(str, argsDescription) {
};
Command.prototype.alias = function(alias) {
};
Command.prototype.usage = function(str) {
};
Command.prototype.name = function(str) {
};
Command.prototype.prepareCommands = function() {
};
Command.prototype.largestCommandLength = function() {
};
Command.prototype.largestOptionLength = function() {
};
Command.prototype.largestArgLength = function() {
};
Command.prototype.padWidth = function() {
};
Command.prototype.optionHelp = function() {
  var width = this.padWidth();
  return this.options.map(function(option) {
      ((option.bool && option.defaultValue !== undefined) ? ' (default: ' + option.defaultValue + ')' : '');
  }).concat([pad('-h, --help', width) + '  ' + 'output usage information'])
};
