const t = require('tap')
const { statSync, readdirSync } = require('fs')
const find = (folder, set = [], root = true) => {
  return set.map(f => f.substr(folder.length + 1)
    .replace(/\\/g, '/'))
}
