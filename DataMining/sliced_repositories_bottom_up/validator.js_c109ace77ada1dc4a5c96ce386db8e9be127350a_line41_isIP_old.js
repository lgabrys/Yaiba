var ipv4Maybe = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
export default function isIP(str) {
  var version = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  version = String(version);
  if (!version) {
  } else if (version === '4') {
    if (!ipv4Maybe.test(str)) {
      return false;
    }
  }
}
