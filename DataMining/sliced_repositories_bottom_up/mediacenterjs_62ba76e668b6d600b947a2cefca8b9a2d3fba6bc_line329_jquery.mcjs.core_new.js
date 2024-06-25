(function($){
	function _goLeft(o, item){
        o.RemoteIdle = false;
		$(o.focusedElement).removeClass(o.focusedClass).prev().addClass(o.focusedClass).scrollintoview({direction: "vertical"});
	}
	function _pressEnter(o){
        o.RemoteIdle = false;
	}
})(jQuery);
