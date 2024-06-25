// Loading Screen

App.loader = function (hasToShow, copy) {
  var $el = $('.popcorn-load');

  if (hasToShow === true && !$el.hasClass('hidden') ||
    hasToShow === false && $el.hasClass('hidden')) {
  }

  $el[hasToShow === false ? 'addClass' : 'removeClass']('hidden');
  if( ! hasToShow ) {
    window.initialLoading = false;
    setTimeout(function(){
      $el.removeClass('withProgressBar').removeClass('cancellable');
    }, 1000);
  }
};
window.initialLoading = true;
// Handles general UI buttons, like maximization, etc
jQuery(function ($) {

  $('.btn-os.max').on('click', function () {
    if(win.isFullscreen){
    }else{
  });



  $('#catalog-select ul li a').on('click', function (evt) {
    var genre = $(this).data('genre');
    if (genre == 'all') {
    } else {
  });

  $('.search input').on('keypress', function (evt) {
    var term = $.trim($(this).val());
    if (evt.keyCode === 13) {
       if (term) {
          App.Router.navigate('search/' + encodeURIComponent(term), { trigger: true });
        } else {
      }
  });
});
