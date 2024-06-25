(function(App) {
	var _this;
	var ShowList = Backbone.Marionette.CompositeView.extend({
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
			if(this.collection.hasMore && this.collection.filter.keywords.isEmpty() && this.collection.state !== 'error') {
			}
		},
	});
})(window.App);
