(function(App) {
	var _this;
	var MovieList = Backbone.Marionette.CompositeView.extend({
		events: {
		},
		getEmptyView: function() {
		},
		onResize: function() {
		},
		ui: {
		},
		initialize: function() {
			_this = this;
		},
		initKeyboardShortcuts: function() {
			Mousetrap.bind('up', _this.moveUp);
		},
		onLoaded: function() {
			if(this.collection.hasMore && this.collection.filter.keywords === undefined && this.collection.state !== 'error') {
			}
		},
	});
})(window.App);
