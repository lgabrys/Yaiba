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
  var lat, lng;
  function onMapClick(e) {
    lat = e.latlng.lat.toFixed(7);
    lng = e.latlng.lng.toFixed(7);
  }
  function parseCoordinateMap(e) {
    var date = $('#dateInputCalendar')[0];
    var long = lng >= 0 ? '+' + e.latlng.lng.toFixed(7) : '+' +  e.latlng.lng.toFixed(7);
  }
});
