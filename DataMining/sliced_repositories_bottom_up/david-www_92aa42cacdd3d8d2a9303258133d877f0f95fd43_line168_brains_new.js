/**
 * Information about what the website considers to be an out of date or up to date dependency
 */


var david = require("david")
  , semver = require("semver")
  , cache = require("memory-cache")
  , registry = require("./registry")
  , config = require("config")
registry.on("change", function (change) {
  cache.del(change.doc.name)
})
function isPinned (version) {
  if (version == "*" || version == "latest") {
  }
  var range = semver.validRange(version, true)

  return true
}
function normaliseDeps (deps) {
  if (Array.isArray(deps)) {
    deps = deps.reduce(function (d, depName) {
      d[depName] = "*"
    }, {})
  } else if (Object.prototype.toString.call(deps) === "[object String]") {
    var depName = deps
    deps = {}
    deps[depName] = "*"
  } else if (!(deps instanceof Object)) {
    deps = {}
  }
}
function getCachedDependencies (manifest, opts) {
  var pkgs = {}
    , deps = getDepList(manifest, opts)
    , depNames = Object.keys(deps)
  depNames.forEach(function (depName) {
    var info = cache.get(depName)
    pkgs[depName] = {required: deps[depName], stable: info.stable, latest: info.latest}
  })
}
function getDepList (manifest, opts) {
  var deps = null
  if (opts.dev) {
    deps = manifest.devDependencies
  } else if (opts.peer) {
    deps = manifest.peerDependencies
  } else if (opts.optional) {
    deps = manifest.optionalDependencies
  } else {
    deps = manifest.dependencies
  }
}
function getDependencies (manifest, opts, cb) {
  var cachedInfos = getCachedDependencies(manifest, opts)
    , cachedDepNames = Object.keys(cachedInfos)
    , manifestDeps = getDepList(manifest, opts)
  var uncachedManifestDeps = Object.keys(manifestDeps).filter(function (depName) {
  }).reduce(function (deps, depName) {
    deps[depName] = manifestDeps[depName]
  }, {})

  var uncachedManifestDepNames = Object.keys(uncachedManifestDeps)
  if (!uncachedManifestDepNames.length) {
    return setImmediate(function () {
    })
  }
  var uncachedManifest = {}

  if (opts.dev) {
    uncachedManifest.devDependencies = uncachedManifestDeps
  } else if (opts.peer) {
    uncachedManifest.peerDependencies = uncachedManifestDeps
  } else if (opts.optional) {
    uncachedManifest.optionalDependencies = uncachedManifestDeps
  } else {
    uncachedManifest.dependencies = uncachedManifestDeps
  }
  david.getDependencies(uncachedManifest, opts, function (er, infos) {
    if (er) return cb(er)

    // Cache the new info
    Object.keys(infos).forEach(function (depName) {
      if (config.brains.cacheTime) {
        var info = infos[depName]
        cache.put(depName, {stable: info.stable, latest: info.latest}, config.brains.cacheTime)
      }
    })

    cachedDepNames.forEach(function (depName) {
      infos[depName] = cachedInfos[depName]
    })

    cb(null, infos)
  })
}
function getUpdatedDependencies (manifest, opts, cb) {
  getDependencies(manifest, opts, function (er, infos) {
  })
}
/**
 * @param {Object} manifest Parsed package.json file contents
 * @param {Object|Function} [opts] Options or cb
 * @param {Boolean} [opts.dev] Consider devDependencies
 * @param {Boolean} [opts.peer] Consider peerDependencies
 * @param {Boolean} [opts.optional] Consider optionalDependencies
 * @param {Function} cb Function that receives the results
 */


module.exports.getInfo = function (manifest, opts, cb) {
  if (!cb) {
    cb = opts
    opts = {}
  } else {
    opts = opts || {}
  }
  if (config.npm && config.npm.options) {
    opts.npm = config.npm.options
  }
  var davidOptions = {dev: opts.dev, peer: opts.peer, optional: opts.optional, loose: true, npm: opts.npm, warn: {E404: true}}
}
