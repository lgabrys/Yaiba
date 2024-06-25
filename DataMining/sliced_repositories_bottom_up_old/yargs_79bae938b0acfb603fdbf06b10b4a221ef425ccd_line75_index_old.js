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
                aliases[key] = x[key];
                aliases[x[key]] = key;
            });
        }
        else if (Array.isArray(y)) {
            y.forEach(function (yy) {
                self.alias(x, y);
            }
        }
        else {
            aliases[x] = y;
            aliases[y] = x;
        }

        return self;
    };
};
