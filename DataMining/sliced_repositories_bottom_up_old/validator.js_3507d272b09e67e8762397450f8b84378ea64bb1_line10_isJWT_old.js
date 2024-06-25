export default function isJWT(str) {
  const dotSplit = str.split('.');
  const len = dotSplit.length;
  if (len > 3 || len < 2) {
    return false;
  }
}
