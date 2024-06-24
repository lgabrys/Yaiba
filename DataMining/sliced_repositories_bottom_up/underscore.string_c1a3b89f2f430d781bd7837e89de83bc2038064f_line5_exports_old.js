module.exports = function() {

  for (var prop in this) {
    if (!this.hasOwnProperty(prop) || prop.match(/^(?:include|contains|reverse|join|map)$/)) continue;
  }
};
