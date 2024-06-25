const path = require('path')
const camelCase = require('camelcase')
// handles parsing positional arguments,
// and populating argv with said positional
module.exports = function (yargs, usage, validation) {
  const self = {}

  var handlers = {}
  var aliasMap = {}
  self.addHandler = function (cmd, description, builder, handler) {
    var aliases = []
    if (Array.isArray(cmd)) {
      aliases = cmd.slice(1)
      cmd = cmd[0]
    } else if (typeof cmd === 'object') {
      var command = (Array.isArray(cmd.command) || typeof cmd.command === 'string') ? cmd.command : moduleName(cmd)
      if (cmd.aliases) command = [].concat(command).concat(cmd.aliases)
      self.addHandler(command, extractDesc(cmd), cmd.builder, cmd.handler)
      return
    }

    // allow a module to be provided instead of separate builder and handler
    if (typeof builder === 'object' && builder.builder && typeof builder.handler === 'function') {
      self.addHandler([cmd].concat(aliases), description, builder.builder, builder.handler)
      return
    }

    var parsedCommand = self.parseCommand(cmd)
    aliases = aliases.map(function (alias) {
      alias = self.parseCommand(alias).cmd // remove positional args
      aliasMap[alias] = parsedCommand.cmd
      return alias
    })

    if (description !== false) {
      usage.command(cmd, description, aliases)
    }

    handlers[parsedCommand.cmd] = {
      original: cmd,
      handler: handler,
      builder: builder || {},
      demanded: parsedCommand.demanded,
      optional: parsedCommand.optional
    }
  }
  self.addDirectory = function (dir, context, req, callerFile, opts) {
    opts = opts || {}
    // disable recursion to support nested directories of subcommands
    if (typeof opts.recurse !== 'boolean') opts.recurse = false
    // exclude 'json', 'coffee' from require-directory defaults
    if (!Array.isArray(opts.extensions)) opts.extensions = ['js']
    // allow consumer to define their own visitor function
    const parentVisit = typeof opts.visit === 'function' ? opts.visit : function (o) { return o }
    // call addHandler via visitor function
    opts.visit = function (obj, joined, filename) {
      const visited = parentVisit(obj, joined, filename)
      // allow consumer to skip modules with their own visitor
      if (visited) {
        // check for cyclic reference
        // each command file path should only be seen once per execution
        if (~context.files.indexOf(joined)) return visited
        // keep track of visited files in context.files
        context.files.push(joined)
        self.addHandler(visited)
      }
      return visited
    }
    require('require-directory')({ require: req, filename: callerFile }, dir, opts)
  }
  function moduleName (obj) {
  }
  function extractDesc (obj) {
  }
  self.parseCommand = function (cmd) {
    var extraSpacesStrippedCommand = cmd.replace(/\s{2,}/g, ' ')
    var splitCommand = extraSpacesStrippedCommand.split(/\s+(?![^[]*]|[^<]*>)/)
    var bregex = /\.*[\][<>]/g
    var parsedCommand = {
      cmd: (splitCommand.shift()).replace(bregex, ''),
      demanded: [],
      optional: []
    }
    splitCommand.forEach(function (cmd, i) {
      var variadic = false
      cmd = cmd.replace(/\s/g, '')
      if (/\.+[\]>]/.test(cmd) && i === splitCommand.length - 1) variadic = true
      if (/^\[/.test(cmd)) {
        parsedCommand.optional.push({
          cmd: cmd.replace(bregex, '').split('|'),
          variadic: variadic
        })
      } else {
        parsedCommand.demanded.push({
          cmd: cmd.replace(bregex, '').split('|'),
          variadic: variadic
        })
      }
    })
    return parsedCommand
  }
  self.getCommands = function () {
    return Object.keys(handlers).concat(Object.keys(aliasMap))
  }
  self.getCommandHandlers = function () {
    return handlers
  }
  self.runCommand = function (command, yargs, parsed) {
    var aliases = parsed.aliases
    var commandHandler = handlers[command] || handlers[aliasMap[command]]
    var currentContext = yargs.getContext()
    var numFiles = currentContext.files.length
    var parentCommands = currentContext.commands.slice()

    // what does yargs look like after the buidler is run?
    var innerArgv = parsed.argv
    var innerYargs = null
    var positionalMap = {}

    currentContext.commands.push(command)
    if (typeof commandHandler.builder === 'function') {
      // a function can be provided, which builds
      // up a yargs chain and possibly returns it.
      innerYargs = commandHandler.builder(yargs.reset(parsed.aliases))
      // if the builder function did not yet parse argv with reset yargs
      // and did not explicitly set a usage() string, then apply the
      // original command string as usage() for consistent behavior with
      // options object below.
      if (yargs.parsed === false) {
        if (typeof yargs.getUsageInstance().getUsage() === 'undefined') {
          yargs.usage('$0 ' + (parentCommands.length ? parentCommands.join(' ') + ' ' : '') + commandHandler.original)
        }
        innerArgv = innerYargs ? innerYargs._parseArgs(null, null, true) : yargs._parseArgs(null, null, true)
      } else {
        innerArgv = yargs.parsed.argv
      }

      if (innerYargs && yargs.parsed === false) aliases = innerYargs.parsed.aliases
      else aliases = yargs.parsed.aliases
    } else if (typeof commandHandler.builder === 'object') {
      // as a short hand, an object can instead be provided, specifying
      // the options that a command takes.
      innerYargs = yargs.reset(parsed.aliases)
      innerYargs.usage('$0 ' + (parentCommands.length ? parentCommands.join(' ') + ' ' : '') + commandHandler.original)
      Object.keys(commandHandler.builder).forEach(function (key) {
        innerYargs.option(key, commandHandler.builder[key])
      })
      innerArgv = innerYargs._parseArgs(null, null, true)
      aliases = innerYargs.parsed.aliases
    }

    if (!yargs._hasOutput()) {
      positionalMap = populatePositionals(commandHandler, innerArgv, currentContext, yargs)
    }

    // we apply validation post-hoc, so that custom
    // checks get passed populated positional arguments.
    yargs._runValidation(innerArgv, aliases, positionalMap, yargs.parsed.error)

    if (commandHandler.handler && !yargs._hasOutput()) {
      commandHandler.handler(innerArgv)
    }

    currentContext.commands.pop()
    numFiles = currentContext.files.length - numFiles
    if (numFiles > 0) currentContext.files.splice(numFiles * -1, numFiles)

    return innerArgv
  }
}
