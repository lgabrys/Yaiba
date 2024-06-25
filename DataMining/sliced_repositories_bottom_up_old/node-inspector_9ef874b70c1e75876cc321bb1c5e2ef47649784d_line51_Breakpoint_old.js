

function Breakpoint(props) {
  var sourceID = props.sourceID !== undefined && props.sourceID !== null
  return Object.create(Breakpoint.prototype, {
    key: {
      get: function() {
      }
    }
  });
}
Breakpoint.prototype = {
  sameAs: function(sourceID, line, condition) {
    return this.sourceID === sourceID.toString() &&
  }
};
