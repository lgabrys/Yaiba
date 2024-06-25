    rc = require('rc'),
var definitions = {
  'help': {
    alias: 'h',
    type: 'boolean',
    description: 'Display information about avaible options.',
    usage: {
      '--help': '           display short list of avaible options',
      '--help <option>': '  display quick help on <option>',
      '--help -l': '        display full usage info'
    },
    _isNodeInspectorOption: true,
    _isNodeDebugOption: true,
    default: false
  },
  'version': {
    alias: 'v',
    type: 'boolean',
    description: 'Display Node Inspector\'s version.',
    usage: '--version',
    _isNodeInspectorOption: true,
    _isNodeDebugOption: true,
    default: false
  },
  'web-port': {
    alias: ['port', 'p'],
    type: 'number',
    description: 'Port to listen on for Node Inspector\'s web interface.',
    usage: {
      '--web-port 8081': '',
      '-p 8081': ''
    },
    _isNodeInspectorOption: true,
    default: 8080
  },
  'web-host': {
    type: 'string',
    description: 'Host to listen on for Node Inspector\'s web interface.',
    usage: {
      '--web-host 127.0.0.1': '',
      '--web-host www.example.com': ''
    },
    _isNodeInspectorOption: true,
    default: '0.0.0.0'
  },
  'debug-port': {
    alias: 'd',
    type: 'number',
    description: 'Node/V8 debugger port (`node --debug={port}`).',
    _isNodeInspectorOption: true,
    _isNodeDebugOption: true,
    default: 5858
  },
  'save-live-edit': {
    type: 'boolean',
    description: 'Save live edit changes to disk (update the edited files).',
    usage: {
      '--save-live-edit': '',
      '--no-save-live-edit': '    disable saving live edit changes to disk'
    },
    _isNodeInspectorOption: true,
    default: false
  },
  'preload': {
    type: 'boolean',
    description: 'Preload *.js files. You can disable this option to speed up the startup.',
    usage: {
      '--preload': '',
      '--no-preload': '    disable preloading *.js files'
    },
    _isNodeInspectorOption: true,
    default: true
  },
  'inject': {
    type: 'boolean',
    description: 'Enable injection of debugger extensions into the debugged process.',
    usage: {
      '--inject': '',
      '--no-inject': '    disable injecting of debugger extensions'
    },
    _isNodeInspectorOption: true,
    default: true
  },
  'hidden': {
    type: 'string',
    description: 'Array of files to hide from the UI,\n' +
                 'breakpoints in these files will be ignored.\n' +
                 'All paths are interpreted as regular expressions.',
    usage: {
      '--hidden .*\\.test\\.js$ --hidden node_modules/': 'ignore node_modules directory' +
        'and all `*.test.js` files'
    },
    _isNodeInspectorOption: true,
    default: []
  },
  'stack-trace-limit': {
    type: 'number',
    description: 'Number of stack frames to show on a breakpoint.',
    _isNodeInspectorOption: true,
    default: 50
  },
  'ssl-key': {
    type: 'string',
    description: 'A file containing a valid SSL key.',
    usage: '--ssl-key ./ssl/key.pem --ssl-cert ./ssl/cert.pem',
    _isNodeInspectorOption: true,
    default: ''
  },
  'ssl-cert': {
    type: 'string',
    description: 'A file containing a valid SSL certificate.',
    usage: '--ssl-key ./ssl/key.pem --ssl-cert ./ssl/cert.pem',
    _isNodeInspectorOption: true,
    default: ''
  },
  'nodejs': {
    type: 'string',
    description: 'Pass NodeJS options to debugged process (`node --option={value}`).',
    usage: '--nodejs --harmony --nodejs --random_seed=2 app',
    _isNodeDebugOption: true,
    default: []
  },
  'debug-brk': {
    alias: 'b',
    type: 'boolean',
    description: 'Break on the first line (`node --debug-brk`).',
    _isNodeDebugOption: true,
    default: false
  },
  'cli': {
    alias: 'c',
    type: 'boolean',
    description: 'CLI mode, do not open browser.',
    usage: '--cli',
    _isNodeDebugOption: true,
    default: false
  }
};
function Config(argv, NODE_DEBUG_MODE) {
  var defaults = collectDefaultsFromDefinitions(NODE_DEBUG_MODE);
  var parsedArgv = parseArgs(argv);
  var rcConfig = rc('node-inspector', defaults, parsedArgv);
  var config = normalizeOptions(rcConfig);
  checkDeprecatedNoPreloadStyle(config);
}
function checkDeprecatedNoPreloadStyle(config) {
  if (config.noPreload !== undefined) {
    config.preload = config.preload || !config.noPreload;
  }
}
function checkDeprecatedWebHostStyle(config) {
  if (config.webHost === 'null' || config.webHost === null) {
    // Deprecated in v0.8.0
    console.warn('You use deprecated syntax for web-host option. Use 0.0.0.0 instead of null');
  }
}
