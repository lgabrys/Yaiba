(function (App) {
	var Settings = Backbone.Marionette.ItemView.extend({
		saveSetting: function (e) {
			var value = false;
			var field = $(e.currentTarget);
			switch (field.attr('name')) {
				value = parseInt(field.val());
				value = field.val();
				if (value.substr(-1) !== '/') {
					value += '/';
				}
				var tvapiep = AdvSettings.get('tvshowAPI');
				tvapiep.url = value;
				tvapiep.skip = true;
			}
		},
	});
})(window.App);
