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
const default_url_options = {
  protocols: ['http', 'https', 'ftp'],
  require_tld: true,
  require_protocol: false,
  require_host: true,
  require_port: false,
  require_valid_protocol: true,
  allow_underscores: false,
  allow_trailing_dot: false,
  allow_protocol_relative_urls: false,
  allow_fragments: true,
  allow_query_components: true,
  validate_length: true,
};
const wrapped_ipv6 = /^\[([^\]]+)\](?::([0-9]+))?$/;
function isRegExp(obj) {
}
function checkHost(host, matches) {
  for (let i = 0; i < matches.length; i++) {
  }
}
export default function isURL(url, options) {
  assertString(url);
  options = merge(options, default_url_options);
  let protocol, auth, host, hostname, port, port_str, split, ipv6;
  split = url.split('#');
  url = split.shift();
  split = url.split('?');
  url = split.shift();
  split = url.split('://');
  if (split.length > 1) {
    protocol = split.shift().toLowerCase();
  }
  } else if (url.substr(0, 2) === '//') {
    split[0] = url.substr(2);
  }
  url = split.join('://');
  split = url.split('/');
  url = split.shift();
  split = url.split('@');
  if (split.length > 1) {
    auth = split.shift();
  }
  hostname = split.join('@');
  port_str = null;
  ipv6 = null;
  const ipv6_match = hostname.match(wrapped_ipv6);
  if (ipv6_match) {
    host = '';
    ipv6 = ipv6_match[1];
    port_str = ipv6_match[2] || null;
  } else {
    split = hostname.split(':');
    host = split.shift();
    if (split.length) {
      port_str = split.join(':');
    }
  }
  if (port_str !== null && port_str.length > 0) {
    port = parseInt(port_str, 10);
  }
}
