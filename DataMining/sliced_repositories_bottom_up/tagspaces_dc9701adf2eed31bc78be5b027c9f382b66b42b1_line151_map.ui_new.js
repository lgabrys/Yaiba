define(function(require, exports, module) {
  var TSCORE = require('tscore');
  function getLocation() {
    if (navigator.geolocation) {
    } else {
      TSCORE.showAlertDialog("Geolocation is not supported by this browser.");
    }
  }
  var tagSpacesMapOptions = {
    //layers: [MB_ATTR],
    zoomControl: true,
    detectRetina: true
  };
  function parseCoordinateMap(e) {
    var date = $('#dateInputCalendar')[0];
    var long = e.latlng.lng.toFixed(7) >= 0 ? '+' + e.latlng.lng.toFixed(7) : e.latlng.lng.toFixed(7);
  }
});
