export function inject () {
  global.manifest = remote.getGlobal('manifest');
  global.options = remote.getGlobal('options');
}
