N
o
 
l
i
n
e
s
N
o
 
l
i
n
e
s
import assertString from './util/assertString';
import merge from './util/merge';
const default_fqdn_options = {
  require_tld: true,
  allow_underscores: false,
  allow_trailing_dot: false,
  allow_numeric_tld: false,
  allow_wildcard: false,
};
export default function isFQDN(str, options) {
  assertString(str);
  options = merge(options, default_fqdn_options);
  if (options.allow_trailing_dot && str[str.length - 1] === '.') {
    str = str.substring(0, str.length - 1);
  }
  if (options.allow_wildcard === true && str.indexOf('*.') === 0) {
    str = str.substring(2);
  }
  const parts = str.split('.');
  const tld = parts[parts.length - 1];
  if (options.require_tld) {
    if (!/^([a-z\u00A1-\u00A8\u00AA-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}|xn[a-z0-9-]{2,})$/i.test(tld)) {
      return false;
    }
  }
}
