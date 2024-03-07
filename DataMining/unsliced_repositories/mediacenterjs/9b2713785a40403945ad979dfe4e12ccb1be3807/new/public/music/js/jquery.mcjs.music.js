/*
	MediaCenterJS - A NodeJS based mediacenter solution
	
    Copyright (C) 2013 - Jan Smolders

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
(function($){

	var ns = 'mcjsm';
	var methods = {};

	function _init(options) {
		var opts = $.extend(true, {}, $.fn.mcjsm.defaults, options);
		return this.each(function() {
			var $that = $(this);
			var o = $.extend(true, {}, opts, $that.data(opts.datasetKey));
				
			// add data to the defaults (e.g. $node caches etc)	
			o = $.extend(true, o, { 
				$that : $that,
				tracks : new Array
			});
			
			// use extend(), so no o is used by value, not by reference
			$.data(this, ns, $.extend(true, {}, o));
			
			_loadItems(o);
			
			_setHeight(o);
			$(window).resize(function() {
				_setHeight(o);	
			});
			
			$(o.musicListSelector).scroll( function(){
				_lazyload(o);
			});
			_lazyload(o);
			
			$(o.backLinkSelector).on('click',function(e) {
				console.log('click')
				e.preventDefault();	
				if ($(o.trackListSelector).is(':hidden')){	
					window.location = '/';
				} else if ($(o.trackListSelector).is(':visible')) {	
					$(o.trackListSelector).hide();
					$(o.musicListSelector).fadeIn();
				}
			});

		});
	}
	
	/**** Start of custom functions ***/
	
	function _loadItems(o){
		$.ajax({
			url: '/music/loadItems', 
			type: 'get',
			dataType: 'json'
		}).done(function(data){	
			o.viewModel = ko.observableArray(data);
			ko.applyBindings(o.viewModel,o.$that[0]);
			
			// TODO: click handler ko
			$(o.musicListSelector+' > li').on('click tap', function(e) {
				e.preventDefault();	
				
				$(o.musicListSelector+' > li').each(function(){
					if($(o.musicListSelector+' > li').hasClass(o.playingClass) || $(o.musicListSelector).find('li').hasClass(o.selectedClass)){
						$(o.musicListSelector+' > li').removeClass(o.playingClass);
						$(o.musicListSelector+'> li').removeClass(o.selectedClass);
					}
				});

				var album = $(this).find('.title').text();
				if(album.match("\.(mp3)","g")){
					console.log('asd')
					var track = '/music/none/'+album+'/play'
					, songTitle = album
					, random = false
					, album = 'none';
					$(this).addClass(o.playingClass).addClass(o.selectedClass);
					var image = $('.'+o.playingClass).find('img');
					_dominantColor(o,image);
					
					_playTrack(o,track,album,songTitle,random);
				}else {
					_getAlbum(o, album);
				}
			});
			
		});	
	}

	function _setHeight(o){
		var viewportHeight = $(window).height();
		$(o.musicListSelector).css('height',viewportHeight - 55);
		$(o.trackListSelector).css('height',viewportHeight - 200);
	}
	
	function _lazyload(o){
		if($(o.playerSelector).hasClass('show')){
			$(o.playerSelector).removeClass('show')
		};
		//Set timeout for fast scrolling
		setTimeout(function(){
			var WindowTop = $(o.musicListSelector).scrollTop()
			, WindowBottom = WindowTop + $(o.musicListSelector).height();

			$(o.musicListSelector).find('li').each(function(){
				var offsetTop = $(this).offset().top
				, offsetBottom = offsetTop + $(this).height();

				if(!$(this).attr("loaded") && WindowTop <= offsetBottom && WindowBottom >= offsetTop){
					var title = $(this).find('.title').html()
					, cover = $(this).find('.cover')
					, album = $(this);
					
					_handleMusic(o, title, cover, album);
					$(this).attr("loaded",true);
				}
			});		
		},500);	
	}
	
	function _handleMusic(o, title, cover, album){
		$.ajax({
			url: '/music/'+title+'/info/', 
			type: 'get'
		}).done(function(data){
			var thumbnail	= data[0].cover;
			
			album.fadeIn();
			cover.attr('src','');	
			setTimeout(function(){
				cover.attr('src',thumbnail).addClass('coverfound');
				album.addClass('coverfound');
			},500);
		});
	}
	
	function _getAlbum(o, album){	
		$.ajax({
			url: '/music/'+album+'/info/', 
			type: 'get'
		}).done(function(data){
		
			var thumbnail	= 	data[0].cover
			, year 			= 	data[0].year
			, genre 		= 	data[0].genre
			, tracks 		= 	data[0].tracks;
			
			o.tracks = tracks;
		
			$(o.trackListSelector).find('h2').html(album);

			if($(o.trackListSelector).find('ul').length == 0){
				$(o.trackListSelector).append('<ul id="tracks"></ul>')
			} else{
				$(o.trackListSelector).find('ul').remove();
				$(o.trackListSelector).append('<ul></ul>');
			}
			
			// Populate tracks
			tracks.forEach(function(value, index) {
				$(o.trackListSelector +' > ul').append('<li class="mcjs-rc-tracklist-control" data-url="'+value+'"><i class="play icon"></i><div class="title">'+value+'</div></li>')
			});
			
			_presentTracks(o);

			$(window).resize(function() {
				_presentTracks(o);
			});
			
			$(o.musicListSelector).hide();
			$(o.trackListSelector).show();		
				
			// Styling
			$(o.trackListSelector).find('li:odd').addClass('odd');
			$(o.trackListSelector).find('img.cover').attr('src',thumbnail).addClass('coverfound');
			if(year !== 'No data found...'){
				$(o.trackListSelector).find('.year').html(year);
			}
			if(genre !== 'No data found...'){
				$(o.trackListSelector).find('.genre').html(genre);
			}
			$('img.cover').bind('load', function (event) {
				var image = event.target;
				_dominantColor(o,image);
			});	
			
			// Play song init
			$(o.trackListSelector+' ul > li').on('click', function(e) {
				e.preventDefault();	
				var currentItem  = $(this);
				_trackClickHandler(o, album, currentItem);
			});
			
			
			//Remote Control extender
			if(io !== undefined){
				$.ajax({
					url: '/configuration/', 
					type: 'get'
				}).done(function(data){
					var socket = io.connect(data.localIP+':'+data.remotePort);
					socket.on('connect', function(data){
						socket.emit('remote');
					});

					socket.on('controlling', function(data){
						var focused = $('.'+o.focusedClass)
						,accesibleItem = $('li.mcjs-rc-tracklist-control');
						
						if(data.action === "goLeft"){ 
							var item = accesibleItem;
							if (item.prev(item).length === 0) item.eq(-1).addClass(o.focusedClass);
						}

						if(data.action === "enter"){ 
							var currentItem = focused;
							if(focused.length > 0){
								_trackClickHandler(o, album, currentItem);
							}
						}
						
						if(data.action === "shuffle"){ 
							_randomTrack(o);
						}
						
						if(data.action === "back"){ 
							console.log('go back')
							if ($(o.trackListSelector).is(':hidden')){	
								window.location = '/';
							} else if ($(o.trackListSelector).is(':visible')) {	
								$(o.trackListSelector).hide();
								$(o.musicListSelector).fadeIn();
							}
						}

						else if(data.action === "goRight"){
							if (focused.next(accesibleItem).length === 0)accesibleItem.eq(0).addClass(o.focusedClass);
						}
					});
				});
			}
		});			
	}
	
	function _trackClickHandler(o, album, currentItem){
		$('.random').removeClass('active');
		var songTitle = currentItem.find('.title').html();
		
		$(o.trackListSelector+' ul > li').each(function(){
			$(this).removeClass(o.selectedClass);
		});
		
		if(!currentItem.hasClass(o.selectedClass)){
			currentItem.addClass(o.selectedClass);
		}
		var track = '/music/'+album+'/'+songTitle+'/play/'
		, random = false;

		_playTrack(o,track,album,songTitle,random);
	}	
	
	function _presentTracks(o){
		var parentHeight = $(o.trackListSelector).height();
		$(o.trackListSelector+' > ul').css('height',parentHeight - 200).perfectScrollbar();
	}
	
	function _hideOtherAlbums(o){
		$(o.musicListSelector).hide();
	}
	
	function _playTrack(o,track,album,songTitle,random){
		if(!$('.random').length){
			$(o.playerSelector).append('<div class="random hidden">Random</div>')
		}
		$('.random').removeClass('hidden');
		
		$(o.playerSelector).addClass('show');
		
		videojs(o.playerID).ready(function(){
			var myPlayer = this;

			myPlayer.src(track);
			myPlayer.play();
			
			$('.random').on('click tap', function(e) {
				if($(this).hasClass('active')){
					$(this).removeClass('active');
				} else{
					$(this).addClass('active');
				}

				_randomTrack(o);
			});
			
			myPlayer.on("pause", function(){
				if($('.boxed').hasClass('playing')){
					$('.boxed.playing.selected').addClass('pause')
				} else {
					$('.'+o.selectedClass+' > .eq').addClass('pause');
				}
			});
			
			myPlayer.on("play", function(){
				if($('.boxed').hasClass('playing')){
					$('.boxed.playing.selected').removeClass('pause')
				} else {
					$('.'+o.selectedClass+' > .eq').removeClass('pause');
				}
			});
			
			myPlayer.on("ended", function(){
				if(random === false){
					$('.random').removeClass('active');
					_nextTrack(o,album,songTitle);
				} else if(random === true){
					_randomTrack(o);
				}
			});
		});
	}
	
	function _nextTrack(o,album,songTitle){		
		var random = false;
		
		index = o.tracks.indexOf(songTitle);
		if(index >= 0 && index < o.tracks.length - 1){
		   nextItem = o.tracks[index + 1];
		   songTitle = nextItem;
		} else{
			return;
		}		

		var album = $(o.trackListSelector).find('h2').html()
		, track = '/music/'+album+'/'+nextItem+'/play';
		
		$('li.'+o.selectedClass).removeClass(o.selectedClass);
		$(o.trackListSelector).find('li:contains('+nextItem+')').addClass(o.selectedClass);

		_playTrack(o,track,album,songTitle,random);
	}
	
	function _randomTrack(o){
		$('li.'+o.selectedClass).removeClass(o.selectedClass);
	
		var random = true
		, elemLength = o.tracks.length
		, randomNum = Math.floor(Math.random()*elemLength)
		, nextItem = o.tracks[randomNum];
		
		$(o.trackListSelector).find('li:contains('+nextItem+')').addClass(o.selectedClass);
		
		var album = $(o.trackListSelector).find('h2').html()
		, track = '/music/'+album+'/'+nextItem+'/play';
		
		_playTrack(o,track,album,songTitle,random);
	}
	
	function _dominantColor(o,image){
		var dominantColor = getDominantColor(image);
		$(o.headerSelector).css('borderBottom','5px solid rgb('+dominantColor+')');
		$('.play').css('color','rgb('+dominantColor+')');
	}

	/**** End of custom functions ***/
	
	$.fn.mcjsm = function( method ) {
		if ( methods[method] ) {
			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || !method ) {
			return _init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.fn.mcjsm' );
		}
	};
	
	/* default values for this plugin */
	$.fn.mcjsm.defaults = {
		datasetKey: 'mcjsmusic' //always lowercase
		, musicListSelector: '.music' 
		, trackListSelector: '#tracklist' 
		, playerSelector: '#player' 
		, headerSelector: '#header' 
		, backLinkSelector: '.backlink' 
		, playerID: 'player' 
		, selectedClass: 'selected' 
		, focusedClass: 'focused' 
		, playingClass: 'playing' 
	};

})(jQuery);
