// default options for config.options
module.exports = {
  restartable: 'rs',
  colours: true,
  execMap: {
    py: 'python',
    rb: 'ruby',
    // more can be added here such as ls: lsc - but please ensure it's cross
    // compatible with linux, mac and windows, or make the default.js
  },
  ignore: ['.git', 'node_modules', 'bower_components', '.sass-cache'],
};
