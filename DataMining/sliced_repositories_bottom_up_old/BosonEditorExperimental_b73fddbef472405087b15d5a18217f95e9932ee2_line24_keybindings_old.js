exports.init = function(gui,win,bs) {
	window.onkeydown = function(e) {
		if ( e.which === 27 ) {
			//Escape.
		}
	};
	window.onkeypress = function(e) {
		switch( e.which ) {
				bs.debug();
		}
	};
};
