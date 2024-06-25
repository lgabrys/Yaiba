function parse(argv) {
  if (typeof argv === 'string') {
    argv = argv.split(' ');
  }
  var args = argv.slice(2),
      script = null,
      nodemonOptions = { scriptPosition: null };
}
