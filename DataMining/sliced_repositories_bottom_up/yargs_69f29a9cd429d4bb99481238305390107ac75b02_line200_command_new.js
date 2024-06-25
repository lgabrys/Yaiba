'use strict'
const { isPromise } = require('../build/lib/is-promise')
const { applyMiddleware, commandMiddlewareFactory } = require('../build/lib/middleware')
const { parseCommand } = require('../build/lib/parse-command')
const DEFAULT_MARKER = /(^\*)|(^\$0)/
module.exports = function command (yargs, usage, validation, globalMiddleware) {
  const self = {}
  let handlers = {}
  let aliasMap = {}
  let defaultCommand
  globalMiddleware = globalMiddleware || []
  self.addHandler = function addHandler (cmd, description, builder, handler, commandMiddleware, deprecated) {
    let aliases = []
    const middlewares = commandMiddlewareFactory(commandMiddleware)
    handler = handler || (() => {})

    if (Array.isArray(cmd)) {
      aliases = cmd.slice(1)
      cmd = cmd[0]
    } else if (typeof cmd === 'object') {
      let command = (Array.isArray(cmd.command) || typeof cmd.command === 'string') ? cmd.command : moduleName(cmd)
      if (cmd.aliases) command = [].concat(command).concat(cmd.aliases)
      self.addHandler(command, extractDesc(cmd), cmd.builder, cmd.handler, cmd.middlewares, cmd.deprecated)
      return
    }

    // allow a module to be provided instead of separate builder and handler
    if (typeof builder === 'object' && builder.builder && typeof builder.handler === 'function') {
      self.addHandler([cmd].concat(aliases), description, builder.builder, builder.handler, builder.middlewares, builder.deprecated)
      return
    }

    // parse positionals out of cmd string
    const parsedCommand = parseCommand(cmd)

    // remove positional args from aliases only
    aliases = aliases.map(alias => parseCommand(alias).cmd)

    // check for default and filter out '*''
    let isDefault = false
    const parsedAliases = [parsedCommand.cmd].concat(aliases).filter((c) => {
      if (DEFAULT_MARKER.test(c)) {
        isDefault = true
        return false
      }
      return true
    })

    // standardize on $0 for default command.
    if (parsedAliases.length === 0 && isDefault) parsedAliases.push('$0')

    // shift cmd and aliases after filtering out '*'
    if (isDefault) {
      parsedCommand.cmd = parsedAliases[0]
      aliases = parsedAliases.slice(1)
      cmd = cmd.replace(DEFAULT_MARKER, parsedCommand.cmd)
    }

    // populate aliasMap
    aliases.forEach((alias) => {
      aliasMap[alias] = parsedCommand.cmd
    })

    if (description !== false) {
      usage.command(cmd, description, isDefault, aliases, deprecated)
    }

    handlers[parsedCommand.cmd] = {
      original: cmd,
      description: description,
      handler,
      builder: builder || {},
      middlewares,
      deprecated,
      demanded: parsedCommand.demanded,
      optional: parsedCommand.optional
    }

    if (isDefault) defaultCommand = handlers[parsedCommand.cmd]
  }
  self.addDirectory = function addDirectory (dir, context, req, callerFile, opts) {
    opts = opts || {}
    // disable recursion to support nested directories of subcommands
    if (typeof opts.recurse !== 'boolean') opts.recurse = false
    // exclude 'json', 'coffee' from require-directory defaults
    if (!Array.isArray(opts.extensions)) opts.extensions = ['js']
    // allow consumer to define their own visitor function
    const parentVisit = typeof opts.visit === 'function' ? opts.visit : o => o
    // call addHandler via visitor function
    opts.visit = function visit (obj, joined, filename) {
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
  self.getCommands = () => Object.keys(handlers).concat(Object.keys(aliasMap))
  self.getCommandHandlers = () => handlers
  self.hasDefaultCommand = () => !!defaultCommand
  self.runCommand = function runCommand (command, yargs, parsed, commandIndex) {
    let aliases = parsed.aliases
    const commandHandler = handlers[command] || handlers[aliasMap[command]] || defaultCommand
    const currentContext = yargs.getContext()
    let numFiles = currentContext.files.length
    const parentCommands = currentContext.commands.slice()

    // what does yargs look like after the builder is run?
    let innerArgv = parsed.argv
    let innerYargs = null
    let positionalMap = {}
    if (command) {
      currentContext.commands.push(command)
      currentContext.fullCommands.push(commandHandler.original)
    }
    if (typeof commandHandler.builder === 'function') {
      // a function can be provided, which builds
      // up a yargs chain and possibly returns it.
      innerYargs = commandHandler.builder(yargs.reset(parsed.aliases))
      if (!innerYargs || (typeof innerYargs._parseArgs !== 'function')) {
        innerYargs = yargs
      }
      if (shouldUpdateUsage(innerYargs)) {
        innerYargs.getUsageInstance().usage(
          usageFromParentCommandsCommandHandler(parentCommands, commandHandler),
          commandHandler.description
        )
      }
      innerArgv = innerYargs._parseArgs(null, null, true, commandIndex)
      aliases = innerYargs.parsed.aliases
    } else if (typeof commandHandler.builder === 'object') {
      // as a short hand, an object can instead be provided, specifying
      // the options that a command takes.
      innerYargs = yargs.reset(parsed.aliases)
      if (shouldUpdateUsage(innerYargs)) {
        innerYargs.getUsageInstance().usage(
          usageFromParentCommandsCommandHandler(parentCommands, commandHandler),
          commandHandler.description
        )
      }
      Object.keys(commandHandler.builder).forEach((key) => {
        innerYargs.option(key, commandHandler.builder[key])
      })
      innerArgv = innerYargs._parseArgs(null, null, true, commandIndex)
      aliases = innerYargs.parsed.aliases
    }

    if (!yargs._hasOutput()) {
      positionalMap = populatePositionals(commandHandler, innerArgv, currentContext, yargs)
    }

    const middlewares = globalMiddleware.slice(0).concat(commandHandler.middlewares)
    applyMiddleware(innerArgv, yargs, middlewares, true)

    // we apply validation post-hoc, so that custom
    // checks get passed populated positional arguments.
    if (!yargs._hasOutput()) yargs._runValidation(innerArgv, aliases, positionalMap, yargs.parsed.error, !command)

    if (commandHandler.handler && !yargs._hasOutput()) {
      yargs._setHasOutput()
      // to simplify the parsing of positionals in commands,
      // we temporarily populate '--' rather than _, with arguments
      const populateDoubleDash = !!yargs.getOptions().configuration['populate--']
      if (!populateDoubleDash) yargs._copyDoubleDash(innerArgv)

      innerArgv = applyMiddleware(innerArgv, yargs, middlewares, false)
      let handlerResult
      if (isPromise(innerArgv)) {
        handlerResult = innerArgv.then(argv => commandHandler.handler(argv))
      } else {
        handlerResult = commandHandler.handler(innerArgv)
      }

      const handlerFinishCommand = yargs.getHandlerFinishCommand()
      if (isPromise(handlerResult)) {
        yargs.getUsageInstance().cacheHelpMessage()
        handlerResult
          .then(value => {
            if (handlerFinishCommand) {
              handlerFinishCommand(value)
            }
          })
          .catch(error => {
            try {
              yargs.getUsageInstance().fail(null, error)
            } catch (err) {
            // fail's throwing would cause an unhandled rejection.
            }
          })
          .then(() => {
            yargs.getUsageInstance().clearCachedHelpMessage()
          })
      } else {
        if (handlerFinishCommand) {
          handlerFinishCommand(handlerResult)
        }
      }
    }

    if (command) {
      currentContext.commands.pop()
      currentContext.fullCommands.pop()
    }
    numFiles = currentContext.files.length - numFiles
    if (numFiles > 0) currentContext.files.splice(numFiles * -1, numFiles)

    return innerArgv
  }
}
