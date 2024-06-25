define(function(require, exports, module) {
  var TSCORE = require('tscore');
  var search4Tag = function(tagQuery) {
    TSCORE.Search.nextQuery = '+' + tagQuery;
    $('#searchBox').val('+' + tagQuery);
    TSCORE.PerspectiveManager.redrawCurrentPerspective();
  };
  var search4String = function(query) {
    TSCORE.Search.nextQuery = '+' + query;
  };
  var calculateTags = function(data) {
    TSCORE.calculatedTags.length = 0;
  };
  var searchData = function(data, query) {
    var searchResults = [];
    if (query.length > 0) {
      ).then(
        function(entries) {
          TSCORE.Search.nextQuery = "";
          TSCORE.PerspectiveManager.updateFileBrowserData(searchResults, true);
        },
      ).catch(function() {
    }
  };
});
