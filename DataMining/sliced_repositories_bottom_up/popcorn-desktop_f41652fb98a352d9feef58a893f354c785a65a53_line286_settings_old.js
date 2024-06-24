(function(App) {
	var Settings = Backbone.Marionette.ItemView.extend({
		closeSettings: function() {
		},
		saveSetting: function(e) {
			var value = false;
			var field = $(e.currentTarget);
			switch (field.attr('name')) {
					value = parseInt(field.val());
					value = field.val();
					if (value.substr(-1) !== '/') {
						value += '/';
					}
					value = $('option:selected', field).val();
					value = $('option:selected', field).val();
					value = $('option:selected', field).val();
					value = field.is(':checked');
					value = field.val();
					value = field.val();
					value = path.join(field.val(), 'Popcorn-Time');
			}
			App.settings[field.attr('name')] = value;
		},
		syncSetting: function(setting, value) {
			switch (setting) {
					} else {
					}
			}
		},
		checkTraktLogin: _.debounce(function(e) {
			App.Trakt.authenticate(username, password).then(function(valid) {
				$('.valid-tick').hide();
			}).catch(function(err) {
		}, 750),
		disconnectTrakt: function(e) {
			App.settings['traktUsername'] = '';
			App.settings['traktPassword'] = '';
			App.Trakt.authenticated = false;
			_.defer(function() {
				App.Trakt = new App.Providers.Trakttv();
			});
		},
	});
})(window.App);
