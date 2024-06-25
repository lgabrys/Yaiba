


// Project Home - http://benalman.com/projects/jquery-bbq-plugin/
// 1.2   - (2/16/2010) Integrated <jQuery hashchange event> v1.2, which fixes a
//         Compatibility View" modes erroneously report that the browser
(function($,window,undefined){
  var str_hashchange = 'hashchange',
  $.fn[ str_hashchange ] = function( fn ) {
  };
  $.fn[ str_hashchange ].delay = 50;
})(jQuery,window);
