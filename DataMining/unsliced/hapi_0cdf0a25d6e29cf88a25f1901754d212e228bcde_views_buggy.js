// Load modules

var Fs = require('fs');
var Path = require('path');
var Boom = require('boom');
var Defaults = require('./defaults');
var Schema = require('./schema');
var Utils = require('./utils');
var Response = require('./response');
// Additional engine modules required in constructor


// Declare internals

var internals = {};


// View Manager

exports = module.exports = internals.Manager = function (options) {

    var self = this;

    var extensions = Object.keys(options.engines);
    Utils.assert(extensions.length, 'Views manager requires at least one registered extension handler');

    var defaults = Utils.applyToDefaults(Defaults.views, options);
    delete defaults.engines;
    delete defaults.defaultExtension;

    this._engines = {};
    this._defaultExtension = options.defaultExtension || (extensions.length === 1 ? extensions[0] : '');

    // Load engines

    extensions.forEach(function (extension) {

        var config = options.engines[extension];
        if (typeof config === 'string') {
            config = { module: config };
        }

        // Prevent module from being cloned

        var module = null;
        if (typeof config.module === 'object') {
            module = config.module;
            config.module = null;
        }

        config = Utils.applyToDefaults(defaults, config);

        if (module) {
            config.module = module;
        }

        var schemaError = Schema.view(config);
        Utils.assert(!schemaError, 'Invalid server options:', schemaError);

        var engine = {
            module: (typeof config.module === 'string' ? require(config.module) : config.module),
            config: config,
            suffix: '.' + extension
        };

        Utils.assert(engine.module.compile, 'Invalid view engine module: missing compile()');

        engine.compileFunc = engine.module.compile;
        if (config.compileMode === 'sync') {
            engine.compileFunc = function (str, opt, next) {

                var compiled = null;
                try {
                    compiled = engine.module.compile(str, opt);
                }
                catch (err) {
                    return next(err);
                }

                next(null, compiled);
            };
        }

        if (config.isCached) {
            engine.cache = {};
        }

        // Load partials and helpers

        self._loadPartials(engine);
        self._loadHelpers(engine);

        // Set engine

        self._engines[extension] = engine;
    });
};


internals.Manager.prototype._loadPartials = function (engine) {

    var self = this;

    if (!engine.config.partialsPath ||
        !engine.module.registerPartial ||
        typeof engine.module.registerPartial !== 'function') {

        return;
    }

    var load = function () {

        var path = Path.join(engine.config.basePath || '', engine.config.partialsPath);
        var files = traverse(path);
        files.forEach(function (file) {

            var offset = path.slice(-1) === '/' ? 0 : 1;
            var name = file.slice(path.length + offset, -engine.suffix.length);
            var src = Fs.readFileSync(file).toString(engine.config.encoding);
            engine.module.registerPartial(name, src);
        });
    };

    var traverse = function (path) {

        var files = [];

        Fs.readdirSync(path).forEach(function (file) {

            file = Path.join(path, file);
            var stat = Fs.statSync(file);
            if (stat.isDirectory()) {
                files = files.concat(traverse(file));
                return;
            }

            if (stat.isFile() &&
                Path.basename(file)[0] !== '.' &&
                Path.extname(file) === engine.suffix) {

                files.push(file);
            }
        });

        return files;
    };

    load();
};


internals.Manager.prototype._loadHelpers = function (engine) {

    var self = this;

    if (!engine.config.helpersPath ||
        !engine.module.registerHelper ||
        typeof engine.module.registerHelper !== 'function') {

        return;
    }

    var path = Path.join(engine.config.basePath || '', engine.config.helpersPath);
    Fs.readdirSync(path).forEach(function (file) {

        file = Path.join(path, file);
        var stat = Fs.statSync(file);
        if (stat.isFile() &&
            Path.basename(file)[0] !== '.') {

            try {
                var helper = require(file);
                if (typeof helper === 'function') {
                    var offset = path.slice(-1) === '/' ? 0 : 1;
                    var name = file.slice(path.length + offset, -3);
                    engine.module.registerHelper(name, helper);
                }
            }
            catch (err) {}
        }
    });
};


