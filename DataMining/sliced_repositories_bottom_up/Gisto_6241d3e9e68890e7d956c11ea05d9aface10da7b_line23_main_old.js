$(function () {
    $('div.main').on('click', '.clicky', function () {
        if ($('div.comments i').hasClass('icon-arrow-down')) {
            $('div.comments').animate({
                height: '35px'
            }, 500);
        } else {
            $('div.comments').animate({
                height: (document.height / 2) + 'px'
            }, 500);
        }
    });
});
