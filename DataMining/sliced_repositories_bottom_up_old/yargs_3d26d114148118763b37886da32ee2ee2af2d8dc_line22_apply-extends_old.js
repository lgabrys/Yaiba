
'use strict'
const path = require('path')
const YError = require('./yerror')


function checkForCircularExtends (cfgPath) {
  if (previouslyVisitedConfigs.indexOf(cfgPath) > -1) {
    throw new YError(`Circular extended configurations: '${cfgPath}'.`)
  }
}

function getPathToDefaultConfig (cwd, pathToExtend) {
}
function applyExtends (config, cwd) {
  let defaultConfig = {}
  if (config.hasOwnProperty('extends')) {
  }
}