internals.Manager.prototype.render = function (filename, context, options, callback) {

    var self = this;

    context = context || {};
    options = options || {};

    var engine = null;

    var fileExtension = Path.extname(filename).slice(1);
    var extension = fileExtension || self._defaultExtension;
    if (!extension) {
        return callback(Boom.badImplementation('Unknown extension and no defaultExtension configured for view template: ' + filename));
    }

    engine = self._engines[extension];
    if (!engine) {
        return callback(Boom.badImplementation('No view engine found for file: ' + filename));
    }

    var settings = Utils.applyToDefaults(engine.config, options);

    this._compile(filename + (fileExtension ? '' : engine.suffix), engine, settings, function (err, compiled) {

        if (err) {
            return callback(err);
        }

        var rendered = null;

        if (!settings.layout) {

            // No layout

            try {
                rendered = compiled(context, settings.runtimeOptions);
            }
            catch (err) {
                return callback(Boom.badImplementation(err.message, err));
            }

            return callback(null, rendered, settings);
        }

        // With layout

        if (context.hasOwnProperty(settings.layoutKeyword)) {
            return callback(Boom.badImplementation('settings.layoutKeyword conflict', { context: context, keyword: settings.layoutKeyword }));
        }

        self._compile('layout' + engine.suffix, engine, settings, function (err, layout) {

            if (err) {
                return callback(err);
            }

            var layoutContext = Utils.clone(context);

            try {
                layoutContext[settings.layoutKeyword] = compiled(context, settings.runtimeOptions);
                rendered = layout(layoutContext, settings.runtimeOptions);
            }
            catch (err) {
                return callback(Boom.badImplementation(err.message, err));
            }

            return callback(null, rendered, settings);
        });
    });
};


internals.Manager.prototype._compile = function (template, engine, settings, callback) {

    if (engine.cache &&
        engine.cache[template]) {

        return callback(null, engine.cache[template]);
    }

    // Validate path

    var isAbsolutePath = (template[0] === '/');
    var isInsecurePath = template.match(/\.\.\//g);

    if (!settings.allowAbsolutePaths &&
        isAbsolutePath) {

        return callback(Boom.badImplementation('Absolute paths are not allowed in views'));
    }

    if (!settings.allowInsecureAccess &&
        isInsecurePath) {

        return callback(Boom.badImplementation('View paths cannot lookup templates outside root path (path includes one or more \'../\')'));
    }

    // Resolve path and extension

    var fullPath = (isAbsolutePath ? template : Path.join(settings.basePath || '', settings.path || '', template));

    settings.compileOptions.filename = fullPath;            // Pass the template to Jade via this copy of compileOptions

    // Read file

    Fs.readFile(fullPath, { encoding: settings.encoding }, function (err, data) {

        if (err) {
            return callback(Boom.badImplementation('View file not found: ' + fullPath));
        }

        engine.compileFunc(data, settings.compileOptions, function (err, compiled) {

            if (err) {
                return callback(Boom.wrap(err));
            }

            if (engine.cache) {
                engine.cache[template] = compiled;
            }

            return callback(null, compiled);
        });
    });
};


exports.handler = function (route, viewFilePath) {

    return function (request, reply) {

        var context = {
            params: request.params,
            payload: request.payload,
            query: request.query
        };

        reply.view(viewFilePath, context);
    };
};


exports.Response = internals.Response = function (manager, template, context, options) {

    var source = {
        manager: manager,
        template: template,
        context: context,
        options: options
    };

    Response.Plain.call(this, source, 'view');
};

Utils.inherits(internals.Response, Response.Plain);


internals.Response.prototype._marshall = function (request, next) {

    var self = this;

    this.source.manager.render(this.source.template, this.source.context, this.source.options, function (err, rendered, config) {

        if (err) {
            return next(err);
        }

        self._payload = new Response.Payload(rendered);
        if (config.contentType) {
            self.type(config.contentType);
        }

        self.encoding(config.encoding);

        return next();
    });
};

