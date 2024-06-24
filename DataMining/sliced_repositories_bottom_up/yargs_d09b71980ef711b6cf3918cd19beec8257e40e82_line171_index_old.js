var path = require('path');
var inst = Argv(process.argv.slice(2));
Object.keys(inst).forEach(function (key) {
    Argv[key] = typeof inst[key] == 'function'
});
var exports = module.exports = Argv;
function Argv (args, cwd) {
    var self = {};
    if (!cwd) cwd = process.cwd();
    self.$0 = process.argv
        .slice(0,2)
        .map(function (x) {
            var b = rebase(cwd, x);
        })
    if (process.argv[1] == process.env._) {
        self.$0 = process.env._.replace(
            path.dirname(process.execPath) + '/', ''
        );
    }
    var flags = { bools : {}, strings : {} };
    self.boolean = function (bools) {
        if (!Array.isArray(bools)) {
            bools = [].slice.call(arguments);
        }

        bools.forEach(function (name) {
            flags.bools[name] = true;
        });

        return self;
    };
    self.string = function (strings) {
        if (!Array.isArray(strings)) {
            strings = [].slice.call(arguments);
        }

        strings.forEach(function (name) {
            flags.strings[name] = true;
        });

        return self;
    };
    var aliases = {};
    self.alias = function (x, y) {
        if (typeof x === 'object') {
            Object.keys(x).forEach(function (key) {
                self.alias(key, x[key]);
            });
        }
        else if (Array.isArray(y)) {
            y.forEach(function (yy) {
                self.alias(x, yy);
            });
        }
        else {
            var zs = (aliases[x] || []).concat(aliases[y] || []).concat(x, y);
            aliases[x] = zs.filter(function (z) { return z != x });
            aliases[y] = zs.filter(function (z) { return z != y });
        }

        return self;
    };
    var demanded = {};
    self.demand = function (keys) {
        if (typeof keys == 'number') {
            if (!demanded._) demanded._ = 0;
            demanded._ += keys;
        }
        else if (Array.isArray(keys)) {
            keys.forEach(function (key) {
                self.demand(key);
            });
        }
        else {
            demanded[keys] = true;
        }

        return self;
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
    var defaults = {};
    self.default = function (key, value) {
        if (typeof key === 'object') {
            Object.keys(key).forEach(function (k) {
                self.default(k, key[k]);
            });
        }
        else {
            defaults[key] = value;
        }

        return self;
    };
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
        return Argv(args).argv;
    };
    self.option = self.options = function (key, opt) {
        if (typeof key === 'object') {
            Object.keys(key).forEach(function (k) {
                self.options(k, key[k]);
            });
        }
        else {
            if (opt.alias) self.alias(key, opt.alias);
            if (opt.demand) self.demand(key);
            if (opt.default) self.default(key, opt.default);

            if (opt.boolean || opt.type === 'boolean') {
                self.boolean(key);
            }
            if (opt.string || opt.type === 'string') {
                self.string(key);
            }

            var desc = opt.describe || opt.description || opt.desc;
            if (desc) {
                self.describe(key, desc);
            }
        }

        return self;
    };
};
