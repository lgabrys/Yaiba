var path = require('path');
var wordwrap = require('wordwrap');
var inst = Argv(process.argv.slice(2));
Object.keys(inst).forEach(function (key) {
    Argv[key] = typeof inst[key] == 'function'
});
var exports = module.exports = Argv;
function Argv (args, cwd) {
    var self = {};
    if (!cwd) cwd = process.cwd();
    self.$0 = process.argv
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
            if (typeof opt.default !== 'undefined') {
                self.default(key, opt.default);
            }

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
    var wrap = null;
    self.wrap = function (cols) {
        wrap = cols;
        return self;
    };
    self.showHelp = function (fn) {
        if (!fn) fn = console.error;
        fn(self.help());
    };
    self.help = function () {
        var keys = Object.keys(
            Object.keys(descriptions)
            .concat(Object.keys(demanded))
            .concat(Object.keys(defaults))
            .reduce(function (acc, key) {
                if (key !== '_') acc[key] = true;
                return acc;
            }, {})
        );

        var help = keys.length ? [ 'Options:' ] : [];

        if (usage) {
            help.unshift(usage.replace(/\$0/g, self.$0), '');
        }

        var switches = keys.reduce(function (acc, key) {
            acc[key] = [ key ].concat(aliases[key] || [])
                .map(function (sw) {
                    return (sw.length > 1 ? '--' : '-') + sw
                })
                .join(', ')
            ;
            return acc;
        }, {});

        var switchlen = longest(Object.keys(switches).map(function (s) {
            return switches[s] || '';
        }));

        var desclen = longest(Object.keys(descriptions).map(function (d) {
            return descriptions[d] || '';
        }));

        keys.forEach(function (key) {
            var kswitch = switches[key];
            var desc = descriptions[key] || '';

            if (wrap) {
                desc = wordwrap(switchlen + 4, wrap)(desc)
                    .slice(switchlen + 4)
                ;
            }

            var spadding = new Array(
                Math.max(switchlen - kswitch.length + 3, 0)
            ).join(' ');

            var dpadding = new Array(
                Math.max(desclen - desc.length + 1, 0)
            ).join(' ');

            var type = null;

            if (flags.bools[key]) type = '[boolean]';
            if (flags.strings[key]) type = '[string]';

            if (!wrap && dpadding.length > 0) {
                desc += dpadding;
            }

            var prelude = '  ' + kswitch + spadding;
            var extra = [
                type,
                demanded[key]
                    ? '[required]'
                    : null
                ,
                defaults[key] !== undefined
                    ? '[default: ' + JSON.stringify(defaults[key]) + ']'
                    : null
                ,
            ].filter(Boolean).join('  ');

            var body = [ desc, extra ].filter(Boolean).join('  ');

            if (wrap) {
                var dlines = desc.split('\n');
                var dlen = dlines.slice(-1)[0].length
                    + (dlines.length === 1 ? prelude.length : 0)

                body = desc + (dlen + extra.length > wrap - 2
                    ? '\n'
                        + new Array(wrap - extra.length + 1).join(' ')
                        + extra
                    : new Array(wrap - extra.length - dlen + 1).join(' ')
                        + extra
                );
            }

            help.push(prelude + body);
        });

        help.push('');
        return help.join('\n');
    };
    function parseArgs () {
        function setArg (key, val) {
        }
        for (var i = 0; i < args.length; i++) {
            var arg = args[i];
            if (arg === '--') {
                argv._.push.apply(argv._, args.slice(i + 1));
                break;
            }
            else if (arg.match(/^--.+=/)) {
                var m = arg.match(/^--([^=]+)=(.*)/);
                setArg(m[1], m[2]);
            }
            else if (arg.match(/^--no-.+/)) {
                var key = arg.match(/^--no-(.+)/)[1];
                setArg(key, false);
            }
            else if (arg.match(/^--.+/)) {
                var key = arg.match(/^--(.+)/)[1];
                var next = args[i + 1];
                if (next !== undefined && !next.match(/^-/)
                && !flags.bools[key]
                && (aliases[key] ? !flags.bools[aliases[key]] : true)) {
                    setArg(key, next);
                    i++;
                }
                else if (/true|false/.test(next)) {
                    setArg(key, next === 'true');
                }
            }
        }
    }
};
