// fancy-pants parsing of argv, originally forked
var camelCase = require('camelcase')
var path = require('path')
function increment (orig) {
  return orig !== undefined ? orig + 1 : 0
}
module.exports = function (args, opts, y18n) {
  if (!opts) opts = {}
  var __ = y18n.__
  var error = null
  var flags = { arrays: {}, bools: {}, strings: {}, counts: {}, normalize: {}, configs: {} }

  ;[].concat(opts['array']).filter(Boolean).forEach(function (key) {
    flags.arrays[key] = true
  })
  ;[].concat(opts['boolean']).filter(Boolean).forEach(function (key) {
    flags.bools[key] = true
  })
  ;[].concat(opts.string).filter(Boolean).forEach(function (key) {
    flags.strings[key] = true
  })
  ;[].concat(opts.count).filter(Boolean).forEach(function (key) {
    flags.counts[key] = true
  })
  ;[].concat(opts.normalize).filter(Boolean).forEach(function (key) {
    flags.normalize[key] = true
  })
  ;[].concat(opts.config).filter(Boolean).forEach(function (key) {
    flags.configs[key] = true
  })
  var aliases = {}
  var defaults = opts['default'] || {}
  Object.keys(defaults).forEach(function (key) {
    if (/-/.test(key) && !opts.alias[key]) {
      aliases[key] = aliases[key] || []
    }
    (aliases[key] || []).forEach(function (alias) {
      defaults[alias] = defaults[key]
    })
  })
  var argv = { _: [] }
  if (args.indexOf('--') !== -1) {
    args = args.slice(0, args.indexOf('--'))
  }
  function eatNargs (i, key, args) {
    var toEat = checkAllAliases(key, opts.narg)
    if (args.length - (i + 1) < toEat) error = Error(__('not enough arguments following: %s', key))
  }
  function setArg (key, val) {
    if (checkAllAliases(key, flags.bools) || checkAllAliases(key, flags.counts)) {
      if (typeof val === 'string') val = val === 'true'
    }
    if (/-/.test(key) && !(aliases[key] && aliases[key].length)) {
      var c = camelCase(key)
      aliases[key] = [c]
      newAliases[c] = true
    }
    var keys = [key].concat(aliases[key] || [])
    for (var i = 0, l = keys.length; i < l; i++) {
      if (flags.normalize[keys[i]]) {
        keys.forEach(function (key) {
          argv.__defineSetter__(key, function (v) {
            val = path.normalize(v)
          })

          argv.__defineGetter__(key, function () {
            return typeof val === 'string' ?
            path.normalize(val) : val
          })
        })
        break
      }
    }
  }
  function setConfig (argv) {
    var configLookup = {}
    Object.keys(flags.configs).forEach(function (configKey) {
      var configPath = argv[configKey] || configLookup[configKey]
      if (configPath) {
        try {
          var config = require(path.resolve(process.cwd(), configPath))

          Object.keys(config).forEach(function (key) {
            // setting arguments via CLI takes precedence over
            // values within the config file.
            if (argv[key] === undefined) {
              delete argv[key]
              setArg(key, config[key])
            }
          })
        } catch (ex) {
          if (argv[configKey]) error = Error(__('invalid json config file: %s', configPath))
        }
      }
    })
  }
}
