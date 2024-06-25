(function($){
	function _handleVisibleMovies(o, movieTitle, visibleMovie, title){
		if(movieTitle !== undefined){
			$.ajax({
			}).done(function(data){
				if (o.movieCache[title]) {
					setTimeout(function(){
						var movieData = data[0]
						, movie = o.movieCache[title];
						movie.title(movieData.local_name);
					},500);
				}
			});
		}
	}
})(jQuery);
