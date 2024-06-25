(function(App) {
	App.View.FilterBar = Backbone.Marionette.ItemView.extend({
		setactive: function(set) {
			switch (set) {
				case 'shows':
			}
		},
		rightclick_search: function(e) {
			e.preventDefault();
		},
	});
})(window.App);
