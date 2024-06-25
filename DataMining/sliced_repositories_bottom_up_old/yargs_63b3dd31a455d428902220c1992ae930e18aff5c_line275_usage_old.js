'use strict'
// this file handles outputting usage instructions,
const decamelize = require('decamelize')
const objFilter = require('./obj-filter')
const path = require('path')
const setBlocking = require('set-blocking')
const YError = require('./yerror')
module.exports = function usage (yargs, y18n) {
  const __ = y18n.__
  const self = {}

  self.failFn = function failFn (f) {
    fails.push(f)
  }
  let showHelpOnFail = true
  self.showHelpOnFail = function showHelpOnFailFn (enabled, message) {
    if (typeof enabled === 'string') {
      message = enabled
      enabled = true
    } else if (typeof enabled === 'undefined') {
      enabled = true
    }
    failMessage = message
    showHelpOnFail = enabled
    return self
  }
  self.fail = function fail (msg, err) {
    const logger = yargs._getLoggerInstance()

    if (fails.length) {
      for (let i = fails.length - 1; i >= 0; --i) {
        fails[i](msg, err, self)
      }
    } else {
      if (yargs.getExitProcess()) setBlocking(true)

      // don't output failure message more than once
      if (!failureOutput) {
        failureOutput = true
        if (showHelpOnFail) {
          yargs.showHelp('error')
          logger.error()
        }
        if (msg || err) logger.error(msg || err)
        if (failMessage) {
          if (msg || err) logger.error('')
          logger.error(failMessage)
        }
      }

      err = err || new YError(msg)
      if (yargs.getExitProcess()) {
        return yargs.exit(1)
      } else if (yargs._hasParseCallback()) {
        return yargs.exit(1, err)
      } else {
        throw err
      }
    }
  }
  let usages = []
  let usageDisabled = false
  self.usage = (msg, description) => {
    if (msg === null) {
      usageDisabled = true
      usages = []
      return
    }
    usageDisabled = false
    usages.push([msg, description || ''])
    return self
  }
  self.getUsage = () => {
    return usages
  }
  self.getUsageDisabled = () => {
    return usageDisabled
  }
  self.getPositionalGroupName = () => {
    return __('Positionals:')
  }
  let examples = []
  self.example = (cmd, description) => {
    examples.push([cmd, description || ''])
  }
  let commands = []
  self.command = function command (cmd, description, isDefault, aliases) {
    // the last default wins, so cancel out any previously set default
    if (isDefault) {
      commands = commands.map((cmdArray) => {
        cmdArray[2] = false
        return cmdArray
      })
    }
    commands.push([cmd, description || '', isDefault, aliases])
  }
  self.getCommands = () => commands
  let descriptions = {}
  self.describe = function describe (key, desc) {
    if (typeof key === 'object') {
      Object.keys(key).forEach((k) => {
        self.describe(k, key[k])
      })
    } else {
      descriptions[key] = desc
    }
  }
  self.getDescriptions = () => descriptions
  let epilogs = []
  self.epilog = (msg) => {
    epilogs.push(msg)
  }
  self.wrap = (cols) => {
    wrapSet = true
    wrap = cols
  }
  function getWrap () {
  }
  const deferY18nLookupPrefix = '__yargsString__:'
  self.deferY18nLookup = str => deferY18nLookupPrefix + str
  const defaultGroup = 'Options:'
  self.help = function help () {
    if (cachedHelpMessage) return cachedHelpMessage
    normalizeAliases()

    // handle old demanded API
    const base$0 = yargs.customScriptName ? yargs.$0 : path.basename(yargs.$0)
    const demandedOptions = yargs.getDemandedOptions()
    const demandedCommands = yargs.getDemandedCommands()
    const groups = yargs.getGroups()
    const options = yargs.getOptions()

    let keys = []
    keys = keys.concat(Object.keys(descriptions))
    keys = keys.concat(Object.keys(demandedOptions))
    keys = keys.concat(Object.keys(demandedCommands))
    keys = keys.concat(Object.keys(options.default))
    keys = keys.filter(filterHiddenOptions)
    keys = Object.keys(keys.reduce((acc, key) => {
      if (key !== '_') acc[key] = true
      return acc
    }, {}))

    const theWrap = getWrap()
    const ui = require('cliui')({
      width: theWrap,
      wrap: !!theWrap
    })

    // the usage string.
    if (!usageDisabled) {
      if (usages.length) {
        // user-defined usage.
        usages.forEach((usage) => {
          ui.div(`${usage[0].replace(/\$0/g, base$0)}`)
          if (usage[1]) {
            ui.div({ text: `${usage[1]}`, padding: [1, 0, 0, 0] })
          }
        })
        ui.div()
      } else if (commands.length) {
        let u = null
        // demonstrate how commands are used.
        if (demandedCommands._) {
          u = `${base$0} <${__('command')}>\n`
        } else {
          u = `${base$0} [${__('command')}]\n`
        }
        ui.div(`${u}`)
      }
    }

    // your application's commands, i.e., non-option
    // arguments populated in '_'.
    if (commands.length) {
      ui.div(__('Commands:'))

      const context = yargs.getContext()
      const parentCommands = context.commands.length ? `${context.commands.join(' ')} ` : ''

      if (yargs.getParserConfiguration()['sort-commands'] === true) {
        commands = commands.sort((a, b) => a[0].localeCompare(b[0]))
      }

      commands.forEach((command) => {
        const commandString = `${base$0} ${parentCommands}${command[0].replace(/^\$0 ?/, '')}` // drop $0 from default commands.
        ui.span(
          {
            text: commandString,
            padding: [0, 2, 0, 2],
            width: maxWidth(commands, theWrap, `${base$0}${parentCommands}`) + 4
          },
          { text: command[1] }
        )
        const hints = []
        if (command[2]) hints.push(`[${__('default:').slice(0, -1)}]`) // TODO hacking around i18n here
        if (command[3] && command[3].length) {
          hints.push(`[${__('aliases:')} ${command[3].join(', ')}]`)
        }
        if (hints.length) {
          ui.div({ text: hints.join(' '), padding: [0, 0, 0, 2], align: 'right' })
        } else {
          ui.div()
        }
      })

      ui.div()
    }

    // perform some cleanup on the keys array, making it
    // only include top-level keys not their aliases.
    const aliasKeys = (Object.keys(options.alias) || [])
      .concat(Object.keys(yargs.parsed.newAliases) || [])

    keys = keys.filter(key => !yargs.parsed.newAliases[key] && aliasKeys.every(alias => (options.alias[alias] || []).indexOf(key) === -1))

    // populate 'Options:' group with any keys that have not
    // explicitly had a group set.
    if (!groups[defaultGroup]) groups[defaultGroup] = []
    addUngroupedKeys(keys, options.alias, groups)

    // display 'Options:' table along with any custom tables:
    Object.keys(groups).forEach((groupName) => {
      if (!groups[groupName].length) return

      // if we've grouped the key 'f', but 'f' aliases 'foobar',
      // normalizedKeys should contain only 'foobar'.
      const normalizedKeys = groups[groupName].filter(filterHiddenOptions).map((key) => {
        if (~aliasKeys.indexOf(key)) return key
        for (let i = 0, aliasKey; (aliasKey = aliasKeys[i]) !== undefined; i++) {
          if (~(options.alias[aliasKey] || []).indexOf(key)) return aliasKey
        }
        return key
      })

      if (normalizedKeys.length < 1) return

      ui.div(__(groupName))

      // actually generate the switches string --foo, -f, --bar.
      const switches = normalizedKeys.reduce((acc, key) => {
        acc[key] = [ key ].concat(options.alias[key] || [])
          .map(sw => {
            // for the special positional group don't
            // add '--' or '-' prefix.
            if (groupName === self.getPositionalGroupName()) return sw
            else return (sw.length > 1 ? '--' : '-') + sw
          })
          .join(', ')

        return acc
      }, {})

      normalizedKeys.forEach((key) => {
        const kswitch = switches[key]
        let desc = descriptions[key] || ''
        let type = null

        if (~desc.lastIndexOf(deferY18nLookupPrefix)) desc = __(desc.substring(deferY18nLookupPrefix.length))

        if (~options.boolean.indexOf(key)) type = `[${__('boolean')}]`
        if (~options.count.indexOf(key)) type = `[${__('count')}]`
        if (~options.string.indexOf(key)) type = `[${__('string')}]`
        if (~options.normalize.indexOf(key)) type = `[${__('string')}]`
        if (~options.array.indexOf(key)) type = `[${__('array')}]`
        if (~options.number.indexOf(key)) type = `[${__('number')}]`

        const extra = [
          type,
          (key in demandedOptions) ? `[${__('required')}]` : null,
          options.choices && options.choices[key] ? `[${__('choices:')} ${
            self.stringifiedValues(options.choices[key])}]` : null,
          defaultString(options.default[key], options.defaultDescription[key])
        ].filter(Boolean).join(' ')

        ui.span(
          { text: kswitch, padding: [0, 2, 0, 2], width: maxWidth(switches, theWrap) + 4 },
          desc
        )

        if (extra) ui.div({ text: extra, padding: [0, 0, 0, 2], align: 'right' })
        else ui.div()
      })

      ui.div()
    })

    // describe some common use-cases for your application.
    if (examples.length) {
      ui.div(__('Examples:'))

      examples.forEach((example) => {
        example[0] = example[0].replace(/\$0/g, base$0)
      })

      examples.forEach((example) => {
        if (example[1] === '') {
          ui.div(
            {
              text: example[0],
              padding: [0, 2, 0, 2]
            }
          )
        } else {
          ui.div(
            {
              text: example[0],
              padding: [0, 2, 0, 2],
              width: maxWidth(examples, theWrap) + 4
            }, {
              text: example[1]
            }
          )
        }
      })

      ui.div()
    }

    // the usage string.
    if (epilogs.length > 0) {
      const e = epilogs.map(epilog => epilog.replace(/\$0/g, base$0)).join('\n')
      ui.div(`${e}\n`)
    }

    // Remove the trailing white spaces
    return ui.toString().replace(/\s*$/, '')
  }
}
