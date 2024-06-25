const t = require('tap')
const { statSync, readdirSync } = require('fs')
const find = (folder, set = [], root = true) => {
  return set.map(f => f.slice(folder.length + 1)
    .replace(/\\/g, '/'))
}
