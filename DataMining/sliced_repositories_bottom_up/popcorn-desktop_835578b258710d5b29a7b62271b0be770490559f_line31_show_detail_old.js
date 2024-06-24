(function(App) {
	var _this;
	var ShowDetail = Backbone.Marionette.ItemView.extend({
		initialize: function() {
			_this = this;
			Mousetrap.bind('esc', function(e) {
				_this.closeDetails();
			});
		},
    });
})(window.App);
