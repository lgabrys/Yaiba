/* nomin */ var debug;
  /* nomin */ debug = function() {
    /* nomin */ };
  /* nomin */ debug = function() {};
function SemVer(version, loose) {
  if (version instanceof SemVer) {
      version = version.version;
  }
}
SemVer.prototype.format = function() {
    this.version += '-' + this.prerelease.join('.');
};
SemVer.prototype.inspect = function() {
};
SemVer.prototype.toString = function() {
};
SemVer.prototype.compare = function(other) {
    other = new SemVer(other, this.loose);
};
SemVer.prototype.compareMain = function(other) {
    other = new SemVer(other, this.loose);
};
SemVer.prototype.comparePre = function(other) {
    other = new SemVer(other, this.loose);
  else if (!this.prerelease.length && !other.prerelease.length)
};
