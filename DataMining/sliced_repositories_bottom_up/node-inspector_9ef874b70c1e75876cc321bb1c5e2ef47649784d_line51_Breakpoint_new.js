



function Breakpoint(props) {
  var sourceID = props.sourceID !== undefined && props.sourceID !== null
      : '';
}
Breakpoint.prototype = {
  sameAs: function(sourceID, line, condition) {
    return this.sourceID == sourceID &&
  }
};
