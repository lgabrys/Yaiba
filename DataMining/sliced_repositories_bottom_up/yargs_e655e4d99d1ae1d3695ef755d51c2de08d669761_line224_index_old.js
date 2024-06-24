var path = require('path');

/*  Hack an instance of Argv with process.argv into Argv
    so people can do
        require('optimist')(['--beeble=1','-z','zizzle']).argv
    to parse a list of args and
        require('optimist').argv
    to get a parsed version of process.argv.
*/
var inst = Argv(process.argv.slice(2));
Object.keys(inst).forEach(function (key) {
    Argv[key] = typeof inst[key] == 'function'
});
var exports = module.exports = Argv;
function Argv (processArgs, cwd) {
    var self = {};
    if (!cwd) cwd = process.cwd();
    self.$0 = process.argv
    if (process.env._ != undefined && process.argv[1] == process.env._) {
        self.$0 = process.env._.replace(
            path.dirname(process.execPath) + '/', ''
        );
    }
    var options;
    self.resetOptions = function () {
        options = {
            boolean: [],
            string: [],
            alias: {},
            default: [],
            count: [],
            normalize: [],
            config: []
        };
    };
    self.boolean = function (bools) {
        options.boolean.push.apply(options.boolean, [].concat(bools));
        return self;
    };
    self.normalize = function (strings) {
        options.normalize.push.apply(options.normalize, [].concat(strings));
        return self;
    };
    self.config = function (configs) {
        options.config.push.apply(options.config, [].concat(configs));
        return self;
    };
    var examples = [];
    self.example = function (cmd, description) {
        examples.push([cmd, description]);
        return self;
    };
    self.string = function (strings) {
        options.string.push.apply(options.string, [].concat(strings));
        return self;
    };
    self.default = function (key, value) {
        if (typeof key === 'object') {
            Object.keys(key).forEach(function (k) {
                self.default(k, key[k]);
            });
        }
        else {
            options.default[key] = value;
        }
        return self;
    };
    self.alias = function (x, y) {
        if (typeof x === 'object') {
            Object.keys(x).forEach(function (key) {
                self.alias(key, x[key]);
            });
        }
        else {
            options.alias[x] = (options.alias[x] || []).concat(y);
        }
        return self;
    };
    self.count = function(counts) {
        options.count.push.apply(options.count, [].concat(counts));
        return self;
    };
    var demanded = {};
    self.demand = function (keys, msg) {
        if (typeof keys == 'number') {
            if (!demanded._) demanded._ = { count: 0, msg: null };
            demanded._.count += keys;
            demanded._.msg = msg;
        }
        else if (Array.isArray(keys)) {
            keys.forEach(function (key) {
                self.demand(key, msg);
            });
        }
        else {
            demanded[keys] = { msg: msg };
        }

        return self;
    };
    var implied = {};
    self.implies = function (key, value) {
        if (typeof key === 'object') {
            Object.keys(key).forEach(function (k) {
                self.implies(k, key[k]);
            });
        } else {
            implied[key] = value;
        }
    };
    var usage;
    self.usage = function (msg, opts) {
        if (!opts && typeof msg === 'object') {
            opts = msg;
            msg = null;
        }

        usage = msg;

        if (opts) self.options(opts);

        return self;
    };
    var checks = [];
    self.check = function (f) {
        checks.push(f);
        return self;
    };
    self.defaults = self.default;
    var descriptions = {};
    self.describe = function (key, desc) {
        if (typeof key === 'object') {
            Object.keys(key).forEach(function (k) {
                self.describe(k, key[k]);
            });
        }
        else {
            descriptions[key] = desc;
        }
        return self;
    };
    self.parse = function (args) {
        return parseArgs(args);
    };
    self.option = self.options = function (key, opt) {
        if (typeof key === 'object') {
            Object.keys(key).forEach(function (k) {
                self.options(k, key[k]);
            });
        }
        else {
            if (opt.alias) self.alias(key, opt.alias);
            if (opt.demand) self.demand(key, opt.demand);
            if (typeof opt.default !== 'undefined') {
                self.default(key, opt.default);
            }

            if (opt.boolean || opt.type === 'boolean') {
                self.boolean(key);
            }
            if (opt.string || opt.type === 'string') {
                self.string(key);
            }
            if (opt.count || opt.type === 'count') {
                self.count(key);
            }

            var desc = opt.describe || opt.description || opt.desc;
            if (desc) {
                self.describe(key, desc);
            }
        }

        return self;
    };
    var wrap = null;
    self.wrap = function (cols) {
        wrap = cols;
        return self;
    };
    self.showHelp = function (fn) {
        if (!fn) fn = console.error;
        fn(self.help());
    };
};
