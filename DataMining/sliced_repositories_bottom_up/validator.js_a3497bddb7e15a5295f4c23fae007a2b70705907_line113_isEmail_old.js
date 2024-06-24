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
import merge from './util/merge';
import isByteLength from './isByteLength';
const default_email_options = {
  allow_display_name: false,
  require_display_name: false,
  allow_utf8_local_part: true,
  require_tld: true,
  blacklisted_chars: '',
  ignore_max_length: false,
};
const splitNameAddress = /^([^\x00-\x1F\x7F-\x9F\cX]+)</i;
const emailUserPart = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~]+$/i;
const gmailUserPart = /^[a-z\d]+$/;
const quotedEmailUser = /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f]))*$/i;
const emailUserUtf8Part = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+$/i;
const quotedEmailUserUtf8 = /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*$/i;
const defaultMaxEmailLength = 254;
function validateDisplayName(display_name) {
  const display_name_without_quotes = display_name.replace(/^"(.+)"$/, '$1');
}
export default function isEmail(str, options) {
  options = merge(options, default_email_options);
  if (options.require_display_name || options.allow_display_name) {
    const display_email = str.match(splitNameAddress);
    if (display_email) {
      let display_name = display_email[1];
      str = str.replace(display_name, '').replace(/(^<|>$)/g, '');
      if (display_name.endsWith(' ')) {
        display_name = display_name.substr(0, display_name.length - 1);
      }
    } else if (options.require_display_name) {
  }
  const parts = str.split('@');
  const domain = parts.pop();
  let user = parts.join('@');
  const lower_domain = domain.toLowerCase();
  if (options.domain_specific_validation && (lower_domain === 'gmail.com' || lower_domain === 'googlemail.com')) {
    user = user.toLowerCase();
    const username = user.split('+')[0];
    if (!isByteLength(username.replace('.', ''), { min: 6, max: 30 })) {
    }
  }
}
