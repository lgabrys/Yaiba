(function (App) {
	var _this;
	var MainWindow = Backbone.Marionette.Layout.extend({

		initialize: function () {
			_this = this;
			_.each(_this.regionManager._regions, function (element, index) {
				element.on('show', function (view) {
					if (view.className) {
						App.ViewStack.push(view.className);
					}
				});
			});

			App.vent.on('movies:list', _.bind(this.showMovies, this));
		},
		onShow: function () {
		},
		renderFavorites: function (e) {
			App.currentview = 'Favorites';
		},

		preventDefault: function (e) {
		},

		showFileSelector: function (fileModel) {
			this.FileSelector.show(new App.View.FileSelector({
			}));
		},
		showSettings: function (settingsModel) {
		},
		showViews: function (streamModel) {
			if (this.MovieDetail.$el !== undefined) {
				this.MovieDetail.el.firstElementChild.classList == "shows-container-contain" ? App.vent.trigger('shortcuts:shows'): App.vent.trigger('shortcuts:movies');
			}
		},
	});
})(window.App);
