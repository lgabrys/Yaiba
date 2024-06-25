N
o
 
l
i
n
e
s
import assertString from './util/assertString';
export default function isFloat(str, options) {
  assertString(str);
  options = options || {};
  if (str === '' || str === '.' || str === ',' || str === '-' || str === '+') {
    return false;
  }
}
