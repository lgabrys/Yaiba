define(function (require) {
	var store = require('store').getNamespace('repo-selector')
	return Backbone.Router.extend({
		switchType: function (type, id, tab) {
			if (type != store().currentType.type || id != store().currentType.id) {
			}
		},
	});
})
