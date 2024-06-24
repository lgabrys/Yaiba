export function checkDeprecations(opt, callback) {
  if (!opt || opt.silent) {
    return;
  }
  if (opt.highlight || opt.langPrefix) {
    console.warn('marked(): highlight and langPrefix parameters are deprecated since version 5.0.0, should not be used and will be removed in the future. Instead use https://www.npmjs.com/package/marked-highlight.');
  }
}
